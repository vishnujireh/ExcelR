"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import quickenquiry_icon from "/public/quickenquiry_icon.png";
import drop_query_icon from "/public/drop-query.png";
import {
  RiUserFill,
  RiMailOpenFill,
  RiPhoneFill,
  RiMapPin2Fill,
  RiArtboardFill,
  RiBuildingFill,
  RiGroupFill
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
import { apiGet } from "@/redux/api/apiClient";
import {
  submitDropQuery,
  resetDropQueryState,
} from "@/redux/slices/dropQuerySlice";
import intlTelInput from "intl-tel-input";

import logo from "/public/logo.png";

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
  country = "",
  state = "",
  city = "",
}: QuickEnquiryProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDropQuery = formName?.toLowerCase().includes("drop a query");
  const headerIcon = isDropQuery ? drop_query_icon : quickenquiry_icon;
  const headerAlt = isDropQuery ? "Drop a Query" : "Quick Enquiry";

  useEffect(() => {
    if (typeof document === "undefined") return;
    const { style } = document.body;
    const prevOverflow = style.overflow;
    const prevPaddingRight = style.paddingRight;
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    style.overflow = "hidden";
    if (scrollBarWidth > 0) {
      style.paddingRight = `${scrollBarWidth}px`;
    }
    return () => {
      style.overflow = prevOverflow;
      style.paddingRight = prevPaddingRight;
    };
  }, []);

  const resolveSlug = () => {
    const pathname =
      typeof window !== "undefined" ? window.location.pathname : "";
    const parts = pathname.split("?")[0].split("/").filter(Boolean);
    const slugFromPath = parts[0] === "course" ? parts[1] : "";
    const slugFromQuery = Array.isArray(router.query.slug)
      ? router.query.slug[0]
      : typeof router.query.slug === "string"
      ? router.query.slug
      : "";
    return slugFromQuery || slugFromPath;
  };

  const normalizeValue = (value?: string) => value?.trim() || "";
  const propPrefill = {
    course: normalizeValue(course),
    country: normalizeValue(country),
    state: normalizeValue(state),
    location: normalizeValue(city),
  };

  const [apiPrefill, setApiPrefill] = useState({
    course: "",
    country: "",
    state: "",
    location: "",
  });

  const [prefillReady, setPrefillReady] = useState(() => {
    const slug = resolveSlug();
    if (!slug) return true;
    if (
      propPrefill.course &&
      propPrefill.country &&
      propPrefill.state &&
      propPrefill.location
    ) {
      return true;
    }
    return false;
  });

  const prefill = {
    course: propPrefill.course || apiPrefill.course,
    country: propPrefill.country || apiPrefill.country,
    state: propPrefill.state || apiPrefill.state,
    location: propPrefill.location || apiPrefill.location,
  };

  const hasPrefillCourse = Boolean(prefill.course);
  const hasPrefillCountry = Boolean(prefill.country);
  const hasPrefillState = Boolean(prefill.state);
  const hasPrefillLocation = Boolean(prefill.location);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    enquiry: "",
    course: prefill.course,
    country: prefill.country,
    state: prefill.state,
    location: prefill.location,
    locationOther: "",
    company:"",
    teamSize:"",
    countryCode:"",
    agree: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const dispatch = useDispatch<AppDispatch>();
  const [mappedCountryId, setMappedCountryId] = useState<string | null>(null);
  const [mappedStateId, setMappedStateId] = useState<string | null>(null);

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

  useEffect(() => {
    const slug = resolveSlug();
    if (!slug) return;
    if (
      propPrefill.course &&
      propPrefill.country &&
      propPrefill.state &&
      propPrefill.location
    ) {
      setPrefillReady(true);
      return;
    }

    let cancelled = false;

    const fetchCoursePrefill = async () => {
      try {
        const response: any = await apiGet(`/course_details/${slug}`);
        const detail = response?.data?.course_details?.[0];
        if (!detail || cancelled) return;

        setApiPrefill((prev) => ({
          course:
            prev.course ||
            detail.course ||
            detail.course_name ||
            "",
          country: prev.country || detail.country || "",
          state: prev.state || detail.state || "",
          location: prev.location || detail.city || "",
        }));
      } catch (err) {
        // Ignore fetch errors; fall back to manual entry
      } finally {
        if (!cancelled) {
          setPrefillReady(true);
        }
      }
    };

    fetchCoursePrefill();

    return () => {
      cancelled = true;
    };
  }, [
    propPrefill.course,
    propPrefill.country,
    propPrefill.state,
    propPrefill.location,
    router.query.slug,
  ]);

  useEffect(() => {
    if (
      !prefill.course &&
      !prefill.country &&
      !prefill.state &&
      !prefill.location
    ) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      course: prev.course || prefill.course,
      country: prev.country || prefill.country,
      state: prev.state || prefill.state,
      location: prev.location || prefill.location,
    }));
  }, [prefill.course, prefill.country, prefill.state, prefill.location]);

  useEffect(() => {
    if (!prefill.country || countries.length === 0) {
      setMappedCountryId(null);
      return;
    }

    const normalizedPrefill = prefill.country.toLowerCase();
    const match = countries.find(
      (c) =>
        c.ID === prefill.country ||
        c.name.toLowerCase() === normalizedPrefill ||
        c.code?.toLowerCase() === normalizedPrefill
    );

    if (!match) {
      setMappedCountryId(null);
      return;
    }

    setMappedCountryId(match.ID);
    setFormData((prev) => {
      if (
        prev.country &&
        prev.country !== prefill.country &&
        prev.country !== match.ID
      ) {
        return prev;
      }
      if (prev.country === match.ID) return prev;
      return { ...prev, country: match.ID };
    });

    dispatch(fetchStates({ country_id: match.ID }));
  }, [countries, dispatch, prefill.country]);

  useEffect(() => {
    if (!prefill.state || states.length === 0) {
      setMappedStateId(null);
      return;
    }

    const normalizedPrefill = prefill.state.toLowerCase();
    const match = states.find(
      (s) =>
        s.ID === prefill.state || s.name.toLowerCase() === normalizedPrefill
    );

    if (!match) {
      setMappedStateId(null);
      return;
    }

    setMappedStateId(match.ID);
    setFormData((prev) => {
      if (
        prev.state &&
        prev.state !== prefill.state &&
        prev.state !== match.ID
      ) {
        return prev;
      }
      if (prev.state === match.ID) return prev;
      return { ...prev, state: match.ID };
    });

    dispatch(fetchLocations({ state_id: match.ID }));
  }, [dispatch, prefill.state, states]);

  useEffect(() => {
    if (!prefill.location || locations.length === 0) {
      return;
    }

    const normalizedPrefill = prefill.location.toLowerCase();
    const match = locations.find(
      (l) =>
        l.ID === prefill.location || l.name.toLowerCase() === normalizedPrefill
    );

    if (!match) {
      return;
    }

    setFormData((prev) => {
      if (
        prev.location &&
        prev.location !== prefill.location &&
        prev.location !== match.ID
      ) {
        return prev;
      }
      if (prev.location === match.ID) return prev;
      return { ...prev, location: match.ID };
    });
  }, [locations, prefill.location]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => {
      const nextValue =
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
      const next = {
        ...prev,
        [name]: nextValue,
      };

      if (name === "country") {
        next.state = "";
        next.location = "";
        next.locationOther = "";
      }

      if (name === "state") {
        next.location = "";
        next.locationOther = "";
      }

      if (name === "location" && value !== "OTHER") {
        next.locationOther = "";
      }

      return next;
    });

    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      if (name === "country") {
        delete next.state;
        delete next.location;
        delete next.locationOther;
      }
      if (name === "state") {
        delete next.location;
        delete next.locationOther;
      }
      if (name === "location") {
        delete next.locationOther;
      }
      return next;
    });

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

  const showCourse = prefillReady && !hasPrefillCourse;
  const showCountry =
    prefillReady &&
    (!hasPrefillCountry ||
      ((!hasPrefillState || !hasPrefillLocation) &&
        countries.length > 0 &&
        !mappedCountryId));
  const showState =
    prefillReady &&
    (!hasPrefillState ||
      (!hasPrefillLocation && states.length > 0 && !mappedStateId));
  const showLocation = prefillReady && !hasPrefillLocation;

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};
    const emailOk = /^\S+@\S+\.\S+$/.test(formData.email.trim());

    const personalDomains =[
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "hotmail.com",
      "rediffmail.com"
    ];
    const emailDomain = formData.email.trim().split("@")[1]?.toLowerCase();


    if (!formData.name.trim()) {
      nextErrors.name = "Name is required.";
    }
    if (!formData.email.trim()) {

      nextErrors.email =  isEnterprisesForm
      ? "Work Email is required."
      : "Email is required.";
    } else if (!emailOk) {
      nextErrors.email = "Enter a valid email.";
    } else if (isEnterprisesForm && emailDomain && personalDomains.includes(emailDomain)) {
      nextErrors.email = "Please enter a work email address.";
    }

    const phoneCheck = syncPhoneField();
    const countryData = itiRef.current?.getSelectedCountryData?.();
    const isIndia =
      countryData?.iso2 === "in" || countryData?.dialCode === "91" || !countryData;
    if (!formData.mobile || !phoneCheck.isValid) {
      nextErrors.mobile = isIndia
        ? "Please enter a 10-digit mobile number."
        : "Please enter a 12-digit mobile number.";
    }

    if (!isEnterprisesForm && showCourse && !formData.course.trim()) {
      nextErrors.course = "Course is required.";
    }
    if (showCountry && !formData.country) {
      nextErrors.country = "Country is required.";
    }
    if (!formData.company.trim()) {
      nextErrors.company = "Company Name is required.";
    }
    if (showState && !formData.state) {
      nextErrors.state = "State is required.";
    }
    if (showLocation && !formData.location) {
      nextErrors.location = "Location is required.";
    }
    if (showLocation && formData.location === "OTHER" && !formData.locationOther.trim()) {
      nextErrors.locationOther = "Please enter your location.";
    }
    if (!formData.enquiry) {
      nextErrors.enquiry = "Please select an option.";
    }
    if (!formData.agree) {
      nextErrors.agree = "Please accept Terms & Conditions.";
    }

    return nextErrors;
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      if (validationErrors.mobile) {
        phoneInputRef.current?.focus();
      }
      return;
    }
