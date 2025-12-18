"use client";

import React, { useState } from "react";
import { LuPhoneCall, LuSmartphone, LuLifeBuoy } from "react-icons/lu";
import QuickEnquiry from "./QuickEnquiry";

export default function FooterSticky() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [variant, setVariant] = useState<"default" | "callback">("default");
  const [formName, setFormName] = useState("");

  const openModal = (
    type: "default" | "callback",
    name: string
  ) => {
    setVariant(type);
    setFormName(name);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="fixed bottom-0 left-0 w-full bg-[#0b0b0b] shadow-md z-50 hidden md:block">
        <div className="w-full md:mx-auto 2xl:px-25 xl:px-20 lg:px-10 px-5 py-1 flex justify-around items-center">

          {/* DROP A QUERY */}
          <button
            onClick={() =>
              openModal("default", "Drop a Query")
            }
            className="text-white cursor-pointer font-medium text-sm h-10 px-4 rounded-lg flex gap-1.5 items-center"
          >
            <LuLifeBuoy /> Drop a Query
          </button>

          {/* REQUEST CALLBACK */}
          <button
            onClick={() =>
              openModal("callback", "Request a Call back")
            }
            className="text-white cursor-pointer font-medium text-sm h-10 px-4 rounded-lg flex gap-1.5 items-center"
          >
            <LuSmartphone /> Request a Callback
          </button>

          {/* TOLL FREE */}
          <a
            href="tel:18002122121"
            className="text-white font-medium text-sm h-10 px-4 rounded-lg flex gap-1.5 items-center"
          >
            <LuPhoneCall /> Toll Free : 18002122121
          </a>
        </div>

        {/* MODAL */}
        {isModalOpen && (
          <QuickEnquiry
            closeModal={closeModal}
            variant={variant}     // ✅ UI logic
            formName={formName}   // ✅ API logic
          />
        )}
      </div>
    </>
  );
}
