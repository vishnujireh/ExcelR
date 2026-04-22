"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHomeBlogs,
  fetchHomeQuizzes,
  fetchHomeGallery,
  fetchHomeYoutube,
} from "@/redux/slices/homeSlice";
import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { RiLinkM, RiSearchLine, RiPlayFill } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import { PhotoProvider, PhotoView } from "react-photo-view";

const tabs = ["Blog",  "Gallery",  "On Youtube"];

// "Free Quizzes",
// "Webinars",
/* ------------------ YOUTUBE EMBED HELPER ------------------ */
const toEmbedUrl = (url: string) => {
  if (!url) return "";

  try {
    const parsed = new URL(url);

    if (parsed.hostname === "youtu.be") {
      return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`;
    }

    if (parsed.searchParams.get("v")) {
      return `https://www.youtube.com/embed/${parsed.searchParams.get("v")}`;
    }

    if (url.includes("embed")) return url;

    return "";
  } catch {
    return "";
  }
};

export default function Resources() {
  const dispatch = useDispatch<any>();
  const { blogs, quizzes, gallery, youtube } = useSelector(
    (state: RootState) => state.home
  );

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [modalOpen, setModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  /* ------------------ SAFE DATA ------------------ */
  const blogsData = blogs?.data?.blogs || [];
  const quizzesData = quizzes?.data || [];
  const galleryData = gallery?.data?.galleries || [];
  const youtubeData = youtube?.data || [];

  /* ------------------ API CALLS ------------------ */
  useEffect(() => {
    dispatch(fetchHomeBlogs());
    dispatch(fetchHomeQuizzes());
    dispatch(fetchHomeGallery());
    dispatch(fetchHomeYoutube());
  }, [dispatch]);

  /* ------------------ LOCK SCROLL ------------------ */
  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "auto";
  }, [modalOpen]);

  return (
    <>
      <div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-[#F4F7FF]">
        <h3 className="text-2xl font-bold mb-1 text-center">Resources</h3>
        <p className="text-[#666] text-sm leading-7 text-center">
          Avail our resources like free quizzes, blogs written by industry experts, gallery of our events which would give you a visual treat. Enjoy various course videos from our YouTube channel and also stay abreast of our knowledge sharing webinars, conducted by industry stalwarts.
        </p>

        {/* ------------------ TABS ------------------ */}
        <div className="grid grid-cols-2 md:flex md:flex-wrap gap-3 mt-8 mb-8 justify-center">
  {tabs.map((tab) => (
    <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={`w-full md:w-auto px-4 py-2 rounded-lg uppercase font-semibold text-sm cursor-pointer text-center ${
        activeTab === tab
          ? "bg-[#4593d0] text-white"
          : "bg-white border hover:bg-[#4ba7de] hover:text-white"
      }`}
    >
      {tab}
    </button>
  ))}
</div>

        {/* ------------------ BLOG ------------------ */}
        {activeTab === "Blog" && (
          <div className="grid md:grid-cols-4 gap-4">
            {blogsData.map((blog: any, index: number) => (
              <div
                key={index}
                className="group bg-white shadow hover:shadow-lg relative focus:outline-none"
                tabIndex={0}
              >
                <div className="relative w-full h-35">
                  <Image src={blog.image} alt={blog.title} fill />
                </div>

                <div className="hidden group-hover:block group-active:block group-focus-within:block absolute inset-0 bg-black/80 p-4">
                  <p className="text-white text-xs">{blog.title}</p>
                  <Link
                    href={blog.url}
                    className="mt-2 w-9 h-9 flex items-center justify-center bg-black text-white mx-auto rounded-full"
                  >
                    <RiLinkM />
                  </Link>
                </div>
              </div>
            ))}

            {blogs?.data?.read_more && (
              <Link
                href={blogs.data.read_more_url}
                className="bg-white shadow hover:shadow-lg h-35 rounded transition duration-300 overflow-hidden relative"
              >
                <div className="relative w-full h-35 flex items-center justify-center"> <span className="w-12 h-12 border-gray-300 text-gray-400 rounded-3xl border flex items-center justify-center"> <FiPlus /> </span> </div>
              </Link>
            )}
          </div>
        )}

        {/* ------------------ QUIZZES ------------------ */}
        {activeTab === "Free Quizzes" && (
          <div className="grid md:grid-cols-4 gap-4">
            {quizzesData.map((quiz: any, index: number) => (
              <Link
                key={index}
                href={quiz.url}
                className="bg-white shadow"
              >
                <div className="relative w-full h-35">
                  <Image src={quiz.image} alt={quiz.title} fill />
                </div>
                <div className="p-4">
                  <h3 className="text-md font-semibold md:mb-1">{quiz.title}</h3>
                  <p className="text-sm text-[#666] leading-6">{quiz.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* ------------------ GALLERY ------------------ */}
        {activeTab === "Gallery" && (
          <PhotoProvider>
            <div className="grid md:grid-cols-4 gap-4">
              {galleryData.slice(0, 7).map((item: any) => (
                <div key={item.gallery_id} className="group relative">
                  <PhotoView src={item.main_image}>
                    <div className="relative w-full h-35 cursor-pointer">
                      <Image src={item.main_image} alt={item.title} fill />
                    </div>
                  </PhotoView>

                  <div className="hidden group-hover:flex absolute inset-0 bg-black/80 items-center justify-center gap-2">
                    <PhotoView src={item.main_image}>
                      <div className="w-9 h-9 bg-black text-white flex items-center justify-center rounded-full cursor-pointer">
                        <RiSearchLine />
                      </div>
                    </PhotoView>

                    <Link
                      href={item.view_url}
                      className="w-9 h-9 bg-black text-white flex items-center justify-center rounded-full"
                    >
                      <RiLinkM />
                    </Link>
                  </div>
                </div>
              ))}
              {gallery.data.read_more && ( <div className="text-center"> <Link href={gallery.data.read_more_url} className="bg-white shadow hover:shadow-lg h-35 rounded transition duration-300 overflow-hidden relative" > <div className="relative w-full h-35 flex items-center justify-center"> <span className="w-12 h-12 border-gray-300 text-gray-400 rounded-3xl border flex items-center justify-center"> <FiPlus /> </span> </div> </Link> </div> )}
            </div>
          </PhotoProvider>
        )}

        {/* ------------------ YOUTUBE ------------------ */}
        {activeTab === "On Youtube" && (
          <div className="grid md:grid-cols-4 gap-4">
            {youtubeData.slice(0, 7).map((yt: any, index: number) => (
              <div
                key={index}
                className="group relative bg-white shadow focus:outline-none"
                tabIndex={0}
              >
                <div className="relative w-full h-40">
                  <Image src={yt.thumbnail} alt="" fill />
                </div>

                <div className="hidden group-hover:flex group-active:flex group-focus-within:flex absolute inset-0 bg-black/80 items-center justify-center">
                  <button
                    onClick={() => {
                      const embed = toEmbedUrl(yt.embed_url);
                      if (embed) {
                        setVideoUrl(embed);
                        setModalOpen(true);
                      }
                    }}
                    className="cursor-pointer w-10 h-10 bg-black text-white rounded-full flex items-center justify-center"
                  >
                    <RiPlayFill />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ------------------ MODAL ------------------ */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
          onClick={() => {
            setModalOpen(false);
            setVideoUrl("");
          }}
        >
          <div
            className="relative w-full max-w-4xl m-5 sm:m-0"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setModalOpen(false);
                setVideoUrl("");
              }}
              className="absolute cursor-pointer -top-4 -right-4 bg-orange-500 text-white w-10 h-10 rounded-full"
            >
              ×
            </button>

            <div className="aspect-video bg-black">
              <iframe
                src={videoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
