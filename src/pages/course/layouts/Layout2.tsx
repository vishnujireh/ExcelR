import React from "react";
import CourseBanner from "../../components/course/CourseBanner";
import CoursePrice from "../../components/course/CoursePrice";
import CourseBenefit from "../../components/course/CourseBenefit";
import { CourseData } from "../../../redux/slices/courseSlice"; // ✅ import type

interface LayoutProps {
  data: CourseData;
}

export default function Layout2({ data }: LayoutProps) {
  return (
    <div>
      {/* ✅ Pass course data properly */}
      <CourseBanner data={data} />
      <CoursePrice data={data} />
      <CourseBenefit data={data} />
       
    </div>
  );
}
