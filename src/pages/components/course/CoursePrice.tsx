"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ClassSchedule from "../ClassSchedule";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpcomingBatch } from "@/redux/slices/upcomingBatchSlice";
import { AppDispatch, RootState } from "@/redux/store";
import type { TrainingMode } from "@/redux/slices/upcomingBatchSlice";
import QuickEnquiry from "../QuickEnquiry"
import ComboOffer from "../ComboOffer";
import parse from "html-react-parser";

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

const formatPrice = (amount: number | string) => {
  if (!amount) return "";
  return Number(amount).toLocaleString("en-IN"); // Adds commas for Indian numbering style
};

export default function CoursePrice() {
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
  const params = useParams();
  const courseSlug = Array.isArray(params?.slug)
    ? params.slug[0]
    : params?.slug || "";

  const { batchData, loading, error } = useSelector(
    (state: RootState) => state.upcomingBatch
  );

  // Fetch IP
  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setIpAddress(data.ip))
      .catch(() => setIpAddress("0.0.0.0"));
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
    if (!courseSlug || !city || !ipAddress) return;

    dispatch(
      fetchUpcomingBatch({
        courseSlug,
        city,
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

                  <p className="text-sm font-semibold pb-2.5">
                    Without IITM Pravartak Certification
                  </p>

                  <div className="flex justify-around mb-6 relative">
                    <h6 className="dis-amt font-bold text-xl">
                     <span className='disam'></span> {mode.price_info.currency} {formatPrice(mode.price_info.amount)}
                    </h6>

                    {mode.price_info.discount_amount && (
                      <h6 className="font-bold text-xl text-[#ea9b0a]">
                        {mode.price_info.currency}{" "}
                        {formatPrice(mode.price_info.discount_amount)}
                      </h6>
                    )}
                  </div>

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

                    {mode.upcoming_dates_preview?.[0]?.enroll_url && (
                      <Link
                        href={mode.upcoming_dates_preview[0].enroll_url}
                        target="_blank"
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
          />
        )}

        {isComboModalOpen && (
        <ComboOffer
          closeModal={() => setIsComboModalOpen(false)}
          data={comboOfferData}
        />
      )}

        {isQuickModalOpen && (
  <QuickEnquiry
    closeModal={() => setIsQuickModalOpen(false)}
    formName={formName}   // ✅ dynamic form name
    variant={variant}     // ✅ UI variant
  />
)}
      </div>
    </>
  );
}
