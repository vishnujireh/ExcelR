"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { CourseData } from "@/redux/slices/courseSlice";
import { FaStar } from "react-icons/fa";

interface Props {
  data: CourseData;
}

export default function PopularCourse({ data }: Props) {
  const courses = data?.popular_courses || [];
  if (courses.length === 0) return null;

  return (
    <div className="w-full md:py-10 p-5 xl:px-20 slidervbp">
      <div className="text-center mb-6">
        <p className="text-2xl font-bold">Popular Courses</p>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 2500 }}
        spaceBetween={20}
        loop
        breakpoints={{
          320: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 4 },
        }}
      >
        {courses.map((item) => (
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
                />
              </div>

              <div className="p-5">
                <div className="">
                <h3 className="font-semibold line-clamp-2 max-h-14 min-h-14">{item.name}</h3>
                  </div>
                <div className="mt-3 flex justify-between">
                  <div className="flex gap-3 items-center">
                    {/* Optional rating */}
                {item.rating_html && (
                  <>
                  <FaStar className="text-yellow-500" />
                  <div
                    className="text-gray-600 text-sm"
                    dangerouslySetInnerHTML={{ __html: item.rating_html }}
                  ></div>
                  </>
                )}
                  </div>
                  <div>
                    {/* Optional enrolled */}
                {item.enrolled_text && (
                  <p className="text-sm text-gray-600">
                    {item.enrolled_text}
                  </p>
                )}
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
