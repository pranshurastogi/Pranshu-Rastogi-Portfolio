// src/app/poaps/page.jsx
import PoapGallery from "@/components/blockchain/PoapGallery";
import Head from "next/head";

const ADDRESS = "0xcB034160f7B45E41E6015ECEA09F31A66C144422";

export default function PoapsPage() {
  return (
    <>
      <Head>
        <title>POAPs | Pranshu Rastogi</title>
        <meta name="description" content="Explore all POAPs (Proof of Attendance Protocol) collected by Pranshu Rastogi at blockchain events and conferences." />
        <meta property="og:title" content="POAPs | Pranshu Rastogi" />
        <meta property="og:description" content="Explore all POAPs (Proof of Attendance Protocol) collected by Pranshu Rastogi at blockchain events and conferences." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pranshurastogi.com/poaps" />
        <meta property="og:image" content="/images/pfp-current.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="POAPs | Pranshu Rastogi" />
        <meta name="twitter:description" content="Explore all POAPs (Proof of Attendance Protocol) collected by Pranshu Rastogi at blockchain events and conferences." />
        <meta name="twitter:image" content="/images/pfp-current.png" />
      </Head>
      <section className="min-h-screen pt-16 bg-base-100">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-semibold text-center mb-8 text-primary">
            All My POAPs
          </h2>
          {/* No limit = show everything */}
          <PoapGallery address={ADDRESS} />
        </div>
      </section>
    </>
  );
}
