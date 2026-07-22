import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchCategoryBlogsCount,
  SidebarCategory,
} from "@/redux/slices/blogSlice";
import Link from "next/link";
import {
  RiArrowDownSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import { MdOutlineCategory } from "react-icons/md";


export default function HeroBanner() {
  const dispatch = useDispatch<AppDispatch>();

  const [catOpen, setCatOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const sidebarCategories = useSelector(
    (state: RootState) => state.blogs.sidebarCategories
  );
  const [visibleCategories, setVisibleCategories] = useState<SidebarCategory[]>([]);

  /* Filter categories that have at least one blog */
  useEffect(() => {
    if (!sidebarCategories.length) return;
    const check = async () => {
      const results = await Promise.all(
        sidebarCategories.map(async (cat) => {
          try {
            const res = await dispatch(fetchCategoryBlogsCount(cat.baseurl)).unwrap();
            return { ...cat, hasBlogs: res.hasBlogs };
          } catch {
            return { ...cat, hasBlogs: false };
          }
        })
      );
      setVisibleCategories(results.filter((c) => c.hasBlogs));
    };
    check();
  }, [sidebarCategories, dispatch]);

  /* Close dropdown on outside click */
  useEffect(() => {
    if (!catOpen) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCatOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [catOpen]);



  return (
    <section
      className="relative w-full"
      style={{
        background:
          "linear-gradient(160deg,#134792 0%,#1a5aab 40%,#2160c1 75%,#4d89d9 100%)",
      }}
    >
      {/* Grid overlay — overflow-hidden here, NOT on the section, so dropdown panel isn't clipped */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.055]">
          <defs>
            <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M48 0L0 0 0 48" fill="none" stroke="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative mx-auto w-full px-4 sm:px-8 pt-6 pb-10 sm:pt-14 sm:pb-36 flex flex-col items-center text-center">

        {/* Badge */}
        <div className="mb-4 rounded-full px-4 py-1.5 bg-white/10 text-white text-xs font-medium tracking-wide">
          Our Blog
        </div>

        {/* Title */}
        <h1 className="text-white font-bold text-2xl md:text-4xl mb-2 md:mb-4">
          Resources and insights
        </h1>

        {/* Subtitle */}
        <p className="text-white/65 max-w-xl mb-6 text-sm md:text-base">
          The latest industry news, interviews, technologies, and resources — curated for you.
        </p>

        {/* Main content block — max width container */}
        <div className="w-full max-w-2xl flex flex-col gap-4">


          {/* ── Category Dropdown — both mobile & desktop ── */}
          <div ref={dropdownRef} className="relative w-full text-left">

            {/* Trigger */}
            <button
              onClick={() => setCatOpen((p) => !p)}
              className="
                w-full flex items-center justify-between
                px-4 py-3.5
                bg-white/10 hover:bg-white/15
                border border-white/20 hover:border-white/35
                rounded-xl
                text-white transition-all duration-200
                cursor-pointer
              "
            >
              <span className="flex items-center gap-2.5">
                <MdOutlineCategory size={18} className="text-[#FFAA33]" />
                <span className="text-sm font-medium text-white/85">
                  Browse by Category
                </span>
              </span>
              <RiArrowDownSLine
                size={20}
                className={`text-white/50 transition-transform duration-300 ${catOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Panel */}
            <div
              className={`
                absolute top-full left-0 right-0 mt-2 z-50
                bg-white rounded-2xl shadow-2xl border border-gray-100
                overflow-hidden
                transition-all duration-300 ease-out origin-top
                ${catOpen
                  ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"}
              `}
            >
              {/* Panel header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50">
                <MdOutlineCategory size={15} className="text-[#0071BC]" />
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  All Categories
                </span>
                <span className="ml-auto text-[11px] text-gray-400">
                  {visibleCategories.length} topics
                </span>
              </div>

              {/* Category grid */}
              {visibleCategories.length === 0 ? (
                <div className="px-4 py-6 text-center text-sm text-gray-400">
                  Loading categories…
                </div>
              ) : (
                <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                  {visibleCategories.map((cat, i) => (
                    <Link
                      key={cat.id}
                      href={`/blog-category/${cat.baseurl}`}
                      onClick={() => setCatOpen(false)}
                      className="
                        group flex items-center gap-2.5
                        px-3 py-2.5 rounded-xl
                        bg-gray-50 hover:bg-blue-50
                        border border-transparent hover:border-blue-100
                        transition-all duration-150
                      "
                    >
                      {/* Number */}
                      <span className="text-sm font-black text-[#FFAA33] tabular-nums shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {/* Divider */}
                      <span className="w-px h-3.5 bg-gray-200 group-hover:bg-blue-200 shrink-0 transition-colors" />
                      {/* Name */}
                      <span className="text-sm font-semibold text-gray-700 group-hover:text-[#0071BC] truncate transition-colors">
                        {cat.name}
                      </span>
                      {/* Arrow */}
                      <RiArrowRightSLine
                        size={13}
                        className="ml-auto shrink-0 text-gray-300 group-hover:text-[#0071BC] transition-colors"
                      />
                    </Link>
                  ))}
                </div>
              )}

              {/* Footer */}
              {/* <div className="border-t border-gray-100 px-4 py-2.5">
                <Link
                  href="/blogs"
                  onClick={() => setCatOpen(false)}
                  className="text-xs font-semibold text-[#0071BC] hover:text-[#FFAA33] transition-colors"
                >
                  View all blogs →
                </Link>
              </div> */}
            </div>
          </div>


        </div>
      </div>

      {/* Wave — desktop only */}
      <div className="absolute bottom-0 left-0 right-0 hidden md:block">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,55 C360,110 1080,0 1440,55 L1440,120 L0,120 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
