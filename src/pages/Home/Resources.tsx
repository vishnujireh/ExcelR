"use client";
import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import { RiLinkM, RiSearchLine } from "react-icons/ri";
import {FiPlus } from "react-icons/fi";
const tabs = ["Blog", "Free Quizzes", "Gallery", "Webinars", "On Youtube"];

const bloglist =  [
  {
    name:"Handling Missing Data in Machine Learning: Patterns and Techniques",
    image:"/blog1.jpg",
    link:"https://www.excelr.com/blog/machine-learning/handling-missing-data",
  }
];

const freequizz = [
  {
    title:"PMI-ACP® Free Exam Practise Questions",
    image:"/pmi_quiz_h.jpg",
    link:"#",
    description:"Take free quizzes pertaining to  PMI-ACP  certification exam. Test your preparation on various domains of  PMI-ACP  certification exam and full length  PMI-ACP  mock tests. One can take unlimited attempts of the  PMI-ACP free quiz.",
  }
];

const gallerylist = [
  {
    image:"/gallery.jpg",
    link:"#",
    avlink:"#",
  }
];

export default function Resources() {
    const [activeTab, setActiveTab] = useState(tabs[0]);
  return (
    <div className="w-full md:mx-auto md:py-10 2xl:px-25 xl:px-20 lg:px-10 p-5 bg-[#F4F7FF]">
      <h3 className="text-2xl font-bold mb-1 text-center">Resources</h3>
      <p className="text-[#666] text-sm leading-7 text-center">Avail our resources like free quizzes, blogs written by industry experts, gallery of our events which would give you a visual treat. Enjoy various course videos from our YouTube channel and also stay abreast of our knowledge sharing webinars, conducted by industry stalwarts.</p>
    <div>
        <div className="flex justify-center flex-wrap space-x-4 mt-8 mb-8">
            {tabs.map((tab) =>(
                <button key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg uppercase font-semibold cursor-pointer text-sm text-[#000]  ${activeTab === tab ? 'bg-[#4593d0] text-white' : 'bg-white text-gray-800 border border-gray-300 hover:bg-[#4ba7de] hover:text-white'}`}>
                    {tab}
                </button>
            ))}
        </div>
        <div> 
            {activeTab === "Blog" && (
                <div className="text-center">
                    <div className="grid md:grid-cols-4 gap-4">
                    {bloglist.slice(0, 7).map((blog, index) => (
  <div
    key={index}
    className="group bg-white shadow hover:shadow-lg transition duration-300 overflow-hidden relative"
  >
    <div className="relative w-full h-35">
      <Image src={blog.image} alt={blog.name} fill className="block rounded" />
    </div>

    <div className="p-4 hidden group-hover:block absolute rounded w-full h-35 top-0 bg-[#000000cf]">
      <p className="text-left text-white uppercase text-xs font-semibold">
        {blog.name}
      </p>
      <div className="text-center mx-auto mt-2">
        <Link
          href={blog.link}
          className="w-9 h-9 rounded-3xl bg-black mx-auto flex items-center justify-center text-white"
        >
          <RiLinkM className="text-xl" />
        </Link>
      </div>
    </div>
  </div>
))}
{/* 8th static card */}
<div className="bg-white shadow hover:shadow-lg rounded transition duration-300 overflow-hidden relative">
  <div className="relative w-full h-35 flex items-center justify-center">
     <span className="w-12 h-12 border-gray-300 text-gray-400 rounded-3xl border flex items-center justify-center"><FiPlus /></span>
  </div>

  
</div>
          </div>
                </div>
            )}
            {activeTab === "Free Quizzes" && (
                <div className="text-center">
                   <div className="grid md:grid-cols-4 gap-4">
                    {freequizz.map((quiz, index) =>(
                      <Link href={quiz.link} key={index}  className="group bg-white shadow hover:shadow-lg transition duration-300 overflow-hidden relative">
                        <div className="relative w-full h-35">
                          <Image src={quiz.image} alt={quiz.title} fill />
                        </div>
                        <div className="p-4">
                          <h3 className="text-left text-md- font-semibold mb-2">{quiz.title}</h3>
                       <div>
                          <p className="text-left text-sm leading-6 text-[#8b95a3]">{quiz.description}</p>
                        </div>
                        </div>
                      </Link>
                    ))}
                   </div>
                </div>
            )}
            {activeTab === "Gallery" && (
                <div className="text-center">
                  <div className="grid md:grid-cols-4 gap4">
                    {gallerylist.slice(0, 7).map((gallery, index) =>(
                       <div
    key={index}
    className="group bg-white shadow hover:shadow-lg transition duration-300 overflow-hidden relative"
  >
    <div className="relative w-full h-35">
      <Image src={gallery.image} alt="let" fill className="block rounded" />
    </div>
    <div className="p-4 hidden group-hover:block absolute rounded w-full h-35 flex items-center top-0 bg-[#000000cf]">
    <div className="text-center mx-auto flex items-center justify-center">
        <Link
          href={gallery.link}
          className="w-9 h-9 rounded-3xl bg-black  flex items-center justify-center text-white"
        >
          <RiLinkM className="text-xl" />
        </Link>
        <Link
          href={gallery.link}
          className="w-9 h-9 rounded-3xl bg-black  flex items-center justify-center text-white"
        >
          <RiSearchLine  className="text-xl" />
        </Link>
      </div>
      </div>
  </div>
                    ))}
                  </div>
                </div>
            )}
            {activeTab === "Webinars" && (
                <div className="text-center"></div>
            )}
            {activeTab === "On Youtube" && (
                <div className="text-center"></div>
            )}
        </div>
    </div>
    </div>
  );
}