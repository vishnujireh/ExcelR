"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchBlogDetail, fetchSidebarCategories } from "@/redux/slices/blogSlice";
import PopularCourse from "../components/PopularCourse";
import Breadcrumb from "../components/Breadcrumb";
import Sidebar from "../components/Sidebar";
import PostComment from "../components/PostCommentForm";
import Image from "next/image";
import { RiEyeFill, RiFacebookFill, RiTwitterXFill, RiLinkedinFill } from "react-icons/ri";
import Link from "next/link"
import BlogCategory from "../components/BlogCategory";

 

export default function BlogDetailPage() {
    const [replyTo, setReplyTo] = useState<{
  commentId: string;
  username: string;
} | null>(null);
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
<BlogCategory  />
      <div className="w-full md:mx-auto md:py-10 2xl:px-32 xl:px-20 lg:px-10 p-5 grid md:gap-6 md:grid-cols-1 grid-cols-1 gap-0 bg-[#F4F7FF]">
        {/* Content Section */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white shadow p-6 rounded-lg">
          {blogDetail.blog_image && (
            <div className="mb-6 w-full aspect-8/4 relative">
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
            </div>
          {blogDetail.author && (
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-2">About the Author</h2>
              <div className="w-12 h-1 bg-[#197b9f] mb-4"></div>
              <div className="flex items-start gap-4 ">
                <div className="w-20 h-20 relative">
<Image fill
                
                  src={blogDetail.author.image}
                  alt={blogDetail.author.name}
                  className=" rounded-full object-cover shadow"
                />
                </div>
                
                <div className="flex-1">
                  <a
                    href={blogDetail.author.linkedin_url || "javascript:void(0);"}
                    target="_blank"
                    rel="nofollow"
                    className="text-md font-semibold text-gray-800 hover:text-orange-500"
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
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-2">Found the Post Useful? Share It Now!</h2>
              <div className="w-12 h-1 bg-[#197b9f] mb-4"></div>
            <div className="flex items-center gap-4 flex-wrap">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(router.asPath)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-[#3b569d] text-white"
              >
                <RiFacebookFill/>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(router.asPath)}&text=${encodeURIComponent(blogDetail.blog_title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-black text-white"
              >
                <RiTwitterXFill />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(router.asPath)}&title=${encodeURIComponent(blogDetail.blog_title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-[#0077b7] text-white"
              >
                <RiLinkedinFill />
              </a> 
            </div>
          </div>

          {/* Post Comment */}
          <div>
            
           {blogDetail.comments && blogDetail.comments.length > 0 && (
            <div className="mt-10">
            <h2 className="text-xl font-semibold mb-2">Latest Comments</h2>
            <div className="w-12 h-1 bg-[#197b9f] mb-4"></div>
  <div className="space-y-6">
    {blogDetail.comments.map((comment) => (
      <div key={comment.id} className="space-y-4">
        
        {/* 🔹 Comment Box */}
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="font-semibold capitalize">{comment.username}</p>
          <p className="text-gray-600 text-xs mb-3">{comment.created_at}</p>
          <p className="text-gray-700 text-sm">{comment.message}</p>

          {/* Reply Button */}
          <button
            className="text-sm text-blue-500 mt-2 cursor-pointer ml-auto block"
            onClick={() =>
              setReplyTo({
                commentId: comment.id,
                username: comment.username,
              })
            }
          >
            Reply
          </button>
        </div>

        {/* 🔹 Replies Container (separate div) */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-8 space-y-3">
            {comment.replies.map((reply) => (
              <div
                key={reply.id}
                className="bg-white p-3 rounded-lg shadow"
              >
                <p className="font-semibold capitalize">{reply.username}</p>
                <p className="text-gray-600 text-xs mb-3">{reply.created_at}</p>
                <p className="text-gray-600 text-sm">{reply.message}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    ))}
  </div>
    </div>
)}


        
          <PostComment  blogId={blogDetail?.id}
          parentCommentId={replyTo?.commentId}
    isReply={Boolean(replyTo)}
    onSuccess={() => setReplyTo(null)} />
          </div>

          {/* Next Blog */}
          {blogDetail?.nextblog && (
            <div>
            <Link
              href={blogDetail.nextblog.url}
              className="relative block w-full mt-10 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
            >
              <span className="absolute left-0 top-0 bg-orange-500 text-white font-semibold text-sm px-4 py-2 z-10 rounded-br-lg">
                READ NEXT
              </span>
              <div className="w-full aspect-[10/3] overflow-hidden">
                <Image
                fill
                  src={blogDetail.nextblog.Image}
                  alt={blogDetail.nextblog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
            </div>
          )}

          <PopularCourse heading="Popular Course" page_name="blog" variant="blog" />
        </div>

        {/* Sidebar */}
        {/* <div className="col-span-1">
          <Sidebar activeCategory={category!} activeSubcategory={subcategory!} />
        </div> */}
      </div>
    </>
  );
}
