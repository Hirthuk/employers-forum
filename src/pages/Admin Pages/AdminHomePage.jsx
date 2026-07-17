import React, { useContext, useState, useEffect, useCallback } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import NavBar from '../../components/NavBar';
import {
  UsersIcon,
  ShieldCheckIcon,
  BellIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

const AdminHomePage = () => {
  const {
    userRoleDetails,
    adminRoleDetails,
    pendingRequestDetails,
    loading,
    approveRequest,
    rejectRequest,
  } = useContext(AdminContext);

  const [activeTab, setActiveTab] = useState('users');
  const [requestsLoading, setRequestsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    setFilteredUsers((userRoleDetails || []).filter(u =>
      u.name?.toLowerCase().includes(term) || u.email?.toLowerCase().includes(term) || u.sapid?.toString().includes(searchTerm)
    ));
    setFilteredAdmins((adminRoleDetails || []).filter(a =>
      a.name?.toLowerCase().includes(term) || a.email?.toLowerCase().includes(term) || a.sapid?.toString().includes(searchTerm)
    ));
    setFilteredRequests((pendingRequestDetails || []).filter(r =>
      r.name?.toLowerCase().includes(term) || r.email?.toLowerCase().includes(term) || r.sapid?.toString().includes(searchTerm)
    ));
  }, [searchTerm, userRoleDetails, adminRoleDetails, pendingRequestDetails]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const handleApprove = useCallback(async (request) => {
    setRequestsLoading(true);
    try {
      await approveRequest(request);
      toast.success(`${request.name} approved and added as a user`);
    } catch (err) {
      toast.error(err?.message || 'Failed to approve request');
    } finally {
      setRequestsLoading(false);
    }
  }, [approveRequest]);

  const handleReject = useCallback(async (request) => {
    setRequestsLoading(true);
    try {
      await rejectRequest(request);
      toast.info(`Request from ${request.name} rejected`);
    } catch {
      toast.error('Failed to reject request');
    } finally {
      setRequestsLoading(false);
    }
  }, [rejectRequest]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fuchsia-400 mb-4"></div>
          <p className="text-slate-400">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <NavBar />

      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">Manage users, admins and pending access requests.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-6 md:mb-8">
          <StatCard label="Total Users" value={userRoleDetails?.length || 0} Icon={UsersIcon} color="cyan" />
          <StatCard label="Administrators" value={adminRoleDetails?.length || 0} Icon={ShieldCheckIcon} color="emerald" />
          <StatCard label="Pending Requests" value={pendingRequestDetails?.length || 0} Icon={BellIcon} color="amber" />
        </div>

        {/* Search Bar */}
        <div className="glass-panel rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-slate-500" />
            </div>
            <input
              type="text"
              placeholder="Search by name, email, or SAP ID..."
              className="glass-input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="glass-panel rounded-xl mb-6 md:mb-8 overflow-x-auto">
          <div className="border-b border-white/10 min-w-max">
            <nav className="flex">
              {[
                { key: 'users', label: `Users (${userRoleDetails?.length || 0})` },
                { key: 'admins', label: `Administrators (${adminRoleDetails?.length || 0})` },
                { key: 'requests', label: `Pending Requests (${pendingRequestDetails?.length || 0})` },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-3 md:py-4 px-3 md:px-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.key
                      ? 'border-fuchsia-400 text-white'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="glass-panel rounded-xl overflow-hidden">
          {activeTab === 'users' && <UserTable users={searchTerm ? filteredUsers : userRoleDetails} searchTerm={searchTerm} />}
          {activeTab === 'admins' && <AdminTable admins={searchTerm ? filteredAdmins : adminRoleDetails} searchTerm={searchTerm} />}
          {activeTab === 'requests' && (
            <RequestTable
              requests={searchTerm ? filteredRequests : pendingRequestDetails}
              approveRequest={handleApprove}
              rejectRequest={handleReject}
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

const COLOR_STYLES = {
  cyan: 'bg-gradient-to-br from-cyan-500 to-blue-500',
  emerald: 'bg-gradient-to-br from-emerald-500 to-teal-500',
  amber: 'bg-gradient-to-br from-amber-400 to-orange-500',
};

const StatCard = (props) => {
  const { label, value, Icon, color = 'cyan' } = props;
  return (
    <div className="glass-panel rounded-xl p-4 sm:p-5 md:p-6">
      <div className="flex items-center">
        <div className={`flex-shrink-0 ${COLOR_STYLES[color]} rounded-lg p-2 md:p-3 shadow-lg`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div className="ml-4 md:ml-5">
          <p className="text-sm font-medium text-slate-400">{label}</p>
          <p className="text-lg md:text-xl lg:text-2xl font-semibold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
};

const EmptyState = ({ message }) => (
  <div className="text-center py-8">
    <ExclamationTriangleIcon className="h-12 w-12 text-slate-600 mx-auto mb-3" />
    <p className="text-slate-500">{message}</p>
  </div>
);

const TH = ({ children, className = '' }) => (
  <th scope="col" className={`px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider ${className}`}>
    {children}
  </th>
);

const UserTable = ({ users, searchTerm }) => {
  const displayUsers = users || [];
  return (
    <div className="p-4 md:p-6">
      <h2 className="text-lg font-medium text-white mb-4">
        Users ({displayUsers.length})
        {searchTerm && <span className="text-sm text-slate-500 ml-2">(filtered)</span>}
      </h2>
      {displayUsers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-white/[0.03]">
              <tr>
                <TH>Name</TH>
                <TH>Email</TH>
                <TH className="hidden sm:table-cell">SAP ID</TH>
                <TH className="hidden md:table-cell">Designation</TH>
                <TH className="hidden lg:table-cell">Project</TH>
                <TH>Appreciations</TH>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {displayUsers.map((user) => (
                <tr key={user.id} className="hover:bg-white/[0.03] transition-colors">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-white">{user.name}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-400">{user.email}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-400 hidden sm:table-cell">{user.sapid}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-400 hidden md:table-cell">{user.designation}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-400 hidden lg:table-cell">{user.project_name || 'N/A'}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-300 text-center">{user.total_appreciation || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState message={searchTerm ? 'No users match your search' : 'No user data available'} />
      )}
    </div>
  );
};

const AdminTable = ({ admins, searchTerm }) => {
  const displayAdmins = admins || [];
  return (
    <div className="p-4 md:p-6">
      <h2 className="text-lg font-medium text-white mb-4">
        Administrators ({displayAdmins.length})
        {searchTerm && <span className="text-sm text-slate-500 ml-2">(filtered)</span>}
      </h2>
      {displayAdmins.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-white/[0.03]">
              <tr>
                <TH>Name</TH>
                <TH>Email</TH>
                <TH className="hidden sm:table-cell">SAP ID</TH>
                <TH className="hidden md:table-cell">Designation</TH>
                <TH className="hidden lg:table-cell">Project</TH>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {displayAdmins.map((admin) => (
                <tr key={admin.id} className="hover:bg-white/[0.03] transition-colors">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-white">{admin.name}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-400">{admin.email}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-400 hidden sm:table-cell">{admin.sapid}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-400 hidden md:table-cell">{admin.designation}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-400 hidden lg:table-cell">{admin.project_name || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState message={searchTerm ? 'No administrators match your search' : 'No administrator data available'} />
      )}
    </div>
  );
};

const RequestTable = ({ requests, approveRequest, rejectRequest, requestsLoading, formatDate, searchTerm }) => {
  const displayRequests = requests || [];
  return (
    <div className="p-4 md:p-6">
      <h2 className="text-lg font-medium text-white mb-4">
        Pending Requests ({displayRequests.length})
        {searchTerm && <span className="text-sm text-slate-500 ml-2">(filtered)</span>}
      </h2>
      {displayRequests.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-white/[0.03]">
              <tr>
                <TH>Name</TH>
                <TH className="hidden sm:table-cell">Email</TH>
                <TH className="hidden md:table-cell">Phone</TH>
                <TH>SAP ID</TH>
                <TH className="hidden lg:table-cell">Designation</TH>
                <TH className="hidden xl:table-cell">Request Date</TH>
                <TH>Actions</TH>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {displayRequests.map((request) => (
                <tr key={request.id} className="hover:bg-white/[0.03] transition-colors">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-white">{request.name}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-400 hidden sm:table-cell">{request.email}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-400 hidden md:table-cell">{request.phone_number}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-400">{request.sapid}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-400 hidden lg:table-cell">{request.designation}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-400 hidden xl:table-cell">{formatDate(request.creationDate)}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-1 sm:space-y-0">
                      <button
                        onClick={() => approveRequest(request)}
                        disabled={requestsLoading}
                        className="px-3 py-1 bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs rounded-lg hover:bg-emerald-500/25 transition duration-200 disabled:opacity-50"
                      >
                        {requestsLoading ? 'Processing...' : 'Approve'}
                      </button>
                      <button
                        onClick={() => rejectRequest(request)}
                        disabled={requestsLoading}
                        className="px-3 py-1 bg-rose-500/15 text-rose-300 border border-rose-500/30 text-xs rounded-lg hover:bg-rose-500/25 transition duration-200 disabled:opacity-50"
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
        <EmptyState message={searchTerm ? 'No requests match your search' : 'No pending requests available'} />
      )}
    </div>
  );
};

export default AdminHomePage;