const pathname =
  typeof window !== "undefined"
    ? window.location.pathname.replace(/^\/+/, "")
    : "";
    const resolvedLocation =
      formData.location === "OTHER"
        ? formData.locationOther.trim()
        : formData.location;
    const payload = {
      user_name: formData.name,
      user_email: formData.email,
      user_mobile: formData.mobile,
      course: formData.course,
      user_country: formData.country,
      user_state: formData.state,
      user_location: resolvedLocation,
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
      const result = await dispatch(submitDropQuery(payload)).unwrap();

      // Reset form
      setFormData({
        name: "",
        email: "",
        mobile: "",
        enquiry: "",
        course: hasPrefillCourse ? formData.course : "",
        country: hasPrefillCountry ? formData.country : "",
        state: hasPrefillState ? formData.state : "",
        location: hasPrefillLocation ? formData.location : "",
        locationOther: "",
        company:"",
        teamSize:"",
        countryCode:"",
        agree: false,
      });
      setErrors({});

      // Redirect to Thank You page
      if (result?.status) {
        closeModal();
        //router.push("/thank-you");
	window.location.href = "https://www.excelr.com/thank-you";
      }

      // Reset Redux state
      dispatch(resetDropQueryState());
    } catch (err) {
      console.error("Drop query failed", err);
    }
  };

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
    mobile: normalized,
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

