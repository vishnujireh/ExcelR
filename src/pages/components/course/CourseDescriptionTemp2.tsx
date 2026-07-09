"use client";

import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  HTMLReactParserOptions,
  Element,
} from "html-react-parser";

import parse from "html-react-parser";

import { CourseData } from "@/redux/slices/courseSlice";

import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination, Autoplay } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";

import {
  RiArrowDownSLine,
  RiArrowUpSLine,
} from "react-icons/ri";

import Image from "next/image";
import { RiPlayFill } from "react-icons/ri";

interface CourseDurationProps {
  data: CourseData;
}


interface ProjectType {
  id: number;
  title: string;
  description: string;
  image: string;
  bg: string;
  activeBorder: string;
  activeText: string;
}
interface AlumniVideoType {
  image: string;
  videoUrl: string;
  title: string;
}

const projectStyles = [
  {
    bg: "bg-blue-50",
    activeBorder: "border-blue-500",
    activeText: "text-blue-600",
  },
  {
    bg: "bg-orange-50",
    activeBorder: "border-orange-500",
    activeText: "text-orange-600",
  },
  {
    bg: "bg-green-50",
    activeBorder: "border-green-500",
    activeText: "text-green-600",
  },
  {
    bg: "bg-purple-50",
    activeBorder: "border-purple-500",
    activeText: "text-purple-600",
  },
  {
    bg: "bg-pink-50",
    activeBorder: "border-pink-500",
    activeText: "text-pink-600",
  },
];

// ===============================
// CAPSTONE COMPONENT
// ===============================

function renderCMSContent(
  html: string,
  customOptions?: HTMLReactParserOptions
) {
  return parse(html, {
    replace: (node: any) => {

      // ======================================
      // CUSTOM COMPONENTS
      // ======================================

      if (customOptions?.replace) {
        const customResult =
          // `replace` expects two arguments (node, index) — pass a default index
          customOptions.replace(node, 0);

        if (customResult) {
          return customResult;
        }
      }

      // ======================================
      // IMAGE CONVERSION
      // ======================================

      if (
        node.name === "img" &&
        node.attribs?.src
      ) {

        const {
          src,
          alt = "",
          width,
          height,
          class: className = "",
        } = node.attribs;

        const w = width
          ? Number(width)
          : null;

        const h = height
          ? Number(height)
          : null;

        // ✅ Detect icons / small images

        const isIcon =
          className.includes("icon") ||
          src.includes("icon") ||
          (w !== null && w <= 100) ||
          (h !== null && h <= 100);

        // ✅ Keep icons normal

        if (isIcon) {
          return (
            <img
              src={src}
              alt={alt}
              width={w ?? undefined}
              height={h ?? undefined}
              loading="lazy"
              className={className}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          );
        }

        // ✅ Convert large images

        return (
          <Image
            src={src}
            alt={alt}
            width={w ?? 650}
            height={h ?? 350}
            sizes="(max-width: 640px) 100vw,
                   (max-width: 1024px) 50vw,
                   650px"
            quality={70}
            loading="lazy"
            className={`mx-auto rounded-lg ${className}`}
          />
        );

      }

      return undefined;
    },
  });
}

