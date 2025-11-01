// app/api/quiz/route.ts
import { NextResponse } from "next/server";
import { quizzes } from "@/data/quizzes";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lessonId = Number(searchParams.get("lessonId"));
  const quiz = quizzes.find((q) => q.lessonId === lessonId);
  if (!quiz) return NextResponse.json({ questions: [] });
  return NextResponse.json(quiz);
}

export async function POST(req: Request) {
  const { lessonId, answers } = await req.json();
  const quiz = quizzes.find((q) => q.lessonId === lessonId);

  if (!quiz) return NextResponse.json({ error: "Quiz not found" }, { status: 404 });

  let score = 0;
  quiz.questions.forEach((q, i) => {
    if (answers[i] === q.answer) score++;
  });

  return NextResponse.json({
    total: quiz.questions.length,
    correct: score,
    percentage: Math.round((score / quiz.questions.length) * 100)
  });
}
