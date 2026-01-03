"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { useDispatch, useSelector } from "react-redux";
import { fetchTestimonials } from "@/redux/slices/testimonialSlice";
import { RootState, AppDispatch } from "@/redux/store";
import { RiLinkedinFill } from "react-icons/ri";

export default function Testimonials() {
  const dispatch = useDispatch<AppDispatch>();

  const { testimonials, loading, error } = useSelector(
    (state: RootState) => state.testimonials
  );

  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);

  if (loading) return <p className="text-center py-10">Loading testimonials...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div className="xl:px-20 px-5 mt-6 slidervbp">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 3000 }}
        spaceBetween={20}
        loop
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonials.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="bg-white p-5 shadow h-full rounded-lg text-center min-h-[350px]">
              {/* Profile */}
              <div>
                <div className="relative w-14 h-14 rounded-full mx-auto overflow-hidden">
                  <Image
                    src={item.image_url}
                    alt={item.author}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                {item.linkedin_link && (
                        <div className="mx-auto text-center flex justify-center items-center rounded-full mt-4">
                          <Link
                            target="_blank"
                            href={item.linkedin_link}
                            className="w-7 h-7 bg-[#0e76a8] flex justify-center items-center rounded-full"
                          >
                            <RiLinkedinFill className="text-white text-lg" />
                          </Link>
                        </div>
                      )}
                       <div className="text-center mt-2">
                        {/* Caption */}
              <p className="text-md font-semibold text-black">
               {item.caption.replace(/(^“|”$)/g, "")}
              </p>
                  <h4 className="text-[#0071BC] text-sm mt-2">{item.author}</h4>
                  <p className="text-sm text-black mt-2">{item.designation}</p>
                </div>
                  {/* Description */}
              <p className="text-[#666] text-sm leading-6 text-center mt-2 ">
                {item.description}
              </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
