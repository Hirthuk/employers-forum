import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import { toast } from 'react-toastify';

const Appreciate = () => {
  const [sapid, setSapId] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState({
    sapid: false,
    message: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSapId('');
      setMessage('');
      setLoading(false);
      toast.success('🎉 Appreciation sent successfully!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }, 1200);
  };

  const handleFocus = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: false }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100">
      <NavBar />
      
      <div className="max-w-md mx-auto px-4 py-10 sm:py-16">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-200/30 rounded-full blur-3xl"></div>
          
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Send Your Appreciation
            </h2>
            <p className="mt-2 text-indigo-100">
              Recognize your colleagues' great work
            </p>
          </div>

          {/* Form container */}
          <div className="p-6 sm:p-8 relative z-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* SAP ID Field */}
              <div className="space-y-2">
                <label htmlFor="sapid" className="block text-sm font-medium text-gray-700">
                  Recipient's SAP ID
                </label>
                <div className={`relative transition-all duration-200 ${isFocused.sapid ? 'ring-2 ring-purple-500/30 rounded-lg' : ''}`}>
                  <input
                    id="sapid"
                    type="text"
                    value={sapid}
                    onChange={e => setSapId(e.target.value)}
                    onFocus={() => handleFocus('sapid')}
                    onBlur={() => handleBlur('sapid')}
                    className="block w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    placeholder="e.g. 52006992"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Your Appreciation Message
                </label>
                <div className={`relative transition-all duration-200 ${isFocused.message ? 'ring-2 ring-purple-500/30 rounded-lg' : ''}`}>
                  <textarea
                    id="message"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onFocus={() => handleFocus('message')}
                    onBlur={() => handleBlur('message')}
                    className="block w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
                    placeholder="I really appreciate how you..."
                    rows={5}
                    required
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                    {message.length}/500
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-[1.02] ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg className="-ml-1 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                    Send Appreciation
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer note */}
          <div className="bg-gray-50/80 px-6 py-4 text-center">
            <p className="text-xs text-gray-500">
              Your appreciation will be shared anonymously unless you choose otherwise
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appreciate;