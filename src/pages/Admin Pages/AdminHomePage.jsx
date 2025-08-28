import React, { useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import { API_CONFIG, axiosApiClient } from '../../config/config';
import { 
  UsersIcon, 
  ShieldCheckIcon,
  ChartBarIcon,
  BellIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import AuthService from '../../services/AuthService';

const AdminHomePage = () => {
  const {
    userRoleDetails,
    adminRoleDetails,
    pendingRequestDetails,
    loading,
    error,
    fetchPendingRequestDetails,
    fetchUserRoleDetails,
    fetchAdminRoleDetails
  } = useContext(AdminContext);
  
  const [activeTab, setActiveTab] = useState('users');
  const [requestsLoading, setRequestsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);

  // Filter data based on search term
  useEffect(() => {
    if (userRoleDetails && userRoleDetails.length > 0) {
      const filtered = userRoleDetails.filter(user => 
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.sapid?.toString().includes(searchTerm)
      );
      setFilteredUsers(filtered);
    }
    
    if (adminRoleDetails && adminRoleDetails.length > 0) {
      const filtered = adminRoleDetails.filter(admin => 
        admin.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.sapid?.toString().includes(searchTerm)
      );
      setFilteredAdmins(filtered);
    }
    
    if (pendingRequestDetails && pendingRequestDetails.length > 0) {
      const filtered = pendingRequestDetails.filter(request => 
        request.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.sapid?.toString().includes(searchTerm)
      );
      setFilteredRequests(filtered);
    }
  }, [searchTerm, userRoleDetails, adminRoleDetails, pendingRequestDetails]);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // ✅ Approve request → create user + remove from pending
  const approveRequest = useCallback(async (request) => {
    if (!request?.email || !request?.sapid) {
      toast.error('Invalid request selected');
      return;
    }

    setRequestsLoading(true);
    try {
      // create user
      const payload = {
        name: request.name,
        email: request.email,
        phone_number: request.phone_number ?? request.phone,
        sapid: request.sapid ?? request.sapId,
        designation: request.designation,
        project_name: request.project_name ?? request.project,
        password: request.password || "DefaultPassword123", // if backend expects this
      };
      console.log(typeof(request.sapid));
      const res = await axiosApiClient.post(
        API_CONFIG.EndPoints.POST_create_users,
        payload
      );

      // remove from pending
     await axiosApiClient.post(
    API_CONFIG.EndPoints.DELETEUSERREQUEST, 
    request.sapid ?? request.sapId, // Send raw Long value
    {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AuthService.getToken()}`
        }
    }
);

      toast.success(res?.data?.message || 'User approved successfully');

      // refresh lists
      await Promise.all([
        fetchPendingRequestDetails(),
        fetchUserRoleDetails(),
        fetchAdminRoleDetails(),
      ]);
    } catch (err) {
      console.error('Approve request failed', err);
      const msg =
        err?.response?.data?.message ??
        err?.message ??
        'Failed to approve request';
      toast.error(String(msg));
    } finally {
      setRequestsLoading(false);
    }
  }, [fetchPendingRequestDetails, fetchUserRoleDetails, fetchAdminRoleDetails]);

  // ✅ Reject request → just remove from pending
  const rejectRequest = useCallback(async (request) => {
    if (!request?.sapid) {
      toast.error('Invalid request selected');
      return;
    }
    try {
      await axiosApiClient.post(API_CONFIG.EndPoints.DELETEUSERREQUEST, {
        sapid: request.sapid ?? request.sapId,
      });
      toast.info('Request rejected successfully');
      await fetchPendingRequestDetails();
    } catch (err) {
      console.error('Reject request failed', err);
      toast.error('Failed to reject request');
    }
  }, [fetchPendingRequestDetails]);

  // ✅ Loading spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  // Check if we have any data at all
  const hasUsers = userRoleDetails && userRoleDetails.length > 0;
  const hasAdmins = adminRoleDetails && adminRoleDetails.length > 0;
  const hasRequests = pendingRequestDetails && pendingRequestDetails.length > 0;
  const hasData = hasUsers || hasAdmins || hasRequests;

  if (!hasData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="text-gray-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">No Data Available</h2>
          <p className="text-gray-600 mb-4">There's no data to display in the admin dashboard yet.</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-200"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-6 md:mb-8">
          <StatCard 
            label="Total Users" 
            value={userRoleDetails?.length || 0} 
            icon={<UsersIcon className="h-5 w-5 text-white" />}
            color="blue"
          />
          <StatCard 
            label="Administrators" 
            value={adminRoleDetails?.length || 0} 
            icon={<ShieldCheckIcon className="h-5 w-5 text-white" />}
            color="green"
          />
          <StatCard 
            label="Pending Requests" 
            value={pendingRequestDetails?.length || 0} 
            icon={<BellIcon className="h-5 w-5 text-white" />}
            color="yellow"
          />
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white shadow rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, email, or SAP ID..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <FunnelIcon className="h-4 w-4 mr-1" />
              Filter
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white shadow rounded-lg mb-6 md:mb-8 overflow-x-auto">
          <div className="border-b border-gray-200 min-w-max">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('users')}
                className={`py-3 md:py-4 px-3 md:px-4 text-sm font-medium border-b-2 ${
                  activeTab === 'users'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Users ({userRoleDetails?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab('admins')}
                className={`py-3 md:py-4 px-3 md:px-4 text-sm font-medium border-b-2 ${
                  activeTab === 'admins'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Administrators ({adminRoleDetails?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab('requests')}
                className={`py-3 md:py-4 px-3 md:px-4 text-sm font-medium border-b-2 ${
                  activeTab === 'requests'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Pending Requests ({pendingRequestDetails?.length || 0})
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {activeTab === 'users' && (
            <UserTable 
              users={searchTerm ? filteredUsers : userRoleDetails} 
              searchTerm={searchTerm}
            />
          )}

          {activeTab === 'admins' && (
            <AdminTable 
              admins={searchTerm ? filteredAdmins : adminRoleDetails} 
              searchTerm={searchTerm}
            />
          )}

          {activeTab === 'requests' && (
            <RequestTable
              requests={searchTerm ? filteredRequests : pendingRequestDetails}
              approveRequest={approveRequest}
              rejectRequest={rejectRequest}
              requestsLoading={requestsLoading}
              formatDate={formatDate}
              searchTerm={searchTerm}
            />
          )}
        </div>
      </main>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ label, value, icon, color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500'
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-4 sm:p-5 md:p-6">
        <div className="flex items-center">
          <div className={`flex-shrink-0 ${colorClasses[color]} rounded-md p-2 md:p-3`}>
            {icon}
          </div>
          <div className="ml-4 md:ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{label}</dt>
              <dd className="flex items-baseline">
                <div className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900">
                  {value}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

// User Table Component
const UserTable = ({ users, searchTerm }) => {
  const displayUsers = users || [];
  
  return (
    <div className="p-4 md:p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        Users ({displayUsers.length})
        {searchTerm && <span className="text-sm text-gray-500 ml-2">(filtered)</span>}
      </h2>
      {displayUsers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">SAP ID</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Designation</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Project</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appreciations</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">{user.sapid}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">{user.designation}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">{user.project_name || 'N/A'}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{user.total_appreciation || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8">
          <ExclamationTriangleIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">
            {searchTerm ? 'No users match your search' : 'No user data available'}
          </p>
        </div>
      )}
    </div>
  );
};

// Admin Table Component
const AdminTable = ({ admins, searchTerm }) => {
  const displayAdmins = admins || [];
  
  return (
    <div className="p-4 md:p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        Administrators ({displayAdmins.length})
        {searchTerm && <span className="text-sm text-gray-500 ml-2">(filtered)</span>}
      </h2>
      {displayAdmins.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">SAP ID</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Designation</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Project</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayAdmins.map((admin) => (
                <tr key={admin.id}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{admin.name}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{admin.email}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">{admin.sapid}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">{admin.designation}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">{admin.project_name || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8">
          <ExclamationTriangleIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">
            {searchTerm ? 'No administrators match your search' : 'No administrator data available'}
          </p>
        </div>
      )}
    </div>
  );
};

// Request Table Component
const RequestTable = ({ requests, approveRequest, rejectRequest, requestsLoading, formatDate, searchTerm }) => {
  const displayRequests = requests || [];
  
  return (
    <div className="p-4 md:p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        Pending Requests ({displayRequests.length})
        {searchTerm && <span className="text-sm text-gray-500 ml-2">(filtered)</span>}
      </h2>
      {displayRequests.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Email</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Phone</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SAP ID</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Designation</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">Request Date</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayRequests.map((request) => (
                <tr key={request.id}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.name}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">{request.email}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">{request.phone_number}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{request.sapid}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">{request.designation}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden xl:table-cell">{formatDate(request.creationDate)}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-1 sm:space-y-0">
                      <button 
                        onClick={() => approveRequest(request)} 
                        disabled={requestsLoading}
                        className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition duration-200 disabled:opacity-50"
                      >
                        {requestsLoading ? 'Processing...' : 'Approve'}
                      </button>
                      <button 
                        onClick={() => rejectRequest(request)}
                        disabled={requestsLoading}
                        className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition duration-200 disabled:opacity-50"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8">
          <ExclamationTriangleIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">
            {searchTerm ? 'No requests match your search' : 'No pending requests available'}
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminHomePage;