
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#f0f5f0] px-4 py-16">
      <div className="w-full max-w-xl rounded-3xl border border-green-100 bg-white px-6 py-12 text-center shadow-sm sm:px-12">

        {/* Brand icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-3xl">
          🛒
        </div>

        {/* Error number */}
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-green-700">
          Error 404
        </p>

        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          পৃষ্ঠাটি খুঁজে পাওয়া যায়নি!
        </h1>

        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-gray-500">
          দুঃখিত! আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি সরানো হয়েছে,
          এর ঠিকানা পরিবর্তন হয়েছে অথবা পৃষ্ঠাটি আর উপলব্ধ নেই।
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
          >
            <span className="mr-2">⌂</span>
            হোম পেজে ফিরে যান
          </Link>

          <Link
            href="/product"
            className="inline-flex items-center justify-center rounded-xl border border-green-200 bg-white px-6 py-3 font-semibold text-green-800 transition hover:bg-green-50"
          >
            পণ্য দেখুন
            <span className="ml-2">→</span>
          </Link>
        </div>

        {/* Footer message */}
        <div className="mt-10 border-t border-gray-100 pt-6">
          <p className="text-sm text-gray-400">
            বাংলা বাজার — আপনার নিত্যদিনের বাজারের বিশ্বস্ত সঙ্গী।
          </p>
        </div>
      </div>
    </main>
  );
}
