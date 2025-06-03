'use client';
import React, { useEffect, useState } from 'react';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseDescription, setNewCourseDescription] = useState('');
  const [newCoursePrice, setNewCoursePrice] = useState('');
  const [newCourseImage, setNewCourseImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all courses from backend
  const fetchCourses = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/courses');
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
      price: newCoursePrice.trim(),
      image: newCourseImage.trim(),
    };

    const token = localStorage.getItem('token');

    try {
      const res = await fetch('http://localhost:5000/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newCourse),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to add course');
      }

      const savedCourse = await res.json();
      console.log('Saved new course:', savedCourse);
      setCourses((prev) => [...prev, savedCourse]);

      setNewCourseTitle('');
      setNewCourseDescription('');
      setNewCoursePrice('');
      setNewCourseImage('');
    } catch (error) {
      console.error('Error adding course:', error);
      alert(error.message);
    }
  };

  // Delete a course
  const deleteCourse = async (id) => {
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`http://localhost:5000/api/courses/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to delete course');
      }

      setCourses((prev) => prev.filter((course) => course._id !== id));
    } catch (error) {
      console.error('Error deleting course:', error);
      alert(error.message);
    }
  };

  if (isLoading) return <p>Loading courses...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Courses</h2>

      {/* Add course */}
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
          type="text"
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

      {/* Course list */}
      <div className="space-y-4">
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <div
              key={course._id ?? index}
              className="bg-white rounded shadow p-4 flex justify-between items-start"
            >
              <div>
                <h3 className="font-semibold text-lg">{course.title}</h3>
                <p className="text-sm text-gray-600">{course.description}</p>
                <p className="text-xs text-gray-500 mt-1">₦{course.price}</p>
              </div>
              <button
                onClick={() => deleteCourse(course._id)}
                className="text-red-600 hover:text-red-800"
                title="Delete Course"
              >
                ✕
              </button>
            </div>
          ))
        ) : (
          <p>No courses available.</p>
        )}
      </div>
    </div>
  );
};

export default CourseManagement;
