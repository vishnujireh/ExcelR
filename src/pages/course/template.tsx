"use client";
import React, {useState} from "react";
import Image from "next/image";
import bannerImageUrl from "../../../public/data-analyst-bnr.jpg";
import bannerimg from "../../../public/data-annex.png";
import { RiArrowRightLine } from "react-icons/ri";
import countimage from "../../../public/young-student-woman.png";
import {
  SiMysql,
  SiTableau,
  SiPython,
  SiR
} from "react-icons/si";
import {
  RiTruckLine,
  RiHotelLine,
  RiBankLine,
  RiPlaneLine
} from "react-icons/ri";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";


const modules = [
  {
    id: "excel",
    title: "Excel & Advance Excel",
    icon: <SiTableau className="text-green-600 text-xl" />,
    content:
      "This module lays the foundation and helps you reach an advanced level of Excel skills. Topics include the Basics of Excel, Pivot Tables and all the way to VBA and Macros."
  },
  {
    id: "mysql",
    title: "MySQL",
    icon: <SiMysql className="text-blue-600 text-xl" />,
    content:
      "Learn database concepts, SQL queries, joins, subqueries, indexes and real-world data extraction techniques."
  },
  {
    id: "tableau",
    title: "Tableau",
    icon: <SiTableau className="text-orange-500 text-xl" />,
    content:
      "Build interactive dashboards, data stories, charts and visual analytics using Tableau."
  },
  {
    id: "powerbi",
    title: "Power BI",
    icon: <SiTableau className="text-yellow-500 text-xl" />,
    content:
      "Learn Power BI Desktop, DAX, Power Query and advanced reporting techniques."
  },
  {
    id: "python",
    title: "Python for Data Analytics",
    icon: <SiPython className="text-blue-400 text-xl" />,
    content:
      "Python fundamentals, NumPy, Pandas, data cleaning and data analysis."
  },
  {
    id: "r",
    title: "R Programming",
    icon: <SiR className="text-sky-600 text-xl" />,
    content:
      "Statistical analysis, data modeling and visualization using R."
  }
];

const projects = [
  {
    id: 1,
    title: "Supply Chain Management",
    icon: <RiTruckLine className="text-blue-600 text-xl" />,
    description:
      "This project aims to build a Salesforce Analytics Dashboard that provides real-time visibility into sales pipeline health, lead conversions, revenue performance, and sales team efficiency. The goal is to enable sales leaders to forecast accurately, track sales KPIs, monitor team performance, and drive higher conversion rates by leveraging actionable insights embedded in Salesforce data.",
    bg: "bg-blue-50",
    activeBorder: "border-blue-300"
  },
  {
    id: 2,
    title: "Manufacturing Analytics",
    icon: <RiTruckLine className="text-orange-500 text-xl" />,
    description:
      "Analyze production efficiency, downtime, defect rates, and supply utilization to improve operational performance.",
    bg: "bg-orange-50",
    activeBorder: "border-orange-300"
  },
  {
    id: 3,
    title: "Hospitality Analytics",
    icon: <RiHotelLine className="text-purple-500 text-xl" />,
    description:
      "Track occupancy rates, customer preferences, revenue metrics, and booking trends for hotels and resorts.",
    bg: "bg-purple-50",
    activeBorder: "border-purple-300"
  },
  {
    id: 4,
    title: "Bank Analytics",
    icon: <RiBankLine className="text-green-600 text-xl" />,
    description:
      "Analyze customer behavior, loan performance, fraud detection, and financial KPIs in banking systems.",
    bg: "bg-green-50",
    activeBorder: "border-green-300"
  },
  {
    id: 5,
    title: "Aviation Analytics",
    icon: <RiPlaneLine className="text-indigo-600 text-xl" />,
    description:
      "Monitor flight operations, delays, passenger trends, and fuel efficiency for airlines.",
    bg: "bg-indigo-50",
    activeBorder: "border-indigo-300"
  }
];

