"use client";
import React, { useState } from 'react';
import Breadcrumb from "@/pages/components/Breadcrumb";
import Image from 'next/image';
import { RiCheckFill } from "react-icons/ri";

export default function EnrollCourse() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    mobile: '',
    address: '',
    coupon: '',
    iitmCert: false,
    paymentMethod: 'ccavenue'
  });
  const [discount, setDiscount] = useState(0);

  const basePrice = 60000;
  const grandTotal = basePrice - discount;

  const steps = [
    { num: 1, title: 'Course Summary' },
    { num: 2, title: 'Learner Details (Email id will be your user id)' },
    { num: 3, title: 'Secure Payment' }
  ];

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const applyCoupon = () => {
    if (formData.coupon.toLowerCase() === 'save10') {
      setDiscount(6000);
      alert('Coupon applied! 10% discount');
    } else if (formData.coupon) {
      alert('Invalid coupon code');
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Payment processing... (Demo only)');
  };

  return (
    <>
      <div>
        <Breadcrumb />
      </div>
      
      <div className="w-full md:mx-auto md:py-10 2xl:px-32 xl:px-20 lg:px-10 p-5 career-bg_grad">
        <h1 className="text-3xl font-medium text-shadow-black mb-1.5 text-center z-50 relative text-white">Cart</h1>
      </div> 
<section className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-[#f4f7ff] lg:pb-0">
    
    {/* Enrollment Form Section */}
    <div className="grid grid-cols-1 gap-4">
  <div className="col-span-1">
     <div className="grid grid-cols-3 lg:gap-24 gap-8">
            <div className="col-span-2">
              <div className="flex justify-between items-start max-w-xl mx-auto mb-5">
                {steps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div className="flex items-center w-full">
                      {index > 0 && (
                        <div className={`h-[1px] flex-1 ${
                          currentStep > index ? 'bg-black' : 'bg-gray-300'
                        }`} />
                      )}
                      <div className={`w-15 h-15 rounded-full flex items-center justify-center text-base mx-2 shadow-lg ${
                        currentStep === step.num 
                          ? 'bg-black text-white' 
                          : currentStep > step.num
                          ? 'bg-black text-white'
                          : 'bg-white  text-gray-800'
                      }`}>
                        {step.num}
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`h-[1px] flex-1 ${
                          currentStep > step.num ? 'bg-black' : 'bg-gray-300'
                        }`} />
                      )}
                    </div>
                    <span className={`mt-3 text-sm font-semibold text-center ${
                      currentStep === step.num ? 'text-gray-900' : 'text-gray-800'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
              <div>
                {/* Step 1: Course Summary */}
                {currentStep === 1 && (
                  <div className="space-y-6 bg-white rounded-lg shadow overflow-hidden p-5">
                    {/* Course Table */}
                    <div className="overflow-hidden">
                      <table className="w-full">
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
                                Data Science Certification Course in Bangalore with Placement Assistance
                              </p>
                              <p className="text-sm text-gray-700">
                                <strong>Batch Date:</strong> 05-Jan-2026 12:00 PM-2:00 PM
                              </p>
                              <label className="flex items-center mt-3 text-sm cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="iitmCert"
                                  checked={formData.iitmCert}
                                  onChange={handleInputChange}
                                  className="mr-2 w-4 h-4 text-blue-600"
                                />
                                <span className="text-blue-600 font-medium">With IITM Pravartak Certification</span>
                              </label>
                            </td>
                            <td className="px-3 py-2 text-gray-900 text-sm text-center">Live Virtual</td>
                            <td className="px-3 py-2 text-gray-900 text-sm text-center">1</td>
                            <td className="px-3 py-2 text-gray-900 font-semibold text-sm text-center">₹ {basePrice.toLocaleString()}</td>
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

                      <div className="text-right space-y-2">
                        {discount > 0 && (
                          <>
                            <p className="text-gray-700">Discount: <span className="font-semibold text-green-600">- ₹ {discount.toLocaleString()}</span></p>
                            <p className="text-gray-700">Total: <span className="font-semibold">₹ {basePrice.toLocaleString()}</span></p>
                          </>
                        )}
                        {!discount && (
                          <p className="text-gray-700 text-sm">Total: <span>₹ {basePrice.toLocaleString()}</span></p>
                        )}
                        <p className=" text-sm text-gray-700">
                          Grand Total: <span>₹ {grandTotal.toLocaleString()}</span>
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
                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                      <div>
                        <input
                          type="text"
                          name="userName"
                          value={formData.userName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-b-2 bg-transparent focus:outline-none border-gray-300 focus:border-gray-600"
                          placeholder="Name *"
                        />
                      </div>

                      <div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-b-2 bg-transparent focus:outline-none border-gray-300 focus:border-gray-600"
                          placeholder="E-mail *"
                        />
                      </div>

                      <div>
                        <div className="flex gap-2 border-b-2 border-gray-300 focus-within:border-gray-600">
                          <div className="flex items-center px-2">
                            <span className="text-2xl">🇮🇳</span>
                          </div>
                          <input
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleInputChange}
                            maxLength={10}
                            className="flex-1 px-2 py-3 bg-transparent focus:outline-none"
                            placeholder="Mobile No *"
                          />
                        </div>
                      </div>

                      <div>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-b-2 bg-transparent focus:outline-none border-gray-300 focus:border-gray-600"
                          placeholder="Full Address"
                        />
                      </div>
                    </div>

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
                    <div className="flex justify-center py-12">
                      <div className="relative">
                        <div className="border-2 border-green-500 rounded-lg p-12 bg-white">
                          <div className="text-center">
                            <span className="text-blue-500 font-bold text-4xl">CC</span>
                            <span className="text-gray-800 font-normal text-3xl">Avenue</span>
                            <sup className="text-gray-500 text-sm">®</sup>
                          </div>
                        </div>
                        <div className="absolute -top-3 -right-3 bg-green-500 rounded-full w-10 h-10 flex items-center justify-center">
                          <RiCheckFill className="text-white" size={24} strokeWidth={3} />
                        </div>
                      </div>
                    </div>

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
                        className="uppercase px-6 py-2.5 cursor-pointer bg-black text-sm text-white rounded hover:bg-gray-800 transition-colors font-medium"
                      >
                        Submit
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