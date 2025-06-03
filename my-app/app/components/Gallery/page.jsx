'use client';
import React, { useEffect, useState } from 'react';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseDescription, setNewCourseDescription] = useState('');
  const [newCoursePrice, setNewCoursePrice] = useState('');
  const [newCourseImage, setNewCourseImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  // Fetch all courses from backend
  const fetchCourses = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/courses', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log('Fetched courses:', data);
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Add new course
  const addCourse = async () => {
    if (!newCourseTitle.trim()) return;

    const newCourse = {
      title: newCourseTitle.trim(),
      description: newCourseDescription.trim(),
      price: Number(newCoursePrice.trim()) || 0,
      image: newCourseImage.trim(),
    };

    try {
      const res = await fetch('http://localhost:5000/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newCourse),
      });

      const savedCourse = await res.json();
      console.log('Saved new course:', savedCourse);

      const courseId = savedCourse.id || savedCourse._id;
      if (!courseId) {
        console.warn('Saved course missing id:', savedCourse);
        return;
      }

      setCourses((prev) => [...prev, { ...savedCourse, id: courseId }]);

      // Clear inputs
      setNewCourseTitle('');
      setNewCourseDescription('');
      setNewCoursePrice('');
      setNewCourseImage('');
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  // Delete a course
  const deleteCourse = async (id) => {
    if (!id) {
      console.error('Cannot delete course without id');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/courses/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setCourses((prev) => prev.filter((course) => (course.id || course._id) !== id));
      } else {
        console.error('Failed to delete course with id:', id);
      }
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  if (isLoading) return <p>Loading courses...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Courses</h2>

      {/* Add course form */}
      <div className="mb-6 flex flex-col gap-2 max-w-md">
        <input
          type="text"
          placeholder="Course Title"
          className="p-2 border rounded"
          value={newCourseTitle}
          onChange={(e) => setNewCourseTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Course Description"
          className="p-2 border rounded"
          value={newCourseDescription}
          onChange={(e) => setNewCourseDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Course Price (e.g. 5000)"
          className="p-2 border rounded"
          value={newCoursePrice}
          onChange={(e) => setNewCoursePrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Course Image URL"
          className="p-2 border rounded"
          value={newCourseImage}
          onChange={(e) => setNewCourseImage(e.target.value)}
        />
        <button
          onClick={addCourse}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 self-start"
        >
          Add Course
        </button>
      </div>

      {/* Courses list */}
      <div className="space-y-4">
        {courses.length > 0 ? (
          courses.map((course) => {
            const courseId = course.id || course._id;
            if (!courseId) {
              console.warn('Course missing id:', course);
              return null;
            }

            return (
              <div
                key={courseId}
                className="bg-white rounded shadow p-4 flex justify-between items-start"
              >
                <div>
                  <h3 className="font-semibold text-lg">{course.title}</h3>
                  <p className="text-sm text-gray-600">{course.description}</p>
                  <p className="text-xs text-gray-500 mt-1">₦{course.price}</p>
                </div>
                <button
                  onClick={() => deleteCourse(courseId)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete Course"
                >
                  ✕
                </button>
              </div>
            );
          })
        ) : (
          <p>No courses available.</p>
        )}
      </div>
    </div>
  );
};

export default CourseManagement;
