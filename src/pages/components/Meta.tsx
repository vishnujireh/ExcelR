"use client";

import React from "react";
import Head from "next/head";
import { usePathname } from "next/navigation";

const Meta = () => {
  const pathname = usePathname();
  const canonicalUrl = `https://jirehsol.com${pathname || "/"}`;

  // Default meta data
  let title = "Trusted Software Development Company in India | Jireh";
  let description =
    "Jireh Software Solutions offers scalable mobile and web app development services from India, delivering secure and innovative solutions for global businesses.";
  let keywords =
    "Software Development Company, Mobile App Development, Web App Development, Custom Software Solutions, IT Services India, Scalable Software, App Developers Bangalore, Web Application Development, Enterprise Software, Tech Solutions India";

  // Change meta data based on route
  switch (pathname) {
    case "/":
      title =
        "Trusted Software Development Company in India | Jireh";
      description =
        "Jireh Software Solutions offers scalable mobile and web app development services from India, delivering secure and innovative solutions for global businesses.";
      keywords =
        "Software Development Company, Mobile App Development, Web App Development, Custom Software Solutions, IT Services India, Scalable Software, App Developers Bangalore, Web Application Development, Enterprise Software, Tech Solutions India";
      break;

    case "/mobile-development/ios-app-development":
      title = "Jireh Software Solutions: iOS App Development Company";
      description =
        "Jireh is a top iOS app development company offering custom app solutions tailored for startups and enterprises.";
      break;

    // ... (keep your full switch logic unchanged)
  }

  // ✅ Add analytics & chat scripts
   

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://jirehsol.com/jireh-logo.png" />
      <meta property="og:url" content={canonicalUrl} />
    </Head>
  );
};

export default Meta;
