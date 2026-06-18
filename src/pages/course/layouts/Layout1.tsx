import React, { useEffect, useState } from "react";
import Image from "next/image";
import parse from "html-react-parser";
// import LazyLoad from "../../components/LazyLoadComponent";
import CourseBanner from "../../components/course/CourseBanner";       // LCP — must be static
import CourseBreadcrumb from "../../components/course/CourseBreadcrumb"; // above fold — static
import StickyHeader from "../../components/course/StickyHeader";          // navigation — static
import dynamic from "next/dynamic";
import { CourseData } from "../../../redux/slices/courseSlice";

interface LayoutProps {
  data: CourseData;
}

// ─── Below-fold components ────────────────────────────────────────────────────
// All sections below the banner are dynamically imported so their JS is
// code-split into separate chunks. The browser downloads and parses only the
// banner + breadcrumb JS on first load, which directly reduces TBT and LCP.
// ssr: true (default) keeps server-rendered HTML for SEO on course pages.
// ─────────────────────────────────────────────────────────────────────────────
const CourseBenefit      = dynamic(() => import("../../components/course/CourseBenefit"));
const CourseBatche       = dynamic(() => import("../../components/course/CourseBatche"));
const CoursePrice        = dynamic(() => import("../../components/course/CoursePrice"));
const ParticipantsPlaced = dynamic(() => import("../../components/course/ParticipantsPlaced"));
const Testimonials       = dynamic(() => import("../../components/course/Testimonials"));
const CourseWhyExcelr    = dynamic(() => import("../../components/course/CourseWhyExcelr"));
const CourseGlobal       = dynamic(() => import("../../components/course/CourseGlobal"));
const Accolades          = dynamic(() => import("../../components/course/Accolades"));
const OurClients         = dynamic(() => import("../../components/OurClients"));
const CourseLocation     = dynamic(() => import("../../components/course/CourseLocation"));
const PopularCourse      = dynamic(() => import("../../components/course/PopularCourse"));
const CourseFaq          = dynamic(() => import("../../components/course/CourseFaq"));

/**
 * Convert CMS <img> tags into Next.js <Image />
 */
function renderCMSContent(html: string) {
  return parse(html, {
    replace: (node: any) => {
      if (node.name === "img" && node.attribs?.src) {
        const {
          src,
          alt = "",
          width,
          height,
          class: className = "",
        } = node.attribs;

        const w = width ? Number(width) : null;
        const h = height ? Number(height) : null;

        // 🔍 Detect icons / small images
        const isIcon =
          className.includes("icon") ||
          src.includes("icon") ||
          (w !== null && w <= 100) ||
          (h !== null && h <= 100);

        // 🧩 ICON → keep native size, no optimization
        if (isIcon) {
          return (
            <img
              src={src}
              alt={alt}
              width={w ?? undefined}
              height={h ?? undefined}
              loading="lazy"
              decoding="async"
              className={className}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          );
        }

        // 🖼️ CONTENT IMAGE → Next.js optimization
        return (
          <Image
            src={src}
            alt={alt}
            width={w ?? 650}
            height={h ?? 350}
            sizes="(max-width: 640px) 100vw,
                   (max-width: 1024px) 50vw,
                   650px"
            quality={70}
            loading="lazy"
            decoding="async"
            className="mx-auto rounded-lg"
          />
        );
      }
    },
  });
}


export default function Layout1({ data }: LayoutProps) {
   const [showDelayedSections, setShowDelayedSections] = useState(false);
  const stickySections = data?.sticky_section?.navigation || [];
  const contentSections = data?.sticky_section?.content_sections || [];
  const whyExcelr = data?.sticky_section?.why_excelr;
  const participants = data?.sticky_section?.participants;
  const testimonials = data?.sticky_section?.testimonials;
  const courseFaq = data?.sticky_section?.faqs;

   useEffect(() => {
  
    const timer = setTimeout(() => {
      setShowDelayedSections(true);
    }, 8000); // 5 seconds delay
    return () => clearTimeout(timer); 
}, []);

  useEffect(() => {
    const accordions = document.querySelectorAll(
      "#accordion13, #accordion14, #accordion4, #accordionfaq, #accordion5"
    );

    accordions.forEach((accordion) => {
      accordion.addEventListener("click", (event) => {
        if ((event.target as HTMLElement).tagName.toLowerCase() === "summary") {
          const details = (event.target as HTMLElement)
            .parentNode as HTMLElement;

          accordion.querySelectorAll("details").forEach((el) => {
            if (el !== details) el.removeAttribute("open");
          });
        }
      });
    });

    return () => {
      accordions.forEach((accordion) => {
        accordion.replaceWith(accordion.cloneNode(true));
      });
    };
  }, [data]);
  

  return (
    <>
      <CourseBreadcrumb
        courseName={data?.course_name ?? ""}
        category={data?.category}
      />

      {/* 🔥 LCP Hero should stay OUTSIDE CMS */}
      <CourseBanner data={data} />

      <CourseBenefit data={data} />
      {
        showDelayedSections && (
          <>
           <CourseBatche courseName={data?.course_name ?? ""} />
      <CoursePrice data={data} />
          </>
          )
      }
      {/* <CourseBatche courseName={data?.course_name ?? ""} />
      <CoursePrice data={data} /> */}

      {stickySections.length > 0 && (
        <StickyHeader sections={stickySections} />
      )}

      {/* ✅ Optimized CMS Content */}
      {contentSections.map((section) => (
        <div
          id={String(section.id)}
          key={section.id}
          className={`scroll-mt-10 mb-6 ${section.background_class || ""}`}
        >
          {renderCMSContent(section.content_html || "")}
        </div>
      ))}

      {whyExcelr && (
        <div id={whyExcelr.id} className="scroll-mt-10">
          <CourseWhyExcelr data={data} />
        </div>
      )}

      {participants && (
        <div id={participants.id} className="scroll-mt-10">
          <ParticipantsPlaced data={data} />
        </div>
      )}

      {testimonials && (
        <div id={testimonials.id} className="scroll-mt-10">
          <Testimonials data={data} />
        </div>
      )}

      {courseFaq && (
        <div id={courseFaq.id} className="scroll-mt-10">
          <CourseFaq data={data} />
        </div>
      )}

      <CourseGlobal />
      <Accolades data={data} />
      <OurClients />
       
  <CourseLocation data={data} />
    
  <PopularCourse data={data} />
    </>
  );
}
