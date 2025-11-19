"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import paymenticon from "/public/payment-icon.png"

const OrganizationLinks = [
  { name: "About Us", href: "#" },
  { name: "Contact Us", href: "#" },
  { name: "In Media", href: "#" },
  { name: "Gallery", href: "#" },
  { name: "News Events", href: "#" },
];
const ResourcesLinks = [
  { name: "Free Quizzes", href: "#" },
  { name: "Blogs", href: "#" },
  { name: "Webinars", href: "#" },
  { name: "Self-Paced Learning", href: "#" },
];
const LinesOfBusinessLinks = [
  { name: "Work With Us", href: "#" },
  { name: "Corporate Training", href: "#" },
];
const policyLinks = [
  { name: "Terms And Conditions", href: "#" },
  { name: "Privacy Policy", href: "#" },
  { name: "Refund Policy", href: "#" },
  { name: "Sitemap", href: "#" },
];
const socialLinks = [
  { name: "Facebook", href: "#", icon: "/face-book.svg" },
  { name: "Instagram", href: "#", icon: "/instagram.svg" },
  { name: "LinkedIn", href: "#", icon: "/linked-in.svg" },
  { name: "Twitter", href: "#", icon: "/xlogo.svg" },
  { name: "YouTube", href: "#", icon: "/you-tube.svg" },
];

const courses = [
  {
    category: "Emerging Technologies",
    items: [
      { name: "Artificial Intelligence", href: "/courses/ai" },
      { name: "Machine Learning", href: "/courses/ml" },
      { name: "AR / VR", href: "/courses/ar-vr" },
      { name: "IR 4.0", href: "/courses/ir4" },
      { name: "IoT", href: "/courses/iot" },
      { name: "Block Chain", href: "/courses/blockchain" },
      { name: "Cyber Security", href: "/courses/cyber-security" },
      { name: "Financial Analytics", href: "/courses/financial-analytics" },
      { name: "Cloud Computing", href: "/courses/cloud-computing" },
    ],
  },
  {
    category: "Quality Management",
    items: [
      { name: "Lean Six Sigma Green Belt", href: "/courses/lean-green" },
      { name: "Lean Six Sigma Black Belt", href: "/courses/lean-black" },
      { name: "ISO", href: "/courses/iso" },
      { name: "Master Black Belt", href: "/courses/master-black" },
    ],
  },
  {
    category: "Analytics",
    items: [
      { name: "Deep Learning", href: "/courses/deep-learning" },
      { name: "Tableau", href: "/courses/tableau" },
      { name: "Big Data Hadoop", href: "/courses/big-data" },
      { name: "Business Analytics", href: "/courses/business-analytics" },
      { name: "Data Analytics", href: "/courses/data-analytics" },
      { name: "SPARK", href: "/courses/spark" },
      { name: "Data Science", href: "/courses/data-science" },
    ],
  },
];

const disclamerList = [
  {name:"PMI®, PMBOK® Guide, PMP®, PgMP®, CAPM®, PMI-RMP®, PMI-ACP® are registered marks of the Project Management Institute (PMI)®"},
  {name:'"ITIL®" is registered trademark of AXELOS, United Kingdom'},
  {name:"The Swirl logo TM is a Trade Mark of AXELOS"},
  {name:"PRINCE2® is a Registered Trade Mark of AXELOS, United Kingdom"},
  {name:"ServiceNow is a Registered Trade Mark of ServiceNow Inc."},
  {name:"MongoDB®, Mongo are the registered trademarks of MongoDB, Inc."},
];

 
export default function Footer() {
  return (
    <footer>
      <div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-[#1A1A1A] text-white">
      <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
  <div className="col-span-1 lg:col-span-1">
          <p className="text-md font-semibold">Organization</p>
          <ul>
            {OrganizationLinks.map((link) => (
              <li key={link.name} className="my-2">
                <Link href={link.href} className="text-sm text-white">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-1">
          <p className="text-md font-semibold">Resources</p>
          <ul>  
            {ResourcesLinks.map((link) => (
              <li key={link.name} className="my-2">
                <Link href={link.href} className="text-sm text-white">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-1">
          <p className="text-md font-semibold">Lines Of Business</p>
          <ul className="">
            {LinesOfBusinessLinks.map((link) => (
              <li key={link.name} className="my-2">
                <Link href={link.href} className="text-sm text-white">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-1">
          <div className="mt-2">
            <Image src={paymenticon} alt="ExcelR" className="mb-4" />
          </div>
          {/* <div className="mt-2">
            <Link href="#" className="text-sm text-white hover:underline">
              <Image src={} alt="alt" width={} height={} />
            </Link>
          </div> */}
        </div>
      </div>
      <div>
        <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
          <div className="col-span-3 lg:col-span-3">
            <ul>
              {policyLinks.map((link) => (
                <li key={link.name} className="inline-block mr-4">
                  <Link href={link.href} className="text-sm font-semibold text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-1 lg:col-span-1">
            <ul className="md:mb-0 mb-3">
              {socialLinks.map((link) => (
                <li key={link.name} className="inline-block mr-2">
                  <Link href={link.href} className="text-sm text-white">
                    <Image src={link.icon} alt={link.name} width={34} height={34} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div>
        <div>
          
        {courses.map((cat, idx) => (
          <div  key={idx} className="flex flex-wrap gap-3 text-align:justify">
            <p className="text-sm font-semibold mb-2">{cat.category} : </p>
            {cat.items.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="text-white text-sm font-semibold"
              >
                {item.name}
              </Link>
            ))}
          </div>
      ))}

      <div className="mt-5">
        <p className="text-sm font-semibold">DISCLAIMER :</p>
        <ul className="list-disc list-inside">
          {disclamerList.map((item, index) => (
            <li key={index} className="text-xs text-justify my-2">
              {item.name}
            </li>
          ))}
        </ul>
      </div>
        </div>
      </div>
      </div>
      <div className="text-center bg-black w-full md:mx-auto py-5 px-10">
        <p className="text-sm text-white">© 2025 ExcelR Solutions. All rights reserved.</p>
      </div>
    </footer>
  );
}