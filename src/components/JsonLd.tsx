import { siteConfig } from "@/content/site";

export default function JsonLd() {
  const sameAs = [siteConfig.githubUrl, siteConfig.linkedinUrl].filter(
    (u): u is string => Boolean(u),
  );
  const address = { "@type": "PostalAddress", addressCountry: "PH" };
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: siteConfig.name,
        jobTitle: "Technical Virtual Assistant",
        email: siteConfig.email,
        url: siteConfig.siteUrl,
        address,
        sameAs,
      },
      {
        "@type": "ProfessionalService",
        name: `${siteConfig.name} - Technical Virtual Assistant`,
        description:
          "Part-time remote IT support, troubleshooting, networking assistance, website support, and workflow automation.",
        url: siteConfig.siteUrl,
        email: siteConfig.email,
        address,
        areaServed: "Worldwide",
        sameAs,
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
