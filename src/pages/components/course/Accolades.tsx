"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import { CourseData } from "@/redux/slices/courseSlice";

interface RewardItem {
  src: string;
  alt: string;
}

interface CourseBannerProps {
  data: CourseData;
}

export default function Accolades({ data }: CourseBannerProps) {
  const [rewards, setRewards] = useState<RewardItem[]>([]);

  useEffect(() => {
    if (!data?.rewards) return;

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data.rewards, "text/html");
      const imgs = Array.from(doc.querySelectorAll("img"));

      const parsedRewards: RewardItem[] = imgs.map((img) => ({
        src: img.getAttribute("src") || "",
        alt: img.getAttribute("alt") || "Reward",
      }));

      setRewards(parsedRewards);
    } catch (err) {
      console.error("Error parsing rewards HTML:", err);
    }
  }, [data]);

  return (
    <div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 slidervbp bg-[#F4F7FF]">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-1 md:text-left text-center">
          Accolades
        </h2>
      </div>

      {rewards.length === 0 ? (
        <p className="text-center text-gray-500">No rewards available.</p>
      ) : (
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
            1024: { slidesPerView: 5, spaceBetween: 25 },
          }}
        >
          {rewards.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="rounded flex justify-center items-center">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={214}
                  height={94}
                  className="object-contain max-h-24"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
