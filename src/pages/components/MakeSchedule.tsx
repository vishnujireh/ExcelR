"use client";

import { useState, useEffect, useRef } from "react";
import {
  RiUserFill,
  RiMailOpenFill,
  RiPhoneFill,
  RiCalendarFill,
  RiMapPin2Fill,
} from "react-icons/ri";
import { useSearchParams } from "next/navigation";
import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";

import {
  fetchCountries,
  fetchStates,
  fetchLocations,
  resetStatesAndLocations,
  resetLocations,
} from "@/redux/slices/locationSlice";

import {
  submitLetUsKnow,
  resetLetUsKnowState,
} from "@/redux/slices/letUsKnowSlice";

/* ---------------- TYPES ---------------- */
type Props = {
  closeModal: () => void;
  courseName: string;
  courseUrl: string;
};
const formatDateToDDMMYYYY = (dateStr: string) => {
  // Already DD/MM/YYYY → return as-is
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
    return dateStr;
  }

  // ISO or Date string → convert
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";

  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();

  return `${dd}-${mm}-${yyyy}`;
};

export default function MakeSchedule({
  closeModal,
  courseName,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();

  
  /* ---------------- FORM STATE ---------------- */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    preferredDate: "",
    enquiry: "",
    countryCode:"",
    country: "",
    state: "",
    location: "",
  });
