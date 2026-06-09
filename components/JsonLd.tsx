import type { SiteSettings } from "@/api/types/settings.types";

function LdJson({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", ...data }),
      }}
    />
  );
}

export function JsonLd({
  settings,
}: {
  settings: SiteSettings | null;
}) {
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://horizonnepalconstruction.com"
  ).replace(/\/+$/, "");

  let name = "Horizan Nepal";
  let description =
    "Architecture, Engineering & Construction services across Nepal.";
  let phone = "";
  let email = "";
  let address = "";
  let sameAs: string[] = [];

  if (settings) {
    name = settings.seo?.title || name;
    description = settings.seo?.description || description;
    phone = settings.contact_info?.phone || "";
    email = settings.contact_info?.email || "";
    address = settings.contact_info?.address || "";
    sameAs = (settings.social_links || []).map((l) => l.url).filter(Boolean);
  }

  return (
    <>
      <LdJson
        data={{
          "@type": "Organization",
          name,
          url: siteUrl,
          description,
          ...(phone && {
            contactPoint: {
              "@type": "ContactPoint",
              telephone: phone,
              contactType: "customer service",
            },
          }),
          ...(sameAs.length && { sameAs }),
        }}
      />
      <LdJson
        data={{
          "@type": "LocalBusiness",
          name,
          url: siteUrl,
          description,
          ...(phone && { telephone: phone }),
          ...(email && { email }),
          ...(address && {
            address: {
              "@type": "PostalAddress",
              streetAddress: address,
              addressCountry: "NP",
            },
          }),
          areaServed: "Nepal",
          ...(sameAs.length && { sameAs }),
        }}
      />
    </>
  );
}
