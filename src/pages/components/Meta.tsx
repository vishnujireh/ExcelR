// components/Meta.tsx
"use client"
import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { usePathname } from "next/navigation";
import Script from "next/script";

interface MetaProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  noIndex?: boolean;
  schema?: string;
}

const Meta: React.FC<MetaProps> = ({
  title: customTitle,
  description: customDescription,
  keywords: customKeywords,
  canonicalUrl: customCanonicalUrl,
  ogImage,
  noIndex = false,
  schema,
}) => {
  const pathname = usePathname();
  
  // Build canonical URL
  const baseUrl = "https://www.excelr.com";
  const canonicalUrl = customCanonicalUrl || `${baseUrl}${pathname || "/"}`;

  // Default meta data
  const defaultTitle = "ExcelR - Global Certification Training for Professionals";
  const defaultDescription =
    "ExcelR offers online training and classroom, Self paced E learning training; get certification on PMP, Tableau, Qlik view, Analytics, ACP, Data Scientist, PMI,";
  const defaultKeywords =
    "ExcelR offers online training and classroom, Self paced E learning training; get certification on PMP, Tableau, Qlik view, Analytics, ACP, Data Scientist, PMI,";
  const defaultOgImage = "https://www.excelr.com/assets/media/general/logoweb_204.png";

   
  // Use custom or default values
  let metaTitle = customTitle || defaultTitle;
  let metaDescription = customDescription || defaultDescription;
  const metaKeywords = customKeywords || defaultKeywords;
  const seoImg = ogImage || defaultOgImage;

  switch (pathname) {
    case '/about-us':
      metaTitle = 'Instructor-led Online and Classroom Training - ExcelR';
      metaDescription = 'ExcelR is a global leader in training and consulting with the main aim of raising excellence through quality education. We help professionals and students to boost their career growth.';
      break;
   }

  // Routes that should be noindexed
  const noIndexRoutes = [
    "/test3",
    "/forums",
    "/test-page1",
    "/22195-2",
    "/test-page2",
    "/enroll_course",
    "/thank-you",
    "/thank-you-page-edl",
  ];

  const shouldNoIndex = noIndex || noIndexRoutes.includes(pathname || "");
  const whatsappLoadedRef = useRef(false);

  // Initialize WhatsApp widget after delay
  useEffect(() => {
  // Routes where WhatsApp should NOT load
  const excludedPaths = [
    "/webinar",
    "/blog",
    "/mock-interview",
    "/excelr-free-courses-registration-form",
    "/excelr-TASK-free-courses-registration-form",
    "/excelr-APSSDC-free-courses-registration-form",
    "/excelr-JNTU-K-free-courses-registration-form",
    "/python-course-registration-form",
    "/excelr-virtual-training-program-on-angular-registration-form",
    "/business-whatsapp-opt-in-registration-form",
  ];

  if (excludedPaths.some(p => pathname?.includes(p))) return;

  const load = () => {
    if (whatsappLoadedRef.current) return;
    whatsappLoadedRef.current = true;
    initializeWhatsAppWidget();
    window.removeEventListener("scroll", load);
  };

  window.addEventListener("scroll", load, { once: true });
  return () => window.removeEventListener("scroll", load);
}, [pathname]);


  const initializeWhatsAppWidget = () => {
    const urlpath = window.location.origin + window.location.pathname;
    const url_id = Date.now();

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.defer = true;
    script.src =
      "https://s3.ap-south-1.amazonaws.com/cdn.limechat.ai/packs/js/whatsapp_widget/LC_whatsapp_widget.js";

    script.onload = () => {
      // @ts-expect-error — intentional suppression due to Meta being a Client Component
      if (typeof LimeChatWhatsapp !== "undefined") {
       // @ts-expect-error — intentional suppression due to Meta being a Client Component
        const whatsAppBtn = new LimeChatWhatsapp({
          phone: "918197387604",
          prefill_text: `Hi I am surfing on this ${urlpath}?id=${url_id} Need few details on this`,
          button_message_mobile: "Chat with us",
          button_message_desktop: "Chat with us",
          display_on: "both",
          widget_type_desktop: "icon",
          widget_type_mobile: "icon",
          display_size_desktop: 44,
          position_desktop: "left",
          bottom_margin_desktop: 15,
          left_margin_desktop: 15,
          right_margin_desktop: 48,
          display_size_mobile: 44,
          position_mobile: "left",
          bottom_margin_mobile: 24,
          left_margin_mobile: 24,
          right_margin_mobile: 24,
          show_pop_up: true,
          pop_up_message_position: "side",
          pop_up_message_text: "Chat with Us",
          pop_up_image: " ",
          pop_up_delay: 3,
          pdp_prefill_text: "Hey! I would like to know about ",
          pages_to_display: [
            "homepage",
            "cart",
            "blogs",
            "products",
            "collections",
            "checkout",
            "pages",
          ],
          includeVariant: false,
          isShopify: false,
          zIndex: 10000,
        });

        whatsAppBtn.renderButton();

        // Observer to detect when button appears
        const observer = new MutationObserver(() => {
          const btn = document.querySelector(".WhatsAppButton__root");
          if (btn) {
            const website_url = window.location.href;
            btn.addEventListener("click", () => {
              // Send POST request
              fetch(`${baseUrl}/home/post_whatsapp_urls`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ url_id, website_url }),
              })
                .then((response) => response.json())
                .then(() => {
                  console.log("WhatsApp click tracked");
                })
                .catch((error) => {
                  console.error("POST error:", error);
                });
            });
            observer.disconnect();
          }
        });

        observer.observe(document.body, {
          childList: true,
          subtree: true,
        });
      }
    };

    const firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode?.insertBefore(script, firstScript);
  };

  const [loadTrackingScripts, setLoadTrackingScripts] = React.useState(false);

