import Link from "next/link";
import React from "react";

interface CourseBreadcrumbProps {
  courseName: string;
  category?: string;
}

const CourseBreadcrumb: React.FC<CourseBreadcrumbProps> = ({ courseName, category }) => {
  if (!courseName) return null;

  return (
    <div className="w-full md:mx-auto md:py-3 2xl:px-25 xl:px-20 lg:px-10 p-3">
      <nav aria-label="breadcrumb" className="md:text-sm text-xs">
        <ol className=" items-center space-x-1">
          <li className="inline-block">
            <a href="https://demo3.excelr.com/" className="text-[#0071BC]">
              Home
            </a>
          </li>
           <li className="inline-block">
                <span className="mx-1">/</span>
                <a href="https://demo3.excelr.com/" className="text-[#0071BC]">
                  {category}
                </a>
              </li>
          <li className="inline-block">
            <span className="mx-1">/</span>
            <span className="text-gray-500">{courseName}</span>
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default CourseBreadcrumb;
