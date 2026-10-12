import { OG_SIZE, ogAlt, renderOgImage } from "@/lib/og-image";

export const dynamic = "force-static";
export const alt = ogAlt("en-US");
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("en-US");
}
