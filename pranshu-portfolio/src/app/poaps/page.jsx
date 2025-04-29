// src/app/poaps/page.jsx
import PoapGallery from "@/components/PoapGallery";

const ADDRESS = "0xcB034160f7B45E41E6015ECEA09F31A66C144422";

export default function PoapsPage() {
  return (
    <section className="min-h-screen pt-16 bg-base-100">
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold text-center mb-8 text-primary">
          All My POAPs
        </h2>
        {/* No limit = show everything */}
        <PoapGallery address={ADDRESS} />
      </div>
    </section>
  );
}
