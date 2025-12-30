"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
// removed unused usePathname import
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiMenuLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import { LuPhoneCall } from "react-icons/lu";
import logo from "/public/logo.png";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCourseMenu } from "@/redux/slices/courseMenuSlice";

export default function Navbar() {
  // pathname removed because it's not used; keep imports minimal
  const dispatch = useAppDispatch();
  const { menu: categories = [], loading, error } = useAppSelector(
    (state) => state.courseMenu
  );

  // Debug logs
  useEffect(() => {
    console.log('Menu State:', { categories, loading, error });
  }, [categories, loading, error]);

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [hoveredSubcategory, setHoveredSubcategory] = useState<number | null>(
    null
  );
  const [activeMobileCategory, setActiveMobileCategory] = useState<
    number | null
  >(null);
  // searchOpen value is currently unused; only the setter is used to open search UI
  const [, setSearchOpen] = useState(false);

  // Fetch course menu with IP address
  useEffect(() => {
    const loadMenuWithIP = async () => {
      try {
        const ipResponse = await fetch("https://api64.ipify.org?format=json");
        const ipData = await ipResponse.json();
        dispatch(fetchCourseMenu(ipData.ip));
      } catch (error) {
        console.error("Error fetching IP:", error);
        dispatch(fetchCourseMenu()); // Fallback without IP
      }
    };
    
    loadMenuWithIP();
  }, [dispatch]);

  const toggleMobileMenu = () => setIsOpen(!isOpen);
  
  const handleMouseEnter = () => {
    if (categories.length > 0) {
      setDropdownVisible(true);
    }
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
    setSelectedCategory(null);
    setHoveredSubcategory(null);
  };

  return (
    <nav className="w-full flex flex-col md:flex-row items-center justify-between relative z-50 bg-white">
      {/* --- MOBILE HEADER --- */}
      <div className="md:hidden flex items-center justify-between w-full px-0 md:px-4 py-0 md:py-3">
        <div className="flex items-center gap-3">
          <button className="text-2xl text-gray-800" onClick={toggleMobileMenu}>
            <RiMenuLine />
          </button>
          
        </div>
        <div>
          <Link href="/" className="flex items-center">
            <Image src={logo} alt="Logo" width={140} height={40} />
          </Link>
        </div>
        <div className="flex gap-1.5">
          {/* <button
            onClick={() => setSearchOpen(true)}
            className="w-10 h-10 flex items-center justify-center border border-solid border-black bg-black text-white rounded-full"
          >
            <FiSearch className="text-lg" />
          </button> */}
          <Link
            href="tel:18002122121"
            className="flex items-center justify-center gap-3 border border-solid border-[#0071BC] bg-[#0071BC] text-white font-medium text-sm w-10 h-10 rounded-full"
          >
            <LuPhoneCall />
          </Link>
        </div>
      </div>

      {/* --- DESKTOP LEFT SECTION --- */}
      <div className="hidden md:flex items-center gap-4">
        <Link href="/" className="flex items-center">
          <Image src={logo} alt="Logo" width={180} height={50} />
        </Link>

       


        {/* Desktop Search */}
        {/* <div className="hidden md:flex relative items-center">
          <div className="flex items-center 2xl:min-w-xs mx-auto bg-white rounded-lg pr-3 border border-gray-300">
            <input
              type="text"
              placeholder="Search for Courses"
              className="flex-grow px-4 pr-2 py-2.5 bg-transparent focus:outline-none rounded-full text-sm text-gray-800 placeholder-gray-400"
            />
            <Link href="#">
              <FiSearch className="text-black text-lg" />
            </Link>
          </div>
        </div> */}
      </div>
             {/* Browse Button with Progressive Mega Menu */}
             <div className="flex ">
                <div
  className="relative group mr-4 hidden md:flex"
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
>
  <button
    onClick={() => setDropdownVisible(!dropdownVisible)}
    className="flex items-center gap-1 text-white bg-black border border-solid border-black font-semibold text-sm py-2.5 px-4 rounded-lg cursor-pointer transition-colors duration-200"
  >
    All Courses
    {dropdownVisible ? (
      <RiArrowUpSLine className="ml-1 text-lg" />
    ) : (
      <RiArrowDownSLine className="ml-1 text-lg" />
    )}
  </button>

  {/* Error UI */}
  {error && (
    <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg p-4 border border-red-200 text-red-600">
      Failed to load menu. Please try again.
    </div>
  )}

  {dropdownVisible && categories.length > 0 && (
    <div className="absolute top-full left-0 bg-white shadow-2xl rounded-lg z-50 border border-gray-200 flex">

      {/* ------------------------------------------
        1️⃣ COLUMN 1 — MAIN CATEGORIES
      ------------------------------------------- */}
      <div className="w-72 bg-gray-50 border-r border-gray-200 rounded-l-lg">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            All Courses
          </h3>
        </div>

        <div className="py-2 overflow-y-auto max-h-[500px]">
          {categories.map((cat, i) => {
            const hasSubcategories =
              cat.subcategories && cat.subcategories.length > 0;

            const categoryContent = (
              <div
                onMouseEnter={() => {
                  setSelectedCategory(hasSubcategories ? i : null);
                  setHoveredSubcategory(null);
                  setDropdownVisible(true);
                }}
                className={`py-3 px-3 mx-2 rounded-md flex items-center justify-between cursor-pointer ${
                  selectedCategory === i
                    ? "bg-blue-50 text-[#0071BC]"
                    : "hover:bg-white text-gray-700"
                }`}
              >
                <span className="font-semibold text-sm text-[#171717]">
                  {cat.parent_category}
                </span>

                {hasSubcategories && (
                  <RiArrowRightSLine
                    className={`text-xl ${
                      selectedCategory === i
                        ? "opacity-100"
                        : "opacity-0 group-hover/cat:opacity-40"
                    }`}
                  />
                )}
              </div>
            );

            return (
              <div key={i}>
                {hasSubcategories ? (
                  categoryContent
                ) : (
                  <Link href={cat.base_url}>{categoryContent}</Link>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* -------------------------------------------
        2️⃣ COLUMN 2 — SUBCATEGORIES (NO ANIMATION)
      -------------------------------------------- */}
      {selectedCategory !== null && (() => {
        const subs = categories[selectedCategory]?.subcategories || [];
        const namedSubs = subs.filter((s) => s.subcategory);
        const unnamedSubs = subs.filter((s) => !s.subcategory);
        const directCourses = unnamedSubs.flatMap((s) => s.courses || []);

        const hasContent =
          namedSubs.length > 0 || directCourses.length > 0;
        if (!hasContent) return null;

        // If no named subcategories → show only direct courses
        if (namedSubs.length === 0) {
          return (
            <div className="w-80">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {categories[selectedCategory]?.parent_category} Courses
                </h3>
              </div>

              <div className="py-2 px-3 overflow-y-auto max-h-[500px]">
                {directCourses.map((c, idx) => (
                  <Link
                    key={idx}
                    href={c.base_url}
                    className="block py-2 px-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#0071BC] rounded-md"
                  >
                    {c.course_name}
                  </Link>
                ))}
              </div>
            </div>
          );
        }

        // CASE: Named subcategories exist → No animation version
        return (
          <div className="w-80 bg-white border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Sub Categories
              </h3>
            </div>

            <div className="py-2 px-3 overflow-y-auto max-h-[500px] space-y-3">

              {namedSubs.map((sub, j) => {
                const isOpen = hoveredSubcategory === j;
                const subCourses = sub.courses || [];

                return (
                  <div key={j} className="rounded-md">

                    {/* SUBCATEGORY HEADER */}
                    <div
                      onMouseEnter={() => setHoveredSubcategory(j)}
                      className={`py-2.5 px-3 cursor-pointer rounded-md flex items-center justify-between ${
                        isOpen
                          ? "bg-blue-50 text-[#0071BC] border border-blue-200 shadow-sm"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <span className="font-semibold text-sm">
                        {sub.subcategory}
                      </span>

                      {/* ARROW ROTATION */}
                      <RiArrowRightSLine
                        className={`text-xl transition-transform ${
                          isOpen ? "rotate-90 text-[#0071BC]" : "rotate-0"
                        }`}
                      />
                    </div>

                    {/* SUBCATEGORY → COURSES (INSTANT, NO ANIMATION) */}
                    {isOpen && (
                      <div className="pl-5 py-2 space-y-1">
                        {subCourses.map((c, idx) => (
                          <Link
                            key={idx}
                            href={c.base_url}
                            className="block text-sm py-1 px-2 text-gray-600 hover:text-[#0071BC] hover:bg-gray-50 rounded-md"
                          >
                            {c.course_name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* DIRECT COURSES */}
              {directCourses.length > 0 && (
                <div
                  className="mt-2.5 pt-4 border-t border-gray-200"
                  onMouseEnter={() => setHoveredSubcategory(null)}
                >
                  <h6 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
                    Courses
                  </h6>

                  {directCourses.map((c, idx) => (
                    <Link
                      key={idx}
                      href={c.base_url}
                      className="block py-2 px-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#0071BC] rounded-md"
                    >
                      {c.course_name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })()}
    </div>
  )}
</div>

 {/* --- DESKTOP RIGHT LINKS --- */}
      <ul className="hidden md:flex items-center space-x-6 text-sm font-semibold">
        <li>
          <Link href="/blogs">Blog</Link>
        </li>
        <li>
          <Link href="/corporate-training">Corporate</Link>
        </li>
        <li>
          <Link href="/every-day-learning">Institutions</Link>
        </li>
        <li>
          <Link href="/careers">Work With Us</Link>
        </li>
        <li>
          <Link
            href="tel:18002122121"
            className="flex items-center gap-3 border border-solid border-[#0071BC] bg-[#0071BC] text-white hover:bg-[#4ba7de] font-medium text-sm py-2.5 px-4 rounded-lg"
          >
            <LuPhoneCall /> <span>Book a Call</span>
          </Link>
        </li>
      </ul>
             </div>

      {/* --- MOBILE MENU (Accordion) --- */}
      {isOpen && (
        <div className="md:hidden w-full bg-white shadow-lg border-t border-gray-200 p-4 md:space-y-4 overflow-y-auto max-h-[80vh]">
          {loading && <p className="text-sm text-gray-500">Loading courses...</p>}
          {!loading &&
            categories.map((cat, i) => (
              <div key={i}>
                <button
                  className="w-full flex justify-between  text-sm items-center font-semibold text-left text-gray-800 py-2 border-b border-gray-100"
                  onClick={() =>
                    setActiveMobileCategory(
                      activeMobileCategory === i ? null : i
                    )
                  }
                >
                  {cat.parent_category}
                  {activeMobileCategory === i ? (
                    <RiArrowUpSLine />
                  ) : (
                    <RiArrowDownSLine />
                  )}
                </button>

                {activeMobileCategory === i && (
                  <div className="pl-3 pt-2 space-y-3">
                    {cat.subcategories.map((sub, j) => (
                      <div key={j}>
                        {sub.subcategory && (
                          <h6 className="text-sm font-semibold text-gray-700 mb-1">
                            {sub.subcategory}
                          </h6>
                        )}
                        <ul className="pl-3 space-y-1">
                          {sub.courses.map((c, k) => (
                            <li key={k}>
                              <Link
                                href={c.base_url}
                                className="block text-sm text-gray-600 hover:text-blue-600"
                              >
                                {c.course_name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

          {/* Other Links */}
          <div className="pt-4 border-t border-gray-200 space-y-3 text-sm font-semibold">
            <Link href="/blogs" className="block">
              Blog
            </Link>
            <Link href="/corporate-training" className="block">
              Corporate
            </Link>
            <Link href="/every-day-learning" className="block">
              Institutions
            </Link>
            <Link href="/careers" className="block">
              Work With Us
            </Link>
            {/* <Link
              href="tel:18002122121"
              className="block text-white bg-[#0071BC] text-center py-2 rounded-lg font-medium"
            >
              Book a Call
            </Link> */}
          </div>
        </div>
      )}
      {/* <p>IP: {userIP}</p> */}
    </nav>
  );
}