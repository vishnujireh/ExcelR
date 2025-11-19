"use client";
import React from "react";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <div className="w-full py-4 2xl:px-25 xl:px-20 lg:px-10 px-5 z-50 bg-white border-b border-[#ECEDF2] shadow-[0px_6px_15px_0px_rgba(64,79,104,0.06)]">
  <Navbar />
    </div>
  );
}