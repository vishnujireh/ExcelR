"use client";

import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../../components/Breadcrumb";
import OurClients from "../../components/OurClients";
import { RootState, AppDispatch } from "@/redux/store";
import {
  fetchCareerDetail,
  clearCareerDetail,
} from "@/redux/slices/careerSlice";
import {
  RiTimeLine,
  RiMapPinLine,
  RiBriefcase3Line,
} from "react-icons/ri";

export default function CareerDetailPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { slug } = router.query;

  const { careerDetail: job, loading, error } = useSelector(
    (state: RootState) => state.career
  );

  useEffect(() => {
    if (slug) {
      dispatch(fetchCareerDetail(slug as string));
    }

    return () => {
      dispatch(clearCareerDetail());
    };
  }, [slug, dispatch]);

  if (loading)
    return <p className="text-center py-10">Loading job details...</p>;
  if (error)
    return <p className="text-center py-10 text-red-500">{error}</p>;
  if (!job) return <p className="text-center py-10">Job not found</p>;

  return (
    <>
      <Head>
        <title>{job.title} | Excelr Careers</title>
        <meta
          name="description"
          content={`Apply for ${job.title} at Excelr.`}
        />
      </Head>

      {/* ✅ Breadcrumb spacing fix */}
      <div className="px-4 md:px-0">
        <Breadcrumb />
      </div>

      {/* ✅ Header */}
      <div className="w-full md:mx-auto py-6 md:py-10 2xl:px-32 xl:px-20 lg:px-10 px-4 career-bg_grad">
        <h1 className="text-xl md:text-3xl font-medium text-shadow-black text-center text-white z-50 relative">
          {job.title}
        </h1>
      </div>

      {/* ✅ Main Section */}
      <section className="w-full md:mx-auto py-6 md:py-10 2xl:px-25 xl:px-20 lg:px-10 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ✅ Job Content */}
          <div className="lg:col-span-2">
            <h1 className="text-xl md:text-3xl font-bold mb-2">
              {job.title}
            </h1>

            <article
              className="prose prose-lg max-w-none text-gray-500 text-sm"
              dangerouslySetInnerHTML={{ __html: job.description }}
            />

            <div className="mt-3 space-y-1">
              <p className="flex items-center text-gray-500 text-sm gap-1.5">
                <RiTimeLine className="text-lg text-[#327ac5]" />
                <span className="font-semibold text-black">
                  Job Category :
                </span>{" "}
                {job.category}
              </p>

              <p className="flex items-center text-gray-500 text-sm gap-1.5">
                <RiBriefcase3Line className="text-lg text-[#327ac5]" />
                <span className="font-semibold text-black">
                  Job Type :
                </span>{" "}
                {job.industry}
              </p>

              <p className="flex items-center text-gray-500 text-sm gap-1.5">
                <RiMapPinLine className="text-lg text-[#327ac5]" />
                <span className="font-semibold text-black">
                  Job Location :
                </span>{" "}
                {job.location}
              </p>
            </div>
          </div>

          {/* ✅ Application Form */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-6">
              <div className="shadow p-4 md:p-5 rounded-lg">
                <p className="text-lg mb-4 font-medium text-[#4593d0]">
                  Apply for this position
                </p>

                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Name *"
                    className="border border-gray-200 text-sm rounded-lg w-full p-3"
                    required
                  />

                  <input
                    type="tel"
                    placeholder="Mobile No. *"
                    className="border border-gray-200 text-sm rounded-lg w-full p-3"
                    required
                  />

                  <input
                    type="email"
                    placeholder="Email *"
                    className="border border-gray-200 text-sm rounded-lg w-full p-3"
                    required
                  />

                  <input
                    type="text"
                    placeholder="EMP Name / Code *"
                    className="border border-gray-200 text-sm rounded-lg w-full p-3"
                    required
                  />

                  <small className="text-gray-400 block">
                    *Applicable for ExcelR employees referral only
                  </small>

                  <textarea
                    placeholder="Cover Letter *"
                    className="border border-gray-200 text-sm rounded-lg w-full p-3"
                    required
                  />

                  <label className="text-sm block">Upload CV *</label>
                  <input
                    type="file"
                    className="border border-gray-200 text-sm rounded-lg w-full p-3"
                    required
                  />

                  <div className="flex items-start gap-2 text-sm">
                    <input type="checkbox" required />
                    <label className="text-gray-500">
                      I agree to the{" "}
                      <a
                        href="/terms"
                        className="text-blue-600 underline"
                        target="_blank"
                      >
                        Terms and Conditions
                      </a>{" "}
                      and{" "}
                      <a
                        href="/privacy-policy"
                        className="text-blue-600 underline"
                        target="_blank"
                      >
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className=" border border-[#0071BC] bg-[#0071BC] text-white hover:bg-[#4ba7de] font-medium text-sm py-2.5 px-5 rounded-lg"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <OurClients />
    </>
  );
}
