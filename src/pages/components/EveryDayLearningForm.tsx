"use client";
import React, { useEffect, useState, FormEvent, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitEveryDayLearning, resetEveryDayLearningState } from "@/redux/slices/everyDayLearningSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";

const INITIAL_FORM_STATE = {
  name: "",
  college_name: "",
  company_email: "",
  mobile_no: "",
  country_code: "+91",
  location: "",
  country: "",
  course: "",
};

export default function EveryDayLearningForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, success, message, error } = useSelector(
    (state: RootState) => state.everyDayLearning
  );

  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const itiRef = useRef<any>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(submitEveryDayLearning(formData));
  };

  useEffect(() => {
    if (success) {
      setFormData(INITIAL_FORM_STATE);
      if (phoneInputRef.current) {
        phoneInputRef.current.value = "";
      }
    }
  }, [success]);

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
        mobile_no: rawNumber.replace(/\D/g, ""),
        country_code: dialCode ? `+${dialCode}` : "",
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

  useEffect(() => {
    return () => {
      dispatch(resetEveryDayLearningState());
    };
  }, [dispatch]);

  return (
     <>
     <form className="space-y-4 cormobiln" onSubmit={handleSubmit}>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    
    {/* Name */}
    <input
      type="text"
      name="name"
      placeholder="Name *"
      value={formData.name}
      onChange={handleChange}
      className="rounded-3xl border border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
      required
    />

    {/* College Name */}
    <input
      type="text"
      name="college_name"
      placeholder="College Name"
      value={formData.college_name}
      onChange={handleChange}
      className="rounded-3xl border border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
      required
    />

    {/* Email */}
    <input
      type="email"
      name="company_email"
      placeholder="Email *"
      value={formData.company_email}
      onChange={handleChange}
      className="rounded-3xl border border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
      required
    />

    {/* Mobile (intl-tel-input) */}
    <input
      ref={phoneInputRef}
      type="tel"
      name="mobile_no"
      placeholder="Mobile No. *"
      className="rounded-3xl border border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
      required
    />

    {/* Location */}
    <input
      type="text"
      name="location"
      placeholder="Location"
      value={formData.location}
      onChange={handleChange}
      className="rounded-3xl border border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
      required
    />

    {/* Country */}
    <input
      type="text"
      name="country"
      placeholder="Country"
      value={formData.country}
      onChange={handleChange}
      className="rounded-3xl border border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
      required
    />

    {/* Course — full width */}
    <div className="sm:col-span-2">
      <input
        type="text"
        name="course"
        placeholder="Course"
        value={formData.course}
        onChange={handleChange}
        className="rounded-3xl border border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
        required
      />
    </div>

    {/* Terms & Conditions — full width */}
    <div className="sm:col-span-2">
      <div className="flex items-start space-x-2 text-sm">
        <input
          type="checkbox"
          id="terms"
          className="w-4 h-4 rounded border-gray-300 focus:ring-blue-500"
          required
        />
        <label htmlFor="terms" className="text-gray-500">
          I hereby agree to the{" "}
          <a href="/terms" target="_blank" className="text-blue-600 underline">
            Terms and Conditions
          </a>{" "}
          and{" "}
          <a href="/privacy-policy" target="_blank" className="text-blue-600 underline">
            Privacy Policy
          </a>{" "}
          of Excelr Solutions.
        </label>
      </div>

      <div className="text-center mt-5">
        <button
          type="submit"
          disabled={loading}
          className="border cursor-pointer border-[#0071BC] bg-[#0071BC] hover:bg-[#4ba7de] text-white font-medium text-sm py-2.5 px-5 rounded-lg disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>

      {success && message && (
        <p className="text-green-600 mt-3 text-sm text-center">
          {message}
        </p>
      )}

      {error && (
        <p className="text-red-600 mt-3 text-sm text-center">
          {error}
        </p>
      )}
    </div>

  </div>
</form>
     </>
  );
}
