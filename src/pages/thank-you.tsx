"use client";
import React from "react";
import Image from "next/image";
import thankyou from "/public/thank-youimage.jpg";

export default function AboutUs(){
    return(
        <> 
         
        
      <section className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5">
        <div className="grid md:grid-cols-1 grid-cols-1 gap-4 z-10 relative items-center">
          <div className="col-span-1 lg:col-span-1">
            <div className="mx-auto text-center">
              <Image src={thankyou} alt="Thank You" className="rounded-lg mx-auto" />
            </div>
          </div>
          
          
        </div>
      </section>
       
        </>
    );
}