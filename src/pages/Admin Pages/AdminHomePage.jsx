import React, { useContext, useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { 
  UsersIcon, 
  ShieldCheckIcon,
  ChartBarIcon,
  BellIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const AdminHomePage = () => {
  const {
    userRoleDetails,
    adminRoleDetails,
    pendingRequestDetails,
    loading,
    error,
    fetchPendingRequestDetails
  } = useContext(AdminContext);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [requestsLoading, setRequestsLoading] = useState(false);
  
  // Use ref to track if we've already fetched requests for this session
  const hasFetchedRequests = useRef(false);

  // Ensure we always have arrays
  const users = Array.isArray(userRoleDetails) ? userRoleDetails : [];
  const admins = Array.isArray(adminRoleDetails) ? adminRoleDetails : [];
  const pendingRequests = Array.isArray(pendingRequestDetails) ? pendingRequestDetails : [];

  // Fetch pending requests only once when tab is activated
  useEffect(() => {
    const fetchRequests = async () => {
      // Only fetch if we haven't already fetched requests AND the tab is active AND function exists
      if (activeTab === 'requests' && 
          typeof fetchPendingRequestDetails === 'function' &&
          !hasFetchedRequests.current) {
        
        setRequestsLoading(true);
        try {
          await fetchPendingRequestDetails();
          hasFetchedRequests.current = true; // Mark as fetched
        } catch (err) {
          console.error("Error fetching requests:", err);
        } finally {
          setRequestsLoading(false);
        }
      }
    };

    fetchRequests();
  }, [activeTab, fetchPendingRequestDetails]);

  // Reset the fetch flag when leaving the requests tab
  useEffect(() => {
    if (activeTab !== 'requests') {
      hasFetchedRequests.current = false;
    }
  }, [activeTab]);

  // Clear search when switching tabs
  useEffect(() => {
    setSearchTerm('');
  }, [activeTab]);

  // Filter function
  const filterData = useCallback((data) => {
    if (!Array.isArray(data) || data.length === 0) return [];
    const q = searchTerm.trim().toLowerCase();
    if (!q) return data;
    
    return data.filter(item => {
      if (!item) return false;
      return (
        (item.name && item.name.toLowerCase().includes(q)) ||
        (item.email && item.email.toLowerCase().includes(q)) ||
        (item.sapid && String(item.sapid).includes(q)) ||
        (item.sapId && String(item.sapId).includes(q)) ||
        (item.project_name && item.project_name.toLowerCase().includes(q)) ||
        (item.project && item.project.toLowerCase().includes(q)) ||
        (item.designation && item.designation.toLowerCase().includes(q))
      );
    });
  }, [searchTerm]);

  // Memoized filtered data
  const filteredUsers = useMemo(() => filterData(users), [users, filterData]);
  const filteredAdmins = useMemo(() => filterData(admins), [admins, filterData]);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  }, []);

  // Manual refresh function for requests
  const handleRefreshRequests = useCallback(async () => {
    if (typeof fetchPendingRequestDetails === 'function') {
      setRequestsLoading(true);
      try {
        await fetchPendingRequestDetails();
      } catch (err) {
        console.error("Error refreshing requests:", err);
      } finally {
        setRequestsLoading(false);
      }
    }
  }, [fetchPendingRequestDetails]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Data</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu toggle */}
      <button
        onClick={() => setMobileMenuOpen(prev => !prev)}
        className="md:hidden fixed bottom-6 right-6 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? '✕' : '☰'}
      </button>

      <div className="flex">
        {/* Sidebar Navigation */}
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block w-64 bg-white border-r border-gray-200 fixed md:static h-screen z-40 overflow-y-auto`}>
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome back, Admin</p>
          </div>
          <nav className="p-4 space-y-1">
            <NavItem active={activeTab === 'dashboard'} onClick={() => handleTabChange('dashboard')} icon={<ChartBarIcon className="h-5 w-5" />}>
              Dashboard
            </NavItem>
            <NavItem active={activeTab === 'users'} onClick={() => handleTabChange('users')} icon={<UsersIcon className="h-5 w-5" />}>
              User Management
            </NavItem>
            <NavItem active={activeTab === 'admins'} onClick={() => handleTabChange('admins')} icon={<ShieldCheckIcon className="h-5 w-5" />}>
              Admin Users
            </NavItem>
            <NavItem active={activeTab === 'requests'} onClick={() => handleTabChange('requests')} icon={<BellIcon className="h-5 w-5" />}>
              User Requests
            </NavItem>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 md:ml-64 p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {activeTab === 'dashboard' && 'Dashboard'}
                {activeTab === 'users' && 'User Management'}
                {activeTab === 'admins' && 'Admin Users'}
                {activeTab === 'requests' && 'User Requests'}
              </h2>
            </div>

            {/* Content */}
            {activeTab === 'dashboard' && (
              <Dashboard users={users} admins={admins} pendingCount={pendingRequests.length} loading={loading} />
            )}
            {activeTab === 'users' && (
              <DataTable
                data={filteredUsers}
                loading={loading}
                type="users"
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            )}
            {activeTab === 'admins' && (
              <DataTable
                data={filteredAdmins}
                loading={loading}
                type="admins"
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            )}
            {activeTab === 'requests' && (
              <UserRequests 
                data={pendingRequests} 
                loading={requestsLoading || loading} 
                onRefresh={handleRefreshRequests}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard = React.memo(({ users, admins, pendingCount, loading }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="Total Users" 
        value={users.length} 
        icon={<UsersIcon className="h-5 w-5" />}
        color="blue"
        loading={loading}
      />
      <StatCard 
        title="Admin Users" 
        value={admins.length} 
        icon={<ShieldCheckIcon className="h-5 w-5" />}
        color="purple"
        loading={loading}
      />
      <StatCard 
        title="Active Today" 
        value={Math.min(users.length, 8)} 
        icon={<ChartBarIcon className="h-5 w-5" />}
        color="green"
        loading={loading}
      />
      <StatCard 
        title="Pending Requests" 
        value={pendingCount} 
        icon={<BellIcon className="h-5 w-5" />}
        color="orange"
        loading={loading}
      />
    </div>
  </div>
));

// StatCard Component
const StatCard = React.memo(({ title, value, icon, color, loading }) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600'
  };

  return (
    <div className={`${colors[color]} p-4 rounded-lg border`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">{title}</p>
          {loading ? (
            <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mt-1"></div>
          ) : (
            <p className="text-2xl font-bold mt-1">{value}</p>
          )}
        </div>
        <div className="p-2 rounded-full bg-white">
          {icon}
        </div>
      </div>
    </div>
  );
});

// DataTable Component
const DataTable = React.memo(({ data = [], loading = false, type = 'users', searchTerm, setSearchTerm }) => {
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, [setSearchTerm]);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-4 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center gap-3">
        <h3 className="text-lg font-medium text-gray-900">
          {type === 'users' ? 'User Management' : 'Admin Users'}
        </h3>
        <div className="flex flex-1 gap-3">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder={`Search ${type}...`}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <FunnelIcon className="h-4 w-4 mr-1" />
            Filter
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : data.length === 0 ? (
        <div className="text-center py-12">
          <div className="flex flex-col items-center">
            <UsersIcon className="h-12 w-12 text-gray-400 mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'No results found' : `No ${type} found`}
            </h4>
            <p className="text-gray-500">
              {searchTerm ? 'Try adjusting your search terms' : 'No data available'}
            </p>
          </div>
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
              {data.map((item, idx) => (
                <TableRow key={item.id || item.sapid || idx} item={item} type={type} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
});

// Table Components
const TableHeader = React.memo(({ children, className = '' }) => (
  <th scope="col" className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}>
    {children}
  </th>
));

const TableRow = React.memo(({ item, type }) => (
  <tr className="hover:bg-gray-50">
    <td className="px-4 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-blue-600 font-medium text-sm">
            {item.name?.charAt(0)?.toUpperCase() || '?'}
          </span>
        </div>
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-900">{item.name || 'Unknown'}</div>
          <div className="text-xs text-gray-500 md:hidden">{item.designation || '-'}</div>
          {type === 'admins' && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mt-1">
              ADMIN
            </span>
          )}
        </div>
      </div>
    </td>
    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
      <div className="truncate max-w-[120px] sm:max-w-[200px]">
        {item.email || 'No email'}
      </div>
    </td>
    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
      {item.sapid || item.sapId || '-'}
    </td>
    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
      {item.designation || '-'}
    </td>
    {type === 'users' && (
      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
        {item.project_name || item.project || '-'}
      </td>
    )}
    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
      <div className="flex space-x-2">
        <button className="text-blue-600 hover:text-blue-800">
          Edit
        </button>
        <button className="text-red-600 hover:text-red-800">
          {type === 'admins' ? 'Revoke' : 'Remove'}
        </button>
      </div>
    </td>
  </tr>
));

// Navigation Item
const NavItem = React.memo(({ active, onClick, icon, children }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center p-3 rounded-lg text-sm font-medium ${
      active ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    <span className="mr-3">{icon}</span>
    {children}
  </button>
));

// User Requests Component with refresh button
const UserRequests = React.memo(({ data, loading, onRefresh }) => (
  <div className="bg-white rounded-lg shadow overflow-hidden">
    <div className="px-4 py-4 border-b border-gray-200 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-medium text-gray-900">User Requests</h3>
        <p className="text-sm text-gray-500">{data.length} pending requests</p>
      </div>
      <button
        onClick={onRefresh}
        disabled={loading}
        className="flex items-center px-3 py-2 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg 
          className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <path stroke="currentColor" strokeWidth="2" d="M17 3a9 9 0 11-5 8.5"></path>
        </svg>
        Refresh
      </button>
    </div>
    {loading ? (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    ) : data.length === 0 ? (
      <div className="p-8 text-center">
        <BellIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h4 className="text-lg font-medium text-gray-900 mb-2">No Pending Requests</h4>
        <p className="text-gray-500">All user requests have been processed</p>
      </div>
    ) : (
      <div className="divide-y divide-gray-200">
        {data.map((request, i) => (
          <div key={request.id || i} className="p-4 hover:bg-gray-50 transition-colors duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{request.name || `User ${i + 1}`}</h4>
                <p className="text-sm text-gray-500">{request.email || `user${i + 1}@example.com`}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    SAP ID: {request.sapid || request.sapId || 'N/A'}
                  </span>
                  {request.designation && (
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {request.designation}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-green-100 text-green-800 rounded-md text-sm hover:bg-green-200 transition-colors">
                  Approve
                </button>
                <button className="px-4 py-2 bg-red-100 text-red-800 rounded-md text-sm hover:bg-red-200 transition-colors">
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
));

export default AdminHomePage;