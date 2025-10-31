import Link from "next/link";

const CourseCard = ({ course }) => (
  <div className="border p-4 rounded mb-4 shadow">
    <h2 className="text-lg font-bold">{course.title}</h2>
    <Link href={`/course/${course.id}`} className="text-blue-500 mt-2 block">
      View Lessons
    </Link>
  </div>
);

export default CourseCard;
