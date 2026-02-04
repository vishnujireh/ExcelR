import React from "react";
import type { AppProps } from "next/app";
import "./globals.css";
import Providers from "./providers";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Open_Sans, Roboto } from "next/font/google";

const Header = dynamic(() => import("./components/Header"), { ssr: true });
const Footer = dynamic(() => import("./components/Footer"), { ssr: false });
const FooterSticky = dynamic(() => import("./components/FooterSticky"), { ssr: false });

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

  return (
    //  ${roboto.className}
    <div className={`${openSans.className}`}>
      <Providers>
        <Header />
        <div className="pt-[73px] md:pt-0">
          <Component {...pageProps} />
        </div>
        {!isCoursePage && <Footer />}
        <FooterSticky />
      </Providers>
    </div>
  );
}
