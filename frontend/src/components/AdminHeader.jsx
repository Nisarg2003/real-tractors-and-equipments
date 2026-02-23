import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { LogOut, Menu, X } from "lucide-react";

const AdminHeader = ({ onMenuToggle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
        {/* Left Side - Menu Toggle & Logo */}
        <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
          <button
            onClick={onMenuToggle}
            className="md:hidden p-2 hover:bg-gray-700 rounded-lg text-gray-300 flex-shrink-0"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <div className="truncate">
            <h1 className="text-lg md:text-2xl font-bold text-white truncate">
              Admin Dashboard
            </h1>
          </div>
        </div>

        {/* Right Side - User Menu */}
        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 md:gap-2 px-2 md:px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-gray-300"
            >
              <div className="text-right hidden sm:block">
                <p className="text-xs md:text-sm font-medium text-white truncate max-w-[120px]">
                  {user?.email}
                </p>
                <p className="text-[10px] md:text-xs text-gray-400">Admin</p>
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm md:text-base flex-shrink-0">
                {user?.email?.[0]?.toUpperCase()}
              </div>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg border border-gray-600 overflow-hidden shadow-2xl">
                <div className="px-4 py-3 border-b border-gray-600 bg-gray-800/50">
                  <p className="text-xs md:text-sm text-gray-300 truncate">{user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 text-left text-red-400 hover:bg-gray-600 flex items-center gap-2 transition-colors text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
