'use client';

import { useEffect } from 'react';
import HeroSection from "./herosection/page";
import WhyChooseUs from "./why_choose_us/page";
import FeaturedCourses from "./courses/page";
import Testimonials from "./testimonials/page";
import Chef from "./dchefs/page";
import Gallery from "./components/Gallery/Gallery";
import ContactPage from './contact/page';

export default function Home() {
  useEffect(() => {
    const pingBackend = async () => {
      try {
        const res = await fetch('https://culinary-backend.fly.dev/', {
          cache: 'no-store'
        });
        const text = await res.text();
        console.log('✅ Backend response:', text);
      } catch (err) {
        console.error('❌ Backend connection error:', err);
      }
    };

    pingBackend();
  }, []);

  return (
    <div>
      <HeroSection />
      <WhyChooseUs />
      <FeaturedCourses />
      {/* <Chef /> */}
      <Gallery limit={6} />
      <Testimonials />
      <ContactPage />
    </div>
  );
}
