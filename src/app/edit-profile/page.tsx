"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    const [name, setName] = useState<string | null>(null);
    const currentName = name !== null ? name : (session?.user?.name || "");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!isPending && !session) {
            router.push("/sign-in");
        }
    }, [session, isPending, router]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            await authClient.updateUser({
                name: currentName,
            });
            setMessage("Profile updated successfully!");
        } catch {
            setMessage("Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        await authClient.signOut();
        router.push("/sign-in");
    };

    if (isPending) return <div className="text-center py-12">Loading profile...</div>;
    if (!session) return null;

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border mt-8">
            <div className="flex justify-between items-center mb-8 border-b pb-4">
                <h1 className="text-2xl font-bold text-green-800">আমার প্রোফাইল</h1>
                <button onClick={handleSignOut} className="text-red-600 hover:text-red-800 font-medium">
                    Sign Out
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-10">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center text-green-700 text-5xl font-bold shadow-inner">
                        {session.user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="text-center">
                        <p className="font-semibold text-lg">{session.user.name}</p>
                        <p className="text-sm text-gray-500">{session.user.email}</p>
                    </div>
                </div>

                <form onSubmit={handleUpdate} className="flex-1 space-y-6">
                    {message && (
                        <div className={`p-4 rounded-lg text-sm font-medium ${message.includes("success") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                            {message}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">নাম পরিবর্তন করুন</label>
                        <input
                            type="text"
                            value={currentName}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition font-medium disabled:opacity-50"
                    >
                        {loading ? "Updating..." : "Update Profile"}
                    </button>
                </form>
            </div>
        </div>
    );
}