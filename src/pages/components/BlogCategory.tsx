"use client";

import { useState } from "react";
import { RiMenuLine, RiCloseFill } from "react-icons/ri";
import Sidebar from "./Sidebar";

interface BlogCategoryProps {
  activeCategory?: string | string[];
  activeSubcategory?: string | string[];
}

export default function BlogCategory({
  activeCategory,
  activeSubcategory,
}: BlogCategoryProps) {

  const [open, setOpen] = useState(false);

  return (
    <>

      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className="
        fixed left-0 top-1/2 -translate-y-1/2
        bg-[#FFAA33]
        p-4
        cursor-pointer
        rounded-r-xl
        z-80
        "
      >
        <RiMenuLine size={18} className="text-white"/>
      </button>


      {/* Overlay */}
      {open && (
        <div
          onClick={()=>setOpen(false)}
          className="
          fixed inset-0
          bg-black/20
          z-90
          "
        />
      )}



      {/* Drawer */}
      <div
        className={`
        fixed
        left-0
        top-0
        h-auto
        max-h-screen
        w-67.5
        bg-white
        z-100
        shadow-xl
        rounded-r-xl
        transition-transform
        duration-300

        ${open
          ? "translate-x-0"
          : "-translate-x-full -left-80"}
        `}
      >


        <div
        className="
        flex justify-between items-center
        px-5 py-4
        " style={{
background:
"linear-gradient(160deg,#134792 0%,#1a5aab 40%,#2160c1 75%,#4d89d9 100%)"
}}>

          <h3 className="text-base font-semibold text-white">
          Categories
          </h3>


          <button className="text-white cursor-pointer"
          onClick={()=>setOpen(false)}
          >
            <RiCloseFill size={20}/>
          </button>

        </div>


        {/* Existing sidebar */}
        <div className="p-3 overflow-y-auto max-h-[calc(100vh-70px)]">

          <Sidebar
            activeCategory={activeCategory}
            activeSubcategory={activeSubcategory}
          />

        </div>


      </div>

    </>
  );
}