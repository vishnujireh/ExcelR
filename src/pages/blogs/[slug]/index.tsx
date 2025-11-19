// src/app/blogs/[slug]/page.tsx
import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Head from "next/head";

// Example blog data
const blogPosts = [
  {
    slug: "how-to-learn-nextjs",
    title: "How to Learn Next.js Fast",
    date: "2025-10-01",
    author: "Vishnu L",
    content: "<p>Next.js is great!</p>",
    metatitle: "Learn Next.js Fast",
    metaDescription: "Next.js guide",
    metaKeywords: "nextjs, react",
  },
  {
    slug: "seo-best-practices",
    title: "SEO Best Practices",
    date: "2025-09-20",
    author: "ExcelR Team",
    content: "<p>SEO tips 2025</p>",
    metatitle: "SEO Tips 2025",
    metaDescription: "SEO guide",
    metaKeywords: "SEO, marketing",
  },
];

// Metadata for SEO
export async function generateMetadata(props: any): Promise<Metadata> {
  const { params } = props as { params: { slug: string } };
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Blog Not Found" };
  return {
    title: `${post.title} | Blog`,
    description: post.metaDescription ?? post.content.slice(0, 150),
  };
}

// Pre-generate all blog pages
export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

// Define props type manually
// interface BlogPageProps {
//   params: {
//     slug: string;
//   };
// }

// Page component must NOT be async
export default function BlogDetailsPage(props: any) {
  const { params } = props as { params: { slug: string } };
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  return (
    <>
      <Head>
        <title>{post.metatitle}</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="keywords" content={post.metaKeywords} />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-500 mb-6">
          {post.date} • By {post.author}
        </p>

        <article
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </>
  );
}
