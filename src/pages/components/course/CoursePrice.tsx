"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ClassSchedule from "../ClassSchedule";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpcomingBatch } from "@/redux/slices/upcomingBatchSlice";
import { AppDispatch, RootState } from "@/redux/store";
import type { TrainingMode } from "@/redux/slices/upcomingBatchSlice";
import type { CourseData } from "@/redux/slices/courseSlice";
import QuickEnquiry from "../QuickEnquiry"
import ComboOffer from "../ComboOffer";
import parse from "html-react-parser";

const isPrivateOrLocalIp = (ip: string) => {
  const v = (ip || "").trim().toLowerCase();
  if (!v) return true;

  if (v === "::1" || v === "::" || v === "0.0.0.0") return true;
  if (v.startsWith("127.") || v.startsWith("10.") || v.startsWith("192.168.")) {
    return true;
  }
  if (v.startsWith("172.")) {
    const second = Number(v.split(".")[1] || "-1");
    if (second >= 16 && second <= 31) return true;
  }
  if (v.startsWith("fc") || v.startsWith("fd") || v.startsWith("fe80")) {
    return true;
  }

  return false;
};

const resolveClientIp = async () => {
  const fallbackIp = "8.8.8.8";

  try {
    const localIpRes = await fetch("/nextapi/client-ip", {
      method: "GET",
      cache: "no-store",
    });
    if (localIpRes.ok) {
      const localIpData = await localIpRes.json();
      const localIp = (localIpData?.ip || "").trim();
      if (localIp && !isPrivateOrLocalIp(localIp)) {
        return localIp;
      }
    }
  } catch {
    // fallback to third-party resolver
  }

  try {
    const ipRes = await fetch("https://api64.ipify.org?format=json", {
      method: "GET",
      cache: "no-store",
    });
    if (ipRes.ok) {
      const ipData = await ipRes.json();
      const externalIp = (ipData?.ip || "").trim();
      if (externalIp && !isPrivateOrLocalIp(externalIp)) {
        return externalIp;
      }
    }
  } catch {
    // keep hard fallback
  }

  return fallbackIp;
};

/*   THIS HELPER HERE */
const formatDayWithSuffix = (rawDate: string) => {
  const date = new Date(rawDate);
  const day = date.getDate().toString().padStart(2, "0");

  const suffix =
    day.endsWith("1") && day !== "11" ? "st" :
    day.endsWith("2") && day !== "12" ? "nd" :
    day.endsWith("3") && day !== "13" ? "rd" : "th";

  return { day, suffix };
};
/* ⭐️ END HELPER */

const formatPrice = (amount?: number | string | null) => {
  if (!amount) return "";
  return Number(amount).toLocaleString("en-IN"); // Adds commas for Indian numbering style
};

interface CoursePriceProps {
  data?: CourseData;
}

