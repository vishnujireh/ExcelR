"use client";

import React, { useState, useEffect, useMemo } from "react";
import parse, { domToReact } from "html-react-parser";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { CourseData } from "@/redux/slices/courseSlice";

interface CourseBenefitProps {
  data?: CourseData;
}

/* ------------------ Helpers ------------------ */

const sanitizeParsedUrl = (value: unknown) => {
  if (value == null) return "";
  return String(value)
    .replace(/__HTML_DOM_PARSER_CARRIAGE_RETURN_PLACEHOLDER_\d+__/g, "")
    .replace(/[\r\n\t]/g, "")
    .trim();
};

const toEmbedUrl = (url: string) => {
  const normalizedUrl = sanitizeParsedUrl(url);
  if (!normalizedUrl) return "";

  if (normalizedUrl.includes("youtube.com/watch")) {
    const m = normalizedUrl.match(/[?&]v=([\w-]+)/);
    if (m?.[1]) return `https://www.youtube.com/embed/${m[1]}`;
  }

  if (normalizedUrl.includes("youtu.be/")) {
    const m = normalizedUrl.match(/youtu\.be\/([\w-]+)/);
    if (m?.[1]) return `https://www.youtube.com/embed/${m[1]}`;
  }

  return normalizedUrl;
};

const findMatchingDivEnd = (html: string, startIndex: number) => {
  const divTagRegex = /<\/?div\b[^>]*>/gi;
  divTagRegex.lastIndex = startIndex;

  let depth = 0;
  let match: RegExpExecArray | null;
  while ((match = divTagRegex.exec(html)) !== null) {
    const tag = match[0].toLowerCase();
    if (tag.startsWith("</div")) depth -= 1;
    else depth += 1;

    if (depth === 0) return divTagRegex.lastIndex;
  }

  return -1;
};

const removeDivById = (html: string, id: string) => {
  const openTagRegex = new RegExp(
    `<div\\b[^>]*\\bid=["']${id}["'][^>]*>`,
    "i"
  );
  const match = openTagRegex.exec(html);
  if (!match || typeof match.index !== "number") {
    return { cleanedHtml: html, removedBlock: "" };
  }

  const startIndex = match.index;
  const endIndex = findMatchingDivEnd(html, startIndex);
  if (endIndex === -1) {
    return { cleanedHtml: html, removedBlock: "" };
  }

  return {
    cleanedHtml: `${html.slice(0, startIndex)}${html.slice(endIndex)}`,
    removedBlock: html.slice(startIndex, endIndex),
  };
};

