"use client";
import { useState } from "react";

export default function ZoomPage() {
  const [topic, setTopic] = useState("");
  const [startTime, setStartTime] = useState("");
  const [meetingUrl, setMeetingUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreate(e: any) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/zoom", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, startTime }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setMeetingUrl(data.meeting.join_url);
    } else {
      alert(data.error || "Failed to create meeting");
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">📅 Schedule Live Zoom Class</h1>
      <form onSubmit={handleCreate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Topic</label>
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. React State Management"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Start Time</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Create Meeting"}
        </button>
      </form>

      {meetingUrl && (
        <div className="mt-6">
          <p className="font-semibold">✅ Meeting created successfully!</p>
          <a
            href={meetingUrl}
            target="_blank"
            className="text-blue-500 underline"
          >
            Join Zoom Meeting
          </a>
        </div>
      )}
    </div>
  );
}
