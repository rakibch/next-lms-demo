// app/auth/signin/page.tsx
"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSubmit(e: any) {
    e.preventDefault();
    const res = await signIn("credentials", { redirect: false, username, password });
    if (res?.ok) router.push("/");
    else alert("Invalid credentials");
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Sign in</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-2 border rounded" />
        <input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" />
        <button className="px-4 py-2 bg-blue-600 text-white rounded" type="submit">Sign in</button>
      </form>
      <div className="mt-4 text-sm text-gray-600">
        Demo accounts: <br />
        admin / adminpass (admin) <br />
        student / studentpass (learner)
      </div>
    </div>
  );
}
