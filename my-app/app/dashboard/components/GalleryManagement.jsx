'use client';
import React, { useEffect, useState } from 'react';

const GalleryManagement = () => {
  const [images, setImages] = useState([]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const fetchImages = async () => {
    try {
      const res = await fetch('https://culinary-backend.fly.dev/api/gallery');
      const data = await res.json();
      setImages(data);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const addImage = async () => {
    if (!newImageUrl.trim()) return;

    try {
      const res = await fetch('https://culinary-backend.fly.dev/api/gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ url: newImageUrl }),
      });

      const data = await res.json();
      setImages([...images, data.image]);
      setNewImageUrl('');
    } catch (error) {
      console.error('Error adding image:', error);
    }
  };

 const deleteImage = async (id) => {
  const confirmDelete = window.confirm('Are you sure you want to delete this image?');
  if (!confirmDelete) return;

  try {
    const res = await fetch(`https://culinary-backend.fly.dev/api/gallery/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const text = await res.text(); 
    console.log('Raw delete response:', text);

    
    try {
      const result = JSON.parse(text);
      if (res.ok) {
        setImages(images.filter((img) => img._id !== id));
        alert('Image deleted successfully');
      } else {
        alert(`Failed to delete image: ${result.message}`);
      }
    } catch (err) {
      console.error('Not JSON:', text);
      alert('Failed to delete image. Server did not return valid JSON.');
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    alert('An error occurred while deleting the image.');
  }
};

  if (isLoading) return <p>Loading gallery...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Gallery</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Image URL"
          value={newImageUrl}
          onChange={(e) => setNewImageUrl(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <button
          onClick={addImage}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img._id} className="relative border rounded overflow-hidden">
            <img src={img.url} alt="Gallery" className="w-full h-auto" />
            <button
              onClick={() => deleteImage(img._id)}
              className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryManagement;
