import {
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildPersonSchema,
  buildProfessionalServiceSchema,
  buildProfilePageSchema,
  buildProjectSchema,
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

/** FAQ schema belongs on the homepage only (it answers questions about the profile) */
export function FaqJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={jsonLdScript(buildFAQSchema())}
    />
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

export function ProjectJsonLd({ project }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={jsonLdScript(buildProjectSchema(project))}
    />
  );
}
