
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductDetails } from "@/lib/api";

type ProductDetailsPageProps = {
    params: Promise<{ id: string }>;
};

export default async function ProductDetailsPage({
    params,
}: ProductDetailsPageProps) {
    const { id } = await params;

    let product;

    try {
        product = await getProductDetails(id);
    } catch (error) {
        console.error("Failed to load product details:", error);
        notFound();
    }

    const name = product.nameBn || product.name || "পণ্যের নাম";
    const price = Number(product.today ?? product.price ?? 0);
    const previousPrice = Number(
        product.yesterday ?? product.previousPrice ?? 0
    );
    const unit = product.unit || "কেজি";

    const priceChange = price - previousPrice;

    return (
        <main className="min-h-screen bg-[#f0f5f0] px-4 py-10">
            <div className="mx-auto max-w-4xl">
                <Link
                    href="/product"
                    className="mb-6 inline-block font-medium text-green-700 hover:underline"
                >
                    ← সকল পণ্যে ফিরে যান
                </Link>

                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="bg-green-700 px-6 py-8 text-white sm:px-10">
                        <p className="mb-2 text-sm text-green-100">
                            পণ্যের বিস্তারিত
                        </p>

                        <h1 className="text-3xl font-bold">
                            {name}
                        </h1>

                        <p className="mt-2 text-sm text-green-100">
                            প্রতি {unit} এর বাজার দর
                        </p>
                    </div>

                    <div className="space-y-6 p-6 sm:p-10">
                        <div className="rounded-xl bg-green-50 p-6">
                            <p className="text-sm text-gray-600">
                                আজকের বাজার দর
                            </p>

                            <p className="mt-2 text-4xl font-bold text-green-700">
                                ৳{price.toLocaleString("en-BD")}
                                <span className="ml-2 text-base font-normal text-gray-600">
                                    / {unit}
                                </span>
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-xl border border-gray-200 p-5">
                                <p className="text-sm text-gray-500">
                                    গতকালের বাজার দর
                                </p>

                                <p className="mt-2 text-2xl font-semibold text-gray-800">
                                    ৳{previousPrice.toLocaleString("en-BD")}
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-200 p-5">
                                <p className="text-sm text-gray-500">
                                    দামের পরিবর্তন
                                </p>

                                <p
                                    className={`mt-2 text-2xl font-semibold ${priceChange > 0
                                            ? "text-red-600"
                                            : priceChange < 0
                                                ? "text-green-700"
                                                : "text-gray-700"
                                        }`}
                                >
                                    {priceChange > 0
                                        ? "↑ "
                                        : priceChange < 0
                                            ? "↓ "
                                            : ""}
                                    ৳{Math.abs(priceChange).toLocaleString("en-BD")}
                                </p>

                                <p className="mt-1 text-sm text-gray-500">
                                    {priceChange > 0
                                        ? "দাম বেড়েছে"
                                        : priceChange < 0
                                            ? "দাম কমেছে"
                                            : "দাম অপরিবর্তিত"}
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="mb-3 text-xl font-bold text-gray-800">
                                পণ্যের বিবরণ
                            </h2>

                            <p className="leading-7 text-gray-600">
                                {product.description ||
                                    `${name} এর বর্তমান বাজার দর প্রতি ${unit} ৳${price}`}
                            </p>
                        </div>

                        <Link
                            href="/category"
                            className="inline-flex rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
                        >
                            ক্যাটাগরি দেখুন
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
