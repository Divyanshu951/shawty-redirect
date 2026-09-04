"use server";
import db from "@/db";
import { urlTable } from "@/db/schemas/url-schema";
import { sql, eq } from "drizzle-orm";

export async function incrementClickCount(shortCode: string) {
  await db
    .update(urlTable)
    .set({
      clickCount: sql`${urlTable.clickCount} + 1`,
    })
    .where(eq(urlTable.slug, shortCode));
}
