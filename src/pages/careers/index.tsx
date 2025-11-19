"use client";
import React from "react";
import Link from "next/link";
import Breadcrumb from "@/pages/components/Breadcrumb";
import { RiTimeLine, RiMapPinLine, RiArrowRightLine  } from "react-icons/ri";
import OurClients from "../components/OurClients"
const careers = [
  {
    slug: "frontend-developer",
    jobtitle: "Frontend Developer",
    location: "Bangalore, India",
    category: "Sales/ Business Development",
  },
  {
    slug: "backend-engineer",
    jobtitle: "Backend Engineer",
    location: "Hyderabad, India",
    category: "Sales/ Business Development",
  },
  {
    slug: "ui-ux-designer",
    jobtitle: "UI/UX Designer",
    location: "Remote",
    category: "Sales/ Business Development",
  },
];

export default function CareerList(){
    return(
        <>
        <div>
        <Breadcrumb />
      </div>
        <div className="w-full md:mx-auto md:py-10 2xl:px-32 xl:px-20 lg:px-10 p-5 career-bg_grad">
           <h1 className="text-3xl font-medium text-shadow-black mb-1.5 text-center uppercase z-50 relative text-white">Careers</h1>
           <div className="w-10 bg-amber-500 h-1 mb-3 text-center mx-auto z-50 relative"></div>
           <p className="z-50 relative text-white text-center italic text-shadow-black">The best way to predict the future is to create it... Join us for a career...</p>
         </div>
        
      <section className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5">
        <div className="grid gap-6 md:grid-cols-3">
          {careers.map((job) => (
            <div key={job.slug} className="rounded-xl p-6 shadow hover:shadow-lg transition">
              <h2 className="text-lg font-semibold mb-4">{job.jobtitle}</h2>
              <p className="text-gray-500 mb-2 flex gap-1 items-center"><RiTimeLine className="w-8 text-[#327ac5]" /> {job.category}</p>
              <p className="text-gray-500 mb-2 flex gap-1 items-center"><RiMapPinLine  className="w-8 text-[#327ac5]" /> {job.location}</p>
              <Link
                href={`/careers/${job.slug}`}
                className="text-[#327ac5] font-semibold inline-flex items-center text-sm mt-3.5 gap-1.5"
              >
                More Details <RiArrowRightLine />
              </Link>
            </div>
          ))}
        </div>
      </section>
      <OurClients />
        </>
    );
}