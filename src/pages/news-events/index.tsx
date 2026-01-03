"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "@/pages/components/Breadcrumb";
import OurClients from "../components/OurClients";
import readmore from "/public/log-in.png";

import { RootState, AppDispatch } from "@/redux/store";
import { fetchNewsEvents } from "@/redux/slices/newsEventsSlice";

export default function NewsEvents() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    newsEvents,
    categories,
    listLatestPosts,
    loading,
    error,
  } = useSelector((state: RootState) => state.newsEvents);

  useEffect(() => {
    dispatch(fetchNewsEvents());
  }, [dispatch]);

  return (
    <>
      <div>
        <Breadcrumb />
      </div>

      <div className="w-full md:mx-auto md:py-14 2xl:px-32 xl:px-20 lg:px-10 p-5 bg-[#4f4f4f]">
        <h1 className="text-3xl font-medium text-shadow-black mb-1.5 text-center z-50 relative text-white">
          News & Events
        </h1>
      </div>

      <section className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-[#F4F7FF]">
        {/* ✅ Loading */}
        {loading && <p className="text-center py-10">Loading news...</p>}

        {/* ✅ Error */}
        {error && <p className="text-center py-10 text-red-500">{error}</p>}

        {/* ✅ Data */}
        {!loading && !error && (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-4">
            {/* ✅ LEFT: NEWS LIST */}
            <div className="md:col-span-3">
              {newsEvents.map((item) => (
                <div
                  key={item.id}
                  className="shadow hover:shadow-lg transition mb-5 grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  {/* ✅ Image */}
                  <div>
                    <div className="relative aspect-[6/3] w-full">
                      <Image
                        src={`https://demo3.excelr.com/${item.image}`}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* ✅ Content */}
                  <div className="md:col-span-2 p-4">
                    {item.event_date && (
                    <p className="text-xs text-[#666]">
                      {item.event_month} {item.event_day},{" "}
                      {item.event_date.slice(0, 4)}
                    </p>
                    )}
                    <div className="line-clamp-3 min-h-20">
                      <h2 className="text-md font-semibold mb-1">
                        {item.title}
                      </h2>
                      <p className="text-sm leading-6 mt-2 text-[#666]">
                        {item.description_short}
                      </p>
                    </div>

                    <Link
                      href={`/${item.detail_url}`}
                      className="text-[#ff9600] mt-3 text-sm flex items-center gap-2"
                    >
                      <Image src={readmore} alt="Read more" />
                      Read more
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* ✅ RIGHT SIDEBAR */}
            <div className="md:col-span-1 space-y-6">
              {/* ✅ CATEGORIES */}
              <div className="shadow p-4 md:p-5 rounded-lg">
                <h3 className="font-semibold mb-3 text-md">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <Link
                        href={`/${cat.url}`}
                        className="text-sm text-gray-500"
                      >
                        {cat.category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ✅ LATEST POSTS */}
              <div>
                <h3 className="font-semibold mb-3 text-md">Latest Posts</h3>

                <div className="space-y-4">
                  {listLatestPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/${post.detail_url}`}
                      className="flex gap-4 items-start bg-white mb-3 p-3 rounded-lg shadow"
                    >
                      <div className="relative w-20 h-14 flex-shrink-0">
                        <Image
                          src={`https://demo3.excelr.com/${post.image}`}
                          alt={post.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold line-clamp-1">
                          {post.title}
                        </p>
                        <span className="text-xs text-gray-500">
                          {post.event_date}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <OurClients />
    </>
  );
}
