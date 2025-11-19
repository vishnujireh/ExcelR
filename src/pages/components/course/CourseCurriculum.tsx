"use client";

import React, { useEffect } from "react";
import { CourseData } from "@/redux/slices/courseSlice";

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

  // ✅ Extract the Course Description section (id: 1)
  const courseDescription =
    data?.sticky_section?.content_sections?.find(
      (section: any) => section.id === 4
    ) || null;

  return (
    <div className="w-full bg-gray-100 md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5">
      {courseDescription ? (
        <div>
          <h4 className="text-xl font-bold mb-1.5">
            {courseDescription.header}
          </h4>
          <div className="ml-5">
            {/* ✅ Render content_html safely */}
            <div
  dangerouslySetInnerHTML={{
    __html: courseDescription.content_html ?? "",
  }}
/>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No course description available.</p>
      )}
    </div>
  );
}
