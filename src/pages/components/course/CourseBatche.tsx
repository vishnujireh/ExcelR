"use client";
import React from "react";
import { RiMapPin2Line } from "react-icons/ri";
import MakeSchedule from "../MakeSchedule";
export default function CourseBatche(){
const [isModalOpen, setIsModalOpen] = React.useState(false);
const openModal = () => setIsModalOpen(true);
const closeModal = () => setIsModalOpen(false);
    return (
        <>
        <div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-[#12aaeb] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#2781c8] via-black/100 via-[40%] to-[#52b7f3]"></div>
            <p className="text-white text-xl text-center font-semibold relative z-10">Upcoming Batches</p>
            <div className="mt-5 relative z-10">
                <div className="grid md:grid-cols-6 grid-cols-1 gap-6">
            <div className="col-span-1 hidden md:block"></div>
            <div className="col-span-4 bg-white p-5 rounded">
                <div className="grid md:grid-cols-3 grid-cols-1 gap-5 items-center">
                    <div className="col-span-1 lg:col-span-1 text-center">
                        <p className="text-md font-semibold">Select Your City</p>
                    </div>
            <div className="col-span-1 lg:col-span-1 text-center">
                <div className="relative font-semibold">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
      <RiMapPin2Line className="text-white" />
    </div>
   <select className="bg-[#12aaeb] text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option>Select Country</option>
    <option>Canada</option>
    <option>France</option>
    <option>Germany</option>
   </select>
  </div>
                
            </div>
             <div className="col-span-1 lg:col-span-1 text-center">
                <div className="relative font-semibold">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
      <RiMapPin2Line className="text-white font-bold" />
    </div>
   <select className="bg-[#12aaeb] text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option>Select City</option>
    <option>Canada</option>
    <option>France</option>
    <option>Germany</option>
   </select>
  </div>
            </div>
                </div>
                <div className="mt-4">
                    <p className="text-sm font-semibold text-center">Can&apos;t find convenient schedule? <button className="text-[#f1261a] cursor-pointer" onClick={openModal}>Click Here</button></p>
                </div>
            </div>
            <div className="col-span-1 hidden md:block"></div>
        </div>
            </div>
            {isModalOpen && <MakeSchedule closeModal={closeModal} />}
        </div>
        </>
    )
}
