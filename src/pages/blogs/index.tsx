"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import {
  fetchBlogHome,
  CategoryBlogs,
  loadMoreBlogs,
  fetchSidebarCategories,
} from "@/redux/slices/blogSlice";
import Breadcrumb from "../components/Breadcrumb";
import Image from "next/image";
import Link from "next/link";
import BlogHeroBanner from "../components/BlogHeroBanner";
import BlogCategory from "../components/BlogCategory";
import { RiArrowRightUpLine, RiArrowDownLine, RiArrowUpLine } from "react-icons/ri";

function getBlogUrl(blog: any) {
  const category = blog.category_baseurl;
  const subcategory = blog.subcategory_baseurl;
  const slug = blog.baseurl || blog.base_url || blog.slug || blog.id;

  if (subcategory && subcategory !== "0") {
    return `/blog/${category}/${subcategory}/${slug}`;
  }

  return `/blog/${category}/${slug}`;
}

interface CategoryLocalState {
  visibleCount: number;
  loadingMore: boolean;
}

export default function BlogList() {
  const dispatch = useDispatch<AppDispatch>();

  const { categoryBlogs, loading, error } = useSelector(
    (state: RootState) => state.blogs
  );

  // Per-category: { [categoryId]: { visibleCount, loadingMore } }
  const [catState, setCatState] = useState<Record<string, CategoryLocalState>>({});

  useEffect(() => {
    dispatch(fetchBlogHome());
    dispatch(fetchSidebarCategories());
  }, [dispatch]);

  // Initialise local state when categories first arrive
  useEffect(() => {
    if (categoryBlogs.length) {
      setCatState((prev) => {
        const next: Record<string, CategoryLocalState> = { ...prev };
        categoryBlogs.forEach((cat) => {
          if (!next[cat.categoryId]) {
            next[cat.categoryId] = { visibleCount: 4, loadingMore: false };
          }
        });
        return next;
      });
    }
  }, [categoryBlogs]);

  const handleLoadMore = useCallback(
    async (cat: CategoryBlogs) => {
      const local = catState[cat.categoryId];
      if (!local || local.loadingMore) return;

      const loadedCount = cat.blogs.length;
      const visibleCount = local.visibleCount;

      // If we have cached blogs not yet shown, just reveal them (no API call)
      if (visibleCount < loadedCount) {
        setCatState((prev) => ({
          ...prev,
          [cat.categoryId]: {
            ...prev[cat.categoryId],
            visibleCount: Math.min(visibleCount + 4, loadedCount),
          },
        }));
        return;
      }

      // Guard: don't call API if no more available
      if (cat.hasMore === false || loadedCount < 4) return;

      // Fetch next page from API
      setCatState((prev) => ({
        ...prev,
        [cat.categoryId]: { ...prev[cat.categoryId], loadingMore: true },
      }));

      const result = await dispatch(
        loadMoreBlogs({ categoryId: cat.categoryId, offset: loadedCount, count: 4 })
      );

      // Use the count of unique new blogs actually added (from the action payload)
      // so we never set visibleCount beyond what Redux truly stored
      const uniqueAdded =
        loadMoreBlogs.fulfilled.match(result) ? result.payload.blogs.length : 0;

      setCatState((prev) => ({
        ...prev,
        [cat.categoryId]: {
          visibleCount: prev[cat.categoryId].visibleCount + uniqueAdded,
          loadingMore: false,
        },
      }));
    },
    [catState, dispatch]
  );

  const handleLoadLess = useCallback((categoryId: string) => {
    setCatState((prev) => ({
      ...prev,
      [categoryId]: { ...prev[categoryId], visibleCount: 4 },
    }));
  }, []);

  if (loading) return <p className="p-10 text-center">Loading blogs...</p>;
  if (error) return <p className="p-10 text-center text-red-500">Error: {error}</p>;

  return (
    <>
      <Breadcrumb />
      <BlogHeroBanner />
      <BlogCategory />

      <div className="w-full md:mx-auto md:py-10 2xl:px-32 xl:px-20 lg:px-10 p-5 2xl:pt-0 xl:pt-0 md:pt-0">
        {categoryBlogs
          .filter((cat) => cat.blogs.length > 0)
          .map((cat) => {
          const local = catState[cat.categoryId] ?? {
            visibleCount: 4,
            loadingMore: false,
          };

          const loadedCount = cat.blogs.length;
          const visibleCount = local.visibleCount;
          // hasMore only relevant if the initial fetch returned a full page (4),
          // meaning there could be more on the server. < 4 means we got everything.
          const hasMore = cat.hasMore !== false && loadedCount >= 4;
          const visibleBlogs = cat.blogs.slice(0, visibleCount);

          // Load More: show when cached-but-hidden blogs exist, OR server has more
          const showLoadMore =
            visibleCount < loadedCount || (visibleCount >= loadedCount && hasMore);

          // Load Less: only show when all blogs are fully loaded & visible (Load More gone)
          const allLoaded = !showLoadMore;

const showLoadLess =
  visibleCount > 4 &&
  allLoaded;

          return (
            <section key={cat.categoryId} className="mb-14">
              {/* Category heading */}
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl font-semibold  whitespace-nowrap">
                  {cat.categoryName}
                </h2>
                <div className="flex-1 h-px bg-gray-200" />
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
                      style={
                        idx >= 4
                          ? { animation: "fadeIn 0.4s ease both" }
                          : undefined
                      }
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
                          {/* Category badge */}
                          <p className="text-sm text-blue-500 font-semibold mb-2">
                            {cat.categoryName}
                          </p>

                          {/* Title */}
                          <h3 className="font-semibold text-md mb-2 hover:text-orange-500 flex gap-3 justify-between">
                            <Link href={getBlogUrl(post)} className="line-clamp-2">
                              {post.blog_title}
                            </Link>
                            <Link href={getBlogUrl(post)} className="shrink-0">
                              <RiArrowRightUpLine className="text-xl" />
                            </Link>
                          </h3>

                          {/* Excerpt */}
                          {/* {post.blog_description && (
                            <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                              {post.blog_description.replace(/<[^>]+>/g, "")}
                            </p>
                          )} */}
                        </div>

                        {/* Author + date + Read More */}
                        <div className="mt-auto pt-4 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
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
                    </div>
                  );
                })}

                {/* Loading skeleton cards while fetching */}
                {local.loadingMore &&
                  Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={`skeleton-${cat.categoryId}-${i}`}
                      className="overflow-hidden shadow p-4 bg-white flex flex-col h-full animate-pulse"
                    >
                      <div className="w-full min-h-36 bg-gray-200 rounded" />
                      <div className="pt-3 flex flex-col gap-2">
                        <div className="h-3 bg-gray-200 rounded w-1/3" />
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="h-4 bg-gray-200 rounded w-4/5" />
                        <div className="h-3 bg-gray-100 rounded w-2/3 mt-2" />
                      </div>
                    </div>
                  ))}
              </div>

              {/* Load More / Load Less */}
              {(showLoadMore || showLoadLess) && (
                <div className="flex items-center justify-center gap-4 mt-8">
                  {showLoadLess && (
                    <button
                      onClick={() => handleLoadLess(cat.categoryId)}
                      className="flex items-center gap-3 border border-[#ECEDF2] bg-[#F9F5FF] hover:bg-[#005FAE] hover:text-white cursor-pointer text-[#005FAE] font-medium text-sm py-2.5 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                    <RiArrowUpLine className="text-base" />  Load Less
                    </button>
                  )}
                  {showLoadMore && (
                    <button
                      onClick={() => handleLoadMore(cat)}
                      disabled={local.loadingMore}
                      className="flex items-center gap-3 border border-[#ECEDF2] bg-[#F9F5FF] hover:bg-[#005FAE] hover:text-white cursor-pointer text-[#005FAE] font-medium text-sm py-2.5 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                    <RiArrowDownLine className="text-base" />  {local.loadingMore ? "Loading..." : "Load more"}
                    </button>
                  )}
                </div>
              )}
            </section>
          );
        })}
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
