"use client";
import React from "react";
import Breadcrumb from "@/pages/components/Breadcrumb";


export default function AboutUs(){
    return(
        <>
        <div>
        <Breadcrumb />
      </div>
        <div className="w-full md:mx-auto md:py-10 2xl:px-32 xl:px-20 lg:px-10 p-5 career-bg_grad">
           <h1 className="text-3xl font-medium text-shadow-black mb-1.5 text-center uppercase z-50 relative text-white">In Media</h1>
         </div>
        
      <section className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5">
        <div className="grid md:grid-cols-1 grid-cols-1 gap-4 z-10 relative items-center">
          <div className="col-span-1 lg:col-span-1">
            <div>
              <h2 className="text-xl font-semibold text-center md:text-left">ExcelR Launches course on Analytics with curriculum of International standards</h2>
              <p className="text-[#666] text-sm leading-7 mb-2.5">Data, data & data, these are and would be the hymns of the business world. Traditional data generation avenues aside, the current world is witnessing data getting generated from wearable devices to all the household equipments, from drones to driverless cars, from Facebook to WhatsApp. Easier way to answer this, is to question on what does not generate data.With these kind of inventions in data generation came a rocking profession called “Data Scientist”, who would convert data generated from wearable device into information so robust that it can help humans identify the diseases even before a doctor could.</p>
</div>
          </div>
          
        </div>
      </section>
       
        </>
    );
}