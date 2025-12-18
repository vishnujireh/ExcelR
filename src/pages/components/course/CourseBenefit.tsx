"use client";
import React from "react";
import parse from "html-react-parser";
import Image from "next/image";
import { CourseData } from "@/redux/slices/courseSlice";

interface CourseBenefitProps {
  data?: CourseData;
}

export default function CourseBenefit({ data }: CourseBenefitProps) {
  if (!data?.course_banner2) return null;

  // Convert HTML to React + replace <img> → <Image>
  const htmlContent = parse(data.course_banner2, {
    replace: (domNode: any) => {
      if (domNode.name === "img" && domNode.attribs) {
        const { src, alt } = domNode.attribs;

        // fallback for alt
        const altText = alt || "course image";

        return (
          <Image
            src={src}
            alt={altText}
            width={800} // default width
            height={600} // default height
            loading="lazy"
            className="w-full h-auto mx-auto"
          />
        );
      }
    },
  });

  return <div>{htmlContent}</div>;
}
