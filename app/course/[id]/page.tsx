"use client";
import { useParams } from "next/navigation";
import { courses } from "@/data/courses";
import LessonList from "@/components/LessonList";

export default function CoursePage() {
  const { id } = useParams();
  const course = courses.find(c => c.id.toString() === id);

  if (!course) return <p className="p-6">Course not found</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">{course.title}</h1>
      <h2 className="text-xl font-semibold mb-2">Lessons</h2>
      <LessonList lessons={course.lessons} />
    </main>
  );
}
