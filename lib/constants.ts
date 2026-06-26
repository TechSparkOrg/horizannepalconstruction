export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://horizonnepalconstruction.com"
).replace(/\/+$/, "")

export const apiOrigin = (
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000"
).replace(/\/api\/?$/, "")

export const baseOrgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Horizan Nepal",
  url: siteUrl,
}
