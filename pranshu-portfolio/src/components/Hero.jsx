"use client";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center px-4">
        {/* Profile image */}
        <div className="relative w-40 h-40 mb-6 md:mb-0 md:mr-8">
          <Image
            src="/images/pranshu.jpg"
            alt="Pranshu Rastogi"
            fill
            className="rounded-full object-cover shadow-lg"
          />
        </div>

        {/* Textual intro */}
        <div>
          <h1 className="text-5xl font-bold mb-2">Pranshu Rastogi</h1>
          <h2 className="text-xl text-gray-600 mb-4">
            Head of Ecosystem &amp; Integrations at Push Chain
          </h2>
          <p className="text-gray-700 max-w-2xl">
            I’m passionate about building robust Web3 ecosystems, integrating
            developer tools, and driving adoption through innovative UX and open
            infrastructure solutions.
          </p>
        </div>
      </div>
    </section>
  );
}
