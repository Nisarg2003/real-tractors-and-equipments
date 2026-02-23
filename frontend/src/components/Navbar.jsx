import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { LogOut } from "lucide-react";

// Navbar Component
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Inventory", href: "/products" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate("/");
  };

  const handleAdminDashboard = () => {
    navigate("/admin");
    setShowUserMenu(false);
  };

  return (
    <nav className="w-full h-20 flex items-center justify-between px-6 lg:px-12 bg-[#1c1c1c] text-white z-50">
      {/* Hamburger Icon for Mobile */}
      <button className="md:hidden z-50" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <></> : <AiOutlineMenu size={30} />}
      </button>

      {/* Logo */}
      <div className="text-xl md:text-3xl font-bold">
        <Link to="/" className="flex items-center gap-2">
          SHUBHAM <span className="text-orange-400">🚜</span> TRACTORS
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 text-lg font-medium">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className="hover:text-orange-400 transition duration-300"
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-[#1c1c1c] flex flex-col items-center justify-center transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden z-40`}
      >
        {/* Close button inside mobile menu */}
        <button
          className="absolute top-5 right-5 text-white z-50"
          onClick={() => setMenuOpen(false)}
        >
          <AiOutlineClose size={30} />
        </button>

        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="text-2xl text-white py-2 hover:text-orange-400 transition duration-300"
            onClick={() => setMenuOpen(false)}
          >
            {item.name}
          </Link>
        ))}

        {/* Mobile Auth Buttons */}
        {isAuthenticated ? (
          <div className="mt-8 w-full flex flex-col gap-4 px-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">Logged in as</p>
              <p className="text-white font-semibold">{user?.email}</p>
            </div>
            <button
              onClick={() => {
                handleAdminDashboard();
                setMenuOpen(false);
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition duration-300"
            >
              Admin Dashboard
            </button>
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="w-full border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-6 py-2 rounded-full font-medium transition duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="mt-8 border-2 border-white text-white px-6 py-2 rounded-full font-medium hover:bg-white hover:text-black transition duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
        )}
      </div>

      {/* Desktop Auth Section */}
      <div className="hidden md:flex items-center gap-4">
        {isAuthenticated ? (
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-700 transition duration-300"
            >
              <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-black font-bold text-sm">
                {user?.email?.[0]?.toUpperCase()}
              </div>
              <span className="text-sm font-medium">{user?.email}</span>
            </button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden z-50">
                <button
                  onClick={handleAdminDashboard}
                  className="w-full text-left px-4 py-3 hover:bg-gray-700 transition text-white font-medium"
                >
                  Admin Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 hover:bg-red-600/20 transition text-red-400 font-medium flex items-center gap-2 border-t border-gray-700"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="border-2 border-white text-white px-6 py-2 rounded-full font-medium hover:bg-white hover:text-black transition duration-300"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
