"use client";

import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchBlogDetail, fetchSidebarCategories } from "@/redux/slices/blogSlice";
import PopularCourse from "../components/PopularCourse";
import Breadcrumb from "../components/Breadcrumb";
import PostComment from "../components/PostCommentForm";
import Image from "next/image";
import { RiEyeFill, RiFacebookFill, RiTwitterXFill, RiLinkedinFill } from "react-icons/ri";
import Link from "next/link"
import BlogCategory from "../components/BlogCategory";
import BlogQueryForm from "../components/BlogQueryForm";
import Providers from "../providers";
import { createRoot } from "react-dom/client";

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

  const [theme, setTheme] = useState<"light" | "dark">("light");

  useLayoutEffect(() => {
    if (!blogDetail) return;

    const container =
      document.querySelector(".blog-description-container") || document.body;

    const handleQueryContainerClick = (event: Event) => {
      const target = event.target as HTMLElement;
      const button = target.closest(".show-query-form") as HTMLElement | null;
      if (!button) return;
      event.preventDefault();

      const section = button.closest(".sub-section");
      if (!section) return;

      const wrapper = document.createElement("div");
      section.replaceWith(wrapper);

      const root = createRoot(wrapper);
      root.render(
        <Providers>
          <BlogQueryForm />
        </Providers>
      );
    };

    container.addEventListener("click", handleQueryContainerClick);

    return () => {
      container.removeEventListener("click", handleQueryContainerClick);
    };
  }, [blogDetail]);

  const toggleTheme = () => {
    setTheme((current) => {
      const nextTheme = current === "light" ? "dark" : "light";
      window.localStorage.setItem("blog-detail-theme", nextTheme);
      return nextTheme;
    });
  };

  // Determine blog slug from the URL segments
  let blogSlug: string | null = null;

  if (slugArray) {
    if (slugArray.length === 2) {
      blogSlug = slugArray[1];
    } else if (slugArray.length === 3) {
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
    <div className={`blog-detail-theme ${theme}`}>
      <div className="relative">
        <Breadcrumb />
        
      </div>
      <BlogCategory />
      <div className={`w-full md:mx-auto md:py-10 2xl:px-32 xl:px-20 lg:px-10 p-5 grid md:gap-6 md:grid-cols-1 grid-cols-1 gap-0 ${
        theme === "dark" ? "bg-[#1f1f1f]" : "bg-[#F4F7FF]"
      }
      `}>
       
        {/* Content Section */}
        <div className="max-w-5xl mx-auto">
          <div className="relative mb-5 text-end">
            <button
          type="button"
          onClick={toggleTheme}
          className={`theme-toggle-btn cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium transition ${
            theme === "dark"
              ? "border-slate-600 bg-slate-800 text-slate-100 hover:bg-slate-700"
              : "border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
          }`}
          title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === "dark" ? "Light Mode ☀️" : "Dark Mode 🌙"}
        </button>
          </div>
           
          <div className={`shadow p-6 rounded-lg page-card ${
            theme === "dark"
              ? "bg-[#030710] text-slate-100 shadow-[0_4px_20px_2px_rgba(0,0,0,0.35)]"
              : "bg-white text-slate-900"
          }`}>
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
            <div>

 <div
className="blog-description-container prose max-w-none"
dangerouslySetInnerHTML={{
__html:blogDetail.blog_description
}}
/>

</div>
          </div>
          <Link href="https://www.excelr.com/uploads/ics_files/Selenium_Brochure_EDL_1.pdf" target="_blank" className="inline-block mt-4 px-4 py-2 font-semibold text-sm bg-[#FFAA33] text-white rounded-lg hover:bg-[#ffaa33e1]">
            Download pdf
          </Link>
            </div>
          {blogDetail.author && (
            <div className="mt-10 author-card">
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
        <div className={`comment-card p-4 rounded-lg shadow ${theme === "dark" ? "bg-[#030710] shadow-none" : "bg-white"}`}>
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
                className={`comment-reply-card p-3 rounded-lg shadow ${theme === "dark" ? "bg-slate-900 shadow-none" : "bg-white"}`}
              >
                <p className="font-semibold capitalize">{reply.username}</p>
                <p className="text-gray-600 text-xs mb-3">{reply.created_at}</p>
                <p className="text-gray-600 text-sm">{reply.message}</p>
              </div>
            ))}
          </div>
        )}

        {/* Inline reply form for this comment (keeps main post comment intact) */}
        {replyTo?.commentId === comment.id && (
          <div className="ml-8 mt-4">
            <PostComment
              blogId={blogDetail?.id}
              parentCommentId={replyTo.commentId}
              isReply={true}
              onSuccess={() => setReplyTo(null)}
            />
          </div>
        )}

      </div>
    ))}
  </div>
    </div>
  )}

        {/* Main Post Comment form (always shown for new comments) */}
          <PostComment blogId={blogDetail?.id} onSuccess={() => setReplyTo(null)} />
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
              <div className="w-full aspect-10/3 overflow-hidden">
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
    </div>
  );
}
