"use client";
import React, { useEffect, useState, FormEvent, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitCareerForm, resetCareerFormState } from "@/redux/slices/careerFormSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";

interface CareerApplyFormProps {
  title?: string;
  location?: string;
  category?: string;
  industry?: string;
}

const INITIAL_FORM_STATE = {
  first_name: "",
  contact_no: "",
  email_id: "",
  title: "",
  location: "",
  category: "",
  industry: "",
  referral_code: "",
  cover_letter: "",
  resume_file: null as File | null,
};

export default function CareerApplyForm({
  title,
  location,
  category,
  industry,
}: CareerApplyFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, success, message, error } = useSelector(
    (state: RootState) => state.careerForm
  );

  const [formData, setFormData] = useState({
    ...INITIAL_FORM_STATE,
    title: title || "",
    location: location || "",
    category: category || "",
    industry: industry || "",
  });
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const itiRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      title: title || "",
      location: location || "",
      category: category || "",
      industry: industry || "",
    }));
  }, [title, location, category, industry]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      resume_file: file,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(submitCareerForm(formData));
  };

  useEffect(() => {
    if (success) {
      setFormData((prev) => ({
        ...INITIAL_FORM_STATE,
        title: prev.title,
        location: prev.location,
        category: prev.category,
        industry: prev.industry,
      }));
      if (phoneInputRef.current) {
        phoneInputRef.current.value = "";
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
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
      if (!phoneInputRef.current) return;
      const rawNumber = phoneInputRef.current.value || "";

      setFormData((prev) => ({
        ...prev,
        contact_no: rawNumber.replace(/\D/g, ""),
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
      dispatch(resetCareerFormState());
    };
  }, [dispatch]);

  return (
    <>
 <form className="space-y-4 cormobiln" onSubmit={handleSubmit} encType="multipart/form-data">
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="Name *"
                    className="border border-gray-200 text-sm rounded-lg w-full p-3"
                    required
                  />

                  <input
                    type="tel"
                    name="contact_no"
                    ref={phoneInputRef}
                    placeholder="Mobile No. *"
                    className="border border-gray-200 text-sm rounded-lg w-full p-3"
                    required
                  />

                  <input
                    type="email"
                    name="email_id"
                    value={formData.email_id}
                    onChange={handleChange}
                    placeholder="Email *"
                    className="border border-gray-200 text-sm rounded-lg w-full p-3"
                    required
                  />

                  <input
                    type="text"
                    name="referral_code"
                    value={formData.referral_code}
                    onChange={handleChange}
                    placeholder="EMP Name / Code *"
                    className="border border-gray-200 text-sm rounded-lg w-full p-3"
                    required
                  />

                  <small className="text-gray-400 block">
                    *Applicable for ExcelR employees referral only
                  </small>

                  <textarea
                    name="cover_letter"
                    value={formData.cover_letter}
                    onChange={handleChange}
                    placeholder="Cover Letter *"
                    className="border border-gray-200 text-sm rounded-lg w-full p-3"
                    required
                  />

                  <label className="text-sm block">Upload CV *</label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
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
                    disabled={loading}
                    className=" border border-[#0071BC] bg-[#0071BC] text-white hover:bg-[#4ba7de] font-medium text-sm py-2.5 px-5 rounded-lg disabled:opacity-50"
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>

                  {success && message && (
                    <p className="text-green-600 text-sm mt-2">
                      {message}
                    </p>
                  )}

                  {error && (
                    <p className="text-red-600 text-sm mt-2">
                      {error}
                    </p>
                  )}
                </form>
    </>
  );
}
