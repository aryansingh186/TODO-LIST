import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Menu, X, LogOut, User, CheckSquare } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setMenuOpen(false);
    toast.info("You have been logged out. See you soon! 👋");
    setTimeout(() => navigate("/login"), 800);
  };

  const handleProfile = () => {
    setMenuOpen(false);
    navigate("/profile");
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
              <CheckSquare size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">
              TodoApp
            </h1>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-4">
            <button
              onClick={handleProfile}
              className="flex items-center gap-2 text-white hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg transition"
            >
              <User size={20} />
              <span className="font-medium">Profile</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-lg transition font-medium"
            >
              <LogOut size={20} />
              Logout
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white hover:bg-white/20 backdrop-blur-sm p-2 rounded-lg transition"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="md:hidden pb-4 space-y-2 animate-fadeIn">
            <button
              onClick={handleProfile}
              className="w-full flex items-center gap-2 text-white hover:bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg transition"
            >
              <User size={20} />
              <span className="font-medium">Profile</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-3 rounded-lg transition font-medium"
            >
              <LogOut size={20} />
              Logout
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;