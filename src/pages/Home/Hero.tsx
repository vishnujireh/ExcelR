"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
// import saurabh from "/public/saurabh.jpg"
// import linkedin from "/public/linked-in.svg"
// import facebook from "/public/face-book.svg"
// import twitter from "/public/xlogo.svg"
// import instagram from "/public/instagram.svg"
// import youtube from "/public/you-tube.svg"
// import { FiSearch } from "react-icons/fi";
import heroImage from "/public/bnhro.png";
// import datascience from "/public/ds_home.svg"
// import pmp from "/public/pmp_home.svg"
// import itil from "/public/itil_home.svg"
// import dm from "/public/dm_home.svg"
// import ai from "/public/ai_home.svg"
import { LuPhoneCall } from "react-icons/lu";
import { RiCheckboxCircleLine  } from "react-icons/ri";

// const relateCourses = [
//   { name: "Data Science", href: "#", revicon: datascience },
//   { name: "PMP", href: "#", revicon: pmp },
//   { name: "ITIL", href: "#", revicon: itil },
//   { name: "Digital Marketing", href: "#", revicon: dm },
//   { name: "AI", href: "#", revicon: ai },
// ]
export default function Hero() {
  return (
     <>
     <div className="w-full relative md:mx-auto md:py-15 2xl:px-25 xl:px-20 lg:px-10 p-5 text-center bg-[#F4F7FF]" style={{backgroundImage: `url('/bannerbg.png')`, backgroundRepeat: 'no-repeat', }}>
       <div className="absolute inset-0 bg-gradient-to-r from-[#2781c8] via-black/100 via-[40%] to-[#52b7f3]"></div>

     <div className="relative z-10">
<div className="grid md:grid-cols-6 grid-cols-1 gap-4 items-center">
  <div className="col-span-6 lg:col-span-3 text-white">
    <h1 className="text-left md:text-3xl text-xl font-semibold md:mb-7 mb-5 md:leading-12">Leading the Future with Data Science  & AI Expertise Experience Real-World Impact</h1>
    <ul className="text-left md:text-[17px] text-[14px] space-y-4">
      <li className="flex md:items-center items-start gap-2"><RiCheckboxCircleLine className="text-xl min-w-5 min-h-5 max-w-5 max-h-5"  /> Over 70+ Domain-Specific Analytics Program Since 2013</li>
      <li className="flex md:items-center items-start gap-2"><RiCheckboxCircleLine className="text-xl min-w-5 min-h-5 max-w-5 max-h-5"   /> Personalize Your Learning Journey</li>
      <li className="flex md:items-center items-start gap-2"><RiCheckboxCircleLine className="text-xl min-w-5 min-h-5 max-w-5 max-h-5"  /> 100% Practical Learning Through Live Projects</li>
      <li className="flex md:items-center items-start gap-2"><RiCheckboxCircleLine className="text-xl min-w-5 min-h-5 max-w-5 max-h-5"  /> Join  our Hands on  Projects</li>
    </ul>
    <div className="md:mt-10 mt-7 md:text-left text-center">
    <Link
            href="tel:18002122121"
            className="flex w-fit justify-center items-center gap-3 border border-solid border-white bg-white text-black hover:bg-[#2563EB] font-semibold text-sm py-2.5 px-4 rounded-lg"
          >
            <LuPhoneCall /> <span>Schedule a Call</span>
          </Link>
          </div>
  </div>
  {/* <div className="col-span-1 lg:col-span-1">
    <div className="shadow bg-white p-5 rounded-lg">
      <div className="testmonialsec">
        <div className="testimg">
          <Image src={saurabh} alt="" className="img-fluid rounded-full text-center mx-auto" />
        </div>
        <div className="my-2">
          <h4 className="font-semibold text-sm">“TRAINING WAS VERY HELPFUL”</h4>
          <p className="text-sm font-medium my-1">Training was very helpful, very interactive and practical.</p>
          <h4 className="font-semibold text-sm">Saurabh Kishore Mishra, <small> CSC</small></h4>
        </div>
        <div>
          <Image src={linkedin} alt="" className="text-center mx-auto" />
        </div>
      </div>
      <div className="mt-5">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <h5 className="font-semibold text-lg mb-1">150,000+</h5>
            <p className="text-sm">Students</p>
          </div>
          <div>
            <h5 className="font-semibold text-lg mb-1">400+</h5>
            <p className="text-sm">Corporates</p>
          </div>
          <div>
            <h5 className="font-semibold text-lg mb-1">40+</h5>
            <p className="text-sm">Countries</p>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <ul className="flex space-x-2">
          <li><Link href="href"><Image src={facebook} alt="Facebook" width={32} height={32} /></Link></li>
          <li><Link href="href"><Image src={instagram} alt="Instagram" width={32} height={32} /></Link></li>
          <li><Link href="href"><Image src={linkedin} alt="LinkedIn" width={32} height={32} /></Link></li>
          <li><Link href="href"><Image src={twitter} alt="Twitter" width={32} height={32} /></Link></li>
          <li><Link href="href"><Image src={youtube} alt="YouTube" width={32} height={32} /></Link></li>
        </ul>
      </div>
    </div>
  </div> */}
 
  {/* Second div takes 2 columns on small screens, 3 columns on large screens */}
  <div className="col-span-2 lg:col-span-1 hidden md:block"></div>
  <div className="col-span-2 lg:col-span-2">
    
      {/* <div className="flex gap-4 justify-center items-center">
      <div className="w-xl">
         <div className="flex items-center w-full max-w-3xl mx-auto bg-white shadow-[0px_6px_15px_0px_rgba(64,79,104,0.06)] rounded-lg p-2">
       
      <input
        type="text"
        placeholder="Search for Courses"
        className="flex-grow px-4 py-2 bg-transparent focus:outline-none rounded-full text-sm text-gray-800 placeholder-gray-400"
      />

       
      <Link
        href="#"
        className="flex items-center justify-center w-10 h-10 rounded-lg bg-black hover:bg-purple-700 transition"
      >
        <FiSearch className="text-white text-lg" />
      </Link>
    </div>
    <div className="mt-2.5">
      <ul className="recourse">
        {relateCourses.map((course) => (
          <li key={course.name} className="inline-block mr-2 text-sm font-semibold ">
            <Link href={course.href} className="text-sm hover:underline flex items-center gap-2">
              <Image src={course.revicon} alt={course.name} width={19} height={19} />
              {course.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
      </div>
      </div> */}
      <div className="col-span-1 hidden md:block"></div>
       <div className="col-span-2 lg:col-span-1 items-center justify-center hidden md:flex">
      <Image src={heroImage} alt="Hero Image" className="img-fluid" />
    
        </div>
    
    
   
  </div>
</div>
     </div>
      
    </div>
     </>
  );
}