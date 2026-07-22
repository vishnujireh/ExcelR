import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchSearchSuggestions, fetchCategoryBlogsCount, SidebarCategory } from "@/redux/slices/blogSlice";
import Link from "next/link";
import {
  RiSearchLine,
  RiMicLine,
  RiFireLine,
  RiArrowDownSLine,
} from "react-icons/ri";

const TRENDING_TOPICS = [
  "Data Science",
  "Machine Learning",
  "Project Management",
  "Tableau",
];

const TAG_TO_CATEGORY: Record<string, string> = {
  "Data Science":       "/blog-category/data-science",
  "Machine Learning":   "/blog-category/machine-learning",
  "Project Management": "/blog-category/project-management",
  "Tableau":            "/blog-category/tableau",
  "Data Analytics":     "/blog-category/data-analytics",
  "Business Analytics": "/blog-category/business-analytics",
};

export default function HeroBanner() {
  const dispatch  = useDispatch<AppDispatch>();
  const router    = useRouter();

  const [searchText, setSearchText] = useState("");
  const [listening, setListening]   = useState(false);
  const recognitionRef = useRef<any>(null);

  const { searchSuggestions, searchLoading } = useSelector(
    (state: RootState) => state.blogs
  );

  // Raw categories from Redux
  const sidebarCategories = useSelector(
    (state: RootState) => state.blogs.sidebarCategories
  );

  // Only categories that actually have blog posts
  const [visibleCategories, setVisibleCategories] = useState<SidebarCategory[]>([]);

  useEffect(() => {
    if (!sidebarCategories.length) return;

    const checkCategories = async () => {
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

    checkCategories();
  }, [sidebarCategories, dispatch]);

  /* ── Voice search ── */
  const startVoice = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported");
      return;
    }
    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous    = false;
    recognition.interimResults = false;
    recognition.lang          = "en-US";
    recognition.onstart  = () => setListening(true);
    recognition.onresult = (e: any) => setSearchText(e.results[0][0].transcript);
    recognition.onend    = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    if (value.length > 1) dispatch(fetchSearchSuggestions(value));
  };

  /* ── Mobile category select ── */
  const handleCategorySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val) router.push(`/blog-category/${val}`);
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg,#134792 0%,#1a5aab 40%,#2160c1 75%,#4d89d9 100%)",
      }}
    >
      {/* Subtle grid overlay */}
      <div className="pointer-events-none absolute inset-0">
        <svg className="absolute inset-0 w-full h-full opacity-[0.055]">
          <defs>
            <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M48 0L0 0 0 48" fill="none" stroke="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative mx-auto w-full px-4 sm:px-8 pt-6 pb-10 sm:pt-16 sm:pb-36 flex flex-col items-center text-center">

        {/* Badge */}
        <div className="mb-5 rounded-full px-4 py-2 bg-white/10 text-white text-sm">
          Our blog
        </div>

        {/* Title */}
        <h1 className="text-white font-semibold md:font-bold text-2xl md:text-4xl md:mb-5 mb-2">
          Resources and insights
        </h1>

        {/* Subtitle */}
        <p className="text-white/70 max-w-xl mb-5 text-sm md:text-base">
          The latest industry news, interviews, technologies, and resources — curated for you.
        </p>

        {/* ── DESKTOP: Search bar + Trending ── */}
        <div className="hidden sm:flex w-full max-w-2xl flex-col relative">

          {/* Search input */}
          <div className="flex gap-3">
            <div className="flex-1 flex items-center gap-2 rounded-xl px-4 py-3 bg-white/10 shadow">
              <RiSearchLine className="text-white/40" size={17} />
              <input
                value={searchText}
                onChange={handleSearchChange}
                placeholder="Search articles..."
                className="flex-1 bg-transparent outline-none text-white text-sm placeholder:text-white/40"
              />
              <span className="w-px h-4 bg-white/20" />
              <button onClick={startVoice} className="relative cursor-pointer">
                {listening && (
                  <span className="absolute inset-0 rounded-full bg-[#FFAA33] opacity-40 animate-ping" />
                )}
                <RiMicLine
                  size={18}
                  className={listening ? "text-[#FFAA33]" : "text-white/50"}
                />
              </button>
            </div>
          </div>

          {/* Search suggestions */}
          {searchText.length > 1 && searchSuggestions.length > 0 && (
            <ul className="absolute mt-12 w-full bg-white rounded-lg shadow-xl z-50 overflow-hidden text-left">
              {searchSuggestions.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/${item.base_url}`}
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {item.value}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {searchLoading && (
            <p className="text-white/70 text-sm mt-2">Searching...</p>
          )}

          {/* Trending Topics */}
          <div className="mt-7 w-full">
            <div className="flex items-center gap-2 mb-3 justify-center">
              <span className="h-px flex-1 max-w-[60px] bg-white/20" />
              <div className="flex items-center gap-1.5">
                <RiFireLine size={13} className="text-[#FFAA33]" />
                <span className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em]">
                  Trending Now
                </span>
              </div>
              <span className="h-px flex-1 max-w-[60px] bg-white/20" />
            </div>

            <div className="flex gap-3 justify-center  pb-1" style={{ scrollbarWidth: "none" }}>
              {TRENDING_TOPICS.map((tag) => (
                <Link
                  key={tag}
                  href={TAG_TO_CATEGORY[tag] || "/blogs"}
                  className="group shrink-0 flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/15 hover:border-white/30 rounded-xl px-4 py-2.5 transition-all duration-200"
                >  <span className="text-white/80 group-hover:text-white text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors">
                    {tag}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── MOBILE: Category dropdown ── */}
        <div className="flex sm:hidden w-full flex-col gap-3 mt-0">
          <p className="text-white text-sm  mb-1">
            Browse by Category
          </p>

          <div className="relative w-full">
            <select
              defaultValue=""
              onChange={handleCategorySelect}
              className="
                w-full appearance-none
                bg-white/10 text-white
                border border-white/25
                rounded-xl px-4 py-3.5
                text-sm font-medium
                focus:outline-none focus:border-white/50
                cursor-pointer
              "
            >
              <option value="" disabled className="text-gray-700 bg-white">
                Select a category…
              </option>
              {visibleCategories.map((cat) => (
                <option
                  key={cat.id}
                  value={cat.baseurl}
                  className="text-gray-800 bg-white"
                >
                  {cat.name}
                </option>
              ))}
            </select>
            <RiArrowDownSLine
              size={20}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60"
            />
          </div>
        </div>

      </div>

      {/* Wave — desktop only */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-screen overflow-hidden hidden md:block">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,55 C360,110 1080,0 1440,55 L1440,120 L0,120 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
