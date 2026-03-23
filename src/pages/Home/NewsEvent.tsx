"use client";
import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeNewsEvents } from "@/redux/slices/homeSlice";
import { RootState  } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import readmore from "/public/log-in.png"

const newsEvents = [
    {
        title: "ExcelR is Ranked by Deloitte Among the Top 50 Fastest Growing Technology-enabled Companies for the Second Time",
        desc: "Karnataka, India - November 30, 2022: We are exhilarated to announce that ExcelR has been chosen among the top 50 fastest growing technology-enabled companies in India by Deloitte, at the Karnataka, India - November 30, 2022: We are exhilarated to announce that ExcelR has been chosen among the top 50 fastest growing technology-enabled companies in India by Deloitte, at the",
        image: "/deloitte-events.png",
        link: "#"
    },
    {
        title: "Data science helps growth in software sector",
        desc: "HIGHLIGHTS There is good demand for data science, artificial intelligence, machine learning, cloud computing, big data and others in the competitive world, says Prof Hemachandra Reddy, Chairman",
        image: "/news11.png",
        link: "#"
    },
]

export default function NewsEvent (){
    const dispatch = useDispatch<any>();
    const { news_events} = useSelector ((state: RootState) => state.home);
    
    useEffect(() => {
        dispatch(fetchHomeNewsEvents());
    }, [dispatch]);


    return (
        <>
        <div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-[#F4F7FF]">
            <div className="text-center mb-5">
                <p>What’s Happening</p>
                <h2 className="text-2xl font-bold mb-1 text-center">News & Events</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {news_events.data?.news_events?.map((item, index) => (
                    <div key={index} className="p-5">
                        <div className=" border-l border-gray-200 pl-6 pb-2">
                            <div className="relative aspect-[5/2] w-full">
                                <Image src={item.image} alt={item.title} fill className="rounded" />
                            </div>
                        <Link href={item.url}><h3 className="text-md font-semibold mt-4 truncate">{item.title}</h3></Link>
                        <div className="min-h-[70px]">
                        <p className="text-sm leading-6 mt-2 text-[#666] line-clamp-3">{item.description}</p>
                        </div>
                        </div>

                        <Link href={item.url} className="text-[#ff9600] mt-3 ml-1 text-sm flex items-center gap-2"><Image src={readmore} alt="Read more" /> Read more</Link>
                    </div>
                ))}
            </div>
            <div className="text-center mt-10 block">
                {news_events.data?.view_all && (
                    <Link href={news_events.data.view_all} className="bg-[#ff9600] text-white text-sm inline-block items-center py-2.5 px-5 font-semibold rounded-lg"> View All</Link>
                )} 
            </div>
        </div>
        </>
    )
}