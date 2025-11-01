// app/api/progress/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const progressFile = path.join(process.cwd(), "data", "progress.json");

// Ensure file exists
if (!fs.existsSync(progressFile)) {
  fs.writeFileSync(progressFile, JSON.stringify([]));
}

export async function GET() {
  const data = JSON.parse(fs.readFileSync(progressFile, "utf8"));
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { user, lessonId } = body;

  if (!user || !lessonId) {
    return NextResponse.json({ error: "Missing user or lessonId" }, { status: 400 });
  }

  const data = JSON.parse(fs.readFileSync(progressFile, "utf8"));
  const existing = data.find((d: any) => d.user === user && d.lessonId === lessonId);

  if (!existing) {
    data.push({ user, lessonId, completedAt: new Date().toISOString() });
    fs.writeFileSync(progressFile, JSON.stringify(data, null, 2));
  }

  return NextResponse.json({ success: true });
}
