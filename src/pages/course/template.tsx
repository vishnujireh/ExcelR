"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import bannerImageUrl from "../../../public/data-analyst-bnr.jpg";
import bannerimg from "../../../public/data-annex.png";
import countimage from "../../../public/young-student-woman.png";
import hiringpartnericon from "../../../public/Hiring-Partners-logo.svg";
import globalpresence from "../../../public/global-presence.svg";
import industryexperience from "../../../public/industry-experience.svg";
import collaboration from "../../../public/collaboration-iit.svg";
import Learners from "../../../public/80000-learners.svg";
import googlereviews from "../../../public/google-reviews.svg";
import { FaArrowRight, FaStar } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import connectorline from "../../../public/Connector line.svg"
import LongConnector from '../../../public/longconnector.svg'
import dottedLine from "../../../public/dotted.svg"
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import googlestars from '../../../public/4.8star.svg'
import logo_white from "../../../public/logo_white.png"
import paymenticon from "../../../public/ecavn.png";
import googlervn from "../../../public/googlrevn.svg"
 
import { SiMysql } from "react-icons/si";
import { RiBarChartLine } from "react-icons/ri";
import {
  RiTruckLine,
  RiHotelLine,
  RiBankLine,
  RiPlaneLine,
   RiFacebookCircleFill,
  RiInstagramLine,
  RiLinkedinBoxFill,
  RiTwitterXLine,
  RiYoutubeFill,
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiArrowRightLine,
  RiArrowRightUpLine 
} from "react-icons/ri";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import checkcircle from "../../../public/Check circle.svg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


const demandcourses = [
  {
    tag: "DS",
    title: "Data Science",
    desc: "From fundamentals to advanced...",
    img: "/demancourseimgae.png",
  },
  {
    tag: "FSD",
    title: "Full Stack Development",
    desc: "Build, deploy, and scale.",
    img: "/demancourseimgae.png",
  },
  {
    tag: "BA",
    title: "Business Analyst",
    desc: "Decode data-driven decisions.",
    img: "/demancourseimgae.png",
  },
  {
    tag: "DS",
    title: "Data Science",
    desc: "From fundamentals to advanced...",
    img: "/demancourseimgae.png",
  },
  {
    tag: "FSD",
    title: "Full Stack Development",
    desc: "Build, deploy, and scale.",
    img: "/demancourseimgae.png",
  },
];



const ratings = [
  {
    score: 4.8,
    company: "Google",
    logo: "/googleexclertemplate.png",
  },
  {
    score: 4.4,
    company: "Trustpilot",
    logo: "/trustpilottemplate.jpg",
  },
  {
    score: 4.7,
    company: "Mouthshut",
    logo: "/mouthshuttemplate.jpg",
  },
];



const dataanalysiscareer = [
  {
    img: "/growtharrow.svg",
    title: "India leads analytics hiring",
    description:
      "17.4% of all job postings now require data analytics skills."
  },
  {
    img: "/raisingsalaries.svg",
    title: "Rising salaries",
    description:
      "Entry-level Data Analysts in India earn an average of ₹7.3 LPA (2025)."
  },
  {
    img: "/globaldemand.svg",
    title: "Global demand surging",
    description:
      "U.S. entry-level Data Analyst salaries have risen from $90K to $111K in 2025."
  },
  {
    img: "/explosive market.svg",
    title: "Explosive market growth",
    description:
      "India’s data analytics industry ($3.55B in 2024) is growing at a 35.8% CAGR through 2030."
  },
];






const joinCourse = [
  {
    img: "/dedicated-placement.svg",
    title: "Dedicated Placement Cell",
    description:
      "Get placement assistance with a strong network of 5k+ hiring partners. This data analytics course helps you get job-ready.",
  },
  {
    img: "/mentorshipicon.svg",
    title: "Mentorship from Industry Experts",
    description:
      "Learn directly from top industry experts delivering real insights, practical techniques, and career-transforming guidance.",
  },
  {
    img: "/hands-on-learning.svg",
    title: "Hands-On Learning",
    description:
      "Apply what you learn in the data analyst course through 50+ assignments and 2+ capstone projects. Also access interview questions.",
  },
  {
    img: "/jumbopass.svg",
    title: "365-Day Jumbo Pass",
    description:
      "Enjoy unlimited live batches for one full year. Attend, revisit, and repeat sessions from your desired trainer on LMS.",
  },
];

const Alumniworks = [
  {
    img: "/Dellcompany.jpg",
    company: "Dell"
  },
  {
    img: "/nationaltrustbank.png",
    company: "National Trust Bank"
  },
  {
    img: "/cap-gemini.png",
    company: "Cap Gemini"
  },
  {
    img: "/benzoplast.jpg",
    company: "benzoplast"
  },
  {
    img: "/magicbricks.jpg",
    company: "magicbricks"
  },
  {
    img: "/IBM.jpg",
    company: "IBM"
  },
  {
    img: "/GITAM.png",
    company: "GITAM"
  },

  {
    img: "/cognizant.jpg",
    company: "cognizant"
  },
  {
    img: "/coromondel.png",
    company: "Coromondel"
  },
  {
    img: "/hewlett.png",
    company: "Hewlett Packard"
  },
  {
    img: "/ALSHAYAGROUP.jpg",
    company: "ALSHAYA GROUP"
  },
  {
    img: "/erisson.png",
    company: "Erisson"
  }, {
    img: "/ALSHAYAGROUP.jpg",
    company: "ALSHAYA GROUP"
  },
  {
    img: "/erisson.png",
    company: "Erisson"
  }
]
const benefits = [
  {
    title: "Recruitment Drives at Our Centres",

    img: "/Recruitment-Drive.svg",
  },
  {
    title: "Mock Interviews by Industry Professionals",

    img: "/Interview.svg",
  },
  {
    title: "Communication & Soft Skills Training",

    img: "/Communication.svg",
  },
  {
    title: "LinkedIn Profile Makeover",

    img: "/linkedin (2).svg",
  },
  {
    title: "Resume-Building Workshops",

    img: "/Resume.svg",
  },
  {
    title: "Regular Job Alerts & Interview Scheduling",

    img: "/Job Alerts.svg",
  },
];


const modules = [
  {
    id: "excel",
    title: "Excel & Advance Excel",
    icon: <RiBarChartLine className="text-green-600 text-xl" />,
    content:
      "This module lays the foundation and helps you reach an advanced level of Excel skills. Topics include the Basics of Excel, Pivot Tables and all the way to VBA and Macros."
  },
  {
    id: "mysql",
    title: "MySQL",
    icon: <SiMysql className="text-blue-600 text-xl" />,
    content:
      "Learn database concepts, SQL queries, joins, subqueries, indexes and real-world data extraction techniques."
  },
  {
    id: "tableau",
    title: "Tableau",
    icon: <RiBarChartLine className="text-orange-500 text-xl" />,
    content:
      "Build interactive dashboards, data stories, charts and visual analytics using Tableau."
  },
  {
    id: "powerbi",
    title: "Power BI",
    icon: <RiBarChartLine className="text-yellow-500 text-xl" />,
    content:
      "Learn Power BI Desktop, DAX, Power Query and advanced reporting techniques."
  }
];

interface LocationAccordionItem {
  title: string;
  content: string;
}

const trainingLocationsSections: LocationAccordionItem[] = [
  {
    title: "Data Analysis Certification Training locations in Bangalore",
    content:
      "BTM Layout, Marathahalli, Whitefield, Electronic City, Indiranagar",
  },
  {
    title: "Locations Offered",
    content:
      "Offline classroom training is available in major Bangalore locations.",
  },
  {
    title: "Other locations offered",
    content:
      "Online instructor-led training available across India.",
  },
];

