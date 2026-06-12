"use client";
import React, { useEffect } from "react";
import Breadcrumb from "@/pages/components/Breadcrumb";
import Image from "next/image"
import Link from "next/link";
import bannerImageUrl from "/public/edl_ban.webp";
import { fetchTestimonials } from "@/redux/slices/testimonialSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { RiLinkedinFill } from "react-icons/ri";


export default function PlacementPortal(){
  const dispatch = useDispatch<AppDispatch>();
  
 const { testimonials, loading, error } = useSelector(
    (state: RootState) => state.testimonials
  );

  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);
  return(
        <>
        <div>
        <Breadcrumb />
      </div>
        <div className="w-full md:mx-auto md:py-16 2xl:px-32 xl:px-20 lg:px-10 p-5 relative">
                        <div className="hidden md:block absolute inset-0 -z-10">
                              <Image
                                  src={bannerImageUrl}
                                  alt="Enroll Course Banner"
                                  fill
                                  priority
                                  fetchPriority="high"
                                  sizes="100vw"
                                  className="object-cover -z-10"
                                  quality={55}
                                />
                                </div>
                                <div className="hidden md:block absolute inset-0 bg-black/60 z-0" />
           <h1 className="text-3xl font-medium text-shadow-black mb-1.5 text-center z-50 relative text-white">Placement Portal</h1>
         </div>
        
      <section className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 z-10 relative items-center">
        {testimonials.map((item, index) => (
                    <div key={index} className="col-span-1 h-full lg:col-span-1">
                      <div className="bg-white p-5 shadow h-full rounded-lg">
                        <div className="grid grid-cols-4 gap-4">
                          <div className="col-span-1">
                            <div className="relative">
                              <Image
                                src={item.image_url}
                    alt={item.author}
                                width={70}
                                height={70}
                                className="rounded-full mx-auto mb-3 object-cover border"
                              />
                              
                            </div>
                          </div>
                          <div className="col-span-3">
                            <div>
                              <div className="text-black font-semibold">
                               Name: <span className="font-medium text-sm">{item.author}</span>
                              </div>
                              <div className="text-[#444] font-semibold my-1">
                               Domain: <span className="font-medium text-sm">{item.designation}</span>
                              </div>
                              <div className="text-[#444] font-semibold my-1">
                               Company: <span className="font-semibold text-sm text-[#0e76a8]">Disclaimer*</span>
                              </div>
                              {item.linkedin_link && (
                                 <Link
                                    target="_blank"
                                    href={item.linkedin_link}
                                    className=" text-[#0e76a8] font-semibold"
                                  >
                                    LinkedIn
                                  </Link> 
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
        </div>
        
      </section>
        </>
    );
}