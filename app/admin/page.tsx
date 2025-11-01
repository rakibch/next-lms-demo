// app/admin/page.tsx
"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lessonsText, setLessonsText] = useState(""); // JSON array of lessons

  if (!session || (session as any).user.role !== "admin") {
    return <p className="text-red-600">Access denied. Admins only.</p>;
  }

  async function handleCreate(e: any) {
    e.preventDefault();
    let lessons = [];
    try {
      lessons = JSON.parse(lessonsText || "[]");
      // ensure lesson ids are numbers
      lessons = lessons.map((l: any) => ({ id: Number(l.id), title: l.title, videoUrl: l.videoUrl }));
    } catch {
      alert("Lessons should be a valid JSON array of { id, title, videoUrl }");
      return;
    }

    const res = await fetch("/api/courses", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title, description, lessons })
    });
    if (res.ok) {
      alert("Course created");
      router.refresh();
      setTitle("");
      setDescription("");
      setLessonsText("");
    } else {
      alert("Failed to create");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin - Create Course</h1>
      <form onSubmit={handleCreate} className="space-y-3 max-w-xl">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Lessons (JSON array)</label>
          <textarea
            value={lessonsText}
            onChange={(e) => setLessonsText(e.target.value)}
            placeholder='Example: [{"id":301,"title":"New Lesson","videoUrl":"https://..."}]'
            className="w-full p-2 border rounded h-28"
          />
        </div>

        <button className="px-4 py-2 bg-blue-600 text-white rounded" type="submit">Create Course</button>
      </form>
    </div>
  );
}
