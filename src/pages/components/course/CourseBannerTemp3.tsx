import Image from "next/image";
import QuickEnquiry from "../QuickEnquiry";
import { useState } from "react";
import { CourseData } from "@/redux/slices/courseSlice";
import parse, { domToReact } from "html-react-parser";
import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";
import { Element } from "domhandler";
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
console.log(data.brief_intro);
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
   //  ? `https://www.excelr.com/uploads/course/${data.course_image}`
   ? `https://demo3.excelr.com/uploads/course/${data.course_image}`
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
    <section className="course-banner bg-transparent relative w-full md:mx-auto md:py-16 md:pb-0 2xl:px-25 xl:px-20 lg:px-10 p-5  overflow-hidden  ">
<div className="block absolute inset-0 -z-10">
<Image
    src={bannerImageUrl}
    alt={data.course_name}
    fill
    priority
    fetchPriority="high"
    sizes="100vw"
    className="object-cover -z-10"
    quality={55}
  />
  </div>
      <div className="relative z-10 ">
        <div>
          {/* ✅ Course Name from API */}
          {/* <h1 className="text-3xl font-semibold">{data.course_name}</h1>

           */}

          {/* ✅ Short Description from API */}
          <div className="text-lg banerdeclyt">
  {parse(data.brief_intro ?? "", {
    replace: (domNode: any) => {
      // Replace the custom icon
      if (domNode.type === "tag" && domNode.name === "faarrowright") {
        return <RiArrowRightLine className="text-base inline-block" />;
      }

      // Replace Download Brochure button
      if (domNode.type === "tag" && domNode.name === "button") {
        return (
          <button
            type="button"
            className={domNode.attribs.class}
            onClick={(e) => {
              e.preventDefault();
              openModal("Download Brochure", "default");
            }}
          >
            {domToReact(domNode.children, {
              replace: (child: any) => {
                if (child.type === "tag" && child.name === "faarrowright") {
                  return <RiArrowRightLine className="text-base inline-block" />;
                }
              },
            })}
          </button>
        );
      }
    },
  })}
</div>
{/* <div className="flex justify-start">
              <button
                className="md:mt-5 mt-4 mx-auto flex md:mx-0 items-center gap-2.5 px-6 py-3 bg-[#FFAA33] text-[#154994] font-semibold text-base border border-[#154994] cursor-pointer hover:bg-black hover:text-white rounded-lg lead"
              >Download Brochure <RiArrowRightLine className="text-base" />
              </button>
            </div> */}
            {/* ✅ CTA Button */}
          
          {/* <div className="flex justify-center">
 <button
            onClick={() => openModal("Quick Enquiry", "default")}
            className="md:mt-8 mt-4 mx-auto md:mx-0 block px-6 py-3 bg-white text-black font-semibold text-sm border border-white cursor-pointer hover:bg-black hover:text-white rounded-lg"
          >
            Quick Enquiry
          </button>
          </div> */}
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
