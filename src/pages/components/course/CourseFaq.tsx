"use client";
import React from "react";
import { CourseData } from "@/redux/slices/courseSlice";

interface CourseFaqProps {
  data: CourseData;
}

export default function CourseFaq({ data }: CourseFaqProps) {
  // ✅ Extract FAQ data from API
  const faqData = data?.sticky_section?.faqs;

  // ✅ Guard if there’s no FAQ data
  if (!faqData || !faqData.content_html) {
    return null;
  }

  return (
    <div
      id={faqData.id || "faqs"}
      className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-[#F4F7FF]"
    >
      {/* Title */}
      {faqData.title && (
        <h2 className="text-xl font-semibold mb-4">{faqData.title}</h2>
      )}

      {/* Render HTML from API */}
      <div
        dangerouslySetInnerHTML={{
          __html: faqData.content_html || "",
        }}
      />
    </div>
  );
}