const extractItemBlocks = (carouselHtml: string) => {
  const blocks: string[] = [];
  const itemOpenRegex =
    /<div\b[^>]*\bclass=["'][^"']*\bitem\b[^"']*["'][^>]*>/gi;

  let match: RegExpExecArray | null;
  while ((match = itemOpenRegex.exec(carouselHtml)) !== null) {
    const startIndex = match.index;
    const endIndex = findMatchingDivEnd(carouselHtml, startIndex);
    if (endIndex === -1) continue;

    const fullItemBlock = carouselHtml.slice(startIndex, endIndex);
    const itemInnerHtml = fullItemBlock
      .replace(/^<div\b[^>]*>/i, "")
      .replace(/<\/div>\s*$/i, "")
      .trim();

    if (itemInnerHtml) blocks.push(itemInnerHtml);
    itemOpenRegex.lastIndex = endIndex;
  }

  return blocks;
};

/* ------------------ Component ------------------ */

export default function CourseBenefit({ data }: CourseBenefitProps) {
  const bannerHtml = data?.course_banner2 ?? "";

  const [modalOpen, setModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  /* -------------------------------------------------------
     1️⃣ Extract Bootstrap Carousel Items
  --------------------------------------------------------*/
  const { cleanedHtml, testimonials } = useMemo(() => {
    if (!bannerHtml) {
      return {
        cleanedHtml: "",
        testimonials: [],
      };
    }

    const { cleanedHtml: htmlWithoutCarousel, removedBlock } = removeDivById(
      bannerHtml,
      "quote-carousel"
    );
    const slides = extractItemBlocks(removedBlock);

    const cleaned = htmlWithoutCarousel.replace(
      /<div\b[^>]*\bclass=["'][^"']*\btestimonial_control\b[^"']*["'][\s\S]*?<\/div>/gi,
      ""
    );

    return {
      cleanedHtml: cleaned,
      testimonials: slides,
    };
  }, [bannerHtml]);

  /* -------------------------------------------------------
     2️⃣ Expose banner2_video() for admin inline onclick
  --------------------------------------------------------*/
  useEffect(() => {
    if (typeof window === "undefined") return;

    const original = (window as any).banner2_video;

    (window as any).banner2_video = (url?: string) => {
      const embed = toEmbedUrl(url || "");
      if (embed) setVideoUrl(embed);
      setModalOpen(true);
    };

    return () => {
      if (original) (window as any).banner2_video = original;
      else delete (window as any).banner2_video;
    };
  }, []);

  /* -------------------------------------------------------
     3️⃣ Replace IMG with Next Image (YOUR LOGIC PRESERVED)
  --------------------------------------------------------*/
  const replaceFn = (domNode: any) => {
    if (domNode.name === "img" && domNode.attribs) {
      const {
        src,
        alt,
        class: classAttr,
        className: classNameAttr,
        width: widthAttr,
        height: heightAttr,
      } = domNode.attribs;

      const altText = alt || "course image";
      const imageSrc = sanitizeParsedUrl(src);
      if (!imageSrc) return null;

      const originalClass = (classAttr || classNameAttr || "").toString();
      const isIcon = originalClass.split(/\s+/).includes("icon");

      // ✅ YOUR EXISTING LOGIC (UNCHANGED)
      const width = isIcon
        ? 80
        : widthAttr
        ? Number(widthAttr) || 700
        : 700;

      const height = isIcon
        ? 80
        : heightAttr
        ? Number(heightAttr) || 600
        : 600;

      const combinedClassName = ["mx-auto", originalClass]
        .filter(Boolean)
        .join(" ");

      return (
        <Image
          src={imageSrc}
          alt={altText}
          width={width}
          height={height}
          quality={45}
          priority
          fetchPriority="high"
          className={combinedClassName}
          sizes="(max-width: 768px) 100vw, 700px"
        />
      );
    }

    if (domNode.name === "a" && domNode.attribs) {
      const {
        href,
        onclick,
        target,
        rel,
        class: classAttr,
        className: classNameAttr,
      } = domNode.attribs;

      const safeHref = sanitizeParsedUrl(href);
      const safeOnclick = sanitizeParsedUrl(onclick);
      const dataVideo =
        sanitizeParsedUrl(domNode.attribs["data-video"]) ||
        sanitizeParsedUrl(domNode.attribs["data-video-url"]) ||
        sanitizeParsedUrl(domNode.attribs["data-youtube"]);
      const className = (classAttr || classNameAttr || "").toString();

      const shouldOpenVideo =
        /banner2_video\s*\(/i.test(safeOnclick) ||
        /^javascript:\s*banner2_video\s*\(/i.test(safeHref) ||
        ((safeHref === "javascript:void(0)" || safeHref === "javascript:void(0);") &&
          !!dataVideo);

      const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!shouldOpenVideo) return;

        e.preventDefault();
        const embed = toEmbedUrl(dataVideo || safeHref);
        if (embed) {
          setVideoUrl(embed);
          setModalOpen(true);
          return;
        }

        // fallback to global hook if admin relies on it
        if (typeof window !== "undefined" && typeof (window as any).banner2_video === "function") {
          (window as any).banner2_video(dataVideo || safeHref);
        }
      };

      const safeRel = sanitizeParsedUrl(rel);
      const safeTarget = sanitizeParsedUrl(target);

      return (
        <a
          href={safeHref || "#"}
          onClick={handleClick}
          target={safeTarget || undefined}
          rel={safeRel || undefined}
          className={className || undefined}
        >
          {domToReact(domNode.children || [], { replace: replaceFn })}
        </a>
      );
    }

    return undefined;
  };

  const parsedContent = parse(cleanedHtml, { replace: replaceFn });

  if (!bannerHtml) return null;

  /* -------------------------------------------------------
     4️⃣ Render
  --------------------------------------------------------*/
  return (
    <>
      {/* Normal CMS Content */}
      {parsedContent}

      {/* Swiper Testimonials */}
      {testimonials.length > 0 && (
        <>
        
 <section className="bg-[#2d5986] mt-10 py-12">
          <h3 className="text-white text-center text-xl font-semibold mb-10">
            Our Training Support says all about us
          </h3>

          <div className="max-w-4xl mx-auto px-4">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              //navigation
              //pagination={{ clickable: true }}
              autoplay={{ delay: 4000 }}
              loop
            >
              {testimonials.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div className="text-white text-center px-6">
                    {parse(slide, { replace: replaceFn })}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
        <div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5">
<div className="text-center block"><a href="https://www.excelr.com/testimonials" className="bg-[#ff9600] text-white text-sm inline-block items-center py-2.5 px-5 font-semibold rounded-lg">Read more</a></div>
</div>
        </>
      )}

      {/* Video Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl m-5 sm:m-0"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute -top-4 -right-4 cursor-pointer bg-orange-500 text-white w-10 h-10 rounded-full"
            >
              ×
            </button>

            <div className="aspect-video bg-black">
              <iframe
                src={videoUrl}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
