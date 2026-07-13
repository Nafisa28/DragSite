import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DragSite — Build Beautiful Websites",
    template: "%s | DragSite",
  },
  description:
    "The drag-and-drop website builder for creators and businesses. Pick a template, customize it, publish in minutes.",
  keywords: ["website builder", "drag and drop", "no-code", "templates"],
  openGraph: {
    title: "DragSite — Build Beautiful Websites",
    description: "Pick a template, drag, drop, publish.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
