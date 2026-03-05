import React from "react";
import { RiDoubleQuotesR, RiDoubleQuotesL, RiLinkedinFill } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";
import { CourseData } from "@/redux/slices/courseSlice";

interface TestimonialsProps {
  data: CourseData;
}

export default function Testimonials({ data }: TestimonialsProps) {
  // ✅ Safely extract testimonials
  const testimonials = data?.sticky_section?.testimonials?.testimonials || [];
  const sectionTitle =
    data?.sticky_section?.testimonials?.title || "Testimonials";
  const sectionId = data?.sticky_section?.testimonials?.id || "wayp-5";

  // ✅ Prevent rendering if no testimonials
  if (!testimonials.length) return null;

  // ✅ Normalize image URLs to https
  const normalizeUrl = (url: string) =>
    url?.replace(/^http:\/\//, "https://") || "";

  return (
    <div
      id={sectionId}
      className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 slidervbp bg-[#F4F7FF]"
    >
      <div className="text-center mb-10">
        <p className="text-2xl font-bold mb-1 md:text-left text-center">
          {sectionTitle}
        </p>
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 z-10 relative items-center">
          {testimonials.map((item, index) => (
            <div key={index} className="col-span-1 h-full lg:col-span-1">
              <div className="bg-white p-5 shadow h-full rounded-lg">
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-1">
                    <div className="relative">
                      <Image
                        src={normalizeUrl(item.image)}
                        alt={item.author}
                        width={70}
                        height={70}
                        className="rounded-full mx-auto mb-3 object-cover border"
                      />
                      {item.linkedin_link && (
                        <div className="mx-auto text-center flex justify-center items-center rounded">
                          <Link
                            target="_blank"
                            href={item.linkedin_link}
                            className="w-7 h-7 bg-[#0e76a8] flex justify-center items-center rounded"
                          >
                            <RiLinkedinFill className="text-white text-lg" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div>
                      <div className="flex text-md font-semibold text-[#333] items-center">
                        <RiDoubleQuotesL className="text-xs mr-1" />
                        {item.caption.replace(/(^“|”$)/g, "")}
                        <RiDoubleQuotesR className="text-xs ml-1" />
                      </div>
                      <div className="text-black font-semibold">
                        {item.author}
                      </div>
                      <div className="text-[#444] font-semibold my-1">
                        {item.author_designation}
                      </div>
                      <p className="text-[#666] text-sm leading-6">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="md:text-end text-center md:mt-10 mt-3 block">
          <a
            href="https://www.excelr.com/testimonials"
            className="bg-[#ff9600] text-white text-sm inline-block items-center py-2.5 px-5 font-semibold rounded-lg"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  );
}
