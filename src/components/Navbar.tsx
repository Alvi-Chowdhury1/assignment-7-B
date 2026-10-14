"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      router.push("/sign-in");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-green-700">
            বাংলা বাজার
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-3 text-sm font-medium sm:gap-6">
          <Link
            href="/"
            className="text-gray-700 transition hover:text-green-700"
          >
            হোম
          </Link>

          <Link
            href="/category"
            className="text-gray-700 transition hover:text-green-700"
          >
            ক্যাটাগরি
          </Link>

          <Link
            href="/product"
            className="text-gray-700 transition hover:text-green-700"
          >
            পণ্যসমূহ
          </Link>

          {!isPending && session ? (
            <>
              <Link
                href="/profile"
                className="text-gray-700 transition hover:text-green-700"
              >
                প্রোফাইল
                {session.user?.name
                  ? ` (${session.user.name})`
                  : ""}
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                className="rounded-lg bg-red-50 px-3 py-2 text-red-600 transition hover:bg-red-100"
              >
                সাইন আউট
              </button>
            </>
          ) : !isPending ? (
            <>
              <Link
                href="/sign-in"
                className="text-gray-700 transition hover:text-green-700"
              >
                লগ ইন
              </Link>

              <Link
                href="/sign-up"
                className="rounded-lg bg-green-600 px-3 py-2 text-white transition hover:bg-green-700"
              >
                রেজিস্ট্রেশন
              </Link>
            </>
          ) : (
            <span className="text-gray-500">লোড হচ্ছে...</span>
          )}
        </nav>
      </div>
    </header>
  );
}