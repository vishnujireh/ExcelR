"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchBlogHome, Blog, CategoryBlogs, loadMoreBlogs, fetchSidebarCategories, fetchSearchSuggestions } from "@/redux/slices/blogSlice";
import Breadcrumb from "../components/Breadcrumb";
import Sidebar from "../components/Sidebar";
import { LuChevronsDown, LuChevronsUp } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { slugify } from "@/utils/slugify";

function getBlogUrl(blog: any) {
  const rawCategory =
    blog.blog_category ||
    blog.category ||
    blog.category_name ||
    blog.category_slug;

  const rawSubcategory =
    blog.blog_subcategory ||
    blog.subcategory ||
    blog.subcategory_name ||
    blog.subcategory_slug;

  const category = slugify(rawCategory || "");
  const subcategory = slugify(rawSubcategory || "");
  const slug = blog.baseurl || blog.base_url || blog.slug || blog.id;

  if (subcategory && subcategory !== "0") {
    return `/blogs/${category}/${subcategory}/${slug}`;
  }

  return `/blogs/${category}/${slug}`;
}

export default function BlogList() {
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState("");
  const {
    popularBlogs,
    categoryBlogs,
    loading,
    error,
    searchSuggestions,
    searchLoading,
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

      <div className="w-full md:mx-auto md:py-10 2xl:px-32 xl:px-20 lg:px-10 p-5 career-bg_grad">
        <h1 className="text-3xl font-medium text-shadow-black mb-1.5 text-center z-50 relative text-white">
          Blogs
        </h1>
      </div>

      <div className="w-full md:mx-auto md:py-10 2xl:px-32 xl:px-20 lg:px-10 p-5 grid gap-6 md:grid-cols-4">
        <div className="col-span-3">
          <div>
            <div className="relative items-center max-w-xl mx-auto mb-10">
          <div className="flex items-center 2xl:min-w-xs mx-auto bg-white rounded-lg pr-3 border shadow border-gray-300">
            <input
              type="text"
              placeholder="Search blogs..."
               value={search}
      onChange={handleSearchChange}
              className="flex-grow px-4 pr-2 py-2.5 bg-transparent focus:outline-none rounded-full text-sm text-gray-800 placeholder-gray-400"
            />
            <span>
              <FiSearch className="text-[#0071BC] text-lg" />
            </span>
          </div>
          {/* AUTOCOMPLETE DROPDOWN */}
  {search.length > 1 && searchSuggestions.length > 0 && (
          <ul className="absolute bg-white w-full shadow-lg rounded mt-1 z-50 max-h-64 overflow-y-auto">
            {searchSuggestions.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/${item.base_url}`}
                  className="block px-4 py-2 hover:text-orange-500 cursor-pointer text-sm text-gray-600"
                >
                  {item.value}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* -----------------------------------
            ⌛ Loading Suggestions
        ----------------------------------- */}
        {searchLoading && (
          <p className="absolute left-0 mt-2 text-sm text-gray-500">Searching…</p>
        )}
        </div>
          </div>
          {popularBlogs && popularBlogs.length > 0 && (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-4 uppercase">Popular Blogs</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {popularBlogs.map((post) => {
          const blogImageUrl = post.blog_image
            ? `https://www.excelr.com/uploads/blog/${post.blog_image}`
            : "/default-blog-image.jpg";

          return (
            <div
              key={post.id}
              className="flex rounded-lg overflow-hidden shadow p-4 bg-white"
            >
              <div className="w-1/3 relative min-h-[140px]">
                <Image
                  src={blogImageUrl}
                  alt={post.blog_title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded"
                />
              </div>
              <div className="w-2/3 pl-4 flex flex-col">
                <div className="flex-grow">
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
  )}
          {categoryBlogs.map((category: CategoryBlogs) => (
            <CategorySection
              key={category.categoryId}
              category={category.categoryName}
              categoryId={category.categoryId}
              posts={category.blogs}
            />
          ))}
        </div>
        <div className="col-span-1">
          <Sidebar />
        </div>
      </div>
    </>
  );
}

function CategorySection({
  category,
  categoryId,
  posts,
}: {
  category: string;
  categoryId: string;
  posts: Blog[];
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { categoryBlogs } = useSelector((state: RootState) => state.blogs);
  const [visibleCount, setVisibleCount] = useState(2);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  if (!posts || posts.length === 0) return null;

  const displayPosts = posts.slice(0, visibleCount);

  // Find the current category's hasMore status
  const currentCategory = categoryBlogs.find(cat => cat.categoryId === categoryId);
  const hasMoreFromAPI = currentCategory?.hasMore ?? false;

  const handleShowMore = async () => {
    const offset = posts.length; // load more starting from currently loaded posts
    setIsLoadingMore(true);

    try {
      const result = await dispatch(
        loadMoreBlogs({ categoryId, offset, count: 2 })
      ).unwrap();

      // Increase visible count by the number of new blogs returned
      setVisibleCount((prev) => prev + result.blogs.length);
    } catch (error) {
      console.error("Failed to load more blogs:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleShowLess = () => {
    setVisibleCount(2);
  };

  // Show "Show More" only if:
  // 1. There are more blogs already loaded than visible
  // 2. Or API indicates more blogs are available
  const hasMoreToShow =
    visibleCount < posts.length || (hasMoreFromAPI && posts.length >= visibleCount);

  const canShowLess = visibleCount > 2;

  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-4 uppercase">{category}</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {displayPosts.map((post) => {
          const blogImageUrl = post.blog_image
            ? `https://www.excelr.com/uploads/blog/${post.blog_image}`
            : "/default-blog-image.jpg";

          return (
            <div
              key={post.id}
              className="flex rounded-lg overflow-hidden shadow p-4 bg-white"
            >
              <div className="w-1/3 relative min-h-[140px]">
                <Image
                  src={blogImageUrl}
                  alt={post.blog_title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded"
                />
              </div>
              <div className="w-2/3 pl-4 flex flex-col">
                <div className="flex-grow">
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
                    href={getBlogUrl(post )}
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

      <div className="text-end mt-4">
        {hasMoreToShow ? (
          <button
            onClick={handleShowMore}
            disabled={isLoadingMore}
            className="flex items-center justify-center rounded border text-gray-700 hover:text-orange-500 transition ml-auto cursor-pointer shadow bg-white w-10 h-9 border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoadingMore ? <span className="text-xs">...</span> : <LuChevronsDown className="w-4 h-4" />}
          </button>
        ) : (
          canShowLess && (
            <button
              onClick={handleShowLess}
              className="flex items-center justify-center rounded border text-gray-700 hover:text-orange-500 transition ml-auto cursor-pointer shadow bg-white w-10 h-9 border-gray-200"
            >
              <LuChevronsUp className="w-4 h-4" />
            </button>
          )
        )}
      </div>
    </section>
  );
}
