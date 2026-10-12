import type { Metadata } from "next";
import { PillarPage } from "@/components/pages/PillarPage";
import { pillarMetadata } from "@/lib/seo";

export const metadata: Metadata = pillarMetadata("en-US", "entity");

export default function W8BenECompanyPage() {
  return <PillarPage locale="en-US" kind="entity" />;
}
