import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { blogPosts } from "@/data/blogData";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchBlogsBySubcategory, fetchSidebarCategories } from "@/redux/slices/blogSlice";
import Sidebar from "../components/Sidebar";
import { LuChevronsDown, LuChevronsUp } from "react-icons/lu";
import BlogCategory from "../components/BlogCategory";
import { RiArrowRightUpLine } from "react-icons/ri";

function slugify(text: string) {
  return text
    ?.toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // convert spaces & special chars to hyphen
    .replace(/^-+|-+$/g, "");   // remove starting/ending hyphens
}
function getBlogUrl(blog: any) {
  const category = slugify(blog.blog_category_url || "");
  const subcategory = slugify(blog.blog_subcategory_url || "");
  const slug = blog.baseurl || blog.base_url || blog.id;

  if (
    blog.blog_subcategory &&
    blog.blog_subcategory !== "0"
  ) {
    return `/blogs/${category}/${subcategory}/${slug}`;
  }

  return `/blogs/${category}/${slug}`;
}

export default function SubCategoryBlogList() {
  const router = useRouter();
  const { category, subcategory } = router.query;

  const dispatch = useDispatch<AppDispatch>();
  const { blogsBySubcategory, loadingSubcategory, errorSubcategory } = useSelector(
    (state: RootState) => state.blogs
  );

useEffect(() => {
  if (subcategory) {
    dispatch(fetchBlogsBySubcategory(subcategory as string));
    dispatch(fetchSidebarCategories());
  }
}, [subcategory, dispatch]);

  if (loadingSubcategory) return <p>Loading blogs...</p>;
  if (errorSubcategory) return <p>Error: {errorSubcategory}</p>;
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
<BlogCategory  />
      <div className="w-full md:mx-auto md:py-10 2xl:px-32 xl:px-20 lg:px-10 p-5 career-bg_grad">
        <h1 className="text-3xl font-medium text-shadow-black mb-1.5 text-center z-50 relative text-white capitalize">
           {formatTitle(subcategory)}
        </h1>
      </div>

      <div className="w-full md:mx-auto md:py-10 2xl:px-32 xl:px-20 lg:px-10 p-5 grid md:gap-6 md:grid-cols-1 grid-cols-1">
        <div className="col-span-3">
          <div className="grid md:grid-cols-4 gap-6">
              {blogsBySubcategory.map((blog) => {
                 const authorImageUrl = blog.author_image
         ? `https://www.excelr.com/uploads/blog/${blog.author_image}`
         : "/default-author-image.jpg";
 return (
              <div key={blog.id} className="overflow-hidden shadow p-4 bg-white flex flex-col h-full">
                 <div className="w-full relative min-h-42.5">
                  <Image src={blog.blog_image} alt={blog.blog_title} fill className="object-cover" />
                </div>
                 <div className="pt-3 flex flex-col flex-1 justify-between">
                <div>
                   <h3 className="font-semibold text-md mb-2 hover:text-orange-500 flex gap-3 justify-between">
  <Link href={getBlogUrl(blog)}>
    {blog.blog_title} 
  </Link>
  <Link href={getBlogUrl(blog)} className="shrink-0">
          <RiArrowRightUpLine className="text-xl" />
        </Link>
</h3>
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
                {/* <div className="mt-auto text-end">
                  <Link
                    href={getBlogUrl(blog)}
                    className="text-orange-500 font-semibold text-sm"
                  >
                    Read more
                  </Link>
                </div> */}
                 
                </div>
              </div>
              );
})}
          </div>
        </div>

        {/* <div className="col-span-1 mt-5 md:mt-0">
         <Sidebar 
            activeCategory={category as string} 
            activeSubcategory={subcategory as string} 
          />
        </div> */}
      </div>
    </>
  );
} 