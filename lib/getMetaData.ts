import { load } from "cheerio";

export default async function getMetadata(url: string) {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const html = await response.text();
    const $ = load(html);

    return {
      title:
        $('meta[property="og:title"]').attr("content") || $("title").text(),

      description:
        $('meta[property="og:description"]').attr("content") ||
        $('meta[name="description"]').attr("content"),

      image: $('meta[property="og:image"]').attr("content"),

      siteName: $('meta[property="og:site_name"]').attr("content"),
    };
  } catch {
    return null;
  }
}
