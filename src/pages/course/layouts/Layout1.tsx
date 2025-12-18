"use client";
import React, { useEffect } from "react";
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
import { CourseData } from "../../../redux/slices/courseSlice";
import CourseBreadcrumb  from "../../components/course/CourseBreadcrumb";

interface LayoutProps {
  data: CourseData;
}

export default function Layout1({ data }: LayoutProps) {
  const stickySections = data?.sticky_section?.navigation || [];
  const contentSections = data?.sticky_section?.content_sections || [];
  const whyExcelr = data?.sticky_section?.why_excelr;
  const participants = data?.sticky_section?.participants;
  const testimonials = data?.sticky_section?.testimonials;
  const courseFaq = data?.sticky_section?.faqs; // ✅ renamed

  useEffect(() => {
    const accordions = document.querySelectorAll("#accordion13, #accordion14, #accordion4, #accordionfaq, #accordion5");

    accordions.forEach((accordion) => {
      accordion.addEventListener("click", (event) => {
        if ((event.target as HTMLElement).tagName.toLowerCase() === "summary") {
          const details = (event.target as HTMLElement).parentNode as HTMLElement;
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
    <div>
     <CourseBreadcrumb courseName={data?.course_name ?? ""} />
      <CourseBanner data={data} />
      <CourseBenefit data={data} />
      <CourseBatche courseName={data?.course_name ?? ""}   />
      <CoursePrice />

      {stickySections.length > 0 && <StickyHeader sections={stickySections} />}

      {/* Dynamic Sticky Sections */}
      {contentSections.map((section) => (
        <div
          id={String(section.id)}
          key={section.id}
          className={`scroll-mt-10 mb-6 ${section.background_class || ""}`}
          dangerouslySetInnerHTML={{ __html: section.content_html || "" }}
        />
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
    </div>
  );
}
 