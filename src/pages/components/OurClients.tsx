"use client";

import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useDispatch, useSelector } from "react-redux";

import { fetchOurClients } from "../../redux/slices/ourClientsSlice";

import {
  RootState,
  AppDispatch,
} from "../../redux/store";

import Image from "next/image";

import {
  Swiper,
  SwiperSlide,
} from "swiper/react";

import {
  Navigation,
  Autoplay,
} from "swiper/modules";

import {
  RiArrowUpSLine,
  RiArrowDownSLine,
} from "react-icons/ri";

import "swiper/css";
import "swiper/css/navigation";

interface OurClientsProps {
  title?: string;
  isGrid?: boolean;
}

export default function OurClients({
  title = "Our Clients",
  
  isGrid = false,
}: OurClientsProps) {

  const dispatch =
    useDispatch<AppDispatch>();

  const [mounted, setMounted] =
    useState(false);

  const [showAll, setShowAll] =
    useState(false);

  const { data, loading } = useSelector(
    (state: RootState) =>
      state.OurClients
  );

  useEffect(() => {

    dispatch(fetchOurClients());

    setMounted(true);

  }, [dispatch]);

  // =========================
  // INITIAL GRID LIMIT
  // 4 cols × 3 rows = 12
  // =========================

  const initialLimit = 12;

  const visibleData = useMemo(() => {

    if (showAll) return data;

    return data.slice(0, initialLimit);

  }, [data, showAll]);

  if (
    !mounted ||
    loading ||
    !data?.length
  ) {
    return null;
  }

  return (
    <div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 slidervbp">

      {/* TITLE */}

      <div className="text-center mb-10">
        <h2 className={` ${isGrid ? "text-3xl font-semibold" : "text-2xl font-bold"}`}>
         {isGrid ? "Our Alumni Work At" : title}
        </h2>
      </div>

      {/* =========================
          GRID VIEW
      ========================= */}

      {isGrid ? (

        <>
          {/* SMOOTH EXPAND / COLLAPSE */}

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-6">

  {visibleData.map((item) => (

    <div
      key={item.id}
      className="flex justify-center items-center bg-white rounded-xl p-4"
    >
      <div className="relative w-full aspect-[3/1] md:aspect-[6/3]">

        <Image
          src={item.image_url}
          alt={item.name}
          fill
          className="object-contain"
        />

      </div>
    </div>

  ))}

</div>

          {/* VIEW MORE / LESS */}

          {data.length > initialLimit && (

            <div className="flex justify-center mt-8">

              <button
                onClick={() =>
                  setShowAll(!showAll)
                }
                className="flex items-center gap-1 px-6 py-3  text-black font-medium transition-all duration-300 cursor-pointer"
              >
                {showAll ? (
                  <>
                    View Less
                    <RiArrowUpSLine size={20} />
                  </>
                ) : (
                  <>
                    View More
                    <RiArrowDownSLine size={20} />
                  </>
                )}
              </button>

            </div>

          )}
        </>

      ) : (

        /* =========================
            DEFAULT SLIDER VIEW
        ========================= */

        <Swiper
          modules={[
            Navigation,
            Autoplay,
          ]}
          spaceBetween={20}
          navigation
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop
          observer
          observeParents
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            480: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 6,
            },
            1280: {
              slidesPerView: 8,
            },
          }}
        >
          {data.map((item) => (

            <SwiperSlide key={item.id}>

              <div className="flex justify-center items-center">

                <div className="relative w-full aspect-[3/1] md:aspect-[6/3]">

                  <Image
                    src={item.image_url}
                    alt={item.name}
                    fill
                    className="object-contain"
                  />

                </div>

              </div>

            </SwiperSlide>

          ))}
        </Swiper>

      )}

    </div>
  );
}