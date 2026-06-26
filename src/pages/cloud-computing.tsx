"use client";
import React from "react";
import Breadcrumb from "@/pages/components/Breadcrumb";
import Image from "next/image";
import corportimg from "../../public/cloud-cbnr.jpg";
import corporate_usp from "../../public/corporate_usp_v1.webp";
import Link from "next/link";
import { RiArrowRightDoubleFill } from "react-icons/ri";
export default function CloudComputing() {
const courses = [
{
image:"https://www.excelr.com/assets/gmb/images/aws-certification.png",
title:"AWS Certification Training [Solution Architect (SAA-C03)]",
duration:"140 Hours | 4 Months",
skills:"AWS Solutions, AWS Developer, Shell Scripting, Linux, Hadoop & Spark",
icon:"https://www.excelr.com/assets/gmb/images/aws.png",
link:"https://www.excelr.com/aws-solution-architect-certification-training-in-Bangalore"
},
{
image:"https://www.excelr.com/assets/gmb/images/devops.png",
title:"DevOps Certification Training",
duration:"100 Hours | 3 Months",
skills:"Java, Jenkins, Docker, Linux, Agile, Terraform, Kubernetes",
icon:"https://www.excelr.com/assets/gmb/images/devops-ic.png",
link:"https://www.excelr.com/devops-certification-course-training-in-bangalore"
},
{
image:"https://www.excelr.com/assets/gmb/images/gcp-architect.png",
title:"GCP Architect Certification Training",
duration:"60 Hours | 2 Months",
skills:"Cloud SDK, Spring Framework, Cloud Build, Jenkins",
icon:"https://www.excelr.com/assets/gmb/images/gcp-architect-ic.png",
link:"https://www.excelr.com/google-cloud-platform-training-in-bangalore"
},
{
image:"https://www.excelr.com/assets/gmb/images/azure.png",
title:"Azure Certification Training",
duration:"40 Hours | 1 Month",
skills:"Azure Container Service, Cosmos DB, Azure Functions",
icon:"https://excelrcom.b-cdn.net/assets/admin/ckfinder/userfiles/images/2022_uploads/Devops/Azure.png",
link:"https://www.excelr.com/microsoft-azure-certification-course-training-in-bangalore"
}
];
const why = [
{
img:"https://www.excelr.com/assets/gmb/images/jumbo.png",
title:"Jumbo Pass",
desc:"Unlimited Classes for 365 days"
},
{
img:"https://www.excelr.com/assets/gmb/images/interest.png",
title:"Interest-Free EMI",
desc:"Across All Credit/Debit Cards"
},
{
img:"https://www.excelr.com/assets/gmb/images/google-revw.png",
title:"4.8/5 Stars on Google Reviews",
},
{
img:"https://www.excelr.com/assets/gmb/images/placement.png",
title:"100% Placement Assistance",
desc:"Dedicated placement cell"
}
];
return (
<>
<Breadcrumb />
{/* HERO */}
<div className="w-full md:mx-auto md:py-16 2xl:px-32 xl:px-20 bg-black sm:bg-transparent
         lg:px-10 p-5 relative">
        <div className="hidden md:block absolute inset-0 -z-10">
           <Image
              src={corportimg}
              alt="Enroll Course Banner"
              fill
              priority
              fetchPriority="high"
              sizes="100vw"
              className="object-cover -z-10"
              quality={55}
              />
        </div>
        <div className="hidden md:block absolute inset-0 bg-black/60 z-0" />
<div className="max-w-3xl mx-auto md:px-6 text-center text-white z-20 relative">
   <h1 className="text-xl md:text-4xl font-bold md:leading-12 text-shadow-black">
      Cloud Computing Certification & Training Courses in Bangalore
   </h1>
   <p className="mt-2 md:mt-6 text-base">
      Our cloud courses are top-notch and available as individual courses at the best price. With the range of training offered on cloud courses like AWS, DevOps, Azure, GCP, and Cloud Architect, you will be able to master all the essential concepts and their best practices to become a cloud expert in the industry.
   </p>
    <p className="mt-2 md:mt-6 text-base">
      Sign up for one of these courses today to start your career in cloud computing.
    </p>
   <form className="mt-4 md:mt-8 block max-w-xl mx-auto">
    <div className="flex">
      <select className="flex-1 text-black px-3 font-semibold text-sm bg-white rounded-lg p-2 rounded-br-none rounded-tr-none">
         <option>
            Course I am Looking for
         </option>
         <option>AWS</option>
         <option>DevOps</option>
         <option>GCP Architect</option>
         <option>Azure</option>
      </select>
      <button className="bg-[#0fcbef] px-6 py-3 rounded text-white rounded-bl-none rounded-tl-none">
      GET STARTED
      </button>
      </div>
   </form>
</div>
</div>
{/* COURSES */}
<section className="w-full md:mx-auto md:py-16 2xl:px-32 xl:px-20 
         lg:px-10 p-5">
   <div>
      {
      courses.map((course,index)=>(
      <div
         key={index}
         className="bg-white rounded-xl shadow-lg p-6 mb-8"
         >
         <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-full h-36 relative">
               <Image alt=""
               fill
                  src={course.image}
                  className=" mx-auto object-contain"
                  />

                  </div>
               <p className="font-medium text-sm mt-4">
                  Duration:
                  <span className="text-black font-semibold">
                  {" "}{course.duration}
                  </span>
               </p>
            </div>
            <div className="md:col-span-3">
               <h2 className="text-lg font-semibold border-b-2 pb-1 border-[#0fcbef]">
                  {course.title}
               </h2>
               <p className="mt-4 text-gray-600 text-sm">
                  <b className="text-black pr-1">Key Skills :</b> {course.skills}
               </p>
               <p className="mt-3 text-gray-600 text-sm">
                  <b className="text-black pr-1">Certification :</b>
                  Course Completion from ExcelR, Internship from AiVariant
               </p>
               <div className="grid grid-cols-4">
                <div className="col-span-3">
                   <Link
                  href={course.link}
                  target="_blank"
                  className="bg-[#0fcbef] text-white mt-5 py-2 px-3 inline-flex text-sm items-center gap-3"
                  >
              <span> View Details</span> <RiArrowRightDoubleFill/>
               </Link>
                </div>
                <div className="col-span-1">
                   <div className="relative w-full h-20 text-end">
<Image
  src={course.icon}
  alt={course.title}
  fill
  className="object-contain"
/>
</div>
                </div>
               </div>
            </div>
         </div>
      </div>
      ))
      }
   </div>
</section>
{/* WHY EXCELR */}
<section className="bg-[#f2f2f2] w-full md:mx-auto md:py-16 2xl:px-32 xl:px-20 
         lg:px-10 p-5">
   <div>
    <div className="max-w-2xl mx-auto text-center">
      <div className="w-16 h-1 bg-[#0fcbef] mx-auto mb-2 rounded" />
<h2 className="text-3xl font-semibold mb-1.5 text-[#072047]">
         Why ExcelR?
      </h2>
       <p className="text-[#191919] text-sm leading-7">Being in the industry for over ten years, we always bring you the latest happenings,
so your training is best-in-quality and more engaging</p>
    </div>
      
      <div className="grid md:grid-cols-4 gap-10 mt-12">
         {
         why.map((item,i)=>(
         <div key={i} className="relative text-center">
          <div className="relative">
            <img alt="alt"
               src={item.img}
               className="h-16 mx-auto"
               />
               </div>
            <h3 className="font-semibold text-lg mt-5 text-[#343a40]">
               {item.title}
            </h3>
            <p className="text-[#191919] text-sm">
               {item.desc}
            </p>
         </div>
         ))
         }
      </div>
   </div>
</section>
{/* LOCATION */}
<section className="w-full md:mx-auto md:py-16 2xl:px-32 xl:px-20 
         lg:px-10 p-5">
   <div>
    <div className="w-16 h-1 bg-[#0fcbef] mb-2 rounded" />
<h2 className="text-3xl font-semibold mb-1.5 text-[#072047]">
        Location
      </h2>
      <h3 className="mt-4 text-lg font-semibold">
         ExcelR - AWS, DevOps, Azure, GCP, and Cloud Architect Course Training in Bangalore
      </h3>
      <p className="mt-3">
         10, 1st floor, Safe Way Plaza, 27th Main,
         BTM 1st Stage, Bengaluru
      </p>
      <div className="py-5">
      <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.8587984951605!2d77.6143326!3d12.916795500000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1543a3c6aa17%3A0xbb5d48e34e8d0564!2sExcelR%20-%20AWS%2C%20DevOps%2C%20Azure%2C%20GCP%2C%20and%20Cloud%20Architect%20Course%20Training%20in%20Bangalore!5e0!3m2!1sen!2sin!4v1657107712382!5m2!1sen!2sin"
    className="w-full h-[300px] md:h-[400px] border-0"
    loading="lazy"
    allowFullScreen
    
  /></div>
         <p className="text-sm text-[#191919] leading-6 text-justify"><strong>Data Science Certification Training locations in Bangalore : </strong>Ammrutha halli [560092], Maruthi Seva Nagar [560033], Kuvempu Layout [560077], Bellandur [560103], Jayanagar III Block [560011], Anandnagar [560024], Nandinilayout [560096], B SK II Stage [560070], <a href="https://www.excelr.com/data-science-course-training-in-bangalore">Indiranagar </a>[560038], <a href="https://www.excelr.com/data-science-course-training-in-bangalore">Yelahanka</a> [560063], Chickpet [560053], Domlur [560071], Bansashankari III Stage [560085], Vimanapura [560017], Nagarbhavi [560072], Basaveshwaranagar [560079], <a href="https://www.excelr.com/data-science-course-training-in-bangalore">Bommanahalli </a>[560068], Mico Layout [560076], <a href="https://www.excelr.com/data-science-course-training-in-bangalore">Electronic City </a>[560100], <a href="https://www.excelr.com/data-science-course-training-in-bangalore">Taverekere </a>[560029], Nehru Nagar [560020], Agram[560007], Halsuru Pete [560002], <a href="https://www.excelr.com/data-science-course-training-in-bangalore">Basavanagudi </a>[560004], R.M.V. Extension II [560094], Jayanagar [560041], Carmelaram [560035], New Thippasandra [560075], Kanakanagar [560032], Nayandahalli [560039], Fraser Town [560005], Jalahalli East [560014], Kacharakanahalli [560084], Malleswaram West [560055], <a href="https://www.excelr.com/data-science-course-training-in-bangalore">Bannerghatta </a>[560083], Srirampuram [560021], Rajarajeshwarinagar [560098], Sivan Chetty Gardens [560042], Dommasandra [562125], <a href="https://www.excelr.com/data-science-course-training-in-bangalore">Whitefield </a>[560066], Vidyaranyapura [560097], Bolare [560082], Mathikere [560054], Doddanekkundi [560037], Hampinnagar [560104], C.V.Raman Nagar [560093], Chikkabanavara [560090], Attur [560064], Kumbalagodu [560074], Bhattarahalli [560049], Chikkalasandra [560061], Sharada Nagar [560065], Jalahalli West [560015], H.K.P Road [560051], Jp Nagar III Phase [560078], Sadashiva nagar [560080], Krishnarajapuram R S [560016], Mahalakshipuram Layout [560086], Guddadahalli [560026], Chudenapura [560060], Vidhana Soudha [560001], Shanthinagar [560027], Rajaji Nagar [560010], Chandapura [560099], Ramakrishna Hegde Nagar [560045], Shalabh Bhatnagar [560012], Peenya [560058], Ashoknagar [560050], Jalahalli Nacen [560013], Banawadi [560043], <a href="https://www.excelr.com/data-science-course-training-in-bangalore">Malleswaram </a>[560003], Doddakallasandra [560062], K.G Road [560009], Muthusandra [560087], <a href="https://www.excelr.com/data-science-course-training-in-bangalore">Marathahalli </a>[560056], JC Nagar [560006], Chamrajpet [560018], <a href="https://www.excelr.com/data-science-course-training-in-bangalore">HSR Layout</a> [560102], Devanagundi [560067], <a href="https://www.excelr.com/data-science-course-training-in-bangalore">Yeswanthpura </a>[560022], Mahadevapura [560048],Hulsur Bazaar [560008],Magadi Road [560023], Adugodi [560030], Bagalgunte [560073], Devasandra [560036], Rv Niketan [560059], Narasimharaja Colony [560019], <a href="https://www.excelr.com/data-science-course-training-in-bangalore">Koramangala VI Bk</a> [560095], Agara [560034], Vijayanagar East [560040], Benson Town [560046], Viveknagar S.O [560047], Dasarahalli [560057], Bapagrama [560091], Richmond Town [560025].</p>
         <div  className="text-sm space-y-6 mt-5 text-[#191919]">
<p className="text-center leading-6">Locations offered AWS Training in Bangalore, AWS Training and Certification in Bangalore, AWS Training in BTM, AWS Training in Marathahalli, AWS Institute in Bangalore, AWS Training in Whitefield, AWS Certification Training in Kundalahalli, AWS Training Institute in Marathahalli, AWS Course in BTM, AWS certification course in Marathahalli, AWS certification course Bommanahalli, AWS Training in Electronic city, AWS courses in Koramangala, AWS Certification in BTM, Best AWS Training in Bangalore, Best Data Science Course Bangalore</p>

<p className="text-center leading-6">DevOps Training in Bangalore, DevOps Training and Certification in Bangalore, DevOps Training in BTM, DevOps Training in Marathahalli, DevOps Institute in Bangalore, DevOps Training in Whitefield, DevOps Certification Training in Kundalahalli, DevOps Training Institute in Marathahalli, DevOps Course in BTM, DevOps certification course in Marathahalli, DevOps certification course Bommanahalli, DevOps Training in Electronic city, DevOps courses in Koramangala, DevOps Certification in BTM, Best DevOps Training in Bangalore, Best DevOps Course in Bangalore</p>

<p className="text-center leading-6">Azure Training in Bangalore, Azure Training and Certification in Bangalore, Azure Training in BTM, Azure Training in Marathahalli, Azure Institute in Bangalore, Azure Training in Whitefield, Azure Certification Training in Kundalahalli, Azure Training Institute in Marathahalli, Azure Course in BTM, Azure certification course in Marathahalli, Azure certification course Bommanahalli, Azure Training in Electronic city, Azure courses in Koramangala, Azure Certification in BTM, Best Azure Training in Bangalore, Best Azure Course in Bangalore</p>

<p className="text-center leading-6">GCP Training in Bangalore, GCP Training and Certification in Bangalore, GCP Training in BTM, GCP Training in Marathahalli, GCP Institute in Bangalore, Training in GCP Whitefield, GCP Certification Training in Kundalahalli, GCP Training Institute in Marathahalli, GCP Course in BTM, GCP certification course in Marathahalli, Google cloud platform certification course Bommanahalli, GCP Training in Electronic city, GCP courses in Koramangala, GCP Certification in BTM, Best GCP Training in Bangalore, Best GCP Course in Bangalore</p>
</div>
   </div>
</section>
</>
)
}