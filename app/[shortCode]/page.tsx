import LinkNotActive from "@/components/link-not-active";
import db from "@/db";
import { urlTable } from "@/db/schemas";
import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm/sql";
import { notFound } from "next/navigation";

export default async function Home({
  params,
}: {
  params: Promise<{ shortCode: string }>;
}) {
  const { shortCode } = await params;
  const trimmedShortCode = shortCode.trim();

  // Get and update at the same time
  const [link] = await db
    .update(urlTable)
    .set({
      clickCount: sql`${urlTable.clickCount} + 1`,
    })
    .where(eq(urlTable.slug, trimmedShortCode))
    .returning({
      destinationUrl: urlTable.destinationUrl,
      isActive: urlTable.isActive,
      expiresAt: urlTable.expiresAt,
      visits: urlTable.clickCount,
    });

  // No link
  if (!link) return notFound();

  // Link is not active
  if (!link.isActive) return LinkNotActive();

  const { destinationUrl, isActive, expiresAt, visits } = link;
  console.log(link);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-2 text-2xl">
      <p>URL: {destinationUrl}</p>
      <p>isActive: {isActive ? "true" : "false"}</p>
      <p>expiresAt: {expiresAt?.toString()}</p>
      <p>visits: {visits}</p>
    </div>
  );
}

/**
 * S1 - Find the link (f4G5h6, j7K8l9)
 * S2 - Know what to when there is no such link
 * S3 - Empty no params - redirect to main app
 * 
 * 
  // id: string;
  // userId: string;
  // slug: string;
  // destinationUrl: string;
  // clickCount: number;
  // isActive: boolean;
  // expiresAt: Date | null;
  // createdAt: Date;
  // updatedAt: Date;
 */
