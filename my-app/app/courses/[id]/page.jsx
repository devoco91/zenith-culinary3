'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`https://culinary-backend.fly.dev/api/courses/${id}`, {
          cache: 'no-store',
        });
        const data = await res.json();

        if (res.ok) {
          setCourse(data);
        } else {
          setCourse(null);
        }
      } catch (error) {
        console.error('Error fetching course:', error);
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCourse();
  }, [id]);

  if (loading) {
    return <p className="text-center py-10">Loading course...</p>;
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600 font-semibold text-xl">
        Course Not Found
      </div>
    );
  }

  // Build the URL with course info as query parameters
  const transactionURL = `/transaction?courseId=${course._id}&courseTitle=${encodeURIComponent(
    course.title
  )}&coursePrice=${course.price}&courseDuration=${course.duration || ''}&courseStartDate=${
    course.startDate || ''
  }&courseDiscount=${course.discount || 0}`;

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
            <span className="font-semibold text-lg">Level:</span>
            <span className="text-green-700 font-medium">{course.level || 'Beginner'}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-semibold text-lg">Price:</span>
            <span className="text-green-700 font-bold text-2xl">
              ₦{course.price?.toLocaleString?.() || '0'}
            </span>
          </div>
        </div>

        <div
          className="text-gray-800 text-lg leading-relaxed mb-12 text-justify whitespace-pre-line"
          dangerouslySetInnerHTML={{
            __html:
              course.description?.replace(/\n/g, '<br />') ||
              `Learn everything you need to become an expert in ${course.title}. This course offers hands-on experience and practical lessons to sharpen your skills.`,
          }}
        />

        {/* ✅ Updated Enroll button with query parameters */}
        <a
          href={transactionURL}
          className="inline-block bg-green-600 text-white font-semibold py-4 px-14 rounded-xl shadow-xl hover:bg-green-700 transition transform hover:scale-105 text-center"
        >
          Enroll Now
        </a>
      </div>
    </div>
  );
}
