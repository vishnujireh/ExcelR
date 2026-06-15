import Image from "next/image";
import StudentEnrolled from "/public/cour-stud.svg";
import reviewic from "/public/google.png";
import Duration from "/public/duration.svg";
import testimonialGif from "/public/testimonial.gif";
import QuickEnquiry from "../QuickEnquiry";
import { useState } from "react";
import { CourseData } from "@/redux/slices/courseSlice";
import parse from "html-react-parser";
import Link from "next/link";

interface CourseBannerProps {
  data: CourseData;
}

export default function CourseBanner({ data }: CourseBannerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
const [formName, setFormName] = useState("");
const [variant, setVariant] = useState<"default" | "callback">("default");

const openModal = (name: string, type: "default" | "callback" = "default") => {
  setFormName(name);
  setVariant(type);
  setIsModalOpen(true);
}; 
  const closeModal = () => setIsModalOpen(false);

  if (!data) {
    return (
      <section className="course-banner p-10 text-center bg-gray-100">
        <h1>Course not found</h1>
        <p>The course you are looking for doesn&apos;t exist.</p>
      </section>
    );
  }

  // ✅ Extract association icon from brief_intro HTML if needed
 

  // ✅ Build the banner image URL from course_image field
  const bannerImageUrl = data.course_image 
    ? `https://www.excelr.com/uploads/course/${data.course_image}`
   // ? `https://demo3.excelr.com/uploads/course/${data.course_image}`
    : '';

  return (
    // <section
    //   className="course-banner w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 text-white coursebanner_mobile"
    //   style={{
    //     backgroundImage: `url(${bannerImageUrl})`,
    //     backgroundSize: "cover",
    //     backgroundPosition: "center",
    //   }}
    // >
    <section className="course-banner bg-[#05081b] md:bg-transparent relative w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 text-white overflow-hidden">
      {/* Banner background image — shown on ALL viewports so it is always the LCP element.
          Mobile uses lower quality (40) to minimise bandwidth. */}
      {bannerImageUrl && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={bannerImageUrl}
            alt={data.course_name}
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover"
            quality={55}
          />
          {/* Dark overlay so text stays readable on mobile */}
          <div className="absolute inset-0 bg-[#05081b]/70 md:bg-transparent" />
        </div>
      )}
      <div className="grid md:grid-cols-3 gap-4 relative z-10">
        <div className="col-span-3 lg:col-span-2">
          {/* ✅ Course Name from API */}
          <h1 className="text-2xl font-semibold">{data.course_name}</h1>

          

          {/* ✅ Short Description from API */}
          <div className="text-lg banerdec">
           <>{parse(data.brief_intro ?? "")}</>
          </div>

          {/* ✅ Course Stats */}
          <div className="md:mt-10 mt-4">
            <div className="flex items-center gap-10 justify-center md:justify-start">
              {/* Students Enrolled */}
              {data.students_enroll && (
              <div className="md:flex items-center gap-4 text-center md:text-left">
                <div className="relative w-8 h-8 mx-auto mb-1 md:ml-0 md:mr-0">
                  <Image src={StudentEnrolled} alt="Students Enrolled" fill />
                </div>
                <div className="text-sm md:text-base text-center md:text-left">
                  <p>Students Enrolled</p>
                  <p>{data.students_enroll || 'N/A'}</p>
                </div>
              </div>
              )}
              {/* Reviews / Testimonials */}
              {data.course_rating ? (
                <div className="md:flex items-center gap-4 text-center md:text-left">
                  <div className="relative w-8 h-8 mx-auto mb-1 md:ml-0 md:mr-0">
                    <Image src={reviewic} alt="Reviews" fill />
                  </div>
                  <div className="text-sm md:text-base text-center md:text-left">
                    <p>Reviews</p>
                    <p>{data.course_rating || "N/A"}</p>
                  </div>
                </div>
              ) : (
                 <div className="md:flex items-center gap-4 text-center md:text-left">
                  <div className="relative w-8 h-8 mx-auto mb-1 md:ml-0 md:mr-0">
                    <Image src={reviewic} alt="Reviews" fill />
                  </div>
                  <div className="text-sm md:text-base text-center md:text-center">
                  <a
                    href="/testimonials"
                    className="text-white block mb-2 mx-auto md:mx-0"
                  >
                    Testimonials
                    <Image width={25} height={25}
                    src={testimonialGif}
                    alt="For testimonials click here"
                    className="course-test-img mx-auto "
                  />
                  </a>
                  </div>
                </div>
              )}
              {/* Duration */}
              {data.duration && (
              <div className="md:flex items-center gap-4 text-center md:text-left">
                <div className="relative w-8 h-8 mx-auto mb-1 md:ml-0 md:mr-0">
                  <Image src={Duration} alt="Duration" fill />
                </div>
                <div className="text-sm md:text-base text-center md:text-left">
                  <p>Duration</p>
                  <p>{data.duration || 'N/A'}</p>
                </div>
              </div>
              )}
            </div>
          </div>
          <div className="flex justify-center">
 <button
            onClick={() => openModal("Quick Enquiry", "default")}
            className="md:mt-8 mt-4 mx-auto md:mx-0 block px-6 py-3 bg-white text-black font-semibold text-sm border border-white cursor-pointer hover:bg-black hover:text-white rounded-lg"
          >
            Quick Enquiry
          </button>
          </div>
          {/* ✅ CTA Button */}
         
        </div>

        <div className="col-span-1 lg:col-span-1 md:block hidden"></div>
      </div>

      {/* ✅ Modal */}
      {isModalOpen && (
  <QuickEnquiry
    closeModal={closeModal}
    variant={variant}     // controls UI
    formName={formName}   // controls API field
    course={data.course || data.course_name}
    city={data.city}
    state={data.state}
    country={data.country}
  />
)}
    </section>
  );
}
