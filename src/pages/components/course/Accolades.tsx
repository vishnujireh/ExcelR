"use client";

import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
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
  const [showSlider, setShowSlider] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Parse CMS HTML
  useEffect(() => {
    if (!data?.rewards) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(data.rewards, "text/html");
    const imgs = Array.from(doc.querySelectorAll("img"));

    setRewards(
      imgs.map((img) => ({
        src: img.getAttribute("src") || "",
        alt: img.getAttribute("alt") || "Reward",
      }))
    );
  }, [data]);

  // Load slider ONLY when visible
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowSlider(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-[#F4F7FF] slidervbp"
    >
      <h2 className="text-2xl font-bold mb-8 text-center md:text-left">
        Accolades
      </h2>

      {!showSlider || rewards.length === 0 ? (
        // Placeholder to avoid layout shift
        <div className="h-[120px]" />
      ) : (
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          navigation
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop
          breakpoints={{
            320: { slidesPerView: 1 },
            480: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
        >
          {rewards.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex justify-center items-center">
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
