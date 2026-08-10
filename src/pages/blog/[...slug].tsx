"use client";

import { Lato } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState, useRef, useCallback } from "react";
 
// Loaded only when this page is visited — zero impact on other pages.
const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-lato",
});
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchBlogDetail, fetchSidebarCategories } from "@/redux/slices/blogSlice";
import PopularCourse from "../components/PopularCourse";
import Breadcrumb from "../components/Breadcrumb";
import PostComment from "../components/PostCommentForm";
import Image from "next/image";
import { RiArrowRightLine, RiFacebookFill, RiTwitterXFill, RiLinkedinFill, RiGraduationCapLine, RiTimer2Line, RiBookOpenLine, RiArrowRightUpLine  } from "react-icons/ri";
import Link from "next/link"
import BlogCategory from "../components/BlogCategory";
import BlogQueryForm from "../components/BlogQueryForm";
import Providers from "../providers";
import { createRoot } from "react-dom/client";
import parse from "html-react-parser";

export default function BlogDetailPage() { 
 const dispatch = useDispatch<AppDispatch>();
const blogRef = useRef<HTMLDivElement>(null);
const { blogDetail, loadingDetail, errorDetail } = useSelector(
  (state: RootState) => state.blogs
);

const [activeHeading, setActiveHeading] = useState("");

const [toc, setToc] = useState<
  {
    id: string;
    text: string;
    level: "h2" | "h3";
  }[]
>([]);

 

    const [replyTo, setReplyTo] = useState<{
  commentId: string;
  username: string;
} | null>(null);
  const router = useRouter();
  const slugArray = router.query.slug as string[] | undefined;

   
  

  const [theme, setTheme] = useState<"light" | "dark">("light");

useEffect(() => {
  const container = blogRef.current;

  if (!container || !blogDetail?.blog_description) return;

  const headings = Array.from(
    container.querySelectorAll<HTMLElement>(".headings[id]")
  );

  const items = headings.map((heading) => ({
    id: heading.id,
    text: heading.innerText.trim(),
    level:
      heading.tagName.toLowerCase() === "h3"
        ? ("h3" as const)
        : ("h2" as const),
  }));

  setToc(items);
}, [blogDetail?.blog_description]);

useEffect(() => {
  if (!toc.length) return;

  const handleScroll = () => {
    const headingElements = toc
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (!headingElements.length) return;

    // Above first heading
    const firstHeadingTop = headingElements[0].getBoundingClientRect().top;

    if (firstHeadingTop > 150) {
      setActiveHeading("");
      return;
    }

    let currentHeading = "";

    headingElements.forEach((heading) => {
      const rect = heading.getBoundingClientRect();

      if (rect.top <= 150) {
        currentHeading = heading.id;
      }
    });

    setActiveHeading(currentHeading);
  };

  window.addEventListener("scroll", handleScroll);

  handleScroll();

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, [toc]);

useEffect(() => {
    const accordions = document.querySelectorAll(
      "#accordion13"
    );

    accordions.forEach((accordion) => {
      accordion.addEventListener("click", (event) => {
        if ((event.target as HTMLElement).tagName.toLowerCase() === "summary") {
          const details = (event.target as HTMLElement)
            .parentNode as HTMLElement;

          accordion.querySelectorAll("details").forEach((el) => {
            if (el !== details) el.removeAttribute("open");
          });
        }
      });
    });

    return () => {
      accordions.forEach((accordion) => {
        accordion.replaceWith(accordion.cloneNode(true));
      });
    };
  }, [blogDetail?.faq]);

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

 function ContentsSidebar({
  toc,
  activeHeading,
}: {
  toc: {
    id: string;
    text: string;
    level: "h2" | "h3";
  }[];
  activeHeading: string;
}) {
  return (
    <div className={`bg-white border border-slate-200 rounded-3xl p-6 shadow-sm `}>
      <h3 className={`flex items-center gap-2 font-semibold text-base mb-2 uppercase ${
        theme === "dark"
        ?"text-black"
        :"text-black"
      }`}>
        <RiBookOpenLine className="text-blue-600" />
        Contents
      </h3>

      <div className="space-y-2">
        {toc.map((item) => (
          <button
            key={item.id}
           onClick={() => {
  const el = document.getElementById(item.id);

  if (!el) {
    console.log("Heading not found:", item.id);
    return;
  }

  const y =
  el.getBoundingClientRect().top +
  window.scrollY -
  40; // adjust for sticky header

window.scrollTo({
  top: y,
  behavior: "smooth",
});

  setActiveHeading(item.id);
}}
            className={`w-full text-left text-sm rounded-xl transition-all cursor-pointer ${
              activeHeading === item.id
                ? "bg-blue-100 text-blue-700 font-semibold px-3 py-2"
                
                : "px-3 py-2 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {item.text}
          </button>
        ))}
      </div>
    </div>
  );
}

  function RelatedCoursesCTA() {
  return (
    <div className=" text-white rounded-xl p-5 shadow-md" style={{
background:
"linear-gradient(160deg,#134792 0%,#1a5aab 40%,#2160c1 75%,#4d89d9 100%)"
}}>
  <RiGraduationCapLine className="mb-3 opacity-85" size={20} />
       <h3 className="font-bold text-base leading-snug mb-2">Master Machine Learning</h3>
      <p className="text-sm opacity-85 mb-4 leading-relaxed">
        Join 12,000+ professionals in our industry-leading Data Science program.
      </p>
      <a
        href="#"
        className="block w-full text-center bg-white text-blue-600 text-sm font-bold py-2.5 rounded-lg hover:bg-orange-50 transition-colors"
      >
        Explore Courses
      </a>
    </div>
  );
}


  return (
    <>
      {/* Outside the Lato scope — inherit the global Open Sans font */}
      <div className="relative">
        <Breadcrumb />
      </div>
      {/* <BlogCategory /> */}

 <div className={`blog-detail-theme ${theme} ${lato.variable}`}>
      <div className={`w-full md:mx-auto md:py-10 2xl:px-32 xl:px-20 lg:px-10 p-5 grid md:gap-6 md:grid-cols-1 grid-cols-1 gap-0 
      `}>
       
        {/* Content Section */}
        <div className="md:max-w-6xl mx-auto w-full">
          <div className={` ${
            theme === "dark"
              ? "bg-[#030710] text-slate-100"
              : "bg-white text-slate-900"
          }`}>
             <h1 className="text-3xl md:text-4xl lg:text-4xl font-semibold leading-tight text-foreground mb-6 max-w-[860px]">{blogDetail.blog_title}</h1>
             {/* Meta row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          {/* Author */}
          {blogDetail.author && (
         <div className="hidden md:flex flex-wrap items-center gap-x-4 gap-y-3">
          <div className="relative w-10 h-10 border border-[#c0c0c0] rounded-full">
            <Image
            fill
              src={blogDetail.author.image}
              alt={blogDetail.author.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight">{blogDetail.author.name}</p>
              <p className={`text-xs  ${theme === "dark"
              ?"text-white"
              :"text-[#6b7280]"
               } `}>ExcelR</p>
            </div>
          </div>
          )}
         <div className={`w-px h-8   hidden sm:block ${
            theme === "dark"
            ?"bg-[#6b7280]"
            :"bg-[#1118271a]"
          }`} />
          <span className={`text-sm  ${theme === "dark"
              ?"text-white"
              :"text-[#6b7280]"
               } `}> {new Date(blogDetail.created_at).toLocaleDateString("en-GB", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        })}</span>
        {Number(blogDetail.read_time) > 0 && (
            <>
            <div className={`w-px h-8   hidden sm:block ${
            theme === "dark"
            ?"bg-[#6b7280]"
            :"bg-[#1118271a]"
          }`} />
          <span className={`flex items-center gap-1.5 text-sm
            ${theme === "dark"
              ? "text-white"
              : "text-[#6b7280]"
            }
            `}>
            <RiTimer2Line size={14} /> {blogDetail.read_time} minutes read
          </span>
            </>
        )

        }
          
          <div className={`w-px h-8   hidden sm:block ${
            theme === "dark"
            ?"bg-[#6b7280]"
            :"bg-[#1118271a]"
          }`} />
          <span className={`flex items-center gap-1.5 text-sm
            ${theme === "dark"
              ? "text-white"
              : "text-[#6b7280]"
            }
            `}>
            <RiBookOpenLine  size={14} />
            {blogDetail.view_count} views
          </span>
		   {/* Dark Mode Toggle */}
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
          {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
        </div>
         {blogDetail.blog_image && (
        <div className="rounded-t-2xl overflow-hidden aspect-16/7 bg-muted relative">
         <Image
                src={blogDetail.blog_image}
                alt={blogDetail.blog_title}
                fill
                style={{ objectFit: "cover" }}
                className="w-full h-full object-cover"
              />
        </div>
         )}
          
          <div className="flex gap-10 xl:gap-14 md:py-14">
            <article className="flex-1 min-w-0 max-w-3xl ">
              <div className="article-prose">
<div
ref={blogRef}
className="blog-description-container prose max-w-none"
dangerouslySetInnerHTML={{
__html:blogDetail.blog_description
}}
/>
</div>


{blogDetail.author && (
            <div className={`mt-10  dark:from-card dark:to-accent/10 rounded-2xl p-6 border border-[#eef2ff] ${
              theme === "dark"
              ? "bg-[#1f2937]"
              :"bg-linear-to-br from-[#eef2ff] to-[#dbeafe]"
            }`}>
              <div className="flex flex-col items-start sm:flex-row gap-5">
                <div className="w-20 h-20 relative">
<Image fill
                
                  src={blogDetail.author.image}
                  alt={blogDetail.author.name}
                 className="w-20 h-20 mt-0 rounded-2xl object-cover border-4 border-card shadow-md shrink-0"
                />
                </div>
                
                <div className="flex-1">
                  <span className="text-[11px] font-bold text-blue-700 uppercase tracking-widest block">Written by</span>
                  <Link
                    href={blogDetail.author.linkedin_url || "javascript:void(0);"}
                    target="_blank"
                    rel="nofollow"
                    className={`font-bold text-xl  leading-tight mb-2 block ${
                      theme === "dark"
                      ? "text-white"
                      :"text-slate-900"
                    }`}
                  >
                    {blogDetail.author.name}
                  </Link>
                  <p className={`text-md  leading-relaxed ${
                    theme === "dark"
                    ?"text-white"
                    : "text-[#6b7280]"
                  }`}>
                    {blogDetail.author.description}
                  </p>
                </div>
              </div>
            </div>
          )}
          

{parse(blogDetail.faq ?? "<p>No FAQ available.</p>")}
            </article>
            <aside className="hidden lg:block max-w-75 shrink-0">
  <div className="sticky top-20 space-y-5">

    {toc.length > 0 && (
      <ContentsSidebar
        toc={toc}
        activeHeading={activeHeading}
      />
    )}

    <RelatedCoursesCTA />
  </div>
</aside>
          </div>

          

          <div>
            
            <div>

 

</div>
          </div>
          {/* <Link href="https://www.excelr.com/uploads/ics_files/Selenium_Brochure_EDL_1.pdf" target="_blank" className="inline-block mt-4 px-4 py-2 font-semibold text-sm bg-[#FFAA33] text-white rounded-lg hover:bg-[#ffaa33e1]">
            Download pdf
          </Link> */}
            </div>
          

          {/* Share Buttons */}
          {/* <div className="mt-10">
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
          </div> */}

          {/* Post Comment */}
          {/* <div>
            
           {blogDetail.comments && blogDetail.comments.length > 0 && (
            <div className="mt-10">
            <h2 className="text-xl font-semibold mb-2">Latest Comments</h2>
            <div className="w-12 h-1 bg-[#197b9f] mb-4"></div>
  <div className="space-y-6">
    {blogDetail.comments.map((comment) => (
      <div key={comment.id} className="space-y-4">
         
        <div className={`comment-card p-4 rounded-lg shadow ${theme === "dark" ? "bg-[#030710] shadow-none" : "bg-white"}`}>
          <p className="font-semibold capitalize">{comment.username}</p>
          <p className="text-gray-600 text-xs mb-3">{comment.created_at}</p>
          <p className="text-gray-700 text-sm">{comment.message}</p>

           <button
            className="text-sm text-blue-500 mt-2 cursor-pointer ml-auto block"
            onClick={() => {
  const el = document.getElementById(item.id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 100;
  window.scrollTo({ top: y, behavior: "smooth" });
  setActiveHeading(item.id);
}}
          >
            Reply
          </button>
        </div>

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

          <PostComment blogId={blogDetail?.id} onSuccess={() => setReplyTo(null)} />
          </div> */}

          {/* Next Blog */}
           <div className="flex items-end justify-between mb-6 mt-8 md:mt-0">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">Keep Reading</p>
            <h2 className="text-2xl md:text-3xl font-semibold" >
              More From Tech Corner
            </h2>
          </div>
          <Link href="/blogs" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:opacity-80 transition-opacity">
            View All <RiArrowRightLine size={15} />
          </Link>
        </div>
         
            
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogDetail?.nextblog?.map((blog) => {
               const authorImageUrl = blog.author_image
                    ? `https://www.excelr.com/uploads/blog/${blog.author_image}`
                    : "/default-author-image.jpg";

                    return (
                      <div key={blog.id}
                      
                      className={`overflow-hidden shadow p-4 flex flex-col h-full ${
                        theme === "dark"
                        ? "bg-white"
                        :"bg:[#1f2937]"
                      }`}
                      
                    >
                      <div className="w-full relative min-h-36">
                                              <Image
                                                src={blog.Image}
                  alt={blog.title}
                                                fill
                                                className="object-cover"
                                              />
                                            </div>
                                             {/* Content */}
                                                                  <div className="pt-3 flex flex-col flex-1 justify-between">
                                                                    <div className="mb-3">
                                                                      {/* Category badge */}
                                                                       <p className="text-sm text-blue-500 font-semibold mb-2">
                                                                        {blog.blog_category}
                                                                      </p>  
                                            
                                                                      {/* Title */}
                                                                      <h3 className="font-semibold text-md mb-2 hover:text-orange-500 flex gap-3 justify-between">
                                                                        <Link href={blog.url || "/"} className={`line-clamp-2 ${
                                                                          theme === "dark"
                                                                          ?"text-black"
                                                                          :"text-[#1f2937]"
                                                                        }`}>
                                                                          {blog.title}
                                                                        </Link>
                                                                        <Link href={blog.url || "/"} className="shrink-0">
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
                                                                            alt={blog.author_name || "Author"}
                                                                            fill
                                                                            className="rounded-full object-cover"
                                                                          /> 
                                                                        </div>
                                                                        <div>
                                                                          <p className="text-[13px] font-semibold">
                                                                            {blog.author_name || "ExcelR Solutions"}
                                                                          </p>
                                                                          <p className="text-xs text-gray-500">
                                                                            {new Date(blog.created_at).toLocaleDateString("en-GB", {
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
                    )})}
            
             <Link href="/blogs" className=" sm:hidden flex items-center justify-center gap-1.5 text-sm font-semibold text-blue-600 hover:opacity-80 transition-opacity">
            View All <RiArrowRightLine size={15} />
          </Link>
          </div>
         
           
          {/* {blogDetail?.nextblog && (
            <div>
            <Link
              href={blogDetail.nextblog.url || "/"}
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
          )} */}

          {/* <PopularCourse heading="Popular Course" page_name="blog" variant="blog" /> */}
        </div>

        {/* Sidebar */}
        {/* <div className="col-span-1">
          <Sidebar activeCategory={category!} activeSubcategory={subcategory!} />
        </div> */}
      </div>
    </div>

    {/*
      Scoped Lato typography — targets only the .blog-detail-theme wrapper.
      The CSS custom property --font-lato is injected by next/font/google via
      the lato.variable className applied to that wrapper.
      Specificity is (0,2,1) which beats Tailwind utilities (0,1,0) without
      needing !important, and never leaks outside this page.
    */}
    <style jsx global>{`
      .blog-detail-theme[class*="__variable"] *,
      .blog-detail-theme *,
      .blog-detail-theme {
        font-family: var(--font-lato, 'Lato', system-ui, sans-serif) !important;
      }

      /* Headings inside rendered HTML (dangerouslySetInnerHTML) */
      .blog-detail-theme .blog-description-container h1,
      .blog-detail-theme .blog-description-container h2,
      .blog-detail-theme .blog-description-container h3,
      .blog-detail-theme .blog-description-container h4,
      .blog-detail-theme .blog-description-container h5,
      .blog-detail-theme .blog-description-container h6,
      .blog-detail-theme .blog-description-container p,
      .blog-detail-theme .blog-description-container li,
      .blog-detail-theme .blog-description-container a,
      .blog-detail-theme .blog-description-container span,
      .blog-detail-theme .blog-description-container td,
      .blog-detail-theme .blog-description-container th,
      .blog-detail-theme .blog-description-container blockquote,
      .blog-detail-theme .blog-description-container code,
      .blog-detail-theme .blog-description-container pre {
        font-family: var(--font-lato, 'Lato', system-ui, sans-serif) !important;
      }
    `}</style>
    </>

  );
}
