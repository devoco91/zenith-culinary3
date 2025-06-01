'use client';

import { useParams } from 'next/navigation';
import featuredCourses from '../../data/courses';

export default function CourseDetails() {
  const { id } = useParams();
  const course = featuredCourses.find(course => course.id === id);

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600 font-semibold text-xl">
        Course Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50 py-24 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl p-10">
        <img
          src={course.image}
          alt={course.title}
          className="rounded-xl w-full h-80 object-cover shadow-lg mb-10 mt-6"
        />
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          {course.title}
        </h1>

        <div className="flex flex-wrap gap-10 text-gray-700 mb-10">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-lg">Duration:</span>
            <span className="text-green-700 font-medium">{course.duration}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-semibold text-lg">Level:</span>
            <span className="text-green-700 font-medium">{course.level}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-semibold text-lg">Price:</span>
            <span className="text-green-700 font-bold text-2xl">₦{course.amount.toLocaleString()}</span>
          </div>
        </div>

        <p className="text-gray-800 text-lg leading-relaxed mb-12">
          Learn everything you need to become an expert in <strong>{course.title}</strong>. This course offers hands-on experience and practical lessons to sharpen your skills and boost your culinary expertise.
        </p>

        <a
          href="/transaction"
          className="inline-block bg-green-600 text-white font-semibold py-4 px-14 rounded-xl shadow-xl hover:bg-green-700 transition transform hover:scale-105 text-center"
        >
          Enroll Now
        </a>
      </div>
    </div>
  );
}
