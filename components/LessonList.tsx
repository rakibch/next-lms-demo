// components/LessonList.tsx
"use client";
import Link from "next/link";

export default function LessonList({ lessons }: any) {
  return (
    <ul className="list-disc ml-5">
      {lessons.map((lesson: any) => (
        <li key={lesson.id} className="mb-1">
          <Link href={`/lesson/${lesson.id}`} className="text-blue-600">{lesson.title}</Link>
        </li>
      ))}
    </ul>
  );
}
