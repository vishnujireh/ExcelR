"use client";

import React, { useEffect } from "react";
import { RiMapPin2Line } from "react-icons/ri";
import { useRouter, usePathname } from "next/navigation";
import MakeSchedule from "../MakeSchedule";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchCountries,
  setSelectedCountry,
  clearSelectedCountry,
  setSelectedCity as setInitialCity,
} from "@/redux/slices/countrySlice";
import {
  fetchCities,
  setSelectedCity,
  clearCities,
} from "@/redux/slices/citySlice";
import { 
  fetchRedirectUrl, 
  markRedirectComplete 
} from "@/redux/slices/redirectSlice";

interface CourseBatcheProps {
  slug?: string; // Optional: pass slug as prop
  courseName: string;
}

export default function CourseBatche({
  slug,
  courseName,
}: CourseBatcheProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // This code for only load 3 url in nextjs


  // Redux state
  const { 
    countries, 
    selectedCountry, 
    selectedCity: initialSelectedCity,
    initialCities,
    loading: countryLoading 
  } = useAppSelector((state) => state.country);
  
  const { cities, selectedCity, loading: cityLoading } = useAppSelector(
    (state) => state.city
  );
  
  const { 
    redirectUrl, 
    loading: redirectLoading, 
    shouldRedirect 
  } = useAppSelector((state) => state.redirect);
  const { batchData } = useAppSelector((state) => state.upcomingBatch);

  // Get dynamic slug from pathname or use prop
  const currentSlug = React.useMemo(() => {
    if (slug) return slug;
    // Extract slug from pathname (remove leading slash)
    const pathSlug = pathname?.split('/').pop() || '';
    return pathSlug || 'artificial-intelligence-ai-course-training-in-thane';
  }, [slug, pathname]);

  // Fetch countries on component mount with dynamic slug
  useEffect(() => {
    dispatch(fetchCountries({ slug: currentSlug }));
  }, [dispatch, currentSlug]);

  // Fetch cities when selected country is loaded and cities are empty
  useEffect(() => {
    if (selectedCountry && initialCities.length === 0 && !cityLoading) {
      dispatch(fetchCities({ countryId: selectedCountry.ID, slug: currentSlug }));
    }
  }, [selectedCountry, initialCities, cityLoading, currentSlug, dispatch]);

  // Handle redirect when redirectUrl is available
  useEffect(() => {
    if (shouldRedirect && redirectUrl) {
      // Use Next.js router for client-side navigation
      router.push(`/${redirectUrl}`);
      // Mark redirect as complete
      dispatch(markRedirectComplete());
    }
  }, [shouldRedirect, redirectUrl, router, dispatch]);

  // Handle country selection
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryId = e.target.value;
    
    if (!countryId) {
      dispatch(clearSelectedCountry());
      dispatch(clearCities());
      return;
    }

    const country = countries.find((c) => c.ID === countryId);
    if (country) {
      dispatch(setSelectedCountry(country));
      dispatch(fetchCities({ countryId: countryId, slug: currentSlug }));
    }
  };

  // Handle city selection and trigger redirect
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = e.target.value;
    
    if (!cityId || !selectedCountry) return;

    // Find city from either cities (from city API) or initialCities (from country API)
    const allCities = cities.length > 0 ? cities : initialCities;
    const city = allCities.find((c) => c.ID === cityId);
    
    if (city) {
      dispatch(setSelectedCity(city));
      
      // Trigger redirect with country name, city name, and current slug as course ID
      dispatch(
        fetchRedirectUrl({
          country: selectedCountry.name,
          city: city.name,
          courseId: currentSlug,
        })
      );
    }
  };

  // Get available cities (from city API if country selected, otherwise from initial load)
  const availableCities = React.useMemo(() => {
    return cities.length > 0 ? cities : initialCities;
  }, [cities, initialCities]);

  // Get current selected city ID
  const currentSelectedCityId = React.useMemo(() => {
    return selectedCity?.ID || initialSelectedCity?.ID || '';
  }, [selectedCity, initialSelectedCity]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Only render component if we have batch data with training modes
  if (!batchData || !batchData.training_modes || batchData.training_modes.length === 0) {
    return null;
  }

  return (
    <>
      <div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-[#12aaeb] relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2781c8] via-black/100 via-[40%] to-[#52b7f3]"></div>
        <p className="text-white text-xl text-center font-semibold relative z-10">
          Upcoming Batches
        </p>
        <div className="mt-5 relative z-10">
          <div className="grid md:grid-cols-6 grid-cols-1 gap-6">
            <div className="col-span-1 hidden md:block"></div>
            <div className="col-span-4 bg-white p-5 rounded">
              <div className="grid md:grid-cols-3 grid-cols-1 gap-5 items-center">
                <div className="col-span-1 lg:col-span-1 text-center">
                  <p className="text-md font-semibold">Select Your City</p>
                </div>

                {/* Country Select */}
                <div className="col-span-1 lg:col-span-1 text-center">
                  <div className="relative font-semibold">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                      <RiMapPin2Line className="text-white" />
                    </div>
                    <select
                      className="bg-[#12aaeb] text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
                      onChange={handleCountryChange}
                      value={selectedCountry?.ID || ""}
                      disabled={countryLoading || redirectLoading}
                    >
                      <option value="">
                        {countryLoading ? "Loading..." : "Select Country"}
                      </option>
                      {countries.map((country) => (
                        <option key={country.ID} value={country.ID}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* City Select */}
                <div className="col-span-1 lg:col-span-1 text-center">
                  <div className="relative font-semibold">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                      <RiMapPin2Line className="text-white font-bold" />
                    </div>
                    <select
                      className="bg-[#12aaeb] text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
                      onChange={handleCityChange}
                      value={currentSelectedCityId}
                      disabled={
                        !selectedCountry ||
                        cityLoading ||
                        redirectLoading ||
                        availableCities.length === 0
                      }
                    >
                      <option value="">
                        {cityLoading
                          ? "Loading..."
                          : !selectedCountry
                          ? "Select Country First"
                          : availableCities.length === 0
                          ? "No Cities Available"
                          : "Select City"}
                      </option>
                      {availableCities.map((city) => (
                        <option key={city.ID} value={city.ID}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Loading indicator for redirect */}
              {redirectLoading && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">Redirecting...</p>
                </div>
              )}

              <div className="mt-4">
                <p className="text-sm font-semibold text-center">
                  Can&apos;t find convenient schedule?{" "}
                  <button
                    className="text-[#f1261a] cursor-pointer hover:underline"
                    onClick={openModal}
                  >
                    Click Here
                  </button>
                </p>
              </div>
            </div>
            <div className="col-span-1 hidden md:block"></div>
          </div>
        </div>
       {isModalOpen && (
  <MakeSchedule
    closeModal={closeModal}
    courseName={courseName}
    courseUrl={typeof window !== "undefined" ? window.location.href : ""}
  />
)}
      </div>
    </>
  );
}
