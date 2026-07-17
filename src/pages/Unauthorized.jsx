import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full glass-panel p-8 rounded-2xl text-center relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-rose-600/15 rounded-full blur-3xl" />
        <div className="mx-auto w-24 h-24 bg-rose-500/10 border border-rose-500/20 rounded-full flex items-center justify-center mb-6 relative">
          <ExclamationTriangleIcon className="h-12 w-12 text-rose-400" />
        </div>

        <h1 className="text-2xl font-bold text-white mb-2 relative">Access Denied</h1>
        <p className="text-slate-400 mb-6 relative">
          You don't have permission to view this page. Please contact your administrator if you believe this is an error.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center relative">
          <button onClick={() => navigate(-1)} className="btn-secondary px-4 py-2">
            Go Back
          </button>
          <button onClick={() => navigate('/')} className="btn-primary px-4 py-2">
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
