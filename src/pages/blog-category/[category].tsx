import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Breadcrumb from "../components/Breadcrumb";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchBlogsByCategory, fetchSidebarCategories } from "@/redux/slices/blogSlice";
import Link from "next/link";
import bannerImageUrl from "/public/blog_page.webp";
import Image from "next/image";

 
function slugify(text: string) {
  return text
    ?.toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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


export default function CategoryBlogList() {
  const router = useRouter();
  const { category } = router.query;
  const dispatch = useDispatch<AppDispatch>();
  const {blogsByCategory, loadingCategory, errorCategory} = useSelector(
    (state: RootState) => state.blogs
  );
 
  useEffect(() => {
    if (category) {
      dispatch(fetchBlogsByCategory(category as string));
      dispatch(fetchSidebarCategories());
    }
  }, [category, dispatch]);


  if (loadingCategory) return <p>Loading blogs...</p>;
  if (errorCategory) return <p>Error: {errorCategory}</p>;

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

      <div className="w-full md:mx-auto md:py-16 2xl:px-32 xl:px-20 lg:px-10 p-5 relative">
        <div className="hidden md:block absolute inset-0 -z-10">
              <Image
                  src={bannerImageUrl}
                  alt="Enroll Course Banner"
                  fill
                  priority
                  fetchPriority="high"
                  sizes="100vw"
                  className="object-cover -z-10"
                  quality={55}
                />
                </div>
                <div className="hidden md:block absolute inset-0 bg-black/60 z-0" />
                <h1 className="text-3xl font-medium text-shadow-black mb-1.5 text-center z-50 relative text-white capitalize">
           {formatTitle(category)}
        </h1>
      </div>
    
      <div className="w-full md:mx-auto md:py-10 2xl:px-32 xl:px-20 lg:px-10 p-5 grid md:gap-6 md:grid-cols-4 grid-cols-1">
        <div className="col-span-3">
           <div className="grid md:grid-cols-2 gap-6">
            {blogsByCategory.map((blog) => (
        <div key={blog.id} className="md:flex shadow rounded p-4 bg-white">
          <div className="md:w-1/3 relative min-h-[120px]">
            <img
              src={blog.blog_image}
              alt={blog.blog_title}
              className="rounded object-cover w-full h-full"
            />
          </div>
          <div className="md:w-2/3 md:pl-4 pt-3 md:pt-0 flex flex-col">
          <div> 
            <h3 className="font-semibold text-md mb-2 hover:text-orange-500">
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

        <div className="col-span-1 mt-5 md:mt-0">
          <Sidebar activeCategory={category} />
        </div>
      </div>
    </>
  );
}
