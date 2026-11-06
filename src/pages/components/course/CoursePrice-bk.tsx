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
import { RiArrowRightLine, RiArrowRightDoubleFill, RiBankCardFill } from "react-icons/ri";

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
    // fallback to empty ip
  }

  return "";
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

const isSelfPacedMode = (mode?: string) => {
  const value = (mode || "").trim().toLowerCase();
  return value === "self paced" || value === "self-paced";
};

const isOnlineOrClassroomMode = (mode?: string) => {
  const value = (mode || "").trim().toLowerCase();
  return (
    value === "online" ||
    value === "classroom" ||
    value === "live virtual" ||
    value === "live-virtual"
  );
};

interface CoursePriceProps {
  data?: CourseData;
  template?: string | number;
}

export default function CoursePrice({ data, template }: CoursePriceProps) {
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

  if (!batchData) {
    return null;
  }

  const trainingModes = batchData.training_modes || [];
  const comboItems = batchData.combo_offer?.items || [];
  const selfPacedModes = trainingModes.filter((mode) => isSelfPacedMode(mode.mode));
  const nonSelfPacedModes = trainingModes.filter((mode) => !isSelfPacedMode(mode.mode));
  // const hasComboOffer = comboItems.length > 0 && selfPacedModes.length === 0;
  const hasComboOffer = comboItems.length > 0;
  const priorityModes = nonSelfPacedModes.filter((mode) => isOnlineOrClassroomMode(mode.mode));
  const remainingModes = nonSelfPacedModes.filter((mode) => !isOnlineOrClassroomMode(mode.mode));
  const hasRenderableCards = selfPacedModes.length > 0 || nonSelfPacedModes.length > 0 || hasComboOffer;

  if (!hasRenderableCards) {
    return null;
  }

  return (
    <>
      <div className={`w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 ${String(template) === "3" ? "bg-white" : "bg-[#000000]"}`}>
       {String(template) === "3" && (
         <h2 className={`md:text-3xl text-xl font-semibold text-center md:mb-10 mb-4`}>
         Data Analyst Course Fees
        </h2>)
        }
      
        <div className="w-full md:flex justify-center">
          <div className="flex flex-row justify-center flex-wrap gap-10 items-stretch">
            {priorityModes.map((mode) => {
              const isSelfPaced = isSelfPacedMode(mode.mode);

              return (
                <div
                  key={mode.mode}
                  className={`flex flex-col rounded-2xl text-center p-6 w-full sm:w-[380px] ${String(template) === "3" ? "bg-[#EBF5FF] shadow-md border border-[#155DFC]" : "bg-white"}`}
                >
                  <h5 className={` text-black  font-semibold tracking-wider ${String(template) === "3" ? " pb-0 capitalize text-xl" : " pb-3 uppercase text-md"}`}>
                    {mode.mode}
                  </h5>
                 {String(template) === "3" ? (
                    <hr className="border-[#155DFC] my-3" />
                 )
                 :null }
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
                        {mode.price_info.discount_amount ?(
                          <>
<h6 className="dis-amt font-bold text-xl">
                          <span className="disam"></span>{" "}
                          {mode.price_info.currency}{" "}
                          {formatPrice(mode.price_info.amount)}
                        </h6>
                        <h6 className="font-bold text-xl text-[#ea9b0a]">
                            {mode.price_info.currency}{" "}
                            {formatPrice(mode.price_info.discount_amount)}
                          </h6>
                          </>
                        ): (
                          <h6 className="font-bold text-xl">
                          {mode.price_info.currency}{" "}
                          {formatPrice(mode.price_info.amount)}
                        </h6>
                        )}
                        

                        {/* {mode.price_info.discount_amount && (
                          <h6 className="font-bold text-xl text-[#ea9b0a]">
                            {mode.price_info.currency}{" "}
                            {formatPrice(mode.price_info.discount_amount)}
                          </h6>
                        )} */}
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
                    <div className={` justify-around mb-6 relative ${String(template) === "3" ? "block" : "flex"}`}>
                      {mode.price_info.discount_amount ? (
                        <>
                         <h6 className={`dis-amt  ${String(template) === "3" ? "text-[#BDBDBD] text-base mb-3 font-medium" : "text-[#171717] text-xl font-bold mb-0"}`}>
                      {String(template) === "3" ? (
  <del>
    {mode.price_info.currency}{" "}
    {formatPrice(mode.price_info.amount)}
  </del>
) : (
  <>
    <span className="disam"></span>{" "}
    {mode.price_info.currency}{" "}
    {formatPrice(mode.price_info.amount)}
  </>
)}
                       
                      </h6>
                       <h6 className={` ${String(template) === "3" ? "text-3xl text-[#171717] font-semibold" : "font-bold text-xl text-[#ea9b0a]"}`}>
                          {mode.price_info.currency}{" "}
                          {formatPrice(mode.price_info.discount_amount)}
                        </h6>
                        </>
                      ):(
 <h6 className="font-bold text-xl text-[#ea9b0a]">
                        {mode.price_info.currency}{" "}
                        {formatPrice(mode.price_info.amount)}
                      </h6>
                      )}
                    </div>
                  )}
                 
                {String(template) !== "3" && (
  <hr className="border-gray-200 my-5" />
)}

                  {mode.benefits_html && (
                    <div
                      className={` text-sm  text-left ${String(template) === "3" ? "text-[#171717] border-dashed border-[#ccc] border-b-2 mb-3 templatetwo" : "text-[#666666] mb-5"}`}>
                      {parse(mode.benefits_html ?? "")}
                    </div>
                  )}

                 {String(template) === "3" ? (
                  <div className="mt-auto w-5/6 justify-center ml-auto mr-auto">
                  {!isSelfPaced  && (
                    <button
                      onClick={() => openModal(mode)}
                      className="flex cursor-pointer mt-5 items-center justify-center text-center w-full text-[#007bff] font-medium text-sm transition"
                    >
                      Upcoming Batches <RiArrowRightDoubleFill  />
                    </button>)}
                    <div className="flex items-center justify-start gap-2 mt-5 bg-white p-3 rounded-lg">
                      <RiBankCardFill  className="text-[#A9A3A3] text-lg"/> <p className="text-[#A9A3A3] text-xs font-medium">Pay in EMIs With ZERO% Interest Rate</p>
                    </div>
  <div className="flex flex-col gap-2 mt-5">
                    {mode.upcoming_dates_preview?.[0]?.batch_id && (
                      <Link
                       // href={`/enroll_course/${mode.upcoming_dates_preview[0].batch_id}${courseSlug ? `?course=${courseSlug}` : ""}`}
                       href={mode.upcoming_dates_preview[0].enroll_url}
                        className={`flex cursor-pointer items-center justify-center border border-solid border-[#007bff]  hover:bg-[#2563EB] font-medium text-sm h-10 px-4 text-white transition ${String(template) === "3" ? "rounded-md bg-[#155DFC] gap-2" : "rounded-3xl uppercase bg-[#007bff]"}`}
                      >
                        {isSelfPaced ? "Buy Now" : "Enroll Now"}   <RiArrowRightLine className="text-base block" />
                      </Link>
                    )}
                  </div>
                  </div>
) : (
  <>
     {!isSelfPaced  && (
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
                 )}
                 <div className="flex flex-col gap-2 mt-5">
                  {!isSelfPaced  && (
                    <button
                      onClick={() => openModal(mode)}
                      className="flex cursor-pointer items-center justify-center border border-solid border-[#007bff] bg-[#007bff] text-[#fff] hover:bg-[#2563EB] font-medium text-sm h-10 px-4 rounded-3xl uppercase transition"
                    >
                      Show All Batches
                    </button>)}
                    {mode.upcoming_dates_preview?.[0]?.batch_id && (
                      <Link
                       // href={`/enroll_course/${mode.upcoming_dates_preview[0].batch_id}${courseSlug ? `?course=${courseSlug}` : ""}`}
                       href={mode.upcoming_dates_preview[0].enroll_url}
                        className={`flex cursor-pointer items-center justify-center border border-solid border-[#007bff]  hover:bg-[#2563EB] font-medium text-sm h-10 px-4 text-white transition ${String(template) === "3" ? "rounded-md bg-[#155DFC] gap-2" : "rounded-3xl uppercase bg-[#007bff]"}`}
                      >
                        {isSelfPaced ? "Buy Now" : "Enroll Now"}
                      </Link>
                    )}
                 </div>
  </>
)}
                 
                  

                  
                </div>
              );
            })}
            {remainingModes.map((mode) => {
              const isSelfPaced = isSelfPacedMode(mode.mode);

              return (
                <div
                  key={mode.mode}
                  className="flex flex-col bg-white rounded-2xl text-center p-6 w-full sm:w-[380px]"
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
                        {mode.price_info.discount_amount ?(
                          <>
<h6 className="dis-amt font-bold text-xl">
                          <span className="disam"></span>{" "}
                          {mode.price_info.currency}{" "}
                          {formatPrice(mode.price_info.amount)}
                        </h6>
                        <h6 className="font-bold text-xl text-[#ea9b0a]">
                            {mode.price_info.currency}{" "}
                            {formatPrice(mode.price_info.discount_amount)}
                          </h6>
                          </>
                        ): (
                          <h6 className="font-bold text-xl">
                          {mode.price_info.currency}{" "}
                          {formatPrice(mode.price_info.amount)}
                        </h6>
                        )}
                        

                        {/* {mode.price_info.discount_amount && (
                          <h6 className="font-bold text-xl text-[#ea9b0a]">
                            {mode.price_info.currency}{" "}
                            {formatPrice(mode.price_info.discount_amount)}
                          </h6>
                        )} */}
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
                      {mode.price_info.discount_amount ? (
                        <>
                         <h6 className="dis-amt font-bold text-xl">
                        <span className="disam"></span>{" "}
                        {mode.price_info.currency}{" "}
                        {formatPrice(mode.price_info.amount)}
                      </h6>
                       <h6 className="font-bold text-xl text-[#ea9b0a]">
                          {mode.price_info.currency}{" "}
                          {formatPrice(mode.price_info.discount_amount)}
                        </h6>
                        </>
                      ):(
 <h6 className="font-bold text-xl text-[#ea9b0a]">
                        {mode.price_info.currency}{" "}
                        {formatPrice(mode.price_info.amount)}
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

                 {!isSelfPaced  && (
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
                 )}
                  

                  <div className={`flex flex-col gap-2 mt-auto ${String(template) === "3" ? "w-5/6 justify-center" : ""}`}>
                    {!isSelfPaced  && (
                    <button
                      onClick={() => openModal(mode)}
                      className={`flex cursor-pointer items-center justify-center border border-solid border-[#007bff]  hover:bg-[#2563EB] font-medium text-sm h-10 px-4 text-white transition ${String(template) === "3" ? "rounded-md bg-[#155DFC] gap-2" : "rounded-3xl uppercase bg-[#007bff]"}`}
                    >
                      Show All Batches
                    </button>)}

                    {mode.upcoming_dates_preview?.[0]?.batch_id && (
                      <Link
                       // href={`/enroll_course/${mode.upcoming_dates_preview[0].batch_id}${courseSlug ? `?course=${courseSlug}` : ""}`}
                       href={mode.upcoming_dates_preview[0].enroll_url}
                        className={`flex cursor-pointer items-center justify-center border border-solid border-[#007bff]  hover:bg-[#2563EB] font-medium text-sm h-10 px-4 text-white transition ${String(template) === "3" ? "rounded-md bg-[#155DFC] gap-2" : "rounded-3xl uppercase bg-[#007bff]"}`}
                      >
                        {isSelfPaced ? "Buy Now" : "Enroll Now"}
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}

            {!hasComboOffer && selfPacedModes.map((mode) => {
              const isSelfPaced = isSelfPacedMode(mode.mode);

              return (
                <div
                  key={mode.mode}
                  className="flex flex-col bg-white rounded-2xl text-center p-6 w-full sm:w-[380px]"
                >
                  <h5 className={` text-black  font-semibold tracking-wider ${String(template) === "3" ? " pb-0 capitalize text-xl" : " pb-3 uppercase text-md"}`}>
                    {mode.mode}
                  </h5>
                 {String(template) === "3" ? (
                    <hr className="border-[#155DFC] my-3" />
                 )
                 :null }

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
                        {mode.price_info.discount_amount ?(
                          <>
<h6 className="dis-amt font-bold text-xl">
                          <span className="disam"></span>{" "}
                          {mode.price_info.currency}{" "}
                          {formatPrice(mode.price_info.amount)}
                        </h6>
                        <h6 className="font-bold text-xl text-[#ea9b0a]">
                            {mode.price_info.currency}{" "}
                            {formatPrice(mode.price_info.discount_amount)}
                          </h6>
                          </>
                        ): (
                          <h6 className="font-bold text-xl">
                          {mode.price_info.currency}{" "}
                          {formatPrice(mode.price_info.amount)}
                        </h6>
                        )}
                        

                        {/* {mode.price_info.discount_amount && (
                          <h6 className="font-bold text-xl text-[#ea9b0a]">
                            {mode.price_info.currency}{" "}
                            {formatPrice(mode.price_info.discount_amount)}
                          </h6>
                        )} */}
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
                      {mode.price_info.discount_amount ? (
                        <>
                         <h6 className="dis-amt font-bold text-xl">
                        <span className="disam"></span>{" "}
                        {mode.price_info.currency}{" "}
                        {formatPrice(mode.price_info.amount)}
                      </h6>
                       <h6 className="font-bold text-xl text-[#ea9b0a]">
                          {mode.price_info.currency}{" "}
                          {formatPrice(mode.price_info.discount_amount)}
                        </h6>
                        </>
                      ):(
 <h6 className="font-bold text-xl text-[#ea9b0a]">
                        {mode.price_info.currency}{" "}
                        {formatPrice(mode.price_info.amount)}
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

                 {!isSelfPaced  && (
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
                 )}
                  

                  <div className="flex flex-col gap-2 mt-auto">
                    {!isSelfPaced  && (
                    <button
                      onClick={() => openModal(mode)}
                      className="flex cursor-pointer items-center justify-center border border-solid border-[#007bff] bg-[#007bff] text-[#fff] hover:bg-[#2563EB] font-medium text-sm h-10 px-4 rounded-3xl uppercase transition"
                    >
                      Show All Batches
                    </button>)}

                    {mode.upcoming_dates_preview?.[0]?.batch_id && (
                      <Link
                       // href={`/enroll_course/${mode.upcoming_dates_preview[0].batch_id}${courseSlug ? `?course=${courseSlug}` : ""}`}
                       href={mode.upcoming_dates_preview[0].enroll_url}
                        className="flex items-center justify-center border border-solid border-[#007bff] bg-[#007bff] text-[#fff] hover:bg-[#2563EB] font-medium text-sm h-10 px-4 rounded-3xl uppercase transition"
                      >
                        {isSelfPaced ? "Buy Now" : "Enroll Now"}
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}

            {hasComboOffer && (
              <div
                key="combo-offer"
                className={`flex flex-col rounded-2xl text-center p-6 w-full sm:w-[380px] ${String(template) === "3" ? "bg-[#EBF5FF] shadow-md border border-[#155DFC]" : "bg-white"}`}
              >
                <h5 className={` text-black  font-semibold tracking-wider ${String(template) === "3" ? " pb-0 capitalize text-2xl" : " pb-3 uppercase text-md"}`}>
                    Combo Offer
                  </h5>
                 {String(template) === "3" ? (
                    <hr className="border-[#155DFC] my-3" />
                 )
                 :null } 
            <div className="border-dashed border-[#ccc] border-b-2">
                {/* Combo Items */}
                {comboItems.map((item: any, idx: number) => (
                  <div key={idx} className={`text-left ${String(template) === "3" ? "mb-3" : "mb-6"}`}>
                    {/* TITLE */}
                    <h4 className={` text-[16px]  ${String(template) === "3" ? "text-[#171717] capitalize font-semibold" : "text-[#171717] font-semibold mb-2"}`}>
                      {item.name}
                    </h4>
                    
                    <div className={`flex relative ${String(template) === "3" ? "mt-1 justify-between items-center" : " mb-6 justify-around"}`}>
                <h6 className={`dis-amt font-bold text-lg ${String(template) === "3" ? "text-[#BDBDBD] text-base mb-0 font-medium" : "text-[#171717] text-xl font-bold mb-0"}`}>
              {String(template) === "3" ? (
                <>
  <span className="disamtree"></span>
    {item.currency} {formatPrice(item.mrp)}
</>
) : (
  <>
    <span className="disam"></span>
    {item.currency} {formatPrice(item.mrp)}
  </>
)}
                
                </h6>
                <h6 className={`font-bold  ${String(template) === "3" ? "text-[#171717] text-2xl mb-0 font-semibold" : "text-[#ea9b0a] text-lg font-bold mb-0"}`}>
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
                </div>
                <div className={`flex flex-col gap-2  ${String(template) === "3" ? "w-5/6 justify-center mx-auto mt-6 md:mt-auto" : "mt-auto"}`}>
                <button
                  onClick={() => openQuickEnquiryModal("Quick Enquiry", "default")}
                  className={`flex cursor-pointer items-center justify-center border border-solid border-[#007bff]  hover:bg-[#2563EB] font-medium text-sm h-10 px-4 text-white transition ${String(template) === "3" ? "rounded-md bg-[#155DFC] gap-2" : "rounded-3xl uppercase bg-[#007bff]"}`}
                >
                 Enquire Now {String(template) === "3" ? (
                  <RiArrowRightLine className="text-base inline-block" />
                ) : null}
                </button>

                <button
                  onClick={() => setIsComboModalOpen(true)}
                  className={`flex cursor-pointer items-center justify-center border border-solid border-[#007bff]  hover:bg-[#2563EB] font-medium text-sm h-10 px-4 text-white transition ${String(template) === "3" ? "rounded-md bg-[#155DFC] gap-2" : "rounded-3xl uppercase bg-[#007bff]"}`}
                >
                Enroll Now {String(template) === "3" ? (
                  <RiArrowRightLine className="text-base inline-block" />
                ) : null}
                </button>
              </div>
              </div>
            )}

            
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
