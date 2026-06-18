import React from "react";
import { RiDoubleQuotesR, RiDoubleQuotesL, RiLinkedinFill } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";
import { CourseData } from "@/redux/slices/courseSlice";
import bgnhImageUrl from "../../../../public/bgogn.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

import {FaStar, FaArrowRight } from "react-icons/fa";
import { RiLinkedinBoxFill } from "react-icons/ri";
import companunylogo from "../../../../public/companylogo.png"
import quralogo from "../../../../public/testimonial-Q-logo.png"
import parse from "html-react-parser";
interface TestimonialsProps {
  data: CourseData;
}

export default function Testimonials({ data }: TestimonialsProps) {
  // ✅ Safely extract testimonials
  const testimonials = data?.sticky_section?.testimonials?.testimonials || [];
  

  // ✅ Prevent rendering if no testimonials
  if (!testimonials.length) return null;

  // ✅ Normalize image URLs to https
  const normalizeUrl = (url: string) =>
    url?.replace(/^http:\/\//, "https://") || "";

  const RenderJobDescription = ({ html }: { html: string }) => {
  const options = {
    replace: (domNode: any) => {
      if (
        domNode.name === "p" &&
        domNode.attribs?.class?.includes("fa-arrow-right")
      ) {
        return <FaArrowRight className="text-gray-600" size={18} />;
      }
    },
  };

  return <>{parse(html, options)}</>;
};

  return (
    <div
      
      className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 slidervbp relative slider-ful-hgt"
    >
       <div className="hidden md:block absolute inset-0 -z-10">
              <Image
                  src={bgnhImageUrl}
                  alt="Artificial Intelligence (AI) Course Training in Thane"
                  fill
                  priority
                  fetchPriority="high"
                  sizes="100vw"
                  className="-z-10"
                  quality={55}
                />
                </div>
      {/* <div className="text-center mb-10">
        <p className="text-2xl font-bold mb-1 md:text-left text-center">
          {sectionTitle}
        </p>
      </div> */}
    {/* Testimonials */}
           <div className="max-w-4xl mx-auto">
          <div>
            <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={2}
          slidesPerGroup={1}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          speed={600}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
          }}
          className="w-full px-5  md:px-14 pb-10"
        >
          {testimonials.map((t, index) => (
            <SwiperSlide key={index} style={{ paddingBottom: "20px" }}>
              <div
                key={index}
               className="flex flex-col justify-between h-full rounded-2xl shadow-lg p-6 bg-[#F9FAFB]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative w-14 h-auto overflow-hidden rounded-xl">
                    <Image
                    src={normalizeUrl(t.image) ?? "/images/default-profile.png"}
                      alt={t.author}
                      width={70}
                      height={100}
                      className="object-cover "
                    />
                   
                  </div>


                  <div className=" flex w-full justify-between  ">
                    <div className="flex flex-col">
                      <div>
                        <p className="font-semibold">{t.author}</p>
                        <p className="text-xs text-gray-600 mb-1">{t.author_designation}</p>
                      </div>

                     
                      <div className="flex items-center gap-3">
                         {t.linkedin_link && (
                        <Link href={t.linkedin_link} target="_blank" rel="noopener noreferrer">
                        <RiLinkedinBoxFill className="text-[#2867b2]" />
                      </Link>
                      )}
                        
                        <div className="flex gap-1">
                          {Array.from({ length: t.rating }).map((_, i) => (
                            <FaStar key={i} className="text-orange-400" size={14} />
                          ))}
                        </div>
                      </div>



                    </div>
                    <div className="">
                      <Image
                        src="/testimonialdots.jpg"
                        alt="profile"
                        width={30}
                        height={30}

                        className="img-fluid object-contain"
                      />

                    </div>
                  </div>


                </div>

                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  “{t.description}”
                </p>
{t.job_description && (
  <div className="text-gray-600 text-xs mt-auto">
    <RenderJobDescription html={t.job_description} />
  </div>
)}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
          </div>
          </div>
      {/* <div>
        <div className="md:text-center text-center md:mt-6 mt-3 block">
          <a
            href="https://www.excelr.com/testimonials"
            className="bg-[#ff9600] text-white text-sm inline-block items-center py-2.5 px-5 font-semibold rounded-lg"
          >
            Read more
          </a>
        </div>
      </div> */}
    </div>
  );
}
