import LinkNotActive from "@/components/link-not-active";
import db from "@/db";
import { urlTable } from "@/db/schemas";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import MainPageSection from "@/components/main-page-section";
import getMetadata from "@/lib/getMetaData";

export default async function Home({
  params,
}: {
  params: Promise<{ shortCode: string }>;
}) {
  const { shortCode } = await params;
  const trimmedShortCode = shortCode.trim();

  const [link] = await db
    .select({
      id: urlTable.id,
      destinationUrl: urlTable.destinationUrl,
      isActive: urlTable.isActive,
      expiresAt: urlTable.expiresAt,
      count: urlTable.clickCount,
    })
    .from(urlTable)
    .where(eq(urlTable.slug, trimmedShortCode))
    .limit(1);

  if (!link) return notFound();

  const isExpired = link.expiresAt && new Date(link.expiresAt) < new Date();

  if (!link.isActive || isExpired) {
    return LinkNotActive();
  }

  // only count valid visits
  // await db
  //   .update(urlTable)
  //   .set({
  //     clickCount: sql`${urlTable.clickCount} + 1`,
  //   })
  //   .where(eq(urlTable.id, link.id));

  const metadata = await getMetadata(link.destinationUrl);

  console.log(link.count);

  return (
    <>
      <Header />
      <MainPageSection
        metadata={metadata}
        destinationUrl={link.destinationUrl}
      />
      <Footer />
    </>
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
