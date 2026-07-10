"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import {
  submitDropQuery,
  resetDropQueryState,
  type DropQueryPayload,
} from "@/redux/slices/dropQuerySlice";
import { useSearchParams } from "next/navigation";

interface WebinarRegistrationFormProps {
  /** Passed from the course page so we can pre-fill `course` in the payload */
  courseName?: string;
}

export default function WebinarRegistrationForm({
  courseName = "",
}: WebinarRegistrationFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();

  const { loading: submitting, error } = useSelector(
    (state: RootState) => state.dropQuery
  );

  /* ─── Form state ─────────────────────────────────────────── */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    countryCode: "",
    lookingFor: "",
    agree: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  /* ─── Phone / intl-tel-input ─────────────────────────────── */
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const itiRef = useRef<any>(null);

  const syncPhoneField = () => {
    const iti = itiRef.current;
    const input = phoneInputRef.current;

    if (!iti || !input) return { normalized: "", isValid: true };

    const rawNumber = input.value || "";
    const normalized = rawNumber.replace(/\D/g, "");

    if (input.value !== normalized) input.value = normalized;

    const countryData = iti.getSelectedCountryData();
    const isIndia = countryData?.iso2 === "in";

    if (normalized.length === 0) {
      input.setCustomValidity("");
      return { normalized, isValid: false };
    }

    let isValid = false;
    if (isIndia) {
      isValid = normalized.length === 10;
      input.setCustomValidity(
        isValid ? "" : "Please enter a 10-digit mobile number."
      );
    } else {
      isValid = iti.isValidNumber();
      input.setCustomValidity(
        isValid ? "" : "Please enter a valid mobile number."
      );
    }

    return { normalized, isValid };
  };

  useEffect(() => {
    const phoneInput = phoneInputRef.current;
    if (!phoneInput) return;

    let destroyed = false;

    const initIti = async () => {
      const { default: intlTelInput } = await import(
        "intl-tel-input/intlTelInputWithUtils"
      );

      if (destroyed || !phoneInputRef.current) return;

      itiRef.current = intlTelInput(phoneInput, {
        initialCountry: "in",
        separateDialCode: true,
        loadUtils: () => import("intl-tel-input/utils"),
      });

      const handlePhoneChange = () => {
        const iti = itiRef.current;
        if (!iti || !phoneInput) return;
        const dialCode = iti.getSelectedCountryData()?.dialCode || "";
        const { normalized } = syncPhoneField();
        setFormData((prev) => ({
          ...prev,
          mobile: normalized,
          countryCode: dialCode,
        }));
      };

      phoneInput.addEventListener("input", handlePhoneChange);
      phoneInput.addEventListener("countrychange", handlePhoneChange);

      (itiRef as any)._cleanup = () => {
        phoneInput.removeEventListener("input", handlePhoneChange);
        phoneInput.removeEventListener("countrychange", handlePhoneChange);
        itiRef.current?.destroy();
      };
    };

    initIti();

    return () => {
      destroyed = true;
      (itiRef as any)._cleanup?.();
    };
  }, []);

  /* ─── Handlers ───────────────────────────────────────────── */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const nextValue =
      type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : value;

    setFormData((prev) => ({ ...prev, [name]: nextValue }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};

    if (!formData.name.trim()) nextErrors.name = "Name is required.";

    const emailOk = /^\S+@\S+\.\S+$/.test(formData.email.trim());
    if (!formData.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!emailOk) {
      nextErrors.email = "Enter a valid email.";
    }

    const phoneCheck = syncPhoneField();
    const countryData = itiRef.current?.getSelectedCountryData?.();
    const isIndia = countryData?.iso2 === "in";
    if (!formData.mobile || !phoneCheck.isValid) {
      nextErrors.mobile = isIndia
        ? "Please enter a 10-digit mobile number."
        : "Please enter a valid mobile number.";
    }

    if (!formData.lookingFor)
      nextErrors.lookingFor = "Please select an option.";

    if (!formData.agree)
      nextErrors.agree = "Please accept Terms & Conditions.";

    return nextErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      if (validationErrors.mobile) phoneInputRef.current?.focus();
      return;
    }

    const pathname =
      typeof window !== "undefined"
        ? window.location.pathname.replace(/^\/+/, "")
        : "";

    const payload: DropQueryPayload = {
      user_name: formData.name,
      user_email: formData.email,
      user_mobile: formData.mobile,
      country_code: formData.countryCode,
      course: courseName,
      user_country: "",
      user_state: "",
      user_location: "",
      user_message: "",
      looking_for: formData.lookingFor,
      course_url: pathname,
      landing_page_url:
        typeof window !== "undefined" ? window.location.href : "",
      form_source: "Webinar Registration",
      form_name: "Register for the webinar",
      template: "0",
      device: "web",
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
      const result = await dispatch(submitDropQuery(payload)).unwrap();

      if (result?.status) {
        setSubmitSuccess(true);
        dispatch(resetDropQueryState());
        window.location.href = "https://www.excelr.com/thank-you";
      } else {
        setSubmitError(
          result?.message || "Submission failed. Please try again."
        );
      }
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    }
  };

  /* ─── Render ─────────────────────────────────────────────── */
  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-2 p-4 text-gray-600 cormobiln">

      {/* Name */}
      <div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name *"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white"
        />
        {errors.name && (
          <p className="text-red-600 text-xs mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email *"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white"
        />
        {errors.email && (
          <p className="text-red-600 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      {/* Mobile with intl-tel-input country code */}
      <div>
        <input
          ref={phoneInputRef}
          name="mobile"
          placeholder="Mobile Number *"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white moblig"
        />
        {errors.mobile && (
          <p className="text-red-600 text-xs mt-1">{errors.mobile}</p>
        )}
      </div>

      {/* Looking for */}
      <div>
        <select
          name="lookingFor"
          value={formData.lookingFor}
          onChange={handleChange}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white"
        >
          <option value="">Looking for?</option>
          <option value="Myself">Myself</option>
          <option value="Others">Others</option>
        </select>
        {errors.lookingFor && (
          <p className="text-red-600 text-xs mt-1">{errors.lookingFor}</p>
        )}
      </div>

      {/* Terms checkbox */}
      <div className="flex items-start gap-2 text-xs text-gray-700">
        <input
          type="checkbox"
          name="agree"
          checked={formData.agree}
          onChange={handleChange}
          className="mt-1"
        />
        <span>
          I hereby agree to the{" "}
          <Link
            href="/terms-and-conditions"
            target="_blank"
            className="text-blue-600 underline"
          >
            Terms and Conditions
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy-policy"
            target="_blank"
            className="text-blue-600 underline"
          >
            Privacy Policy
          </Link>{" "}
          of ExcelR Solutions.
        </span>
      </div>
      {errors.agree && (
        <p className="text-red-600 text-xs mt-1">{errors.agree}</p>
      )}

      {/* API / network error */}
      {(error || submitError) && (
        <p className="text-red-600 text-xs text-center">
          {submitError || error}
        </p>
      )}

      <div className="text-center">
        <button
          type="submit"
          disabled={submitting || submitSuccess}
          className={`rounded-lg border px-5 py-2.5 text-sm font-medium text-white cursor-pointer transition ${
            submitting || submitSuccess
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#0071BC] hover:bg-[#4ba7de]"
          }`}
        >
          {submitting ? "Submitting..." : "Register"}
        </button>
      </div>
    </form>
  );
}
