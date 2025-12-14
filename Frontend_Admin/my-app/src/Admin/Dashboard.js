import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [adminUser, setAdminUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');
    
    if (!token || !user) {
      navigate('/admin/signin');
      return;
    }

    setAdminUser(JSON.parse(user));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/signin');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Simple Header */}
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">AstraPharma Admin</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, {adminUser?.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Simple Navigation */}
        <div className="bg-white rounded border">
          <div className="p-6">
            <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/admin/products')}
                className="w-full text-left p-3 border rounded hover:bg-gray-50"
              >
                <div className="font-medium">Manage Products</div>
                <div className="text-sm text-gray-600">Add, edit, or delete products</div>
              </button>
              
              <button
                onClick={() => navigate('/admin/orders')}
                className="w-full text-left p-3 border rounded hover:bg-gray-50"
              >
                <div className="font-medium">View Orders</div>
                <div className="text-sm text-gray-600">Monitor customer orders</div>
              </button>

              <button
                onClick={() => navigate('/admin/contacts')}
                className="w-full text-left p-3 border rounded hover:bg-gray-50"
              >
                <div className="font-medium">Contact Management</div>
                <div className="text-sm text-gray-600">View and manage customer inquiries</div>
              </button>

              <button
                onClick={() => navigate('/admin/customers')}
                className="w-full text-left p-3 border rounded hover:bg-gray-50"
              >
                <div className="font-medium">Customer Management</div>
                <div className="text-sm text-gray-600">View and manage customer accounts</div>
              </button>

              <button
                onClick={() => navigate('/admin/home')}
                className="w-full text-left p-3 border rounded hover:bg-gray-50"
              >
                <div className="font-medium">Edit Home Page</div>
                <div className="text-sm text-gray-600">Customize hero, categories, and more</div>
              </button>

              <button
                onClick={() => navigate('/admin/profile')}
                className="w-full text-left p-3 border rounded hover:bg-gray-50"
              >
                <div className="font-medium">Profile Settings</div>
                <div className="text-sm text-gray-600">Update your account information</div>
              </button>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard; 