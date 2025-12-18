"use client";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchBlogDetail, fetchSidebarCategories } from "@/redux/slices/blogSlice";
import Breadcrumb from "../components/Breadcrumb";
import Sidebar from "../components/Sidebar";
import PostComment from "../components/PostCommentForm";
import Image from "next/image";
import { RiEyeFill } from "react-icons/ri";

export default function BlogDetailPage() {
  const router = useRouter();
  const slugArray = router.query.slug as string[] | undefined;

  const dispatch = useDispatch<AppDispatch>();

  const { blogDetail, loadingDetail, errorDetail } = useSelector(
    (state: RootState) => state.blogs
  );

  // Determine category / subcategory / blogSlug
  let category: string | null = null;
  let subcategory: string | null = null;
  let blogSlug: string | null = null;

  if (slugArray) {
    if (slugArray.length === 2) {
      category = slugArray[0];
      blogSlug = slugArray[1];
    } else if (slugArray.length === 3) {
      category = slugArray[0];
      subcategory = slugArray[1];
      blogSlug = slugArray[2];
    }
  }

  /** 🔥 Fetch blog details when slug changes */
  useEffect(() => {
    if (blogSlug) {
      dispatch(fetchBlogDetail(blogSlug));
      dispatch(fetchSidebarCategories());
    }
  }, [blogSlug, dispatch]);

  if (loadingDetail) return <p>Loading blog...</p>;
  if (errorDetail) return <p>Error: {errorDetail}</p>;
  if (!blogDetail) return <p>No blog found.</p>;

  return (
    <>
      <Breadcrumb />

      <div className="w-full md:mx-auto md:py-10 2xl:px-32 xl:px-20 lg:px-10 p-5 grid gap-6 md:grid-cols-4">
        {/* Content Section */}
        <div className="col-span-3 bg-white shadow p-6 rounded-lg">
          {blogDetail.blog_image && (
            <div className="mb-6 w-full h-[350px] relative">
              <Image
                src={blogDetail.blog_image}
                alt={blogDetail.blog_title}
                fill
                style={{ objectFit: "cover" }}
                className="rounded"
              />
            </div>
          )}

          <div className="flex items-center mb-4 justify-between">
            <p className="text-[#197b9f]">
              {new Date(blogDetail.created_at).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="flex items-center gap-1 text-[#197b9f]">
              <RiEyeFill /> {blogDetail.view_count}
            </p>
          </div>

          <div>
            <h1 className="md:text-4xl font-bold">{blogDetail.blog_title}</h1>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: blogDetail.blog_description }}
            />
          </div>

          {blogDetail.author && (
            <div className="bg-white p-6 rounded-lg shadow mt-10">
              <h2 className="text-xl font-semibold mb-2">About the Author</h2>
              <div className="w-12 h-1 bg-orange-500 mb-4 rounded"></div>
              <div className="flex items-start gap-4">
                <img
                  src={blogDetail.author.image}
                  alt={blogDetail.author.name}
                  className="w-20 h-20 rounded-full object-cover shadow"
                />
                <div className="flex-1">
                  <a
                    href={blogDetail.author.linkedin_url || "javascript:void(0);"}
                    target="_blank"
                    rel="nofollow"
                    className="text-lg font-medium text-gray-800 hover:text-orange-500"
                  >
                    {blogDetail.author.name}
                  </a>
                  <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                    {blogDetail.author.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Share Buttons */}
          <div className="bg-white p-6 rounded-lg shadow mt-10">
            <h2 className="text-lg font-semibold mb-4">Found the Post Useful? Share It Now!</h2>
            <div className="flex items-center gap-4 flex-wrap">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(router.asPath)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Facebook
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(router.asPath)}&text=${encodeURIComponent(blogDetail.blog_title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600"
              >
                Twitter
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(router.asPath)}&title=${encodeURIComponent(blogDetail.blog_title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
              >
                LinkedIn
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(blogDetail.blog_title + " - " + router.asPath)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                WhatsApp
              </a>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard!");
                }}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
              >
                Copy Link
              </button>
            </div>
          </div>

          {/* Post Comment */}
          <PostComment />

          {/* Next Blog */}
          {blogDetail?.nextblog && (
            <a
              href={blogDetail.nextblog.url}
              className="relative block w-full mt-10 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
            >
              <span className="absolute left-0 top-0 bg-orange-500 text-white font-semibold text-sm px-4 py-2 z-10 rounded-br-lg">
                READ NEXT
              </span>
              <div className="w-full h-60 md:h-72 overflow-hidden">
                <img
                  src={blogDetail.nextblog.Image}
                  alt={blogDetail.nextblog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </a>
          )}
        </div>

        {/* Sidebar */}
        <div className="col-span-1">
          <Sidebar activeCategory={category!} activeSubcategory={subcategory!} />
        </div>
      </div>
    </>
  );
}
