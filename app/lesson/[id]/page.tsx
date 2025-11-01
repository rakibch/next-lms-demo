"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

type Lesson = { id: number; title: string; videoUrl: string };
type Course = { id: number; lessons: Lesson[] };
type Question = { id: number; question: string; options: string[]; answer: string };

export default function LessonPage() {
  const params = useParams();
  const lessonId = Number(params?.id);
  const { data: session } = useSession();

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [completed, setCompleted] = useState(false);
  const [quiz, setQuiz] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    fetch("/api/courses")
      .then((r) => r.json())
      .then((courses: Course[]) => {
        const found = courses.flatMap((c) => c.lessons).find((l) => l.id === lessonId);
        setLesson(found || null);
      });

    fetch(`/api/quiz?lessonId=${lessonId}`)
      .then((r) => r.json())
      .then((data) => setQuiz(data.questions || []));

    if (session?.user?.name) {
      fetch("/api/progress")
        .then((r) => r.json())
        .then((data) => {
          const done = data.find(
            (d: any) => d.user === session.user?.name && Number(d.lessonId) === lessonId
          );
          setCompleted(!!done);
        });
    }
  }, [lessonId, session]);

  async function markCompleted() {
    if (!session?.user?.name) return alert("Please log in first.");

    const res = await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: session.user.name, lessonId }),
    });

    if (res.ok) {
      alert("Lesson marked as completed!");
      setCompleted(true);
    } else {
      alert("Error marking progress.");
    }
  }

  async function submitQuiz() {
    const res = await fetch("/api/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lessonId, answers }),
    });
    const result = await res.json();
    setResult(result);
  }

  if (!lesson) return <p>Loading lesson...</p>;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>

      <div className="aspect-video mb-4">
        <iframe
          src={lesson.videoUrl}
          className="w-full h-full rounded border"
          allowFullScreen
        />
      </div>

      {completed ? (
        <p className="text-green-600 font-semibold mb-6">✅ Completed</p>
      ) : (
        <button
          onClick={markCompleted}
          className="px-4 py-2 bg-blue-600 text-white rounded mb-6"
        >
          Mark as Completed
        </button>
      )}

      {quiz.length > 0 && (
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-3">Lesson Quiz</h2>
          {quiz.map((q, i) => (
            <div key={q.id} className="mb-4">
              <p className="font-medium mb-2">
                {i + 1}. {q.question}
              </p>
              {q.options.map((opt) => (
                <label key={opt} className="block">
                  <input
                    type="radio"
                    name={`q-${i}`}
                    value={opt}
                    checked={answers[i] === opt}
                    onChange={(e) => {
                      const updated = [...answers];
                      updated[i] = e.target.value;
                      setAnswers(updated);
                    }}
                  />{" "}
                  {opt}
                </label>
              ))}
            </div>
          ))}

          <button
            onClick={submitQuiz}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Submit Quiz
          </button>

          {result && (
            <div className="mt-4 text-lg font-semibold">
              🧮 Score: {result.correct}/{result.total} ({result.percentage}%)
            </div>
          )}
        </div>
      )}
    </div>
  );
}
