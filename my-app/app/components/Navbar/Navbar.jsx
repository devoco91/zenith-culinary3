'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { name: 'About', path: '/about_us' },
    { name: 'Courses', path: '/courses' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50 py-3">
      <div className="w-[90%] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 relative z-10 h-12 flex items-center">
          <Image
            src="/LASOP_png_for_culinary-removebg-preview.png"
            alt="Zenith Culinary Logo"
            width={120}
            height={40}
            priority
            className="h-12 w-auto object-contain sm:h-16 md:h-20"
          />
        </Link>

        {/* Desktop Nav Links - Centered */}
        <div className="hidden md:flex flex-1 justify-center ml-8 space-x-6 text-base font-semibold">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="relative uppercase text-gray-800 hover:text-green-600 transition before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] before:bg-red-600 hover:before:w-full before:transition-all before:duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex">
          <Link
            href="/signup"
            className="bg-green-600 text-white px-5 py-2 hover:bg-green-500 transition text-sm font-bold"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden ml-4">
          <button onClick={toggleMenu}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4 text-base font-medium uppercase">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="block text-gray-700 hover:text-red-600 transition"
              onClick={closeMenu}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/transaction"
            className="block bg-green-600 text-white px-4 py-2 text-center font-semibold"
            onClick={closeMenu}
          >
            Enroll Now
          </Link>
        </div>
      )}
    </nav>
  );
}
