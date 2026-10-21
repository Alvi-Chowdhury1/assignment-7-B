import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bazar Dor - নিত্যপ্রয়োজনীয় পণ্যের বাজার দর",
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের নির্ভরযোগ্য বাজার দর ট্র্যাকিং ওয়েবসাইট",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${notoSerifBengali.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-gray-900">
        <Navbar />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col">
          <main className="flex-1 py-6">{children}</main>
          <footer className="py-6 border-t border-gray-200 text-center text-sm text-gray-500">
            © 2026 Bazar Dor. সর্বস্বত্ব সংরক্ষিত।
          </footer>
        </div>
      </body>
    </html>
  );
}