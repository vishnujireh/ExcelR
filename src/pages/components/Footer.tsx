import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Image from "next/image";
import parse from "html-react-parser";
import { useRouter } from "next/router";
import fbicon from "/public/face-book.svg"
import instaicon from "/public/instagram.svg"
import linkedinicon from "/public/linked-in.svg"
import twittericon from "/public/xlogo.svg"
import youtubeicon from "/public/you-tube.svg"

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
  { name: "Terms And Conditions", href: "/terms-and-conditions" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Refund Policy", href: "/refund-policy" },
  { name: "Sitemap", href: "/sitemap" },
];

const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/ExcelR/", icon: fbicon },
  { name: "Instagram", href: "https://www.instagram.com/excelr_official", icon: instaicon },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/excelrofficial", icon: linkedinicon },
  { name: "Twitter", href: "https://x.com/ExcelR_Official", icon: twittericon },
  { name: "YouTube", href: "https://www.youtube.com/channel/UCF2_gALht1C1NsAm3fmFLsg", icon: youtubeicon },
];

const courses = [
  {
    category: "Emerging Technologies",
    items: [
      { name: "Artificial Intelligence", href: "/artificial-intelligence-ai-course-training" },
      { name: "Machine Learning", href: "/machine-learning-course-training" },
      { name: "AR / VR", href: "/augmented-reality-ar-virtual-reality-vr" },
      { name: "IR 4.0", href: "/industrial-revolution-4-0" },
      { name: "IoT", href: "/internet-of-things" },
      { name: "Block Chain", href: "/blockchain-training" },
      { name: "Cyber Security", href: "#" },
      { name: "Financial Analytics", href: "#" },
      { name: "Cloud Computing", href: "/cloud-computing-certification-course-training" },
    ],
  },
  {
    category: "Quality Management",
    items: [
      { name: "Lean Six Sigma Green Belt", href: "/lean-six-sigma-green-belt" },
      { name: "Lean Six Sigma Black Belt", href: "/lean-six-sigma-black-belt" },
      { name: "ISO", href: "#" },
      { name: "Master Black Belt", href: "/lean-six-sigma-master-blackbelt" },
    ],
  },
  {
    category: "Analytics",
    items: [
      { name: "Deep Learning", href: "/deep-learning-and-artificial-intelligence" },
      { name: "Tableau", href: "/tableau" },
      { name: "Big Data Hadoop", href: "/big-data-hadoop-course-training" },
      { name: "Business Analytics", href: "/business-analytics" },
      { name: "Data Analytics", href: "/data-analytics-certification-training-course" },
      { name: "SPARK", href: "#" },
      { name: "Data Science", href: "/data-science-course-training" },
    ],
  },
];

const disclaimerList = [
  { name: "PMI®, PMBOK® Guide, PMP®, PgMP®, CAPM®, PMI-RMP®, PMI-ACP® are registered marks of the Project Management Institute (PMI)®"},
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

  const {footer_menu, info, org, contact, footer_course} = useSelector((state: RootState) => state.home);
  const router = useRouter();
  const isCoursePage = router.pathname.startsWith('/course');

  return (
    <>
    

    <footer>
      <div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-[#1A1A1A] text-white">
        <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
              <div className="col-span-1 lg:col-span-1">
                {isCoursePage ? (
                  <>
                    <p className="text-md font-semibold">Organization</p>
                    <ul>
                      {OrganizationLinks.map((l) => (
                        <li key={l.name} className="my-2">
                          <a href={l.href} className="text-sm text-white">{l.name}</a>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  info.data?.length > 0 && info.data[0]?.description
                    ? parse(info.data[0].description)
                    : null
                )}
              </div>

              <div className="col-span-1">
                {isCoursePage ? (
                  <>
                    <p className="text-md font-semibold">Resources</p>
                    <ul>
                      {ResourcesLinks.map((l) => (
                        <li key={l.name} className="my-2">
                          <a href={l.href} className="text-sm text-white">{l.name}</a>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  org.data?.length > 0 && org.data[0]?.description
                    ? parse(org.data[0].description)
                    : null
                )}
              </div>

              <div className="col-span-1">
                {isCoursePage ? (
                  <>
                    <p className="text-md font-semibold">Lines Of Business</p>
                    <ul>
                      {LinesOfBusinessLinks.map((l) => (
                        <li key={l.name} className="my-2">
                          <a href={l.href} className="text-sm text-white">{l.name}</a>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  contact.data?.length > 0 && contact.data[0]?.description
                    ? parse(contact.data[0].description)
                    : null
                )}
              </div>
              <div className="col-span-1">
                <a
                  href="https://www.sitelock.com/verify.php?site=excelr.com"
                  onClick={(event) => {
                    event.preventDefault();
                    window.open(
                      "https://www.sitelock.com/verify.php?site=excelr.com",
                      "SiteLock",
                      "width=600,height=600,left=160,top=170"
                    );
                  }}
                >
                  <Image
                    className="img-responsive"
                    alt="SiteLock"
                    title="SiteLock"
                    width={100}
                    height={100}
                    src="https://shield.sitelock.com/shield/excelr.com"
                  />
                </a>
              </div>
            </div>

        {/* ------------------- DYNAMIC FOOTER (Course Pages Only) ------------------- */}
        {footerHtml && (
          <div className="col-span-4">
            {parse(footerHtml)}
          </div>
        )}  

        {/* ------------------- STATIC FOOTER (All Other Pages) ------------------- */}
        {!footerHtml && (
          <>
           
          <div>
            {footer_course.data?.length > 0 && footer_course.data[0]?.description
    ? parse(footer_course.data[0].description)
    : null}
            <div className="grid md:grid-cols-4 grid-cols-1 gap-4 mt-2 items-center mb-2">
            
             
              {/* <div className="col-span-3 lg:col-span-3">
                <ul className="fotrlink">
                  {policyLinks.map((l) => (
                    <li key={l.name} className="inline-block">
                      <a href={l.href} className="text-sm font-semibold text-white">{l.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-1 lg:col-span-1">
                <ul className="md:mb-0 mb-3">
                  {socialLinks.map((l) => (
                    <li key={l.name} className="inline-block mr-2">
                      <a href={l.href} target="_blank" rel="noreferrer" aria-label={l.name}>
                        <Image
                          src={l.icon}
                          alt={l.name}
                          width={34}
                          height={34}
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div> */}
            </div>
          </div>
          {/* <div>
            <div>
                {courses.map((cat, i) => (
                  <div key={i} className="flex flex-wrap gap-3 mb-1.5 text-justify">
                    
                    <ul className="fotrlink">
                      <p className="text-sm font-semibold mr-2">{cat.category} :</p>
                    {cat.items.map((item, ix) => (
                     <li key={ix}> <a  href={item.href} className="text-white text-sm font-semibold">
                        {item.name}
                      </a> </li>
                    ))}
                    </ul>
                  </div>
                ))}
            </div>
                
          </div> */}
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
        <p className="text-sm text-white">© {new Date().getFullYear()} ExcelR Solutions. All rights reserved.</p>
      </div>
    </footer>
    </>
  );
}
