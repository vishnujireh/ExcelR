"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { useDispatch, useSelector } from "react-redux";
import { fetchPopularCourses } from "@/redux/slices/popularCoursesSlice";
import { RootState, AppDispatch } from "@/redux/store";

interface Props {
  heading: string;
  page_name: string; // "blog" | "home" | etc
}

export default function PopularCarousel({ heading, page_name }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const { courses, loading } = useSelector(
    (state: RootState) => state.popularCourses
  );

  useEffect(() => {
    dispatch(fetchPopularCourses(page_name));
  }, [dispatch, page_name]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!courses?.length) return null;

  return (
    <div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-[#F4F7FF]">
      <div className="text-center mb-6">
        <p className="text-2xl font-bold mb-1 text-center">{heading}</p>
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
        {courses.map((course) => (
          <SwiperSlide key={course.id}>
            <Link
              href={`/${course.base_url}`}
              className="bg-white shadow hover:shadow-lg transition rounded-lg overflow-hidden block mb-2.5"
            >
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src={course.home_image}
                  alt={course.course_name}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>

              <div className="p-5">
                <h3 className="font-semibold line-clamp-2 min-h-[48px]">
                  {course.course_name}
                </h3>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
