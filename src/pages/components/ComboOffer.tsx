"use client";
import React, { useEffect } from "react";

interface ComboItem {
  name: string;
  mrp: string;
  discount_price: string;
  currency: string;
  enroll_url: string;
}

interface ComboOfferData {
  title: string;
  items: ComboItem[];
}

interface ComboOfferProps {
  closeModal: () => void;
  data?: ComboOfferData | null;   // ÃƒÂ¢Ã¢â‚¬Â Ã‚Â optional + nullable
  courseSlug?: string;
}

const ComboOffer: React.FC<ComboOfferProps> = ({ closeModal, data }) => {
  if (!data) return null;

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

  return (
    <div
      className="fixed inset-0 bg-[#000000cc] flex justify-center items-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
         <div className="relative flex justify-end">
          <button
            className="text-2xl cursor-pointer absolute w-10 h-10 -top-8 -end-8 bg-[#171717] text-white rounded-full flex items-center justify-center hover:bg-[#2a2a2a] transition"
            onClick={closeModal}
          >
             ×
          </button>
        </div>

        {/* Title */}
        <h3 className="text-center text-xl font-semibold mb-6 uppercase">
          {data.title || "Combo Offer"}
        </h3>

        {/* Combo List */}
        <div className="space-y-6">
          {data.items?.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b border-gray-200 pb-4"
            >
              {/* Combo Title */}
              <div>
                <p className="font-semibold text-[16px] mb-2">{item.name}</p>

                {/* Prices */}
                 <div className="flex gap-10 relative">
                    <h6 className="dis-amt font-bold text-lg">
                     <span className='disam'></span> {item.currency} {item.mrp}
                    </h6>
                    <h6 className="font-bold text-lg text-[#ea9b0a]">
                         {item.currency} {item.discount_price}
                      </h6>
                  </div>
              </div>

              {/* Enroll Button */}
              {item.enroll_url && (
                <a
                  href={item.enroll_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0071BC] hover:bg-[#005f8c] text-white text-sm font-semibold rounded-md px-4 py-2 transition"
                >
                  Enroll Now
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComboOffer;
