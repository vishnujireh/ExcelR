import React from "react";
import CourseBanner from "../../components/course/CourseBannerTemp2";
import CoursePrice from "../../components/course/CoursePrice";
import CourseBenefit from "../../components/course/CourseBenefit";
import CourseDescription from "../../components/course/CourseDescriptionTemp2";
import { CourseData } from "../../../redux/slices/courseSlice"; // ✅ import type
import Image from "next/image";
import parse from "html-react-parser";

interface LayoutProps {
  data: CourseData;
}

export default function Layout2({ data }: LayoutProps) {

  return (
    <div>
      {/* ✅ Pass course data properly */}
      <CourseBanner data={data} />
      <CourseBenefit data={data} />
      {/* ✅ Optimized CMS Content */}
      
      <CourseDescription data={data} />
      <CoursePrice data={data} />
       
    </div>
  );
}
