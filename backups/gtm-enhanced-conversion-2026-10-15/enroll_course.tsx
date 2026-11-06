"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Breadcrumb from "@/pages/components/Breadcrumb";
import Image from "next/image";
import { RiCheckFill } from "react-icons/ri";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpcomingBatch } from "@/redux/slices/upcomingBatchSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { apiPost } from "@/redux/api/apiClient";
import bannerImageUrl from "/public/banerdc.webp"; 

const isPrivateOrLocalIp = (ip: string) => {
  const v = (ip || "").trim().toLowerCase();
  if (!v) return true;

  if (v === "::1" || v === "::" || v === "0.0.0.0") return true;
  if (v.startsWith("127.") || v.startsWith("10.") || v.startsWith("192.168.")) {
    return true;
  }
  if (v.startsWith("172.")) {
    const second = Number(v.split(".")[1] || "-1");
    if (second >= 16 && second <= 31) return true;
  }
  if (v.startsWith("fc") || v.startsWith("fd") || v.startsWith("fe80")) {
    return true;
  }

  return false;
};

const resolveClientIp = async () => {
  try {
    const localIpRes = await fetch("/nextapi/client-ip", {
      method: "GET",
      cache: "no-store",
    });
    if (localIpRes.ok) {
      const localIpData = await localIpRes.json();
      const localIp = (localIpData?.ip || "").trim();
      if (localIp && !isPrivateOrLocalIp(localIp)) {
        return localIp;
      }
    }
  } catch {
    // fallback to third-party resolver
  }

  try {
    const ipRes = await fetch("https://api64.ipify.org?format=json", {
      method: "GET",
      cache: "no-store",
    });
    if (ipRes.ok) {
      const ipData = await ipRes.json();
      const externalIp = (ipData?.ip || "").trim();
      if (externalIp && !isPrivateOrLocalIp(externalIp)) {
        return externalIp;
      }
    }
  } catch {
    // fallback to empty ip
  }

  return "";
};

export default function EnrollCourse() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { batchData, loading, error } = useSelector(
    (state: RootState) => state.upcomingBatch
  );

  const batchIdParam = router.query.batch_id;
  const comboIdParam = router.query.combo_id;
  const comboItemParam = router.query.item_id;
  const courseParam = router.query.course;
  const batchId =
    typeof batchIdParam === "string" ? Number(batchIdParam) : null;
  const comboId = typeof comboIdParam === "string" ? comboIdParam : "";
  const comboItemId = typeof comboItemParam === "string" ? comboItemParam : "";
  const isCombo = Boolean(comboId && comboItemId);
  const courseSlug = typeof courseParam === "string" ? courseParam : "";

  const [ipAddress, setIpAddress] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    mobile: '',
    address: '',
    coupon: '',
    website: '',
    iitmCert: false,
    paymentMethod: ''
  });
  const [discount, setDiscount] = useState(0);
  const [formError, setFormError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const itiRef = useRef<any>(null);
  const formStartRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadIp = async () => {
      const resolvedIp = await resolveClientIp();
      if (!cancelled) {
        setIpAddress(resolvedIp);
      }
    };

    loadIp();

    return () => {
      cancelled = true;
    };
  }, []);
  // ✅ REPLACE the intlTelInput useEffect
