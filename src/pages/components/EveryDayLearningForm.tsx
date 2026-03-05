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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [agree, setAgree] = useState(false);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const itiRef = useRef<any>(null);

  const syncPhoneField = () => {
    const iti = itiRef.current;
    const input = phoneInputRef.current;
    if (!iti || !input) return { normalized: "", isValid: true };

    const countryData = iti.getSelectedCountryData();
    const isIndia = countryData?.iso2 === "in" || countryData?.dialCode === "91";
    const rawNumber = input.value || "";
    const digitsOnly = rawNumber.replace(/\D/g, "");
    let normalized = digitsOnly;

    if (isIndia) {
      normalized = digitsOnly.slice(0, 10);
      if (input.value !== normalized) {
        input.value = normalized;
      }
      if (normalized.length > 0 && normalized.length !== 10) {
        input.setCustomValidity("Please enter a 10-digit mobile number.");
      } else {
        input.setCustomValidity("");
      }
    } else {
      if (digitsOnly.length > 12) {
        normalized = digitsOnly.slice(0, 12);
        if (input.value !== normalized) {
          input.value = normalized;
        }
      }
      if (normalized.length > 0) {
        const lengthOk = normalized.length === 12;
        const isValid =
          typeof iti.isValidNumber === "function"
            ? iti.isValidNumber() && lengthOk
            : lengthOk;
        input.setCustomValidity(
          isValid ? "" : "Please enter a 12-digit mobile number."
        );
      } else {
        input.setCustomValidity("");
      }
    }

    return { normalized, isValid: input.checkValidity() };
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[e.target.name];
      return next;
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};
    const emailOk = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
      formData.company_email.trim()
    );

    if (!formData.name.trim()) {
      nextErrors.name = "Name is required.";
    }
    if (!formData.college_name.trim()) {
      nextErrors.college_name = "College name is required.";
    }
    if (!formData.company_email.trim()) {
      nextErrors.company_email = "Email is required.";
    } else if (!emailOk) {
      nextErrors.company_email = "Enter a valid email.";
    }

    const phoneCheck = syncPhoneField();
    const countryData = itiRef.current?.getSelectedCountryData?.();
    const isIndia =
      countryData?.iso2 === "in" || countryData?.dialCode === "91" || !countryData;
    if (!formData.mobile_no || !phoneCheck.isValid) {
      nextErrors.mobile_no = isIndia
        ? "Please enter a 10-digit mobile number."
        : "Please enter a 12-digit mobile number.";
    }
    if (!formData.location.trim()) {
      nextErrors.location = "Location is required.";
    }
    if (!formData.country.trim()) {
      nextErrors.country = "Country is required.";
    }
    if (!formData.course.trim()) {
      nextErrors.course = "Course is required.";
    }
    if (!agree) {
      nextErrors.agree = "Please accept Terms and Conditions.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      if (nextErrors.mobile_no) {
        phoneInputRef.current?.focus();
      }
      return;
    }
    dispatch(submitEveryDayLearning(formData));
  };

  useEffect(() => {
    if (success) {
      setFormData(INITIAL_FORM_STATE);
      setErrors({});
      setAgree(false);
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
      loadUtils: () => import("intl-tel-input/utils"),
    });

    const handlePhoneChange = () => {
      const iti = itiRef.current;
      if (!iti || !phoneInputRef.current) return;

      const countryData = iti.getSelectedCountryData();
      const dialCode = countryData?.dialCode || "";
      const { normalized } = syncPhoneField();

      setFormData((prev) => ({
        ...prev,
        mobile_no: normalized,
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
     <form className="space-y-4 cormobiln" onSubmit={handleSubmit} noValidate>
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
    {errors.name && <p className="text-red-600 text-xs">{errors.name}</p>}

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
    {errors.college_name && (
      <p className="text-red-600 text-xs">{errors.college_name}</p>
    )}

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
    {errors.company_email && (
      <p className="text-red-600 text-xs">{errors.company_email}</p>
    )}

    {/* Mobile (intl-tel-input) */}
    <input
      ref={phoneInputRef}
      type="tel"
      name="mobile_no"
      placeholder="Mobile No. *"
      inputMode="numeric"
      autoComplete="tel"
      className="rounded-3xl border border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
      required
    />
    {errors.mobile_no && (
      <p className="text-red-600 text-xs">{errors.mobile_no}</p>
    )}

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
    {errors.location && (
      <p className="text-red-600 text-xs">{errors.location}</p>
    )}

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
    {errors.country && (
      <p className="text-red-600 text-xs">{errors.country}</p>
    )}

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
      {errors.course && (
        <p className="text-red-600 text-xs">{errors.course}</p>
      )}
    </div>

    {/* Terms & Conditions — full width */}
    <div className="sm:col-span-2">
      <div className="flex items-start space-x-2 text-sm">
        <input
          type="checkbox"
          id="terms"
          className="w-4 h-4 rounded border-gray-300 focus:ring-blue-500"
          required
          checked={agree}
          onChange={(e) => {
            setAgree(e.target.checked);
            setErrors((prev) => {
              const next = { ...prev };
              delete next.agree;
              return next;
            });
          }}
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
      {errors.agree && (
        <p className="text-red-600 text-xs mt-2">{errors.agree}</p>
      )}

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
