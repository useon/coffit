import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coffit",
  description: "Low-cost franchise cafe map service",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-dvh bg-slate-100">
        <div className="mx-auto min-h-dvh w-full max-w-3xl bg-white sm:border-x sm:border-slate-200 sm:shadow-xl sm:shadow-slate-950/5">
          {children}
        </div>
      </body>
    </html>
  );
}
