"use client";

import { useState, useEffect, useRef } from "react";
import { RiCloseFill } from "react-icons/ri";
import { MdOutlineCategory } from "react-icons/md";
import Sidebar from "./Sidebar";

interface BlogCategoryProps {
  activeCategory?: string | string[];
  activeSubcategory?: string | string[];
}

export default function BlogCategory({
  activeCategory,
  activeSubcategory,
}: BlogCategoryProps) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  /* Close on outside click */
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={panelRef} className="fixed bottom-4 right-4 z-[999] flex flex-col items-end gap-3">

      {/* ── Category panel (slides up from button) ── */}
      <div
        className={`
          w-72
          bg-white
          rounded-2xl
          shadow-2xl
          border border-gray-100
          overflow-hidden
          transition-all duration-300 ease-out
          origin-bottom-right
          ${open
            ? "opacity-100 block scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 hidden scale-95 translate-y-4 pointer-events-none"}
        `}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{
            background:
              "linear-gradient(135deg, #134792 0%, #2160c1 60%, #4d89d9 100%)",
          }}
        >
          <div className="flex items-center gap-2">
            <MdOutlineCategory size={18} className="text-white/90" />
            <span className="text-sm font-semibold text-white tracking-wide">
              Blog Categories
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <RiCloseFill size={20} />
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100" />

        {/* Categories list */}
        <div className="overflow-y-auto max-h-[60vh] py-2 px-1 custom-scroll">
          <Sidebar
            activeCategory={activeCategory}
            activeSubcategory={activeSubcategory}
          />
        </div>
      </div>

      {/* ── Floating trigger button ── */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        title="Blog Categories"
        className={`
          w-14 h-14
          rounded-full
          shadow-lg
          flex items-center justify-center
          cursor-pointer
          transition-all duration-300
          ${open
            ? "bg-[#134792] rotate-0 scale-110"
            : "bg-[#FFAA33] hover:bg-[#e59820] hover:scale-105"}
        `}
      >
        {open ? (
          <RiCloseFill size={22} className="text-white" />
        ) : (
          <MdOutlineCategory size={22} className="text-white" />
        )}
      </button>
    </div>
  );
}
