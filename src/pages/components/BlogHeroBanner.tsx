import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchSearchSuggestions } from "@/redux/slices/blogSlice";
import Link from "next/link";
import {
  RiSearchLine,
  RiMicLine,
} from "react-icons/ri";

const SEARCH_TAGS = [
  "Data Science",
  "Project Management",
  "Tableau",
  "Data Analytics",
];

const TAG_TO_CATEGORY: Record<string, string> = {
  "Data Science": "/blog-category/data-science",
  "Project Management": "/blog-category/project-management",
  "Tableau": "/blog-category/tableau",
  "Data Analytics": "/blog-category/data-analytics",
};
export default function HeroBanner() {
 
const dispatch = useDispatch<AppDispatch>();

const [searchText, setSearchText] = useState("");

const {
  searchSuggestions,
  searchLoading,
} = useSelector(
  (state: RootState) => state.blogs
);
const [listening, setListening] = useState(false);
const recognitionRef = useRef
<any>
(null);
const startVoice = () => {
if (!("webkitSpeechRecognition" in window)) {
alert("Speech recognition not supported");
return;
}
const SpeechRecognition =
(window as any).webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.interimResults = false;
recognition.lang = "en-US";
recognition.onstart = () => {
setListening(true);
};
recognition.onresult = (event:any) => {
const text =
event.results[0][0].transcript;
setSearchText(text);
};
recognition.onend = () => {
setListening(false);
};
recognitionRef.current = recognition;
recognition.start();
};
const stopVoice = () => {
recognitionRef.current?.stop();
setListening(false);
}
const handleSearchChange = (
 e: React.ChangeEvent<HTMLInputElement>
) => {

 const value = e.target.value;

 setSearchText(value);

 if(value.length > 1){
   dispatch(fetchSearchSuggestions(value));
 }

};

return (
<section
className="relative w-full overflow-hidden"
style={{
background:
"linear-gradient(160deg,#134792 0%,#1a5aab 40%,#2160c1 75%,#4d89d9 100%)"
}}
>
{/* Background */}
<div className="pointer-events-none absolute inset-0">
  
   <svg className="absolute inset-0 w-full h-full opacity-[0.055]">
      <defs>
         <pattern
            id="grid"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
            >
            <path
               d="M48 0L0 0 0 48"
               fill="none"
               stroke="white"
               />
         </pattern>
      </defs>
      <rect
         width="100%"
         height="100%"
         fill="url(#grid)"
         />
   </svg>
</div>
{/* Category menu design only */}

<div
   className="
   relative mx-auto w-full 
   px-4 sm:px-8
   pt-16 pb-36
   flex flex-col items-center text-center
   "
   >
   <div className="mb-5 rounded-full px-4 py-2 bg-white/10 text-white">
      Our blog
   </div>
   <h1
      className="
      text-white font-bold
      text-4xl mb-5
      "
      >
      Resources and insights
   </h1>
   <p
      className="
      text-white/70
      max-w-xl mb-5
      "
      >
      The latest industry news, interviews,
      technologies, and resources — curated for you.
   </p>
   {/* Search design */}
   <div
className="
relative
hidden sm:flex
w-full max-w-2xl flex-col
"
>
      <div className="flex gap-3">
         <div
            className="
            flex-1 flex items-center gap-2
            rounded-xl px-4 py-3
            bg-white/10 shadow
            "
            >
            <RiSearchLine
               className="text-white/40"
               size={17}
               />
            <input
 value={searchText}
 onChange={handleSearchChange}
 placeholder="Search articles..."
 className="
 flex-1 bg-transparent
 outline-none text-white text-sm
 "
/>
            <span
               className="w-px h-4 bg-white/20"
               />
            <button
               onClick={startVoice}
               className="relative cursor-pointer"
               >
            {listening && (
            <span className="
               absolute inset-0
               rounded-full
               bg-[#FFAA33]
               opacity-40
               animate-ping
               "/>
            )}
            <RiMicLine
            size={18}
            className={
            listening
            ? "text-[#FFAA33]"
            : "text-white/50"
            }
            />
            </button>
         </div>
         {/* <button
            className="
            px-6 rounded-xl
            bg-[#134792]
            text-white
            "
            >
         Search
         </button> */}
      </div>
      {/* Trending always visible */}
      {/* Search Suggestions */}

{
searchText.length > 1 &&
searchSuggestions.length > 0 && (

<ul
className="
absolute mt-12
w-full
max-w-2xl
bg-white
rounded-lg
shadow-xl
z-50
overflow-hidden
text-left
"
>

{
searchSuggestions.map((item)=>(
<li key={item.id}>

<Link
href={`/${item.base_url}`}
className="
block px-4 py-3
text-sm
text-gray-700
hover:bg-gray-100
"
>

{item.value}

</Link>

</li>
))
}

</ul>

)
}


{
searchLoading && (

<p
className="
text-white/70
text-sm
mt-2
"
>
Searching...
</p>

)
}
      <div className="mt-4 flex gap-2 justify-center flex-wrap">
         {
         SEARCH_TAGS.map(tag => (
         <Link
            key={tag}
            href={TAG_TO_CATEGORY[tag] || "/blogs"}
            className="rounded-full px-3 py-1.5 text-xs font-semibold transition bg-white/10 text-white/40 border border-white/20 hover:bg-white/20 hover:text-white flex items-center gap-1"
            >
         {tag}
         </Link>
         ))
         }
      </div>
   </div>
</div>
{/* Wave */}
<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-screen overflow-hidden">
   <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className="w-full"
      xmlns="http://www.w3.org/2000/svg"
      >
      <path
         d="M0,55 C360,110 1080,0 1440,55 L1440,120 L0,120 Z"
         fill="white"
         />
   </svg>
</div>
</section>
)
}