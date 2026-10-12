import type { Metadata } from "next";
import { PillarPage } from "@/components/pages/PillarPage";
import { pillarMetadata } from "@/lib/seo";

export const metadata: Metadata = pillarMetadata("en-US", "individual");

export default function W8BenIndividualPage() {
  return <PillarPage locale="en-US" kind="individual" />;
}
