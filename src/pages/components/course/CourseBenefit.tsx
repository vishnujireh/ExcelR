"use client";
import React from "react";
import { CourseData } from "@/redux/slices/courseSlice";

interface CourseBenefitProps {
  data?: CourseData; // make optional, safer
}

export default function CourseBenefit({ data }: CourseBenefitProps) {
  // ✅ Defensive check to avoid runtime/SSR crash
  if (!data || !data.course_banner2) {
    return null; // or show a skeleton/loader
  }

  return (
    <div >
      <div dangerouslySetInnerHTML={{ __html: data.course_banner2 }} />
    </div>
  );
}
