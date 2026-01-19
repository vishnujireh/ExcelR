"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import parse from "html-react-parser";
// import LazyLoad from "../../components/LazyLoadComponent";
import CourseBanner from "../../components/course/CourseBanner";
import CourseBenefit from "../../components/course/CourseBenefit";
import CourseBatche from "../../components/course/CourseBatche";
import CoursePrice from "../../components/course/CoursePrice";
import ParticipantsPlaced from "../../components/course/ParticipantsPlaced";
import Testimonials from "../../components/course/Testimonials";
import CourseFaq from "../../components/course/CourseFaq";
import CourseGlobal from "../../components/course/CourseGlobal";
import Accolades from "../../components/course/Accolades";
import OurClients from "../../components/OurClients";
import CourseLocation from "../../components/course/CourseLocation";
import PopularCourse from "../../components/course/PopularCourse";
import CourseWhyExcelr from "../../components/course/CourseWhyExcelr";
import StickyHeader from "../../components/course/StickyHeader";
import CourseBreadcrumb from "../../components/course/CourseBreadcrumb";

import { CourseData } from "../../../redux/slices/courseSlice";

interface LayoutProps {
  data: CourseData;
}

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
            className="mx-auto rounded-lg"
          />
        );
      }
    },
  });
}


export default function Layout1({ data }: LayoutProps) {
  const stickySections = data?.sticky_section?.navigation || [];
  const contentSections = data?.sticky_section?.content_sections || [];
  const whyExcelr = data?.sticky_section?.why_excelr;
  const participants = data?.sticky_section?.participants;
  const testimonials = data?.sticky_section?.testimonials;
  const courseFaq = data?.sticky_section?.faqs;

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
      <CourseBatche courseName={data?.course_name ?? ""} />
      <CoursePrice />

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
      {/* <LazyLoad
      delay={25000} // 15 seconds
  placeholder={
    <div className="w-full h-[400px] bg-gray-200 animate-pulse rounded-lg" />
  }
></LazyLoad> */}
  <CourseLocation data={data} />
    
  <PopularCourse data={data} />
    </>
  );
}
