"use client";
import React from "react";
import Image from "next/image";
import { FaCheck, FaStar, FaRegStar, FaStarHalfAlt  } from "react-icons/fa";

const courses = [
  {
    title: "Data Science  Course Training ", 
    description: [
      "11,200+ Professionals Trained",
      "97.3% Placement Record",
      "160 Hours Of Training",
      "Live Projects / Internship",
    ],
    image: "/course-1.svg",
    rating: 4.5,
    reviews: 1000, 
  },
  {
    title: "Amazon Web Services (AWS)", 
    description: [
      "6,200+ Professionals Trained",
      "60 Hours Of Training",
      "Live Projects / Internship",
      "Classroom / Online Training",
      "Assured Placement Support",
    ],
    image: "/course-2.svg",
    rating: 4.5,
    reviews: 3049, 
  },
  {
    title: "Certified Scrum Master (CSM)", 
    description: [
      "4,800+ Professionals Trained",
      "99.98% Pass rate",
      "2 days of Classroom Training",
      "Practice Tests",
      "Certified Scrum Trainers",
    ],
    image: "/course-3.svg",
    rating: 4.5,
    reviews: 2292, 
  },
  {
    title: "PMP® Certification Course Training",
    description: [
      "11,400+ Professional Trained",
      "96.2% Successfully Certified",
      "35 Hours Of Training",
      "3,000+ Practice Questions",
      "Classroom / Online Training",
    ],
    image: "/course-4.svg",
    rating: 4,
    reviews: 5675, 
  },
];

function renderStars(rating: number) { // ✅ Typed as number
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const stars: React.ReactNode[] = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={i} className="text-[#ffc700]" />);
  }

  if (halfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-[#ffc700]" />);
  }

  while (stars.length < 5) {
    stars.push(<FaRegStar key={stars.length} className="text-[#ccc]" />);
  }

  return <div className="flex gap-1">{stars}</div>;
}

export default function OurCourses() {
    return (
        <div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5">
            <div className="text-center mb-5">
                <h2 className="text-2xl font-bold mb-1 text-center">Our Courses</h2>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
{courses.map((course, idx) => (
          <div
            key={idx}
            className="bg-white shadow hover:shadow-lg transition duration-300 overflow-hidden"
          >
            
            {/* Image */}
            <div className="relative w-full aspect-[16/9]">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="block"
              />
            </div>
            {/* Content */}
            <div className="p-4">
              <h3 className="text-md font-semibold md:mt-1 mt-0">{course.title}</h3>
              <div className="home-popc-content">
              <ul className="text-sm text-gray-600 mt-2">
                {course.description.map((desc, i) => (
                  <li key={i} className="flex items-center text-black leading-7">
                    <span className="text-[#ff9600] mr-2"><FaCheck  className="text-md font-bold" /></span>
                    {desc}
                  </li>
                ))}
              </ul>
              </div>
              {/* Rating */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-yellow-500 font-semibold flex gap-3 items-center">
                  {renderStars(course.rating)} <span className="text-[#4a4a4a] text-sm font-medium">({course.reviews})</span>
                </span>
              </div>
            </div>
          </div>
        ))}
            </div>
        </div>
    );
}