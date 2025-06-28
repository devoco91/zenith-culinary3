'use client';
import React, { useEffect, useState } from 'react';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseDescription, setNewCourseDescription] = useState('');
  const [newCoursePrice, setNewCoursePrice] = useState('');
  const [newCourseImage, setNewCourseImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [editingCourseId, setEditingCourseId] = useState(null);

  const fetchCourses = async () => {
    try {
      const res = await fetch('https://culinary-backend.fly.dev/api/courses', {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        }
      });
      const data = await res.json();
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

  const resetForm = () => {
    setNewCourseTitle('');
    setNewCourseDescription('');
    setNewCoursePrice('');
    setNewCourseImage('');
    setEditingCourseId(null);
  };

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
      const res = await fetch('https://culinary-backend.fly.dev/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache',
        },
        body: JSON.stringify(newCourse),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to add course');
      }

      const savedCourse = await res.json();
      console.log('Added course:', savedCourse);
      
      // Refetch all courses to ensure consistency
      await fetchCourses();
      resetForm();
      alert('Course added successfully!');
      
    } catch (error) {
      console.error('Error adding course:', error);
      alert(error.message);
    }
  };

  const handleEditClick = (course) => {
    setEditingCourseId(course._id);
    setNewCourseTitle(course.title);
    setNewCourseDescription(course.description);
    setNewCoursePrice(course.price);
    setNewCourseImage(course.image);
  };

  const handleUpdateCourse = async () => {
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`https://culinary-backend.fly.dev/api/courses/${editingCourseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
        body: JSON.stringify({
          title: newCourseTitle.trim(),
          description: newCourseDescription.trim(),
          image: newCourseImage.trim(),
          price: Number(newCoursePrice), 
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update course');
      }

      const updated = await res.json();
      console.log('Updated course data:', updated);
      
      // Refetch all courses instead of just updating local state
      // This ensures we get the latest data from the server
      await fetchCourses();
      
      resetForm();
      alert('Course updated successfully!');
      
    } catch (error) {
      console.error('Error updating course:', error);
      alert(error.message);
    }
  };

  const deleteCourse = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this course?');
    if (!confirmDelete) return;

    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`https://culinary-backend.fly.dev/api/courses/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache',
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to delete course');
      }

      // Refetch courses after deletion
      await fetchCourses();
      alert('Course deleted successfully!');
      
    } catch (error) {
      console.error('Error deleting course:', error);
      alert(error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 px-4">
        <div className="max-w-7xl mx-auto">
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
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-lg mb-8 p-6 border-l-4 border-green-500">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Course Management</h2>
              <p className="text-gray-600 mt-1">Create and manage your culinary courses</p>
            </div>
          </div>
        </div>

        {/* Add/Edit Course Form */}
        <div className="bg-white rounded-xl shadow-lg mb-8 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <span className="bg-green-100 text-green-600 rounded-full p-2 mr-3">
              {editingCourseId ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              )}
            </span>
            {editingCourseId ? 'Edit Course' : 'Add New Course'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Course Title</label>
                <input
                  type="text"
                  placeholder="Enter course title"
                  value={newCourseTitle}
                  onChange={(e) => setNewCourseTitle(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Course Description</label>
                <textarea
                  placeholder="Enter course description (press Enter for new lines)"
                  value={newCourseDescription}
                  onChange={(e) => setNewCourseDescription(e.target.value)}
                  rows={4}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none resize-y"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Course Price (₦)</label>
                <input
                  type="text"
                  placeholder="e.g., 5000"
                  value={newCoursePrice}
                  onChange={(e) => setNewCoursePrice(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Course Image URL</label>
                <input
                  type="text"
                  placeholder="https://example.com/course-image.jpg"
                  value={newCourseImage}
                  onChange={(e) => setNewCourseImage(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none"
                />
              </div>
              
              <div className="flex gap-3 pt-2">
                {editingCourseId ? (
                  <>
                    <button
                      onClick={handleUpdateCourse}
                      disabled={!newCourseTitle.trim()}
                      className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                    >
                      Update Course
                    </button>
                    <button
                      onClick={resetForm}
                      className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={addCourse}
                    disabled={!newCourseTitle.trim()}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                  >
                    Add Course
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Courses List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <span className="bg-green-100 text-green-600 rounded-full p-2 mr-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </span>
              Available Courses
            </h3>
            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              {courses.length} {courses.length === 1 ? 'Course' : 'Courses'}
            </div>
          </div>

          {courses.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-100 rounded-full p-8 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 className="text-xl font-medium text-gray-600 mb-2">No courses yet</h4>
              <p className="text-gray-500">Create your first course to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <div
                  key={course._id ?? index}
                  className="group relative bg-white border-2 border-gray-100 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Course Image */}
                  {course.image && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNvdXJzZSBJbWFnZTwvdGV4dD48L3N2Zz4=';
                        }}
                      />
                    </div>
                  )}
                  
                  {/* Course Content */}
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors duration-200">
                      {course.title}
                    </h4>
                    
                    <div className="text-gray-600 text-sm mb-4 line-clamp-3">
                      <div
                        className="whitespace-pre-line"
                        dangerouslySetInnerHTML={{
                          __html: course.description.replace(/\n/g, '<br />'),
                        }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
                        ₦{course.price}
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditClick(course)}
                          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-110 active:scale-95"
                          title="Edit Course"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        
                        <button
                          onClick={() => deleteCourse(course._id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-110 active:scale-95"
                          title="Delete Course"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Course Badge */}
                  <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Course
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseManagement;