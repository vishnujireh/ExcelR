"use client";
import {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeBlogs, fetchHomeQuizzes, fetchHomeGallery, fetchHomeYoutube } from "@/redux/slices/homeSlice";
import { RootState  } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { RiLinkM, RiSearchLine, RiPlayFill } from "react-icons/ri";
import {FiPlus } from "react-icons/fi";
const tabs = ["Blog", "Free Quizzes", "Gallery", "Webinars", "On Youtube"];
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";



export default function Resources() {
  const dispatch = useDispatch<any>();
  const { blogs, quizzes, gallery, youtube } = useSelector ((state: RootState) => state.home);

  useEffect(() => {
    dispatch(fetchHomeBlogs());
    dispatch(fetchHomeQuizzes());
    dispatch(fetchHomeGallery());
    dispatch(fetchHomeYoutube());
  }, [dispatch]);

    const [activeTab, setActiveTab] = useState(tabs[0]);
    const visibleGallery = gallery.data.galleries.slice(0, 7);
  return (
    <div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-[#F4F7FF]">
      <h3 className="text-2xl font-bold mb-1 text-center">Resources</h3>
      <p className="text-[#666] text-sm leading-7 text-center">Avail our resources like free quizzes, blogs written by industry experts, gallery of our events which would give you a visual treat. Enjoy various course videos from our YouTube channel and also stay abreast of our knowledge sharing webinars, conducted by industry stalwarts.</p>
    <div>
        <div className="flex justify-center flex-wrap space-x-4 mt-8 mb-8">
            {tabs.map((tab) =>(
                <button key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg uppercase font-semibold cursor-pointer text-sm text-[#000]  ${activeTab === tab ? 'bg-[#4593d0] text-white' : 'bg-white text-gray-800 border border-gray-300 hover:bg-[#4ba7de] hover:text-white'}`}>
                    {tab}
                </button>
            ))}
        </div>
        <div> 
            {activeTab === "Blog" && (
                <div className="text-center">
                    <div className="grid md:grid-cols-4 gap-4">
                      
                    {blogs.data.blogs.map((blog, index) =>(
  <div
    key={index}
    className="group bg-white shadow hover:shadow-lg transition duration-300 overflow-hidden relative"
  >
    <div className="relative w-full h-35">
      <Image src={blog.image} alt={blog.title} fill className="block rounded" />
    </div>

    <div className="p-4 hidden group-hover:block absolute rounded w-full h-35 top-0 bg-[#000000cf]">
      <p className="text-left text-white uppercase text-xs font-semibold">
        {blog.title}
      </p>
      <div className="text-center mx-auto mt-2">
        <Link
          href={blog.url}
          className="w-9 h-9 rounded-3xl bg-black mx-auto flex items-center justify-center text-white"
        >
          <RiLinkM className="text-xl" />
        </Link>
      </div>
    </div>
  </div>
))}
{/* 8th static card */}
{blogs.data.read_more && (
  <Link
    href={blogs.data.read_more_url}
    className="bg-white shadow hover:shadow-lg rounded transition duration-300 overflow-hidden relative"
  >
    <div className="relative w-full h-35 flex items-center justify-center">
      <span className="w-12 h-12 border-gray-300 text-gray-400 rounded-3xl border flex items-center justify-center">
        <FiPlus />
      </span>
    </div>
  </Link>
)}
          </div>
                </div>
            )}
            {activeTab === "Free Quizzes" && (
                <div className="text-center">
                   <div className="grid md:grid-cols-4 gap-4">
                    {quizzes.data.map((quiz, index) =>(
                      <Link href={quiz.url} key={index}  className="group bg-white shadow hover:shadow-lg transition duration-300 overflow-hidden relative">
                        <div className="relative w-full h-35">
                          <Image src={quiz.image} alt={quiz.title} fill />
                        </div>
                        <div className="p-4">
                          <h3 className="text-left text-md- font-semibold mb-2">{quiz.title}</h3>
                       <div>
                          <p className="text-left text-sm leading-6 text-[#8b95a3]">{quiz.description}</p>
                        </div>
                        </div>
                      </Link>
                    ))}
                   </div>
                </div>
            )}
            {activeTab === "Gallery" && (
                 <div className="text-center">
    
    <PhotoProvider
  overlayRender={({ index }) => {
    const flatImages = visibleGallery.map((g) => ({
      image: g.main_image,
      image_title: g.title,
    }));

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
      <div className="grid md:grid-cols-4 gap-4">

        {gallery.data.galleries.slice(0, 7).map((item) => (
          <div
            key={item.gallery_id}
            className="group bg-white shadow hover:shadow-lg transition duration-300 overflow-hidden relative"
          >
            
            {/* MAIN IMAGE CLICK → LIGHTBOX */}
            <PhotoView src={item.main_image}>
              <div className="relative w-full h-35 cursor-pointer">
                <Image
                  src={item.main_image}
                  alt={item.title}
                  fill
                  className="block rounded object-cover"
                />
              </div>
            </PhotoView>

            {/* HOVER OVERLAY */}
            <div className="hidden group-hover:flex absolute inset-0 bg-black/80 items-center justify-center gap-3 transition-all duration-300">
              
              {/* VIEW (LIGHTBOX TRIGGER) */}
              <PhotoView src={item.main_image}>
                <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white cursor-pointer">
                  <RiSearchLine className="text-xl" />
                </div>
              </PhotoView>

              {/* EXTERNAL LINK */}
              <Link
                href={item.view_url}
                className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white"
              >
                <RiLinkM className="text-xl" />
              </Link>

            </div>
          </div>
        ))}

      </div>
    </PhotoProvider>
        {gallery.data.read_more && (
          <div className="text-center mt-10">
            <Link
    href={gallery.data.read_more_url}
    className="bg-white shadow hover:shadow-lg rounded transition duration-300 overflow-hidden relative"
  >
    <div className="relative w-full h-35 flex items-center justify-center">
      <span className="w-12 h-12 border-gray-300 text-gray-400 rounded-3xl border flex items-center justify-center">
        <FiPlus />
      </span>
    </div>
  </Link>
          </div>
        )}
  </div>
            )}
            {activeTab === "Webinars" && (
                <div className="text-center"></div>
            )}
            {activeTab === "On Youtube" && (
                 <div className="text-center">
                  <div className="grid md:grid-cols-4 gap-4">
                    {youtube.data.slice(0, 7).map((youtube, index) =>(
                       <div
    key={index}
    className="group bg-white shadow hover:shadow-lg transition duration-300 overflow-hidden relative"
  >
    <div className="relative w-full h-40">
      <Image src={youtube.thumbnail} alt="let" fill className="block rounded" />
    </div>
    <div className="hidden group-hover:flex absolute inset-0 bg-black/80 rounded items-center justify-center transition-all duration-300">
    <div className="text-center mx-auto flex items-center justify-center">
        
        <Link  href={youtube.embed_url}
          className="w-9 h-9 rounded-3xl bg-black  flex items-center justify-center text-white"
        >
          <RiPlayFill className="text-xl" />
        </Link>
      </div>
      </div>
  </div>
                    ))}
                  </div>
                </div>
            )}
        </div>
    </div>
    </div>
  );
}