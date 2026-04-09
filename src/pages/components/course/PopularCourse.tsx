"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { CourseData } from "@/redux/slices/courseSlice";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

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
    <div className="w-full md:py-10 p-5 xl:px-20 slidervbp">
      <div className="text-center mb-6">
        <p className="text-2xl font-bold">Popular Courses</p>
      </div>

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
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 4 },
        }}
      >
        {courses.map((item) => {
          const ratingData = item.rating_html
            ? parseRating(item.rating_html)
            : null;

          return (
            <SwiperSlide key={item.id}>
              <Link
                href={item.url}
                className="bg-white shadow hover:shadow-lg transition rounded-lg overflow-hidden block mb-3"
              >
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>

                <div className="p-5">
                  <h3 className="font-semibold line-clamp-2 min-h-14">
                    {item.name}
                  </h3>

                  <div className="mt-3 flex justify-between items-center">
                    {ratingData && (
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
                    )}

                    {item.enrolled_text && (
                      <p className="text-sm text-gray-600">
                        {item.enrolled_text}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}