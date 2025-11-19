"use client";
import React from "react";
import Link from "next/link";

const blogPosts =[
    {
    slug: "how-to-learn-nextjs",
    title: "How to Learn Next.js Fast",
    date: "2025-10-01",
    author: "Vishnu L",
    excerpt: "A beginner's guide to mastering Next.js and building production-ready apps efficiently.",
    },
];
export default function BlogList(){
    return(
        <>
         <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6 text-center">Our Blog</h1>
        <p className="text-center text-gray-600 mb-10">
          Stay updated with our latest news, guides, and tutorials.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.slug}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
               
              <div className="p-5">
                <p className="text-sm text-gray-500 mb-1">
                  {post.date} • {post.author}
                </p>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>

                <Link
                  href={`/blogs/${post.slug}`}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
        </>
    );
}