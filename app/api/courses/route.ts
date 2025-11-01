import { NextResponse } from "next/server";
import { courses } from "@/data/courses";

export async function GET() {
  return NextResponse.json(courses);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, lessons } = body;

    if (!title || !lessons) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const newCourse = {
      id: courses.length + 1,
      title,
      description,
      lessons,
    };

    // Since we're using mock data, we just push into memory
    courses.push(newCourse);

    return NextResponse.json({ message: "Course created", course: newCourse }, { status: 201 });
  } catch (error) {
    console.error("POST /api/courses error:", error);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