function CapstoneProjects({
  projects,
}: {
  projects: ProjectType[];
}) {
  const [activeProject, setActiveProject] =
    useState(projects[0]);

  return (
    <section>
      <div className="max-w-7xl mx-auto">

        {/* ACTIVE CARD */}

        <div className="max-w-4xl mx-auto">
          <div
            className={`rounded-xl border ${activeProject.activeBorder} ${activeProject.bg} p-6 mb-8 transition-all`}
          >
            <div className="flex items-center gap-3 mb-3">

              <div className="w-13 h-13 p-3 rounded-lg flex items-center justify-center shadow-md overflow-hidden">

                {activeProject.image && (
                  <Image
                    src={activeProject.image}
                    alt={activeProject.title}
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                )}

              </div>

              <h3 className="md:text-lg text-sm font-semibold">
                {activeProject.title}
              </h3>

            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              {activeProject.description}
            </p>

            <div
              className={`text-right text-sm font-semibold mt-4 flex items-center gap-1 justify-end ${activeProject.activeText}`}
            >
              {activeProject.id}/{projects.length}

              <RiArrowUpSLine size={18} />
            </div>
          </div>
        </div>

        {/* SLIDER */}

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          spaceBetween={16}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 4 },
          }}
          onSlideChange={(swiper) => {
            setActiveProject(
              projects[swiper.realIndex]
            );
          }}
        >
          {projects.map((project) => (
            <SwiperSlide
              key={project.id}
              className="h-auto"
              style={{
                paddingBottom: "50px",
              }}
            >
              <button
                onClick={() =>
                  setActiveProject(project)
                }
                className={`w-full h-full text-left rounded-xl p-4 border transition flex flex-col justify-between
                  ${
                    activeProject.id === project.id
                      ? `${project.activeBorder} bg-white shadow-md`
                      : `border-transparent ${project.bg}`
                  }
                `}
              >
                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 flex items-center justify-center overflow-hidden">

                    {project.image && (
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={40}
                        height={40}
                        className="w-full h-full object-contain"
                      />
                    )}

                  </div>

                  <p className="md:text-lg text-base font-medium">
                    {project.title}
                  </p>

                </div>

                <div
                  className={`text-right text-sm font-semibold flex items-center gap-1 justify-end mt-4 ${project.activeText}`}
                >
                  {project.id}/{projects.length}

                  <RiArrowDownSLine size={18} />
                </div>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

function AlumniVideosSlider({
  videos,
}: {
  videos: AlumniVideoType[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  return (
    <section className="overflow-hidden w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 slidervbp relative slider-ful-hgt">
      <h2 className="text-center md:text-3xl text-xl font-semibold md:mb-12 mb-4">Hear From Our Alumni</h2>
      <Swiper
        modules={[Autoplay, Pagination]}
        onSwiper={(swiper) => {
    swiperRef.current = swiper;
  }}
        slidesPerView={1}
        spaceBetween={20}
        centeredSlides={true}
        loop={videos.length > 3}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
          setPlayingIndex(null); // stop video when slide changes
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="our-alumni-swiper"
      >

        {videos.map((video, index) => {

          const isCenter = index === activeIndex;
          const isPlaying = playingIndex === index;

          return (
            <SwiperSlide
              key={index}
              className="testimonial-slide"
            >

              <div
                className={`relative overflow-hidden rounded-3xl shadow-xl aspect-video bg-black transition-all duration-300 ${
                  isCenter ? "scale-100" : "scale-95"
                }`}
              >

                {isPlaying ? (

  <div className="absolute inset-0">

    <iframe
      src={`${video.videoUrl}?autoplay=1`}
      title={video.title}
      className="w-full h-full"
      allow="autoplay; encrypted-media"
      allowFullScreen
    />

    <button
      onClick={() => {
        setPlayingIndex(null);

        // restart slider autoplay
        swiperRef.current?.autoplay.start();
      }}
      className="absolute top-3 right-3 z-30 bg-white rounded-full px-3 py-1 cursor-pointer"
    >
      ✕
    </button>

  </div>

) : (

                  <>
                    <Image
                      src={video.image}
                      alt={video.title}
                      fill
                      className="object-cover"
                    />

                    {!isCenter && (
                      <div className="absolute inset-0 bg-black/70 z-10" />
                    )}
 {/* {isCenter && (
                      <div className="absolute inset-0 bg-black/50 z-10" />
                    )} */}
                    {isCenter && video.videoUrl && (
                      <button
                        onClick={() => {
  setPlayingIndex(index);

  // stop swiper autoplay
  swiperRef.current?.autoplay.stop();
}}
                        className="absolute inset-0 flex items-center justify-center z-20"
                      >
                        <div className="w-14 h-14 rounded-full bg-[#155dfc] flex items-center justify-center shadow-xl cursor-pointer">
                          <RiPlayFill
                            size={28}
                            className="text-white"
                          />
                        </div>
                      </button>
                    )}
                  </>
                )}

                {!isCenter && (
                     <div className="absolute bottom-0 left-0 right-0  p-4 z-20">
                  <p className="text-white text-base font-semibold text-center">
                    {video.title}
                  </p>
                </div>
                )}
               

              </div>

            </SwiperSlide>
          );
        })}

      </Swiper>
    </section>
  );
}
export default function CourseDuration({
  data,
}: CourseDurationProps) {

  const wrapperRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {

    const wrapper = wrapperRef.current;

    if (!wrapper) return;

    // =========================
    // TABS
    // =========================

    const tabGroups =
      wrapper.querySelectorAll(
        "[data-tabs-toggle]"
      );

    tabGroups.forEach((group) => {

      const buttons =
        group.querySelectorAll("button");

      buttons.forEach(
        (button, index) => {

          button.addEventListener(
            "click",
            () => {

              const currentSection =
                group.parentElement
                  ?.parentElement;

              if (!currentSection)
                return;

              const panels =
                currentSection.querySelectorAll(
                  '[role="tabpanel"]'
                );

              buttons.forEach((btn) => {

                btn.classList.remove(
                  "border-blue-600",
                  "text-blue-600"
                );

                btn.classList.add(
                  "border-transparent"
                );

                btn.setAttribute(
                  "aria-selected",
                  "false"
                );

              });

              panels.forEach(
                (panel) => {
                  panel.classList.add(
                    "hidden"
                  );
                }
              );

              button.classList.add(
                "border-blue-600",
                "text-blue-600",
                "bg-blue-50"
              );

              button.classList.remove(
                "border-transparent"
              );

              button.setAttribute(
                "aria-selected",
                "true"
              );

              if (panels[index]) {
                panels[
                  index
                ].classList.remove(
                  "hidden"
                );
              }

            }
          );

        }
      );

      (
        buttons[0] as HTMLElement
      )?.click();

    });

  }, [data]);

  const contentSections =
    data?.sticky_section
      ?.content_sections || [];

  // ===============================
  // PARSER OPTIONS
  // ===============================

  const options: HTMLReactParserOptions = {
  replace: (domNode) => {

    // =====================================
    // CAPSTONE PROJECTS
    // =====================================

    if (
      domNode instanceof Element &&
      domNode.attribs?.class?.includes(
        "capstone-projects"
      )
    ) {

      const itemBoxes =
        domNode.children.filter(
          (child: any) =>
            child.attribs?.class?.includes(
              "item-box"
            )
        );

      const projects: ProjectType[] =
        itemBoxes.map(
          (item: any, index: number) => {

            const style =
              projectStyles[
                index %
                  projectStyles.length
              ];

            const h3 =
              item.children.find(
                (c: any) =>
                  c.name === "h3"
              );

            const p =
              item.children.find(
                (c: any) =>
                  c.name === "p"
              );

            const img =
              item.children.find(
                (c: any) =>
                  c.name === "img"
              );

            return {
              id: index + 1,
              title:
                h3?.children?.[0]
                  ?.data || "",
              description:
                p?.children?.[0]
                  ?.data || "",
              image:
                img?.attribs?.src || "",
              ...style,
            };

          }
        );

      return (
        <CapstoneProjects
          projects={projects}
        />
      );
    }

    // =====================================
    // ALUMNI VIDEOS SLIDER
    // =====================================

    if (
      domNode instanceof Element &&
      domNode.attribs?.class?.includes(
        "our-alumni-videos"
      )
    ) {

      const alumniBoxes =
        domNode.children.filter(
          (child: any) =>
            child.attribs?.class?.includes(
              "aluni-box"
            )
        );

      const videos =
        alumniBoxes.map((box: any) => {

          let image = "";
          let videoUrl = "";
          let title = "";

          const walk = (node: any) => {

             if (
    node.name === "img" &&
    node.attribs?.src
  ) {
    image = node.attribs.src;
  }

  if (
    node.name === "a" &&
    node.attribs?.href
  ) {
    videoUrl = node.attribs.href;
  }

 if (
  node.name === "p" &&
  node.attribs?.class?.includes("video-title")
) {
  title = node.children
    ?.map((child: any) => child.data || "")
    .join("")
    .trim();
}

            node.children?.forEach(
              walk
            );
          };

          walk(box);

          return {
            image,
            videoUrl,
            title,
          };
        });

      return (
  <AlumniVideosSlider
    videos={videos}
  />
);
    }

    return undefined;
  },
};

  if (contentSections.length === 0) {
    return (
      <div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5">
        <p className="text-gray-500">
          No sticky content available.
        </p>
      </div>
    );
  }

  return (
    <div ref={wrapperRef}>
      {contentSections.map((section) => (
        <div
          key={section.id}
          className={`mb-6 ${
            section.background_class || ""
          }`}
        >
          {renderCMSContent(
            section.content_html ?? "",
            options
          )}
        </div>
      ))}
    </div>
  );
}