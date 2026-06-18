"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import { useDispatch, useSelector } from "react-redux";
import { fetchPopularCourses } from "@/redux/slices/popularCoursesSlice";
import { RootState, AppDispatch } from "@/redux/store";

interface Props {
  heading: string;
  page_name: string; // "blog" | "home" | etc
  variant?: "default" | "blog";
}

export default function PopularCarousel({ heading, page_name, variant="default"}: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const { courses, loading } = useSelector(
    (state: RootState) => state.popularCourses
  );

  useEffect(() => {
    dispatch(fetchPopularCourses(page_name));
  }, [dispatch, page_name]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!courses?.length) return null;

  const breakpoints =
    variant === "blog"
      ? {  320: { slidesPerView: 1 },
          480: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 3 },
        }
      :
        {
          320: { slidesPerView: 1 },
          480: { slidesPerView: 1 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 4 },
        }
        const containerClasses =
  variant === "blog"
    ? "w-full py-6 slidervbp mt-6"
    : "w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-[#F4F7FF] slidervbp";

    const headingClasses =
    variant === "blog"
      ? "text-xl font-semibold mb-2 text-left"
      : "text-2xl font-bold mb-1 text-center";
    

  return (
    <div className={containerClasses}>
      <div className="text-center mb-6">
        <h6 className={headingClasses}>{heading}</h6>
        {variant === "blog" &&
        <div className="w-12 h-1 bg-[#197b9f] mb-4"></div>
        }

      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 2500 }}
        spaceBetween={20}
        loop
        breakpoints={breakpoints}
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
