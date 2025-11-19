"use client";

import React, { useEffect, useState } from "react";

interface StickyHeaderProps {
  sections?: { id: number; label: string; anchor: string }[];
}

export default function StickyHeader({ sections = [] }: StickyHeaderProps) {
  // ✅ Safe initialization — won't crash if sections is empty
  const [active, setActive] = useState<string>(
    sections[0]?.anchor?.replace("#", "") || ""
  );

  useEffect(() => {
    if (!sections.length) return; // prevent running observer when empty

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      {
        root: null,
        rootMargin: "-40px 0px 0px 0px",
        threshold: 0.15,
      }
    );

    sections.forEach((section) => {
      const cleanId = section.anchor?.replace("#", "");
      const el = document.getElementById(cleanId);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (anchor: string) => {
    const cleanId = anchor?.replace("#", "");
    const element = document.getElementById(cleanId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (!sections.length) return null; // ✅ Prevent render when data missing

  return (
    <div className="sticky top-0 bg-white z-20 shadow-md hidden md:block">
      <div className="w-full md:mx-auto 2xl:px-25 xl:px-20 lg:px-10 px-5 flex justify-between items-center">
        <nav>
          <ul className="flex space-x-4">
            {sections.map((section) => {
              const cleanId = section.anchor?.replace("#", "");
              return (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.anchor)}
                    className={`p-3 cursor-pointer border-b-2 transition-colors duration-300 ${
                      active === cleanId
                        ? "text-[#4593d0] font-semibold border-[#4593d0]"
                        : "text-gray-700 border-transparent hover:text-[#4593d0] hover:border-[#4593d0]"
                    }`}
                  >
                    {section.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
