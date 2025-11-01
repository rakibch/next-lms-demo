// components/CourseCard.tsx
"use client";
import Link from "next/link";

export default function CourseCard({ course }: any) {
  return (
    <div className="bg-white border rounded p-4 shadow">
      <h3 className="text-lg font-semibold">{course.title}</h3>
      <p className="text-sm text-gray-600">{course.description}</p>
      <div className="mt-3">
        <Link href={`/course/${course.id}`} className="text-blue-600">View lessons →</Link>
      </div>
    </div>
  );
}
