"use client";
import Image from "next/image";
import Link from "next/link";
import {
  FaTwitter,
  FaLinkedin,
  FaMedium,
  FaGithub,
  FaYoutube,
  FaShareAlt,   // generic “share” icon for Warpcast
} from "react-icons/fa";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-white py-20">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10 animate-gradient-slow bg-gradient-to-r from-indigo-100 via-purple-100 to-orange-100 opacity-20"></div>

      <div className="container mx-auto flex flex-col md:flex-row items-center px-4">
        {/* Animated gradient border + avatar */}
        <div className="relative w-48 h-48 mb-8 md:mb-0 md:mr-12">
          <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-indigo-600 via-orange-400 to-indigo-600 p-[2px] animate-spin-slow"></div>
          <div className="relative w-full h-full rounded-full bg-white overflow-hidden">
            <Image
              src="/images/pranshu.JPG"
              alt="Pranshu Rastogi"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Intro text + social icons */}
        <div className="max-w-2xl">
          <h1 className="text-5xl font-extrabold text-indigo-800 mb-2">
            Pranshu Rastogi
          </h1>
          <h2 className="text-xl text-orange-500 mb-4">
            Head of Ecosystem &amp; Integrations at Push Chain
          </h2>
          <p className="text-gray-700 mb-6">
            I’m passionate about building robust Web3 ecosystems, integrating
            developer tools, and driving adoption through innovative UX and
            open-infrastructure solutions.
          </p>

          {/* Social links */}
          <div className="flex space-x-6">
            <Link
              href="https://x.com/pranshurastogii"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800"
            >
              <FaTwitter size={24} aria-label="X" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/rastogipranshu/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800"
            >
              <FaLinkedin size={24} aria-label="LinkedIn" />
            </Link>
            <Link
              href="https://pranshurastogi.medium.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800"
            >
              <FaMedium size={24} aria-label="Medium" />
            </Link>
            <Link
              href="https://github.com/pranshurastogi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800"
            >
              <FaGithub size={24} aria-label="GitHub" />
            </Link>
            <Link
              href="https://www.youtube.com/@pranshurastogi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800"
            >
              <FaYoutube size={24} aria-label="YouTube" />
            </Link>
            <Link
              href="https://warpcast.com/pranshurastogi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800"
            >
              <FaShareAlt size={24} aria-label="Warpcast" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
