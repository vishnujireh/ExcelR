import React from "react";
import type { AppProps } from "next/app";
import "./globals.css";
import Providers from "./providers"; // ✅ no curly braces

import Header from "./components/Header";
import Footer from "./components/Footer";
import Meta from "./components/Meta";

import { Open_Sans, JetBrains_Mono } from "next/font/google";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${openSans.variable} ${jetbrainsMono.variable}`}>
      <Providers>
        <Meta />
        <Header />
        <Component {...pageProps} />
        <Footer />
      </Providers>
    </div>
  );
}
