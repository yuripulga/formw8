import type { Metadata } from "next";
import { PlatformPage } from "@/components/pages/PlatformPage";
import { PLATFORM_SLUGS } from "@/content/platforms";
import { platformMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PLATFORM_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return platformMetadata("pt-BR", slug);
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <PlatformPage locale="pt-BR" slug={slug} />;
}
