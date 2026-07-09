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

        <h2 className="md:text-3xl text-xl font-semibold text-center md:mb-6 mb-4">
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

{/* <section class="w-full md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 ">
<div>
<h2 class="text-3xl font-semibold mb-12 text-center">Learning Path</h2>

<div class="hidden lg:flex items-stretch justify-between relative">
<div class="relative flex flex-col items-center flex-1">
<div class="hidden lg:flex items-center justify-center w-full top-6 -right-28 absolute border-t-3 border-dotted border-gray-300"> 
<div class="absolute w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center"><p class="fa fa-arrow-right" aria-hidden="true"></p></div>
</div>

<div class="absolute -top-3 left-[34%] z-20 w-6 h-6 rounded-full bg-[#f59e0b] text-white text-xs font-semibold flex items-center justify-center">1</div>

<div class="relative z-10 w-16 h-16 rounded-md bg-white border-2 border-[#f59e0b] flex items-center justify-center"><img alt="Get Trained" class="w-8" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/get-trained.svg" /></div>

<div class="bg-white rounded-2xl shadow-sm p-5 w-[170px] text-center h-full flex flex-col">
<h3 class="text-[15px] font-bold text-[#0f172a] mb-3">Get Trained</h3>

<p class="text-[12px] leading-5 text-gray-500">Learn from industry experts through structured, hands-on training modules.</p>
</div>
</div>

<div class="relative flex flex-col items-center flex-1">
<div class="hidden lg:flex items-center justify-center w-full top-6 -right-28 absolute border-t-3 border-dotted border-gray-300"> 
<div class="absolute w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center"><p class="fa fa-arrow-right" aria-hidden="true"></p></div>
</div>

<div class="absolute -top-3 left-[34%] z-20 w-6 h-6 rounded-full bg-[#f59e0b] text-white text-xs font-semibold flex items-center justify-center">2</div>

<div class="relative z-10 w-16 h-16 rounded-md bg-white border-2 border-[#f59e0b] flex items-center justify-center"><img alt="Submit Assignments" class="w-8" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026//assignments.svg" /></div>

<div class="bg-white  rounded-2xl shadow-sm p-5 w-[170px] text-center h-full flex flex-col">
<h3 class="text-[15px] font-bold text-[#0f172a] mb-3">Submit Assignments</h3>

<p class="text-[12px] leading-5 text-gray-500">Reinforce your learning by completing and submitting practical assignments.</p>
</div>
</div>

<div class="relative flex flex-col items-center flex-1">
<div class="hidden lg:flex items-center justify-center w-full top-6 -right-28 absolute border-t-3 border-dotted border-gray-300"> 
<div class="absolute w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center"><p class="fa fa-arrow-right" aria-hidden="true"></p></div>
</div>

<div class="absolute -top-3 left-[34%] z-20 w-6 h-6 rounded-full bg-[#f59e0b] text-white text-xs font-semibold flex items-center justify-center">3</div>

<div class="relative z-10 w-16 h-16 rounded-md bg-white border-2 border-[#f59e0b] flex items-center justify-center"><img alt="Projects" class="w-8" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026//guidedprojects.svg" /></div>

<div class="bg-white  rounded-2xl shadow-sm p-5 w-[170px] text-center h-full flex flex-col">
<h3 class="text-[15px] font-bold text-[#0f172a] mb-3">Work on Guided Projects</h3>

<p class="text-[12px] leading-5 text-gray-500">Apply skills on real-world projects with mentor guidance every step.</p>
</div>
</div>

<div class="relative flex flex-col items-center flex-1">
<div class="hidden lg:flex items-center justify-center w-full top-6 -right-28 absolute border-t-3 border-dotted border-gray-300"> 
<div class="absolute w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center"><p class="fa fa-arrow-right" aria-hidden="true"></p></div>
</div>

<div class="absolute -top-3 left-[34%] z-20 w-6 h-6 rounded-full bg-[#f59e0b] text-white text-xs font-semibold flex items-center justify-center">4</div>

<div class="relative z-10 w-16 h-16 rounded-md bg-white border-2 border-[#f59e0b] flex items-center justify-center"><img alt="Certification" class="w-8" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026//certifieddata.svg" /></div>

<div class="bg-white  rounded-2xl shadow-sm p-5 w-[170px] text-center h-full flex flex-col">
<h3 class="text-[15px] font-bold text-[#0f172a] mb-3">Become a Certified Data Analyst</h3>

<p class="text-[12px] leading-5 text-gray-500">Earn an industry-recognised certification upon successful completion.</p>
</div>
</div>

<div class="relative flex flex-col items-center flex-1">
<div class="hidden lg:flex items-center justify-center w-full top-6 -right-28 absolute border-t-3 border-dotted border-gray-300"> 
<div class="absolute w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center"><p class="fa fa-arrow-right" aria-hidden="true"></p></div>
</div>

<div class="absolute -top-3 left-[34%] z-20 w-6 h-6 rounded-full bg-[#f59e0b] text-white text-xs font-semibold flex items-center justify-center">5</div>

<div class="relative z-10 w-16 h-16 rounded-md bg-white border-2 border-[#f59e0b] flex items-center justify-center"><img alt="Placement Assistance" class="w-8" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026//placementassistance.svg" /></div>

<div class="bg-white  rounded-2xl shadow-sm p-5 w-[170px] text-center h-full flex flex-col">
<h3 class="text-[15px] font-bold text-[#0f172a] mb-3">Avail Placement Assistance</h3>

<p class="text-[12px] leading-5 text-gray-500">Get dedicated support for resume building, mock interviews, and job referrals.</p>
</div>
</div>

<div class="relative flex flex-col items-center flex-1">
<div class="absolute -top-3 left-[34%] z-20 w-6 h-6 rounded-full bg-[#f59e0b] text-white text-xs font-semibold flex items-center justify-center">6</div>

<div class="relative z-10 w-16 h-16 rounded-md bg-white border-2 border-[#f59e0b] flex items-center justify-center"><img alt="Job Ready" class="w-8" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026//jobready.svg" /></div>

<div class="bg-white  rounded-2xl shadow-sm p-5 w-[170px] text-center h-full flex flex-col">
<h3 class="text-[15px] font-bold text-[#0f172a] mb-3">Get Job-Ready!</h3>

<p class="text-[12px] leading-5 text-gray-500">Step into your new career with confidence, skills, and a verified credential.</p>
</div>
</div>
</div>

<div class="lg:hidden relative">
<div class="absolute left-7 top-0 bottom-0 border-l-2 border-dotted border-gray-300">&nbsp;</div>

<div class="space-y-10">
<div class="relative flex items-start gap-5">
<div class="relative z-10 flex flex-col items-center">
<div class="absolute -top-2 -left-1 w-6 h-6 rounded-full bg-[#f59e0b] text-white text-xs font-semibold flex items-center justify-center">1</div>

<div class="w-14 h-14 rounded-full bg-white border-2 border-[#f59e0b] flex items-center justify-center shadow-lg"><img alt="graduation" class="w-8" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/get-trained.svg" /></div>
</div>

<div class="flex-1 bg-white  rounded-2xl shadow-sm p-5">
<h3 class="text-[15px] font-bold text-[#0f172a] mb-3">Get Trained</h3>

<p class="text-[12px] leading-5 text-gray-500">Learn from industry experts through structured, hands-on training modules.</p>
</div>
</div>

<div class="relative flex items-start gap-5">
<div class="relative z-10 flex flex-col items-center">
<div class="absolute -top-2 -left-1 w-6 h-6 rounded-full bg-[#f59e0b] text-white text-xs font-semibold flex items-center justify-center">2</div>

<div class="w-14 h-14 rounded-full bg-white border-2 border-[#f59e0b] flex items-center justify-center shadow-lg"><img alt="assignment" class="w-8" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026//assignments.svg" /></div>
</div>

<div class="flex-1 bg-white  rounded-2xl shadow-sm p-5">
<h3 class="text-[15px] font-bold text-[#0f172a] mb-3">Submit Assignments</h3>

<p class="text-[12px] leading-5 text-gray-500">Reinforce your learning by completing and submitting practical assignments.</p>
</div>
</div>

<div class="relative flex items-start gap-5">
<div class="relative z-10 flex flex-col items-center">
<div class="absolute -top-2 -left-1 w-6 h-6 rounded-full bg-[#f59e0b] text-white text-xs font-semibold flex items-center justify-center">3</div>

<div class="w-14 h-14 rounded-full bg-white border-2 border-[#f59e0b] flex items-center justify-center shadow-lg"><img alt="project" class="w-8" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026//guidedprojects.svg" /></div>
</div>

<div class="flex-1 bg-white  rounded-2xl shadow-sm p-5">
<h3 class="text-[15px] font-bold text-[#0f172a] mb-3">Work on Guided Projects</h3>

<p class="text-[12px] leading-5 text-gray-500">Apply skills on real-world projects with mentor guidance every step.</p>
</div>
</div>

<div class="relative flex items-start gap-5">
<div class="relative z-10 flex flex-col items-center">
<div class="absolute -top-2 -left-1 w-6 h-6 rounded-full bg-[#f59e0b] text-white text-xs font-semibold flex items-center justify-center">4</div>

<div class="w-14 h-14 rounded-full bg-white border-2 border-[#f59e0b] flex items-center justify-center shadow-lg"><img alt="certificate" class="w-8" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026//certifieddata.svg" /></div>
</div>

<div class="flex-1 bg-white  rounded-2xl shadow-sm p-5">
<h3 class="text-[15px] font-bold text-[#0f172a] mb-3">Become a Certified Data Analyst</h3>

<p class="text-[12px] leading-5 text-gray-500">Earn an industry-recognised certification upon successful completion.</p>
</div>
</div>

<div class="relative flex items-start gap-5">
<div class="relative z-10 flex flex-col items-center">
<div class="absolute -top-2 -left-1 w-6 h-6 rounded-full bg-[#f59e0b] text-white text-xs font-semibold flex items-center justify-center">5</div>

<div class="w-14 h-14 rounded-full bg-white border-2 border-[#f59e0b] flex items-center justify-center shadow-lg"><img alt="placement" class="w-8" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026//placementassistance.svg" /></div>
</div>

<div class="flex-1 bg-white  rounded-2xl shadow-sm p-5">
<h3 class="text-[15px] font-bold text-[#0f172a] mb-3">Avail Placement Assistance</h3>

<p class="text-[12px] leading-5 text-gray-500">Get dedicated support for resume building, mock interviews, and job referrals.</p>
</div>
</div>

<div class="relative flex items-start gap-5">
<div class="relative z-10 flex flex-col items-center">
<div class="absolute -top-2 -left-1 w-6 h-6 rounded-full bg-[#f59e0b] text-white text-xs font-semibold flex items-center justify-center">6</div>

<div class="w-14 h-14 rounded-full bg-white border-2 border-[#f59e0b] flex items-center justify-center shadow-lg"><img alt="job-ready" class="w-8" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026//jobready.svg" /></div>
</div>

<div class="flex-1 bg-white  rounded-2xl shadow-sm p-5">
<h3 class="text-[15px] font-bold text-[#0f172a] mb-3">Get Job-Ready!</h3>

<p class="text-[12px] leading-5 text-gray-500">Step into your new career with confidence, skills, and a verified credential.</p>
</div>
</div>
</div>
</div>
</div>
</section> */}

      {parse(
        data.course_short_description ?? "",
        options
      )}

    </>
  );
}