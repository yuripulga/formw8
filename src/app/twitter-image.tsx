import OpenGraphImage from "./opengraph-image";

export const dynamic = "force-static";
export const alt = "FormW8 - Gerador de Formulários Fiscais W-8BEN e W-8BEN-E";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function TwitterImage() {
  return OpenGraphImage();
}
