"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import Breadcrumb from "../components/Breadcrumb";
import OurClients from "../components/OurClients";

import { RiTimeLine, RiMapPinLine, RiArrowRightLine } from "react-icons/ri";

import { fetchCareers } from "@/redux/slices/careerSlice";
import { RootState, AppDispatch } from "@/redux/store";

export default function CareerList() {
  const dispatch = useDispatch<AppDispatch>();

  // ✅ MUST be state.career (matches store.ts)
  const { careers, loading, error } = useSelector(
    (state: RootState) => state.career
  );

  // ✅ Filters State
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Job Category");
  const [location, setLocation] = useState("All Job Location");
  const [industry, setIndustry] = useState("All Job Type"); // ✅ Full Time / Part Time

  useEffect(() => {
    dispatch(fetchCareers());
  }, [dispatch]);

  // ✅ Unique Categories
  const categories = useMemo(() => {
    return ["All Job Category", ...new Set(careers.map((job) => job.category))];
  }, [careers]);

  // ✅ Unique Locations
  const locations = useMemo(() => {
    return ["All Job Location", ...new Set(careers.map((job) => job.location))];
  }, [careers]);

  // ✅ Unique Industries (Full Time / Part Time)
  const industries = useMemo(() => {
    return ["All Job Type", ...new Set(careers.map((job) => job.industry))];
  }, [careers]);

  // ✅ Filtering Logic
  const filteredCareers = useMemo(() => {
    return careers.filter((job) => {
      const matchSearch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.category.toLowerCase().includes(search.toLowerCase()) ||
        job.location.toLowerCase().includes(search.toLowerCase());

      const matchCategory =
        category === "All Job Category" || job.category === category;

      const matchLocation =
        location === "All Job Location" || job.location === location;

      const matchIndustry =
        industry === "All Job Type" || job.industry === industry;

      return (
        matchSearch &&
        matchCategory &&
        matchLocation &&
        matchIndustry
      );
    });
  }, [careers, search, category, location, industry]);

  return (
    <>
      <Breadcrumb />

      {/* ✅ Banner */}
      <div className="w-full md:mx-auto md:py-10 2xl:px-32 xl:px-20 lg:px-10 p-5 career-bg_grad">
        <h1 className="text-3xl font-medium mb-1.5 text-center uppercase text-white z-50 relative">
          Careers
        </h1>
        <div className="w-10 bg-amber-500 h-1 mb-3 mx-auto z-50 relative"></div>
        <p className="text-white text-center italic z-50 relative">
          The best way to predict the future is to create it... Join us for a
          career...
        </p>
      </div>

      {/* ✅ Filters */}
      <section className="w-full md:mx-auto 2xl:px-25 xl:px-20 lg:px-10 p-5">
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          {/* ✅ Search */}
          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 text-gray-900 bg-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
          />

          {/* ✅ Category Filter */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-200 text-gray-900 bg-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* ✅ Industry Filter (Full Time / Part Time) */}
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
             className="border border-gray-200 text-gray-900 bg-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
         >
            {industries.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {/* ✅ Location Filter */}
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border border-gray-200 text-gray-900 bg-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          
        </div>

        {/* ✅ Loading */}
        {loading && <p className="text-center">Loading careers...</p>}

        {/* ✅ Error */}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* ✅ Career Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {filteredCareers.map((job) => (
            <div
              key={job.id}
              className="rounded-xl p-6 shadow hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold mb-4">{job.title}</h2>

              <p className="text-gray-500 mb-2 flex gap-1 items-center">
                <RiTimeLine className="w-8 text-[#327ac5] shrink-0 " />
                {job.category}
              </p>

              <p className="text-gray-500 mb-2 flex gap-1 items-center">
                <RiMapPinLine className="w-8 text-[#327ac5] shrink-0" />
                {job.location}
              </p>

              {/* <p className="text-gray-500 mb-2 text-sm font-medium">
                {job.industry}
              </p> */}

              {/* ✅ API returns relative path: careers/xyz */}
              <Link
                href={`/${job.base_url}`}
                target="_blank"
                className="text-[#327ac5] font-semibold inline-flex items-center text-sm mt-3.5 gap-1.5"
              >
                More Details <RiArrowRightLine />
              </Link>
            </div>
          ))}
        </div>

        {/* ✅ Empty State */}
        {!loading && filteredCareers.length === 0 && (
          <p className="text-center mt-10 text-gray-500">
            No careers found.
          </p>
        )}
      </section>

      <OurClients />
    </>
  );
}
