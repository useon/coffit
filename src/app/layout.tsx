import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coffit",
  description: "Low-cost franchise cafe map service",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
