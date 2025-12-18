"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import quickenquiry_icon from "/public/quickenquiry_icon.png";
import {
  RiUserFill,
  RiMailOpenFill,
  RiPhoneFill,
  RiMapPin2Fill,
  RiArtboardFill,
} from "react-icons/ri";
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
  submitDropQuery,
  resetDropQueryState,
} from "@/redux/slices/dropQuerySlice";
import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";

interface QuickEnquiryProps {
  closeModal: () => void;
  course?: string;
  city?: string;
  state?: string;
  country?: string;
  formName: string;
  variant?: "default" | "callback";
}



export default function QuickEnquiry({
  closeModal,
  course = "",
  variant = "default",
  formName,
}: QuickEnquiryProps) {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    enquiry: "",
    course: course || "",
    country: "",
    state: "",
    location: "",
    countryCode:"",
    agree: false,
  });

  const dispatch = useDispatch<AppDispatch>();

  const {
    countries,
    states,
    locations,
    loadingCountries,
    loadingStates,
    loadingLocations,
  } = useSelector((state: RootState) => state.location);

  const { loading: submitting, error } = useSelector(
    (state: RootState) => state.dropQuery
  );

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));

    // ---- Cascade logic ----
    if (name === "country") {
      dispatch(resetStatesAndLocations());
      if (value) {
        dispatch(fetchStates({ country_id: value }));
      }
    }

    if (name === "state") {
      dispatch(resetLocations());
      if (value) {
        dispatch(fetchLocations({ state_id: value }));
      }
    }
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agree) {
      alert("Please accept Terms & Conditions");
      return;
    }
const pathname =
  typeof window !== "undefined"
    ? window.location.pathname.replace(/^\/+/, "")
    : "";
    const payload = {
      user_name: formData.name,
      user_email: formData.email,
      user_mobile: formData.mobile,
      course: formData.course,
      user_country: formData.country,
      user_state: formData.state,
      user_location: formData.location,
      user_message: "",
      looking_for: formData.enquiry,

      course_url: pathname,
      landing_page_url: window.location.href,

      form_source: "Quick Enquiry",
      form_name: formName,
      template: "0",
      device: "web",
      country_code: formData.countryCode,

      source: searchParams?.get("utm_source") || "",
      medium: searchParams?.get("utm_medium") || "",
      campaign: searchParams?.get("utm_campaign") || "",
      term: searchParams?.get("utm_term") || "",
      ucontent: searchParams?.get("utm_content") || "",
      gclid: searchParams?.get("gclid") || "",

      adgroup: "",
      utm_channel: "",
      utm_type: "",
      utm_variety: "",
      utm_experiment: "",
    };

    try {
      await dispatch(submitDropQuery(payload)).unwrap();

      // Reset form
      setFormData({
        name: "",
        email: "",
        mobile: "",
        enquiry: "",
        course: "",
        country: "",
        state: "",
        location: "",
        countryCode:"",
        agree: false,
      });

      // Redirect to Thank You page
     // window.location.href = "https://www.excelr.com/thank-you";

      // Reset Redux state
      dispatch(resetDropQueryState());
    } catch (err) {
      console.error("Drop query failed", err);
    }
  };

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
  phoneInputRef.current.addEventListener("countrychange", handlePhoneChange);

  return () => {
    phoneInputRef.current?.removeEventListener("input", handlePhoneChange);
    phoneInputRef.current?.removeEventListener("countrychange", handlePhoneChange);
    itiRef.current?.destroy();
  };
}, []);


  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-[#000000cc]"
      onClick={closeModal}
    >
      <div
        className={`relative bg-white rounded-lg shadow-lg overflow-hidden ${
          variant === "default" ? "w-full max-w-md" : "w-[900px] grid grid-cols-2 recalbg"
        }`}
        
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute right-4 top-3 text-2xl text-gray-600 z-10 cursor-pointer"
        >
          ×
        </button>

        {/* LEFT SECTION */}
        <div
          className={`p-6 ${variant === "default" ? "pb-32 quickenbg" : " p-10"}`}
          style={
            variant === "default"
              ? {
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : undefined
          }
        >
          {variant === "default" && (
            <Image
              src={quickenquiry_icon}
              width={120}
              alt="Quick Enquiry"
              className="mx-auto mb-5"
            />
          )}

          {variant === "callback" && (
            <>
              <h2 className="text-2xl font-semibold mb-2">Request a Call back</h2>
              <p className="text-red-500 text-sm mb-6">
                Please leave your details here, we would love to call you
              </p>
            </>
          )}

          {variant === "callback" ? (
  <div className="bg-gray-200 rounded-xl  px-0 py-8 mx-auto">
    <ReusableForm
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      countries={countries}
      states={states}
      locations={locations}
      loadingCountries={loadingCountries}
      loadingStates={loadingStates}
      loadingLocations={loadingLocations}
      submitting={submitting}
      error={error}
      phoneInputRef={phoneInputRef}
    />
  </div>
) : (
  <ReusableForm
    formData={formData}
    handleChange={handleChange}
    handleSubmit={handleSubmit}
    countries={countries}
    states={states}
    locations={locations}
    loadingCountries={loadingCountries}
    loadingStates={loadingStates}
    loadingLocations={loadingLocations}
    submitting={submitting}
    error={error}
    phoneInputRef={phoneInputRef}
  />
)}

        </div>

        {/* RIGHT IMAGE (ONLY CALLBACK VARIANT) */}
        {variant === "callback" && <div className="relative"></div>}
      </div>
    </div>
  );
}

