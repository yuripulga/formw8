import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { homeMetadata } from "@/lib/seo";

export const metadata: Metadata = homeMetadata("en-US");

export default function Page() {
  return <HomePage locale="en-US" />;
}
