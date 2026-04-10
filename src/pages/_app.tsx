import React from "react";
import type { AppProps } from "next/app";
import "./globals.css";
import "intl-tel-input/build/css/intlTelInput.css";
import "react-photo-view/dist/react-photo-view.css";
import Providers from "./providers";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Open_Sans } from "next/font/google";
import Script from "next/script";
import type { CourseData } from "@/redux/slices/courseSlice";

/* Dynamic Components */
type CourseDataProps = { courseData?: CourseData | null };

const Header = dynamic<CourseDataProps>(() => import("./components/Header"), {
  ssr: true,
});
const Footer = dynamic(() => import("./components/Footer"), { ssr: false });
const FooterSticky = dynamic<CourseDataProps>(() => import("./components/FooterSticky"), {
  ssr: false,
});

/* Open Sans */
const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
  preload: true,
});

/* Roboto */
// const roboto = Roboto({
//   variable: "--font-roboto",
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "700"],
//   display: "swap",
//   preload: true,
// });

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isCoursePage = router.pathname.startsWith("/course/");

  /* URLs where Zoho should NOT load */
  const excludedUrls = [
    "excelr-free-courses-registration-form",
    "python-course-registration-form",
    "excelr-sdp-registration-form",
    "excelr-virtual-training-program-on-angular-registration-form",
    "business-whatsapp-opt-in-registration-form",
    "excelr-task-free-courses-registration-form",
    "excelr-apssdc-free-courses-registration-form",
    "excelr-jntu-k-free-courses-registration-form",
    "every-day-learning",
    "cloud-computing",
    "e-cap",
    "thank-you-page-edl",
    "cloud-computing-courses-bangalore",
    "business-analyst-and-full-stack-development-course-in-bangalore",
    "software-testing-and-digital-marketing-course-bangalore",
    "full-stack-developer-and-azure-course-thane-mumbai",
    "thank-you-pmp-pune",
    "thank-you",
  ];

  const currentPath = router.asPath.toLowerCase();

  const shouldLoadZoho = !excludedUrls.some((url) =>
    currentPath.includes(url)
  );

  return (
    //  ${roboto.className}
    <div className={`${openSans.className}`}>
      <Providers>
        <Header courseData={pageProps?.courseData ?? null} />
        <div className="pt-[73px] md:pt-0">
          <Component {...pageProps} />
        </div>
        {!isCoursePage && <Footer />}
        <FooterSticky courseData={pageProps?.courseData ?? null} />
		
        {/* Zoho SalesIQ Script */}
        {shouldLoadZoho && (
          <Script
            id="zoho-salesiq-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                var $zoho = $zoho || {};
                $zoho.salesiq = $zoho.salesiq || {
                  widgetcode: "siq62168f35092051db6ad94e63f5cdefe186449e3a16a0b662ee010bfa7fa27047",
                  values: {},
                  ready: function(){}
                };

                setTimeout(function() {
                  if (!document.getElementById("zsiqscript")) {
                    var d = document;
                    var s = d.createElement("script");
                    s.type = "text/javascript";
                    s.id = "zsiqscript";
                    s.defer = true;
                    s.src = "https://salesiq.zohopublic.in/widget";
                    d.body.appendChild(s);
                  }
                }, 5000);
              `,
            }}
          />
        )}		
		
      </Providers>
    </div>
  );
}
