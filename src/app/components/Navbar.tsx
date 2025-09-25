"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "/public/logo-white.png";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="md:container md:mx-auto w-full flex items-center justify-between py-4 px-8 bg-gray-800 text-white">
        <div>
            <p className="mb-2.5 font-semibold">Call Us <Link href="tel:18002122121">18002122121</Link></p>
            <Link href="/" className="flex items-center">
        <Image src={logo} alt="Logo" />
      </Link>
        </div>
      
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className={pathname === "/" ? "font-bold" : ""}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" className={pathname === "/about" ? "font-bold" : ""}>
            About
          </Link>
        </li>
        <li>
          <Link href="/contact" className={pathname === "/contact" ? "font-bold" : ""}>
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
