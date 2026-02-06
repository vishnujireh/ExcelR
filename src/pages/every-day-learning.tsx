"use client";
import React from "react";
import Breadcrumb from "@/pages/components/Breadcrumb";
// import OurClients from "./components/OurClients"
import excelr_intro from "../../public/excelr_intro.png"
import edlofferingim from "../../public/edl-offerings.webp"
import Image from "next/image"
import Link from "next/link";
import { LuPhoneCall, LuMail  } from "react-icons/lu";
import OurClients from "./components/OurClients";
import AcademicPartners from "./components/AcademicPartners";
import Collaborated from "./components/Collaborated";
import PopularCourse from "./components/PopularCourse"
import EveryDayLearningForm from "./components/EveryDayLearningForm";
import bannerImageUrl from "/public/edl_ban.webp";


export default function CorporateTraining(){
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
           <h1 className="text-3xl font-medium text-shadow-black mb-1.5 text-center z-50 relative text-white">Every Day Learning Program For Faculty, Students & Colleges</h1>
           <div className="w-10 bg-amber-500 h-1 mb-3 text-center mx-auto z-50 relative"></div>
           <p className="z-50 relative text-white text-center italic text-shadow-black">Helping colleges to fulfil your NAAC/NBA accreditations</p>
         </div>
        
      <section className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 lg:col-span-2">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-center md:text-left">About ExcelR</h2>
              <p className="text-[#666] text-sm leading-7 mb-1.5">
                ExcelR has grown to become a leading giant in the space of Training and Consulting, helping students and professionals across the globe by delivering top-notch, world-class classroom and online training.
              </p>
              <p className="text-[#666] text-sm leading-7 mb-1.5">With world headquarters in Houston, USA and presence in Malaysia and India, we have set up a firm global footprint transcending boundaries and reaching out to students from far and wide. Our passionate and dedicated team of experts have successfully trained students and professionals in multifarious domains which include Data Science, Artificial Intelligence, IOT, Cloud Computing, Project Management etc.</p>
             <div className="grid grid-cols-7 gap-4 z-10 relative items-center">
            <div className="col-span-2 col-start-3">

              <div className="mt-3">
              <Image src={excelr_intro} alt="worldmap" className="img-fluid text-center mx-auto" />
            </div>
          </div>
            </div>
            
            </div>
          </div>
          <div className="col-span-1 lg:col-span-1">
            <div className="shadow p-5">
      <p className="text-lg mb-4 font-semibold text-center">
               Every Day Learning Program
              </p>
      
             <EveryDayLearningForm />

    </div>
          </div>
        </div> 
      </section>
      <div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-[#F4F7FF]">
        <div>
          <h2 className="text-xl font-semibold mb-2">Every Day Learning (EDL)</h2>
          <p className="text-[#666] text-sm leading-7 mb-1.5">Provide application and industry-oriented learning on various trending technologies for free from industry experts with in-depth knowledge on the subjects. This will help the students to have an actual feel of the real-world solutions and help them in their placements</p>
        <p className="text-md font-semibold mb-1 mt-6">Objective</p>
        <ul className="list-decimal text-[#666] space-y-1 text-sm ml-5 mt-2 mb-3">
	<li>Application oriented training for Students and Faculty</li>
	<li>Hands on training on the trending technologies</li>
	<li>Help the colleges in fulfilling a few of the NAAC/NBA requirements</li>
</ul>
        </div>
      </div>
       <div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5">
       <div className="relative z-50 text-center">
        <h3 className="text-2xl font-semibold mb-1.5">EDL Offerings</h3>
         
        </div>
        <div className="mt-5">
          <div className="grid grid-cols-6 gap-4 z-10 relative items-center">
            <div className="col-span-4 col-start-2">

              <div className="text-center mx-auto">
              <Image src={edlofferingim} alt="worldmap" className="img-fluid text-center mx-auto" />
            </div>
          </div>
            </div>
          
        </div>
       </div>
       <div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-[#F4F7FF]">
        <div>
          <h2 className="text-2xl font-bold mb-1 text-center">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4 z-10 relative items-center">
  <div className="col-span-1 md:col-span-3 md:col-start-2">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
      
      <div className="text-center">
        <Link
          href="tel:+91 96069 57287"
          className="flex items-center justify-center sm:justify-start gap-3 text-md font-semibold"
        >
          <span className="w-10 h-10 bg-white shadow rounded-3xl flex items-center justify-center">
            <LuPhoneCall className="text-[#0071BC] text-xl" />
          </span>
          +91 96069 57287
        </Link>
      </div>

      <div className="text-center">
        <Link
          href="mailto:edl@excelr.com"
          className="flex items-center justify-center sm:justify-start gap-3 text-md font-semibold"
        >
          <span className="w-10 h-10 bg-white shadow rounded-3xl flex items-center justify-center">
            <LuMail className="text-[#0071BC] text-xl" />
          </span>
          edl@excelr.com
        </Link>
      </div>

    </div>
  </div>
</div>

        </div>
      </div>
       <section> 
        <AcademicPartners />
       </section>
        <section>
        <Collaborated />
       </section>
       <section className="w-full">
        <OurClients title="Industry Partners" />
       </section>
       <section className="slidervbp">
        <PopularCourse page_name="every-day-learning" heading="Popular Courses" />
       </section>
      {/* <OurClients /> */}
        </>
    );
}