import React from "react";
import type { AppProps } from "next/app";
import "./globals.css";
import Providers from "./providers"; // ✅ no curly braces
import dynamic from "next/dynamic";
// import 'react-photo-view/dist/react-photo-view.css';
const Header = dynamic(() => import("./components/Header"), { ssr: true });
const Footer = dynamic(() => import("./components/Footer"), { ssr: false });
const FooterSticky = dynamic(() => import("./components/FooterSticky"), { ssr: false });
// import Meta from "./components/Meta";
import { useRouter } from "next/router";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",          // ✅ avoids render blocking
  preload: true,            // ✅ preload critical font
});

 

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Detect course page
  const isCoursePage = router.pathname.startsWith("/course/");
  return (
    <>
    
    <div className={`${openSans.className}  `}>
      <Providers>
        {/* <Meta /> */}
        <Header />
        <div className="pt-[73px] md:pt-0">
        <Component {...pageProps} />
        </div>
        {!isCoursePage && <Footer />}
        <FooterSticky  />
      </Providers>
    </div>
    </>
  );
}
