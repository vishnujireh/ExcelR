"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeCourses } from "@/redux/slices/homeSlice";
import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function parseRating(html: string) {
  if (!html) return { full: 0, half: 0, empty: 0, total: 0 };

  // Create DOM parser (safe in client)
  const temp = document.createElement("div");
  temp.innerHTML = html;

  const icons = temp.querySelectorAll("i");

  let full = 0;
  let half = 0;
  let empty = 0;

  icons.forEach((icon) => {
    const cls = icon.className;

    if (cls.includes("fa-star-half")) {
      half++;
    } else if (cls.includes("fa-star-o")) {
      empty++;
    } else if (cls.includes("fa-star")) {
      full++;
    }
  });

  // ✅ total parsing (handles commas)
  const text = temp.textContent || "";
  const totalMatch = text.match(/\(([\d,]+)\)/);

  const total = totalMatch
    ? Number(totalMatch[1].replace(/,/g, ""))
    : 0;

  return { full, half, empty, total };
}

export default function OurCourses() {
  const dispatch = useDispatch<any>();
  const { config, courses } = useSelector((state: RootState) => state.home);

  useEffect(() => {
    if (!config.data) return;
    if (config.data.our_courses === "1") {
      dispatch(fetchHomeCourses());
    }
  }, [config.data, dispatch]);

  if (config.data?.our_courses !== "1") return null;

  return (
    <div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5">
      <div className="text-center mb-5">
        <h2 className="text-2xl font-bold mb-1 text-center">
          Our Courses
        </h2>
      </div>

      {courses.loading && (
        <p className="text-center text-gray-500">Loading courses...</p>
      )}

      <div className="grid md:grid-cols-4 gap-4 items-stretch">
        {courses.data.map((course, idx) => {
          const ratingData = course.review_rating
            ? parseRating(course.review_rating)
            : null;

          return (
            <div
              key={idx}
              className="bg-white shadow hover:shadow-lg transition duration-300 overflow-hidden h-full flex flex-col"
            >
              <a href={course.url} className="flex flex-col h-full">
                {/* Image */}
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src={course.image}
                    alt={course.course_name}
                    fill
                    className="block"
                  />
                </div>

                {/* Content */}
               <div className="p-4 flex flex-col flex-1 h-full">
                  <div className="home-popc-content">
                    <h3 className="text-md font-semibold md:mt-1 mt-0 mb-2">
                      {course.course_name}
                    </h3>

                    {/* Description */}
                    {course.description && parse(course.description)}
                  </div>

                  {/* ✅ Updated Rating */}
                  <div className="mt-auto pt-6 flex items-center justify-between">
                    {ratingData && (
                     <>
                      <div className="flex gap-1 items-center">
                        {[...Array(ratingData.full)].map((_, i) => (
                          <FaStar
                            key={`f-${i}`}
                            className="text-yellow-500"
                          />
                        ))}

                        {[...Array(ratingData.half)].map((_, i) => (
                          <FaStarHalfAlt
                            key={`h-${i}`}
                            className="text-yellow-500"
                          />
                        ))}

                        {[...Array(ratingData.empty)].map((_, i) => (
                          <FaRegStar
                            key={`e-${i}`}
                            className="text-gray-300"
                          />
                        ))}

                        <span className="text-gray-600 text-sm ml-1">
                          ({ratingData.total})
                        </span>
                      </div>
                       {course.enrolled_count > 0 && (
          <p className="text-sm text-gray-600">
                          {course.enrolled_count} Learners
                        </p> )}
                       
                     </>
                    )}
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
