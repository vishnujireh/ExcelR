"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import Breadcrumb from "../../components/Breadcrumb";
import Link from "next/link";
import { RootState, AppDispatch } from "@/redux/store";
import readmore from "/public/log-in.png";
import {
  fetchNewsEventDetail,
  clearNewsDetail,
} from "@/redux/slices/newsEventsSlice";

export default function NewsEventDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const dispatch = useDispatch<AppDispatch>();
  const { newsDetail, detailLatestPosts, popularNews, loading, error } = useSelector(
    (state: RootState) => state.newsEvents
  );

  useEffect(() => {
    if (slug) dispatch(fetchNewsEventDetail(slug as string));

    return () => {
      dispatch(clearNewsDetail());
    };
  }, [slug, dispatch]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!newsDetail) return <p className="text-center py-10">No data found</p>;
const IMAGE_BASE_URL = "https://demo3.excelr.com/";
  return (
    <>
      <Head>
        <title>{newsDetail.title}</title>
        <meta name="description" content={newsDetail.description_short} />
      </Head>

      <Breadcrumb />

      {/* ✅ HEADER */}
      <div className="w-full md:py-10 p-5 xl:px-20 career-bg_grad">
        <h1 className="text-3xl text-white text-center z-50 relative">
          {newsDetail.title}
        </h1>
      </div>

      <section className="w-full md:py-10 p-5 xl:px-20 grid grid-cols-1 md:grid-cols-4 gap-6 bg-[#F4F7FF]">

        {/* ✅ LEFT CONTENT */}
        <div className="md:col-span-3">
          <div className="bg-white">
          <div className="relative w-full aspect-[16/8] mb-6">
            <Image
              src={`https://demo3.excelr.com/${newsDetail.image}`}
              alt={newsDetail.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-5 pb-0">
          <article 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: newsDetail.description_full || "",
            }}
          />
          </div>
          </div>
        </div>

        {/* ✅ RIGHT SIDEBAR */}
        <div className="md:col-span-1 space-y-6">

         {/* ✅ LATEST NEWS */}
  {detailLatestPosts.length > 0 && (
    <div>
      <h3 className="font-semibold mb-3 text-md">
        Latest News
      </h3>

      <div className="space-y-6">
        {detailLatestPosts.map((item) => (
          <div key={item.id} className="bg-white shadow rounded overflow-hidden">

            {/* ✅ IMAGE */}
            <div className="relative w-full aspect-[16/9]">
              <Image
                src={`${IMAGE_BASE_URL}${item.image}`}
                alt={item.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* ✅ CONTENT */}
            <div className="p-4">
              <h4 className="font-semibold text-sm leading-6 line-clamp-2">
                {item.title}
              </h4>
              {/* {item.event_date && (
              <p className="text-xs text-gray-500 mt-1">
                {item.event_date}
              </p>
              )} */}

              {item.description_short && (
                <p className="text-sm text-gray-600 mt-2 line-clamp-1">
                  {item.description_short}
                </p>
              )}

              <Link
                href={`/${item.detail_url}`}
                 className="text-[#ff9600] mt-3 flex gap-2 text-sm"
              ><Image src={readmore} alt="Read more" />
                Read more
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}

{/* ✅ POPULAR NEWS */}
  {popularNews.length > 0 && (
    <div>
      <h3 className="font-semibold mb-3 text-md">
        Popular News
      </h3>

      <div className="space-y-6">
        {popularNews.map((item) => (
          <div key={item.id} className="bg-white shadow rounded overflow-hidden">

            {/* ✅ IMAGE */}
            <div className="relative w-full aspect-[16/9]">
              <Image
                src={`${IMAGE_BASE_URL}${item.image}`}
                alt={item.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* ✅ CONTENT */}
            <div className="p-4">
              <h4 className="font-semibold text-sm leading-6 line-clamp-2">
                {item.title}
              </h4>

              {item.description_short && (
                <p className="text-sm text-gray-600 mt-2 line-clamp-1">
                  {item.description_short}
                </p>
              )}

              <Link
                href={`/${item.detail_url}`}
                 className="text-[#ff9600] mt-3 flex gap-2 text-sm"
              >
               <Image src={readmore} alt="Read more" />
                Read more
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}
        </div>
      </section>
    </>
  );
}
