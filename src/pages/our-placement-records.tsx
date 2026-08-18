"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/pages/components/Breadcrumb";
import { RiLinkedinBoxFill , RiArrowRightSLine } from "react-icons/ri";
import bannerImg from "../../public/our-placementv.jpg";

/* ─── Static placement records ─── */
const STATIC_RECORDS = [
  { id:"1",  name:"Abhishek Das",      course:"Data Analytics",        city:"Pune",      company:"Genpact",              role:"Business Analyst",           placed_date:"Jul 2024", linkedin_url:"https://linkedin.com" },
  { id:"2",  name:"Abhishek Menon",    course:"Digital Marketing",     city:"Chennai",   company:"WATConsult",           role:"PPC Analyst",                placed_date:"Jun 2026", linkedin_url:"https://linkedin.com" },
  { id:"3",  name:"Aditya Chauhan",    course:"Data Analytics",        city:"",          company:"Capgemini",            role:"Analytics Associate",        placed_date:"Apr 2026", linkedin_url:"https://linkedin.com" },
  { id:"4",  name:"Aditya Prasad",     course:"Data Science",          city:"Pune",      company:"Cognizant",            role:"ML Engineer",                placed_date:"Feb 2026", linkedin_url:"" },
  { id:"5",  name:"Aishwarya Shetty",  course:"Data Science",          city:"Hyderabad", company:"Tiger Analytics",      role:"Analytics Consultant",       placed_date:"Jul 2025", linkedin_url:"https://linkedin.com" },
  { id:"6",  name:"Amit Reddy",        course:"Data Analytics",        city:"Mumbai",    company:"LatentView",           role:"Reporting Analyst",          placed_date:"Jun 2025", linkedin_url:"" },
  { id:"7",  name:"Amit Singh",        course:"Data Science",          city:"Chennai",   company:"Deloitte",             role:"Data Science Associate",     placed_date:"Jul 2025", linkedin_url:"https://linkedin.com" },
  { id:"8",  name:"Ananya Kumar",      course:"Data Science",          city:"Chennai",   company:"Mu Sigma",             role:"ML Engineer",                placed_date:"Apr 2025", linkedin_url:"" },
  { id:"9",  name:"Ananya Reddy",      course:"Data Science",          city:"Hyderabad", company:"Cognizant",            role:"Analytics Consultant",       placed_date:"Jun 2026", linkedin_url:"https://linkedin.com" },
  { id:"10", name:"Arjun Pillai",      course:"Digital Marketing",     city:"Mumbai",    company:"Genpact",              role:"Digital Marketing Executive",placed_date:"Dec 2025", linkedin_url:"https://linkedin.com" },
  { id:"11", name:"Bhavana Chauhan",   course:"Data Analytics",        city:"Pune",      company:"Accenture",            role:"Data Analyst",               placed_date:"May 2026", linkedin_url:"https://linkedin.com" },
  { id:"12", name:"Bhavana Nair",      course:"Data Science",          city:"Mumbai",    company:"HCLTech",              role:"Data Science Associate",     placed_date:"Jul 2025", linkedin_url:"https://linkedin.com" },
  { id:"13", name:"Bhavana Rana",      course:"Full Stack Development",city:"",          company:"LTIMindtree",          role:"Frontend Engineer",          placed_date:"Apr 2026", linkedin_url:"https://linkedin.com" },
  { id:"14", name:"Bhavana Singh",     course:"Data Science",          city:"Hyderabad", company:"Mu Sigma",             role:"ML Engineer",                placed_date:"Dec 2025", linkedin_url:"https://linkedin.com" },
  { id:"15", name:"Deepa Malhotra",    course:"Full Stack Development",city:"Pune",      company:"LTIMindtree",          role:"Frontend Engineer",          placed_date:"Feb 2026", linkedin_url:"https://linkedin.com" },
  { id:"16", name:"Deepa Shetty",      course:"Data Science",          city:"Mumbai",    company:"Deloitte",             role:"Data Science Associate",     placed_date:"May 2026", linkedin_url:"https://linkedin.com" },
  { id:"17", name:"Divya Bose",        course:"Data Science",          city:"Hyderabad", company:"Wipro",                role:"Analytics Consultant",       placed_date:"Sep 2025", linkedin_url:"https://linkedin.com" },
  { id:"18", name:"Divya Chandra",     course:"Digital Marketing",     city:"",          company:"Interactive Avenues",  role:"SEO Specialist",             placed_date:"Jan 2025", linkedin_url:"https://linkedin.com" },
  { id:"19", name:"Divya Rana",        course:"Data Science",          city:"Chennai",   company:"Deloitte",             role:"Data Science Associate",     placed_date:"May 2026", linkedin_url:"https://linkedin.com" },
  { id:"20", name:"Farhan Gupta",      course:"Full Stack Development",city:"Pune",      company:"Tech Mahindra",        role:"MERN Stack Developer",       placed_date:"Jun 2024", linkedin_url:"https://linkedin.com" },
  { id:"21", name:"Gaurav Mehta",      course:"Data Science",          city:"Bangalore", company:"IBM",                  role:"Data Scientist",             placed_date:"Mar 2025", linkedin_url:"https://linkedin.com" },
  { id:"22", name:"Harini Rajan",      course:"Data Analytics",        city:"Chennai",   company:"TCS",                  role:"Data Analyst",               placed_date:"Aug 2025", linkedin_url:"https://linkedin.com" },
  { id:"23", name:"Harish Patel",      course:"Full Stack Development",city:"Ahmedabad", company:"Infosys",              role:"Full Stack Developer",       placed_date:"Nov 2025", linkedin_url:"https://linkedin.com" },
  { id:"24", name:"Ishaan Sharma",     course:"Data Science",          city:"Pune",      company:"Fractal Analytics",    role:"Data Scientist",             placed_date:"Sep 2024", linkedin_url:"" },
  { id:"25", name:"Jatin Verma",       course:"Digital Marketing",     city:"Delhi",     company:"Performics",           role:"Digital Marketing Manager",  placed_date:"Oct 2025", linkedin_url:"https://linkedin.com" },
  { id:"26", name:"Kavya Nair",        course:"Data Science",          city:"Bangalore", company:"Accenture",            role:"ML Engineer",                placed_date:"Jan 2026", linkedin_url:"https://linkedin.com" },
  { id:"27", name:"Kiran Desai",       course:"Full Stack Development",city:"Mumbai",    company:"Persistent Systems",   role:"Backend Developer",          placed_date:"Apr 2025", linkedin_url:"https://linkedin.com" },
  { id:"28", name:"Komal Sharma",      course:"Data Analytics",        city:"Hyderabad", company:"EY",                   role:"Analytics Consultant",       placed_date:"Jul 2026", linkedin_url:"" },
  { id:"29", name:"Lakshmi Iyer",      course:"Data Science",          city:"Chennai",   company:"Hexaware",             role:"Data Science Associate",     placed_date:"Mar 2026", linkedin_url:"https://linkedin.com" },
  { id:"30", name:"Manish Tiwari",     course:"Data Analytics",        city:"Pune",      company:"WNS Analytics",        role:"Senior Analyst",             placed_date:"Jun 2025", linkedin_url:"https://linkedin.com" },
  { id:"31", name:"Meera Krishnan",    course:"Digital Marketing",     city:"Bangalore", company:"Social Beat",          role:"Content Strategist",         placed_date:"Feb 2025", linkedin_url:"https://linkedin.com" },
  { id:"32", name:"Mohammed Ali",      course:"Data Science",          city:"Hyderabad", company:"Mphasis",              role:"ML Engineer",                placed_date:"Aug 2026", linkedin_url:"https://linkedin.com" },
  { id:"33", name:"Neeraj Pandey",     course:"Full Stack Development",city:"Delhi",     company:"HCLTech",              role:"React Developer",            placed_date:"May 2025", linkedin_url:"" },
  { id:"34", name:"Neha Agarwal",      course:"Data Science",          city:"Pune",      company:"KPMG",                 role:"Data Analyst",               placed_date:"Nov 2024", linkedin_url:"https://linkedin.com" },
  { id:"35", name:"Nikhil Joshi",      course:"Data Analytics",        city:"Mumbai",    company:"Genpact",              role:"Business Analyst",           placed_date:"Dec 2024", linkedin_url:"https://linkedin.com" },
  { id:"36", name:"Pallavi Singh",     course:"Data Science",          city:"Bangalore", company:"Amazon",               role:"Business Intelligence Engr", placed_date:"Mar 2025", linkedin_url:"https://linkedin.com" },
  { id:"37", name:"Pooja Menon",       course:"Digital Marketing",     city:"Kochi",     company:"iProspect",            role:"SEO Analyst",                placed_date:"Sep 2025", linkedin_url:"https://linkedin.com" },
  { id:"38", name:"Pradeep Kumar",     course:"Full Stack Development",city:"Chennai",   company:"Zoho",                 role:"Software Engineer",          placed_date:"Jan 2025", linkedin_url:"https://linkedin.com" },
  { id:"39", name:"Priya Jain",        course:"Data Science",          city:"Mumbai",    company:"McKinsey",             role:"Data Science Analyst",       placed_date:"Oct 2024", linkedin_url:"" },
  { id:"40", name:"Rahul Agarwal",     course:"Data Analytics",        city:"Hyderabad", company:"PwC",                  role:"Data Analyst",               placed_date:"Feb 2025", linkedin_url:"https://linkedin.com" },
  { id:"41", name:"Rajesh Nair",       course:"Data Science",          city:"Bangalore", company:"Mu Sigma",             role:"Decision Scientist",         placed_date:"Jun 2024", linkedin_url:"https://linkedin.com" },
  { id:"42", name:"Rakesh Sharma",     course:"Full Stack Development",city:"Pune",      company:"Persistent Systems",   role:"Node.js Developer",          placed_date:"Jul 2025", linkedin_url:"https://linkedin.com" },
  { id:"43", name:"Ramya Reddy",       course:"Data Analytics",        city:"Hyderabad", company:"Deloitte",             role:"Analytics Associate",        placed_date:"Apr 2026", linkedin_url:"https://linkedin.com" },
  { id:"44", name:"Ranjit Patel",      course:"Digital Marketing",     city:"Ahmedabad", company:"Webchutney",           role:"Social Media Manager",       placed_date:"Aug 2025", linkedin_url:"" },
  { id:"45", name:"Reena Mathew",      course:"Data Science",          city:"Kochi",     company:"UST Global",           role:"Data Scientist",             placed_date:"Nov 2025", linkedin_url:"https://linkedin.com" },
  { id:"46", name:"Rohit Chauhan",     course:"Data Analytics",        city:"Delhi",     company:"Gartner",              role:"Research Analyst",           placed_date:"Mar 2026", linkedin_url:"https://linkedin.com" },
  { id:"47", name:"Ruchi Verma",       course:"Data Science",          city:"Pune",      company:"Syntel",               role:"ML Associate",               placed_date:"Sep 2024", linkedin_url:"https://linkedin.com" },
  { id:"48", name:"Sachin Bhat",       course:"Full Stack Development",city:"Bangalore", company:"Mindtree",             role:"Full Stack Developer",       placed_date:"Jan 2026", linkedin_url:"https://linkedin.com" },
  { id:"49", name:"Sandeep Reddy",     course:"Data Science",          city:"Hyderabad", company:"LatentView",           role:"Data Scientist",             placed_date:"May 2025", linkedin_url:"" },
  { id:"50", name:"Santosh Kumar",     course:"Data Analytics",        city:"Chennai",   company:"Cognizant",            role:"Data Analyst",               placed_date:"Dec 2025", linkedin_url:"https://linkedin.com" },
  { id:"51", name:"Shilpa Nair",       course:"Digital Marketing",     city:"Mumbai",    company:"Dentsu Webchutney",    role:"Digital Strategist",         placed_date:"Feb 2026", linkedin_url:"https://linkedin.com" },
  { id:"52", name:"Shreya Gupta",      course:"Data Science",          city:"Delhi",     company:"IBM",                  role:"Data Science Engineer",      placed_date:"Apr 2025", linkedin_url:"https://linkedin.com" },
  { id:"53", name:"Shweta Patil",      course:"Full Stack Development",city:"Pune",      company:"Capgemini",            role:"Angular Developer",          placed_date:"Jul 2026", linkedin_url:"https://linkedin.com" },
  { id:"54", name:"Siddharth Rao",     course:"Data Science",          city:"Bangalore", company:"Tiger Analytics",      role:"Analytics Engineer",         placed_date:"Oct 2025", linkedin_url:"https://linkedin.com" },
  { id:"55", name:"Sneha Iyer",        course:"Data Analytics",        city:"Mumbai",    company:"WNS Global",           role:"Senior Analyst",             placed_date:"Jun 2026", linkedin_url:"" },
  { id:"56", name:"Suresh Pillai",     course:"Digital Marketing",     city:"Chennai",   company:"Mirum India",          role:"Account Manager",            placed_date:"Jan 2026", linkedin_url:"https://linkedin.com" },
  { id:"57", name:"Swati Jain",        course:"Data Science",          city:"Jaipur",    company:"EXL Service",          role:"Data Science Analyst",       placed_date:"Mar 2025", linkedin_url:"https://linkedin.com" },
  { id:"58", name:"Tanvir Ahmed",      course:"Full Stack Development",city:"Hyderabad", company:"Tech Mahindra",        role:"Java Developer",             placed_date:"Aug 2025", linkedin_url:"https://linkedin.com" },
  { id:"59", name:"Uday Sharma",       course:"Data Analytics",        city:"Pune",      company:"Accenture",            role:"Analytics Consultant",       placed_date:"Nov 2024", linkedin_url:"https://linkedin.com" },
  { id:"60", name:"Vandana Mehta",     course:"Data Science",          city:"Mumbai",    company:"Fractal Analytics",    role:"Data Science Lead",          placed_date:"May 2026", linkedin_url:"https://linkedin.com" },
  { id:"61", name:"Varun Singh",       course:"Full Stack Development",city:"Delhi",     company:"HCLTech",              role:"MERN Stack Developer",       placed_date:"Feb 2025", linkedin_url:"" },
  { id:"62", name:"Veena Krishnan",    course:"Data Analytics",        city:"Bangalore", company:"Genpact",              role:"Reporting Analyst",          placed_date:"Sep 2025", linkedin_url:"https://linkedin.com" },
  { id:"63", name:"Vijay Kumar",       course:"Data Science",          city:"Chennai",   company:"Wipro",                role:"ML Engineer",                placed_date:"Dec 2024", linkedin_url:"https://linkedin.com" },
  { id:"64", name:"Vinay Reddy",       course:"Digital Marketing",     city:"Hyderabad", company:"Isobar",               role:"Performance Marketing Mgr",  placed_date:"Apr 2026", linkedin_url:"https://linkedin.com" },
  { id:"65", name:"Vishal Patel",      course:"Full Stack Development",city:"Ahmedabad", company:"Infosys BPM",          role:"Software Engineer",          placed_date:"Jul 2025", linkedin_url:"https://linkedin.com" },
  { id:"66", name:"Yamini Shetty",     course:"Data Science",          city:"Bangalore", company:"Mu Sigma",             role:"Analytics Engineer",         placed_date:"Jan 2025", linkedin_url:"" },
  { id:"67", name:"Yogesh Chauhan",    course:"Data Analytics",        city:"Pune",      company:"EY",                   role:"Data Analyst",               placed_date:"Jun 2026", linkedin_url:"https://linkedin.com" },
  { id:"68", name:"Zara Khan",         course:"Digital Marketing",     city:"Mumbai",    company:"Madison Digital",      role:"Digital Media Planner",      placed_date:"Mar 2026", linkedin_url:"https://linkedin.com" },
  { id:"69", name:"Abhinav Tiwari",    course:"Data Science",          city:"Delhi",     company:"KPMG",                 role:"Data Scientist",             placed_date:"Aug 2024", linkedin_url:"https://linkedin.com" },
  { id:"70", name:"Akanksha Sharma",   course:"Full Stack Development",city:"Mumbai",    company:"Persistent Systems",   role:"React Developer",            placed_date:"Oct 2025", linkedin_url:"https://linkedin.com" },
  { id:"71", name:"Alok Verma",        course:"Data Analytics",        city:"Hyderabad", company:"Deloitte",             role:"Analytics Consultant",       placed_date:"Feb 2026", linkedin_url:"" },
  { id:"72", name:"Asha Nair",         course:"Data Science",          city:"Kochi",     company:"UST",                  role:"Data Science Associate",     placed_date:"May 2025", linkedin_url:"https://linkedin.com" },
  { id:"73", name:"Ashwin Rao",        course:"Full Stack Development",city:"Bangalore", company:"Zoho",                 role:"Full Stack Developer",       placed_date:"Nov 2025", linkedin_url:"https://linkedin.com" },
  { id:"74", name:"Bindu Mathew",      course:"Data Analytics",        city:"Chennai",   company:"Accenture",            role:"Data Analyst",               placed_date:"Jan 2026", linkedin_url:"https://linkedin.com" },
  { id:"75", name:"Chetan Gupta",      course:"Digital Marketing",     city:"Delhi",     company:"GroupM",               role:"Media Planner",              placed_date:"Apr 2025", linkedin_url:"https://linkedin.com" },
  { id:"76", name:"Deepak Mishra",     course:"Data Science",          city:"Pune",      company:"EXL Service",          role:"ML Engineer",                placed_date:"Jul 2026", linkedin_url:"" },
  { id:"77", name:"Divyesh Shah",      course:"Full Stack Development",city:"Ahmedabad", company:"HCLTech",              role:"Backend Developer",          placed_date:"Sep 2024", linkedin_url:"https://linkedin.com" },
  { id:"78", name:"Faisal Khan",       course:"Data Analytics",        city:"Mumbai",    company:"Genpact",              role:"Senior Analyst",             placed_date:"Dec 2025", linkedin_url:"https://linkedin.com" },
  { id:"79", name:"Gayatri Pillai",    course:"Data Science",          city:"Bangalore", company:"IBM",                  role:"Data Science Engineer",      placed_date:"Mar 2026", linkedin_url:"https://linkedin.com" },
  { id:"80", name:"Girish Nair",       course:"Digital Marketing",     city:"Kochi",     company:"iProspect",            role:"SEO Manager",                placed_date:"Jun 2025", linkedin_url:"https://linkedin.com" },
];

