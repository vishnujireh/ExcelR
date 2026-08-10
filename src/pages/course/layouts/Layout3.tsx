import React, {useEffect} from "react";
import CourseBanner from "../../components/course/CourseBannerTemp3";
import CoursePrice from "../../components/course/CoursePrice";
import CourseBenefit from "../../components/course/CourseBenefit";
import CourseDescription from "../../components/course/CourseDescriptionTemp2";
import { CourseData } from "../../../redux/slices/courseSlice"; // ✅ import type
import Testimonials from "../../components/course/TestimonialsTemp2"; 
import CoursePlacement from "../../components/course/CoursePlacementTemp2";
import OurClients from "@/pages/components/OurClients";
import CourseClassroom from "../../components/course/CourseClassroomTemp2";
import CourseWhyExcelr from "../../components/course/CourseWhychooseTemp2";
import CourseFaq from "../../components/course/CourseFaqTemp2";
import CourseReview from "../../components/course/CourseReviewTemp2";
import DemandCourse from "../../components/course/DemandCourse";
import CourseLocation from "../../components/course/CourseLocationTemp2";
import CourseBreadcrumb from "../../components/course/CourseBreadcrumb";
interface LayoutProps {
  data: CourseData;
}

export default function Layout2({ data }: LayoutProps) {
  const testimonials = data?.sticky_section?.testimonials;
    const courseFaq = data?.sticky_section?.faqs;

    useEffect(() => {
  const accordions = document.querySelectorAll(
    "#accordion13, #accordion14, #accordion4, #accordionfaq, #accordion5, #accordioncoremodule, #accorionvaluemodule, #accorionlocation"
  );

  accordions.forEach((accordion) => {
    accordion.addEventListener("click", (event) => {
      if ((event.target as HTMLElement).tagName.toLowerCase() === "summary") {
        const details = (event.target as HTMLElement)
          .parentNode as HTMLElement;

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



  return (
    <div>
      {/* ✅ Pass course data properly */}
      <CourseBreadcrumb
        courseName={data?.course_name ?? ""}
        category={data?.category}
      />
      <CourseBanner data={data} />
      <CourseBenefit data={data} />
      {/* ✅ Optimized CMS Content */}
      <CourseDescription data={data} />
       
      {testimonials && (
              <div id={testimonials.id} className="scroll-mt-10">
                <Testimonials data={data} />
              </div>
            )}
            <CoursePlacement data={data} />
           
      <div className="bg-[#E5EFFF]">
       <OurClients isGrid={true} />
       </div>
      <CoursePrice data={data} template={data?.template} />
        <CourseClassroom data={data} />
        <CourseWhyExcelr data={data} />
         {courseFaq && (
                <div id={courseFaq.id} className="scroll-mt-10">
                  <CourseFaq data={data} />
                </div>
              )}
              {data?.template2_google_reviews && (
                <div id="google-reviews" className="scroll-mt-10">
                  <CourseReview data={data} />
                </div>
              )}
              <DemandCourse data={data} />
                <CourseLocation data={data} />

                {/* <div className="w-full md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-[#E5EFFF]">
<h2 className="md:text-3xl text-xl font-semibold text-center md:mb-6 mb-4">Why Join Our Data Analyst Course?</h2>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-10 md:max-w-5xl mx-auto">
<div className="flex md:flex-col gap-3 md:gap-0 md:items-center items-start text-center rounded-xl md:rounded-none py-3 md:py-0 px-3 bg-white md:bg-transparent md:m-2 md:m-0">
<div className="md:w-20 md:h-20 md:mb-4 w-80 relative"><img alt="Dedicated Placement Cell" className="w-full h-full object-contain" fill="" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/dedicated-placement.svg" /></div>

<div className="flex-col text-left md:text-center">
<h3 className="font-semibold md:text-lg text-base text-left md:text-center md:mb-2">Dedicated Placement Cell</h3>

<p className="text-gray-700 text-sm leading-relaxed">Get placement assistance with a strong network of 5k+ hiring partners. This data analytics course helps you get job-ready.</p>
</div>
</div>

<div className="flex md:flex-col gap-3 md:gap-0 md:items-center items-start text-center rounded-xl md:rounded-none py-3 md:py-0 px-3 bg-white md:bg-transparent md:m-2 md:m-0">
<div className="md:w-20 md:h-20 md:mb-4 w-80 relative"><img alt="Mentorship from Industry Experts" className="w-full h-full object-contain" fill="" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/mentorshipicon.svg" /></div>

<div className="flex-col text-left md:text-center">
<h3 className="font-semibold md:text-lg text-base text-left md:text-center md:mb-2">Mentorship from Industry Experts</h3>

<p className="text-gray-700 text-sm leading-relaxed">Learn directly from top industry experts delivering real insights, practical techniques, and career-transforming guidance.</p>
</div>
</div>

<div className="flex md:flex-col gap-3 md:gap-0 md:items-center items-start text-center rounded-xl md:rounded-none py-3 md:py-0 px-3 bg-white md:bg-transparent md:m-2 md:m-0">
<div className="md:w-20 md:h-20 md:mb-4 w-80 relative"><img alt="Hands-On Learning" className="w-full h-full object-contain" fill="" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/hands-on-learning.svg" /></div>

<div className="flex-col text-left md:text-center">
<h3 className="font-semibold md:text-lg text-base text-left md:text-center md:mb-2">Hands-On Learning</h3>

<p className="text-gray-700 text-sm leading-relaxed">Apply what you learn in the data analyst course through 50+ assignments and 2+ capstone projects. Also access interview questions.</p>
</div>
</div>

<div className="flex md:flex-col gap-3 md:gap-0 md:items-center items-start text-center rounded-xl md:rounded-none py-3 md:py-0 px-3 bg-white md:bg-transparent md:m-2 md:m-0">
<div className="md:w-20 md:h-20 md:mb-4 w-80 relative"><img alt="365-Day Jumbo Pass" className="w-full h-full object-contain" fill="" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/jumbopass.svg" /></div>

<div className="flex-col text-left md:text-center">
<h3 className="font-semibold md:text-lg text-base text-left md:text-center md:mb-2">365-Day Jumbo Pass</h3>

<p className="text-gray-700 text-sm leading-relaxed">Enjoy unlimited live batches for one full year. Attend, revisit, and repeat sessions from your desired trainer on LMS.</p>
</div>
</div>
</div>
</div>

<section className="w-full md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 ">
<div>
<h2 className="text-center md:text-3xl text-xl font-semibold md:mb-12 mb-4">Learning Path</h2>

<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-3">
<div className="relative flex flex-col group">
<div className="hidden lg:block absolute top-10 left-[calc(100%)] w-8 h-px border-t-2 border-dashed border-orange-300 z-10">&nbsp;</div>

<div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-3 h-full">
<div className="flex flex-col items-center gap-1 mb-5">
<div className="relative">
<div className="absolute inset-0 rounded-full left-0 bg-orange-400 opacity-25 blur-lg scale-150">&nbsp;</div>

<div className="relative w-18 h-18 rounded-full    flex items-center justify-center cursor-pointer select-none text-3xl  hover:scale-110 hover:shadow-orange-300/60 transition-all duration-200" title="Click to cycle emoji"><img alt="Get Trained" className="w-16" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/get-trained.svg" /></div>
</div>
</div>

<h3 className="text-sm font-semibold text-gray-800  cursor-text px-1 -mx-1 text-center transition-colors" title="Click to edit">Get Trained</h3>

<p className="text-xs text-gray-500 leading-relaxed cursor-text px-1 -mx-1 text-center transition-colors" title="Click to edit">Learn from industry experts through structured, hands-on training modules.</p>
</div>
</div>

<div className="relative flex flex-col group">
<div className="hidden lg:block absolute top-10 left-[calc(100%)] w-8 h-px border-t-2 border-dashed border-orange-300 z-10">&nbsp;</div>

<div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-3 h-full">
<div className="flex flex-col items-center gap-1 mb-5">
<div className="relative">
<div className="absolute inset-0 rounded-full left-0 bg-orange-400 opacity-25 blur-lg scale-150">&nbsp;</div>

<div className="relative w-16 h-16 rounded-full flex items-center justify-center cursor-pointer select-none text-3xl ring-4 ring-orange-100 hover:scale-110 hover:shadow-orange-300/60 transition-all duration-200" title="Click to cycle emoji"><img alt="Get Trained" className="w-16" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/assignments.svg" /></div>
</div>
</div>

<h3 className="text-sm font-semibold text-gray-800  cursor-text px-1 -mx-1 text-center transition-colors" title="Click to edit">Submit Assignments</h3>

<p className="text-xs text-gray-500 leading-relaxed cursor-text px-1 -mx-1 text-center transition-colors" title="Click to edit">Reinforce your learning by completing and submitting practical assignments.</p>
</div>
</div>

<div className="relative flex flex-col group">
<div className="hidden lg:block absolute top-10 left-[calc(100%)] w-8 h-px border-t-2 border-dashed border-orange-300 z-10">&nbsp;</div>

<div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-3 h-full">
<div className="flex flex-col items-center gap-1 mb-5">
<div className="relative">
<div className="absolute inset-0 rounded-full left-0 bg-orange-400 opacity-25 blur-lg scale-150">&nbsp;</div>

<div className="relative w-16 h-16 rounded-full flex items-center justify-center cursor-pointer select-none text-3xl ring-4 ring-orange-100 hover:scale-110 hover:shadow-orange-300/60 transition-all duration-200" title="Click to cycle emoji"><img alt="Get Trained" className="w-16" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/guidedprojects.svg" /></div>
</div>
</div>

<h3 className="text-sm font-semibold text-gray-800  cursor-text px-1 -mx-1 text-center transition-colors" title="Click to edit">Work on Guided Projects</h3>

<p className="text-xs text-gray-500 leading-relaxed cursor-text px-1 -mx-1 text-center transition-colors" title="Click to edit">Apply skills on real-world projects with mentor guidance every step.</p>
</div>
</div>

<div className="relative flex flex-col group">
<div className="hidden lg:block absolute top-10 left-[calc(100%)] w-8 h-px border-t-2 border-dashed border-orange-300 z-10">&nbsp;</div>

<div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-3 h-full">
<div className="flex flex-col items-center gap-1 mb-5">
<div className="relative">
<div className="absolute inset-0 rounded-full left-0 bg-orange-400 opacity-25 blur-lg scale-150">&nbsp;</div>

<div className="relative w-16 h-16 rounded-full flex items-center justify-center cursor-pointer select-none text-3xl ring-4 ring-orange-100 hover:scale-110 hover:shadow-orange-300/60 transition-all duration-200" title="Click to cycle emoji"><img alt="Get Trained" className="w-16" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/certifieddata.svg" /></div>
</div>
</div>

<h3 className="text-sm font-semibold text-gray-800  cursor-text px-1 -mx-1 text-center transition-colors" title="Click to edit">Become a Certified Data Analyst</h3>

<p className="text-xs text-gray-500 leading-relaxed cursor-text px-1 -mx-1 text-center transition-colors" title="Click to edit">Earn an industry-recognised certification upon successful completion.</p>
</div>
</div>

<div className="relative flex flex-col group">
<div className="hidden lg:block absolute top-10 left-[calc(100%)] w-8 h-px border-t-2 border-dashed border-orange-300 z-10">&nbsp;</div>

<div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-3 h-full">
<div className="flex flex-col items-center gap-1 mb-5">
<div className="relative">
<div className="absolute inset-0 rounded-full left-0 bg-orange-400 opacity-25 blur-lg scale-150">&nbsp;</div>

<div className="relative w-16 h-16 rounded-full flex items-center justify-center cursor-pointer select-none text-3xl ring-4 ring-orange-100 hover:scale-110 hover:shadow-orange-300/60 transition-all duration-200" title="Click to cycle emoji"><img alt="Get Trained" className="w-16" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/placementassistance.svg" /></div>
</div>
</div>

<h3 className="text-sm font-semibold text-gray-800  cursor-text px-1 -mx-1 text-center transition-colors" title="Click to edit">Avail Placement Assistance</h3>

<p className="text-xs text-gray-500 leading-relaxed cursor-text px-1 -mx-1 text-center transition-colors" title="Click to edit">Get dedicated support for resume building, mock interviews, and job referrals.</p>
</div>
</div>

<div className="relative flex flex-col group">
<div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-3 h-full">
<div className="flex flex-col items-center gap-1 mb-5">
<div className="relative">
<div className="absolute inset-0 rounded-full left-0 bg-orange-400 opacity-25 blur-lg scale-150">&nbsp;</div>

<div className="relative w-16 h-16 rounded-full flex items-center justify-center cursor-pointer select-none text-3xl ring-4 ring-orange-100 hover:scale-110 hover:shadow-orange-300/60 transition-all duration-200" title="Click to cycle emoji"><img alt="Get Trained" className="w-16" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/jobready.svg" /></div>
</div>
</div>

<h3 className="text-sm font-semibold text-gray-800  cursor-text px-1 -mx-1 text-center transition-colors" title="Click to edit">Get Job-Ready!</h3>

<p className="text-xs text-gray-500 leading-relaxed cursor-text px-1 -mx-1 text-center transition-colors" title="Click to edit">Step into your new career with confidence, skills, and a verified credential.</p>
</div>
</div>
</div>
</div>
</section>
<section className="w-full md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-[#f3f3f3]">
<h2 className="text-center md:text-3xl text-xl font-semibold md:mb-9 mb-4">Our Track Record</h2>

<div className="hidden md:flex justify-center gap-5">
<div className="flex items-center justify-center px-4 relative">
<div className="flex items-start gap-4"><img alt="Global Presence" className="w-12 h-12 object-contain shrink-0" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/learners.svg" />
<div>
<h3 className="text-xl font-semibold mt-1">80,000 +</h3>

<p className="text-base leading-tight">Learners</p>
</div>
</div>
</div>

<div className="md:border-r-2 md:border-dashed md:border-[#A7C9FF]">&nbsp;</div>

<div className="flex items-center justify-center px-4 relative">
<div className="flex items-start gap-4"><img alt="Global Presence" className="w-12 h-12 object-contain shrink-0" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/hiring-partners-logo.svg" />
<div>
<h3 className="text-xl font-semibold mt-1">5,000 +</h3>

<p className="text-base leading-tight">Hiring Partner</p>
</div>
</div>
</div>

<div className="md:border-r-2 md:border-dashed md:border-[#A7C9FF]">&nbsp;</div>

<div className="flex items-center justify-center px-4 relative">
<div className="flex items-start gap-4"><img alt="Global Presence" className="w-12 h-12 object-contain shrink-0" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/global-presence.svg" />
<div>
<p className="text-base leading-tight">Global Presence in</p>

<h3 className="text-xl font-semibold mt-1">40+ Countries</h3>
</div>
</div>
</div>

<div className="md:border-r-2 md:border-dashed md:border-[#A7C9FF]">&nbsp;</div>

<div className="flex items-center justify-center px-4 relative">
<div className="flex items-start gap-4"><img alt="Industry Experience" className="w-12 h-12 object-contain shrink-0" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/industry-experience.svg" />
<div>
<p className="text-base leading-tight">Industry experience of</p>

<h3 className="text-xl font-semibold mt-1">13+ years</h3>
</div>
</div>
</div>

<div className="md:border-r-2 md:border-dashed md:border-[#A7C9FF]">&nbsp;</div>

<div className="flex items-center justify-center px-4 relative">
<div className="flex flex-col items-center text-center">
<h3 className="text-xl font-semibold mt-3">4.8/5</h3>
<img alt="Google Reviews" className="w-28 h-auto object-contain" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/googlrevn.svg" /></div>
</div>
</div> 

<div className="md:hidden"> 
<div className="grid grid-cols-3 relative"> 
<div className="flex flex-col items-center text-center px-4 py-4 border-r border-dashed border-[#A7C9FF] pb-1"><img alt="Global Presence" className="w-14 h-14 object-contain mb-1" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/global-presence.svg" />
<p className="md:text-[15px] text-sm leading-6">Global Presence in</p>

<h3 className="md:text-2xl text-md font-bold mt-1">40+ countries</h3>
</div> 

<div className="flex flex-col items-center text-center px-4 py-4 border-r border-dashed border-[#A7C9FF] pb-1"><img alt="Global Presence" className="w-14 h-14 object-contain mb-1" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/learners.svg" />
<h3 className="md:text-2xl text-md font-bold mt-1">80,000 +</h3>

<p className="md:text-[15px] text-sm leading-6">Learners</p>
</div> 

<div className="relative flex flex-col items-center text-center px-4 py-4 pb-1 after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-px after:h-16 after:bg-gray-300"><img alt="Global Presence" className="w-14 h-14 object-contain mb-1" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/hiring-partners-logo.svg" />
<h3 className="md:text-2xl text-md font-bold mt-1">5,000 +</h3>

<p className="md:text-[15px] text-sm leading-6">Hiring Partner</p>
</div>
 </div> 

<div className="border-t border-dashed border-[##A7C9FF] mt-2">&nbsp;</div>

<div className="grid grid-cols-2 relative">
<div className="flex flex-col items-center text-center px-4 py-4 pb-1 border-r border-dashed border-[#A7C9FF]"><img alt="Industry Experience" className="w-14 h-14 object-contain mb-1" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/industry-experience.svg" />
<p className="md:text-[15px] text-sm leading-6">Industry experience</p>

<p className="md:text-[15px] text-md leading-6">of <span className="md:text-2xl text-md font-bold">12+ years</span></p>
</div> 

<div className="flex items-center justify-center px-4 relative">
<div className="flex flex-col items-center text-center">
<h3 className="text-xl font-semibold mt-3">4.8/5</h3>
<img alt="Google Reviews" className="w-28 h-auto object-contain" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/googlrevn.svg" /></div>
</div>
</div>
</div>
</section>
<div className="w-full md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5">
<h2 className="text-center md:text-3xl text-xl font-semibold md:mb-9 mb-4">Placement Assistance Benefits</h2>

<div className="max-w-4xl mx-auto">
<div className="grid grid-cols-3 gap-3 md:gap-6">
<div className="md:bg-[rgba(244,246,252,1)] rounded-xl md:p-6 transition-all duration-300 text-center md:text-left">
<div className="bg-[#fff] w-15 h-15 shadow mb-4 mx-auto md:mx-0 rounded-lg p-2 flex items-center"><img alt="Recruitment Drives at Our Centres" className="object-contain mx-auto" height="{40}" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/recruitment-drive.svg" width="{40}" /></div>

<p className="md:text-lg text-sm text-center md:text-start font-medium mb-2 mr-auto text-[#282938]">Recruitment Drives at Our Centres</p>
</div>

<div className="md:bg-[rgba(244,246,252,1)] rounded-xl md:p-6 transition-all duration-300 text-center md:text-left">
<div className="bg-[#fff] w-15 h-15 shadow mb-4 mx-auto md:mx-0 rounded-lg p-2 flex items-center"><img alt="Mock Interviews by Industry Professionals" className="object-contain mx-auto" height="{40}" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/interview.svg" width="{40}" /></div>

<p className="md:text-lg text-sm text-center md:text-start font-medium mb-2 mr-auto text-[#282938]">Mock Interviews by Industry Professionals</p>
</div>

<div className="md:bg-[rgba(244,246,252,1)] rounded-xl md:p-6 transition-all duration-300 text-center md:text-left">
<div className="bg-[#fff] w-15 h-15 shadow mb-4 mx-auto md:mx-0 rounded-lg p-2 flex items-center"><img alt="Communication &amp; Soft Skills Training" className="object-contain mx-auto" height="{40}" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/communication.svg" width="{40}" /></div>

<p className="md:text-lg text-sm text-center md:text-start font-medium mb-2 mr-auto text-[#282938]">Communication &amp; Soft Skills Training</p>
</div>

<div className="md:bg-[rgba(244,246,252,1)] rounded-xl md:p-6 transition-all duration-300 text-center md:text-left">
<div className="bg-[#fff] w-15 h-15 shadow mb-4 mx-auto md:mx-0 rounded-lg p-2 flex items-center"><img alt="LinkedIn Profile Makeover" className="object-contain mx-auto" height="{40}" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/linkedinic.svg" width="{40}" /></div>

<p className="md:text-lg text-sm text-center md:text-start font-medium mb-2 mr-auto text-[#282938]">LinkedIn Profile Makeover</p>
</div>

<div className="md:bg-[rgba(244,246,252,1)] rounded-xl md:p-6 transition-all duration-300 text-center md:text-left">
<div className="bg-[#fff] w-15 h-15 shadow mb-4 mx-auto md:mx-0 rounded-lg p-2 flex items-center"><img alt="Resume-Building Workshops" className="object-contain mx-auto" height="{40}" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/resume.svg" width="{40}" /></div>

<p className="md:text-lg text-sm text-center md:text-start font-medium mb-2 mr-auto text-[#282938]">Resume-Building Workshops</p>
</div>

<div className="md:bg-[rgba(244,246,252,1)] rounded-xl md:p-6 transition-all duration-300 text-center md:text-left">
<div className="bg-[#fff] w-15 h-15 shadow mb-4 mx-auto md:mx-0 rounded-lg p-2 flex items-center"><img alt="Regular Job Alerts &amp; Interview Scheduling" className="object-contain mx-auto" height="{40}" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/job-alerts.svg" width="{40}" /></div>

<p className="md:text-lg text-sm text-center md:text-start font-medium mb-2 mr-auto text-[#282938]">Regular Job Alerts &amp; Interview Scheduling</p>
</div>
</div>
</div>
</div>
<div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5  bg-[#E5EFFF]">
<h2 className="text-center md:text-3xl text-xl font-base md:mb-9 mb-4">What You&rsquo;ll Learn in Our <span className="block font-semibold"> Data Analytics Course</span></h2>

<div className="hidden md:grid md:grid-cols-2 gap-8 mx-auto">
<div className="bg-[#CEE6FF] rounded-2xl overflow-hidden ">
<div className="p-4 text-center">
<h3 className="text-2xl font-semibold ">Core Modules</h3>
</div>

<div className="p-4 pt-2">
<div className="flex gap-3">
<div>
<ul className="flex-column space-y space-y-2 text-sm font-medium text-body md:me-4 mb-4 md:mb-0" data-tabs-toggle="#default-tab-content" id="default-tab" role="tablist">
	<li role="presentation"><button aria-controls="excel" aria-selected="false" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition cursor-pointer
                        bg-white border-gray-200 hover:text-fg-brand hover:border-brand" data-tabs-target="#excel" id="excel-tab" role="tab" type="button"><img alt="excel" className="w-5 h-auto object-contain shrink-0 icon" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/excel.svg" /> Excel</button></li>
	<li role="presentation"><button aria-controls="mysql" aria-selected="false" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition cursor-pointer
                        bg-white border-gray-200 hover:text-fg-brand hover:border-brand" data-tabs-target="#mysql" id="mysql-tab" role="tab" type="button"><img alt="mysql" className="w-5 h-auto object-contain shrink-0 icon" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/mysql.svg" /> MySQL</button></li>
	<li role="presentation"><button aria-controls="tableau" aria-selected="false" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition cursor-pointer
                        bg-white border-gray-200 hover:text-fg-brand hover:border-brand" data-tabs-target="#tableau" id="tableau-tab" role="tab" type="button"><img alt="tableau" className="w-5 h-auto object-contain shrink-0 icon" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/tableau.svg" />Tableau</button></li>
	<li role="presentation"><button aria-controls="powerbi" aria-selected="false" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition cursor-pointer
                        bg-white border-gray-200 hover:text-fg-brand hover:border-brand" data-tabs-target="#powerbi" id="powerbi-tab" role="tab" type="button"><img alt="power-bi" className="w-5 h-auto object-contain shrink-0 icon" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/power-bi.svg" />Power BI</button></li>
</ul>
</div>

<div className="flex-1 bg-white rounded-2xl p-5">
<div id="default-tab-content">
<div aria-labelledby="excel-tab" className="hidden md:p-0 p-4 rounded-base bg-neutral-secondary-soft" id="excel" role="tabpanel">
<h3 className="text-lg font-semibold text-[#2F327D] mb-2">Excel &amp; Advance Excel</h3>

<p className="text-sm text-[#696984] leading-relaxed">This module lays the foundation and helps you reach an advanced level of Excel skills. Topics include the Basics of Excel, Pivot Tables and all the way to VBA and Macros.</p>
</div>

<div aria-labelledby="mysql-tab" className="hidden md:p-0 p-4 rounded-base bg-neutral-secondary-soft" id="mysql" role="tabpanel">
<h3 className="text-lg font-semibold text-[#2F327D] mb-2">MySQL</h3>

<p className="text-sm text-[#696984] leading-relaxed">In our data analyst course, you&#39;ll learn how to work directly with data stored in DBs using SQL. By the end of the module, you will be an expert in writing queries, joining tables, and managing data efficiently.</p>
</div>

<div aria-labelledby="tableau-tab" className="hidden md:p-0 p-4 rounded-base bg-neutral-secondary-soft" id="tableau" role="tabpanel">
<h3 className="text-lg font-semibold text-[#2F327D] mb-2">Tableau</h3>

<p className="text-sm text-[#696984] leading-relaxed">Tableau is also a visualisation tool used by companies. This data analyst course module will help you master the tool and better prepare you for the job market.</p>
</div>

<div aria-labelledby="powerbi-tab" className="hidden md:p-0 p-4 rounded-base bg-neutral-secondary-soft" id="powerbi" role="tabpanel">
<h3 className="text-lg font-semibold text-[#2F327D] mb-2">Power BI</h3>

<p className="text-sm text-[#696984] leading-relaxed">It is an essential skill for every data analyst to visualise data and obtain meaningful insights. This data analytics course equips you with how to use Power BI effectively-cleaning data, creating visuals, and building simple dashboards.</p>
</div>
</div>
</div>
</div>
</div>
</div>

<div className="bg-white rounded-2xl overflow-hidden">
<div className="bg-[#CEE6FF] rounded-2xl shadow-2xl overflow-hidden ">
<div className="p-4 text-center">
<h3 className="text-2xl font-semibold">Value-Added Modules</h3>
</div>

<div className="p-4 pt-2">
<div className="flex gap-3">
<div>
<ul className="flex-column space-y space-y-2 text-sm font-medium text-body md:me-4 mb-4 md:mb-0" data-tabs-toggle="#default-tab-content" id="default-tab" role="tablist">
	<li role="presentation"><button aria-controls="python" aria-selected="false" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition cursor-pointer
                           bg-white border-gray-200 hover:text-fg-brand hover:border-brand" data-tabs-target="#python" id="python-tab" role="tab" type="button"><img alt="pythonc" className="w-5 h-auto object-contain shrink-0 icon" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/pythonc.svg" />Python</button></li>
	<li role="presentation"><button aria-controls="chatgpt" aria-selected="false" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition cursor-pointer
                           bg-white border-gray-200 hover:text-fg-brand hover:border-brand" data-tabs-target="#chatgpt" id="chatgpt-tab" role="tab" type="button"><img alt="chatgpt" className="w-5 h-auto object-contain shrink-0 icon" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/chatgpt.svg" />ChatGPT</button></li>
	<li role="presentation"><button aria-controls="sas" aria-selected="false" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition cursor-pointer
                           bg-white border-gray-200 hover:text-fg-brand hover:border-brand" data-tabs-target="#sas" id="sas-tab" role="tab" type="button"><img alt="sasc" className="w-5 h-auto object-contain shrink-0 icon" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/sasc.svg" />SAS</button></li>
	<li role="presentation"><button aria-controls="statistics" aria-selected="false" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition cursor-pointer
                           bg-white border-gray-200 hover:text-fg-brand hover:border-brand" data-tabs-target="#statistics" id="statistics-tab" role="tab" type="button"><img alt="statisticsc" className="w-5 h-auto object-contain shrink-0 icon" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/statisticsc.svg" />Statistics</button></li>
	<li role="presentation"><button aria-controls="r" aria-selected="false" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition cursor-pointer
                           bg-white border-gray-200 hover:text-fg-brand hover:border-brand" data-tabs-target="#r" id="r-tab" role="tab" type="button"><img alt="rcv" className="w-5 h-auto object-contain shrink-0 icon" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/rcv.svg" />R</button></li>
</ul>
</div>

<div className="flex-1 bg-white rounded-2xl p-5">
<div id="default-tab-content">
<div aria-labelledby="python-tab" className="hidden md:p-0 p-4 rounded-base bg-neutral-secondary-soft" id="python" role="tabpanel">
<h3 className="text-lg font-semibold text-[#2F327D] mb-2">Basic of Python</h3>

<p className="text-sm text-[#696984] leading-relaxed">A beginner-friendly add-on that helps you get comfortable woth Python. Adding value to the data analyst course, this module covers the essentials needed to work with data in real-life projects.</p>
</div>

<div aria-labelledby="chatgpt-tab" className="hidden md:p-0 p-4 rounded-base bg-neutral-secondary-soft" id="chatgpt" role="tabpanel">
<h3 className="text-lg font-semibold text-[#2F327D] mb-2">ChatGPT</h3>

<p className="text-sm text-[#696984] leading-relaxed">A new-age AI tool that helps you summarise insights, write clearer reports and use prompt techniques to work smarter. Learn a faster, easier way to analyse and present data.</p>
</div>

<div aria-labelledby="sas-tab" className="hidden md:p-0 p-4 rounded-base bg-neutral-secondary-soft" id="sas" role="tabpanel">
<h3 className="text-lg font-semibold text-[#2F327D] mb-2">SAS (Self-Paced)</h3>

<p className="text-sm text-[#696984] leading-relaxed">Statistical Analysis System is a powerful analytics suite used by large enterprises. It prepares every data analytics course learner for roles where SAS-based reporting is the norm.</p>
</div>

<div aria-labelledby="statistics-tab" className="hidden md:p-0 p-4 rounded-base bg-neutral-secondary-soft" id="statistics" role="tabpanel">
<h3 className="text-lg font-semibold text-[#2F327D] mb-2">Business Statistics</h3>

<p className="text-sm text-[#696984] leading-relaxed">Most data analytics course providers jump into analytics, but without statistics, you can&#39;t tell what the numbers men for business. The add-on helps make practical decisions with statistics.</p>
</div>

<div aria-labelledby="r-tab" className="hidden md:p-0 p-4 rounded-base bg-neutral-secondary-soft" id="r" role="tabpanel">
<h3 className="text-lg font-semibold text-[#2F327D] mb-2">Fundamentals of R</h3>

<p className="text-sm text-[#696984] leading-relaxed">A practical intro to R that helps you analyse and visualise data the way statisticians do. This gives you another in-demand skillset to handle real-world datasets with clarity and confidence.</p>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div> 

<div className="block md:hidden space-y-5">
<div>
<div className="p-3 text-center bg-[#155DFC] mb-0 rounded-tl-md rounded-tr-md">
<h3 className="text-base font-semibold text-white">Core Modules</h3>
</div>

<div id="accordioncoremodule">
<details className="border-b border-gray-300" open=""><summary className="w-full flex gap-3 cursor-pointer items-center text-left text-sm px-5 py-4 font-semibold text-[#777] dark:text-gray-100"><img alt="excel" className="w-5 h-auto object-contain shrink-0 icon" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/excel.svg" /> Excel </summary>

<div className="p-5 pt-0 text-[#666] text-sm leading-6 dark:text-gray-300">
<p className="text-sm text-[#696984] leading-relaxed">This module lays the foundation and helps you reach an advanced level of Excel skills. Topics include the Basics of Excel, Pivot Tables and all the way to VBA and Macros.</p>
</div>
</details>

<details className="border-b border-gray-300"><summary className="w-full flex gap-3 cursor-pointer items-center text-left text-sm px-5 py-4 font-semibold text-[#777] dark:text-gray-100"><img alt="mysql" className="w-5 h-auto object-contain shrink-0 icon" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/mysql.svg" /> MySQL </summary>

<div className="p-5 pt-0 text-[#666] text-sm leading-6 dark:text-gray-300">
<p className="text-sm text-[#696984] leading-relaxed">In our data analyst course, you&#39;ll learn how to work directly with data stored in DBs using SQL. By the end of the module, you will be an expert in writing queries, joining tables, and managing data efficiently.</p>
</div>
</details>

<details className="border-b border-gray-300"><summary className="w-full flex gap-3 cursor-pointer items-center text-left text-sm px-5 py-4 font-semibold text-[#777] dark:text-gray-100"><img alt="mysql" className="w-5 h-auto object-contain shrink-0 icon" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/tableau.svg" /> Tableau </summary>

<div className="p-5 pt-0 text-[#666] text-sm leading-6 dark:text-gray-300">
<p className="text-sm text-[#696984] leading-relaxed">Tableau is also a visualisation tool used by companies. This data analyst course module will help you master the tool and better prepare you for the job market.</p>
</div>
</details>

<details className="border-b border-gray-300"><summary className="w-full flex gap-3 cursor-pointer items-center text-left text-sm px-5 py-4 font-semibold text-[#777] dark:text-gray-100"><img alt="mysql" className="w-5 h-auto object-contain shrink-0 icon" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/power-bi.svg" /> Power BI </summary>

<div className="p-5 pt-0 text-[#666] text-sm leading-6 dark:text-gray-300">
<p className="text-sm text-[#696984] leading-relaxed">It is an essential skill for every data analyst to visualise data and obtain meaningful insights. This data analytics course equips you with how to use Power BI effectively-cleaning data, creating visuals, and building simple dashboards.</p>
</div>
</details>
</div>
</div>

<div>
<div className="p-3 text-center bg-[#155DFC] mb-0 rounded-tl-md rounded-tr-md">
<h3 className="text-base font-semibold text-white">Value-Added Modules</h3>
</div>

<div id="accorionvaluemodule">
<details className="border-b border-gray-300" open=""><summary className="w-full flex gap-3 cursor-pointer items-center text-left text-sm px-5 py-4 font-semibold text-[#777] dark:text-gray-100"><img alt="pythonc" className="w-5 h-auto object-contain shrink-0 icon" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/pythonc.svg" />Python </summary>

<div className="p-5 pt-0 text-[#666] text-sm leading-6 dark:text-gray-300">
<p className="text-sm text-[#696984] leading-relaxed">A beginner-friendly add-on that helps you get comfortable woth Python. Adding value to the data analyst course, this module covers the essentials needed to work with data in real-life projects.</p>
</div>
</details>

<details className="border-b border-gray-300"><summary className="w-full flex gap-3 cursor-pointer items-center text-left text-sm px-5 py-4 font-semibold text-[#777] dark:text-gray-100"><img alt="chatgpt" className="w-5 h-auto object-contain shrink-0 icon" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/chatgpt.svg" />ChatGPT</summary>

<div className="p-5 pt-0 text-[#666] text-sm leading-6 dark:text-gray-300">
<p className="text-sm text-[#696984] leading-relaxed">A new-age AI tool that helps you summarise insights, write clearer reports and use prompt techniques to work smarter. Learn a faster, easier way to analyse and present data.</p>
</div>
</details>

<details className="border-b border-gray-300"><summary className="w-full flex gap-3 cursor-pointer items-center text-left text-sm px-5 py-4 font-semibold text-[#777] dark:text-gray-100"><img alt="chatgpt" className="w-5 h-auto object-contain shrink-0 icon" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/sasc.svg" />SAS</summary>

<div className="p-5 pt-0 text-[#666] text-sm leading-6 dark:text-gray-300">
<p className="text-sm text-[#696984] leading-relaxed">Statistical Analysis System is a powerful analytics suite used by large enterprises. It prepares every data analytics course learner for roles where SAS-based reporting is the norm.</p>
</div>
</details>

<details className="border-b border-gray-300"><summary className="w-full flex gap-3 cursor-pointer items-center text-left text-sm px-5 py-4 font-semibold text-[#777] dark:text-gray-100"><img alt="chatgpt" className="w-5 h-auto object-contain shrink-0 icon" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/statisticsc.svg" />Statistics</summary>

<div className="p-5 pt-0 text-[#666] text-sm leading-6 dark:text-gray-300">
<p className="text-sm text-[#696984] leading-relaxed">Most data analytics course providers jump into analytics, but without statistics, you can&#39;t tell what the numbers men for business. The add-on helps make practical decisions with statistics.</p>
</div>
</details>

<details className="border-b border-gray-300"><summary className="w-full flex gap-3 cursor-pointer items-center text-left text-sm px-5 py-4 font-semibold text-[#777] dark:text-gray-100"><img alt="chatgpt" className="w-5 h-auto object-contain shrink-0 icon" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/rcv.svg" />R</summary>

<div className="p-5 pt-0 text-[#666] text-sm leading-6 dark:text-gray-300">
<p className="text-sm text-[#696984] leading-relaxed">A practical intro to R that helps you analyse and visualise data the way statisticians do. This gives you another in-demand skillset to handle real-world datasets with clarity and confidence.</p>
</div>
</details>
</div>
</div>
</div>
</div>

<div className="w-full md:py-10 p-5">
<h2 className="text-center md:text-3xl text-xl font-semibold md:mb-9 mb-4">Capstone Projects</h2>
 

<div className="capstone-projects">
<div className="item-box">
<h3>Supply Chain Management</h3>
<img alt="supply" className="w-6 h-auto object-contain shrink-0 icon" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/supply-chain.svg" />
<p>This project aims to build a Salesforce Analytics Dashboard that provides real-time visibility into sales pipeline health, lead conversions, revenue performance, and sales team efficiency. The goal is to enable sales leaders to forecast accurately, track sales KPIs, monitor team performance, and drive higher conversion rates by leveraging actionable insights embedded in Salesforce data.</p>
</div>

<div className="item-box">
<h3>Manufacturing Analytics</h3>
<img alt="manufacturing" className="w-6 h-auto object-contain shrink-0 icon" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/manufacturing-ic.svg" />
<p>Analyze production efficiency, downtime, defect rates, and supply utilization to improve operational performance.</p>
</div>

<div className="item-box">
<h3>Hospitality Analytics</h3>
<img alt="hospitality" className="w-6 h-auto object-contain shrink-0 icon" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/hospitality.svg" />
<p>Track occupancy rates, customer preferences, revenue metrics, and booking trends for hotels and resorts.</p>
</div>

<div className="item-box">
<h3>Bank Analytics</h3>
<img alt="bank" className="w-6 h-auto object-contain shrink-0 icon" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/bank-ic.svg" />
<p>Analyze customer behavior, loan performance, fraud detection, and financial KPIs in banking systems.</p>
</div>

<div className="item-box">
<h3>Aviation Analytics</h3>
<img alt="aviation-ic" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/aviation-ic.svg" />
<p>Monitor flight operations, delays, passenger trends, and fuel efficiency for airlines.</p>
</div>
</div>
</div>

<section className="w-full md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-[#E5EFFF]">
<div className="w-full mx-auto text-center">
<h2 className="text-center md:text-3xl text-xl font-semibold md:mb-7 mb-4">Certificates You&rsquo;ll Earn</h2>

<div className="hidden md:grid grid-cols-4 gap-8 mb-8 items-center">
<div className="col-span-1 flex flex-col items-center">
<div className="w-full aspect-[3.1/4] relative"><img alt="Certificate by ExcelR" fill="" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/eclercerificate.png" /></div>

<p className="mt-4 font-medium text-lg text-center">Certificate by <span className="font-bold">ExcelR</span></p>
</div>

<div className="col-span-2 flex flex-col items-center">
<div className="w-full aspect-[6.5/4] relative p-4"><img alt="Certificate by NASSCOM" className="object-contain" fill="" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/certificatenasscom.png" /></div>

<p className="mt-4 font-medium text-lg text-center">Certificate by <span className="font-bold">NASSCOM</span></p>
</div>

<div className="col-span-1 flex flex-col items-center">
<div className="w-full aspect-[3.1/4] relative"><img alt="Certificate by AiVariant" className="object-contain" fill="" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/avarientcertificate.png" /></div>

<p className="mt-4 font-medium text-lg text-center">Certificate by <span className="font-bold">AiVariant</span></p>
</div>
</div>

<div className="md:hidden space-y-6">
<div className="w-full aspect-[3/2] relative"><img alt="Certificate by NASSCOM" className="object-contain" fill="" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/certificatenasscom.png" /></div>

<p className="font-medium text-center">Certificate by <span className="font-bold">NASSCOM</span></p>

<div className="grid grid-cols-2 gap-6">
<div className="flex flex-col items-center">
<div className="w-full aspect-[3/4] relative"><img alt="Certificate by ExcelR" fill="" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/eclercerificate.png" /></div>

<p className="mt-3 font-medium text-center">Certificate by <span className="font-bold">ExcelR</span></p>
</div>

<div className="flex flex-col items-center">
<div className="w-full aspect-[3/4] relative"><img alt="Certificate by AiVariant" className="object-contain" fill="" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/avarientcertificate.png" /></div>

<p className="mt-3 font-medium text-center">Certificate by <span className="font-bold">AiVariant</span></p>
</div>
</div>
</div>

<p className="max-w-4xl mx-auto text-sm text-gray-700 leading-relaxed mt-10">ExcelR offers the best certifications as per the industry standards, which are designed to boost career growth in high-demand fields. We also provide globally recognised credentials, including certifications from IIT and FutureSkills Prime NASSCOM, a course completion certificate from ExcelR, and an internship certificate from AiVariant, along with hands-on projects to ensure practical skill development.</p>
</div>
</section>

<section className="our-alumni-videos">
<div className="aluni-box">
<div>
<div className="w-full relative"><img alt="Certificate by ExcelR" fill="" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/akil_thumb.jpg" /></div>
<a href="https://www.youtube.com/embed/HwwvJ_RBn-Y">https://www.youtube.com/embed/HwwvJ_RBn-Y</a>

<p className="video-title">Sai Akhil</p>
</div>
</div>

<div className="aluni-box">
<div>
<div className="w-full relative"><img alt="Certificate by ExcelR" fill="" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/vinay.png" /></div>
<a href="https://youtu.be/U94YbBY9goE">https://youtu.be/U94YbBY9goE</a>

<p className="video-title">Vini</p>
</div>
</div>

<div className="aluni-box">
<div>
<div className="w-full relative"><img alt="Certificate by ExcelR" fill="" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/aashay.jpg" /></div>
<a href="https://youtu.be/P8Agnuiq48E">https://youtu.be/P8Agnuiq48E</a>

<p className="video-title">Aashay</p>
</div>
</div>

<div className="aluni-box">
<div>
<div className="w-full relative"><img alt="Certificate by ExcelR" fill="" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/suprith.jpg" /></div>
<a href="https://youtu.be/APmPWLj_TOQ">https://youtu.be/APmPWLj_TOQ</a>

<p className="video-title">Shruti</p>
</div>
</div>

<div className="aluni-box">
<div>
<div className="w-full relative"><img alt="Certificate by ExcelR" fill="" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/divya_final.jpg" /></div>
<a href="https://youtu.be/NpHLiWN3nmc">https://youtu.be/NpHLiWN3nmc</a>

<p className="video-title">Divya</p>
</div>
</div>

<div className="aluni-box">
<div>
<div className="w-full relative"><img alt="Certificate by ExcelR" fill="" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/venkat_sai.png" /></div>
<a href="https://youtu.be/pLpmAkCsTtU">https://youtu.be/pLpmAkCsTtU</a>

<p className="video-title">Venkat Sai</p>
</div>
</div>
</section>
<h2 className="text-center md:text-3xl text-xl font-semibold md:mb-12 mb-4 text-white">Why Choose Data Analytics as Your Career?</h2>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 px-3 md:px-0 md:max-w-[800px] mx-auto justify-items-center gap-8">
<div className="flex flex-col items-center text-start p-6 border border-white border-1 bg-white/20 backdrop-blur-md rounded-xl md:shadow-lg w-full md:w-[380px]">
<div className="relative w-10 h-10 mb-2 mr-auto"><img alt="India leads analytics hiring" className="object-contain" fill="" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/growtharrow.svg" /></div>

<h3 className="font-semibold text-white md:text-lg text-base mb-2 text-start mr-auto">India leads analytics hiring</h3>

<p className="text-white text-sm leading-relaxed text-start mr-auto">17.4% of all job postings now require data analytics skills.</p>
</div>

<div className="flex flex-col items-center text-start p-6 border border-white border-1 bg-white/20 backdrop-blur-md rounded-xl md:shadow-lg w-full md:w-[380px]">
<div className="relative w-10 h-10 mb-2 mr-auto"><img alt="Rising salaries" className="object-contain" fill="" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/raisingsalaries.svg" /></div>

<h3 className="font-semibold text-white md:text-lg text-base mb-2 text-start mr-auto">Rising salaries</h3>

<p className="text-white text-sm leading-relaxed text-start mr-auto">Entry-level Data Analysts in India earn an average of ₹7.3 LPA (2025).</p>
</div>

<div className="flex flex-col items-center text-start p-6 border border-white border-1 bg-white/20 backdrop-blur-md rounded-xl md:shadow-lg w-full md:w-[380px]">
<div className="relative w-10 h-10 mb-2 mr-auto"><img alt="Global demand surging" className="object-contain" fill="" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/globaldemand.svg" /></div>

<h3 className="font-semibold text-white md:text-lg text-base mb-2 text-start mr-auto">Global demand surging</h3>

<p className="text-white text-sm leading-relaxed text-start mr-auto">U.S. entry-level Data Analyst salaries have risen from $90K to $111K in 2025.</p>
</div>

<div className="flex flex-col items-center text-start p-6 border border-white border-1 bg-white/20 backdrop-blur-md rounded-xl md:shadow-lg w-full md:w-[380px]">
<div className="relative w-10 h-10 mb-2 mr-auto"><img alt="Explosive market growth" className="object-contain" fill="" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/explosive-market.svg" /></div>

<h3 className="font-semibold text-white md:text-lg text-base mb-2 text-start mr-auto">Explosive market growth</h3>

<p className="text-white text-sm leading-relaxed text-start mr-auto">India&rsquo;s data analytics industry ($3.55B in 2024) is growing at a 35.8% CAGR through 2030.</p>
</div>
</div>
<div className="max-w-4xl mx-auto">
<h2 className="text-center md:text-3xl text-xl font-semibold md:mb-7 mb-4 text-center">Our Ratings Across the Web</h2>

<div className="grid grid-cols-3 gap-3 md:gap-6">
<div className="bg-white md:shadow-lg rounded-lg px-3 py-2 md:px-6 md:py-4 flex flex-col items-center">
<div className="flex items-center gap-2 mb-2 md:text-3xl text-xl font-semibold">4.8 <img alt="Google" className="md-w-10 w-6 object-contain" fill="" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/star_filled.svg" /></div>

<div className="md:w-32 w-full h-10  md:h-12 relative  flex items-center shadow-lg md-shadow-none rounded-lg p-2 md:p-0"><img alt="Google" className="object-contain" fill="" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/googleexclertemplate.png" /></div>
</div>

<div className="bg-white md:shadow-lg rounded-lg px-3 py-2 md:px-6 md:py-4 flex flex-col items-center">
<div className="flex items-center gap-2 mb-2 md:text-3xl text-xl font-semibold">4.4 <img alt="Google" className="md-w-10 w-6 object-contain" fill="" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/star_filled.svg" /></div>

<div className="md:w-32 w-full h-10  md:h-12 relative  flex items-center shadow-lg md-shadow-none rounded-lg p-2 md:p-0"><img alt="Trustpilot" className="object-contain" fill="" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/trustpilottemplate.jpg" /></div>
</div>

<div className="bg-white md:shadow-lg rounded-lg px-3 py-2 md:px-6 md:py-4 flex flex-col items-center">
<div className="flex items-center gap-2 mb-2 md:text-3xl text-xl font-semibold">4.7 <img alt="Google" className="md-w-10 w-6 object-contain" fill="" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/star_filled.svg" /></div>

<div className="md:w-32 w-full h-10  md:h-12 relative  flex items-center shadow-lg md-shadow-none rounded-lg p-2 md:p-0"><img alt="Mouthshut" className="object-contain" fill="" src="https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2026_Uploads/da_img_2026/mouthshuttemplate.jpg" /></div>
</div>
</div>
</div> */}



    </div>
  );
}
