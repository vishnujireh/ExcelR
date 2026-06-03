"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { CourseData } from "@/redux/slices/courseSlice";
import {RiArrowRightUpLine} from "react-icons/ri";

interface Props {
  data: CourseData;
}

// ✅ Parse FontAwesome HTML → structured rating
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

export default function PopularCourse({ data }: Props) {
  const [mounted, setMounted] = useState(false);
  const courses = data?.popular_courses || [];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || courses.length === 0) return null;

  return (
    <div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-[#E5EFFF] slidervbp">
      <div className="text-center mb-6">
        <p className="text-3xl font-semibold mb-2">In-Demand Courses</p>
      </div>
<div className="relative w-full px-5 max-w-5xl mx-auto pt-5">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        spaceBetween={20}
        loop
        observer
        observeParents
        breakpoints={{
          320: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
            1024: { slidesPerView: 3 },
                       1280: { slidesPerView: 3 },
        }}
      >
        {courses.map((item) => {
          const ratingData = item.rating_html
            ? parseRating(item.rating_html)
            : null;

          return (
            <SwiperSlide key={item.id} className="flex gap-5  justify-center">
                              <div className="w-full bg-white rounded-xl flex flex-col overflow-hidden border border-gray-100">
                                <div className="p-4">
                                   <div className="relative w-full h-40">
                                  <Image src={item.image} alt={item.name} fill className="object-cover rounded-xl" />
                                  {/* <div className="absolute top-2 left-2 bg-white rounded-md px-2 py-1 text-xs font-semibold shadow-sm">
                                    {item.tag}
                                  </div> */}
                                </div>
                                </div>
                                <div className="px-4 text-left space-y-2 pb-4">
                                  <h3 className="font-semibold text-lg">{item.name}</h3>
                                  {/* <p className="text-sm text-gray-600">{item.desc}</p> */}
                                  </div>
                                   <div className="border-t border-gray-200 px-4 text-center">
                                  <Link href={item.url} className="flex justify-center items-center text-sm font-medium text-black mx-auto py-4">
                                    Know more
                                    <span className="ml-2 bg-white shadow-lg p-2 rounded-lg">
                                      <RiArrowRightUpLine className="text-gray-600"  size={16} />
                                    </span>
                                  </Link>
                                </div>
                              </div>
                            </SwiperSlide>
           
          );
        })}
      </Swiper>
      </div>
    </div>
  );
}