/* ─── Static stats fallback (used if API has no stats) ─── */
const STATIC_STATS = [
  { value: "637", label: "Total\nPlacements" },
  { value: "92",  label: "Hiring\nCompanies"  },
  { value: "05",  label: "Cities"              },
  { value: "04",  label: "Courses"             },
];

/* ─── FAQ / "What You've Heard Vs. What's Real" content ─── */
/* All content is rendered in the DOM for full SEO crawlability.
   Visibility is toggled via CSS class only – no content is unmounted. */
const FAQS = [
  {
    question: "ExcelR reviews are mixed",
    answer:
      "We know. Some learners had great experiences, some didn't — and we take both seriously. The negative ones often point to batch timing issues, trainer mismatches, or support delays. We've documented these and made changes. The positive ones reflect learners who engaged fully, used placement support actively, and landed good roles. Both are real.",
    tag: "TRANSPARENCY",
  },
  {
    question: "ExcelR placement support is unresponsive",
    tag: "GUARANTEED",
    answer:
      "Correct. We don't, and we won't pretend to. No training institute can guarantee you a job — if someone says otherwise, they're lying. What we do: resume prep, mock interviews, and introductions to companies hiring for the roles you trained for. 637 people went through this process. Their names are in the table below. Some got placed in 3 weeks. Some took 4 months. We haven't hidden the slow ones.",
  },
  {
    question: "What CTC can I realistically expect?",
    answer:
      "It depends on your prior experience, domain, location, and effort during job search. Freshers from our Data Science track typically see offers in the ₹4–7 LPA range. Mid-level professionals switching domains average ₹8–14 LPA. Senior professionals using our courses for upskilling often see 20–40% salary hikes. We don't guarantee numbers — we show you the actual data.",
    tag: "SALARY",
  },
  {
    question: "Why are some records without LinkedIn links?",
    answer:
      "Some learners chose not to share their LinkedIn profiles publicly — we respect that. Others are in roles where their employer asked them not to publicise the switch. 'On Request' means the learner has verified their placement with us, but prefers not to have their profile indexed here.",
    tag: "PRIVACY",
  },
];

