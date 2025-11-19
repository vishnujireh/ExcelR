"use client";
import React from "react";

interface DateInfo {
  raw: string;
  display: string;
}

interface BatchDate {
  batch_id: number;
  date: DateInfo;
  time: string;
  currency: string;
  amount: string;
  discount_amount: string;
  discount_validity: string;
  enroll_url: string;
  filling_fast: boolean;
}

interface TrainingMode {
  mode: string;
  price_info: {
    currency: string;
    amount: string;
    discount_amount: string;
  };
  benefits_html: string;
  upcoming_dates_all: Record<string, BatchDate[]>;
}

interface ClassScheduleProps {
  type: string; // "Classroom" or "Live Virtual"
  closeModal: () => void;
  modeData: TrainingMode | null;
}

const ClassSchedule: React.FC<ClassScheduleProps> = ({ type, closeModal, modeData }) => {
  const isClassroom = type === "Classroom";

  // Get available months from the API data
  const availableMonths = modeData?.upcoming_dates_all 
    ? Object.keys(modeData.upcoming_dates_all)
    : [];

  const [activeTab, setActiveTab] = React.useState<string>(
    availableMonths[0] || ""
  );

  // Helper function to parse date display
  const parseDateDisplay = (display: string) => {
    // "27th November" -> { day: "27", suffix: "th", month: "November" }
    const match = display.match(/(\d+)(st|nd|rd|th)\s+(\w+)/);
    if (match) {
      return {
        day: match[1],
        suffix: match[2],
        month: match[3]
      };
    }
    return { day: "", suffix: "", month: "" };
  };

  return (
    <div
      className="fixed inset-0 bg-[#000000cc] flex justify-center items-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-5xl"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Schedule */}
          <div className="col-span-1">
            <h4 className="text-md font-semibold mb-4">
              {isClassroom
                ? "Classroom Schedule"
                : "Live Virtual Class Schedule"}
            </h4>

            {/* Tabs */}
            {availableMonths.length > 0 && (
              <div className="flex justify-center flex-wrap gap-4 mt-8 mb-8">
                {availableMonths.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg uppercase font-semibold cursor-pointer text-sm transition ${
                      activeTab === tab
                        ? "bg-[#0071BC] text-white"
                        : "bg-white text-gray-800 border border-gray-300 hover:bg-[#4ba7de] hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            )}

            {/* Schedule Details */}
            <div className="w-full max-w-md mx-auto space-y-4  max-h-[300px] overflow-y-auto">
              {modeData?.upcoming_dates_all[activeTab]?.map((batch) => {
                const dateInfo = parseDateDisplay(batch.date.display);
                
                return (
                  <div 
                    key={batch.batch_id}
                    className="flex items-center justify-between bg-white border-b-2 border-dotted border-gray-200 pb-3"
                  >
                    {/* Date section */}
                    <div className="text-center min-w-[80px]">
                      <span className="clsschdate time-change-wrapper text-2xl font-bold">
                        {dateInfo.day} <sup className="text-sm">{dateInfo.suffix}</sup>
                      </span>
                      <p className="text-[#666] text-sm mt-1">{dateInfo.month}</p>
                      
                    </div>

                    {/* Time section */}
                    <div className="flex-1 text-center px-2">
                      <p className="text-sm font-semibold text-gray-800">{batch.time}</p>
                    </div>

                    {/* Enroll button */}
                    <div className="flex flex-col items-center">
                      <a
                        href={batch.enroll_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#0071BC] hover:bg-[#005f8c] text-white text-sm font-semibold rounded-md px-4 py-1.5 transition"
                      >
                        Enroll Now
                      </a>
                      {batch.filling_fast && (
                        <p className="text-xs text-orange-600 font-medium mt-1">
                          Filling Fast
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Empty state */}
              {(!modeData?.upcoming_dates_all[activeTab] || 
                modeData.upcoming_dates_all[activeTab].length === 0) && (
                <div className="text-center py-8 text-gray-500">
                  No batches available for {activeTab}
                </div>
              )}
            </div>
          </div>

          {/* Right: Benefits */}
          <div className="col-span-1">
            <h4 className="text-md font-semibold mb-4">Benefits</h4>
            {modeData?.benefits_html ? (
              <div
                className="benfgtlist text-[#666666] text-sm"
                dangerouslySetInnerHTML={{ __html: modeData.benefits_html }}
              />
            ) : (
              <ul className="benfgtlist text-[#666666] text-sm mt-3.5">
                <li>*As per Govt of India Covid regulations</li>
                <li>Only 40% of Occupancy will be available for Classroom</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassSchedule;