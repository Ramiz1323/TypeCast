import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "TypeCast | AI Resume Studio for Developers",
  description: "Craft ATS-optimized, high-impact engineering resumes powered by Gemini AI and the Monestra Emerald Design System.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-screen flex flex-col bg-[#030D0B] text-[#E6FBF6] selection:bg-[#06D6A0] selection:text-[#030D0B]">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
