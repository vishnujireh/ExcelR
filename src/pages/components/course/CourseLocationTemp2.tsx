"use client";
import React, { useEffect, useRef, useState } from "react";
import { CourseData } from "@/redux/slices/courseSlice";
import parse from "html-react-parser";

interface CourseLocationProps {
  data?: CourseData;
}

export default function CourseLocation({ data }: CourseLocationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoadMap, setShouldLoadMap] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !data?.map) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadMap(true);
          observer.disconnect(); // load once
        }
      },
      {
        rootMargin: "200px", // preload slightly before visible
      }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [data?.map]);

  if (!data?.map) return null;

  return (
    <div
      ref={containerRef}
      className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-white"
    >
      {shouldLoadMap && (
        <>{parse(data.map ?? "")}</>
      )}
    </div>
  );
}
