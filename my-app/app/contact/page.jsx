'use client';

import { useState } from 'react';
import { Mail, MapPin, Star, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
      
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        setIsSubmitted(false);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-200/30 to-green-200/30 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-green-200/30 to-red-200/30 rounded-full translate-y-40 -translate-x-40 blur-3xl"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-16 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block w-20 h-1 bg-gradient-to-r from-green-700 to-red-600 rounded-full mb-6"></div>
          <h1 className="text-5xl md:text-6xl font-bold text-green-800 mb-4 tracking-tight">
            Get In Touch
          </h1>
          <p className="text-xl text-green-600 italic font-medium">
            Let's create culinary magic together
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-green-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-700 via-green-500 to-red-600"></div>
              
              {/* Email Contact */}
              <div className="group mb-8 p-6 rounded-2xl transition-all duration-300 hover:bg-green-50/50 hover:translate-x-2">
                <div className="flex items-start space-x-5">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-700 to-green-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <Mail className="w-7 h-7 text-white" />
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-transparent rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-green-800 mb-2">Email Us</h3>
                    <a 
                      href="mailto:learn@zenithculinary.com"
                      className="text-lg font-medium text-green-700 hover:text-red-600 transition-colors duration-300 block mb-2"
                    >
                      learn@zenithculinary.com
                    </a>
                    <p className="text-green-600 leading-relaxed">
                      We'd love to hear from you and discuss your culinary journey
                    </p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="group mb-8 p-6 rounded-2xl transition-all duration-300 hover:bg-green-50/50 hover:translate-x-2">
                <div className="flex items-start space-x-5">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-700 to-green-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <MapPin className="w-7 h-7 text-white" />
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-transparent rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-green-800 mb-2">Visit Our Location</h3>
                    <div className="text-lg text-green-700 mb-2 leading-relaxed">
                      <p>No 114, Iju Road</p>
                      <p>Church Bus-Stop</p>
                      <p>Agege-Lagos, Nigeria</p>
                    </div>
                    <p className="text-green-600 leading-relaxed">
                      Come experience the art of culinary excellence
                    </p>
                  </div>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="group p-6 rounded-2xl transition-all duration-300 hover:bg-green-50/50 hover:translate-x-2">
                <div className="flex items-start space-x-5">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-700 to-green-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <Star className="w-7 h-7 text-white" />
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-transparent rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-green-800 mb-2">Why Choose Zenith Culinary?</h3>
                    <p className="text-green-600 leading-relaxed">
                      Expert culinary training, hands-on experience, and passionate instruction to elevate your cooking skills to new heights
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-green-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-green-500 to-green-700"></div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-green-800 font-semibold mb-2 text-lg">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-4 border-2 border-green-100 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 text-green-800 bg-green-50/50 placeholder-green-400"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-green-800 font-semibold mb-2 text-lg">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-4 border-2 border-green-100 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 text-green-800 bg-green-50/50 placeholder-green-400"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-green-800 font-semibold mb-2 text-lg">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 border-2 border-green-100 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 text-green-800 bg-green-50/50 placeholder-green-400"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-green-800 font-semibold mb-2 text-lg">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-5 py-4 border-2 border-green-100 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 text-green-800 bg-green-50/50 placeholder-green-400"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-green-800 font-semibold mb-2 text-lg">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-5 py-4 border-2 border-green-100 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 text-green-800 bg-green-50/50 placeholder-green-400 resize-vertical"
                  placeholder="Tell us about your culinary interests and how we can help you..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="w-full bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 text-lg relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Send className={`w-5 h-5 transition-transform duration-300 ${isSubmitting ? 'animate-pulse' : 'group-hover:translate-x-1'}`} />
                <span>
                  {isSubmitting ? 'Sending...' : isSubmitted ? 'Message Sent!' : 'Send Message'}
                </span>
              </button>
            </form>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 text-center">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-green-100 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Ready to Start Your Culinary Journey?</h2>
            <p className="text-green-600 text-lg leading-relaxed">
              Join Zenith Culinary and transform your passion for cooking into professional expertise. 
              Our experienced chefs and state-of-the-art facilities are waiting to help you discover 
              your culinary potential.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}