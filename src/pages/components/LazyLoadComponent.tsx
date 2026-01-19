"use client";

import React, { useState, useRef, useEffect } from "react";

interface LazyLoadWithTimeoutProps {
  children: React.ReactNode;
  placeholder?: React.ReactNode;
  delay?: number; // in milliseconds
}

export default function LazyLoadWithTimeout({
  children,
  placeholder = null,
  delay = 25000,
}: LazyLoadWithTimeoutProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
  // ✅ Timeout fallback
  const timer = setTimeout(() => {
    setIsVisible(true);
  }, delay);

  // ✅ IntersectionObserver for scroll
  if (ref.current) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // stop observing
            clearTimeout(timer); // cancel timeout if scroll triggers first
          }
        });
      },
      {
        rootMargin: "200px", // preload a bit before user reaches
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }

  return () => clearTimeout(timer);
}, [delay]);


  return <div ref={ref}>{isVisible ? children : placeholder}</div>;
}
