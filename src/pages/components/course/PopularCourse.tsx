"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { CourseData } from "@/redux/slices/courseSlice";
import { RiStarSFill } from "react-icons/ri";
import Link from "next/link";

interface PopularCourseProps {
  data: CourseData;
}

export default function PopularCourse({ data }: PopularCourseProps) {
  const popularCourses = data?.popular_courses || [];

  // Early return if no courses
  if (!popularCourses.length) {
    console.log("No popular courses to display");
    return null;
  }

  console.log("Rendering popular courses:", popularCourses.length);

  return (
    <>
      <div className="w-full md:mx-auto md:py-10 2xl:px-25 slidervbp xl:px-20 lg:px-10 p-5 relative overflow-hidden">
        <div className="text-center md:mb-10 mb-5">
          <p className="text-2xl font-bold mb-1 text-center">Popular Courses</p>
        </div>

        <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={20}
      navigation
      autoplay={{ delay: 2500 }}
      loop
      className="mySwiper"
      breakpoints={{
        320: { slidesPerView: 1, spaceBetween: 10 },
        480: { slidesPerView: 2, spaceBetween: 15 },
        640: { slidesPerView: 3, spaceBetween: 20 },
        768: { slidesPerView: 4, spaceBetween: 20 },
        1024: { slidesPerView: 4, spaceBetween: 25 },
      }}
    >
      {popularCourses.map((item) => (
        <SwiperSlide key={item.id}>
          <Link href={item.url} target="_blank" rel="noopener noreferrer" className="bg-white shadow hover:shadow-lg transition rounded-lg overflow-hidden h-full flex flex-col mb-2">
            <div className="relative w-full aspect-[16/9]">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                unoptimized={item.image.endsWith(".svg")}
                
              />
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-md font-semibold mb-3 line-clamp-2 min-h-[48px]">
                {item.name}
              </h3>

              {/* Rating HTML */}
              
<div>
                            <div className="mt-4 flex items-center justify-between">
                <span className="text-yellow-500 font-semibold flex gap-1 items-center">
                  <RiStarSFill className="text-xl" />
                 <div
                className="rating-wrapper text-[#4a4a4a] text-sm font-medium"
                dangerouslySetInnerHTML={{ __html: item.rating_html }}
              />
                </span>
                <span className="text-[#4a4a4a] text-sm">{item.enrolled_text}</span>
              </div>
                        </div>
              {/* <div className="mt-auto">
                <div className="text-[#4a4a4a] text-sm mb-3">
                  {item.enrolled_text}
                </div>

                <Link
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm text-blue-600 font-semibold hover:underline"
                >
                  View Course →
                </Link>
              </div> */}
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
      </div>

      
    </>
  );
}