// app/api/progress/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getToken } from "next-auth/jwt";

const DATA_PATH = path.join(process.cwd(), "data", "progress.json");
const SECRET = process.env.NEXTAUTH_SECRET || "dev-secret";

function readProgress() {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw || "{}");
}
function writeProgress(obj: any) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(obj, null, 2), "utf-8");
}

export async function GET(req: Request) {
  // expects ?userId=...
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");
  const progress = readProgress();
  return NextResponse.json(userId ? progress[userId] || {} : progress);
}

export async function POST(req: Request) {
  try {
    const token = await getToken({ req, secret: SECRET });
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { lessonId } = body;
    if (!lessonId) return NextResponse.json({ error: "lessonId required" }, { status: 400 });

    const userId = token.sub as string;
    const progress = readProgress();
    if (!progress[userId]) progress[userId] = { completedLessons: [] as number[] };
    const arr: number[] = progress[userId].completedLessons || [];
    if (!arr.includes(lessonId)) arr.push(lessonId);
    progress[userId].completedLessons = arr;
    writeProgress(progress);
    return NextResponse.json({ success: true, completedLessons: arr });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
