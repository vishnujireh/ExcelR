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

function slugify(text: string) {
  return text
    ?.toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // convert spaces & special chars to hyphen
    .replace(/^-+|-+$/g, "");   // remove starting/ending hyphens
}
function getBlogUrl(blog: any) {
  const category = slugify(blog.blog_category || "");
  const subcategory = slugify(blog.blog_subcategory || "");
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

      <div className="w-full md:mx-auto md:py-10 2xl:px-32 xl:px-20 lg:px-10 p-5 career-bg_grad">
        <h1 className="text-3xl font-medium text-shadow-black mb-1.5 text-center z-50 relative text-white capitalize">
           {formatTitle(subcategory)}
        </h1>
      </div>

      <div className="w-full md:mx-auto md:py-10 2xl:px-32 xl:px-20 lg:px-10 p-5 grid gap-6 md:grid-cols-4">
        <div className="col-span-3">
          <div className="grid md:grid-cols-2 gap-6">
            {blogsBySubcategory.map((blog) => (
              <div key={blog.id} className="flex shadow rounded p-4 bg-white">
                <div className="w-1/3">
                  <img src={blog.blog_image} className="rounded w-full h-full" />
                </div>
                <div className="w-2/3 pl-4 flex flex-col">
                <div>
                   <h3 className="font-semibold hover:text-orange-500 transition">
  <Link href={getBlogUrl(blog)}>
    {blog.blog_title}
  </Link>
</h3>
                   <p className="text-sm text-gray-500 mb-4 italic">
                    {new Date(blog.created_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="mt-auto text-end">
                  <Link
                    href={getBlogUrl(blog)}
                    className="text-orange-500 font-semibold text-sm"
                  >
                    Read more
                  </Link>
                </div>
                 
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-1">
         <Sidebar 
            activeCategory={category as string} 
            activeSubcategory={subcategory as string} 
          />
        </div>
      </div>
    </>
  );
} 