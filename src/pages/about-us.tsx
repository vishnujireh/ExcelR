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
           <h1 className="text-3xl font-medium text-shadow-black mb-1.5 text-center uppercase z-50 relative text-white">About Us</h1>
         </div>
        
      <section className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5">
        <div className="grid md:grid-cols-1 grid-cols-1 gap-4 z-10 relative items-center">
          <div className="col-span-1 lg:col-span-1">
            <div>
              <h2 className="text-xl font-semibold md:text-left">Our Vision</h2>
              <p className="text-[#666] text-sm leading-7 mb-2.5">To be globally regarded as a leading organization working towards fulfilling the educational needs of working professionals and students with a touch of excellence!</p>

              <h2 className="text-xl font-semibold md:text-left">Our Mission</h2>
              <p className="text-[#666] text-sm leading-7 mb-2.5">To provide a global platform to aspiring students and professionals and bolstering their stand on the international spectrum by providing seamless high-quality training. We stop at nothing in delivering the best learning experience possible and strive to provide a higher level of service and support that you can’t get elsewhere.</p>
              <h2 className="text-xl font-semibold md:text-left">The Company And What We Do</h2>
              <p className="text-[#666] text-sm leading-7 mb-2.5">Founded in 2014, ExcelR has grown to become a leading giant in space of Training and Consulting, helping students and professionals across the globe by delivering top-notch, world-class classroom and online training. We house a passionate bunch of professionals that are commited towards anwering the industry needs in the ever-changing technological advancements and catering towards all your needs.</p>
              <p className="text-[#666] text-sm leading-7 mb-2.5">With world headquarters in the USA and presence in the UK, Middle East, Australia, Netherlands and India, we have set up a firm global footprint transcending boundaries and reaching out to students from far and wide. Our passionate and dedicated team of experts have successfully trained over 140,000 students and professionals in multifarious domains which include Data Science, Project Management, ServiceNow, Digital Marketing to name a few and are committed to raising your excellence levels and accelerating your careers!</p>
              <h2 className="text-xl font-semibold md:text-left">The New Standard</h2>
              <p className="text-[#666] text-sm leading-7 mb-2.5">ExcelR is now a proud business partner with Tata Consulting Services (TCS) - A global leader in IT services and consulting since 1968.</p>
              <p className="text-[#666] text-sm leading-7 mb-2.5">Most of the middle and senior managers are choosing ExcelR Solutions over other management firms because Training and Consulting solutions here are guaranteed to be effective and reliable. We are the only firm of its kind that works laterally with our clients at every step ensuring that you receive the best training needed to advance your careers and create sustainable growth in your companies. When your business needs advanced training methods that have been tested effective in real-world situations, let ExcelR Solutions show you what we can do for you today.</p>
              <p className="text-[#666] text-sm leading-7 mb-2.5">Considering the impact that certain booming technologies will have on the future, we have ventured into providing training pertaining to Artificial Intelligence, Blockchain, Machine Learning, Cloud Computing, IoT, AR / VR, Cyber Security, RPA, IR 4.0 and AWS.</p>
              <p className="text-[#666] text-sm leading-7 mb-2.5">We help organizations of all sizes to empower their employees by providing courses based on current technological trends. Our Convenience and One-Stop Solution ensures that you don’t get left behind in the race towards reaching your ultimate goal.</p>
              <h2 className="text-xl font-semibold md:text-left">Our Philosophy</h2>
              <p className="text-[#666] text-sm leading-7 mb-2.5">We, as a global firm believe in making pivotal changes that will influence your careers and help you put the right foot forward. Through collaborative efforts, we open the doors to fresh opportunities, exposing you to a plethora of career options. We take pride in setting new benchmarks with you as an integral part and work towards a better tomorrow.</p>
              <h2 className="text-xl font-semibold md:text-left">Connect With Us</h2>
              <p className="text-[#666] text-sm leading-7 mb-2.5">Reach out to us with any queries you have and we will be more than happy to assist you. Your opinions and suggestions are of paramount importance to us. Drop a mail at  enquiry@excelr.com.</p>
            </div>
          </div>
          
        </div>
      </section>
       
        </>
    );
}