const projects = [
  {
    id: 1,
    title: "Supply Chain Management",
    icon: <RiTruckLine className="text-blue-600 text-xl" />,
    description:
      "This project aims to build a Salesforce Analytics Dashboard that provides real-time visibility into sales pipeline health, lead conversions, revenue performance, and sales team efficiency. The goal is to enable sales leaders to forecast accurately, track sales KPIs, monitor team performance, and drive higher conversion rates by leveraging actionable insights embedded in Salesforce data.",
    bg: "bg-blue-100",
    activeBorder: "border-blue-300",
    activeText:"text-blue-600"
  },
  {
    id: 2,
    title: "Manufacturing Analytics",
    icon: <RiTruckLine className="text-orange-500 text-xl" />,
    description:
      "Analyze production efficiency, downtime, defect rates, and supply utilization to improve operational performance.",
    bg: "bg-orange-100",
    activeBorder: "border-orange-300",
    activeText:"text-orange-600"
  },
  {
    id: 3,
    title: "Hospitality Analytics",
    icon: <RiHotelLine className="text-purple-500 text-xl" />,
    description:
      "Track occupancy rates, customer preferences, revenue metrics, and booking trends for hotels and resorts.",
    bg: "bg-purple-100",
    activeBorder: "border-purple-300",
    activeText:"text-purple-600"
  },
  {
    id: 4,
    title: "Bank Analytics",
    icon: <RiBankLine className="text-green-600 text-xl" />,
    description:
      "Analyze customer behavior, loan performance, fraud detection, and financial KPIs in banking systems.",
    bg: "bg-green-100",
    activeBorder: "border-green-300",
    activeText:"text-green-600"
  },
  {
    id: 5,
    title: "Aviation Analytics",
    icon: <RiPlaneLine className="text-indigo-600 text-xl" />,
    description:
      "Monitor flight operations, delays, passenger trends, and fuel efficiency for airlines.",
    bg: "bg-indigo-100",
    activeBorder: "border-indigo-300",
    activeText:"text-indigo-600",
  }
];

const testimonials = [
  {
    name: "Vishal Aravind",
    role: "Data Analyst at Amazon",
    text: "ExcelR's Data Analyst course transformed my career. The hands-on approach and Capstone projects gave me confidence to excel in interviews.",
    logo: "/testimonial-Q-logo.png",
    experience: "Fresher",
    profile: "/testimonial-men.png",
    rating: 4,
    companylogo: "/companylogo.png",
    roleincomoany: "Data Analyst",
    linkedin:"/vishal-linkedin",
  },
  {
    name: "Jenifer",
    role: "Data Analyst at Amazon",
    text: "Capstone projects + mock interviews helped me land my dream job within 6 months of completing the course!",
    logo: "/testimonial-Q-logo.png",
    experience: "Fresher",
    profile: "/testimonial-girl.png",
    rating: 5,
    companylogo: "/companylogo.png",
    linkedin:"/vishal-linkedin",
    roleincomoany: "Data Analyst",
  },
  {
    name: "Vishal Aravind",
    role: "Data Analyst at Amazon",
    text: "ExcelR's Data Analyst course transformed my career. The hands-on approach and Capstone projects gave me confidence to excel in interviews.",
    logo: "/testimonial-Q-logo.png",
    experience: "Fresher",
    profile: "/testimonial-men.png",
    rating: 4,
    companylogo: "/companylogo.png",
    linkedin:"/vishal-linkedin",
    roleincomoany: "Data Analyst",
  },
  {
    name: "Jenifer",
    role: "Data Analyst at Amazon",
    text: "Capstone projects + mock interviews helped me land my dream job within 6 months of completing the course!",
    logo: "/testimonial-Q-logo.png",
    experience: "Fresher",
    profile: "/testimonial-girl.png",
    rating: 5,
    companylogo: "/companylogo.png",
    linkedin:"/vishal-linkedin",
    roleincomoany: "Data Analyst",
  },
];
const videos = [
  { id: 1, src: "/aluminivideo.png", big: true },
  { id: 2, src: "/aluminivideo.png" },
  { id: 3, src: "/aluminivideo.png" },
  { id: 4, src: "/aluminivideo.png" },
  { id: 5, src: "/aluminivideo.png" },
];
const faqData = {
  "About the Course": [
    "Is the course available in both classroom and live online modes?",
    "What happens if I miss a live class? Will recordings or backup sessions be available?",
    "Can I switch from classroom to online mode once the course starts?",
  ],
  "Eligibility and Prerequisites": [
    "What are the eligibility criteria for this course?",
    "Do I need prior knowledge or experience to join?",
  ],
  "Placement Support": [
    "Will there be placement assistance after course completion?",
    "Do you provide mock interviews or resume reviews?",
  ],
  "Certification and Outcomes": [
    "What certification will I receive after completion?",
    "How will this course help in career growth?",
  ],
  "Course Structure": [
    "How many modules are included?",
    "What is the duration of each module?",
  ],
  "Fees and Payment Options": [
    "What is the total course fee?",
    "Are there installment or EMI options available?",
  ],
};
type FAQData = {
  "About the Course": string[];
  "Eligibility and Prerequisites": string[];
  "Placement Support": string[];
  "Certification and Outcomes": string[];
  "Course Structure": string[];
  "Fees and Payment Options": string[];
};
import Gettrained from "../../../public/get-trained.svg"
import submitassignment from "../../../public/assignments.svg"
import guidedproject from '../../../public/guidedprojects.svg'
import certifieddata from '../../../public/certifieddata.svg'
import placementassistance from "../../../public/placementassistance.svg"
import jobready from "../../../public/jobready.svg"
import googlereviewmobile from "../../../public/googlereviews.svg"
import mobilearrowconnectorline from "../../../public/mobilearrowconnector.svg"
import mobilelearnpthcntr1 from "../../../public/mobileConnector line (1).svg"
import bgnhImageUrl from "../../../public/bgogn.svg"
import cnubgImageUrl from "../../../public/cnubg.svg"
import premieriits from "../../../public/premieriits.png"
import deloitte from "../../../public/hom-deloitte.png"
import { title } from "process";
const stepsTop = [
  { title: "Get Trained", icon: Gettrained },
  { title: "Submit Assignments", icon: submitassignment },
  { title: "Work on Guided Projects", icon: guidedproject },
];

const stepsBottom = [
  { title: "Become a Certified Data Analyst", icon: certifieddata },
  { title: "Avail Placement Assistance", icon: placementassistance },
  { title: "Get Job-Ready!", icon: jobready },
];

// Static Links
const companylinks = [
  { name: "Our Story", href: "" },
  { name: "Mission & Vision", href: "" },
  { name: "Impact", href: "" },
  { name: "ExcelR Edge", href: "" },
  { name: "CSR", href: "" },
];

const updatelinks = [
  { name: "Newsroom", href: "" },
  { name: "Media Kit", href: "" },
  { name: "Awards & Accolades", href: "" },
  { name: "Photo Gallery", href: "" },
];
const getintouchlinks = [
  { name: "Locate Us", href: "" },
  { name: "Contact Us", href: "" },
  { name: "Help Center", href: "" },
];
const peoplelinks = [
  { name: "Leadership", href: "" },
  { name: "Team", href: "" },
  { name: "Instructors", href: "" },
];
const discoverlinks = [
  { name: "Testimonials", href: "" },
  { name: "Alumni Success Stories", href: "" },
  { name: "Case Studies", href: "" },
];
const opportunitieslinks = [
  { name: "Work with us", href: "" },
  { name: "Write for us", href: "" },
  { name: "Partner with us", href: "" },
  { name: "Refer & Earn", href: "" },
  { name: "Group Discounts", href: "" },
  { name: "Invest in us", href: "" },
];
const partnerslinks = [
  { name: "Corporate Clients", href: "" },
  { name: "Placement Partners", href: "" },
  { name: "Academic Partners", href: "" },
];
const ourofflinecenterslinks = [
  { name: "Bangalore", href: "" },
  { name: "Hyderabad", href: "" },
  { name: "Mumbai", href: "" },
  { name: "Pune", href: "" },
  { name: "Noida", href: "" },
];

const policyLinks = [
  { name: "Terms And Conditions", href: "/terms-and-conditions" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Refund Policy", href: "/refund-policy" },
  { name: "Sitemap", href: "/sitemap" },
];
const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/excelr_official",
    icon: RiInstagramLine,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/ExcelR/",
    icon: RiFacebookCircleFill,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/excelrofficial",
    icon: RiLinkedinBoxFill,
  },
  {
    name: "Twitter",
    href: "https://x.com/ExcelR_Official",
    icon: RiTwitterXLine,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/channel/UCF2_gALht1C1NsAm3fmFLsg",
    icon: RiYoutubeFill,
  },
];
const bannercont = [
  {
    count: "80,000 +",
    title: "Learners",
    icon: Learners,
    showOn: "all",
  },
  {
    icon: premieriits,
    title: "In collaboration with",
    hideCount: true,
    showOn: "all",
  },
  {
    count: "5,000 +",
    title: "Hiring Partner",
    icon: hiringpartnericon,
    showOn: "all",
  },
  { 
    title: "4.8/5",
    hideCount: true,
    icon: googlervn,
    showOn: "mobile",
  },
];

