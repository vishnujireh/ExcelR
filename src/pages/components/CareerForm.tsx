"use client";
import React, { useEffect, useState, FormEvent, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitCareerForm, resetCareerFormState } from "@/redux/slices/careerFormSlice";
import type { AppDispatch, RootState } from "@/redux/store";

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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [agree, setAgree] = useState(false);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const itiRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
    setErrors((prev) => {
      const next = { ...prev };
      delete next[e.target.name];
      return next;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      resume_file: file,
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.resume_file;
      return next;
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};
    const emailOk = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
      formData.email_id.trim()
    );

    if (!formData.first_name.trim()) {
      nextErrors.first_name = "Name is required.";
    }
    if (!formData.email_id.trim()) {
      nextErrors.email_id = "Email is required.";
    } else if (!emailOk) {
      nextErrors.email_id = "Enter a valid email.";
    }

    const phoneCheck = syncPhoneField();
    const countryData = itiRef.current?.getSelectedCountryData?.();
    const isIndia =
      countryData?.iso2 === "in" || countryData?.dialCode === "91" || !countryData;
    if (!formData.contact_no || !phoneCheck.isValid) {
      nextErrors.contact_no = isIndia
        ? "Please enter a 10-digit mobile number."
        : "Please enter a 12-digit mobile number.";
    }
    if (!formData.referral_code.trim()) {
      nextErrors.referral_code = "EMP name/code is required.";
    }
    if (!formData.cover_letter.trim()) {
      nextErrors.cover_letter = "Cover letter is required.";
    }
    if (!formData.resume_file) {
      nextErrors.resume_file = "Please upload your CV.";
    }
    if (!agree) {
      nextErrors.agree = "Please accept Terms and Conditions.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      if (nextErrors.contact_no) {
        phoneInputRef.current?.focus();
      }
      return;
    }
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
      setErrors({});
      setAgree(false);
      if (phoneInputRef.current) {
        phoneInputRef.current.value = "";
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [success]);

  // ✅ REPLACE the intlTelInput useEffect
useEffect(() => {
  if (!phoneInputRef.current) return;
  let destroyed = false;

  const initIti = async () => {
    const { default: intlTelInput } = await import("intl-tel-input/intlTelInputWithUtils");
    if (destroyed || !phoneInputRef.current) return;

    itiRef.current = intlTelInput(phoneInputRef.current, {
      initialCountry: "in",
      separateDialCode: true,
      loadUtils: () => import("intl-tel-input/utils"),
    });

    const handlePhoneChange = () => {
      if (!phoneInputRef.current) return;
      const { normalized } = syncPhoneField();
      setFormData((prev) => ({ ...prev, contact_no: normalized }));
    };

    phoneInputRef.current.addEventListener("input", handlePhoneChange);
    phoneInputRef.current.addEventListener("countrychange", handlePhoneChange);
    (itiRef as any)._cleanup = () => {
      phoneInputRef.current?.removeEventListener("input", handlePhoneChange);
      phoneInputRef.current?.removeEventListener("countrychange", handlePhoneChange);
      itiRef.current?.destroy();
    };
  };

  initIti();
  return () => { destroyed = true; (itiRef as any)._cleanup?.(); };
}, []);

  useEffect(() => {
    return () => {
      dispatch(resetCareerFormState());
    };
  }, [dispatch]);

  return (
    <>
 <form className="space-y-4 cormobiln" onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="Name *"
                    className="border border-gray-200 text-sm rounded-lg w-full p-3"
                    required
                  />
                  {errors.first_name && (
                    <p className="text-red-600 text-sm">{errors.first_name}</p>
                  )}

                  <input
                    type="tel"
                    name="contact_no"
                    ref={phoneInputRef}
                    placeholder="Mobile No. *"
                    inputMode="numeric"
                    autoComplete="tel"
                    className="border border-gray-200 text-sm rounded-lg w-full p-3"
                    required
                  />
                  {errors.contact_no && (
                    <p className="text-red-600 text-sm">{errors.contact_no}</p>
                  )}

                  <input
                    type="email"
                    name="email_id"
                    value={formData.email_id}
                    onChange={handleChange}
                    placeholder="Email *"
                    className="border border-gray-200 text-sm rounded-lg w-full p-3"
                    required
                  />
                  {errors.email_id && (
                    <p className="text-red-600 text-sm">{errors.email_id}</p>
                  )}

                  <input
                    type="text"
                    name="referral_code"
                    value={formData.referral_code}
                    onChange={handleChange}
                    placeholder="EMP Name / Code *"
                    className="border border-gray-200 text-sm rounded-lg w-full p-3"
                    required
                  />
                  {errors.referral_code && (
                    <p className="text-red-600 text-sm">{errors.referral_code}</p>
                  )}

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
                  {errors.cover_letter && (
                    <p className="text-red-600 text-sm">{errors.cover_letter}</p>
                  )}

                  <label className="text-sm block">Upload CV *</label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="border border-gray-200 text-sm rounded-lg w-full p-3"
                    required
                  />
                  {errors.resume_file && (
                    <p className="text-red-600 text-sm">{errors.resume_file}</p>
                  )}

                  <div className="flex items-start gap-2 text-sm">
                    <input
                      type="checkbox"
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
                  {errors.agree && (
                    <p className="text-red-600 text-sm">{errors.agree}</p>
                  )}

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