"use client";
import React from "react";
import Image from "next/image";
import thankyou from "/public/thank-icon.png";

export default function AboutUs(){
    return(
        <> 
         
        
      <section className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-[#ecf4f9]">
        <div className="grid md:grid-cols-1 grid-cols-1 gap-4 z-10 relative items-center">
          <div className="col-span-1 lg:col-span-1">
            <div className="mx-auto text-center">
              <h1 className="text-3xl font-bold text-[#1b1b1b] mb-4">
                Your payment is successful
              </h1>
              <Image src={thankyou} alt="Thank You" className="rounded-lg mx-auto my-8" />
              <p className="text-md text-gray-700 mb-2">
                Congratulations on your first step towards a great career!
              </p>
              <p className="text-md text-gray-600 mb-2">
                You will receive LMS access within the next 24hrs to your registered email id.
              </p>
              <p className="text-md text-[#1b1b1b] underline mb-1.5">
                For any queries and concerns, mail to 
                
              </p>
              <p className="text-base font-bold block text-[#1b1b1b]">support@excelr.com</p>
            </div>
          </div>
          
          
        </div>
      </section>
       
        </>
    );
}