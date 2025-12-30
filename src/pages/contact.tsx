"use client";
import React from "react";
import Breadcrumb from "@/pages/components/Breadcrumb";
import Image from "next/image"; 
import indiaFlag from "../../public/india-flg.svg";
import usaFlag from "../../public/usa-flag.svg";

const addressData = [
  {
    location: "ExcelR Edtech Pvt Ltd – Bangalore",
    address: `#49, 1st Floor, 27th Main,
1st Cross, Behind Tata Motors,
BTM 1st stage,
Bengaluru, Karnataka 560068.`,
    phone: "+91 9632156744",
    countryFlag: indiaFlag,
  },
  {
    location: "ExcelR Edtech Pvt Ltd – Bangalore (Marathahalli)",
    address: `Unit No. T-2 in Third Floor Raja Ikon Sy,
No.89/1,Munnekolala Village, Marathahalli Ring Road,
Lank Mark : Above Yes Bank Marathahalli
Bengaluru, Karnataka 560037.`,
    phone: "+91 9632156744",
    countryFlag: indiaFlag,
  },
  {
    location: "ExcelR Edtech Pvt Ltd – Chennai",
    address: `Poonamallee High Rd,
Kilpauk,
Chennai,
Tamil Nadu 600010.`,
    phone: "+91 08591364838",
    countryFlag: indiaFlag,
  },
  {
    location: "ExcelR Edtech Pvt Ltd - Hyderabad",
    address: `Cyber Towers, PHASE-2,
5th Floor, Quadrant-2,
HITEC City,
Hyderabad, Telangana 500081.`,
    phone: "+91 9632156744",
    countryFlag: indiaFlag,
  },
  {
    location: "ExcelR Edtech Pvt Ltd – Mumbai (Andheri)",
    address: `3rd Flr, Ashok Premises,
Old Nagardas Rd Gundavali Gaothan,
Mogra Village, Nicholas Wadi Andheri East,
Mumbai, Maharastra 400069.`,
    phone: "+91 9108238354",
    countryFlag: indiaFlag,
  },
  {
    location: "ExcelR Edtech Pvt Ltd – Mumbai (Thane)",
    address: `304, 3rd Floor,Pratibha Building,
Three Petrol pump, Opposite Manas Tower,
LBS Rd, Pakhdi,
Thane (W) Maharastra 400 602.`,
    phone: "+91 9108238354",
    countryFlag: indiaFlag,
  },
  {
    location: "ExcelR Edtech Pvt Ltd – Pune",
    address: `101A, First floor, Siddh Icon,
Opp. Royal Enfield showroom,
Baner Hill Trail, Baner,
Pune, Maharastra 411045.`,
    phone: "+91 98809 13504",
    countryFlag: indiaFlag,
  },
  {
    location: "ExcelR Edtech Pvt Ltd - Pune (Viman Nagar)",
    address: `1st Floor, East Court Phoenix Market City,
F-02, Clover Park,
Viman Nagar,
Pune, Maharashtra 411014.`,
    phone: "+91 96997 53213",
    countryFlag: indiaFlag,
  }
];

const usalocation = {
    location: "ExcelR Edtech Pvt Ltd – USA",
    address: `Regency Square,6200 Savoy Drive,
Suite 1202, Houston, Tx 77036 USA.`,
phonene:"+1 844-392-3571",
fax:"+1-281-971-3067",
    phone: "+1-281-971-3065",
    countryFlag: usaFlag,
  };
export default function AboutUs(){
    return(
        <>
        <div>
        <Breadcrumb />
      </div>
        <div className="w-full md:mx-auto md:py-10 2xl:px-32 xl:px-20 lg:px-10 p-5 career-bg_grad">
           <h1 className="text-3xl font-medium text-shadow-black mb-1.5 text-center uppercase z-50 relative text-white">Contact Us</h1>
         </div>
      <section className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 z-10 relative">
          {addressData.map((address, index) => (
            <div key={index} className="col-span-1 lg:col-span-1">
              <div className="md:p-6">
                <p className="text-md font-semibold md:text-left">{address.location}</p>
                <p className="text-[#666] text-sm leading-6 mb-1">{address.address}</p>
<p className="text-[#666] text-sm leading-7 mb-2.5 flex gap-2">Phone: <Image src={address.countryFlag} alt="India Flag" width={30} height={25} /> {address.phone}</p>
</div>
            </div>
          ))}
</div>

<div className="grid md:grid-cols-3 grid-cols-1 gap-4 z-10 relative">
           <div   className="col-span-1 lg:col-span-1">
               <div className="md:p-6 mt-2.5 md:mt-0">
              <p className="text-md font-semibold md:text-left">
                {usalocation.location}
              </p>
              <p className="text-[#666] text-sm leading-6 mb-1">{usalocation.address}</p>
              <p className="text-[#666] text-sm leading-7 flex gap-2">
                Phone: {usalocation.phonene}
              </p>
              <p className="text-[#666] text-sm leading-7 flex gap-2">
                Fax: {usalocation.fax}
              </p>
              <p className="text-[#666] text-sm leading-7 mb-2.5 flex gap-2">
                Phone:
                <Image src={usalocation.countryFlag} alt="USA Flag" width={30} height={25} />
                {usalocation.phone}
              </p>
            </div>
            </div> 
</div>
      </section>
       
        </>
    );
}