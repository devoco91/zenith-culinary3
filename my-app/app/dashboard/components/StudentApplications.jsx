'use client';
import React, { useEffect, useState } from 'react';

const StudentApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/transactions');
        const data = await res.json();
        setApplications(data);
      } catch (err) {
        console.error('Error fetching applications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Student Applications</h2>
      {loading ? (
        <p className="text-gray-600">Loading applications...</p>
      ) : applications.length === 0 ? (
        <p className="text-gray-500">No applications found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200">
            <thead className="bg-green-50 text-left">
              <tr>
                <th className="p-3 border-b">Name</th>
                <th className="p-3 border-b">Email</th>
                <th className="p-3 border-b">Course</th>
                <th className="p-3 border-b">Price (₦)</th>
                <th className="p-3 border-b">Registered At</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id} className="hover:bg-gray-50">
                  <td className="p-3">{app.firstName} {app.lastName}</td>
                  <td className="p-3">{app.email}</td>
                  <td className="p-3">{app.courseTitle}</td>
                  <td className="p-3">₦{app.coursePrice?.toLocaleString() || '0'}</td>
                  <td className="p-3">{formatDate(app.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentApplications;
