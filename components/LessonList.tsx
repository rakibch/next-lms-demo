import Link from "next/link";

const LessonList = ({ lessons }) => (
  <ul className="list-disc ml-5">
    {lessons.map(lesson => (
      <li key={lesson.id} className="mb-1">
        <Link href={`/lesson/${lesson.id}`} className="text-blue-600">
          {lesson.title}
        </Link>
      </li>
    ))}
  </ul>
);

export default LessonList;
