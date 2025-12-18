"use client";
import React from "react";
import Breadcrumb from "@/pages/components/Breadcrumb";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Image from "next/image";

 const images = [
   "/yodlee_gallary.jpg",
  "/gallary_ieee.jpg",
  "/microfocus_python.jpg",
  "/mlearning.jpg",
];


export default function AboutUs(){
    return(
        <>
        <div>
        <Breadcrumb />
      </div>
        <div className="w-full md:mx-auto md:py-10 2xl:px-32 xl:px-20 lg:px-10 p-5 career-bg_grad">
           <h1 className="text-3xl font-medium text-shadow-black mb-1.5 text-center uppercase z-50 relative text-white">Gallery</h1>
         </div>
      <section className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5">
         <PhotoProvider>
           <div className="grid md:grid-cols-4 grid-cols-1 gap-4 z-10 relative">
        {images.map((src, index) => (
          <PhotoView key={index} src={src}>
            <div style={{ cursor: "pointer" }} className="relative w-full aspect-[16/9]">
              <Image
                src={src}
                alt={`Gallery image ${index + 1}`}
                 fill
                loading="lazy"
                style={{ objectFit: "cover", borderRadius: "8px" }}
              />
            </div>
          </PhotoView>
        ))}
      </div>
         </PhotoProvider>
      </section>
       
        </>
    );
}