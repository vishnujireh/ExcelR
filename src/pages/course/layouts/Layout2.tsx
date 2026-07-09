import React, {useEffect} from "react";
import CourseBanner from "../../components/course/CourseBannerTemp2";
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
    </div>
  );
}
