"use client";
import { useState } from "react";
import Image from "next/image";
import quickenquiry_icon from "/public/quickenquiry_icon.png";
import { RiUserFill, RiMailOpenFill, RiPhoneFill } from "react-icons/ri";

const QuickEnquiry = ({ closeModal }: { closeModal: () => void }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    enquiry: "",
  });

  // ✅ Used for all inputs
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
    console.log(formData);
    closeModal(); // Close modal after submit
  };

  return (
    <div
      className="fixed inset-0 bg-[#000000cc] bg-opacity-50 flex justify-center items-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md pb-32"
        style={{
          backgroundImage: `url('/quick_bg.png')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <button
            className="text-gray-600 text-2xl cursor-pointer"
            onClick={closeModal}
          >
            ×
          </button>
        </div>

        <div>
          <Image
            src={quickenquiry_icon}
            width={120}
            className="mx-auto mb-8"
            alt="Quick Enquiry"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-14">
          {/* Name */}
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <RiUserFill className="text-gray-900" />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name *"
              className="border border-[#868686] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <RiMailOpenFill className="text-gray-900" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email *"
              className="border border-[#868686] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
              required
            />
          </div>

          {/* Mobile */}
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <RiPhoneFill className="text-gray-900" />
            </div>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile No. *"
              className="border border-[#868686] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
              required
            />
          </div>

          {/* Enquiry */}
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <RiUserFill className="text-gray-900" />
            </div>
            <select
              name="enquiry"
              value={formData.enquiry}
              onChange={handleChange}
              className="border border-[#868686] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
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
            <label htmlFor="terms" className="text-gray-700">
              I hereby agree to the{" "}
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
              </a>{" "}
              of Excelr Solutions.
            </label>
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="  border cursor-pointer border-solid border-[#0071BC] bg-[#0071BC] text-white hover:bg-[#4ba7de] font-medium text-sm py-2.5 px-5 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuickEnquiry;
