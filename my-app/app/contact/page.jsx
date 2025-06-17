import React from 'react';
import { Mail, MapPin, Phone, ChefHat, Clock, Users } from 'lucide-react';

export default function ContactPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-slate-900 text-white py-6">
        <div className="container mx-auto px-6">
          <div className="flex items-center space-x-3">
            <ChefHat className="h-8 w-8 text-green-400" />
            <h1 className="text-2xl font-bold">Zenith Culinary</h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-800 to-slate-900 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-6 leading-tight">
            CONTACT <span className="text-green-400">US</span>
          </h2>
          <div className="w-24 h-1 bg-green-400 mx-auto mb-8"></div>
          <h3 className="text-2xl font-light mb-4 text-green-100">Get In Touch</h3>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed text-slate-300">
            From the moment you call or message us, expect to begin a journey that you will love and be good at.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-1 gap-16 max-w-4xl mx-auto">
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 hover:shadow-2xl transition-all duration-300">
              <h3 className="text-3xl font-bold text-slate-800 mb-8 flex items-center justify-center">
                <span className="w-2 h-8 bg-green-500 rounded-full mr-4"></span>
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-6 rounded-xl bg-gradient-to-r from-green-50 to-transparent hover:from-green-100 transition-colors duration-300">
                  <div className="bg-green-500 p-4 rounded-full">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2 text-lg">Email Address</h4>
                    <a href="mailto:learn@zenithculinary.com" className="text-green-600 hover:text-green-700 font-medium transition-colors text-lg">
                      learn@zenithculinary.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 rounded-xl bg-gradient-to-r from-slate-50 to-transparent hover:from-slate-100 transition-colors duration-300">
                  <div className="bg-slate-600 p-4 rounded-full">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2 text-lg">Our Location</h4>
                    <p className="text-slate-600 leading-relaxed text-lg">
                      114, Iju Road, Church Bus Stop,<br />
                      Agege-Lagos, Nigeria
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-6 flex items-center justify-center">
                <Users className="h-8 w-8 mr-3" />
                Why Choose Zenith Culinary?
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <span className="text-lg">Expert culinary instruction</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <span className="text-lg">Hands-on learning experience</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <span className="text-lg">Professional kitchen facilities</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <span className="text-lg">Career development support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-4xl font-bold mb-6">
              Ready to Start Your <span className="text-green-400">Culinary Journey?</span>
            </h3>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Join thousands of successful graduates who have transformed their passion for cooking into rewarding careers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:learn@zenithculinary.com"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Email Us Now
              </a>
              <a
                href="#"
                className="border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                View Our Courses
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-300 py-8">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <ChefHat className="h-6 w-6 text-green-400" />
            <span className="text-lg font-semibold">Zenith Culinary</span>
          </div>
          <p className="text-sm">
            © 2025 Zenith Culinary. All rights reserved. | Crafting culinary excellence since day one.
          </p>
        </div>
      </footer>
    </div>
  );
}