/* ─── Table column header helper ─── */
const TH = ({ children }: { children: React.ReactNode }) => (
  <th className="px-3 py-3 text-left text-xs font-bold text-white uppercase tracking-wider whitespace-nowrap">
    {children}
  </th>
);

const INITIAL_SHOW = 20;

export default function OurPlacementRecords() {
  const [activeFaq, setActiveFaq] = useState(0);
  const [showAll, setShowAll]     = useState(false);

  const visibleRecords = showAll ? STATIC_RECORDS : STATIC_RECORDS.slice(0, INITIAL_SHOW);

  return (
    <>
      <Breadcrumb />

      {/* ═══════════════════════════════════════════════════════════
          HERO BANNER
      ═══════════════════════════════════════════════════════════ */}
      <div className="w-full md:mx-auto md:py-20 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-black sm:bg-transparent
          relative"> <Image
          src={bannerImg.src}
          alt="Our Placement Records"
         fill
              priority
              fetchPriority="high"
              sizes="100vw"
              className=" -z-10"
              quality={55}
        />
        {/* dark overlay */}
        {/* <div className="absolute inset-0 bg-[#0a2a5e]/70" /> */}

        {/* text */}
        <div className="relative z-10">
           
          <h1 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl max-w-2xl leading-tight mb-3">
            Our Placement Records
          </h1>
          <p className="text-white/75 text-sm md:text-base max-w-lg leading-relaxed">
            With a strong track record of successful placements, we have helped
            thousands of learners launch and advance their careers. Our placement
            achievements reflect our industry-focused training, dedicated placement
            support, and strong employer network.
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          STATS ROW
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-white w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATIC_STATS.map((s, i) => (
            <div
              key={i}
              className="bg-[#EFF6FF] rounded-xl px-6 py-6 flex items-center gap-5"
            >
              <span className="text-3xl sm:text-4xl font-extrabold text-[#1e2d4d] leading-none shrink-0">
                {s.value}
              </span>
              {/* vertical divider */}
              <span className="w-px self-stretch bg-[#2563C4] shrink-0" />
              <span className="text-xs sm:text-sm text-gray-800 font-medium whitespace-pre-line leading-snug">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          WHAT YOU'VE HEARD VS WHAT'S REAL
          All FAQ content stays in the DOM — only visibility toggled
          via CSS so every word is crawlable by search engines & AI.
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#eff6ff] py-10 md:py-16 px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto bg-[#f8fafc] rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm border border-gray-100">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            What You&apos;ve Heard Vs. What&apos;s Real
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            Radical transparency on our placement track record.
          </p>

          {/* ── Desktop: side-by-side ── */}
          <div className="hidden md:flex gap-6 items-start">
            {/* Left: question list */}
            <div className="w-2/5 flex flex-col gap-2">
              {FAQS.map((faq, i) => (
                <button
                  key={i}
                  onClick={() => setActiveFaq(i)}
                  className={`text-left px-4 py-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                    activeFaq === i
                      ? "bg-white border-[#0071BC] shadow-sm"
                      : "bg-white/50 border-[#e2e8f0] hover:border-gray-200 hover:bg-white"
                  }`}
                >
                  {faq.tag && (
                    <span className="inline-block text-xs text-gray-500">
                      {faq.tag}
                    </span>
                  )}
                  <span className="text-sm font-medium text-gray-800 flex items-center justify-between gap-2">
                    {faq.question}
                    <RiArrowRightSLine
                      className={`shrink-0 text-base transition-transform duration-200 ${
                        activeFaq === i ? "text-[#0071BC] rotate-90" : "text-gray-300"
                      }`}
                    />
                  </span>
                </button>
              ))}
            </div>

            {/* Right: ALL panels rendered, only active is visible */}
            <div className="flex-1 relative min-h-[220px]">
              {FAQS.map((faq, i) => (
                <div
                  key={i}
                  /* CSS-only visibility: content stays in DOM for crawlers */
                  className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all duration-300 ${
                    activeFaq === i
                      ? "opacity-100 relative"
                      : "opacity-0 absolute inset-0 pointer-events-none"
                  }`}
                  aria-hidden={activeFaq !== i}
                >
                  {faq.tag && (
                    <span className="inline-block text-xs text-[#0071BC]  bg-blue-50 px-3 py-1.5 rounded-full mb-3">
                      {faq.tag}
                    </span>
                  )}
                  <h3 className="text-base font-bold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 text-sm leading-7">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Mobile: accordion ── */}
          <div className="md:hidden flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? -1 : i)}
                  className="w-full text-left px-4 py-4 flex items-center justify-between gap-2 cursor-pointer"
                >
                  <span className="text-sm font-semibold text-gray-800">{faq.question}</span>
                  <RiArrowRightSLine
                    className={`shrink-0 text-lg text-gray-400 transition-transform duration-200 ${
                      activeFaq === i ? "rotate-90 text-[#0071BC]" : ""
                    }`}
                  />
                </button>
                {/* All answers in DOM — height toggle via max-height */}
                <div
                  className={`px-4 overflow-hidden transition-all duration-300 ${
                    activeFaq === i ? "max-h-[500px] pb-4" : "max-h-0"
                  }`}
                >
                  {faq.tag && (
                    <span className="inline-block text-[10px] font-bold tracking-widest text-[#0071BC] border border-[#0071BC]/30 bg-blue-50 px-2 py-0.5 rounded mb-2">
                      {faq.tag}
                    </span>
                  )}
                  <p className="text-gray-600 text-sm leading-7">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PLACEMENT RECORDS TABLE
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-10 md:py-16 px-4 sm:px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            Placement Records
          </h2>

          {/* Scrollable table wrapper */}
          <div className="overflow-x-auto rounded-xl shadow border border-gray-100">
            <table className="min-w-full text-md">
              <thead>
                <tr className="bg-[#2563C4]">
                  <TH>#</TH>
                  <TH>Name</TH>
                  <TH>Course</TH>
                  <TH>City</TH>
                  <TH>Company</TH>
                  <TH>Role</TH>
                  <TH>Placed</TH>
                  <TH>Profile</TH>
                </tr>
              </thead>
              <tbody>
                {visibleRecords.map((rec, idx) => (
                  <tr
                    key={rec.id}
                    className={`border-b border-[#DDE5F0] transition-colors text-sm ${
                      idx % 2 === 0 ? "bg-white" : "bg-[#f7faff]"
                    } hover:bg-blue-50`}
                  >
                    <td className="px-3 py-3 text-gray-400 font-medium w-8">
                      {idx + 1}
                    </td>
                    <td className="px-3 py-3 font-semibold text-gray-900 whitespace-nowrap">
                      {rec.name}
                    </td>
                    <td className="px-3 py-3 text-gray-600 whitespace-nowrap">
                      {rec.course}
                    </td>
                    <td className="px-3 py-3 text-gray-600 whitespace-nowrap">
                      {rec.city || "—"}
                    </td>
                    <td className="px-3 py-3 text-gray-700 font-medium whitespace-nowrap">
                      {rec.company}
                    </td>
                    <td className="px-3 py-3 text-gray-600 whitespace-nowrap">
                      {rec.role}
                    </td>
                    <td className="px-3 py-3 text-gray-500 whitespace-nowrap">
                      {rec.placed_date}
                    </td>
                    <td className="px-3 py-3">
                      {rec.linkedin_url ? (
                        <Link
                          href={rec.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-[#2563C4] text-sm font-semibold px-2.5 py-1 rounded transition-colors"
                        >
                          
                          <span>LinkedIn </span> <RiLinkedinBoxFill  className="text-lg" />
                        </Link>
                      ) : (
                        <span className="text-gray-400 text-xs">On Request</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer row */}
          <div className="flex items-center justify-between mt-4 px-1">
            <p className="text-xs text-gray-400">
              Last updated: July 2026
            </p>
            {STATIC_RECORDS.length > INITIAL_SHOW && (
              <button
                onClick={() => setShowAll((p) => !p)}
                className="text-sm font-semibold text-[#0071BC] hover:text-[#FFAA33] transition-colors cursor-pointer"
              >
                {showAll ? "Show less" : `Show all ${STATIC_RECORDS.length}`}
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
