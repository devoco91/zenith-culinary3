'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export const dynamic = 'force-dynamic';

export default function FeaturedCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://culinary-backend.fly.dev/api/courses?_=${Date.now()}`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
        cache: 'no-store',
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log('✅ Fetched from backend:', data);
      console.log('📊 Number of courses:', data.length);
      setCourses(data);
    } catch (err) {
      console.error('❌ Failed to load courses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const refreshCourses = () => {
    console.log('🔄 Manually refreshing courses...');
    fetchCourses();
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="w-[90%] mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-3 mt-5">
              <span className="text-green-600">Featured</span>{' '}
              <span className="text-gray-800">Courses</span>
            </h2>
            <p className="text-gray-600">
              Explore our handpicked culinary courses to elevate your skills.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-green-200 h-10 w-10"></div>
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-4 bg-green-200 rounded w-3/4"></div>
                  <div className="h-4 bg-green-200 rounded w-1/2"></div>
                </div>
              </div>
              <p className="text-green-600 font-medium mt-4">Loading courses...</p>
            </div>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-md p-8 mx-auto max-w-md">
              <div className="bg-gray-100 rounded-full p-8 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 className="text-xl font-medium text-gray-600 mb-2">No courses available</h4>
              <p className="text-gray-500">Check back soon for new courses!</p>
              <button
                onClick={refreshCourses}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-500">
              Showing {courses.length} course{courses.length !== 1 ? 's' : ''}
            </div>
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
              loop={courses.length > 4}
            >
              {courses.map((course) => (
                <SwiperSlide key={`${course._id}-${course.updatedAt || Date.now()}`}>
                  <div className="bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNvdXJzZSBJbWFnZTwvdGV4dD48L3N2Zz4=';
                        }}
                      />
                    </div>
                    <div className="p-4 text-left">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1">
                        ₦{typeof course.price === 'number' ? course.price.toLocaleString() : course.price}
                      </p>
                      <p className="text-xs text-gray-400 mb-2">
                        {course.createdAt ? new Date(course.createdAt).toLocaleDateString() : 'Recently added'}
                      </p>
                      <Link
                        href={`/courses/${course._id}`}
                        className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-all duration-200 transform hover:scale-105"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </div>
    </section>
  );
}
