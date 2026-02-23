import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { HiHome } from "react-icons/hi";
const Footer_Contact = () => {
return (
    <footer className="bg-[#333333] text-white py-8">
      <div className="flex-col  gap-10 md:flex-auto">
        {/* Logo and Name */}
        <div className="flex flex-col items-center gap-2">
          <HiHome className="text-4xl text-orange-500" />
          <h1 className="text-3xl font-bold">HANIAN</h1>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-8 mb-6 mt-5 md:mt-6">
          <a href="#" className="text-xl hover:text-gray-400">
            <FaFacebookF />
          </a>
          <a href="#" className="text-xl hover:text-gray-400">
            <FaInstagram />
          </a>
          <a href="#" className="text-xl hover:text-gray-400">
            <FaYoutube />
          </a>
          <a href="#" className="text-xl hover:text-gray-400">
            <FaTwitter />
          </a>
          <a href="tel:+1234567890" className="text-xl hover:text-gray-400">
            <FaPhone />
          </a>
          <a
            href="mailto:example@mail.com"
            className="text-xl hover:text-gray-400"
          >
            <FaEnvelope />
          </a>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-4 flex-col items-center mb-5 md:flex-row md:space-y-0 md:space-x-4 md:justify-center">
          <a href="/" className="">
            Home
          </a>
          <span className="hidden md:inline text-gray-400">•</span>
          <a href="/category" className="">
            Category
          </a>
          <span className="hidden md:inline text-gray-400">•</span>
          <a href="/about" className="">
            About Us
          </a>
          <span className="hidden md:inline text-gray-400">•</span>
          <a href="/contact" className="">
            Contact
          </a>
        </div>
        <hr className="h-1 md:hidden" />
        <div className="flex gap-2 flex-col items-center mt-3 mb-5 md:flex-row md:hidden">
          <a href="/about" className="">
            Terms & Conditions
          </a>
          <a href="/category" className="">
            Privacy Policy
          </a>
          <a href="/about" className="">
            Legals
          </a>
        </div>

        {/* Copyright */}
        <p className="flex justify-center text-sm text-gray-300">
          © 2024 Hanian. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer_Contact
