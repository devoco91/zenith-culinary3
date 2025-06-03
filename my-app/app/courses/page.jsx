'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function FeaturedCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/courses');
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.error('Failed to load courses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <section className="py-16 bg-gray-100">
      <div className="w-[90%] mx-auto">
        <h2 className="text-3xl font-bold mb-3">
          <span className="text-green-600">Featured</span>{' '}
          <span className="text-gray-800">Courses</span>
        </h2>
        <p className="text-gray-600 mb-10">
          Explore our handpicked programming courses to elevate your skills.
        </p>

        {/* Optional: Button to refresh courses manually */}
        <button
          onClick={fetchCourses}
          className="mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Refresh Courses
        </button>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            spaceBetween={20}
            breakpoints={{
              320: { slidesPerView: 1.2 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            loop
          >
            {courses.map((course) => (
              <SwiperSlide key={course._id}>
                <div className="bg-white rounded-lg shadow hover:shadow-lg transition-transform transform hover:-translate-y-2">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <div className="p-4 text-left">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {course.topic || 'General'} | ₦{course.price}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(course.createdAt).toLocaleDateString()}
                    </p>
                    <Link
                      href={`/courses/${course._id}`}
                      className="inline-block mt-4 text-green-600 hover:underline"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
