"use client";
import React from "react";
import Image from "next/image";
import homeyoutube from "/public/worldmap.png"

 
export default function CourseGlobal() {
  return (
    <>
    
        <div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 relative overflow-hidden">
             <div className="grid md:grid-cols-2 grid-cols-1 gap-4 z-10 relative items-center">
    <div className="col-span-1 lg:col-span-1">
       
        <div>
            <p className="text-2xl font-bold mb-3 md:text-left text-center">Global Presence</p>
            <p className="text-[#666] text-sm leading-7 md:text-left text-justify">ExcelR is a training and consulting firm with its global headquarters in Houston, Texas, USA. Alongside to catering to the tailored needs of students, professionals, corporates and educational institutions across multiple locations, ExcelR opened its offices in multiple strategic locations such as Australia, Malaysia for the ASEAN market, Canada, UK, Romania taking into account the Eastern Europe and South Africa. In addition to these offices, ExcelR believes in building and nurturing future entrepreneurs through its Franchise verticals and hence has awarded in excess of 30 franchises across the globe. This ensures that our quality education and related services reach out to all corners of the world. Furthermore, this resonates with our global strategy of catering to the needs of bridging the gap between the industry and academia globally.</p>
                 </div>
    </div>
    <div className="col-span-1 lg:col-span-1">
        <div className="relative ">
            <Image src={homeyoutube} alt="worldmap" className="img-fluid text-center mx-auto" />
        </div>
    </div>
             </div>
        </div>
        </>
  );
}