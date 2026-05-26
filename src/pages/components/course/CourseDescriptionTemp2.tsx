"use client";

import React, { useEffect, useRef } from "react";
import { CourseData } from "@/redux/slices/courseSlice";
import parse from "html-react-parser";

interface CourseDurationProps {
  data: CourseData;
}

export default function CourseDuration({
  data,
}: CourseDurationProps) {

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    

  const wrapper = wrapperRef.current;

  if (!wrapper) return;

  // =========================
  // TABS
  // =========================

  const tabGroups = wrapper.querySelectorAll(
    "[data-tabs-toggle]"
  );

  tabGroups.forEach((group) => {

    const buttons =
      group.querySelectorAll("button");

    buttons.forEach((button, index) => {

      button.addEventListener("click", () => {

        // Current tab wrapper
        const currentSection =
          group.parentElement?.parentElement;

        if (!currentSection) return;

        // Find panels only inside current section
        const panels =
          currentSection.querySelectorAll(
            '[role="tabpanel"]'
          );

        // Reset all buttons
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

        // Hide all panels
        panels.forEach((panel) => {
          panel.classList.add("hidden");
        });

        // Active current button
        button.classList.add(
          "border-blue-600",
          "text-blue-600",
        );

        button.classList.remove(
          "border-transparent"
        );

        button.setAttribute(
          "aria-selected",
          "true"
        );

        // Show matching panel
        if (panels[index]) {
          panels[index].classList.remove(
            "hidden"
          );
        }

      });

    });

    // Open first tab automatically
    (buttons[0] as HTMLElement)?.click();

  });

   const accordions = document.querySelectorAll("#accordion13, #accordion14");

    accordions.forEach((accordion) => {
      accordion.addEventListener("click", (event) => {
        if ((event.target as HTMLElement).tagName.toLowerCase() === "summary") {
          const details = (event.target as HTMLElement).parentNode as HTMLElement;
          accordion.querySelectorAll("details").forEach((el) => {
            if (el !== details) el.removeAttribute("open");
          });
        }
      });
    });

    return () => {
      accordions.forEach((accordion) => {
        accordion.replaceWith(accordion.cloneNode(true));
      });
    };

}, [data]);

  const contentSections =
    data?.sticky_section?.content_sections || [];

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
          {parse(section.content_html ?? "")}
        </div>
      ))}
    </div>
  );
}