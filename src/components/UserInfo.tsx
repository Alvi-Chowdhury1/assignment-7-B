
"use client";

import { useState, type FormEvent } from "react";
import { authClient } from "@/lib/auth-client";

function UserInfoForm({
    initialName,
    email,
}: {
    initialName: string;
    email: string;
}) {
    const [name, setName] = useState(initialName);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    async function handleUpdate(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const trimmedName = name.trim();

        if (!trimmedName) {
            setError("আপনার নাম লিখুন।");
            setMessage("");
            return;
        }

        setLoading(true);
        setError("");
        setMessage("");

        try {
            const result = await authClient.updateUser({
                name: trimmedName,
            });

            if (result.error) {
                setError(
                    result.error.message || "আপডেট করা যায়নি।"
                );
                return;
            }

            setMessage("আপনার তথ্য সফলভাবে আপডেট হয়েছে!");

        } catch {
            setError("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="card border border-gray-100 bg-white shadow-sm">
            <div className="card-body p-5 sm:p-6">
                <h2 className="mb-4 text-lg font-bold text-gray-900">
                    ব্যবহারকারীর তথ্য
                </h2>

                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label
                            htmlFor="user-name"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            নাম
                        </label>

                        <input
                            id="user-name"
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            className="input input-bordered w-full bg-white text-gray-900"
                            placeholder="আপনার নাম লিখুন"
                            maxLength={100}
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="user-email"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            ইমেইল
                        </label>

                        <input
                            id="user-email"
                            type="email"
                            value={email}
                            readOnly
                            className="input input-bordered w-full bg-gray-50 text-gray-500"
                        />
                    </div>

                    {message && (
                        <div role="status" className="alert alert-success">
                            <span>{message}</span>
                        </div>
                    )}

                    {error && (
                        <div role="alert" className="alert alert-error">
                            <span>{error}</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading || !name.trim()}
                        className="btn btn-success w-full text-white"
                    >
                        {loading ? (
                            <>
                                <span className="loading loading-spinner loading-sm" />
                                আপডেট হচ্ছে...
                            </>
                        ) : (
                            "আপডেট"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default function UserInfo() {
    const { data: session, isPending } = authClient.useSession();

    if (isPending) {
        return (
            <div className="flex justify-center p-8">
                <span className="loading loading-spinner loading-lg text-success" />
            </div>
        );
    }

    if (!session) {
        return (
            <div className="alert alert-warning">
                <span>আপনার তথ্য দেখতে প্রথমে সাইন ইন করুন।</span>
            </div>
        );
    }

    return (
        <UserInfoForm
            key={session.user.id}
            initialName={session.user.name ?? ""}
            email={session.user.email}
        />
    );
}
