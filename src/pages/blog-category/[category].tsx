import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Breadcrumb from "../components/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchBlogsByCategory, fetchSidebarCategories } from "@/redux/slices/blogSlice";
import Link from "next/link";
import bannerImageUrl from "/public/blog_page.webp";
import Image from "next/image";
import { RiArrowRightUpLine } from "react-icons/ri";
import BlogCategory from "../components/BlogCategory";
function slugify(text: string) {
return text
?.toString()
.trim()
.toLowerCase()
.replace(/[^a-z0-9]+/g, "-")
.replace(/^-+|-+$/g, "");
}
function getBlogUrl(blog: any) {
const category = slugify(blog.blog_category_url || "");
const subcategory = slugify(blog.blog_subcategory_url || "");
const slug = blog.baseurl || blog.base_url || blog.id;
if (
blog.blog_subcategory &&
blog.blog_subcategory !== "0"
) {
return `/blog/${category}/${subcategory}/${slug}`;
}
return `/blog/${category}/${slug}`;
}
export default function CategoryBlogList() {
const router = useRouter();
const { category } = router.query;
const dispatch = useDispatch
<AppDispatch>
();
const {blogsByCategory, loadingCategory, errorCategory} = useSelector(
(state: RootState) => state.blogs
);
useEffect(() => {
if (category) {
dispatch(fetchBlogsByCategory(category as string));
dispatch(fetchSidebarCategories());
}
}, [category, dispatch]);
if (loadingCategory) return 
<p>Loading blogs...</p>
;
if (errorCategory) return 
<p>Error: {errorCategory}</p>
;
const formatTitle = (text: string | string[] | undefined) => {
if (!text) return "";
const slug = Array.isArray(text) ? text[0] : text;
return slug
.replace(/-/g, " ")
.replace(/\b\w/g, (c) => c.toUpperCase());
};
return (
<>
<Breadcrumb />
{/* <BlogCategory  /> */}
<div className="w-full md:mx-auto md:py-16 2xl:px-32 xl:px-20 bg-black sm:bg-transparent
 lg:px-10 p-5 relative">
<div className="hidden md:block absolute inset-0 -z-10">
   <Image
      src={bannerImageUrl}
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
   <h1 className="text-3xl font-medium text-shadow-black mb-1.5 text-center z-50 relative text-white capitalize">
      {formatTitle(category)}
   </h1>
</div>
<div className="w-full md:mx-auto md:py-10 2xl:px-32 xl:px-20 lg:px-10 p-5 grid md:gap-6 md:grid-cols-1 grid-cols-1">
   <div className="col-span-3">
      <div className="grid md:grid-cols-4 gap-6 justify-center">
         {blogsByCategory.map((blog) => {
         const authorImageUrl = blog.author_image
         ? `https://www.excelr.com/uploads/blog/${blog.author_image}`
         : "/default-author-image.jpg";
         return (
         <div
            key={blog.id}
            className="
            overflow-hidden
            shadow
            p-4
            bg-white
            flex
            flex-col
            h-full
            "
            >
            {/* Image */}
            <div className="w-full relative min-h-42.5">
               <Image
                  src={blog.blog_image}
                  alt={blog.blog_title}
                  fill
                  className="object-cover"
                  />
            </div>
            {/* Content */}
            <div className="
               pt-3
               flex
               flex-col
               flex-1
               justify-between
               ">
               <div>
                  <h3 className="
                     font-semibold
                     text-md
                     mb-2
                     hover:text-orange-500
                     flex
                     gap-3
                     justify-between
                     ">
                     <Link href={getBlogUrl(blog)}>
                     {blog.blog_title}
                     </Link>
                     <Link href={getBlogUrl(blog)}>
                     <RiArrowRightUpLine className="text-xl"/>
                     </Link>
                  </h3>
                  {/* 
                  <p className="text-sm text-gray-500 mb-4 italic">
                     {new Date(
                     blog.created_at
                     ).toLocaleDateString(
                     "en-GB",
                     {
                     day:"2-digit",
                     month:"long",
                     year:"numeric"
                     }
                     )}
                  </p>
                  */}
               </div>
               {/* Author */}
               <div className="mt-auto pt-5">
                  <div className="flex items-center gap-3">
                     <div className="
                        relative
                        w-10
                        h-10
                        rounded-full
                        overflow-hidden
                        ">
                        <Image
                           src={authorImageUrl}
                           alt="author"
                           fill
                           className="rounded-full"
                           />
                     </div>
                     <div>
                        <p className="text-[13px] font-semibold">
                           {blog.author_name || "ExcelR Solutions"}
                        </p>
                        <p className="text-xs text-gray-500">
                           {new Date(
                           blog.created_at
                           ).toLocaleDateString(
                           "en-GB",
                           {
                           day:"2-digit",
                           month:"short",
                           year:"numeric"
                           }
                           )}
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         );
         })}
      </div>
   </div>
   {/* 
   <div className="col-span-1 mt-5 md:mt-0">
      <Sidebar activeCategory={category} />
   </div>
   */}
</div>
</>
);
}