console.log("Sending preferred_date:", formData.preferredDate);

  /* ---------------- LOCATION SLICE ---------------- */
  const {
    countries,
    states,
    locations,
    loadingCountries,
    loadingStates,
    loadingLocations,
  } = useSelector((state: RootState) => state.location);

  /* ---------------- LET US KNOW SLICE ---------------- */
  const { loading: submitting, error } = useSelector(
    (state: RootState) => state.letUsKnow
  );

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  /* ---------------- PHONE INPUT ---------------- */
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const itiRef = useRef<any>(null);

  useEffect(() => {
    if (!phoneInputRef.current) return;

    itiRef.current = intlTelInput(phoneInputRef.current, {
      initialCountry: "in",
      separateDialCode: true,
    });

    const handlePhoneChange = () => {
  const iti = itiRef.current;
  if (!iti || !phoneInputRef.current) return;

  const countryData = iti.getSelectedCountryData();
  const dialCode = countryData?.dialCode || "";
  const rawNumber = phoneInputRef.current.value || "";

  setFormData((prev) => ({
    ...prev,
    mobile: rawNumber.replace(/\D/g, ""), // ONLY number
    countryCode: dialCode,
  }));
};



    phoneInputRef.current.addEventListener("input", handlePhoneChange);
    phoneInputRef.current.addEventListener(
      "countrychange",
      handlePhoneChange
    );

    return () => {
      phoneInputRef.current?.removeEventListener(
        "input",
        handlePhoneChange
      );
      phoneInputRef.current?.removeEventListener(
        "countrychange",
        handlePhoneChange
      );
      itiRef.current?.destroy();
    };
  }, []);

  /* ---------------- CHANGE HANDLER ---------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "country") {
      dispatch(resetStatesAndLocations());
      if (value) dispatch(fetchStates({ country_id: value }));
    }

    if (name === "state") {
      dispatch(resetLocations());
      if (value) dispatch(fetchLocations({ state_id: value }));
    }
  };

  /* ---------------- SUBMIT (SAME AS QUICKENQUIRY) ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
const pathname =
  typeof window !== "undefined"
    ? window.location.pathname.replace(/^\/+/, "")
    : "";

    const payload = {
      user_name: formData.name,
      user_email: formData.email,
      user_mobile: formData.mobile,
      user_course: courseName,
      preferred_date: formatDateToDDMMYYYY(formData.preferredDate),

      form_source: "Let us know schedule",
      country_code: formData.countryCode,
      user_country: formData.country,
      user_state: formData.state,
      user_location: formData.location,

      user_course_url: pathname,
      landing_page_url: window.location.href,

      looking_for: formData.enquiry,

      source: searchParams?.get("utm_source") || "",
      medium: searchParams?.get("utm_medium") || "",
      campaign: searchParams?.get("utm_campaign") || "",
      term: searchParams?.get("utm_term") || "",
      ucontent: searchParams?.get("utm_content") || "",
      adgroup: searchParams?.get("utm_adgroup") || "",
      gclid: searchParams?.get("gclid") || "",

      utm_channel: searchParams?.get("utm_channel") || "",
      utm_type: searchParams?.get("utm_type") || "",
      utm_variety: searchParams?.get("utm_variety") || "",
      utm_experiment: searchParams?.get("utm_experiment") || "",

      device: "web",
    };

    try {
      await dispatch(submitLetUsKnow(payload)).unwrap();

      // ✅ Reset form
      setFormData({
        name: "",
        email: "",
        mobile: "",
        preferredDate: "",
        enquiry: "",
        country: "",
        state: "",
        location: "",
        countryCode: "",
      }); 

      // ✅ Redirect (same as QuickEnquiry)
      window.location.href = "https://www.excelr.com/thank-you";

      // ✅ Reset redux state
      dispatch(resetLetUsKnowState());
    } catch (err) {
      console.error("Let Us Know submission failed", err);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-[#171717] rounded-lg p-6 w-full max-w-sm relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute -top-4 -right-4 w-10 h-10 bg-white text-black rounded-full text-2xl"
        >
          ×
        </button>

        <p className="text-white text-lg font-semibold text-center mb-4">
          Let us know your convenient schedule
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            icon={<RiUserFill />}
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name *"
          />

          <Input
            icon={<RiMailOpenFill />}
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email *"
            type="email"
          />

          {/* PHONE */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900 z-50">
              <RiPhoneFill />
            </span>
            <input
              ref={phoneInputRef}
              name="mobile"
              placeholder="Mobile No. *"
              type="tel"
              required
              className="border bg-white text-sm rounded-lg block w-full ps-10 p-2.5 moblig"
            />
          </div>

          <Input
            icon={<RiCalendarFill />}
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleChange}
            placeholder="Preferred Date (DD/MM/YYYY) *"
          />

          <Select
            icon={<RiMapPin2Fill />}
            name="country"
            value={formData.country}
            onChange={handleChange}
            options={countries}
            loading={loadingCountries}
            placeholder="Country"
          />

          <Select
            icon={<RiMapPin2Fill />}
            name="state"
            value={formData.state}
            onChange={handleChange}
            options={states}
            loading={loadingStates}
            disabled={!formData.country}
            placeholder="State"
          />

          <Select
            icon={<RiMapPin2Fill />}
            name="location"
            value={formData.location}
            onChange={handleChange}
            options={locations}
            loading={loadingLocations}
            disabled={!formData.state}
            placeholder="Location"
          />

          <Select
            icon={<RiUserFill />}
            name="enquiry"
            value={formData.enquiry}
            onChange={handleChange}
            required
            options={[
              { ID: "Myself", name: "Myself" },
              { ID: "Others", name: "Others" },
            ]}
            placeholder="Looking for?"
          />

          {error && (
            <p className="text-red-500 text-xs text-center">{error}</p>
          )}

          <div className="text-center">
            <button
              type="submit"
              disabled={submitting}
              className="bg-[#0071BC] hover:bg-[#4ba7de] disabled:bg-gray-400 text-white px-6 py-2 rounded-lg"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------------- INPUT ---------------- */
function Input({ icon, ...props }: any) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700">
        {icon}
      </span>
      <input
        {...props}
        required
        className="border bg-white text-sm rounded-lg block w-full ps-10 p-2.5"
      />
    </div>
  );
}

/* ---------------- SELECT ---------------- */
function Select({ icon, options = [], loading, placeholder, ...props }: any) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700">
        {icon}
      </span>
      <select
        {...props}
        className="border bg-white text-sm rounded-lg block w-full ps-10 p-2.5"
      >
        <option value="">{placeholder}</option>
        {loading && <option>Loading...</option>}
        {options.map((opt: any) => (
          <option key={opt.ID} value={opt.ID}>
            {opt.name}
          </option>
        ))}
      </select>
    </div>
  );
}
