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
import "intl-tel-input/build/css/intlTelInput.css";
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
    countryCode:"",
    agree: false,
  });

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
        countryCode:"",
        agree: false,
      });

      // Redirect to Thank You page
      if (result?.status) {
        closeModal();
        router.push("/thank-you");
      }

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
      countries={countries}
      states={states}
      locations={locations}
      loadingCountries={loadingCountries}
      loadingStates={loadingStates}
      loadingLocations={loadingLocations}
      submitting={submitting}
      error={error}
      phoneInputRef={phoneInputRef}
      showCourse={prefillReady && !hasPrefillCourse}
      showCountry={
        prefillReady &&
        (!hasPrefillCountry ||
          ((!hasPrefillState || !hasPrefillLocation) &&
            countries.length > 0 &&
            !mappedCountryId))
      }
      showState={
        prefillReady &&
        (!hasPrefillState ||
          (!hasPrefillLocation && states.length > 0 && !mappedStateId))
      }
      showLocation={prefillReady && !hasPrefillLocation}
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
    showCourse={prefillReady && !hasPrefillCourse}
    showCountry={
      prefillReady &&
      (!hasPrefillCountry ||
        ((!hasPrefillState || !hasPrefillLocation) &&
          countries.length > 0 &&
          !mappedCountryId))
    }
    showState={
      prefillReady &&
      (!hasPrefillState ||
        (!hasPrefillLocation && states.length > 0 && !mappedStateId))
    }
    showLocation={prefillReady && !hasPrefillLocation}
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
  showCourse = true,
  showCountry = true,
  showState = true,
  showLocation = true,
}: any) {
  return (
    <form onSubmit={handleSubmit} className="space-y-2 px-4 text-gray-600" >
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

      {showCourse && (
        <Input
          icon={<RiArtboardFill />}
          name="course"
          value={formData.course}
          onChange={handleChange}
          placeholder="Course"
          type="text"
        />
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

      {/* LOCATION */}
      {showLocation && (
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
      )}

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
          <Link href="/terms-and-conditions" target="_blank" className="text-blue-600 underline">Terms and Conditions</Link>{" "}
          and{" "}
          <Link href="/privacy-policy" target="_blank" className="text-blue-600 underline">Privacy Policy</Link>{" "}
          of Excelr Solutions.
        </span>
      </div>

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
