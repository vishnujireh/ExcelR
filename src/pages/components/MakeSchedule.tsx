"use client";
import { useState, useEffect, useRef } from "react";
import { RiUserFill, RiMailOpenFill, RiPhoneFill, RiCalendarFill } from "react-icons/ri";
import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";

const MakeSchedule = ({ closeModal }: { closeModal: () => void }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    enquiry: "",
    preferredDate: "",
  });

  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const itiRef = useRef<any>(null);

  // ✅ Initialize intl-tel-input once when component mounts
  useEffect(() => {
  if (typeof window === "undefined" || !phoneInputRef.current) return;

  const inputElement = phoneInputRef.current; // ✅ stable reference

  itiRef.current = intlTelInput(inputElement, {
    initialCountry: "in",
    separateDialCode: true,
  });

  const handlePhoneChange = () => {
    const fullNumber = itiRef.current.getNumber();
    setFormData((prev) => ({ ...prev, mobile: fullNumber }));
  };

  inputElement.addEventListener("input", handlePhoneChange);
  inputElement.addEventListener("countrychange", handlePhoneChange);

  // ✅ Cleanup uses the same reference, no warning
  return () => {
    inputElement.removeEventListener("input", handlePhoneChange);
    inputElement.removeEventListener("countrychange", handlePhoneChange);
    itiRef.current?.destroy();
  };
}, []);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    closeModal(); // Close modal after submit
  };

  return (
    <div
      className="fixed inset-0 bg-[#000000cc] bg-opacity-50 flex justify-center items-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-[#171717] rounded-lg shadow-lg p-6 w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex justify-end">
          <button
            className="text-2xl cursor-pointer absolute w-10 h-10 -top-8 -end-8 bg-white text-[#171717] rounded-full flex items-center justify-center"
            onClick={closeModal}
          >
            ×
          </button>
        </div>

        <p className="text-lg mt-2 mb-3 font-semibold text-center text-white">
          Let us know your convenient schedule
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <RiUserFill className="text-gray-700" />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name *"
              className="border border-[#fff] text-gray-900 bg-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <RiMailOpenFill className="text-gray-700" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email *"
              className="border border-[#fff] bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
              required
            />
          </div>

          {/* ✅ Mobile (with intl-tel-input) */}
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <RiPhoneFill className="text-gray-700" />
            </div>
            <input
              ref={phoneInputRef}
              type="tel"
              name="mobile"
              placeholder="Mobile No. *"
              className="border border-[#fff] bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
              required
            />
          </div>

          {/* Preferred Date */}
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <RiCalendarFill className="text-gray-700" />
            </div>
            <input
              type="text"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              placeholder="Preferred Date (DD/MM/YYYY) *"
              className="border border-[#fff] bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
              required
            />
          </div>

          {/* Enquiry */}
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <RiUserFill className="text-gray-700" />
            </div>
            <select
              name="enquiry"
              value={formData.enquiry}
              onChange={handleChange}
              className="border bg-white border-[#fff] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
              required
            >
              <option value="">Looking for?</option>
              <option value="Myself">Myself</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-start space-x-2 text-sm">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              required
            />
            <label htmlFor="terms" className="text-white">
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

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="border cursor-pointer border-solid border-[#0071BC] bg-[#0071BC] text-white hover:bg-[#4ba7de] font-medium text-sm py-2.5 px-5 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakeSchedule;
