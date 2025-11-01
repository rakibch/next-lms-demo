// app/page.tsx
"use client";
import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";

type Lesson = { id: number; title: string; videoUrl: string };
type Course = { id: number; title: string; description?: string; lessons: Lesson[] };

export default function HomePage() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetch("/api/courses")
      .then((r) => r.json())
      .then(setCourses)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Courses</h1>
      <div className="space-y-4">
        {courses.map((c) => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>
    </div>
  );
}
