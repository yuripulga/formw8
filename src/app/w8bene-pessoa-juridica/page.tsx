import type { Metadata } from "next";
import { PillarPage } from "@/components/pages/PillarPage";
import { pillarMetadata } from "@/lib/seo";

export const metadata: Metadata = pillarMetadata("pt-BR", "entity");

export default function W8BenEPessoaJuridicaPage() {
  return <PillarPage locale="pt-BR" kind="entity" />;
}
