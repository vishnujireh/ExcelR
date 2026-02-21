"use client";

import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { CourseData } from "@/redux/slices/courseSlice";
import QuickEnquiry from "../QuickEnquiry";

interface CourseWhyExcelrProps {
  data: CourseData;
}

interface PointItem {
  description: string;
  src: string;
  alt: string;
}

export default function CourseWhyExcelr({ data }: CourseWhyExcelrProps) {
  const [points, setPoints] = useState<PointItem[]>([]);
  const [showSlider, setShowSlider] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Parse CMS HTML
  useEffect(() => {
    if (!data?.why_excelr) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(data.why_excelr, "text/html");
    const items = Array.from(doc.querySelectorAll(".owl-item div"));

    setPoints(
      items.map((el) => {
        const img = el.querySelector("img");
        const desc = el.querySelector("h5");
        return {
          src: img?.getAttribute("src") || "",
          alt: img?.getAttribute("alt") || "",
          description: desc?.textContent?.trim() || "",
        };
      })
    );
  }, [data]);

  // Lazy init Swiper
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowSlider(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Modal logic
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [variant, setVariant] = useState<"default" | "callback">("default");
  const [formName, setFormName] = useState("");

  const openModal = (type: "default" | "callback", name: string) => {
    setVariant(type);
    setFormName(name);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Contact Section */}
      <div className="w-full md:mx-auto md:py-8 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-[#1f2227]">
        <div className="grid md:grid-cols-3 gap-6">
          <p className="md:col-span-2 text-center text-2xl font-semibold text-white">
            Contact Our Team of Experts
          </p>
          <div className="flex justify-center md:justify-start">
            <button
              onClick={() => openModal("default", "Drop a Query")}
              className="bg-white text-black font-semibold h-10 px-4 rounded-lg"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </div>

      {/* Why ExcelR Section */}
      <div
        ref={sectionRef}
       className="w-full md:mx-auto md:py-8 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-[#343434] text-white"
      >
        <p className="text-2xl font-bold mb-3 text-center md:text-left">
          Why ExcelR?
        </p>

        {!showSlider || points.length === 0 ? (
          // Placeholder to avoid CLS
          <div className="h-[180px]" />
        ) : (
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={10}
            navigation
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop
            className="whyexcelr-swiper"
            breakpoints={{
              320: { slidesPerView: 1 },
              480: { slidesPerView: 2 },
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1280: { slidesPerView: 4 },
            }}
          >
            {points.map((point, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center">
                  {point.src && (
                    <Image
                      src={point.src}
                      alt={point.alt}
                      width={214}
                      height={94}
                      className="object-contain"
                    />
                  )}
                  <p className="text-sm text-center mt-2 mb-12">
                    {point.description}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {isModalOpen && (
        <QuickEnquiry
          closeModal={() => setIsModalOpen(false)}
          variant={variant}
          formName={formName}
          course={data?.course || data?.course_name}
          city={data?.city}
          state={data?.state}
          country={data?.country}
        />
      )}
    </>
  );
}