useEffect(() => {
  const timer = setTimeout(() => {
    setLoadTrackingScripts(true);
  }, 10000); // ⏱ 10 seconds delay

  return () => clearTimeout(timer);
}, []);

const [loadGTM, setLoadGTM] = useState(false);
const [loadWebEngage, setLoadWebEngage] = useState(false);

useEffect(() => {
  const id = setTimeout(() => setLoadGTM(true), 20000);
  return () => clearTimeout(id);
}, []);

useEffect(() => {
  const onScroll = () => {
    setLoadWebEngage(true);
    window.removeEventListener("scroll", onScroll);
  };
  window.addEventListener("scroll", onScroll);
}, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
        <link rel="canonical" href={canonicalUrl} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
        <meta content="telephone=no" name="format-detection" />
        <meta name="HandheldFriendly" content="true" />

      
 {customTitle ? (
  <>
    {/* Open Graph */}
    <meta key="og:url" property="og:url" content={canonicalUrl} />
    <meta key="og:title" property="og:title" content={customTitle} />
    <meta key="og:site_name" property="og:site_name" content="excelr.com" />
    <meta key="og:type" property="og:type" content="article" />
    <meta key="og:description" property="og:description" content={metaDescription} />
    <meta key="og:image" property="og:image" content={seoImg} />
    <meta key="og:image:height" property="og:image:height" content="240" />
    <meta key="og:image:width" property="og:image:width" content="360" />

    {/* Twitter Card */}
    <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
    <meta key="twitter:site" name="twitter:site" content="@excelr" />
    <meta key="twitter:title" name="twitter:title" content={customTitle} />
    <meta key="twitter:creator" name="twitter:creator" content="@excelr" />
    <meta key="twitter:description" name="twitter:description" content={metaDescription} />
    <meta key="twitter:image" name="twitter:image" content={seoImg} />
  </>
) : (
  <>
    {/* Open Graph */}
    <meta key="og:url" property="og:url" content={canonicalUrl} />
    <meta key="og:title" property="og:title" content={defaultTitle} />
    <meta key="og:site_name" property="og:site_name" content="excelr.com" />
    <meta key="og:type" property="og:type" content="article" />
    <meta key="og:description" property="og:description" content={metaDescription} />
    <meta key="og:image" property="og:image" content={seoImg} />
    <meta key="og:image:height" property="og:image:height" content="240" />
    <meta key="og:image:width" property="og:image:width" content="360" />

    {/* Twitter Card */}
    <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
    <meta key="twitter:site" name="twitter:site" content="@excelr" />
    <meta key="twitter:title" name="twitter:title" content={defaultTitle} />
    <meta key="twitter:creator" name="twitter:creator" content="@excelr" />
    <meta key="twitter:description" name="twitter:description" content={metaDescription} />
    <meta key="twitter:image" name="twitter:image" content={seoImg} />
  </>
)}

        {/* Favicon */}
       {/* <link rel="icon" href="/favicon.png" sizes="32x32" />
<link rel="apple-touch-icon" href="/favicon.png" /> */}

        {/* Robots */}
        {shouldNoIndex ? (
          <meta name="robots" content="nofollow, noindex" />
        ) : (
          <>
            <meta name="robots" content="NOODP,NOYDIR" />
            <meta name="distribution" content="global" />
            <meta name="copyright" content="Excelr: Online Professional Certification Training Courses India & USA" />
            <meta name="language" content="English" />
            <meta name="rating" content="general" />
            <meta name="robots" content="ALL" />
            <meta name="revisit-after" content="Daily" />
            <meta name="author" content="Excelr Group" />
            <meta name="googlebot" content="index,follow" />
            <meta name="bingbot" content="index,follow" />
            <meta name="expires" content="never" />
            <meta name="coverage" content="Worldwide" />
          </>
        )}

        {/* Schema Markup */}
        {schema && <script type="application/ld+json">{schema}</script>}
       
      </Head>

      {/* Google Ads Scripts */}
      {loadTrackingScripts && !shouldNoIndex && (
        <>

        {/* <Script
  src="https://www.googletagmanager.com/gtm.js?id=GTM-MNQJ78J"
  strategy="lazyOnload"
/> */}
          {/* <Script
            src="https://www.googletagmanager.com/gtag/js?id=AW-979964421"
            strategy="lazyOnload"
          />
          <Script id="gtag-base" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-979964421');
              gtag('config', 'AW-703011498');
              gtag('config', 'AW-705533570');
            `}
          </Script> */}

          {/* PMP Pune specific tracking */}
          {(pathname === "/pmp-training-in-pune" ||
            pathname === "/thank-you-pmp-pune") && (
            <Script id="pmp-pune-tracking" strategy="lazyOnload">
              {`
                gtag('config', 'AW-705533570');
                ${
                  pathname === "/thank-you-pmp-pune"
                    ? "gtag('event', 'conversion', {'send_to': 'AW-705533570/K5BMCP6_vs0BEIKtttAC'});"
                    : ""
                }
              `}
            </Script>
          )}

          {/* Thank you page conversions */}
          {pathname === "/thank-you" && (
            <Script id="thank-you-conversions" strategy="lazyOnload">
              {`
                gtag('event', 'conversion', {'send_to': 'AW-979964421/_t-RCL7dp9QBEIWkpNMD'});
                gtag('event', 'conversion', {'send_to': 'AW-703011498/ZU54CMSPudQBEKq1nM8C'});
                gtag('event', 'conversion', {'send_to': 'AW-705533570/LIOfCOf0vNQBEIKtttAC'});
              `}
            </Script>
          )}
        </>
      )}
{loadGTM && (
      <Script
        id="gtm-script"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MNQJ78J');
          `,
        }}
      />
)}

{loadWebEngage && (
  <Script id="webengage-init" strategy="lazyOnload">
    {`
      var webengage;
      !function(w,e,b,n,g){
        function o(e,t){e[t[t.length-1]]=function(){r.__queue.push([t.join("."),arguments])}}
        var i,s,r=w[b],z=" ",l="init options track screen onReady".split(z),
        a="feedback survey notification".split(z),c="options render clear abort".split(z),
        p="Open Close Submit Complete View Click".split(z),
        u="identify login logout setAttribute".split(z);
        if(!r||!r.__v){
          for(w[b]=r={__queue:[],__v:"6.0",user:{}},i=0;i<l.length;i++)o(r,[l[i]]);
          for(i=0;i<a.length;i++){
            for(r[a[i]]={},s=0;s<c.length;s++)o(r[a[i]],[a[i],c[s]]);
            for(s=0;s<p.length;s++)o(r[a[i]],[a[i],"on"+p[s]])
          }
          for(i=0;i<u.length;i++)o(r.user,["user",u[i]]);
          setTimeout(function(){
            var f=e.createElement("script");
            f.async=true;
            f.src=(e.location.protocol==="https:"?
              "https://ssl.widgets.webengage.com":
              "http://cdn.widgets.webengage.com")+"/js/webengage-min-v-6.0.js";
            (e.head||e.body).appendChild(f);
          },12000)
        }
      }(window,document,"webengage");
      webengage.init('~15ba20116');
    `}
  </Script>
)}


    </>
  );
};

export default Meta;