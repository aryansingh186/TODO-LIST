import React from "react";
import { Mail, Phone, Github, Twitter, Linkedin, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* About Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-white text-xl font-bold">TodoApp</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              A modern, intuitive todo application designed to help you organize your tasks, 
              boost productivity, and achieve your goals. Simple, powerful, and built for everyone.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              <a href="#" className="bg-gray-800 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 p-2 rounded-lg transition-all duration-300">
                <Github size={20} />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 p-2 rounded-lg transition-all duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 p-2 rounded-lg transition-all duration-300">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/" className="hover:text-white hover:pl-2 transition-all duration-200 inline-block">
                  → Home
                </a>
              </li>
              <li>
                <a href="/profile" className="hover:text-white hover:pl-2 transition-all duration-200 inline-block">
                  → Profile
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white hover:pl-2 transition-all duration-200 inline-block">
                  → Features
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white hover:pl-2 transition-all duration-200 inline-block">
                  → About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Get in Touch</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-indigo-400" />
                <a href="mailto:info@todoapp.com" className="hover:text-white transition">
                  aryansingh000@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-indigo-400" />
                <a href="tel:+1234567890" className="hover:text-white transition">
                  +91 (7050) xxx-xxx
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-xs text-gray-400 mb-2">Subscribe to updates</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-indigo-500 transition"
                />
                <button className="bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} TodoApp. All rights reserved.
            </p>
            <p className="text-sm text-gray-400 flex items-center gap-1">
              Made with <Heart size={14} className="text-red-500 fill-red-500" /> by TodoApp Team
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#privacy" className="text-gray-400 hover:text-white transition">
                Privacy Policy
              </a>
              <a href="#terms" className="text-gray-400 hover:text-white transition">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;