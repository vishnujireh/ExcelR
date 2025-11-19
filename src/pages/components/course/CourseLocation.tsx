"use client";
import React from "react";
import { CourseData } from "@/redux/slices/courseSlice";

interface CourseLocationProps {
  data?: CourseData; // make optional, safer
}

export default function CourseLocation({ data }: CourseLocationProps) {
  // ✅ Defensive check to avoid runtime/SSR crash
  if (!data || !data.map) {
    return null; // or show a skeleton/loader
  }

  return (
    <div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-[#F4F7FF]">
      <div dangerouslySetInnerHTML={{ __html: data.map }} />
    </div>
  );
}
