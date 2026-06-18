"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import { RiLinkedinBoxFill } from "react-icons/ri";
import { CourseData } from "@/redux/slices/courseSlice";

interface ParticipantsPlacedProps {
  data: CourseData;
}

interface Participant {
  name: string;
  image: string;
  linkedin_link?: string;
}

export default function ParticipantsPlaced({ data }: ParticipantsPlacedProps) {
  // ✅ Correct API path
  const participants: Participant[] =
    data?.sticky_section?.participants?.participants || [];

  const sectionTitle =
    data?.sticky_section?.participants?.title ||
    "Participants Placed Through ExcelR";

  const sectionId = data?.sticky_section?.participants?.id || "wayp-4";

  // ✅ Guard
  if (!participants.length) {
    return null; // or show placeholder if you prefer
  }

  

  return (
    <div
      id={sectionId}
      className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 slidervbp"
    >
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold mb-1 md:text-left text-center">
          {sectionTitle}
        </h2>
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
          1024: { slidesPerView: 5, spaceBetween: 20 },
          1280: { slidesPerView: 6, spaceBetween: 20 },
        }}
      >
        {participants.map((client, index) => (
          <SwiperSlide key={index}>
            <div className="text-center relative">
              <div className="rounded flex justify-center items-center">
                <Image
                  src={client.image}
                  alt={client.name}
                  width={160}
                  height={160}
                  className="object-cover rounded-full border border-gray-300 shadow-md"
                />
              </div>

              {client.linkedin_link && (
                <div className="mx-auto text-center flex justify-center items-center rounded md:absolute md:right-3 md:bottom-14 relative bottom-0">
                  <button
                    onClick={() => window.open(client.linkedin_link, "_blank")}
                    className="w-7 h-7 bg-[#0e76a8] flex justify-center items-center rounded"
                  >
                    <RiLinkedinBoxFill className="text-white text-xl" />
                  </button>
                </div>
              )}

              <p className="mt-2 text-md font-semibold">{client.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
