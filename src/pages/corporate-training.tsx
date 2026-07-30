"use client";
import React from "react";
import Breadcrumb from "@/pages/components/Breadcrumb";
import OurClients from "./components/OurClients"
import corportimg from "../../public/corporate_training_img.jpg"
import Image from "next/image"
import corporate_usp from "../../public/corporate_usp_v1.webp"
import PopularCourse from "./components/PopularCourse"
import Testimonials from "./components/Testimonials";
import CorporateTrainingForm from "./components/CorporateTrainingForm";
import bannerImageUrl from "/public/corporatetraining_page.webp";


export default function CorporateTraining(){
    return(
        <>
        <div>
        <Breadcrumb />
      </div>
        <div className="w-full md:mx-auto md:py-16 2xl:px-32 xl:px-20 lg:px-10 p-5 relative bg-black md:bg-transparent">
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
           <h1 className="text-3xl font-medium text-shadow-black mb-1.5 text-center uppercase z-30 relative text-white">Corporate Training</h1>
           <div className="w-10 bg-amber-500 h-1 mb-3 text-center mx-auto z-30 relative"></div>
           <p className="z-30 relative text-white text-center italic text-shadow-black">Raising Excellence Then, Now and Forever</p>
         </div>
        
      <section className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 z-10 relative items-center">
          <div className="col-span-1 lg:col-span-1">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-center md:text-left">We Help Brands To Connect & Grow</h2>
              <p className="text-[#666] text-sm leading-7 mb-1.5">The need to address the skill gap in the present tech-savvy world is more than ever. Addressing the weakness, improving employee performance, fostering innovation, and staying abreast with the latest developments in the field of technology, add up in the direction of improving your work environment, critical to the overall growth of your organization.</p>
              <p className="text-[#666] text-sm leading-7">With a firm global footprint in USA, UK, Malaysia and Australia, we at ExcelR are committed towards enhancing and fine-tuning your workforce by providing the best in-house corporate training. Our main forte is providing well experienced, certified and qualified faculty who are passionate about training. Our course curriculum is meticulously designed to suit your business requirements keeping in mind the global business needs of each and every organization.</p>
            </div>
          </div>
          <div className="col-span-1 lg:col-span-1">
            <div>
              <Image src={corportimg} alt="worldmap" className="img-fluid text-center mx-auto" />
            </div>
            
          </div>
        </div>
        <div>
              <Image src={corporate_usp} alt="worldmap" className="img-fluid text-center mx-auto" />
            </div>
      </section>
       <div className="w-full md:mx-auto md:py-10 2xl:px-32 xl:px-20 lg:px-10 p-5 corporateform_bgform">
       <div className="relative z-50 text-center text-white">
        <h3 className="text-2xl font-semibold mb-1.5">Corporate Training</h3>
        <p className="mb-1.5">Post your query. Write us at corporatesales@excelr.com</p>
        <p>We are more than happy to partner with you</p>
        </div>
        <div className="mt-5">
   <CorporateTrainingForm />
</div>
       </div>
       <section className="slidervbp">
               <PopularCourse page_name="corporate-training" heading="Popular Courses" variant="corporate" />
              </section>
        <section className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 ">
        <p className="text-2xl font-bold mb-1 text-center">Testimonials</p>
      <Testimonials />
       </section>
      <OurClients variant="default" />
        </>
    );
}