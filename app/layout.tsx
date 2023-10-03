import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Suspense } from "react";
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  config.autoAddCss = false;
  return (
    <html lang="en">
      <Suspense fallback={<h1 className="text-white">Loading</h1>}>
        <body className={inter.className}>{children}</body>
      </Suspense>
    </html>
  );
}
