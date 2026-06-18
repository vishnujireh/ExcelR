"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// ✅ Correct image imports (from /public)
import partnerone from "../../../public/akis-poona-college.png";
import gitam from "../../../public/alamuri-ratnamala.png";
import jntuk from "../../../public/amc-01.png";
import steinbeits from "../../../public/anjuman-islam.png";
import steinbeits2 from "../../../public/bharti-vidyapeeth.png";
import task from "../../../public/git-01.png";
import woxsen from "../../../public/lords-01.png";
import new_horizon from "../../../public/new-horizon.png"
import pravin_patil from "../../../public/pravin-patil.png"
import sinhgad_institute from "../../../public/sinhgad-institute.png"

// ✅ Correct type
type StaticLogo = {
  id: number;
  name: string;
  image_url: StaticImageData;
};

// ✅ Correct static array
const staticLogos: StaticLogo[] = [
  { id: 1, name: "A.K.I’s Poona College of Arts, Commerce & Science", image_url: partnerone },
  { id: 2, name: "Alamuri Ratnamala Institute of Engineering and Technology", image_url: gitam },
  { id: 3, name: "AMC", image_url: jntuk },
  { id: 4, name: "Anjuman I Islam’s Kalsekar Technical Campus", image_url: steinbeits },
  { id: 5, name: "Bharti Vidyapeeth College of Engineering,Belapur", image_url: steinbeits2 },
  { id: 6, name: "GIT", image_url: task },
  { id: 7, name: "Lords", image_url: woxsen },
  {id:8, name:"New Horizon Institute of Technology & Management", image_url:new_horizon},
  {id:9, name:"Pravin Patil College of Diploma Engineering", image_url:pravin_patil},
  {id:10, name:"Sinhgad Institute of Technology & Science", image_url:sinhgad_institute}
];

export default function Collaborated({
  title = "Collaborated With",
}: {
  title?: string;
}) {
  return (
    <div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 slidervbp bg-[#F4F7FF]">
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
              <div className="relative w-full aspect-[3/1] md:aspect-[6/3]  border border-gray-300 bg-white">
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
