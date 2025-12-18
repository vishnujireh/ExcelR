"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

// ✅ Correct image imports (from /public)
import partnerone from "../../../public/apssdc-01.png";
import gitam from "../../../public/gitam-01.png";
import jntuk from "../../../public/jntuk-01.png";
import steinbeits from "../../../public/steinbeits-01.png";
import steinbeits2 from "../../../public/steinbeits-01-01.png";
import task from "../../../public/task-01.png";
import woxsen from "../../../public/woxsen-01.png";

// ✅ Correct type
type StaticLogo = {
  id: number;
  name: string;
  image_url: StaticImageData;
};

// ✅ Correct static array
const staticLogos: StaticLogo[] = [
  { id: 1, name: "APSSDC", image_url: partnerone },
  { id: 2, name: "Gitam", image_url: gitam },
  { id: 3, name: "JNTUK", image_url: jntuk },
  { id: 4, name: "Steinbeits", image_url: steinbeits },
  { id: 5, name: "Steinbeits 2", image_url: steinbeits2 },
  { id: 6, name: "TASK", image_url: task },
  { id: 7, name: "Woxsen", image_url: woxsen },
];

export default function AcademicPartners({
  title = "Academic Partners",
}: {
  title?: string;
}) {
  return (
    <div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 slidervbp">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold mb-1 text-center">{title}</h2>
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
          1024: { slidesPerView: 6, spaceBetween: 20 },
          1280: { slidesPerView: 6, spaceBetween: 20 },
        }}
      >
        {staticLogos.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="flex justify-center items-center">
              <div className="relative w-full aspect-[3/1] md:aspect-[6/3] border border-gray-300">
                <Image
                  src={item.image_url}
                  alt={item.name}
                  fill
                  className="object-contain"
                  priority={item.id === 1}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
