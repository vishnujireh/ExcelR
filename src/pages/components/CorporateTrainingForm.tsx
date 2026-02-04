"use client";
import React, { useEffect, useState, FormEvent, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitCorporateTraining, resetCorporateTrainingState } from "@/redux/slices/corporateTrainingSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";

const INITIAL_FORM_STATE = {
  name: "",
  company_name: "",
  company_email: "",
  mobile_no: "",
  country_code: "+91",
  location: "",
  country: "",
  course: "",
  hear_about_us: "",
  description: "",
};

export default function CorporateTrainingForm() {
  const dispatch = useDispatch<AppDispatch>();

  const { loading, success, message, error } = useSelector(
    (state: RootState) => state.corporateTraining
  );

  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const itiRef = useRef<any>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(submitCorporateTraining(formData));
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
      dispatch(resetCorporateTrainingState());
    };
  }, [dispatch]);

  return(
    <>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 z-10 relative items-center">
        <div className="col-span-1 md:col-span-3 lg:col-span-4 lg:col-start-2">
          <div className="bg-white p-5 border-4 border-gray-200 rounded-md">
            <form className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 cormobiln" onSubmit={handleSubmit}>
              {/* Name */}
              <input
                type="text"
                name="name"
                placeholder="Name *"
                value={formData.name}
                onChange={handleChange}
                className="border-b border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                required
              />

          {/* Company Name */}
              <input
                type="text"
                name="company_name"
                placeholder="Company Name  (Optional)"
                value={formData.company_name}
                onChange={handleChange}
                className="border-b border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              />

          {/* Email */}
              <input
                type="email"
                name="company_email"
                placeholder="Email *"
                value={formData.company_email}
                onChange={handleChange}
                className="border-b border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                required
              />

              {/* Mobile (intl-tel-input) */}
              <input
                ref={phoneInputRef}
                name="mobile_no"
                placeholder="Mobile No *"
                type="tel"
                required
                className="border-b border-gray-200 text-gray-900 text-sm  block w-full ps-3 p-3 moblig"
              />

          {/* Location */}
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                className="border-b border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              />

          {/* Country */}
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                className="border-b border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              />

          {/* Course */}
              <div className="md:col-span-2">
                <input
                  type="text"
                  name="course"
                  placeholder="Course"
                  value={formData.course}
                  onChange={handleChange}
                  className="border-b border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                />
              </div>

          {/* Enquiry */}
              <div className="md:col-span-2">
                <select
                  name="hear_about_us"
                  value={formData.hear_about_us}
                  onChange={handleChange}
                  className="border-b border-gray-200 bg-white text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  required
                >
                  <option value="">How did you hear about us</option>
                  <option value="Search Engine">Search Engine</option>
                  <option value="Email">Email</option>
                  <option value="LinkedIn post">LinkedIn post</option>
                  <option value="Word of mouth">Word of mouth</option>
                  <option value="Others">Others</option>
                </select>
              </div>

          {/* Query */}
              <div className="md:col-span-2">
                <textarea
                  name="description"
                  placeholder="Query *"
                  value={formData.description}
                  onChange={handleChange}
                  className="border-b border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  required
                />
              </div>

          {/* Terms & Submit */}
              <div className="md:col-span-2">
                <div className="flex items-start space-x-2 text-sm">
                  <input
                    type="checkbox"
                    id="terms"
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    required
                  />
                  <label htmlFor="terms" className="text-gray-500">
                    I hereby agree to the{" "}
                    <a href="/terms" className="text-blue-600 underline" target="_blank">
                      Terms and Conditions
                    </a>{" "}
                    and{" "}
                    <a href="/privacy-policy" className="text-blue-600 underline" target="_blank">
                      Privacy Policy
                    </a>{" "}
                    of Excelr Solutions.
                  </label>
                </div>

                <div className="text-center mt-5">
                  <button
                    type="submit"
                    disabled={loading}
                    className="border border-[#0071BC] bg-[#0071BC] hover:bg-[#4ba7de] text-white font-medium text-sm py-2.5 px-5 rounded-lg cursor-pointer disabled:opacity-50"
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </div>

                {success && message && (
                  <p className="text-green-600 mt-3 text-sm">{message}</p>
                )}

                {error && (
                  <p className="text-red-600 mt-3 text-sm">{error}</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