const ourtrakrecord = [
  {
    title:"Global Presence in",
    heading:"40+ Countries",
    icon: globalpresence,
  },
  {
    title:"Industry experience of",
    heading:"12+ years",
    icon: industryexperience,
  },
  {
    icon:deloitte
  },
  {
    heading:"4.8/5",
    icon:googlervn
  }
]



const Step = ({
  title,
  icon,
  showConnector,
}: {
  title: string;
  icon: any;
  showConnector: boolean;
}) => (
  <div className="flex items-center justify-center">
    {/* Icon + Title */}
    <div className="flex flex-col items-center">
      <div className="relative w-[48px] h-[48px]">
        <Image src={icon} alt={title} fill className="object-contain" />
      </div>
      <p className="text-sm font-medium mt-1 max-w-[110px] text-gray-700 text-center leading-tight">
        {title}
      </p>
    </div>

    {/* Arrow Connector */}
    {showConnector && (
      <div className="flex-shrink-0 w-[200px] ml-3 relative h-[20px]">
        <Image
          src={connectorline}
          alt="Connector"
          fill
          className="object-contain"
        />
      </div>
    )}
  </div>
);




export default function Template() {
  const [activeModule, setActiveModule] = useState(modules[0]);
  const [openAccordionModuleId, setOpenAccordionModuleId] = useState<string | null>(null); // Mobile

  const [activeProject, setActiveProject] = useState(projects[0]);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const [showAllCompanies, setShowAllCompanies] = useState(false);
  const [activeTab, setActiveTab] = useState<keyof FAQData>("About the Course");
  const [openIndex, setOpenIndex] = useState<number | null>(null);


  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const [activeLocationIndex, setActiveLocationIndex] = useState<number | null>(0);

  const toggleLocationSection = (index: number) => {
    setActiveLocationIndex((prev) =>
      prev === index ? null : index
    );
  };
  const [showAllProjects, setShowAllProjects] = useState(false);

  const visibleProjects = showAllProjects ? projects : projects.slice(0, 4);

  

  return (
    <>
     <section className="course-banner relative w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 text-white overflow-hidden">
        <Image
          src={bannerImageUrl}
          alt="Artificial Intelligence (AI) Course Training in Thane"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover -z-10"
        />
        <div className="grid md:grid-cols-4 gap-4 relative z-10">
          <div className="col-span-3 lg:col-span-2">
            {/* ✅ Course Name from API */}
            <h1 className="md:text-2xl text-xl font-[200] mb-5 text-center md:text-left"><span className="font-bold text-3xl block">Data Analyst Course</span> With Placement Assistance</h1>
            {/* ✅ Short Description from API */}
            <div className="banerdec">
              <ul className="ml-0 space-y-5 text-base ">
                <li>6 Months of Learning</li>
                <li>Prestigious IIT Certificate</li>
                <li>No Coding Background Required</li>
                <li>Classroom &amp; Live Online Data Analyst Course Training</li>
                <li>100 Hours of Theory, 40 Hours of Practice Assignments, and 2 Hands-on Capstone Projects</li>
              </ul>
            </div>
        <div>
        <ul className="ml-0 mt-5 flex flex-col md:flex-row gap-4 w-full hidden md:flex">
  {bannercont
  .filter((item) => item.showOn !== "mobile")
  .map((item) => (
    <li
      key={item.title}
      className={`bg-[#E5EFFF] text-[#000000] font-medium px-4 py-3 rounded-xl shadow-lg flex-1 min-w-0 ${
        item.hideCount
          ? "flex flex-col items-center justify-center text-center"
          : "flex items-center gap-3"
      }`}
    >
      {item.hideCount ? (
        <>
          <p className="text-sm leading-tight mb-2">
            {item.title}
          </p>

          <Image
            src={item.icon}
            alt={item.title}
            className="w-21 h-auto object-contain"
          />
        </>
      ) : (
        <>
          <Image
            src={item.icon}
            alt={item.title}
            className="w-9 h-9 shrink-0"
          />

          <div className="min-w-0">
            <p className="font-semibold text-lg leading-tight">
              {item.count}
            </p>

            <p className="text-sm leading-tight">
              {item.title}
            </p>
          </div>
        </>
      )}
    </li>
 ))}
</ul>
        </div>

            <div className="flex justify-start">
              <button
                className="md:mt-8 mt-4 mx-auto flex md:mx-0 items-center gap-2.5 px-6 py-3 bg-[#FFAA33] text-[#154994] font-semibold text-sm border border-[#154994] cursor-pointer hover:bg-black hover:text-white rounded-lg"
              >Download Brochure <RiArrowRightLine className="text-base" />
              </button>
            </div>
            {/* ✅ CTA Button */}

          </div>
         <div className="col-span-1 lg:col-span-1 hidden lg:flex"></div>
          <div className="col-span-1 lg:col-span-1 hidden lg:flex">
            <div className="w-full h-auto relative max-w-xs mx-auto mt-6 lg:mt-0">
              <Image
                src={bannerimg}
                alt="Artificial Intelligence (AI) Course Training in Thane"

                priority
                fetchPriority="high"
                className="w-full h-auto object-contain img-fluid"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-[#F5FAFF] md:hidden">
        <div>
        <ul className="ml-0 mt-5 grid grid-cols-2 md:flex gap-4 w-full">
  {bannercont
  .filter((item) => item.showOn !== "desktop")
  .map((item) => (
    <li
      key={item.title}
      className={`text-[#000000] font-medium flex-1 min-w-0 px-2 py-2 rounded-xl border border-[#dee0e4] flex-1 ${
        item.hideCount
          ? "flex flex-col items-center justify-center text-center"
          : "flex items-center gap-3"
      }`}
    >
      {item.hideCount ? (
        <>
          <p className="text-sm leading-tight mb-2">
            {item.title}
          </p>

          <Image
            src={item.icon}
            alt={item.title}
            className="w-21 h-auto object-contain"
          />
        </>
      ) : (
        <>
          <Image
            src={item.icon}
            alt={item.title}
            className="w-9 h-9 shrink-0"
          />

          <div className="min-w-0">
            <p className="font-semibold text-base leading-tight">
              {item.count}
            </p>

            <p className="text-sm leading-tight">
              {item.title}
            </p>
          </div>
        </>
      )}
    </li>
  ))}
</ul>
        </div>
      </section>
      <section className="w-full md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5">
  <h2 className="text-center text-3xl font-semibold mb-9">
    Our Track Record
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-4">
    {ourtrakrecord.map((item, idx) => (
      <div
        key={idx}
        className={`flex items-center justify-center px-4  relative ${
          idx !== ourtrakrecord.length - 1
            ? "md:border-r-2 md:border-dashed md:border-[#A7C9FF]"
            : ""
        }`}
      >
        {/* First 2 Cards */}
        {item.title && item.heading ? (
          <div className="flex items-start gap-4">
            <Image
              src={item.icon}
              alt={item.heading}
              className="w-12 h-12 object-contain shrink-0"
            />

            <div>
              <p className="text-base leading-tight">
                {item.title}
              </p>

              <h3 className="text-xl font-semibold mt-1">
                {item.heading}
              </h3>
            </div>
          </div>
        ) : item.heading ? (
          /* 4th Card */
          <div className="flex flex-col items-center text-center">
            <h3 className="text-xl font-semibold mt-3">
              {item.heading}
            </h3>
            <Image
              src={item.icon}
              alt={item.heading}
              className="w-28 h-auto object-contain"
            />

           
          </div>
        ) : (
          /* 3rd Card */
          <Image
            src={item.icon}
            alt="track-record"
            className="w-28 h-auto object-contain"
          />
        )}
      </div>
    ))}
  </div>
</section>
    {/* <div className=" hidden md:block relative w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 lg:pb-0 bg-[#F5FAFF]">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-6 items-center">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex justify-start gap-5 items-center">
              <div className="  bg-[#5CADFF] w-24 h-24 p-3 rounded-full flex justify-center items-center">


                <Image
                  src={hiringpartnericon}
                  alt="Hiring Partners"

                  className="w-full h-auto object-contain img-fluid mx-auto"
                />

              </div>
              <div>
                <h3 className="text-2xl font-bold">150,000+</h3>
                <p className="text-lg font-medium">Hiring Partners</p>
              </div>
            </div>
            <div className="my-8 flex justify-start gap-5 items-center">
              <div className="  bg-[#5CADFF] w-24 h-24 p-3 rounded-full flex justify-center items-center">


                <Image
                  src={globalpresence}
                  alt="Global Presence"

                  className="w-full h-auto object-contain img-fluid mx-auto"
                />

              </div>
              <div>
                <p className="text-lg font-medium">Global Presence in</p>
                <h3 className="text-2xl font-bold">40+ countries</h3>
              </div>
            </div>
            <div className="flex justify-start gap-5 items-center">
              <div className="  bg-[#5CADFF] w-24 h-24 p-3 rounded-full flex justify-center items-center">


                <Image
                  src={industryexperience}
                  alt="Industry Experience"

                  className="w-full h-auto object-contain img-fluid mx-auto"
                />

              </div>
              <div>
                <p className="text-lg font-medium">Industry experience</p>
                <h3 className="text-2xl font-bold">12+ years</h3>
              </div>
            </div>
          </div>
          <div className="col-span-1 lg:col-span-1 text-center">
            <div>
              <Image
                src={countimage}
                alt="Artificial Intelligence (AI) Course Training in Thane"
                priority
                fetchPriority="high"
                className="w-full h-auto object-contain img-fluid mx-auto"
              />
            </div>

          </div>
          <div className="col-span-1 lg:col-span-1">
            <div className="text-end flex justify-end gap-5 items-center">
              <div>
                <p className="text-lg font-medium">In collaboration with</p>
                <h3 className="text-2xl font-bold">Premier IITs</h3>
              </div>
              <div className="  bg-[#5CADFF] w-24 h-24 p-3 rounded-full flex justify-center items-center">


                <Image
                  src={collaboration}
                  alt="collaboration "

                  className="w-full h-auto object-contain img-fluid mx-auto"
                />

              </div>
            </div>
            <div className="my-8 text-end flex justify-end gap-5 items-center">
              <div>
                <h3 className="text-2xl font-bold">80,000+</h3>
                <p className="text-lg font-medium">Learners</p>
              </div>
              <div className="  bg-[#5CADFF] w-24 h-24 p-3 rounded-full flex justify-center items-center">


                <Image
                  src={Learners}
                  alt="Learners "

                  className="w-full h-auto object-contain img-fluid mx-auto"
                />

              </div>
            </div>
            <div className="text-end flex justify-end gap-5 items-center">
              <div>
                <h3 className="text-2xl font-bold">4.8/5</h3>
                <p className="text-lg font-medium">Google Reviews</p>
              </div>
              <div className="  bg-[#5CADFF] w-24 h-24 p-3 rounded-full flex justify-center items-center">


                <Image
                  src={googlereviews}
                  alt="Google Reviews"

                  className="w-full h-auto object-contain img-fluid mx-auto"
                />

              </div>
            </div>
          </div>
        </div>
      </div> */}
    <div className="block md:hidden relative w-full ">
        <div className="flex flex-col">

          <div className="text-end flex justify-center gap-3 items-center">
            <div>
              <div className="  w-20 h-20 p-3 rounded-full flex justify-center items-center">


                <Image
                  src={googlereviewmobile}
                  alt="Google Reviews"

                  className="w-full h-auto object-contain img-fluid mx-auto"
                />

              </div>

            </div>
            <div className="flex flex-col justify-center items-center" >
              <div className="  w-20 h-10 rounded-full flex flex-col justify-center items-center">


                <Image
                  src={googlestars}
                  alt="Google Reviews"

                  className="w-full  object-contain img-fluid mx-auto"
                />
                <h3 className="text-xl font-bold">4.8/5</h3>


              </div>
              <div className="flex justify-center items-center">
              </div>




            </div>

          </div>

          <div className="flex">
            <div className="my-8 text-end flex justify-end gap-2 items-center border-r border-blue-300 px-2">
              <div className=" w-10 h-10 flex justify-center items-center">


                <Image
                  src={Learners}
                  alt="Learners "

                  className="w-full h-auto object-contain img-fluid mx-auto"
                />

              </div>
              <div className="text-start">
                <h3 className="text-sm font-bold">80,000+</h3>
                <p className="text-xs font-medium">Learners</p>
              </div>

            </div>
            <div className="text-end flex justify-end items-center my-8 border-r border-blue-300  px-2 ">

              <div className="text-start  ">
                <p className="text-xs font-medium">In collaboration with</p>
                <h3 className="text-sm font-bold text-red-500">Premier IITs</h3>
              </div>

            </div>

            <div className="flex justify-start gap-2 items-center my-8 ">
              <div className="w-10 h-10  justify-center items-center">


                <Image
                  src={hiringpartnericon}
                  alt="Hiring Partners"

                  className="w-full h-auto object-contain img-fluid mx-auto"
                />

              </div>
              <div className="text-start">
                <h3 className="text-sm font-bold">150,000+</h3>
                <p className="text-xs font-medium">Hiring Partners</p>
              </div>
            </div>

          </div>
        </div>
      </div>
       <div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5  bg-[#E5EFFF]">
        <h2 className="text-center text-3xl font-base mb-9 ">What You’ll Learn in Our <span className="block font-semibold"> Data Analytics Course</span>
          </h2>
        <div className="hidden md:flex grid md:grid-cols-2 gap-8 mx-auto">
          <div className="bg-[#CEE6FF] rounded-2xl overflow-hidden ">
            <div className="p-4 text-center">
              <h3 className="text-2xl font-semibold ">Core Modules</h3>
            </div>
            <div className="p-4">
              <div className="flex gap-3">

                {/* Tabs */}
                <div className="w-44 bg-transparent">
                  <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-2 ">
                    {modules.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveModule(item)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition cursor-pointer
                    ${activeModule.id === item.id
                            ? "bg-blue-100 border-blue-500 text-blue-700 font-semibold"
                            : "bg-white border-gray-200 hover:bg-gray-50"
                          }
                  `}
                      >
                        {item.icon}
                        <span className="text-sm">{item.id.charAt(0).toUpperCase() + item.id.slice(1)}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-white rounded-2xl p-5">
                  <h3 className="text-lg font-semibold text-[#2F327D] mb-2">
                    {activeModule.title}
                  </h3>
                  <p className="text-sm text-[#696984] leading-relaxed">
                    {activeModule.content}
                  </p>
                </div>

              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="bg-[#CEE6FF] rounded-2xl shadow-2xl overflow-hidden ">
              <div className="p-4 text-center">
                <h3 className="text-2xl font-semibold">Value-Added Modules</h3>
              </div>
              <div className="p-4">
                <div className="flex gap-3">

                  {/* Tabs */}
                  <div className="w-44 bg-transparent">
                    <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-2 ">
                      {modules.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setActiveModule(item)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition cursor-pointer
                    ${activeModule.id === item.id
                              ? "bg-blue-100 border-blue-500 text-blue-700 font-semibold"
                              : "bg-white border-gray-200 hover:bg-gray-50"
                            }
                  `}
                        >
                          {item.icon}
                          <span className="text-sm">{item.id.charAt(0).toUpperCase() + item.id.slice(1)}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-white rounded-2xl p-5">
                    <h3 className="text-lg font-semibold text-[#2F327D] mb-2">
                      {activeModule.title}
                    </h3>
                    <p className="text-sm text-[#696984] leading-relaxed">
                      {activeModule.content}
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="block md:hidden bg-white  overflow-hidden w-full">
          <div className="bg-[#155DFC] text-white py-4 text-center mt-5">
            <h3 className="text-xl font-semibold">Core Modules</h3>
          </div>

          <div className="divide-y rounded-2xl shadow-xl">
            {modules.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() =>
                    setOpenAccordionModuleId(openAccordionModuleId === item.id ? null : item.id)
                  }
                  className="w-full flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="text-gray-800 font-medium">{item.title}</span>
                  </div>

                  {openAccordionModuleId === item.id ? (
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>

                {openAccordionModuleId === item.id && (
                  <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="bg-[#155DFC] text-white py-4 text-center mt-10 mb-5">
            <h3 className="text-xl font-semibold">Value-Added Modules</h3>
          </div>

          <div className="divide-y rounded-2xl shadow-xl">
            {modules.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() =>
                    setOpenAccordionModuleId(openAccordionModuleId === item.id ? null : item.id)
                  }
                  className="w-full flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="text-gray-800 font-medium">{item.title}</span>
                  </div>

                  {openAccordionModuleId === item.id ? (
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>

                {openAccordionModuleId === item.id && (
                  <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>


      </div>
    <div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 slider-ful-hgt">
        <h2 className="text-center text-3xl font-semibold mb-9">Capstone Projects</h2>
        {/* Top Detail Card */}

        <div className="max-w-4xl mx-auto">
            <div
          className={`rounded-xl container border ${activeProject.activeBorder} ${activeProject.bg} p-6 mb-8 transition-all`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow">
              {activeProject.icon}
            </div>
            <h3 className="text-lg font-semibold">
              {activeProject.title}
            </h3>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">
            {activeProject.description}
          </p>

          <div className={`text-right text-sm font-semibold mt-4 flex items-center gap-1 justify-end transition-colors ${activeProject.activeText}
      
    `}>
            {activeProject.id}/{projects.length} <RiArrowUpSLine size={18} />
          </div>
        </div>
        </div>
        

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          spaceBetween={16}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 4 }
          }} 
          onSlideChange={(swiper) => {
            setActiveProject(projects[swiper.realIndex]);
          }}
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id}
             className="h-auto"
            style={{ paddingBottom: "50px" }}>
              <button
    onClick={() => setActiveProject(project)}
    className={`w-full h-full text-left rounded-xl md:p-4 border transition flex flex-col justify-between
      ${
        activeProject.id === project.id
          ? `${project.activeBorder} bg-white shadow-md`
          : `border-transparent ${project.bg} hover:bg-gray-100`
      }
    `}
  >
                <div className="flex items-center gap-3 max-w-[200px]">
                  <div className="w-10 h-10 flex items-center justify-center">
                    {project.icon}
                  </div>
                  <p className="text-lg font-medium text-balance">
                    {project.title}
                  </p>
                </div>

                <div
    className={`text-right text-sm font-semibold flex items-center gap-1 justify-end transition-colors
      ${
        activeProject.id === project.id
          ? project.activeText
          : `${project.activeText}`
      }
    `}
  >
                  {project.id}/{projects.length} <RiArrowDownSLine size={18} />
                </div>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    <section className="w-full md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-[#E5EFFF]">
  <div className="w-full mx-auto text-center">
    <h2 className="text-center text-3xl font-semibold mb-7">
      Certificates You’ll Earn
    </h2>

    {/* GRID */}
    <div className="hidden md:grid grid-cols-4 gap-8 mb-8 items-center">
      {/* ExcelR – 1 col */}
      <div className="col-span-1 flex flex-col items-center">
        <div className="w-full aspect-[3.1/4] relative">
          <Image
            src="/eclercerificate.png"
            alt="Certificate by ExcelR"
            fill
          />
        </div>
        <p className="mt-4 font-medium text-lg text-center">
          Certificate by <span className="font-bold">ExcelR</span>
        </p>
      </div>

      {/* NASSCOM – 2 cols */}
      <div className="col-span-2 flex flex-col items-center">
        <div className="w-full aspect-[6.5/4] relative">
          <Image
            src="/certificateNASSCOM.png"
            alt="Certificate by NASSCOM"
            fill
            className="object-contain"
          />
        </div>
        <p className="mt-4 font-medium text-lg text-center">
          Certificate by <span className="font-bold">NASSCOM</span>
        </p>
      </div>

      {/* AiVariant – 1 col */}
      <div className="col-span-1 flex flex-col items-center">
        <div className="w-full aspect-[3.1/4] relative">
          <Image
            src="/avarientcertificate.png"
            alt="Certificate by AiVariant"
            fill
            className="object-contain"
          />
        </div>
        <p className="mt-4 font-medium text-lg text-center">
          Certificate by <span className="font-bold">AiVariant</span>
        </p>
      </div>
    </div>

    {/* MOBILE */}
    <div className="md:hidden space-y-6">
      <div className="w-full aspect-[3/2] relative">
        <Image
          src="/certificateNASSCOM.png"
          alt="Certificate by NASSCOM"
          fill
          className="object-contain"
        />
      </div>
      <p className="font-medium text-center">
        Certificate by <span className="font-bold">NASSCOM</span>
      </p>

      <div className="grid grid-cols-2 gap-6">
        {/* ExcelR */}
        <div className="flex flex-col items-center">
          <div className="w-full aspect-[3/4] relative">
            <Image
              src="/eclercerificate.png"
              alt="Certificate by ExcelR"
              fill
            />
          </div>
          <p className="mt-3 font-medium text-center">
            Certificate by <span className="font-bold">ExcelR</span>
          </p>
        </div>

        {/* AiVariant */}
        <div className="flex flex-col items-center">
          <div className="w-full aspect-[3/4] relative">
            <Image
              src="/avarientcertificate.png"
              alt="Certificate by AiVariant"
              fill
              className="object-contain"
            />
          </div>
          <p className="mt-3 font-medium text-center">
            Certificate by <span className="font-bold">AiVariant</span>
          </p>
        </div>
      </div>
    </div>

    <p className="max-w-4xl mx-auto text-sm text-gray-700 leading-relaxed mt-10">
     ExcelR offers the best certifications as per the industry standards, which are designed to boost career growth in high-demand fields. We also provide globally recognised credentials, including certifications from IIT and FutureSkills Prime NASSCOM, a course completion certificate from ExcelR, and an internship certificate from AiVariant, along with hands-on projects to ensure practical skill development.
    </p>
  </div>
</section>

    <section className="w-full md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5">

        {/* Title */}
        <h2 className="text-center text-3xl font-semibold">Hear From Our Alumni</h2>


        {/* Video Carousel */}
        <div className="mt-12 flex gap-4 w-full justify-center">
          {videos.map((video, index) => (
            <div
              key={video.id}
              onClick={() => setActiveVideoIndex(index)}
              className={`
        relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300
        ${activeVideoIndex === index
                  ? "w-[480px] h-[290px] aspect-video"
                  : "w-[90px] h-[290px] opacity-70"}
      `}
            >
              <Image
                src={video.src}
                alt="Video thumbnail"
                fill
                priority
                fetchPriority="high"

                className={`
        
        ${activeVideoIndex === index
                    ? "object-cover "
                    : "object-cover"}
      `}
              />
            </div>
          ))}
        </div>


        {/* Carousel Dots */}
        <div className="flex gap-2 mt-5 justify-center">
          {videos.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${activeVideoIndex === index
                ? "bg-blue-600"
                : "bg-gray-300"
                }`}
            />
          ))}
        </div>
      </section>
      <div className="w-full md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 relative slider-ful-hgt">
        <div className="hidden md:block absolute inset-0 -z-10">
        <Image
            src={bgnhImageUrl}
            alt="Artificial Intelligence (AI) Course Training in Thane"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover -z-10"
            quality={55}
          />
          </div>
         
         {/* Testimonials */}
           <div className="grid grid-cols-6 gap-4">
          <div className="col-span-4 col-start-2">
            <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={2}
          slidesPerGroup={1}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          speed={600}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
          }}
          className="w-full px-5  md:px-14 pb-10"
        >
          {testimonials.map((t, index) => (
            <SwiperSlide key={index} style={{ paddingBottom: "50px" }}>
              <div
                key={index}
               className="flex flex-col justify-between h-full rounded-2xl shadow-lg p-6 bg-[#F9FAFB]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative w-14 h-14 overflow-hidden rounded-xl">
                    <Image
                      src={t.profile ?? "/images/default-profile.png"}
                      alt="profile"
                      fill
                      className="object-cover"
                    />
                  </div>


                  <div className=" flex w-full justify-between  ">
                    <div className="flex flex-col">
                      <div>
                        <p className="font-semibold">{t.name}</p>
                        <p className="text-xs text-gray-600 mb-1">{t.role}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <Link href={t.linkedin} target="_blank" rel="noopener noreferrer">
                        <RiLinkedinBoxFill className="text-[#2867b2]" />
                      </Link>
                        <div className="flex gap-1">
                          {Array.from({ length: t.rating }).map((_, i) => (
                            <FaStar key={i} className="text-orange-400" size={14} />
                          ))}
                        </div>
                      </div>



                    </div>
                    <div className="">
                      <Image
                        src="/testimonialdots.jpg"
                        alt="profile"
                        width={30}
                        height={30}

                        className="img-fluid object-contain"
                      />

                    </div>
                  </div>


                </div>

                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  “{t.text}”
                </p>

                <div className="flex items-end mt-auto justify-between pt-3 ">
                  <div className="mx-auto flex items-end gap-4">
                    <div className="text-xs text-gray-500">{t.experience}</div>
                    <FaArrowRight className="text-gray-600" size={18} />

                    <div className=" flex flex-col  gap-2">       <p className="text-xs text-gray-600">{t.roleincomoany}</p><Image src={t.companylogo} alt="Company logo" className="object-contain" width={60} height={20} /></div>
                  </div>
                  <div className="flex-shrink-0">

                    <Image src={t.logo} alt="Company logo ml-auto object-contain " width={30} height={30} />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
          </div>
          </div>
        
      </div>
    <div className="w-full md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5">
        <h2 className="text-center text-3xl font-semibold mb-9">Placement Assistance Benefits</h2>
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-4 col-start-2">
            <div className="grid grid-cols-3 gap-3 md:gap-6">
            
            {benefits.map((item, idx) => (
              <div
                key={idx}
                className="md:bg-[rgba(244,246,252,1)] rounded-xl md:p-6 transition-all duration-300 flex flex-col items-center justify-start"
              >
                <div className=" bg-[#fff] w-15 h-15 shadow mb-4 items-center mr-auto flex rounded-lg p-2">
                  <Image
                    src={item.img}
                    width={40}
                    height={40}
                    alt={item.title}
                    className="object-contain mx-auto"
                  />
                </div>

                <p className="md:text-lg  text-sm text-center md:text-start font-medium mb-2 mr-auto text-[#282938]">{item.title}</p>

              </div>
            ))}
          </div>
          </div>
        </div> 
      </div>
    <div className="w-full md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-[#E5EFFF]">
        <h2 className="text-center text-3xl font-semibold mb-6">Our Alumni Work At</h2>



        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 md:gap-6 gap-3 justify-center items-center w-full"
        >
          {(showAllCompanies ? Alumniworks : Alumniworks.slice(0, 12)).map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl p-3 flex justify-center items-center
      md:aspect-[16/9] w-full">
              <Image
                src={item.img}
                alt={item.company}
                width={200}
                height={100}
                className="object-contain w-full h-full"
              />
            </div>
          ))}
        </div>

    <div className="flex justify-center mt-6">
            <button
              onClick={() => setShowAllCompanies((prev) => !prev)}
              className="px-6 py-2 flex items-center  text-black rounded-lg font-medium hover:opacity-90 transition"
            >
              {showAllCompanies ? "View Less" : "View More"}
              <FiChevronDown />
            </button>
          </div>
 
      </div>
    <div className="w-full md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5">
        <h2 className="text-center text-3xl font-semibold mb-6">Data Analyst Course Fees</h2>


        <div className="w-full flex flex-col items-center gap-3 md:gap-10">
          {/* Heading */}


          {/* Pricing Cards Wrapper */}
          <div className="flex  flex-col md:flex-row gap-3 md:gap-8">

            {/* Classroom Card */}
            <div className="md:w-[390px] w-full bg-[#F4F6FC] border border-blue-500 rounded-xl px-6 py-6 shadow-sm">
              <h3 className="text-xl font-semibold text-center text-[#1B1E2C]">Classroom</h3>
              <hr className="border-blue-700 mt-6" />


              <p className="text-center text-sm line-through text-[#8F8F8F] mt-1">
                ₹67,999
              </p>

              <p className="text-center text-4xl font-bold text-[#1B1E2C] mt-1">
                ₹59,999
              </p>

              <div className="flex flex-col gap-3 mt-5">
                <div className="flex gap-2 text-sm items-center">
                  <Image
                    src={checkcircle}
                    width={16}
                    height={16}
                    alt="check"
                  />

                  Inclusive of the IIT certificate cost
                </div>
                <div className="flex gap-2 text-sm items-center">
                  <Image
                    src={checkcircle}
                    width={16}
                    height={16}
                    alt="check"
                  />
                  Capstone data projects
                </div>
                <div className="flex gap-2 text-sm items-center">
                  <Image
                    src={checkcircle}
                    width={16}
                    height={16}
                    alt="check"
                  />
                  Dedicated placement assistance
                </div>
                <div className="flex gap-2 text-sm items-center">
                  <Image
                    src={checkcircle}
                    width={16}
                    height={16}
                    alt="check"
                  />
                  Jumbo pass
                </div>
              </div>
              <div className="w-full h-1 relative mt-6">
                <Image src={dottedLine} alt="dotted" />
              </div>

              {/* <hr className="border-[#D3D7E0] mt-6" /> */}

              <p className="text-center text-[#1B4ED8] text-sm font-medium mt-2 cursor-pointer">
                Upcoming Batches &gt;&gt;&gt;
              </p>

              <div className="w-full bg-white rounded-lg border border-[#D3D7E0] flex items-center gap-2 mt-3 px-3 py-2">
                <Image
                  src="/creditcardicon.svg"
                  width={28}
                  height={20}
                  alt="emi"
                />
                <span className="text-xs text-[#444]">
                  Pay in EMIs with ZERO% Interest Rate
                </span>
              </div>

              <button className="w-full mt-4 bg-[#1B4ED8] text-white rounded-lg py-3 font-medium flex justify-center items-center gap-2">
                Enrol Now <RiArrowRightLine />
              </button>
            </div>

            {/* Live Online Card (Same Structure) */}
            <div className="md:w-[390px] bg-[#F4F6FC] border border-blue-500 rounded-xl px-6 py-6 shadow-sm">
              <h3 className="text-xl font-semibold text-center text-[#1B1E2C]">Live Online</h3>
              <hr className="border-blue-700 mt-6" />

              <p className="text-center text-sm line-through text-[#8F8F8F] mt-1">
                ₹51,999
              </p>

              <p className="text-center text-4xl font-bold text-[#1B1E2C] mt-1">
                ₹44,999
              </p>

              <div className="flex flex-col gap-3 mt-5">
                <div className="flex gap-2 text-sm items-center">
                  <Image
                    src={checkcircle}
                    width={16}
                    height={16}
                    alt="check"
                  />
                  Inclusive of the IIT certificate cost
                </div>
                <div className="flex gap-2 text-sm items-center">
                  <Image
                    src={checkcircle}
                    width={16}
                    height={16}
                    alt="check"
                  />
                  Capstone data projects
                </div>
                <div className="flex gap-2 text-sm items-center">
                  <Image
                    src={checkcircle}
                    width={16}
                    height={16}
                    alt="check"
                  />
                  Dedicated placement assistance
                </div>
                <div className="flex gap-2 text-sm items-center">
                  <Image
                    src={checkcircle}
                    width={16}
                    height={16}
                    alt="check"
                  />
                  Jumbo pass
                </div>
              </div>
              <div className="w-full h-1 relative mt-6">
                <Image src={dottedLine} alt="dotted" />
              </div>



              <p className="text-center text-[#1B4ED8] text-sm font-medium mt-2 cursor-pointer">
                Upcoming Batches &gt;&gt;&gt;
              </p>

              <div className="w-full bg-white rounded-lg border border-[#D3D7E0] flex items-center gap-2 mt-3 px-3 py-2">
                <Image
                  src="/creditcardicon.svg"
                  width={28}
                  height={20}
                  alt="emi"
                />
                <span className="text-xs text-[#444]">
                  Pay in EMIs with ZERO% Interest Rate
                </span>
              </div>

              <button className="w-full mt-4 bg-[#1B4ED8] text-white rounded-lg py-3 font-medium flex justify-center items-center gap-2">
                Enrol Now <RiArrowRightLine />
              </button>
            </div>

          </div>
        </div>
      </div>
    <section className="w-full md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5
bg-[linear-gradient(360deg,#DBEDFF_-0.02%,rgba(219,237,255,0)_107.9%)]">

        {/* Heading */}
        <h2 className="text-3xl font-semibold text-center mb-6">
          Classroom Tour
        </h2>

        {/* Video Container */}
        <div className="w-[1438px] max-w-full  flex justify-center rounded-xl">
          <div className="relative w-[900px] max-w-full overflow-hidden ">
            {/* Background Image */}
            <Image
              src="/excelrclassrom.png" // change to your actual image
              alt="Classroom"
              width={1200}
              height={700}
              className="w-full h-full object-cover rounded-3xl"
            />

            {/* Dark bottom strip */}


            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center ">

              <button>
                <div className="bg-white rounded-full opacity-70">
                  <div className="bg-white rounded-full ">
                    <div className="w-[130px] h-[130px] rounded-full    flex items-center justify-center  cursor-pointer" style={{
                      backgroundImage: 'url("/playbuttonbg.jpg")', backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat'
                    }}>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="pt-10">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Why Join Our Data Analyst Course?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-10 md:max-w-5xl mx-auto">
            {joinCourse.map((item, idx) => (
              <div key={idx} className="flex md:flex-col gap-2 md:gap-0 items-center text-center   rounded-xl md:rounded-none py-2 md:py-0 px-2 bg-white md:bg-transparent m-2 md:m-0">
                <div className="md:w-20 md:h-20  md:mb-4 relative">
                  <Image src={item.img} alt={item.title} fill className="w-full h-full object-contain" />
                </div>
                <div className="flex-col text-center md:text-center">
                  <h3 className="font-semibold text-lg text-left md:text-center mb-2 ">{item.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    <section className="w-full md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 ">
        <div className=" max-w-full ">
          <h2 className=" text-3xl font-semibold mb-3 text-center">
            Learning Path
          </h2>

          {/* Top Row */}
          <div className="hidden md:block">
            <div className="relative flex justify-center gap-1 items-center mb-20">
              {stepsTop.map((step, index) => (
                <Step
                  key={index}
                  {...step}
                  showConnector={index < 2} // only show for first two steps
                />


              ))}


              {/* Horizontal Line */}
              <div className="absolute top-7 translate-x-5 " >
                <Image src={LongConnector} alt="LongConnector" />
              </div>
            </div>

            {/* Connector Curve */}


            {/* Bottom Row */}
            <div className="relative flex justify-between items-center mt-10 pt-15 ml-10">
              {stepsBottom.map((step, index) => (
                <Step
                  key={index}
                  {...step}
                  showConnector={index < 2} // only show for first two steps
                />
              ))}

              {/* Horizontal Line */}

            </div>

          </div>

          <div className="relative block md:hidden w-full max-w-[430px] mx-auto px-2 pt-2 pb-4">
            <div className="relative grid grid-cols-3 items-start text-center">
              <div className="absolute left-[22%] top-5 z-0 h-6 w-[24%]">
                <Image
                  src={mobilearrowconnectorline}
                  alt="Connector"
                  fill
                  className="object-contain rotate-180"
                />
              </div>
              <div className="absolute left-[55%] top-5 z-0 h-6 w-[24%]">
                <Image
                  src={mobilearrowconnectorline}
                  alt="Connector"
                  fill
                  className="object-contain rotate-180"
                />
              </div>

              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="w-10 h-10">
                  <Image src={Gettrained} alt="Gettrained" />
                </div>
                <p className="text-xs font-semibold leading-tight">Get Trained</p>
              </div>

              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="w-10 h-10">
                  <Image src={submitassignment} alt="submitassignment" />
                </div>
                <p className="text-xs font-semibold leading-tight">Submit<br />Assignments</p>
              </div>

              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="w-10 h-10">
                  <Image src={guidedproject} alt="guidedproject" />
                </div>
                <p className="text-xs font-semibold leading-tight">Work on<br />Guided Projects</p>
              </div>
            </div>

            <div className="relative h-20">
              <div className="absolute right-0 top-1 h-full w-[78%]">
                <Image
                  src={mobilelearnpthcntr1}
                  alt="mobilelearnpthcntr1"
                  fill
                  className="object-fill"
                />
              </div>
            </div>

            <div className="relative grid grid-cols-3 items-start text-center">
              <div className="absolute left-[22%] top-5 z-0 h-6 w-[24%]">
                <Image
                  src={mobilearrowconnectorline}
                  alt="Connector"
                  fill
                  className="object-contain rotate-180"
                />
              </div>
              <div className="absolute left-[55%] top-5 z-0 h-6 w-[24%]">
                <Image
                  src={mobilearrowconnectorline}
                  alt="Connector"
                  fill
                  className="object-contain rotate-180"
                />
              </div>

              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="w-10 h-10">
                  <Image src={certifieddata} alt="certifieddata" />
                </div>
                <p className="text-xs font-semibold leading-tight">Become a Certified<br />Data Analyst</p>
              </div>

              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="w-10 h-10">
                  <Image src={placementassistance} alt="placementassistance" />
                </div>
                <p className="text-xs font-semibold leading-tight">Avail Placement<br />Assistance</p>
              </div>

              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="w-10 h-10">
                  <Image src={jobready} alt="jobready" />
                </div>
                <p className="text-xs font-semibold leading-tight">Get Job-Ready!</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    <div className="w-full md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 relative">
       <div className="hidden md:block absolute inset-0 -z-10">
        <Image
            src={cnubgImageUrl}
            alt="Artificial Intelligence (AI) Course Training in Thane"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover -z-10"
            quality={55}
          />
          </div>
        <h2 className="text-3xl font-semibold text-white text-center mb-12">Why Choose Data Analytics as Your Career?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 px-3 md:px-0  md:max-w-[800px] mx-auto justify-items-center gap-8 ">
          {dataanalysiscareer.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-start p-6 border border-white border-1 bg-white/20 backdrop-blur-md rounded-xl md:shadow-lg w-full md:w-[380px]">
              <div className="relative w-10 h-10 mb-2 mr-auto">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-semibold text-white  text-lg mb-2 text-start mr-auto">{item.title}</h3>
              <p className="text-white text-sm leading-relaxed text-start mr-auto">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    <div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-[#E5EFFF]">
        <h2 className="text-center text-3xl font-semibold mb-8">
          Frequently Asked Questions
        </h2>
        <div className="hidden 2xl:flex flex-wrap justify-center gap-3 mb-8">
          {Object.keys(faqData).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as keyof FAQData)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm border transition cursor-pointer
        ${activeTab === tab ? "bg-blue-600 text-white" : "bg-transparent border-blue-600 hover:bg-gray-100"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tabs */}
        <div className="block 2xl:hidden mb-8 relative">
          <Swiper
            slidesPerView="auto"
            spaceBetween={10}
            modules={[Navigation]}
            navigation={{
              nextEl: ".next-btn",
              prevEl: ".prev-btn",
            }}
            className="w-full flex items-center"
          >
            {Object.keys(faqData).map((tab) => (
              <SwiperSlide key={tab} className="!w-auto">
                <button
                  onClick={() => setActiveTab(tab as keyof FAQData)}
                  className={`px-1.5 py-2 rounded-lg font-medium border  border-blue-400 border-1 transition
            ${activeTab === tab ? "bg-blue-600 text-white" : "bg-white  hover:bg-gray-100"}`}
                >
                  {tab}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Swiper Nav Buttons */}
          <div className="flex justify-between  -left-6 md:-left-13 -right-6  md:-right-13 gap-4 mt-2 absolute top-0">
            <button className="prev-btn px-1 md:px-3 py-1  rounded z-[40]"><FaChevronLeft /></button>
            <button className="next-btn px-1 md:px-3 py-1  rounded z-[40]"><FaChevronRight /></button>
          </div>
        </div>


        {/* Accordion */}
        <div className="max-w-5xl mx-auto ">
          {faqData[activeTab].map((question, index) => (
             <div className="space-y-4 accordion-group coursetm2" id="accordionfaq" key={index}>
<details className="border-b border-gray-300">
  <summary className="w-full flex justify-between gap-3 cursor-pointer items-center text-left text-base px-5 py-4 font-semibold text-[#3F3F3F] bg[#E5EFFF]"> {question}</summary>
<div className="p-5 text-[#666] text-sm leading-6 pt-2">
<ul className="list-disc ml-5">
	<li>The all new and exclusive JUMBO PASS is the latest initiative taken by ExcelR to offer you access to attend unlimited batches over the duration of 365 days. You will be able to attend unlimited number of classes for the course of your choice.</li>
</ul>
</div>
</details>
 
</div>
          ))}
        </div>
      </div>
    <div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5">
        <h2 className="text-3xl font-semibold mb-7 text-center">
          Our Ratings Across the Web
        </h2>

        <div className="flex flex-row md:flex-row gap-3 md:gap-8 md:gap-12 justify-center items-center">
          {ratings.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg px-3 py-2 md:px-6 md:py-4 flex flex-col items-center"
            >
              <div className="flex items-center gap-2 mb-2 text-3xl font-semibold">
                {item.score} <span className="text-yellow-400"><FaStar className="text-orange-400" /></span>
              </div>
              <div className="md:w-32 w-16 h-6 md:h-12 relative">
                <Image
                  src={item.logo}
                  alt={item.company}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    <section className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-[#E5EFFF]">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-2">In-Demand Courses</h2>

          {/* Swiper */}
          <div className="relative w-full px-5 max-w-5xl mx-auto pt-5 sliderdmd">
            <Swiper
              modules={[Navigation, Autoplay]}
                     spaceBetween={20}
                     navigation
                     autoplay={{ delay: 2500, disableOnInteraction: false }}
                     loop
                     observer
                     observeParents
                     breakpoints={{
                       320: { slidesPerView: 1 },
                       480: { slidesPerView: 1 },
                       640: { slidesPerView: 2 },
                       768: { slidesPerView: 2 },
                       1024: { slidesPerView: 3 },
                       1280: { slidesPerView: 3 },
                     }}
            >
              {demandcourses.map((item, idx) => (
                <SwiperSlide key={idx} className="flex gap-5  justify-center">
                  <div className="w-full bg-white rounded-xl flex flex-col overflow-hidden border border-gray-100">
                    <div className="p-4">
                       <div className="relative w-full h-40">
                      <Image src={item.img} alt={item.title} fill className="object-cover rounded-xl" />
                      <div className="absolute top-2 left-2 bg-white rounded-md px-2 py-1 text-xs font-semibold shadow-sm">
                        {item.tag}
                      </div>
                    </div>
                    </div>
                    <div className="px-4 text-left space-y-2 pb-4">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                       <div className="border-t border-gray-200 px-4 text-center">
                      <Link href="" className="flex justify-center items-center text-sm font-medium text-black mx-auto py-4">
                        Know more
                        <span className="ml-2 bg-white shadow-lg p-2 rounded-lg">
                          <RiArrowRightUpLine className="text-gray-600"  size={16} />
                        </span>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
             
          </div>
        </div>
      </section>
    <section className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5">
        <div className="w-full flex justify-center">
         <iframe
              title="ExcelR Location"
             src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15128.959690600594!2d73.9175774!3d18.5632191!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c1462bf0a69f%3A0xf09474b5ece67335!2sExcelR%20-%20Data%20Science%2C%20Data%20Analyst%20Course%20Training!5e0!3m2!1sen!2sin!4v1702290746068!5m2!1sen!2sin" className="w-full h-[300px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
        <div className="w-full mt-10  rounded-md overflow-hidden">
          {trainingLocationsSections.map((section, index) => (
            <div key={index} className="border-b border-gray-300">
              <button
                onClick={() => toggleLocationSection(index)}
                className="w-full flex items-center justify-between px-3 py-4 text-left text-lg font-medium text-gray-900 cursor-pointer"
              >
                <span>{section.title}</span>

                <FiChevronDown
                  className={`text-xl transition-transform duration-200 ${activeLocationIndex === index ? "rotate-180" : ""
                    }`}
                />
              </button>

              {activeLocationIndex === index && (
                <div className="px-6 pb-4 text-sm text-gray-600">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>

      </section>
     {/* Start Template 2 footer */}

     <footer>
      <div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-[#1E2C48] text-white">
        <div className="grid md:grid-cols-4 grid-cols-1 gap-4 mt-4 items-center mb-4">
              <div className="col-span-3 lg:col-span-3">
                  <Image src={logo_white} alt="Payment Partners" width={180} height={50} />
                 <p className="text-lg font-medium mt-3">We Don’t Just Train, <br/>We Build Careers!</p>
              </div>
              <div className="col-span-1 lg:col-span-1">
                <p className="mb-2 tex-base">Keep up with us</p>
                <ul className="md:mb-0 mb-3">
                  <ul>
  {socialLinks.map((l) => {
    const Icon = l.icon; // ✅ THIS LINE IS REQUIRED

    return (
      <li key={l.name} className="inline-block mr-3">
        <Link
          href={l.href}
          target="_blank"
          aria-label={l.name}
          className="text-white hover:text-primary transition"
        >
          <Icon size={25} />
        </Link>
      </li>
    );
  })}
</ul>

                </ul>
              </div>
            </div>
         <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mt-5">
              <div className="col-span-1 lg:col-span-1">
                <p className="text-md font-semibold">Company</p>
                <ul>
                  {companylinks.map((l) => (
                    <li key={l.name} className="my-2">
                      <Link href={l.href} className="text-sm text-white">{l.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-1">
                <p className="text-md font-semibold">Updates</p>
                <ul>
                  {updatelinks.map((l) => (
                    <li key={l.name} className="my-2">
                      <Link href={l.href} className="text-sm text-white">{l.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-1">
                <p className="text-md font-semibold">Get in Touch</p>
                <ul>
                  {getintouchlinks.map((l) => (
                    <li key={l.name} className="my-2">
                      <Link href={l.href} className="text-sm text-white">{l.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-1">
                 <p className="text-md font-semibold">People</p>
                <ul>
                  {peoplelinks.map((l) => (
                    <li key={l.name} className="my-2">
                      <Link href={l.href} className="text-sm text-white">{l.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="col-span-1">
                 <p className="text-md font-semibold">Discover</p>
                <ul>
                  {discoverlinks.map((l) => (
                    <li key={l.name} className="my-2">
                      <Link href={l.href} className="text-sm text-white">{l.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="col-span-1">
                 <p className="text-md font-semibold">Opportunities</p>
                <ul>
                  {opportunitieslinks.map((l) => (
                    <li key={l.name} className="my-2">
                      <Link href={l.href} className="text-sm text-white">{l.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-1">
                 <p className="text-md font-semibold">Partners</p>
                <ul>
                  {partnerslinks.map((l) => (
                    <li key={l.name} className="my-2">
                      <Link href={l.href} className="text-sm text-white">{l.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-1">
                 <p className="text-md font-semibold">Our Offline Centres</p>
                <ul>
                  {ourofflinecenterslinks.map((l) => (
                    <li key={l.name} className="my-2">
                      <Link href={l.href} className="text-sm text-white">{l.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

         <div>
            <div className="grid md:grid-cols-4 grid-cols-1 gap-4 mt-4 items-center mb-2">
              <div className="col-span-3 lg:col-span-3">
                 <p className="text-md font-semibold">EMI Partners</p>
                  <Image src={paymenticon} alt="Payment Partners" width={300} height={50} />
              </div>
              <div className="col-span-1 lg:col-span-1"></div>
            </div>
          </div>
      </div>

      <div className="text-center bg-[#1E2C48] py-5 md:mb-10 border-t border-white">
        <p className="text-base text-white">© 2025 ExcelR Solutions. All rights reserved.</p>
        <ul className="fotrlink mx-auto text-center justify-center mt-2">
                  {policyLinks.map((l) => (
                    <li key={l.name} className="inline-block">
                      <Link href={l.href} className="text-sm text-white">{l.name}</Link>
                    </li>
                  ))}
                </ul>
      </div>
    </footer>

     {/* End Template 2 footer */}
    </>
  );
}
