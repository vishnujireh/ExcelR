"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOurClients } from "../../redux/slices/ourClientsSlice";
import { RootState, AppDispatch } from "../../redux/store";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

export default function OurClients({ title = "Our Clients" }: { title?: string }) {
  const dispatch = useDispatch<AppDispatch>();

  // ✅ Correct state key
  const { data, loading } = useSelector(
    (state: RootState) => state.OurClients
  );

  useEffect(() => {
    dispatch(fetchOurClients());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  if (!data || data.length === 0) return <>nodata</>;

  return (
    <div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 slidervbp"> <div className="text-center mb-10"> 
    <h2 className="text-2xl font-bold mb-1 text-center">{title}</h2>
    </div>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        navigation
        autoplay={{ delay: 2500 }}
        loop
        className="mySwiper"
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          480: { slidesPerView: 2, spaceBetween: 15 },
          640: { slidesPerView: 3, spaceBetween: 20 },
          768: { slidesPerView: 4, spaceBetween: 20 },
          1024: { slidesPerView: 6, spaceBetween: 20 },
          1280: { slidesPerView: 8, spaceBetween: 20 },
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
    </div>
  );
}
