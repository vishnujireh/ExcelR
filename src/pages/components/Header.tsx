import React from "react";
import Navbar from "./Navbar";
import type { CourseData } from "@/redux/slices/courseSlice";

interface HeaderProps {
  courseData?: CourseData | null;
}

export default function Header({ courseData }: HeaderProps) {
  return (
 <div
      className="
        w-full 
        py-4 
        2xl:px-25 xl:px-20 lg:px-10 px-5 
        bg-white 
        border-b border-[#ECEDF2] 
        shadow-[0px_6px_15px_0px_rgba(64,79,104,0.06)]
        
        /* MOBILE: Fixed header */
        fixed top-0 left-0 z-50 
        md:relative
      "
    > <Navbar courseData={courseData} />
    </div>
  );
}
