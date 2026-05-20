import {
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildPersonSchema,
  buildProfessionalServiceSchema,
  buildProfilePageSchema,
  buildProjectsSchema,
  buildWebsiteSchema,
  jsonLdScript,
} from "@/lib/site-seo";

export function GlobalJsonLd() {
  const schemas = [
    buildPersonSchema(),
    buildWebsiteSchema(),
    buildProfilePageSchema(),
    buildProfessionalServiceSchema(),
    buildFAQSchema(),
    buildProjectsSchema(),
  ];

  return (
    <>
      {schemas.map((schema) => (
        <script
          key={schema["@type"] + (schema["@id"] || "")}
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(schema)}
        />
      ))}
    </>
  );
}

export function BreadcrumbJsonLd({ items }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={jsonLdScript(buildBreadcrumbSchema(items))}
    />
  );
}
