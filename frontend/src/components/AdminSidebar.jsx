import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Users, Package, ShoppingCart, BarChart3, X } from "lucide-react";

const AdminSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: "/admin", label: "Dashboard", icon: BarChart3 },
    { path: "/admin/products", label: "Product Management", icon: Package },
    { path: "/admin/orders", label: "Orders & Inquiries", icon: ShoppingCart },
  ];

  return (
    <>
      {/* Mobile Overlay - Only show on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static left-0 top-0 h-screen w-64 bg-gray-800 border-r border-gray-700 transition-transform duration-200 ease-in-out z-40 md:z-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Close Button (Mobile Only) */}
        <div className="md:hidden flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-lg font-bold text-white">Menu</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded-lg text-gray-400"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="pt-8 px-4 md:pt-6">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => {
                    // Only close sidebar on mobile
                    if (window.innerWidth < 768) {
                      onClose();
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-150 ${
                    active
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700">
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-xs text-gray-400 mb-2">Version</p>
            <p className="text-sm font-semibold text-white">1.0.0</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