export default function CoursePrice({ data }: CoursePriceProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuickModalOpen, setIsQuickModalOpen] = useState(false);
const [formName, setFormName] = useState("");
const [variant, setVariant] = useState<"default" | "callback">("default");
const openQuickEnquiryModal = (name: string, type: "default" | "callback" = "default") => {
  setFormName(name);
  setVariant(type);
  setIsQuickModalOpen(true);
};
  const [isComboModalOpen, setIsComboModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedModeData, setSelectedModeData] =
    useState<TrainingMode | null>(null);
  const [ipAddress, setIpAddress] = useState("");
  const [city, setCity] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const slugParam = router.query.slug;
  const courseSlug = Array.isArray(slugParam)
    ? slugParam[0]
    : typeof slugParam === "string"
    ? slugParam
    : "";

  const { batchData, loading, error } = useSelector(
    (state: RootState) => state.upcomingBatch
  );

  // Fetch IP
  useEffect(() => {
    let cancelled = false;

    const loadIp = async () => {
      const resolvedIp = await resolveClientIp();
      if (!cancelled) {
        setIpAddress(resolvedIp);
      }
    };

    loadIp();

    return () => {
      cancelled = true;
    };
  }, []);

  // Fetch City
  useEffect(() => {
    if (!ipAddress) return;

    fetch(`https://ipapi.co/${ipAddress}/json/`)
      .then((res) => res.json())
      .then((data) => setCity(data.city || ""))
      .catch(() => setCity(""));
  }, [ipAddress]);

  // Fetch Batches
  useEffect(() => {
    if (!courseSlug || !ipAddress) return;

    dispatch(
      fetchUpcomingBatch({
        courseSlug,
        city: city || "",
        ip_address: ipAddress,
      })
    );
  }, [dispatch, courseSlug, city, ipAddress]);

  const openModal = (mode: TrainingMode) => {
    setSelectedType(mode.mode);
    setSelectedModeData(mode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedType("");
    setSelectedModeData(null);
  };

  const comboOfferData = batchData?.combo_offer
  ? {
      title: "Combo Offer", // default title
      items: batchData.combo_offer.items || [], // fallback to empty array
    }
  : null;

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center text-red-600 py-10">{error}</p>;

  const shouldHideBatchSection =
    Array.isArray(batchData?.training_modes) && batchData.training_modes.length === 0;
  if (shouldHideBatchSection) return null;

  return (
    <>
      <div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-[#000000]">
        <div className="w-full md:flex justify-center">
          <div className="flex flex-row justify-center flex-wrap gap-10">
            {batchData?.training_modes?.map((mode) => {
              const isSelfPaced =
                mode.mode?.toLowerCase() === "self paced";
              const combo = batchData?.combo_offer;

              /* ------------------------------------------------------------------
                  ⭐ CASE 1: SELF PACED → Show Combo Offer List
              ------------------------------------------------------------------ */
              if (isSelfPaced && combo?.items?.length) {
                return (
                  <div
                    key="combo-offer"
                    className="bg-white rounded-2xl text-center p-6 w-sm"
                  >
                    <h5 className="uppercase text-black text-md font-semibold tracking-wider pb-3">
                      Combo Offer
                    </h5>

                    <hr className="border-gray-200 my-5" />

                    {/* Combo Items */}
                    {combo.items.map((item: any, idx: number) => (
                      <div key={idx} className="mb-6 text-left">
                        {/* TITLE */}
                        <h4 className="font-semibold text-[16px] mb-2">
                          {item.name}
                        </h4>
                        
                        <div className="flex justify-around mb-6 relative">
                    <h6 className="dis-amt font-bold text-lg">
                     <span className='disam'></span> {item.currency} {formatPrice(item.mrp)}
                    </h6>
                    <h6 className="font-bold text-lg text-[#ea9b0a]">
                         {item.currency} {formatPrice (item.discount_price)}
                      </h6>
                  </div>
                         

                        {/* ENROLL BUTTON */}
                        {/* <Link
                          href={item.enroll_url}
                          target="_blank"
                          className="flex items-center justify-center border border-solid border-[#007bff] bg-[#007bff] text-[#fff] hover:bg-[#2563EB] font-medium text-sm h-10 px-4 rounded-3xl uppercase transition"
                        >
                          Enroll Now
                        </Link> */}
                      </div>
                    ))}
                    <div className="flex flex-col gap-2 mt-5">
                    <button
                      onClick={() => openQuickEnquiryModal("Quick Enquiry", "default")}
                      className="flex cursor-pointer items-center justify-center border border-solid border-[#007bff] bg-[#007bff] text-[#fff] hover:bg-[#2563EB] font-medium text-sm h-10 px-4 rounded-3xl uppercase transition"
                    >
                     Enquire Now
                    </button>

                    <button
                      onClick={() => setIsComboModalOpen(true)}
                      className="flex cursor-pointer items-center justify-center border border-solid border-[#007bff] bg-[#007bff] text-[#fff] hover:bg-[#2563EB] font-medium text-sm h-10 px-4 rounded-3xl uppercase transition"
                    >
                    Enroll Now
                    </button>

                    {/* {mode.upcoming_dates_preview?.[0]?.enroll_url && (
                      <Link
                        href={mode.upcoming_dates_preview[0].enroll_url}
                        target="_blank"
                        className="flex items-center justify-center border border-solid border-[#007bff] bg-[#007bff] text-[#fff] hover:bg-[#2563EB] font-medium text-sm h-10 px-4 rounded-3xl uppercase transition"
                      >
                        Enroll Now
                      </Link>
                    )} */}
                  </div>
                  </div>
                );
              }

              /* ------------------------------------------------------------------
                  ⭐ CASE 2: ALL OTHER TRAINING MODES → NORMAL CARD
              ------------------------------------------------------------------ */
              return (
                <div
                  key={mode.mode}
                  className="bg-white rounded-2xl text-center p-6 max-w-sm"
                >
                  <h5 className="uppercase text-black text-md font-semibold tracking-wider pb-3">
                    {mode.mode}
                  </h5>

                  {!mode.price_info ? (
                    <p className="text-sm text-red-600">
                      Pricing unavailable
                    </p>
                  ) : mode.price_info.iitm_certificate_amount ? (
                    <>
                      <p className="text-sm font-semibold pb-2.5">
                        Without IITM Pravartak Certification
                      </p>

                      <div className="flex justify-around mb-6 relative">
                        <h6 className="dis-amt font-bold text-xl">
                          <span className="disam"></span>{" "}
                          {mode.price_info.currency}{" "}
                          {formatPrice(mode.price_info.amount)}
                        </h6>

                        {mode.price_info.discount_amount && (
                          <h6 className="font-bold text-xl text-[#ea9b0a]">
                            {mode.price_info.currency}{" "}
                            {formatPrice(mode.price_info.discount_amount)}
                          </h6>
                        )}
                      </div>

                      <p className="text-sm font-semibold pb-2.5">
                        With IITM Pravartak Certification
                      </p>
                      <h6 className="font-bold text-xl text-[#ea9b0a]">
                        {mode.price_info.currency}{" "}
                        {formatPrice(mode.price_info.iitm_certificate_amount)}
                      </h6>
                    </>
                  ) : (
                    <div className="flex justify-around mb-6 relative">
                      <h6 className="dis-amt font-bold text-xl">
                        <span className="disam"></span>{" "}
                        {mode.price_info.currency}{" "}
                        {formatPrice(mode.price_info.amount)}
                      </h6>

                      {mode.price_info.discount_amount && (
                        <h6 className="font-bold text-xl text-[#ea9b0a]">
                          {mode.price_info.currency}{" "}
                          {formatPrice(mode.price_info.discount_amount)}
                        </h6>
                      )}
                    </div>
                  )}

                  <hr className="border-gray-200 my-5" />

                  {mode.benefits_html && (
                    <div
                      className="text-[#666666] text-sm mb-5 text-left">
                      {parse(mode.benefits_html ?? "")}
                    </div>
                  )}

                  <div className="mt-5">
                    <h6 className="font-semibold mb-3">Upcoming Batches</h6>

                    <div className="flex justify-center flex-wrap gap-4">
                     {mode.upcoming_dates_preview?.map((batch, i) => {
  const { day, suffix } = formatDayWithSuffix(batch.date.raw);

  return (
    <div key={i} className="text-center">
      <span className="clsschdate time-change-wrapper">
        {day} <sup className="-left-1">{suffix}</sup>
      </span>
      <p className="text-[#666] text-sm mt-1">{batch.date.display.split(" ")[1]}</p>
    </div>
  );
})}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mt-5">
                    <button
                      onClick={() => openModal(mode)}
                      className="flex cursor-pointer items-center justify-center border border-solid border-[#007bff] bg-[#007bff] text-[#fff] hover:bg-[#2563EB] font-medium text-sm h-10 px-4 rounded-3xl uppercase transition"
                    >
                      Show All Batches
                    </button>

                    {mode.upcoming_dates_preview?.[0]?.batch_id && (
                      <Link
                        href={`/enroll_course/${mode.upcoming_dates_preview[0].batch_id}${courseSlug ? `?course=${courseSlug}` : ""}`}
                        className="flex items-center justify-center border border-solid border-[#007bff] bg-[#007bff] text-[#fff] hover:bg-[#2563EB] font-medium text-sm h-10 px-4 rounded-3xl uppercase transition"
                      >
                        Enroll Now
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {isModalOpen && (
          <ClassSchedule
            type={selectedType}
            closeModal={closeModal}
            modeData={selectedModeData}
            courseSlug={courseSlug}
          />
        )}

        {isComboModalOpen && (
        <ComboOffer
          closeModal={() => setIsComboModalOpen(false)}
          data={comboOfferData}
          courseSlug={courseSlug}
        />
      )}

        {isQuickModalOpen && (
  <QuickEnquiry
    closeModal={() => setIsQuickModalOpen(false)}
    formName={formName}   // ✅ dynamic form name
    variant={variant}     // ✅ UI variant
    course={data?.course || data?.course_name}
    city={data?.city}
    state={data?.state}
    country={data?.country}
  />
)}
      </div>
    </>
  );
}

