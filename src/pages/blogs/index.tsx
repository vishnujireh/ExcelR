"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import {
  fetchBlogHome,
  fetchSidebarCategories,
} from "@/redux/slices/blogSlice";
import Breadcrumb from "../components/Breadcrumb";
import Image from "next/image";
import Link from "next/link";
import BlogHeroBanner from "../components/BlogHeroBanner";
import BlogCategory from "../components/BlogCategory";
import { RiArrowRightUpLine } from "react-icons/ri";

function getBlogUrl(blog: any) {
  const category = blog.category_baseurl;
  const subcategory = blog.subcategory_baseurl;
  const slug = blog.baseurl || blog.base_url || blog.slug || blog.id;

  if (subcategory && subcategory !== "0") {
    return `/blog/${category}/${subcategory}/${slug}`;
  }

  return `/blog/${category}/${slug}`;
}

const DESKTOP_PAGE = 4;
const MOBILE_PAGE  = 2;

export default function BlogList() {
  const dispatch = useDispatch<AppDispatch>();

  const { categoryBlogs, loading, error } = useSelector(
    (state: RootState) => state.blogs
  );

  // Detect mobile (< 640 px = Tailwind's `sm` breakpoint)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const pageSize = isMobile ? MOBILE_PAGE : DESKTOP_PAGE;

  useEffect(() => {
    dispatch(fetchBlogHome());
    dispatch(fetchSidebarCategories());
  }, [dispatch]);

  if (loading) return <p className="p-10 text-center">Loading blogs...</p>;
  if (error)   return <p className="p-10 text-center text-red-500">Error: {error}</p>;

  return (
    <>
      <Breadcrumb />
      <BlogHeroBanner />
      <BlogCategory />

      <div className="w-full md:mx-auto md:py-10 2xl:px-32 xl:px-20 lg:px-10 p-5 2xl:pt-0 xl:pt-0 md:pt-0">
        {categoryBlogs
          .filter((cat) => cat.blogs.length > 0)
          .map((cat) => {
            const visibleBlogs = cat.blogs.slice(0, pageSize);
            const categoryUrl  = `/blog-category/${cat.blogs[0]?.category_baseurl || cat.categoryId}`;

            return (
              <section key={cat.categoryId} className="mb-14">

                {/* ── Category heading ── */}
                <div className="flex items-center gap-3 mb-8">
                  {/* Accent bar */}
                  <div className="w-1.5 h-6 sm:h-7 rounded-full shrink-0 bg-gradient-to-b from-[#0071BC] to-[#4d89d9]" />

                  {/* Title */}
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 whitespace-nowrap">
                    {cat.categoryName}
                  </h2>
  {/* Gradient divider */}
                  <div className="flex-1 h-px bg-gradient-to-r from-blue-100 via-gray-200 to-transparent" />
               
                  {/* View All — left of divider so floating button never overlaps */}
                  <Link
                    href={categoryUrl}
                    className="shrink-0 inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-[#0071BC] hover:text-[#FFAA33] transition-colors"
                  >
                    View All <RiArrowRightUpLine className="text-sm sm:text-base" />
                  </Link>

                 </div>

                {/* Blog grid: 1 col mobile / 2 col tablet / 4 col desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {visibleBlogs.map((post, idx) => {
                    const blogImageUrl = post.blog_image
                      ? `https://www.excelr.com/uploads/blog/${post.blog_image}`
                      : "/default-blog-image.jpg";
                    const authorImageUrl = post.author_image
                      ? `https://www.excelr.com/uploads/blog/${post.author_image}`
                      : "/default-author-image.jpg";

                    return (
                      <div
                        key={post.id}
                        className="overflow-hidden shadow p-4 bg-white flex flex-col h-full"
                      >
                        {/* Image */}
                        <div className="w-full relative min-h-36">
                          <Image
                            src={blogImageUrl}
                            alt={post.blog_title}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Content */}
                        <div className="pt-3 flex flex-col flex-1 justify-between">
                          <div className="mb-3">
                            <p className="text-sm text-blue-500 font-semibold mb-2">
                              {cat.categoryName}
                            </p>
                            <h3 className="font-semibold text-md mb-2 hover:text-orange-500 flex gap-3 justify-between">
                              <Link href={getBlogUrl(post)} className="line-clamp-2">
                                {post.blog_title}
                              </Link>
                              <Link href={getBlogUrl(post)} className="shrink-0">
                                <RiArrowRightUpLine className="text-xl" />
                              </Link>
                            </h3>
                          </div>

                          <div className="mt-auto pt-4 flex items-center gap-2">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                              <Image
                                src={authorImageUrl}
                                alt={post.author_name || "Author"}
                                fill
                                className="rounded-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-[13px] font-semibold">
                                {post.author_name || "ExcelR Solutions"}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(post.created_at).toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                </div>
              </section>
            );
          })}
      </div>

    </>
  );
}
