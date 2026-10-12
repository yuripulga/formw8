import { OG_SIZE, ogAlt, renderOgImage } from "@/lib/og-image";

export const dynamic = "force-static";
export const alt = ogAlt("pt-BR");
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("pt-BR");
}