/* ================= REUSABLE FORM ================= */

function ReusableForm({
  formData,
  handleChange,
  handleSubmit,
  countries,
  states,
  locations,
  loadingCountries,
  loadingStates,
  loadingLocations,
  submitting,
  error,
  phoneInputRef,
}: any) {
  return (
    <form onSubmit={handleSubmit} className="space-y-2 px-8 text-gray-600" >
      <Input icon={<RiUserFill />} name="name" value={formData.name} onChange={handleChange} placeholder="Name *" />
      <Input icon={<RiMailOpenFill />} name="email" value={formData.email} onChange={handleChange} placeholder="Email *" type="email" />

      {/* PHONE INPUT (intl-tel-input) */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900"><RiPhoneFill /></span>
        <input
          ref={phoneInputRef}
          name="mobile"  
          placeholder="Mobile No. *"
          type="tel"
          required
          className="border border-[#868686] text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5 moblig"
        />
      </div>

      <Input icon={<RiArtboardFill />} name="course" value={formData.course} onChange={handleChange} placeholder="Course" type="text" />

      {/* COUNTRY */}
      <Select
        icon={<RiMapPin2Fill />}
        name="country"
        value={formData.country}
        onChange={handleChange}
        required
        options={countries}
        loading={loadingCountries}
        placeholder="Country"
      />

      {/* STATE */}
      <Select
        icon={<RiMapPin2Fill />}
        name="state"
        value={formData.state}
        onChange={handleChange}
        required
        disabled={!formData.country}
        options={states}
        loading={loadingStates}
        placeholder="State"
      />

      {/* LOCATION */}
      <Select
        icon={<RiMapPin2Fill />}
        name="location"
        value={formData.location}
        onChange={handleChange}
        required
        disabled={!formData.state}
        options={locations}
        loading={loadingLocations}
        placeholder="Location"
      />

      {/* ENQUIRY */}
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

      <div className="flex items-start gap-2 text-xs text-gray-700">
        <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} required className="mt-1" />
        <span>
          I hereby agree to the{" "}
          <a href="/terms" className="text-blue-600 underline">Terms and Conditions</a>{" "}
          and{" "}
          <a href="/privacy-policy" className="text-blue-600 underline">Privacy Policy</a>{" "}
          of Excelr Solutions.
        </span>
      </div>

      <div className="text-center">
        {error && <p className="text-red-600 text-xs text-center">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className={`rounded-lg border px-5 py-2.5 text-sm font-medium text-white ${
            submitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#0071BC] hover:bg-[#4ba7de]"
          }`}
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
}

/* ================= INPUT COMPONENT ================= */
function Input({ icon, ...props }: any) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900">{icon}</span>
      <input
        {...props}
        required
        className="border border-[#868686] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
      />
    </div>
  );
}

/* ================= SELECT COMPONENT ================= */
function Select({ icon, options = [], loading = false, placeholder, ...props }: any) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900">{icon}</span>
      <select
        {...props}
        className="border border-[#868686] text-gray-900 text-sm rounded-lg block w-full ps-9 p-2.5"
      >
        <option value="">{placeholder}</option>
        {loading && <option>Loading...</option>}
        {options.map((opt: any) => (
          <option key={opt.ID} value={opt.ID}>{opt.name}</option>
        ))}
      </select>
    </div>
  );
}
