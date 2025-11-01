// components/AuthButton.tsx
"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function AuthButton() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div>
        <Link href="/auth/signin" className="px-3 py-1 bg-blue-600 text-white rounded">Sign in</Link>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm">Hi, {(session as any).user?.name || (session as any).user?.username}</span>
      <button onClick={() => signOut()} className="px-3 py-1 bg-gray-200 rounded">Sign out</button>
    </div>
  );
}
