import React, { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import ProductManagement from "./AdminProductManagement";
import OrdersInquiries from "./AdminOrdersInquiries";
import { useLocation } from "react-router-dom";
import Analytics from "./AdminAnalytics";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case "/admin":  
        return <Analytics />;
      case "/admin/products":
        return <ProductManagement />;
      case "/admin/orders":
        return <OrdersInquiries />;        
      default:
        return <Analytics />;
    }
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col md:flex-row">
      <div className="hidden md:block w-64 flex-shrink-0 bg-gray-800 border-r border-gray-700 fixed md:relative left-0 top-0 h-screen md:h-auto">
        <AdminSidebar isOpen={true} onClose={closeSidebar} />
      </div>

      <div className="md:hidden">
        <AdminSidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full">
        <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-4 md:p-6 overflow-auto bg-gray-900">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
