"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { submitDropQuery } from "@/redux/slices/dropQuerySlice";

interface FormState {
  name: string;
  email: string;
  mobile: string;
  course: string;
  location: string;
  countryCode: string;
  formname?: string;
}

export default function BlogQueryForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.dropQuery);

  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    mobile: "",
    course: "",
    location: "",
    
    countryCode: "91",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const itiRef = useRef<any>(null);

  const validateForm = () => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!formData.name.trim()) nextErrors.name = "Name is required.";
    if (!formData.email.trim()) nextErrors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) nextErrors.email = "Enter a valid email.";
    if (!formData.mobile.trim()) nextErrors.mobile = "Mobile number is required.";
    else if (!/^\d{7,12}$/.test(formData.mobile.trim())) nextErrors.mobile = "Enter a valid mobile number.";
    if (!formData.course.trim()) nextErrors.course = "Course is required.";
    if (!formData.location.trim()) nextErrors.location = "Location is required.";
    return nextErrors;
  };

  const syncPhone = () => {
    const input = phoneInputRef.current;
    const iti = itiRef.current;
    if (!input || !iti) return;

    const digits = input.value.replace(/\D/g, "");
    const countryData = iti.getSelectedCountryData?.();
    const dialCode = countryData?.dialCode || "91";
    const normalized = dialCode === "91" ? digits.slice(0, 10) : digits.slice(0, 12);

    if (input.value !== normalized) input.value = normalized;
    setFormData((prev) => ({ ...prev, mobile: normalized, countryCode: dialCode }));
  };

  // ✅ REPLACE the intlTelInput useEffect
useEffect(() => {
  const phoneInput = phoneInputRef.current;
  if (!phoneInput) return;
  let destroyed = false;

  const initIti = async () => {
    const { default: intlTelInput } = await import("intl-tel-input/intlTelInputWithUtils");
    if (destroyed || !phoneInputRef.current) return;

    itiRef.current = intlTelInput(phoneInput, {
      initialCountry: "in",
      separateDialCode: true,
      loadUtils: () => import("intl-tel-input/utils"),
    });

    const handlePhoneChange = () => syncPhone();
    phoneInput.addEventListener("input", handlePhoneChange);
    phoneInput.addEventListener("countrychange", handlePhoneChange);
    (itiRef as any)._cleanup = () => {
      phoneInput.removeEventListener("input", handlePhoneChange);
      phoneInput.removeEventListener("countrychange", handlePhoneChange);
      itiRef.current?.destroy();
    };
  };

  initIti();
  return () => { destroyed = true; (itiRef as any)._cleanup?.(); };
}, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setSubmitMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    const payload = {
      user_name: formData.name.trim(),
      user_email: formData.email.trim(),
      user_mobile: formData.mobile.trim(),
      course: formData.course.trim(),
      user_country: "",
      user_state: "",
      user_location: formData.location.trim(),
      user_message: "",
      course_url: typeof window !== "undefined" ? window.location.pathname : "",
      landing_page_url: typeof window !== "undefined" ? window.location.href : "",
      form_source: "Blog Query",
      looking_for: "",
      source: "",
      medium: "",
      campaign: "",
      term: "",
      ucontent: "",
      device: "web",
      adgroup: "",
      gclid: "",
      utm_channel: "",
      utm_type: "",
      utm_variety: "",
      utm_experiment: "",
      form_name: "Drop a Query (Blog Page)",
      country_code: formData.countryCode ? `+${formData.countryCode}` : "",
      template: "0",
    };

    try {
      const result = await dispatch(submitDropQuery(payload)).unwrap();
      if (result?.status) {
        setSubmitMessage("Query submitted successfully.");
        setFormData({ name: "", email: "", mobile: "", course: "", location: "", countryCode: formData.countryCode });
        setErrors({});
      } else {
        setSubmitMessage(result?.message || "Submission failed.");
      }
    } catch (submitError: any) {
      setSubmitMessage(submitError?.message || "Unable to submit the query.");
    }
  };

  return (
    <div className="drop-query-form shadow-lg rounded-lg p-5 mt-10">
      <div className="form-reply ui-form">
        <h2 className="text-2xl font-bold mb-5 text-center text-[#FFAA33]">Drop a Query</h2>
        <form className="space-y-4 cormobiln" onSubmit={handleSubmit} noValidate>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`border text-sm block w-full p-2.5 rounded-lg ${errors.name ? "border-red-500 bg-[#ffe3e0]" : "border-gray-200 bg-[#F4F7FF]"}`}
                placeholder="Name *"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            <div>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`border text-sm block w-full p-2.5 rounded-lg ${errors.email ? "border-red-500 bg-[#ffe3e0]" : "border-gray-200 bg-[#F4F7FF]"}`}
                placeholder="Email *"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
            <div>
              <input
                ref={phoneInputRef}
                name="mobile"
                type="tel"
                value={formData.mobile}
                onChange={handleChange}
                className={`border text-sm block w-full p-2.5 rounded-lg moblig ${errors.mobile ? "border-red-500 bg-[#ffe3e0]" : "border-gray-200 bg-[#F4F7FF]"}`}
                placeholder="Mobile No *"
              />
              {errors.mobile && <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>}
            </div>
            <div>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`border text-sm block w-full p-2.5 rounded-lg ${errors.location ? "border-red-500 bg-[#ffe3e0]" : "border-gray-200 bg-[#F4F7FF]"}`}
                placeholder="Location *"
              />
              {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-1 gap-4 mt-4">
            <div>
              <input
                name="course"
                value={formData.course}
                onChange={handleChange}
                className={`border text-sm block w-full p-2.5 rounded-lg ${errors.course ? "border-red-500 bg-[#ffe3e0]" : "border-gray-200 bg-[#F4F7FF]"}`}
                placeholder="Course *"
              />
              {errors.course && <p className="mt-1 text-sm text-red-600">{errors.course}</p>}
            </div>
          </div>

          <div className="text-center mt-5">
            <button
              type="submit"
              disabled={loading}
              className="submit-button inline-flex items-center justify-center gap-3 border border-[#0071BC] bg-[#0071BC] text-white hover:bg-[#4ba7de] font-medium text-sm py-2.5 px-4 rounded-lg disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>

          {(submitMessage || error) && (
            <p className={`mt-4 text-sm ${error ? "text-red-600" : "text-green-600"}`}>
              {error || submitMessage}
            </p>
          )}
        </form>
        </div>
    </div>
    );
    }