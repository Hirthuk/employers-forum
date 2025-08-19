import React, { useContext, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { 
  UsersIcon, 
  ShieldCheckIcon,
  ChartBarIcon,
  BellIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EllipsisVerticalIcon
} from '@heroicons/react/24/outline';

const AdminHomePage = () => {
  const { userRoleDetails = [], adminRoleDetails = [], loading } = useContext(AdminContext);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Data preparation
  const users = Array.isArray(userRoleDetails) ? userRoleDetails : [];
  const admins = Array.isArray(adminRoleDetails) ? adminRoleDetails : [];

  // Filter functions
  const filterData = (data) => data.filter(item => 
    item?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item?.sapid?.toString().includes(searchTerm)
  );

  const filteredUsers = filterData(users);
  const filteredAdmins = filterData(admins);

  // Dashboard Stats
  const Dashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard 
        title="Total Users" 
        value={users.length} 
        icon={<UsersIcon className="h-6 w-6" />}
        color="blue"
      />
      <StatCard 
        title="Admin Users" 
        value={admins.length} 
        icon={<ShieldCheckIcon className="h-6 w-6" />}
        color="purple"
      />
      <StatCard 
        title="Active Today" 
        value={users.slice(0, 5).length} 
        icon={<ChartBarIcon className="h-6 w-6" />}
        color="green"
      />
      <StatCard 
        title="Pending Requests" 
        value={3} 
        icon={<BellIcon className="h-6 w-6" />}
        color="orange"
      />
    </div>
  );

  // Data Table Component
  const DataTable = ({ data, type }) => (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {type === 'users' ? 'User Management' : 'Admin Users'}
        </h3>
        <div className="flex space-x-3">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <FunnelIcon className="h-4 w-4 mr-1" />
            Filter
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <TableHeader>User</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>SAP ID</TableHeader>
                <TableHeader className="hidden md:table-cell">Designation</TableHeader>
                {type === 'users' && <TableHeader className="hidden lg:table-cell">Project</TableHeader>}
                <TableHeader>Actions</TableHeader>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item) => (
                <TableRow key={item.id} item={item} type={type} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden fixed bottom-6 right-6 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg"
      >
        {mobileMenuOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      <div className="flex">
        {/* Sidebar */}
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block w-64 bg-white border-r border-gray-200 fixed md:static h-screen z-40 overflow-y-auto`}>
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome back, Admin</p>
          </div>
          <nav className="p-4 space-y-1">
            <NavItem 
              active={activeTab === 'dashboard'}
              onClick={() => {
                setActiveTab('dashboard');
                setMobileMenuOpen(false);
              }}
              icon={<ChartBarIcon className="h-5 w-5" />}
            >
              Dashboard
            </NavItem>
            <NavItem 
              active={activeTab === 'users'}
              onClick={() => {
                setActiveTab('users');
                setMobileMenuOpen(false);
              }}
              icon={<UsersIcon className="h-5 w-5" />}
            >
              User Management
            </NavItem>
            <NavItem 
              active={activeTab === 'admins'}
              onClick={() => {
                setActiveTab('admins');
                setMobileMenuOpen(false);
              }}
              icon={<ShieldCheckIcon className="h-5 w-5" />}
            >
              Admin Users
            </NavItem>
            <NavItem 
              active={activeTab === 'requests'}
              onClick={() => {
                setActiveTab('requests');
                setMobileMenuOpen(false);
              }}
              icon={<BellIcon className="h-5 w-5" />}
            >
              User Requests
            </NavItem>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 md:ml-64 p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'users' && <DataTable data={filteredUsers} type="users" />}
            {activeTab === 'admins' && <DataTable data={filteredAdmins} type="admins" />}
            {activeTab === 'requests' && <UserRequests />}
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Components
const StatCard = ({ title, value, icon, color }) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600'
  };

  return (
    <div className={`${colors[color]} p-4 rounded-lg shadow`}>
      <div className="flex items-center">
        <div className="p-2 rounded-full bg-white shadow-sm mr-3">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};

const TableHeader = ({ children, className = '' }) => (
  <th scope="col" className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}>
    {children}
  </th>
);

const TableRow = ({ item, type }) => (
  <tr>
    <td className="px-4 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-blue-600 font-medium">
            {item.name?.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-900">{item.name}</div>
          <div className="text-xs text-gray-500 md:hidden">{item.designation}</div>
          {type === 'admins' && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mt-1">
              ADMIN
            </span>
          )}
        </div>
      </div>
    </td>
    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
      <div className="truncate max-w-xs">{item.email}</div>
    </td>
    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
      {item.sapid}
    </td>
    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
      {item.designation || '-'}
    </td>
    {type === 'users' && (
      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
        {item.project_name || '-'}
      </td>
    )}
    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
      <div className="flex space-x-2">
        <button className="text-blue-600 hover:text-blue-900">Edit</button>
        <button className="text-red-600 hover:text-red-900">
          {type === 'admins' ? 'Revoke' : 'Remove'}
        </button>
      </div>
    </td>
  </tr>
);

const NavItem = ({ active, onClick, icon, children }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center p-3 rounded-lg text-sm font-medium ${
      active ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    <span className="mr-3">{icon}</span>
    {children}
  </button>
);

const UserRequests = () => (
  <div className="bg-white rounded-lg shadow overflow-hidden">
    <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
      <h3 className="text-lg font-medium leading-6 text-gray-900">User Requests</h3>
    </div>
    <div className="divide-y divide-gray-200">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-4 hover:bg-gray-50 transition-colors">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium">User {i}</h4>
              <p className="text-sm text-gray-500">user{i}@example.com</p>
              <p className="text-xs text-gray-400 mt-1">Requested on {new Date().toLocaleDateString()}</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm hover:bg-green-200">
                Approve
              </button>
              <button className="px-3 py-1 bg-red-100 text-red-800 rounded-md text-sm hover:bg-red-200">
                Reject
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default AdminHomePage;