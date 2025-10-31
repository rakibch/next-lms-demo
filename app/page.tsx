import CourseCard from "../components/CourseCard";
import { courses } from "../data/courses";

export default function HomePage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Courses</h1>
      {courses.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </main>
  );
}
