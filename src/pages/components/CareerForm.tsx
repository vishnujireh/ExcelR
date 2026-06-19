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

  // ─── Refs ─────────────────────────────────────────────────────────────────
  //
  // phoneWrapperRef → a plain <div> React renders but leaves EMPTY (no JSX
  //                   children). intl-tel-input injects its own DOM here, so
  //                   React never reconciles that subtree → no insertBefore crash.
  //
  const phoneWrapperRef = useRef<HTMLDivElement | null>(null);
  const phoneInputRef   = useRef<HTMLInputElement | null>(null);
  const itiRef          = useRef<any>(null);
  const fileInputRef    = useRef<HTMLInputElement | null>(null);

  // ─── Validate & normalise the phone value ─────────────────────────────────
  const syncPhoneField = () => {
    const iti   = itiRef.current;
    const input = phoneInputRef.current;
    if (!iti || !input) return { normalized: "", isValid: true };

    const countryData = iti.getSelectedCountryData();
    const isIndia     = countryData?.iso2 === "in" || countryData?.dialCode === "91";
    const digitsOnly  = (input.value || "").replace(/\D/g, "");
    let   normalized  = digitsOnly;

    if (isIndia) {
      normalized = digitsOnly.slice(0, 10);
      if (input.value !== normalized) input.value = normalized;
      input.setCustomValidity(
        normalized.length > 0 && normalized.length !== 10
          ? "Please enter a 10-digit mobile number."
          : ""
      );
    } else {
      if (digitsOnly.length > 12) {
        normalized = digitsOnly.slice(0, 12);
        if (input.value !== normalized) input.value = normalized;
      }
      if (normalized.length > 0) {
        const lengthOk = normalized.length === 12;
        const isValid  =
          typeof iti.isValidNumber === "function"
            ? iti.isValidNumber() && lengthOk
            : lengthOk;
        input.setCustomValidity(isValid ? "" : "Please enter a 12-digit mobile number.");
      } else {
        input.setCustomValidity("");
      }
    }

    return { normalized, isValid: input.checkValidity() };
  };

  // ─── Sync hidden fields when props change ─────────────────────────────────
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      title:    title    || "",
      location: location || "",
      category: category || "",
      industry: industry || "",
    }));
  }, [title, location, category, industry]);

  // ─── Field handlers ───────────────────────────────────────────────────────
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => { const n = { ...prev }; delete n[e.target.name]; return n; });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, resume_file: file }));
    setErrors((prev) => { const n = { ...prev }; delete n.resume_file; return n; });
  };

  // ─── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};

    const emailOk = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
      formData.email_id.trim()
    );

    if (!formData.first_name.trim()) nextErrors.first_name = "Name is required.";
    if (!formData.email_id.trim())   nextErrors.email_id   = "Email is required.";
    else if (!emailOk)               nextErrors.email_id   = "Enter a valid email.";

    const phoneCheck  = syncPhoneField();
    const countryData = itiRef.current?.getSelectedCountryData?.();
    const isIndia     =
      countryData?.iso2 === "in" || countryData?.dialCode === "91" || !countryData;

    if (!formData.contact_no || !phoneCheck.isValid) {
      nextErrors.contact_no = isIndia
        ? "Please enter a 10-digit mobile number."
        : "Please enter a 12-digit mobile number.";
    } 
    if (!formData.resume_file)          nextErrors.resume_file   = "Please upload your CV.";
    if (!agree)                         nextErrors.agree         = "Please accept Terms and Conditions.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      if (nextErrors.contact_no) phoneInputRef.current?.focus();
      return;
    }

    dispatch(submitCareerForm(formData));
  };

  // ─── Reset on success ─────────────────────────────────────────────────────
  useEffect(() => {
    if (success) {
      setFormData((prev) => ({
        ...INITIAL_FORM_STATE,
        title:    prev.title,
        location: prev.location,
        category: prev.category,
        industry: prev.industry,
      }));
      setErrors({});
      setAgree(false);
      if (phoneInputRef.current) phoneInputRef.current.value = "";
      if (fileInputRef.current)  fileInputRef.current.value  = "";
    }
  }, [success]);
 
  useEffect(() => {
    const wrapper = phoneWrapperRef.current;
    if (!wrapper) return;

    let destroyed = false;

    const initIti = async () => {
      const { default: intlTelInput } = await import(
        "intl-tel-input/intlTelInputWithUtils"
      );

      // Bail if unmounted while import was in flight
      if (destroyed || !phoneWrapperRef.current) return;

      // Build the <input> imperatively — React never owns this node
      const input = document.createElement("input");
      input.type         = "tel";
      input.placeholder  = "Mobile No. *";
      input.inputMode    = "numeric";
      input.autocomplete = "tel";
      input.required     = true;
      input.className    = "border border-gray-200 text-sm rounded-lg w-full p-3";

      wrapper.appendChild(input);
      phoneInputRef.current = input;

      itiRef.current = intlTelInput(input, {
        initialCountry: "in",
        separateDialCode: true,
        // No loadUtils — intlTelInputWithUtils already bundles them
      });

      const handlePhoneChange = () => {
        const { normalized } = syncPhoneField();
        setFormData((prev) => ({ ...prev, contact_no: normalized }));
      };

      input.addEventListener("input",         handlePhoneChange);
      input.addEventListener("countrychange", handlePhoneChange);

      // Store cleanup on the ref to avoid stale-closure issues in the return()
      (itiRef as any)._cleanup = () => {
        input.removeEventListener("input",         handlePhoneChange);
        input.removeEventListener("countrychange", handlePhoneChange);
        itiRef.current?.destroy();
        itiRef.current = null;
        if (wrapper.contains(input)) wrapper.removeChild(input);
        phoneInputRef.current = null;
      };
    };

    initIti();

    return () => {
      destroyed = true;
      (itiRef as any)._cleanup?.();
    };
  }, []); // empty — run once on mount, clean up on unmount

  // ─── Redux cleanup on unmount ─────────────────────────────────────────────
  useEffect(() => {
    return () => { dispatch(resetCareerFormState()); };
  }, [dispatch]);

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <>
      <form
        className="space-y-4 cormobiln"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        noValidate
      >
        <div>
          {/* Name */}
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="Name *"
          className="border border-gray-200 text-sm rounded-lg w-full p-3"
          
        />
        {errors.first_name && (
          <p className="text-red-600 text-xs mt-1">{errors.first_name}</p>
        )}
        </div>
        <div>
           <div ref={phoneWrapperRef} className="w-full" />
        {errors.contact_no && (
          <p className="text-red-600 text-xs mt-1">{errors.contact_no}</p>
        )}
        </div>
        <div>
          {/* Email */}
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
          <p className="text-red-600 text-xs mt-1">{errors.email_id}</p>
        )}
        </div>
        <div>
          {/* EMP referral */}
        <input
          type="text"
          name="referral_code"
          value={formData.referral_code}
          onChange={handleChange}
          placeholder="EMP Name / Code *"
          className="border border-gray-200 text-sm rounded-lg w-full p-3"
        />
         <small className="text-gray-400 block">
          *Applicable for ExcelR employees referral only
        </small>
        </div>
        <div>
          {/* Cover letter */}
        <textarea
          name="cover_letter"
          value={formData.cover_letter}
          onChange={handleChange}
          placeholder="Cover Letter *"
          className="border border-gray-200 text-sm rounded-lg w-full p-3"
          required
        /> 
        </div>
        <div>
           {/* CV upload */}
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
          <p className="text-red-600 text-xs mt-1">{errors.resume_file}</p>
        )}
        </div>
        <div>
          {/* T&C */}
        <div className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            required
            checked={agree}
            onChange={(e) => {
              setAgree(e.target.checked);
              setErrors((prev) => { const n = { ...prev }; delete n.agree; return n; });
            }}
          />
          <label className="text-gray-500">
            I agree to the{" "}
            <a href="/terms" className="text-blue-600 underline" target="_blank">
              Terms and Conditions
            </a>{" "}
            and{" "}
            <a href="/privacy-policy" className="text-blue-600 underline" target="_blank">
              Privacy Policy
            </a>
          </label>
        </div>
        {errors.agree && (
          <p className="text-red-600 text-xs mt-1">{errors.agree}</p>
        )}
        </div>
        <div>
          {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="border border-[#0071BC] bg-[#0071BC] text-white hover:bg-[#4ba7de] font-medium text-sm py-2.5 px-5 rounded-lg disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        {success && message && (
          <p className="text-green-600 text-sm mt-2">{message}</p>
        )}
        {error && (
          <p className="text-red-600 text-xs mt-2">{error}</p>
        )}
        </div>
        
      </form>
    </>
  );
}