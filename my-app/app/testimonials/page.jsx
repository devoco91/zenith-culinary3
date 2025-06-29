'use client';
import React, { useState, useEffect } from 'react';

const testimonials = [
  {
    name: 'Amaka Johnson',
    role: 'Pastry Graduate',
    quote:
      'This culinary school changed my life! I went from knowing nothing to baking cakes professionally.',
    photo:
      'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    name: 'James Okoro',
    role: 'Chef Intern',
    quote:
      'Amazing experience and top-notch instructors. Highly recommend for anyone serious about food.',
    photo:
      'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    name: 'Chiamaka Eze',
    role: 'Student',
    quote:
      'The training was hands-on, and I loved the supportive environment!',
    photo:
      'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Daniel Musa',
    role: 'Alumni',
    quote:
      'One of the best decisions I ever made for my career.',
    photo:
      'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Kemi Adeleke',
    role: 'Graduate',
    quote:
      'Top-tier culinary education with great career support.',
    photo:
      'https://randomuser.me/api/portraits/women/72.jpg',
  },
];

const graduateSkills = [
  {
    title: 'Professional Techniques',
    description: 'Master advanced culinary techniques used in top restaurants worldwide.',
    videoThumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    videoDuration: '3:45',
    videoSrc: '/path-to-professional-techniques-video.mp4',
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },
  {
    title: 'Creative Innovation',
    description: 'Develop unique recipes and presentation styles that set you apart in the culinary world.',
    videoThumbnail: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    videoDuration: '4:20',
    videoSrc: '/path-to-creative-innovation-video.mp4',
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  },
  {
    title: 'Business Ready',
    description: 'Gain entrepreneurial skills to start your own culinary business and manage operations.',
    videoThumbnail: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    videoDuration: '5:15',
    videoSrc: '/path-to-business-ready-video.mp4',
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
      </svg>
    )
  },
  {
    title: 'International Cuisine',
    description: 'Learn authentic recipes and cooking methods from various cultures around the world.',
    videoThumbnail: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    videoDuration: '6:30',
    videoSrc: '/path-to-international-cuisine-video.mp4',
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: 'Food Safety & Hygiene',
    description: 'Master food safety protocols and hygiene standards required in professional kitchens.',
    videoThumbnail: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    videoDuration: '3:22',
    videoSrc: '/path-to-food-safety-video.mp4',
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  }
];

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentSkill, setCurrentSkill] = useState(0);
  const [playingVideos, setPlayingVideos] = useState({});

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Auto-advance graduate skills
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % graduateSkills.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handlePlayVideo = (index) => {
    setPlayingVideos(prev => ({
      ...prev,
      [index]: true
    }));
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const nextSkill = () => {
    setCurrentSkill((prev) => (prev + 1) % graduateSkills.length);
  };

  const prevSkill = () => {
    setCurrentSkill((prev) => (prev - 1 + graduateSkills.length) % graduateSkills.length);
  };

  // Get visible testimonials based on screen size
  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 4; i++) {
      visible.push(testimonials[(currentTestimonial + i) % testimonials.length]);
    }
    return visible;
  };

  // Get visible skills based on screen size
  const getVisibleSkills = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(graduateSkills[(currentSkill + i) % graduateSkills.length]);
    }
    return visible;
  };

  return (
    <>
      {/* Testimonials Section */}
      <section className="py-16 bg-gray-100">
        <div className="w-[90%] mx-auto">
          <h2 className="text-3xl font-bold mb-3">
            <span className="text-green-600">What Our</span>{' '}
            <span className="text-gray-800">Students Say</span>
          </h2>
          <p className="text-gray-600 mb-10">
            Hear directly from our graduates and current learners.
          </p>

          <div className="relative">
            {/* Navigation buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-green-50"
            >
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-green-50"
            >
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Testimonials grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-12">
              {getVisibleTestimonials().map((testimonial, index) => (
                <div
                  key={`${testimonial.name}-${index}`}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 p-6 text-center min-h-[280px] flex flex-col items-center justify-between"
                >
                  <div>
                    <img
                      src={testimonial.photo}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover mx-auto mb-4"
                    />
                    <h4 className="text-md font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-green-600 mb-4">{testimonial.role}</p>
                    <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What Our Graduates Can Do Section */}
      <section className="py-16 bg-white">
        <div className="w-[90%] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">
              <span className="text-green-600">What Our</span>{' '}
              <span className="text-gray-800">Graduates Can Do</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Watch our talented graduates showcase their culinary skills and see the amazing dishes they create with the knowledge gained from our programs.
            </p>
          </div>

          <div className="relative">
            {/* Navigation buttons */}
            <button
              onClick={prevSkill}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-green-50"
            >
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSkill}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-green-50"
            >
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Skills grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-12">
              {getVisibleSkills().map((skill, index) => {
                const globalIndex = (currentSkill + index) % graduateSkills.length;
                return (
                  <div
                    key={`${skill.title}-${index}`}
                    className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                  >
                    {/* Video Section */}
                    <div className="relative">
                      {!playingVideos[globalIndex] ? (
                        <div className="relative">
                          {/* Video thumbnail */}
                          <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900">
                            <img
                              src={skill.videoThumbnail}
                              alt={skill.title}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Play button overlay */}
                          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                            <button
                              onClick={() => handlePlayVideo(globalIndex)}
                              className="bg-green-600 hover:bg-green-700 text-white rounded-full p-4 transition-all duration-300 transform hover:scale-110 shadow-lg"
                            >
                              <svg
                                className="w-8 h-8 ml-1"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </button>
                          </div>

                          {/* Duration badge */}
                          <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                            {skill.videoDuration}
                          </div>
                        </div>
                      ) : (
                        <video
                          className="w-full aspect-video"
                          controls
                          autoPlay
                          poster={skill.videoThumbnail}
                        >
                          <source src={skill.videoSrc} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="p-6 text-center">
                      <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        {skill.icon}
                      </div>
                      <h3 className="font-semibold text-xl mb-3 text-gray-800">{skill.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{skill.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {graduateSkills.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSkill(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSkill ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}