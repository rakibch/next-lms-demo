// app/lesson/[id]/page.tsx
"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useSession } from "next-auth/react";

type Lesson = { id: number; title: string; videoUrl: string };

export default function LessonPage() {
  const { id } = useParams();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [completed, setCompleted] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    fetch("/api/courses")
      .then((r) => r.json())
      .then((courses: any[]) => {
        let found: Lesson | undefined;
        for (const c of courses) {
          const l = c.lessons.find((x: any) => x.id.toString() === id);
          if (l) {
            found = l;
            break;
          }
        }
        setLesson(found || null);
      });
  }, [id]);

  useEffect(() => {
    if (!session) return;
    const userId = (session as any).user.id;
    fetch(`/api/progress?userId=${encodeURIComponent(userId)}`)
      .then((r) => r.json())
      .then((p) => {
        const arr = p?.completedLessons || [];
        setCompleted(arr.includes(Number(id)));
      });
  }, [session, id]);

  async function markComplete() {
    if (!session) {
      router.push("/auth/signin");
      return;
    }
    const tokenRes = await fetch("/api/progress", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ lessonId: Number(id) })
    });
    const j = await tokenRes.json();
    if (j.success) setCompleted(true);
  }

  if (!lesson) return <p>Lesson not found</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>
      <div className="player-wrapper mb-4" style={{ position: "relative", paddingTop: "56.25%" }}>
        <ReactPlayer url={lesson.videoUrl} controls width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0 }} />
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={markComplete}
          className={`px-4 py-2 rounded ${completed ? "bg-green-500 text-white" : "bg-blue-500 text-white"}`}
          disabled={completed}
        >
          {completed ? "Completed" : "Mark as Complete"}
        </button>

        {completed && <span className="text-sm text-green-700">You've completed this lesson.</span>}
      </div>
    </div>
  );
}
