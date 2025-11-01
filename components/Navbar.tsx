// components/Navbar.tsx
"use client";
import Link from "next/link";
import AuthButton from "./AuthButton";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const role = (session as any)?.user?.role;

  return (
    <nav className="bg-white border-b">
      <div className="max-w-4xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-bold text-lg">Mini LMS</Link>
          <Link href="/" className="text-sm text-gray-600">Courses</Link>
          {role === "admin" && <Link href="/admin" className="text-sm text-gray-600">Admin</Link>}
        </div>
        <AuthButton />
      </div>
    </nav>
  );
}
