"use server";

import { headers } from "next/headers";
import { eq, sql } from "drizzle-orm";
import { UAParser } from "ua-parser-js";

import db from "@/db";
import { clicks, urlTable } from "@/db/schemas/url-schema";

export async function incrementClickCount(shortCode: string) {
  const headersList = await headers();

  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    null;

  const country = headersList.get("x-vercel-ip-country") ?? null;
  const city = headersList.get("x-vercel-ip-city") ?? null;
  const referrer = headersList.get("referer") ?? null;

  const userAgent = headersList.get("user-agent") ?? "";

  const parser = new UAParser(userAgent);

  const browser = parser.getBrowser().name ?? null;
  const os = parser.getOS().name ?? null;
  const device =
    parser.getDevice().type ??
    (parser.getDevice().vendor ? "mobile" : "desktop");

  const [url] = await db
    .select({
      id: urlTable.id,
    })
    .from(urlTable)
    .where(eq(urlTable.slug, shortCode))
    .limit(1);

  if (!url) {
    throw new Error("Short URL not found");
  }

  await db
    .update(urlTable)
    .set({
      clickCount: sql`${urlTable.clickCount} + 1`,
    })
    .where(eq(urlTable.slug, shortCode));

  await db.insert(clicks).values({
    urlId: url.id,
    ipAddress: ip,
    country,
    city,
    browser,
    os,
    device,
    referrer,
  });
}
