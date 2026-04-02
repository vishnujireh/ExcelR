"use client";
import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeConfig, fetchHomeCourses } from "@/redux/slices/homeSlice";
import { RootState  } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import { FaStar } from "react-icons/fa";
import { RiCheckFill } from "react-icons/ri";


  

export default function OurCourses() {
  const dispatch = useDispatch<any>();
  const { config, courses} = useSelector ((state: RootState) => state.home);

  useEffect(() => {
    dispatch(fetchHomeConfig());
  }, [dispatch]);

  useEffect(() => {
    if (!config.data) return;
    if (config.data.our_courses === "1"){
      dispatch(fetchHomeCourses());
    }
  }, [config.data, dispatch]);

  if(config.data?.our_courses !== "1") return null; // hide section if config is 0

    return (
        <div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5">
            <div className="text-center mb-5">
                <h2 className="text-2xl font-bold mb-1 text-center">Our Courses</h2>
            </div>

          {courses.loading &&  <p className="text-center text-gray-500">Loading courses...</p>}

            <div className="grid md:grid-cols-4 gap-4">
{courses.data.map((course, idx) => (
          <div
            key={idx}
            className="bg-white shadow hover:shadow-lg transition duration-300 overflow-hidden"
          >
            <Link href={course.url} className="block">
            {/* Image */}
            <div className="relative w-full aspect-[16/9]">
              <Image
                src={course.image}
                alt={course.course_name}
                fill
                className="block"
              />
            </div>
            {/* Content */}
            <div className="p-4 flex flex-col h-full">
             
             <div className="home-popc-content">
               <h3 className="text-md font-semibold md:mt-1 mt-0 mb-2">{course.course_name}</h3>
                 {/* Description (API empty → fallback) */}
                 {parse(course.description)}
              {/* {course.description && (
                 {parse(item.rating_html)}
                <div
                  className="text-sm text-gray-600 mt-2"
                  dangerouslySetInnerHTML={{
                    __html: ,
                  }}
                />
              )} */}

              {/* <ul className="text-sm text-gray-600 mt-2">
                {course.description.map((desc, i) => (
                  <li key={i} className="flex items-center text-black leading-7">
                    <span className="text-[#ff9600] mr-2"><FaCheck  className="text-md font-bold" /></span>
                    {desc}
                  </li>
                ))}
              </ul> */}
              </div>
              {/* Rating */}
              {/* Rating (API HTML) */}
              <div className="pt-4">
                                {course.review_rating && (
                                  <div className="flex gap-1 items-center">
                                    <FaStar className="text-yellow-500" />
                                    <div
                                      className="text-gray-600 text-sm">
                                      {parse(course.review_rating)}
                                    </div>
                                  </div>
                                )}
              
                                 
                              </div>
              
              {/* <div
                className="mt-4"
                dangerouslySetInnerHTML={{
                  __html: course.review_rating,
                }}
              /> */}
              {/* <div className="mt-4 flex items-center justify-between">
                <span className="text-yellow-500 font-semibold flex gap-3 items-center">
                   {renderStars(course.rating)} <span className="text-[#4a4a4a] text-sm font-medium">({course.reviews})</span>
                </span>
              </div> */}
            </div>
            </Link>
          </div>
        ))}
            </div>
        </div>
    );
}