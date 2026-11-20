import Head from "next/head";
import {
  GOOGLE_SITE_VERIFICATION,
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site";

/**
 * Shared head tags for GSC, Facebook Sharing Debugger, and page SEO.
 * Pass title/description/path for non-home pages.
 */
export function Seo({
  title = SITE_TITLE,
  description = SITE_DESCRIPTION,
  path = "/",
  noIndex = false,
}) {
  const url = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const canonical = url.endsWith("/") || path === "/" ? url : `${url}/`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="google-site-verification" content={GOOGLE_SITE_VERIFICATION} />
      {noIndex ? <meta name="robots" content="noindex,nofollow" /> : <meta name="robots" content="index,follow" />}

      <link rel="canonical" href={canonical} />

      {/* Open Graph — Facebook Sharing Debugger */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_CA" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={OG_IMAGE.url} />
      <meta property="og:image:secure_url" content={OG_IMAGE.url} />
      <meta property="og:image:width" content={String(OG_IMAGE.width)} />
      <meta property="og:image:height" content={String(OG_IMAGE.height)} />
      <meta property="og:image:alt" content={OG_IMAGE.alt} />
      <meta property="og:image:type" content={OG_IMAGE.type} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE.url} />
    </Head>
  );
}
