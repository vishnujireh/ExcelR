"use client";

import { CourseData } from "@/redux/slices/courseSlice";
import parse, {
  HTMLReactParserOptions,
  Element,
} from "html-react-parser";
import Image from "next/image";
import { useState } from "react";
import { RiArrowRightLine, RiPlayFill } from "react-icons/ri";

interface CourseClassroomProps {
  data: CourseData;
}

export default function CourseClassroom({
  data,
}: CourseClassroomProps) {

  const [playing, setPlaying] = useState(false);

  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (
        domNode instanceof Element &&
        domNode.attribs?.class?.includes("fa-arrow-right")
      ) {
        return (
          <RiArrowRightLine className="text-gray-600 text-base" />
        );
      }
    },
  };


  if (!data) {
    return (
      <section className="course-banner p-10 text-center bg-gray-100">
        <h1>Course not found</h1>
        <p>The course you are looking for doesn&apos;t exist.</p>
      </section>
    );
  }


  return (
    <>
      <section
        className="
        w-full md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5
        bg-linear-1 from-[#E5EFFF] to-[#ffffff]
        "
      >

        <h2 className="text-3xl font-semibold text-center mb-6">
          Classroom Tour
        </h2>


        <div className="max-w-4xl mx-auto flex justify-center rounded-xl">

          <div className="relative w-full overflow-hidden rounded-3xl">


            {playing ? (

              // Youtube video
              <iframe
                src="https://www.youtube.com/embed/hQo4jYxziBc?autoplay=1"
                title="Classroom Tour"
                className="w-full aspect-video rounded-3xl"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />

            ) : (

              <>
                {/* Background Image */}
                <Image
                  src="/excelrclassrom.png"
                  alt="Classroom"
                  width={1200}
                  height={700}
                  className="w-full aspect-video object-cover rounded-3xl"
                />


                {/* Play Button */}
                <div
                  className="
                  absolute inset-0 flex items-center justify-center
                  "
                >

                  <button
                    onClick={() => setPlaying(true)}
                  >

                    <div className="bg-[#fffaec6e] rounded-full w-24 h-24 md:w-30 md:h-30 flex items-center justify-center">

                      <div className="bg-[#F5EBEB] rounded-full w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">

                        <div
                          className="
                          md:w-14 md:h-14 w-12 h-12 rounded-full 
                          flex items-center justify-center
                          cursor-pointer
                          bg-linear-65 from-[#21B573] to-[#7F56D9]
                          "
                        >

                          <RiPlayFill
                            size={28}
                            className="text-white"
                          />

                        </div>

                      </div>

                    </div>

                  </button>

                </div>

              </>
            )}

          </div>

        </div>

      </section>

      {parse(
        data.course_short_description ?? "",
        options
      )}

    </>
  );
}