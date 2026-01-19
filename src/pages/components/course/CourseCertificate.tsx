import React from "react";
import Image from "next/image";
import Link from "next/link";
import excerlcertificate from "/public/IITMPTF_ExcelR_sample_certificate-new.jpg"
import nasscomcertificate from "/public/Nasscom_Certificate.png"
import sgitcertificate from "/public/steinbeis_DS_sample424X600.jpg"
import brochimage from "/public/DS_Tools.png"

export default function CourseCertificate(){
    return(
        <>
        <div className="w-full md:mx-auto md:py-10 md:px-25 p-5 bg-[#12aaeb] relative">
            
            <div className="absolute inset-0 bg-gradient-to-r from-[#2781c8] via-black/100 via-[40%] to-[#52b7f3]"></div>
        <div className="grid md:grid-cols-6 grid-cols-1 gap-6 relative z-10">
            <div className="col-span-1 hidden md:block"></div>
            <div className="col-span-4">
                <div className="grid grid-cols-2 gap-5">
                    <div className="col-span-1 lg:col-span-1 text-center">
                <div className="relative">
                    <Image src={excerlcertificate} alt="" /> 
                </div>
                <div className="mt-4 relative">
                    <Image src={nasscomcertificate} alt="" />
                </div>
            </div>
            <div className="col-span-1 lg:col-span-1 text-center">
                <div className="relative">
                    <Image src={sgitcertificate} alt="" />
                </div>
            </div>
                </div>
            </div>
            <div className="col-span-1 hidden md:block"></div>
        </div>
        </div>
        <div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5">
            <div className="relative text-center">
                <Image src={brochimage} alt="" className="mx-auto img-fluid" />
            </div>
            <div className="text-center mt-4 md:mt-0 mb-3 md:mb-0">
                    <Link href="#" className="mt-8 px-6 py-3 bg-[#ffa500] border border-[#ffa500] text-white uppercase font-semibold text-sm hover:bg-white hover:text-[#ffa500] rounded-lg">Download Brochure</Link>
            </div>
        </div>
        </>
    );
}