// app/course/[id]/page.tsx
"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import LessonList from "../../../components/LessonList";
import { useSession } from "next-auth/react";

type Lesson = { id: number; title: string; videoUrl: string };
type Course = { id: number; title: string; description?: string; lessons: Lesson[] };

export default function CoursePage() {
  const { id } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [completedCount, setCompletedCount] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    fetch("/api/courses")
      .then((r) => r.json())
      .then((courses: Course[]) => {
        const found = courses.find((c) => c.id.toString() === id);
        setCourse(found || null);
      });
  }, [id]);

  useEffect(() => {
    if (!session) return;
    const userId = (session as any).user.id;
    fetch(`/api/progress?userId=${encodeURIComponent(userId)}`)
      .then((r) => r.json())
      .then((p) => {
        const completed = p?.completedLessons || [];
        const matches = (course?.lessons || []).filter((l) => completed.includes(l.id)).length;
        setCompletedCount(matches);
      });
  }, [session, course]);

  if (!course) return <p>Course not found</p>;
  const total = course.lessons.length;
  const percent = total ? Math.round((completedCount / total) * 100) : 0;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
      <p className="mb-4">{course.description}</p>
      <div className="mb-4">
        <div className="text-sm text-gray-600">Progress: {percent}%</div>
        <div className="w-full bg-gray-200 h-3 rounded">
          <div className="h-3 rounded bg-green-500" style={{ width: `${percent}%` }} />
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-2">Lessons</h2>
      <LessonList lessons={course.lessons} />
    </div>
  );
}
