import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { homeMetadata } from "@/lib/seo";

export const metadata: Metadata = homeMetadata("pt-BR");

export default function Page() {
  return <HomePage locale="pt-BR" />;
}
