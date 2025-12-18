"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

// Static Links
const OrganizationLinks = [
  { name: "About Us", href: "/about-us" },
  { name: "Contact Us", href: "/contact-us" },
  { name: "In Media", href: "/in-media" },
  { name: "Gallery", href: "/gallery" },
  { name: "News Events", href: "/news-events" },
];

const ResourcesLinks = [
  { name: "Free Quizzes", href: "#" },
  { name: "Blogs", href: "/blogs" },
  { name: "Webinars", href: "#" },
  { name: "Self-Paced Learning", href: "https://elearning.excelr.com/" },
];

const LinesOfBusinessLinks = [
  { name: "Work With Us", href: "/careers" },
  { name: "Corporate Training", href: "/corporate-training" },
];

const policyLinks = [
  { name: "Terms And Conditions", href: "#" },
  { name: "Privacy Policy", href: "#" },
  { name: "Refund Policy", href: "#" },
  { name: "Sitemap", href: "#" },
];

const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/ExcelR/", icon: "/face-book.svg" },
  { name: "Instagram", href: "https://www.instagram.com/excelr_official", icon: "/instagram.svg" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/excelrofficial", icon: "/linked-in.svg" },
  { name: "Twitter", href: "https://x.com/ExcelR_Official", icon: "/xlogo.svg" },
  { name: "YouTube", href: "https://www.youtube.com/channel/UCF2_gALht1C1NsAm3fmFLsg", icon: "/you-tube.svg" },
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

const disclaimerList = [
  { name: "PMI®, PMBOK® Guide, PMP®, PgMP®, CAPM®, PMI-RMP®, PMI-ACP® are registered marks of the Project Management Institute (PMI)®" },
  { name: '"ITIL®" is registered trademark of AXELOS, United Kingdom' },
  { name: "The Swirl logo TM is a Trade Mark of AXELOS" },
  { name: "PRINCE2® is a Registered Trade Mark of AXELOS, United Kingdom" },
  { name: "ServiceNow is a Registered Trade Mark of ServiceNow Inc." },
  { name: "MongoDB®, Mongo are the registered trademarks of MongoDB, Inc." },
];

interface FooterProps {
  footerHtml?: string | null;
}

export default function Footer({ footerHtml }: FooterProps) {
  return (
    <footer>
      <div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-[#1A1A1A] text-white">
         <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
              <div className="col-span-1 lg:col-span-1">
                <p className="text-md font-semibold">Organization</p>
                <ul>
                  {OrganizationLinks.map((l) => (
                    <li key={l.name} className="my-2">
                      <Link href={l.href} className="text-sm text-white">{l.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-1">
                <p className="text-md font-semibold">Resources</p>
                <ul>
                  {ResourcesLinks.map((l) => (
                    <li key={l.name} className="my-2">
                      <Link href={l.href} className="text-sm text-white">{l.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-1">
                <p className="text-md font-semibold">Lines Of Business</p>
                <ul>
                  {LinesOfBusinessLinks.map((l) => (
                    <li key={l.name} className="my-2">
                      <Link href={l.href} className="text-sm text-white">{l.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-1"></div>
            </div>

        {/* ------------------- DYNAMIC FOOTER (Course Pages Only) ------------------- */}
        {footerHtml && (
          <div
            className="col-span-4"
            dangerouslySetInnerHTML={{ __html: footerHtml }}
          />
        )}

        {/* ------------------- STATIC FOOTER (All Other Pages) ------------------- */}
        {!footerHtml && (
          <>
           
          <div>
            <div className="grid md:grid-cols-4 grid-cols-1 gap-4 mt-2 items-center mb-2">
              <div className="col-span-3 lg:col-span-3">
                <ul className="fotrlink">
                  {policyLinks.map((l) => (
                    <li key={l.name} className="inline-block">
                      <Link href={l.href} className="text-sm font-semibold text-white">{l.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-1 lg:col-span-1">
                <ul className="md:mb-0 mb-3">
                  {socialLinks.map((l) => (
                    <li key={l.name} className="inline-block mr-2">
                      <Link href={l.href}>
                        <Image src={l.icon} alt={l.name} width={34} height={34} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <div>
                {courses.map((cat, i) => (
                  <div key={i} className="flex flex-wrap gap-3 mb-1.5 text-justify">
                    
                    <ul className="fotrlink">
                      <p className="text-sm font-semibold mr-2">{cat.category} :</p>
                    {cat.items.map((item, ix) => (
                     <li key={ix}> <Link  href={item.href} className="text-white text-sm font-semibold">
                        {item.name}
                      </Link> </li>
                    ))}
                    </ul>
                  </div>
                ))}
            </div>
                
          </div>
          </>
        )}
        <div className="mt-5">
                  <p className="text-sm font-semibold">DISCLAIMER :</p>
                  <ul className="list-disc list-inside">
                    {disclaimerList.map((d, i) => (
                      <li key={i} className="text-xs text-justify my-2">{d.name}</li>
                    ))}
                  </ul>
                </div>
      </div>

      <div className="text-center bg-black py-5 md:mb-10">
        <p className="text-sm text-white">© 2025 ExcelR Solutions. All rights reserved.</p>
      </div>
    </footer>
  );
}
