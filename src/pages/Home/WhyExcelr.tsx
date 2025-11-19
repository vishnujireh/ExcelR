"use client";
import React from "react";
import Link from "next/link";

const reasons = [
    { slno: 1, title: "Faculty is our strength", description: "Learn from experts who are certified, qualified, backed up by decades of rich industry experience and passionate about training" },
    { slno: 2, title: "Post training support", description: "Participants can be rest assured about the perpetual support subsequent to the training. Necessary hand-holding is ensured post training" },
    { slno: 3, title: "Curriculum", description: "All our courses are meticulously designed in conjunction with the industry trending needs, which helps the participants to remain ahead in their professional career" },
];

export default function WhyExcelr() {
    return (
        <>
        <div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-[#1f2227]">
            <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
            <div className="col-span-1 lg:col-span-2 flex items-center justify-center">
                <p className="text-center text-2xl font-semibold text-white">Contact Our Team of Experts</p>
            </div>
            <div className="col-span-1 lg:col-span-1 flex items-center md:justify-start justify-center">
                <Link href="/about" className="text-white text-center font-semibold border border-solid border-white bg-[#1f2227] hover:bg-white hover:text-[#1f2227] text-sm h-10 px-4 rounded-lg flex items-center">
                     Get in Touch
                </Link>
            </div>
            </div>
        </div>
        <div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 area-bg_grad">
            <div className="text-center mb-10 z-50 relative">
                <h2 className="text-2xl font-bold mb-1 text-white">Why ExcelR?</h2>
                <p className="text-white text-sm leading-7 text-center">ExcelR is considered to be one of the best training institutes across the globe owing to our faculty, post training support and state of the art curriculum.</p>
            </div>
            <div>
                <ul className="relative reulist">
                    {reasons.map((reason) => (
                        <li key={reason.slno} className="md:mb-4 mb-5 text-white z-50 relative text-center b-scale__item">
                            <span className="b-scale__decor"></span>
                            <div className="b-scale__number md:mb-3 mb-0">{reason.slno}</div>
                            <span className="font-semibold uppercase text-md block mb-2">{reason.title}</span>
                            <p className="text-sm leading-7 md:mx-8 mx-0">{reason.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        </>
    );
}
