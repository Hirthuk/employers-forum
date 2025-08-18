import React, { useContext, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { 
  UsersIcon, 
  UserPlusIcon, 
  UserMinusIcon, 
  ShieldCheckIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const AdminHomePage = () => {
  const { userRoleDetails, adminRoleDetails, loading } = useContext(AdminContext);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter users based on search term
  const filteredUsers = userRoleDetails?.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.sapid.toString().includes(searchTerm)
  );

  const filteredAdmins = adminRoleDetails?.filter(admin => 
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.sapid.toString().includes(searchTerm)
  );

  // Dashboard Component
  const Dashboard = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium text-blue-800">Total Users</h3>
          <p className="text-2xl font-bold">{userRoleDetails?.length || 0}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-medium text-green-800">Admin Users</h3>
          <p className="text-2xl font-bold">{adminRoleDetails?.length || 0}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-medium text-purple-800">Recent Signups</h3>
          <p className="text-2xl font-bold">
            {userRoleDetails?.slice(0, 3).map(user => user.name).join(', ')}
          </p>
        </div>
      </div>
    </div>
  );

  // User List Component
  const UserList = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">User Management</h2>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search users..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {loading ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SAP ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers?.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-medium">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.sapid}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.designation}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.project_name || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <ArrowPathIcon className="h-8 w-8 text-gray-400 animate-spin" />
        </div>
      )}
    </div>
  );

  // Admin Users Component
  const AdminUsers = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Admin Users</h2>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search admins..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {loading ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SAP ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAdmins?.map((admin) => (
                <tr key={admin.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="text-purple-600 font-medium">
                          {admin.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                        <div className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full inline-block mt-1">
                          ADMIN
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.sapid}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.designation || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Revoke</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <ArrowPathIcon className="h-8 w-8 text-gray-400 animate-spin" />
        </div>
      )}
    </div>
  );

  // Render content based on active tab
  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'users': return <UserList />;
      case 'admins': return <AdminUsers />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          <p className="text-sm text-gray-500">Welcome back, Admin</p>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center w-full p-3 rounded-lg ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
              >
                <ChartBarIcon className="w-5 h-5 mr-3" />
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('users')}
                className={`flex items-center w-full p-3 rounded-lg ${activeTab === 'users' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
              >
                <UsersIcon className="w-5 h-5 mr-3" />
                User List
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('admins')}
                className={`flex items-center w-full p-3 rounded-lg ${activeTab === 'admins' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
              >
                <ShieldCheckIcon className="w-5 h-5 mr-3" />
                Admin Users
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;