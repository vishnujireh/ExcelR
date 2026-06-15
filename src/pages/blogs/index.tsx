"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import {
  fetchBlogHome,
  CategoryBlogs,
  loadMoreBlogs,
  fetchSidebarCategories,
  fetchSearchSuggestions
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
    return `/blogs/${category}/${subcategory}/${slug}`;
  }

  return `/blogs/${category}/${slug}`;
}

export default function BlogList() {
  const dispatch = useDispatch<AppDispatch>();
  const [search,setSearch] = useState("");
 
  const {
    popularBlogs,
    categoryBlogs,
    loading,
    error,
  } = useSelector((state: RootState) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogHome());
    dispatch(fetchSidebarCategories());
  }, [dispatch]);

 
 const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (value.length > 1) {
      dispatch(fetchSearchSuggestions(value)); // API search suggestions
    }
  };

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p>Error: {error}</p>;

 

  return (
    <>
      <Breadcrumb />
      <BlogHeroBanner />
      <BlogCategory  />
      <div className="w-full md:mx-auto md:py-10 2xl:px-32 xl:px-20 lg:px-10 p-5 2xl:pt-0 xl:pt-0 md:pt-0">
        <div className="col-span-3">
           {/* {popularBlogs && popularBlogs.length > 0 && (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-4 uppercase">Popular Blogs</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {popularBlogs.map((post) => {
          const blogImageUrl = post.blog_image
            ? `https://www.excelr.com/uploads/blog/${post.blog_image}`
            : "/default-blog-image.jpg";

          return (
            <div
              key={post.id}
              className="overflow-hidden shadow p-4 bg-white"
            >
              <div className="relative w-full aspect-[4/3] mb-4 rounded">
                <Image
                  src={blogImageUrl}
                  alt={post.blog_title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="md:pl-4 pt-3 md:pt-0 ">
                <div className="">
                  <p></p>
                  <h3 className="font-semibold text-md mb-2 hover:text-orange-500 transition">
                    <Link href={getBlogUrl(post)}>
                      {post.blog_title}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 italic">
                    {new Date(post.created_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="mt-auto text-end">
                  <Link
                   href={getBlogUrl(post)}
                    className="text-orange-500 font-semibold text-sm"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  )}   */}
           
         <AllBlogs
  blogs={categoryBlogs}
/>

 
        </div>
        {/* <div className="col-span-1 mt-5 md:mt-0">
          <Sidebar />
        </div> */}
      </div>
    </>
  );
}
 



function AllBlogs({
  blogs
}: {
  blogs: CategoryBlogs[];
}) {

 const visibleBlogs = blogs.flatMap((category)=>{

 return category.blogs.map(blog=>({
   ...blog,
   categoryName: category.categoryName
 }));

});


  return (
    <section className="mb-10">

      {/* <h2 className="text-xl font-bold mb-4 uppercase">
        All Blogs
      </h2>
 */}

      <div className="grid md:grid-cols-4 gap-6">

        {visibleBlogs.map((post) => {

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
  <div className="w-full relative min-h-42.5">
    <Image
      src={blogImageUrl}
      alt={post.blog_title}
      fill
      className="object-cover"
    />
  </div>


  {/* Content */}
  <div className="pt-3 flex flex-col flex-1 justify-between">

    {/* Top content */}
    <div>
      {/* Category */}
      <p className="text-sm text-blue-500 font-semibold mb-2">
        {post.categoryName}
      </p>

      <h3 className="font-semibold text-md mb-2 hover:text-orange-500 flex gap-3 justify-between">
        <Link href={getBlogUrl(post)}>
          {post.blog_title}
        </Link>

        <Link href={getBlogUrl(post)} className="shrink-0">
          <RiArrowRightUpLine className="text-xl" />
        </Link>
      </h3>
          {/* {parse(post.blog_description)} */}
    </div>


    {/* Author always bottom */}
    <div className="mt-auto pt-5">
      <div className="flex items-center gap-3">

        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <Image
            src={authorImageUrl}
            alt="test"
            fill
            className="rounded-full w-10 h-10"
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

</div>
          );

        })}
 
          
          </div>
    </section>
  );
}