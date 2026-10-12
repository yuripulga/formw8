import type { Metadata } from "next";
import { PillarPage } from "@/components/pages/PillarPage";
import { pillarMetadata } from "@/lib/seo";

export const metadata: Metadata = pillarMetadata("pt-BR", "individual");

export default function W8BenPessoaFisicaPage() {
  return <PillarPage locale="pt-BR" kind="individual" />;
}