useEffect(() => {
  if (currentStep !== 2 || !phoneInputRef.current || itiRef.current) return;
  let destroyed = false;

  const initIti = async () => {
    const { default: intlTelInput } = await import("intl-tel-input/intlTelInputWithUtils");
    if (destroyed || !phoneInputRef.current || itiRef.current) return;

    itiRef.current = intlTelInput(phoneInputRef.current, {
      initialCountry: "in",
      separateDialCode: true,
      nationalMode: true,
      formatOnDisplay: true,
      autoPlaceholder: "polite",
      containerClass: "w-full",
    });
  };

  initIti();
  return () => {
    destroyed = true;
    if (itiRef.current) {
      itiRef.current.destroy();
      itiRef.current = null;
    }
  };
}, [currentStep]);

  useEffect(() => {
    if (currentStep === 2 && formStartRef.current === null) {
      formStartRef.current = Date.now();
    }
  }, [currentStep]);

  useEffect(() => {
    if (!courseSlug || !ipAddress) return;

    dispatch(
      fetchUpcomingBatch({
        courseSlug,
        city: "",
        ip_address: ipAddress,
      })
    );
  }, [dispatch, courseSlug, ipAddress]);

  const selectedBatch = useMemo(() => {
    if (!batchData || !batchId) return null;

    for (const mode of batchData.training_modes || []) {
      for (const batch of mode.upcoming_dates_preview || []) {
        if (batch.batch_id === batchId) {
          return { batch, mode: mode.mode };
        }
      }

      for (const batches of Object.values(mode.upcoming_dates_all || {})) {
        for (const batch of batches || []) {
          if (batch.batch_id === batchId) {
            return { batch, mode: mode.mode };
          }
        }
      }
    }

    return null;
  }, [batchData, batchId]);

  const selectedComboItem = useMemo(() => {
    if (!batchData?.combo_offer?.items || !comboItemId) return null;
    const idx = Number(comboItemId) - 1;
    const byIndex = batchData.combo_offer.items[idx];
    if (byIndex) return byIndex;

    const matchUrlPart = `enroll_combo_course/${comboId}/${comboItemId}`;
    return (
      batchData.combo_offer.items.find((item) =>
        item.enroll_url?.includes(matchUrlPart)
      ) || null
    );
  }, [batchData, comboId, comboItemId]);

  const basePrice = Number(
    isCombo
      ? selectedComboItem?.discount_price || selectedComboItem?.mrp || 0
      : selectedBatch?.batch?.discount_amount ||
        selectedBatch?.batch?.amount ||
        0
  );
  const iitmPrice = isCombo
    ? 0
    : Number(selectedBatch?.batch?.iitm_certificate_amount || 0);
  const effectivePrice =
    formData.iitmCert && iitmPrice > 0 ? iitmPrice : basePrice;
  const grandTotal = effectivePrice - discount;
  const summaryTitle = isCombo
    ? selectedComboItem?.name || "Combo Offer"
    : batchData?.course_name || "Course Details";
  const summaryDateTime = selectedBatch?.batch
    ? `${selectedBatch.batch.date.display} ${selectedBatch.batch.time}`
    : "";

  const steps = [
    { num: 1, title: 'Course Summary' },
    { num: 2, title: 'Learner Details (Email id will be your user id)' },
    { num: 3, title: 'Secure Payment' }
  ];

  const handleNext = () => {
    if (currentStep === 2) {
      const validationError = validateForm();
      if (validationError) {
        setFormError(validationError);
        return;
      }
    }
    setFormError('');
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handlePrevious = () => {
    setFormError('');
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    if (formData.website.trim()) return 'Spam detected.';
    if (!formData.user_name.trim()) return 'Name is required.';
    if (!formData.email.trim()) return 'Email is required.';
    const emailOk = /^\S+@\S+\.\S+$/.test(formData.email);
    if (!emailOk) return 'Enter a valid email.';
    const mobileValue = itiRef.current?.getNumber() || formData.mobile.trim();
    const mobileDigits = mobileValue.replace(/\D/g, '');
    const isValidMobile =
      (itiRef.current?.isValidNumber && itiRef.current.isValidNumber()) ||
      mobileDigits.length >= 10;
    if (!isValidMobile) return 'Enter a valid mobile number.';
    if (!formData.address.trim()) return 'Address is required.';
    return '';
  };

  const getQueryValue = (key: string) => {
    const val = router.query[key];
    return typeof val === 'string' ? val : '';
  };

  const applyCoupon = () => {
    if (formData.coupon.toLowerCase() === 'save10') {
      setDiscount(6000);
      alert('Coupon applied! 10% discount');
    } else if (formData.coupon) {
      alert('Invalid coupon code');
    }
  };

  const handleSubmit = async () => {
    setSubmitError('');
    setSubmitSuccess('');

    const validationError = validateForm();
    if (validationError) {
      setSubmitError(validationError);
      return;
    }

    if (formStartRef.current && Date.now() - formStartRef.current < 1500) {
      setSubmitError('Please take a moment and try again.');
      return;
    }

    if (isSubmitting) return;

    if (!formData.paymentMethod) {
      setSubmitError('Please select a payment gateway.');
      return;
    }

    const user_nameValue = formData.user_name.trim();
    const emailValue = formData.email.trim();
    const addressValue = formData.address.trim();
    const mobileValue = itiRef.current?.getNumber() || formData.mobile.trim();
    const payload = {
      user_name: user_nameValue,
      email: emailValue,
      mobile_no: mobileValue,
      address: addressValue,
      payment_type: formData.paymentMethod,
      amount: grandTotal,
      item_number: batchId ? String(batchId) : comboItemId || '',
      purpose: summaryTitle,
      combo_id: comboId,
      tid: '',
      payment_total: grandTotal,
      coupon_id: formData.coupon.trim(),
      discount_value: discount,
      iitm_certificate: formData.iitmCert ? 1 : 0,
      utm_source: getQueryValue('utm_source'),
      utm_medium: getQueryValue('utm_medium'),
      utm_term: getQueryValue('utm_term'),
      utm_content: getQueryValue('utm_content'),
      utm_campaign: getQueryValue('utm_campaign'),
      utm_device: getQueryValue('utm_device'),
      utm_adgroup: getQueryValue('utm_adgroup'),
      gclid: getQueryValue('gclid'),
      utm_channel: getQueryValue('utm_channel'),
      utm_type: getQueryValue('utm_type'),
      utm_variety: getQueryValue('utm_variety'),
      utm_experiment: getQueryValue('utm_experiment'),
    };

    try {
      setIsSubmitting(true);
      const formBody = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        formBody.append(
          key,
          value === undefined || value === null ? "" : String(value)
        );
      });

      const response = await apiPost<{
        status?: boolean;
        payment_gateway?: string;
        data?: {
          encRequest?: string;
          access_code?: string;
          action_url?: string;
        };
        message?: string;
      }>("/enrollment_and_payment", formBody);

      if (!response?.status) {
        setSubmitError(response?.message || 'Failed to submit enrollment.');
        return;
      }

      const actionUrl = response?.data?.action_url;
      const encRequest = response?.data?.encRequest;
      const accessCode = response?.data?.access_code;

      if (!actionUrl || !encRequest || !accessCode) {
        setSubmitError('Payment gateway response incomplete.');
        return;
      }

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = actionUrl;
      form.style.display = 'none';

      const encInput = document.createElement('input');
      encInput.type = 'hidden';
      encInput.name = 'encRequest';
      encInput.value = encRequest;
      form.appendChild(encInput);

      const accessInput = document.createElement('input');
      accessInput.type = 'hidden';
      accessInput.name = 'access_code';
      accessInput.value = accessCode;
      form.appendChild(accessInput);

      document.body.appendChild(form);
      form.submit();
    } catch (err: any) {
      const message = err?.message || 'Failed to submit enrollment.';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div>
        <Breadcrumb />
      </div>
      
      <div className="w-full md:mx-auto md:py-16 2xl:px-32 xl:px-20 lg:px-10 p-5 relative">
        <div className="md:block absolute inset-0 -z-10">
        <Image
            src={bannerImageUrl}
            alt="Enroll Course Banner"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover -z-10"
            quality={55}
          />
          </div>
        <div className="hidden md:block absolute inset-0 bg-black/60 z-0" />
        <h1 className="text-3xl font-medium text-shadow-black mb-1.5 text-center z-10 relative text-white">Cart</h1>
      </div> 
 <section className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-[#f4f7ff] lg:pb-0">
    
    {/* Enrollment Form Section */}
    <div className="grid grid-cols-1 gap-4">
  <div className="col-span-1">
     <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-24 gap-8">
            <div className="col-span-1 lg:col-span-2">
              <div className="flex flex-col md:flex-row items-start max-w-3xl mx-auto mb-5 gap-4 md:gap-0">
                {steps.map((step, index) => (
                  <div key={index} className="w-full md:flex-1 flex flex-col items-center">
                    <div className="relative w-full flex items-center justify-center">
                      {index > 0 && (
                        <span
                          className={`hidden md:block absolute left-0 right-1/2 top-1/2 h-[1px] ${
                            currentStep > index ? "bg-black" : "bg-gray-300"
                          }`}
                        />
                      )}
                      {index < steps.length - 1 && (
                        <span
                          className={`hidden md:block absolute left-1/2 right-0 top-1/2 h-[1px] ${
                            currentStep > step.num ? "bg-black" : "bg-gray-300"
                          }`}
                        />
                      )}
                      <div
                        className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center text-base shadow-lg z-10 ${
                          currentStep === step.num
                            ? "bg-black text-white"
                            : currentStep > step.num
                            ? "bg-black text-white"
                            : "bg-white text-gray-800"
                        }`}
                      >
                        {step.num}
                      </div>
                    </div>
                    <span
                      className={`mt-3 text-sm font-semibold text-center leading-snug max-w-full md:max-w-[200px] min-h-0 md:min-h-[44px] ${
                        currentStep === step.num ? "text-gray-900" : "text-gray-800"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
              <div>
                {/* Step 1: Course Summary */}
                {currentStep === 1 && (
                  <div className="space-y-6 bg-white rounded-lg shadow overflow-hidden p-5">
                    {loading && (
                      <p className="text-sm text-gray-500 mb-3">
                        Loading batch details...
                      </p>
                    )}
                    {error && (
                      <p className="text-sm text-red-600 mb-3">
                        {error}
                      </p>
                    )}
                    {/* Course Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[640px]">
                        <thead>
                          <tr className="bg-black text-white">
                            <th className="text-left text-sm px-3 py-2 font-semibold  max-w-xs">Course</th>
                            <th className="text-center text-sm px-3 py-2 font-semibold">Type</th>
                            <th className="text-center text-sm px-3 py-2 font-semibold">No. of Learners</th>
                            <th className="text-center text-sm px-3 py-2 font-semibold">Cost</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t border-gray-200">
                            <td className="px-3 py-2 max-w-xs">
                              <p className="font-medium text-gray-900 mb-2  text-sm">
                                {summaryTitle}
                              </p>
                              {!isCombo && (
                                <p className="text-sm text-gray-700">
                                  <strong>Batch Date:</strong>{" "}
                                  {summaryDateTime || "TBA"}
                                </p>
                              )}
                              {!isCombo && iitmPrice > 0 && (
                                <label className="flex items-center mt-3 text-sm cursor-pointer">
                                  <input
                                    type="checkbox"
                                    name="iitmCert"
                                    checked={formData.iitmCert}
                                    onChange={handleInputChange}
                                    className="mr-2 w-4 h-4 text-blue-600"
                                  />
                                  <span className="text-blue-600 font-medium">
                                    With IITM Pravartak Certification
                                  </span>
                                </label>
                              )}
                            </td>
                            <td className="px-3 py-2 text-gray-900 text-sm text-center">
                              {isCombo ? "Combo Offer" : selectedBatch?.mode || "Training"}
                            </td>
                            <td className="px-3 py-2 text-gray-900 text-sm text-center">1</td>
                            <td className="px-3 py-2 text-gray-900 font-semibold text-sm text-center">₹ {effectivePrice.toLocaleString()}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Coupon and Total Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pt-4">
                      <div className="flex-1 max-w-sm">
                        <div className="flex">
                          <input
                            type="text"
                            name="coupon"
                            value={formData.coupon}
                            onChange={handleInputChange}
                            placeholder="% Coupon"
                            className="flex-1 px-4 py-2 text-sm border-2 border-dashed border-black rounded focus:outline-none focus:border-gray-600"
                          />
                          <button
                            onClick={applyCoupon}
                            className="px-6 py-2.5 cursor-pointer text-sm bg-black text-white rounded hover:bg-gray-800 transition-colors font-medium"
                          >
                            APPLY
                          </button>
                        </div>
                      </div>

                      <div className="w-full md:w-auto text-right md:text-right space-y-2">
                        {discount > 0 && (
                          <>
                            <p className="text-gray-700">Discount: <span className="font-semibold text-green-600">- ₹ {discount.toLocaleString()}</span></p>
                            <p className="text-gray-700">Total: <span className="font-semibold">₹ {effectivePrice.toLocaleString()}</span></p>
                          </>
                        )}
                        {!discount && (
                          <p className="text-gray-700 text-sm">Total: <span>₹ {effectivePrice.toLocaleString()}</span></p>
                        )}
                        <p className="text-sm text-gray-700">
                          Grand Total: <span className="font-semibold">₹ {grandTotal.toLocaleString()}</span>
                        </p>
                      </div>
                    </div>

                    {/* Proceed Button */}
                    <div className="flex justify-end pt-6">
                      <button
                        onClick={handleNext}
                        className="px-6 py-2.5 cursor-pointer bg-black text-sm text-white rounded hover:bg-gray-800 transition-colors font-medium"
                      >
                        PROCEED
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Learner Details */}
                {currentStep === 2 && (
                  <div className="space-y-6 bg-white shadow p-5 rounded-lg">
                    <form className="cormobiln"> 
                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                      <div>
                        <input
                          type="text"
                          name="user_name"
                          value={formData.user_name}
                          onChange={handleInputChange}
                          required
                          className="border-b border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                          placeholder="Name *"
                        />
                      </div>

                      <div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="border-b border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                          placeholder="E-mail *"
                        />
                      </div>

                      <div>
                        <input
                            ref={phoneInputRef}
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleInputChange}
                            required
                            className="border-b border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                            placeholder="Mobile No *"
                          />
                      </div>

                      <div>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          className="border-b border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                          placeholder="Full Address"
                        />
                      </div>
                      <div className="sr-only">
                        <label htmlFor="website">Website</label>
                        <input
                          id="website"
                          type="text"
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </div>
                    </div>
</form>
                    {formError && (
                      <p className="text-sm text-red-600">{formError}</p>
                    )}
                    {/* Navigation Buttons */}
                    <div className="flex justify-end gap-4 pt-6">
                      <button
                        onClick={handlePrevious}
                        className="uppercase px-6 py-2.5 cursor-pointer bg-black text-sm text-white rounded hover:bg-gray-800 transition-colors font-medium"
                      >
                        Go Back
                      </button>
                      <button
                        onClick={handleNext}
                        className="uppercase px-6 py-2.5 cursor-pointer bg-black text-sm text-white rounded hover:bg-gray-800 transition-colors font-medium"
                      >
                        Proceed
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment */}
                {currentStep === 3 && (
                  <div className="space-y-6 bg-white shadow p-5 rounded-lg">
                    {/* <div className="space-y-3">
                      <p className="text-sm font-semibold text-gray-900">Select payment gateway</p>
                      <label className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 text-sm font-medium text-gray-800">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="ccavenue"
                          checked={formData.paymentMethod === "ccavenue"}
                          onChange={handleInputChange}
                        />
                        CCAvenue
                      </label>
                    </div> */}
                    <div className="flex justify-center py-12">
                      <label className="relative cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="ccavenue"
                          checked={formData.paymentMethod === "ccavenue"}
                          onChange={handleInputChange}
                          className="absolute opacity-0"
                        />
                        <div className={`border-2 rounded-lg p-12 bg-white ${formData.paymentMethod === "ccavenue" ? "border-green-500" : "border-gray-300"}`}>
                          <div className="text-center">
                            <span className="text-blue-500 font-bold text-4xl">CC</span>
                            <span className="text-gray-800 font-normal text-3xl">Avenue</span>
                            <sup className="text-gray-500 text-sm">®</sup>
                          </div>
                        </div>
                        {formData.paymentMethod === "ccavenue" && (
                          <div className="absolute -top-3 -right-3 bg-green-500 rounded-full w-10 h-10 flex items-center justify-center">
                            <RiCheckFill className="text-white" size={24} strokeWidth={3} />
                          </div>
                        )}
                      </label>
                    </div>

                    {submitError && (
                      <p className="text-sm text-red-600">{submitError}</p>
                    )}
                    {submitSuccess && (
                      <p className="text-sm text-green-600">{submitSuccess}</p>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-end gap-4 pt-6">
                      <button
                        onClick={handlePrevious}
                        className="uppercase px-6 py-2.5 cursor-pointer bg-black text-sm text-white rounded hover:bg-gray-800 transition-colors font-medium"
                      >
                        Go Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="uppercase px-6 py-2.5 cursor-pointer bg-black text-sm text-white rounded hover:bg-gray-800 transition-colors font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-1">
              {/* Sidebar */}
              <div className="w-full">
                <div className="sticky top-6 bg-white rounded-lg p-6 shadow">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">FAQ</h3>
                  <div className=" max-h-96 overflow-y-auto">
                    <h5 className="font-semibold text-gray-900 mb-3">What type of payments do you accept?</h5>
                    <p className="text-sm text-gray-600 mb-3">We accept the following modes of Payment</p>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                        Cash
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                        Net Banking
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                        Cheque
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                        Debit Card
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                        Credit Card
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                        PayPal
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                        Visa
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                        MasterCard
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                        American Express
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                        Discover
                      </li>
                    </ul>
                  </div>

                  
                </div>
              </div>
            </div>
          </div>
  </div>
  </div>
        <div className="mt-12 max-w-xl mx-auto relative bg-white p-4 px-6 rounded-lg rounded-b-none shadow text-center">
                  <div className="relative aspect-[17/1] w-full">
                  <Image
                      src="https://www.excelr.com/assets/media/general/payment.png"
                      alt="Payment Methods"
                      className="rounded-lg"
                      fill
                    />
                  </div>
                    
                  </div>
</section>
      
    </>
  );
}




