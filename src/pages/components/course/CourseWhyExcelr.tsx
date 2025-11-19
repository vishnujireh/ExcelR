"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import { CourseData } from "@/redux/slices/courseSlice";

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

  useEffect(() => {
    if (data?.why_excelr) {
      try {
        // 🧠 Parse the HTML from API safely
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.why_excelr, "text/html");

        // Select all divs containing owl-item (each has image + text)
        const items = Array.from(doc.querySelectorAll(".owl-item div"));

        const parsedPoints = items.map((el) => {
          const img = el.querySelector("img");
          const desc = el.querySelector("h5");
          return {
            src: img?.getAttribute("src") || "",
            alt: img?.getAttribute("alt") || "",
            description: desc?.textContent?.trim() || "",
          };
        });

        setPoints(parsedPoints);
      } catch (error) {
        console.error("Error parsing why_excelr HTML:", error);
      }
    }
  }, [data]);

  return (
    <>
      {/* Contact Section */}
      <div className="w-full md:mx-auto md:py-8 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-[#1f2227]">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
          <div className="col-span-1 lg:col-span-2 flex items-center justify-center">
            <p className="text-center text-2xl font-semibold text-white">
              Contact Our Team of Experts
            </p>
          </div>
          <div className="col-span-1 lg:col-span-1 flex items-center md:justify-start justify-center">
            <Link
              href="/about"
              className="text-white text-center font-semibold border border-solid border-white bg-[#1f2227] hover:bg-white hover:text-[#1f2227] text-sm h-10 px-4 rounded-lg flex items-center"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>

      {/* Why ExcelR Section */}
      <div className="w-full md:mx-auto md:py-8 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-[#343434] text-white">
        <p className="text-2xl font-bold mb-3 md:text-left text-center">
          Why ExcelR?
        </p>

        {points.length > 0 ? (
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={10}
            navigation
            autoplay={{ delay: 2500 }}
            loop
            className="mySwiper"
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 10 },
              480: { slidesPerView: 2, spaceBetween: 15 },
              640: { slidesPerView: 3, spaceBetween: 20 },
              768: { slidesPerView: 4, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
              1280: { slidesPerView: 5, spaceBetween: 30 },
            }}
          >
            {points.map((point, index) => (
              <SwiperSlide key={index}>
                <div className="rounded flex flex-col justify-center items-center">
                  {point.src && (
                    <Image
                      src={point.src}
                      alt={point.alt}
                      width={214}
                      height={94}
                      className="object-contain"
                    />
                  )}
                  <p className="text-sm text-center leading-6 mt-2">
                    {point.description}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-gray-300">No points available</p>
        )}
      </div>
    </>
  );
}
