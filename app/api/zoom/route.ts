import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { topic, startTime } = body;

    if (!topic || !startTime) {
      return NextResponse.json({ error: "Missing topic or start time" }, { status: 400 });
    }

    // Mock "Zoom" meeting link (normally you'd call Zoom's API here)
    const meeting = {
      id: Math.floor(Math.random() * 1000000),
      topic,
      start_time: startTime,
      join_url: `https://zoom.us/j/${Math.floor(Math.random() * 10000000000)}`,
      start_url: `https://zoom.us/s/${Math.floor(Math.random() * 10000000000)}?host=true`,
    };

    // In a real app, you'd save it to your DB here

    return NextResponse.json({ meeting });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create meeting" }, { status: 500 });
  }
}
