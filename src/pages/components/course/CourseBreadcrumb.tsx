"use client";

import Link from "next/link";
import React from "react";

interface CourseBreadcrumbProps {
  courseName: string;
}

const CourseBreadcrumb: React.FC<CourseBreadcrumbProps> = ({ courseName }) => {
  if (!courseName) return null;

  return (
    <div className="w-full md:mx-auto md:py-3 2xl:px-25 xl:px-20 lg:px-10 p-5">
      <nav aria-label="breadcrumb" className="text-sm">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="text-blue-600">
              Home
            </Link>
          </li>

          <li className="flex items-center">
            <span className="mx-2">/</span>
            <span className="text-gray-500">{courseName}</span>
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default CourseBreadcrumb;
