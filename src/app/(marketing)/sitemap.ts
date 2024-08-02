import { getBaseURL } from "@/lib/url";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const links = [
    { url: getBaseURL(), lastModified: new Date() },
    { url: `${getBaseURL()}/contact`, lastModified: new Date() },
  ];
  return links;
}
