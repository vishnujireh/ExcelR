"use client";
import React from "react";
import Breadcrumb from "@/pages/components/Breadcrumb";
import OurClients from "./components/OurClients"
import excelr_intro from "../../public/excelr_intro.png"
import Image from "next/image"


export default function CorporateTraining(){
    return(
        <>
        <div>
        <Breadcrumb />
      </div>
        <div className="w-full md:mx-auto md:py-10 2xl:px-32 xl:px-20 lg:px-10 p-5 career-bg_grad">
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
             <div className="grid grid-cols-5 gap-4 z-10 relative items-center">
            <div className="col-span-2 col-start-2">

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
      
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name *"
                    className="rounded-3xl border border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    required
                  />
                </div>
                  </div>
                  <div className="col-span-1">
                    <div className="relative">
                  <input
                    type="text"
                    name="company_name"
                    placeholder="College Name"
                    className="rounded-3xl border border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    required
                  />
                </div>
                  </div>
                  <div className="col-span-1">
                    <div className="relative">
                  
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    className="rounded-3xl border border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    required
                  />
                </div>
                  </div>
                  <div className="col-span-1">
                    <div className="relative">
                  
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Mobile No. *"
                    className="rounded-3xl border border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    required
                  />
                </div>
                  </div>
                  <div className="col-span-1">
                    <div className="relative">
                  
                  <input
                    type="tel"
                    name="location"
                    placeholder="Location"
                    className="rounded-3xl border border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    required
                  />
                </div>
                  </div>
                  <div className="col-span-1">
                    <div className="relative">
                  
                  <input
                    type="tel"
                    name="country"
                    placeholder="Country"
                    className="rounded-3xl border border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    required
                  />
                </div>
                  </div>
                  <div className="col-span-2">
                    <div className="relative">
                  <input
                    type="tel"
                    name="course"
                    placeholder="Course"
                    className="rounded-3xl border border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    required
                  />
                </div>
                  </div>
                  <div className="col-span-2">
                    {/* Terms & Conditions */}
                <div className="flex items-start space-x-2 text-sm">
                  <input
                    type="checkbox"
                    id="terms"
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
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
      
                {/* Submit */}
                <div className="text-center mt-5">
                  <button
                    type="submit"
                    className="border cursor-pointer border-solid border-[#0071BC] bg-[#0071BC] text-white hover:bg-[#4ba7de] font-medium text-sm py-2.5 px-5 rounded-lg"
                  >
                    Submit
                  </button>
                </div>
                  </div>
                </div>
                        
              </form>
    </div>
          </div>
        </div> 
      </section>
      <div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-[#F4F7FF]">
        <div>
          <h2>Every Day Learning (EDL)</h2>
          <p>Provide application and industry-oriented learning on various trending technologies for free from industry experts with in-depth knowledge on the subjects. This will help the students to have an actual feel of the real-world solutions and help them in their placements</p>
        <h2 className="ui-title-block">Objective</h2>
        <ul >
	<li>Application oriented training for Students and Faculty</li>
	<li>Hands on training on the trending technologies</li>
	<li>Help the colleges in fulfilling a few of the NAAC/NBA requirements</li>
</ul>
        </div>
      </div>
       <div className="w-full md:mx-auto md:py-10 2xl:px-32 xl:px-20 lg:px-10 p-5 corporateform_bgform">
       <div className="relative z-50 text-center text-white">
        <h3 className="text-2xl font-semibold mb-1.5">Corporate Training</h3>
        <p className="mb-1.5">Post your query. Write us at corporatesales@excelr.com</p>
        <p>We are more than happy to partner with you</p>
        </div>
        <div className="mt-5">
          <div className="grid grid-cols-6 gap-4 z-10 relative items-center">
            <div className="col-span-4 col-start-2">
              <div className="bg-white p-5 border-4 border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name *"
                    className="border-b border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    required
                  />
                </div>
                  </div>
                  <div className="col-span-1">
                    <div className="relative">
                  <input
                    type="text"
                    name="company_name"
                    placeholder="Company Name"
                    className="border-b border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    required
                  />
                </div>
                  </div>
                  <div className="col-span-1">
                    <div className="relative">
                  
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    className="border-b border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    required
                  />
                </div>
                  </div>
                  <div className="col-span-1">
                    <div className="relative">
                  
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Mobile No. *"
                    className="border-b border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    required
                  />
                </div>
                  </div>
                  <div className="col-span-1">
                    <div className="relative">
                  
                  <input
                    type="tel"
                    name="location"
                    placeholder="Location"
                    className="border-b border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    required
                  />
                </div>
                  </div>
                  <div className="col-span-1">
                    <div className="relative">
                  
                  <input
                    type="tel"
                    name="country"
                    placeholder="Country"
                    className="border-b border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    required
                  />
                </div>
                  </div>
                  <div className="col-span-2">
                    <div className="relative">
                  <input
                    type="tel"
                    name="course"
                    placeholder="Course"
                    className="border-b border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    required
                  />
                </div>
                  </div>
                  <div className="col-span-2">
                    <div className="relative">
                  <select
              name="enquiry"
              className="border-b border-gray-200 bg-white text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              required
            >
              <option value="">How did you hear about Us</option>
              <option value="Search Engine"> Search Engine</option>
              <option value="Email"> Email</option>
              <option value="LinkedIn post">LinkedIn post</option>
              <option value="Word of mouth">Word of mouth</option>
              <option value="Others">Others</option>
            </select>
                </div>
                  </div>
                  <div className="col-span-2">
                    <textarea
                    name="name"
                    placeholder="Query *"
                    className="border-b border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    required
                  />
                  </div>
                  <div className="col-span-2">
                    {/* Terms & Conditions */}
                <div className="flex items-start space-x-2 text-sm">
                  <input
                    type="checkbox"
                    id="terms"
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
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
      
                {/* Submit */}
                <div className="text-center mt-5">
                  <button
                    type="submit"
                    className="border cursor-pointer border-solid border-[#0071BC] bg-[#0071BC] text-white hover:bg-[#4ba7de] font-medium text-sm py-2.5 px-5 rounded-lg"
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
       <section className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5">
        <p className="text-2xl font-bold mb-1 text-center">Popular Courses</p>
       </section>
        <section className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-[#F4F7FF]">
        <p className="text-2xl font-bold mb-1 text-center">Testimonials</p>
       </section>
      <OurClients />
        </>
    );
}