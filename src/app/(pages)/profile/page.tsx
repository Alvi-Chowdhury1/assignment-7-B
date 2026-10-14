"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

interface ProfileFormProps {
  initialName: string;
  email: string;
  onNameUpdated: (name: string) => void;
}

function ProfileForm({
  initialName,
  email,
  onNameUpdated,
}: ProfileFormProps) {
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Please enter your name.");
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
          result.error.message || "Failed to update profile."
        );
        return;
      }

      setName(trimmedName);
      onNameUpdated(trimmedName);
      setMessage("Profile updated successfully!");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card border border-gray-100 bg-white shadow-sm">
      <div className="card-body p-5 sm:p-6">
        <h2 className="mb-4 text-lg font-bold text-gray-900">
          তথ্য
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label
              htmlFor="profile-name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              নাম
            </label>

            <input
              id="profile-name"
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
              htmlFor="profile-email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              ইমেইল
            </label>

            <input
              id="profile-email"
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
                Updating...
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

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [updatedName, setUpdatedName] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/sign-in");
    }
  }, [isPending, session, router]);

  async function handleSignOut() {
    try {
      const result = await authClient.signOut();

      if (result.error) {
        console.error("Failed to sign out:", result.error.message);
        return;
      }

      router.replace("/sign-in");
      router.refresh();
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  }

  if (isPending || !session) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#f0f5f0]">
        <span className="loading loading-spinner loading-lg text-success" />
      </main>
    );
  }

  const displayName =
    updatedName ?? session.user.name ?? "User";

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            আমার প্রোফাইল
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            আপনার ব্যক্তিগত তথ্য দেখুন এবং আপডেট করুন।
          </p>
        </div>

        <div className="card mb-5 border border-gray-100 bg-white shadow-sm">
          <div className="card-body p-5 sm:p-6">
            <div className="flex items-center gap-4">
              <div className="avatar placeholder">
                <div className="w-14 rounded-full bg-green-100 text-xl font-bold text-green-700">
                  <span>
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="font-bold text-gray-900">
                  {displayName}
                </h2>

                <p className="break-all text-sm text-gray-500">
                  {session.user.email}
                </p>
              </div>

              <button
                type="button"
                onClick={handleSignOut}
                className="btn btn-outline btn-error btn-sm"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>

        <ProfileForm
          key={session.user.id}
          initialName={session.user.name ?? ""}
          email={session.user.email}
          onNameUpdated={setUpdatedName}
        />
      </div>
    </main>
  );
}