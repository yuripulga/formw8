import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design System — FormW8",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