const isEnterprisesForm = formName === "enterprises";


  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-[#000000cc]"
      onClick={closeModal}
    >
      <div
        className={`relative bg-white rounded-lg shadow-lg overflow-hidden m-5 ${
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
          className={`p-6 ${variant === "default" ? "pb-22 pt-3 quickenbg" : " p-6"}`}
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
            <>
            <Image src={logo} alt="Logo" width={110} height={40} className="mx-auto mb-2" />
            <Image
              src={headerIcon}
              width={100}
              alt={headerAlt}
              className="mx-auto mb-1"
            />
            </>
          )}

          {variant === "callback" && (
            <>
              <h2 className="text-xl font-semibold">Request a Call back</h2>
              <p className="text-red-500 text-sm mb-3">
                Please leave your details here, we would love to call you
              </p>
            </>
          )}
          

          {variant === "callback" ? (
  <div className="bg-gray-200 rounded-xl  px-0 py-4 mx-auto">
    <ReusableForm
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      errors={errors}
      countries={countries}
      states={states}
      locations={locations}
      loadingCountries={loadingCountries}
      loadingStates={loadingStates}
      loadingLocations={loadingLocations}
      submitting={submitting}
      error={error}
      phoneInputRef={phoneInputRef}
      showCourse={showCourse}
      showCountry={isEnterprisesForm ? false : showCountry}
      showState={ isEnterprisesForm ? false : showState}
      showLocation={ isEnterprisesForm ? false : showLocation}
      isEnterprisesForm={isEnterprisesForm}
    />
  </div>
) : (
  <ReusableForm
    formData={formData}
    handleChange={handleChange}
    handleSubmit={handleSubmit}
    errors={errors}
    countries={countries}
    states={states}
    locations={locations}
    loadingCountries={loadingCountries}
    loadingStates={loadingStates}
    loadingLocations={loadingLocations}
    submitting={submitting}
    error={error}
    phoneInputRef={phoneInputRef}
    showCourse={showCourse}
    showCountry={isEnterprisesForm ? false : showCountry}
    showState={isEnterprisesForm ? false : showState}
    showLocation={isEnterprisesForm ? false : showLocation}
    isEnterprisesForm={isEnterprisesForm}
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
  errors,
  countries,
  states,
  locations,
  loadingCountries,
  loadingStates,
  loadingLocations,
  submitting,
  error,
  phoneInputRef,
  showCourse = true,
  showCountry = true,
  showState = true,
  showLocation = true,
  isEnterprisesForm = false,
}: any) {
  const showOtherLocationOption =
    Boolean(formData.state) && !loadingLocations && locations.length === 0;
  const locationOptions = showOtherLocationOption
    ? [{ ID: "OTHER", name: "Others" }]
    : locations;
  const showLocationOtherField =
    showLocation && formData.location === "OTHER";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-2 px-4 text-gray-600" >
      <Input icon={<RiUserFill />} name="name" value={formData.name} onChange={handleChange} placeholder="Name *" />
      {errors?.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
      <Input icon={<RiMailOpenFill />} name="email" value={formData.email} onChange={handleChange} placeholder={isEnterprisesForm ? "Work Email *" : "Email *"} type="email" />
      {errors?.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}

      {/* PHONE INPUT (intl-tel-input) */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900"><RiPhoneFill /></span>
        <input
          ref={phoneInputRef}
          name="mobile"  
          placeholder="Mobile No. *"
          type="tel"
          required
          inputMode="numeric"
          autoComplete="tel"
          className="border border-[#868686] text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5 moblig"
        />
      </div>
      {errors?.mobile && <p className="text-red-600 text-xs mt-1">{errors.mobile}</p>}

   {isEnterprisesForm && (
      <>
        <Input
          icon={<RiBuildingFill />}
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company Name *"
        />
          {errors?.company && <p className="text-red-600 text-xs mt-1">{errors.company}</p>}
       <Select
        icon={<RiGroupFill />}
      name="teamSize"
      value={formData.teamSize}
      onChange={handleChange} 
      options={[
        { ID: "5-10", name: "5 to 10" },
        { ID: "10-20", name: "10 to 20" },
        { ID: "20-40", name: "20 to 40" },
        { ID: "40+", name: "40+" },
      ]}
      placeholder="Team Size ( Approx )"
    />
        
      </>
    )}
      {showCourse && (
        <Input
          icon={<RiArtboardFill />}
          name="course"
          value={formData.course}
          onChange={handleChange}
          placeholder={isEnterprisesForm ? "Name of Course" : "Course *"}
          type="text"
        />
      )}
      {showCourse && errors?.course && (
        <p className="text-red-600 text-xs mt-1">{errors.course}</p>
      )}

      {/* COUNTRY */}
      {showCountry && (
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
      )}
      {showCountry && errors?.country && (
        <p className="text-red-600 text-xs mt-1">{errors.country}</p>
      )}

      {/* STATE */}
      {showState && (
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
      )}
      {showState && errors?.state && (
        <p className="text-red-600 text-xs mt-1">{errors.state}</p>
      )}

      {/* LOCATION */}
      {showLocation && (
        <Select
          icon={<RiMapPin2Fill />}
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          disabled={!formData.state}
          options={locationOptions}
          loading={loadingLocations}
          placeholder="Location"
        />
      )}
      {showLocation && errors?.location && (
        <p className="text-red-600 text-xs mt-1">{errors.location}</p>
      )}

      {showLocationOtherField && (
        <Input
          icon={<RiMapPin2Fill />}
          name="locationOther"
          value={formData.locationOther}
          onChange={handleChange}
          placeholder="Enter your location"
          type="text"
          required
        />
      )}
      {showLocationOtherField && errors?.locationOther && (
        <p className="text-red-600 text-xs mt-1">{errors.locationOther}</p>
      )}

      {/* ENQUIRY */}
      {!isEnterprisesForm && (
        <>
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
      {errors?.enquiry && <p className="text-red-600 text-xs mt-1">{errors.enquiry}</p>}
        </>
      )}
     

      <div className="flex items-start gap-2 text-xs text-gray-700">
        <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} required className="mt-1" />
        <span>
          I hereby agree to the{" "}
          <Link href="/terms-and-conditions" target="_blank" className="text-blue-600 underline">Terms and Conditions</Link>{" "}
          and{" "}
          <Link href="/privacy-policy" target="_blank" className="text-blue-600 underline">Privacy Policy</Link>{" "}
          of Excelr Solutions.
        </span>
      </div>
      {errors?.agree && <p className="text-red-600 text-xs mt-1">{errors.agree}</p>}

      <div className="text-center">
        {error && <p className="text-red-600 text-xs text-center">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className={`rounded-lg border px-5 py-2.5 text-sm font-medium text-white cursor-pointer ${
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
  const { required = true, ...rest } = props;
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900">{icon}</span>
      <input
        {...rest}
        required={required}
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
