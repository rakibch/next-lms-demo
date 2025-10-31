"use client";
import { useParams } from "next/navigation";
import { courses } from "../../../data/courses";
import VideoPlayer from "../../../components/VideoPlayer";

export default function LessonPage() {
  const { id } = useParams();

  let lesson;
  courses.forEach(course => {
    const l = course.lessons.find(l => l.id.toString() === id);
    if (l) lesson = l;
  });

  if (!lesson) return <p className="p-6">Lesson not found</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>
      <VideoPlayer url={lesson.videoUrl} />
    </main>
  );
}
