"use client";
import React, {useState} from "react";
import Image from "next/image";
// import saurabh from "/public/saurabh.jpg"
// import linkedin from "/public/linked-in.svg"
// import facebook from "/public/face-book.svg"
// import twitter from "/public/xlogo.svg"
// import instagram from "/public/instagram.svg"
// import youtube from "/public/you-tube.svg"
// import { FiSearch } from "react-icons/fi";
import heroImage from "/public/hbndo.webp";
import bannerImageUrl from "/public/homebaner.webp";
// import datascience from "/public/ds_home.svg"
// import pmp from "/public/pmp_home.svg"
// import itil from "/public/itil_home.svg"
// import dm from "/public/dm_home.svg"
// import ai from "/public/ai_home.svg"
import { RiCheckboxCircleLine  } from "react-icons/ri";
import QuickEnquiry from "../components/QuickEnquiry";

// const relateCourses = [
//   { name: "Data Science", href: "#", revicon: datascience },
//   { name: "PMP", href: "#", revicon: pmp },
//   { name: "ITIL", href: "#", revicon: itil },
//   { name: "Digital Marketing", href: "#", revicon: dm },
//   { name: "AI", href: "#", revicon: ai },
// ]


export default function Hero() {

   const [ShowEnterprisesPopup, setShowEnterprisesPopup] = useState(false);
   const [ShowQuickEnquiryPopup, setShowQuickEnquiryPopup] = useState(false);

  return (
     <>
     <div className="w-full relative md:mx-auto 2xl:px-25 xl:px-20 lg:px-10 text-center relative">
       {/* <div className="absolute inset-0 bg-gradient-to-r from-[#2781c8] via-black/100 via-[40%] to-[#52b7f3]"></div> */}
<div className="md:block absolute inset-0 -z-10">
                      <Image
                          src={bannerImageUrl}
                          alt="Enroll Course Banner"
                          fill
                          priority
                          fetchPriority="high"
                          sizes="100vw"
                          className="object-cover"
                        />
                        </div>
     <div className="relative z-10 p-8 sm:p-0">
<div className="grid md:grid-cols-7 grid-cols-1 gap-4 items-center">
  <div className="col-span-6 lg:col-span-3 text-white  md:py-15">
    <h1 className="text-left md:text-4xl text-xl  md:mb-7 mb-5 md:leading-12">Upskilling <span className="font-bold uppercase">Careers.</span> <span className="block">Transforming <span className="font-bold uppercase">Workforces.</span></span></h1>
    <ul className="text-left md:text-[19px] font-medium text-[14px] space-y-4">
      <li className="flex md:items-center items-start gap-2"><RiCheckboxCircleLine className="text-xl min-w-5 min-h-5 max-w-5 max-h-5 text-[#0089ff]"  /> <span className="font-bold">13+ Years</span> of Training Experience</li>
      <li className="flex md:items-center items-start gap-2"><RiCheckboxCircleLine className="text-xl min-w-5 min-h-5 max-w-5 max-h-5 text-[#0089ff]"   /> <span className="font-bold">400+</span> Corporate Clients</li>
      <li className="flex md:items-center items-start gap-2"><RiCheckboxCircleLine className="text-xl min-w-5 min-h-5 max-w-5 max-h-5 text-[#0089ff]"  /> <span className="font-bold">800,000+</span> Learners Trained</li>
      <li className="flex md:items-center items-start gap-2"><RiCheckboxCircleLine className="text-xl min-w-5 min-h-5 max-w-5 max-h-5 text-[#0089ff]"  /> <span className="font-bold">75+</span> Indemand Courses</li>
    </ul>
    <div className="md:mt-10 mt-7 md:text-left text-center md:flex md:justify-start justify-center items-center gap-5">
    <button
            onClick={() => setShowQuickEnquiryPopup(true)}
            className="cursor-pointer block border border-solid border-[#0089ff] bg-[#0089ff] text-white hover:bg-white hover:text-[#0089ff] font-semibold text-sm py-2.5 px-4 rounded-lg w-full sm:w-auto"
          >
              <span>Explore Courses</span>
          </button>
          <button
          onClick={() => setShowEnterprisesPopup(true)}
          className="cursor-pointer block mt-4 sm:mt-0 border border-solid border-white bg-white text-black hover:bg-[#2563EB] hover:text-white font-semibold text-sm py-2.5 px-4 rounded-lg w-full sm:w-auto"
          >
              <span>Explore for Enterprises</span>
          </button>
          </div>  
  </div>
   
 
  {/* Second div takes 2 columns on small screens, 3 columns on large screens */}
  <div className="col-span-2 lg:col-span-4">
       <div className="col-span-2 lg:col-span-3 items-center justify-center hidden md:flex">
      <Image src={heroImage} alt="Hero Image" className="img-fluid" />
        </div>
  </div>
</div>
     </div>
    </div>

    {ShowQuickEnquiryPopup && (
  <QuickEnquiry
    formName="drop a query"
    closeModal={() => setShowQuickEnquiryPopup(false)}
  />
)}

   {ShowEnterprisesPopup && (
  <QuickEnquiry
    formName="enterprises"
    closeModal={() => setShowEnterprisesPopup(false)}
  />
)} 
     </>
  );
}