export default function Template() {
    const [activeModule, setActiveModule] = useState(modules[0]);
  const [activeProject, setActiveProject] = useState(projects[0]);

  return (
<>
    <section className="course-banner relative w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 text-white overflow-hidden">
    <Image
        src={bannerImageUrl}
        alt="Artificial Intelligence (AI) Course Training in Thane"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover -z-10"
      />
      <div className="grid md:grid-cols-3 gap-4 relative z-10">
              <div className="col-span-3 lg:col-span-2">
                {/* ✅ Course Name from API */}
                <h1 className="text-2xl font-semibold mb-5">Data Analyst Course In Bangalore With Placement Assistance</h1>
      
                 
      
                {/* ✅ Short Description from API */}
                <div className="banerdec">
                    <ul className="list-disc ml-5 space-y-1  text-base">
	<li>6 Months of Learning</li>
	<li>Prestigious IIT Certificate</li>
	<li>No Coding Background Required</li>
	<li>Classroom &amp; Live Online Data Analyst Course Training</li>
	<li>100 Hours of Theory, 40 Hours of Practice Assignments, and 2 Hands-on Capstone Projects</li>
</ul>
                 </div>
      
                
                <div className="flex justify-start">
       <button
                   className="md:mt-8 mt-4 mx-auto flex md:mx-0 items-center gap-2.5 px-6 py-3 bg-[#FFAA33] text-[#154994] font-semibold text-sm border border-[#154994] cursor-pointer hover:bg-black hover:text-white rounded-lg"
                >Download Brochure <RiArrowRightLine className="text-base" />
                </button>
                </div>
                {/* ✅ CTA Button */}
               
              </div>
      
              <div className="col-span-1 lg:col-span-1">
                <div className="w-full h-auto relative max-w-xs mx-auto mt-6 lg:mt-0">
                    <Image 
        src={bannerimg}
        alt="Artificial Intelligence (AI) Course Training in Thane"
        
        priority
        fetchPriority="high"
        className="w-full h-auto object-contain img-fluid"
      />
                </div>
              </div>
            </div>
    </section>

<div className=" relative w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-[#F5FAFF]">
    <div className="grid md:grid-cols-3 grid-cols-1 gap-6 items-center">
        <div className="col-span-1 lg:col-span-1">
             <div className="flex justify-start gap-5 items-center">
                <div className="bg-[#5CADFF] w-24 h-24 rounded-full"></div>
                 <div>
                <h3 className="text-2xl font-bold">150,000+</h3>
                <p className="text-base font-medium">Hiring Partners</p>
            </div>
            </div>
            <div className="my-8 flex justify-start gap-5 items-center">
                <div className="bg-[#5CADFF] w-24 h-24 rounded-full"></div>
                 <div>
                <p className="text-base font-medium">Global Presence in</p>
                <h3 className="text-2xl font-bold">40+ countries</h3>
            </div>
            </div>
            <div className="flex justify-start gap-5 items-center">
                <div className="bg-[#5CADFF] w-24 h-24 rounded-full"></div>
                 <div>
                <p className="text-base font-medium">Industry experience</p>
                <h3 className="text-2xl font-bold">12+ years</h3>
            </div>
            </div>
        </div>
        <div className="col-span-1 lg:col-span-1 text-center">
            <div>
                <Image 
        src={countimage}
        alt="Artificial Intelligence (AI) Course Training in Thane"
        priority
        fetchPriority="high"
        className="w-full h-auto object-contain img-fluid mx-auto"
      />
            </div>
           
        </div>
        <div className="col-span-1 lg:col-span-1">
            <div className="text-end flex justify-end gap-5 items-center">
                 <div>
                <p className="text-base font-medium">In collaboration with</p>
                <h3 className="text-2xl font-bold">Premier IITs</h3>
            </div>
                <div className="bg-[#5CADFF] w-24 h-24 rounded-full"></div>
            </div>
            <div className="my-8 text-end flex justify-end gap-5 items-center">
                 <div>
                <h3 className="text-2xl font-bold">80,000+</h3>
                <p className="text-base font-medium">Learners</p>
            </div>
            <div className="bg-[#5CADFF] w-24 h-24 rounded-full"></div>
            </div>
            <div className="text-end flex justify-end gap-5 items-center">
                 <div>
                <h3 className="text-2xl font-bold">4.8/5</h3>
                <p className="text-base font-medium">Google Reviews</p>
            </div>
            <div className="bg-[#5CADFF] w-24 h-24 rounded-full"></div>
            </div>
        </div>
    </div>
</div>
<div className=" relative w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5">
    <h2 className="text-center text-2xl font-semibold">What You’ll Learn in Our 
Data Analytics Course </h2>
<div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-[#CEE6FF] rounded-2xl shadow-2xl overflow-hidden ">
              <div className="bg-[#155DFC] text-white p-5 text-center">
                <h3 className="text-xl font-semibold">Core Modules</h3> 
              </div>
              <div className="p-4">
                  <div className="flex gap-6">

          {/* Tabs */}
          <div className="w-44 bg-transparent">
            <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-2 ">
              {modules.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveModule(item)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition cursor-pointer
                    ${
                      activeModule.id === item.id
                        ? "bg-blue-100 border-blue-500 text-blue-700 font-semibold"
                        : "bg-white border-gray-200 hover:bg-gray-50"
                    }
                  `}
                >
                  {item.icon}
                  <span className="text-sm">{item.id.charAt(0).toUpperCase() + item.id.slice(1)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {activeModule.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {activeModule.content}
            </p>
          </div>

        </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-[#CEE6FF] rounded-2xl shadow-2xl overflow-hidden ">
              <div className="bg-[#155DFC] text-white p-5 text-center">
                <h3 className="text-xl font-semibold">Value-Added Modules</h3>
              </div>
              <div className="p-4">
                  <div className="flex gap-6">

          {/* Tabs */}
          <div className="w-44 bg-transparent">
            <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-2 ">
              {modules.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveModule(item)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition cursor-pointer
                    ${
                      activeModule.id === item.id
                        ? "bg-blue-100 border-blue-500 text-blue-700 font-semibold"
                        : "bg-white border-gray-200 hover:bg-gray-50"
                    }
                  `}
                >
                  {item.icon}
                  <span className="text-sm">{item.id.charAt(0).toUpperCase() + item.id.slice(1)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {activeModule.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {activeModule.content}
            </p>
          </div>

        </div>
              </div>
            </div>
          </div>
</div>
</div>
<div className=" relative w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5">
    <h2 className="text-center text-2xl font-semibold">Capstone Projects</h2>
     {/* Top Detail Card */}
        <div
          className={`rounded-xl border ${activeProject.activeBorder} ${activeProject.bg} p-6 mb-8 transition-all`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow">
              {activeProject.icon}
            </div>
            <h3 className="text-lg font-semibold">
              {activeProject.title}
            </h3>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">
            {activeProject.description}
          </p>

          <div className="text-right text-xs text-blue-600 font-semibold mt-3">
            {activeProject.id}/{projects.length}
          </div>
        </div>

       <Swiper
  modules={[Pagination, Autoplay]}
  pagination={{ clickable: true }}
  loop={true}
  autoplay={{
    delay: 3500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true
  }}
  spaceBetween={16}
  slidesPerView={1.2}
  breakpoints={{
    640: { slidesPerView: 2.2 },
    1024: { slidesPerView: 4 }
  }}
  className="pb-8"
  onSlideChange={(swiper) => {
    setActiveProject(projects[swiper.realIndex]);
  }}
>
  {projects.map((project) => (
    <SwiperSlide key={project.id}>
      <button
        onClick={() => setActiveProject(project)}
        className={`w-full text-left rounded-xl p-4 border transition
          ${
            activeProject.id === project.id
              ? project.activeBorder + " bg-white shadow-md"
              : "border-transparent bg-gray-50 hover:bg-gray-100"
          }
        `}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow">
            {project.icon}
          </div>
          <p className="text-sm font-semibold">
            {project.title}
          </p>
        </div>

        <div className="text-right text-xs font-semibold mt-4 text-gray-400">
          {project.id}/{projects.length}
        </div>
      </button>
    </SwiperSlide>
  ))}
</Swiper>

</div>
</>
  );
}