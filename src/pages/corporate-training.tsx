"use client";
import React from "react";
import Breadcrumb from "@/pages/components/Breadcrumb";
import OurClients from "./components/OurClients"
import corportimg from "../../public/corporate_training_img.jpg"
import Image from "next/image"
import corporate_usp from "../../public/corporate_usp_v1.webp"
import PopularCourse from "./components/PopularCourse"
import Testimonials from "./components/Testimonials";


export default function CorporateTraining(){
    return(
        <>
        <div>
        <Breadcrumb />
      </div>
        <div className="w-full md:mx-auto md:py-10 2xl:px-32 xl:px-20 lg:px-10 p-5 career-bg_grad">
           <h1 className="text-3xl font-medium text-shadow-black mb-1.5 text-center uppercase z-50 relative text-white">Corporate Training</h1>
           <div className="w-10 bg-amber-500 h-1 mb-3 text-center mx-auto z-50 relative"></div>
           <p className="z-50 relative text-white text-center italic text-shadow-black">Raising Excellence Then, Now and Forever</p>
         </div>
        
      <section className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 z-10 relative items-center">
          <div className="col-span-1 lg:col-span-1">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-center md:text-left">We Help Brands To Connect & Grow</h2>
              <p className="text-[#666] text-sm leading-7 mb-1.5">The need to address the skill gap in the present tech-savvy world is more than ever. Addressing the weakness, improving employee performance, fostering innovation, and staying abreast with the latest developments in the field of technology, add up in the direction of improving your work environment, critical to the overall growth of your organization.</p>
              <p className="text-[#666] text-sm leading-7">The need to address the skill gap in the present tech-savvy world is more than ever. Addressing the weakness, improving employee performance, fostering innovation, and staying abreast with the latest developments in the field of technology, add up in the direction of improving your work environment, critical to the overall growth of your organization.</p>
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
  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 z-10 relative items-center">
    <div className="col-span-1 md:col-span-3 lg:col-span-4 lg:col-start-2">
      <div className="bg-white p-5 border-4 border-gray-200 rounded-md">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Name *"
            className="border-b border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            required
          />

          {/* Company Name */}
          <input
            type="text"
            name="company_name"
            placeholder="Company Name"
            className="border-b border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email *"
            className="border-b border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            required
          />

          {/* Mobile */}
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile No. *"
            className="border-b border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            required
          />

          {/* Location */}
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="border-b border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
          />

          {/* Country */}
          <input
            type="text"
            name="country"
            placeholder="Country"
            className="border-b border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
          />

          {/* Course */}
          <div className="md:col-span-2">
            <input
              type="text"
              name="course"
              placeholder="Course"
              className="border-b border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            />
          </div>

          {/* Enquiry */}
          <div className="md:col-span-2">
            <select
              name="enquiry"
              className="border-b border-gray-200 bg-white text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              required
            >
              <option value="">How did you hear about Us</option>
              <option value="Search Engine">Search Engine</option>
              <option value="Email">Email</option>
              <option value="LinkedIn post">LinkedIn post</option>
              <option value="Word of mouth">Word of mouth</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Query */}
          <div className="md:col-span-2">
            <textarea
              name="query"
              placeholder="Query *"
              className="border-b border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              required
            />
          </div>

          {/* Terms & Submit */}
          <div className="md:col-span-2">
            <div className="flex items-start space-x-2 text-sm">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                required
              />
              <label htmlFor="terms" className="text-gray-500">
                I hereby agree to the{" "}
                <a href="/terms" className="text-blue-600 underline" target="_blank">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="/privacy-policy" className="text-blue-600 underline" target="_blank">
                  Privacy Policy
                </a>{" "}
                of Excelr Solutions.
              </label>
            </div>

            <div className="text-center mt-5">
              <button
                type="submit"
                className="border border-[#0071BC] bg-[#0071BC] hover:bg-[#4ba7de] text-white font-medium text-sm py-2.5 px-5 rounded-lg cursor-pointer"
              >
                Submit
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</div>
       </div>
       <section className="slidervbp">
               <PopularCourse page_name="corporate-training" heading="Popular Courses" />
              </section>
        <section className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 ">
        <p className="text-2xl font-bold mb-1 text-center">Testimonials</p>
      <Testimonials />
       </section>
      <OurClients />
        </>
    );
}