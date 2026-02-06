"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchGallery } from "@/redux/slices/gallerySlice";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Image from "next/image";
import "react-photo-view/dist/react-photo-view.css";
import Breadcrumb from "./components/Breadcrumb";
import { FiSearch } from "react-icons/fi";
import bannerImageUrl from "/public/blog_page.webp";

export default function GalleryPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { images, loading, error } = useSelector(
    (state: RootState) => state.gallery
  );

  useEffect(() => {
    dispatch(fetchGallery());
  }, [dispatch]);

  if (loading) return <p className="p-5">Loading gallery...</p>;
  if (error) return <p className="p-5 text-red-500">{error}</p>;
    return(
        <>
        <div>
        <Breadcrumb />
      </div>
       <div className="w-full md:mx-auto md:py-16 2xl:px-32 xl:px-20 lg:px-10 p-5 relative">
                <div className="hidden md:block absolute inset-0 -z-10">
               <Image
                   src={bannerImageUrl}
                   alt="Enroll Course Banner"
                   fill
                   priority
                   fetchPriority="high"
                   sizes="100vw"
                   className="object-cover -z-10"
                   quality={55}
                 />
                 </div>
                 <div className="hidden md:block absolute inset-0 bg-black/60 z-0" />
         <h1 className="text-3xl font-medium text-shadow-black mb-1.5 text-center uppercase z-50 relative text-white">Gallery</h1>
         </div>
      <section className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5">
       <PhotoProvider
  overlayRender={({ index }) => {
    const flatImages = images.flatMap((g) => [
      { image: g.image, image_title: g.image_title },
      ...g.images
    ]);

    const current = flatImages[index];

    return (
      <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
        <div className="inline-block bg-black/70 text-white text-sm px-4 py-2 rounded">
          {current?.image_title}
        </div>
      </div>
    );
  }}
>
  <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
    {images.map((gallery) => (
      <div key={gallery.gallery_id} className="group">

        {/* MAIN IMAGE */}
        <PhotoView src={gallery.image}>
          <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden shadow cursor-pointer">

            {/* IMAGE */}
            <Image
              src={gallery.image}
              alt={gallery.image_title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* HOVER OVERLAY */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">

              {/* EYE ICON */}
              <div className="bg-black/90 p-3 rounded-full text-white shadow-lg transform scale-75 group-hover:scale-100 transition duration-300">
                <FiSearch size={18} />
              </div>

            </div>
          </div>
        </PhotoView>

        {/* TITLE BELOW IMAGE */}
        {/* <p className="mt-2 text-sm font-medium text-center">
          {gallery.image_title}
        </p> */}

        {/* RELATED IMAGES (LIGHTBOX ONLY) */}
        {gallery.images.map((img, index) => (
          <PhotoView key={index} src={img.image}>
            <span />
          </PhotoView>
        ))}
      </div>
    ))}
  </div>
</PhotoProvider>
      </section>
       
        </>
    );
} 
