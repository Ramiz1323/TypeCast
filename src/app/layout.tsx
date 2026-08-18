import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "TypeCast — Production AI Resume Engineering Platform",
  description: "Craft ATS-optimized, high-impact engineering resumes powered by Gemini 3.6 AI Engine and precision design systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased dark ${plusJakartaSans.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#030C0A] text-[#E6FBF6] font-sans selection:bg-[#06D6A0] selection:text-[#030C0A]">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
