"use client";
import React, { useEffect } from "react";
import { CourseData } from "@/redux/slices/courseSlice";
import parse from "html-react-parser";

interface CourseDurationProps {
  data: CourseData;
}

export default function CourseDuration({ data }: CourseDurationProps) {
  useEffect(() => {
    const accordions = document.querySelectorAll("#accordion13, #accordion14");

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

  // ✅ Get all sticky content sections from API
  const contentSections = data?.sticky_section?.content_sections || [];

  if (contentSections.length === 0) {
    return (
      <div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5">
        <p className="text-gray-500">No sticky content available.</p>
      </div>
    );
  }

  return (
    <div >
      {contentSections.map((section) => (
        <div key={section.id} className={`mb-6 ${section.background_class || ""}`}>
          {/* <h4 className="text-xl font-bold mb-1.5">{section.header}</h4> */}
          <>
          {parse(section.content_html ?? "")}
          </>
        </div>
      ))}
    </div>
  );
}
