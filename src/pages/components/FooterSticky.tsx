"use client";

import React, { useState } from "react";
import { LuPhoneCall, LuSmartphone, LuLifeBuoy } from "react-icons/lu";
import QuickEnquiry from "./QuickEnquiry";
import { apiGet } from "@/redux/api/apiClient";
import type { CourseData } from "@/redux/slices/courseSlice";

interface FooterStickyProps {
  courseData?: CourseData | null;
}

export default function FooterSticky({ courseData }: FooterStickyProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [variant, setVariant] = useState<"default" | "callback">("default");
  const [formName, setFormName] = useState("");
  const [prefill, setPrefill] = useState({
    course: "",
    country: "",
    state: "",
    location: "",
  });

  const resolveSlug = () => {
    if (typeof window === "undefined") return "";
    const pathname = window.location.pathname.split("?")[0].replace(/^\/+/, "");
    if (!pathname) return "";
    const parts = pathname.split("/").filter(Boolean);
    if (parts[0] === "course") return parts[1] || "";

    const excluded = new Set([
      "_next",
      "api",
      "favicon.ico",
      "favicon.png",
      "images",
      "thank-you",
      "contact",
      "corporate-training",
      "every-day-learning",
      "gallery",
      "aboutv",
      "terms-and-conditions1",
      "careers",
      "blogs",
      "blog-category",
      "blog-subcategory",
      "news-events",
      "news-event-detail",
      "news-event-category",
      "course",
      "enroll_course",
      "enroll_combo_course",
      "page",
      "home",
    ]);

    const candidate = parts[0]?.toLowerCase() || "";
    return excluded.has(candidate) ? "" : parts[0];
  };

  const openModal = async (type: "default" | "callback", name: string) => {
    setVariant(type);
    setFormName(name);

    if (courseData) {
      setPrefill({
        course: courseData.course || courseData.course_name || "",
        country: courseData.country || "",
        state: courseData.state || "",
        location: courseData.city || "",
      });
      setIsModalOpen(true);
      return;
    }

    const slug = resolveSlug();
    if (!slug) {
      setPrefill({ course: "", country: "", state: "", location: "" });
      setIsModalOpen(true);
      return;
    }

    try {
      const response: any = await apiGet(`/course_details/${slug}`);
      const detail = response?.data?.course_details?.[0];
      setPrefill({
        course: detail?.course || detail?.course_name || "",
        country: detail?.country || "",
        state: detail?.state || "",
        location: detail?.city || "",
      });
    } catch {
      setPrefill({ course: "", country: "", state: "", location: "" });
    } finally {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="fixed bottom-0 left-0 w-full bg-[#0b0b0b] shadow-md z-50 hidden md:block">
        <div className="w-full md:mx-auto 2xl:px-25 xl:px-20 lg:px-10 px-5 py-1 flex justify-around items-center">

          {/* DROP A QUERY */}
          <button
            onClick={() =>
              openModal("default", "Drop a Query")
            }
            className="text-white cursor-pointer font-medium text-sm h-10 px-4 rounded-lg flex gap-1.5 items-center"
          >
            <LuLifeBuoy /> Drop a Query
          </button>

          {/* REQUEST CALLBACK */}
          <button
            onClick={() =>
              openModal("callback", "Request a Call back")
            }
            className="text-white cursor-pointer font-medium text-sm h-10 px-4 rounded-lg flex gap-1.5 items-center"
          >
            <LuSmartphone /> Request a Callback
          </button>

          {/* TOLL FREE */}
          <a
            href="tel:18002122121"
            className="text-white font-medium text-sm h-10 px-4 rounded-lg flex gap-1.5 items-center"
          >
            <LuPhoneCall /> Toll Free : 18002122121
          </a>
        </div>

        {/* MODAL */}
        {isModalOpen && (
          <QuickEnquiry
          
            closeModal={closeModal}
            course={prefill.course}
            country={prefill.country}
            state={prefill.state}
            city={prefill.location}
            variant={variant}     // ✅ UI logic
            formName={formName}   // ✅ API logic
          />
        )}
      </div>
    </>
  );
}
