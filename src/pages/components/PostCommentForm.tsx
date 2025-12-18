"use client"
import React from "react"

export default function PostComment () { 
    return(
        <>
        <div className="mt-10">
        <h2 className="text-xl font-semibold mb-2">Post Comments</h2>
    <div className="w-12 h-1 bg-orange-500 mb-4 rounded"></div>
        <div className="bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Name *"
            className="border-b border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            required
          />
 

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email *"
            className="border-b border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            required
          /> 

          {/* Subject */}
          <div className="md:col-span-2">
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="border-b border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            />
          </div>
 

          {/* Query */}
          <div className="md:col-span-2">
            <textarea
              name="your_comment"
              placeholder="Your Comments *"
              className="border-b border-gray-200 text-gray-900 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              required
            />
          </div>

          {/* Terms & Submit */}
          <div className="md:col-span-2">
            

            <div className="text-start mt-3">
              <button
                type="submit"
                className="border border-[#0071BC] bg-[#0071BC] hover:bg-[#4ba7de] text-white font-medium text-sm py-2.5 px-5 rounded-lg cursor-pointer"
              >
                Post Comment
              </button>
            </div>
          </div>

        </div>
      </div>
      </div>
        </>
    );
 };