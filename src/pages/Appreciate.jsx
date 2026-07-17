import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { toast } from 'react-toastify';
import PostsService from '../services/PostsService';
import AuthService from '../services/AuthService';
import { mockDB } from '../data/mockDatabase';

const REASONS = [
  'Good work',
  'Thanks for help buddy',
  'Good performance in an event',
  'Great leadership',
  'Outstanding teamwork',
  'Innovative solution',
  'Excellent customer service',
  'Mentorship and guidance',
  'Consistent reliability',
  'Going above and beyond',
  'Positive attitude',
  'Process improvement',
  'Timely delivery',
  'High quality work',
];

const Appreciate = () => {
  const [sapid, setSapId] = useState('');
  const [message, setMessage] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const [sentCount, setSentCount] = useState(0);
  const MAX_SENT = 2;

  const nextResetDateString = () => {
    const now = new Date();
    const next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    return next.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  useEffect(() => {
    const mySap = AuthService.getSapId();
    if (mySap) {
      setSentCount(PostsService.countSentThisMonth(mySap));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (sentCount >= MAX_SENT) {
      toast.error(`You have reached your monthly limit of ${MAX_SENT} appreciations. New credits available on ${nextResetDateString()}`, { position: 'top-center' });
      return;
    }

    if (!sapid.trim()) {
      toast.error('Please enter a valid SAP ID', { position: 'top-center', autoClose: 3000 });
      return;
    }

    if (!reason) {
      toast.error('Please select a reason for appreciation', { position: 'top-center', autoClose: 3000 });
      return;
    }

    if (!message.trim()) {
      toast.error('Please enter an appreciation message', { position: 'top-center', autoClose: 3000 });
      return;
    }

    const fromSapId = AuthService.getSapId();
    if (!fromSapId) {
      toast.error('Unable to identify your account. Please log in again.', { position: 'top-center', autoClose: 3000 });
      return;
    }

    const recipient = mockDB.findBySapId(sapid.trim());
    if (!recipient) {
      toast.error('Recipient SAP ID not found.', { position: 'top-center', autoClose: 3000 });
      return;
    }

    setLoading(true);

    try {
      await PostsService.addPost({
        from_sapid: fromSapId,
        to_sapid: sapid.trim(),
        getterName: recipient.name,
        appreciation_header: reason,
        appreciation_message: message.trim(),
      });

      setSapId('');
      setMessage('');
      setReason('');
      setSentCount(PostsService.countSentThisMonth(fromSapId));

      toast.success('🎉 Appreciation sent successfully!', {
        position: 'top-center',
        autoClose: 3000,
        theme: 'dark',
      });
    } catch {
      toast.error('Failed to send appreciation. Please try again.', {
        position: 'top-center',
        autoClose: 3000,
        theme: 'dark',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <NavBar />

      <div className="max-w-md mx-auto px-4 py-10 sm:py-16 relative">
        <div className="absolute -top-10 -right-16 w-64 h-64 bg-fuchsia-600/15 rounded-full blur-3xl animate-float-slow pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-violet-600/15 rounded-full blur-3xl animate-float-slower pointer-events-none" />

        <div className="glass-panel rounded-3xl overflow-hidden relative z-10">
          <div className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 p-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Send Your Appreciation
            </h2>
            <p className="mt-2 text-white/80 text-sm">
              Recognize your colleagues' great work
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {sentCount >= MAX_SENT && (
                <div className="p-3 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm">
                  You have sent {sentCount} appreciations this month. Limit reached ({MAX_SENT}). New credits available on {nextResetDateString()}.
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="sapid" className="block text-sm font-medium text-slate-300">
                  Recipient's SAP ID
                </label>
                <input
                  id="sapid"
                  type="text"
                  value={sapid}
                  onChange={e => setSapId(e.target.value)}
                  className="glass-input"
                  placeholder="e.g. 10005678"
                  required
                  pattern="[0-9]+"
                  title="Please enter a valid SAP ID (numbers only)"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="reason" className="block text-sm font-medium text-slate-300">
                  Appreciation Header
                </label>
                <select
                  id="reason"
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  className="glass-input"
                  required
                >
                  <option className="bg-[#0a0a16]" value="">Select a reason...</option>
                  {REASONS.map(r => (
                    <option className="bg-[#0a0a16]" key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-slate-300">
                  Your Appreciation Message
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    value={message}
                    onChange={e => {
                      if (e.target.value.length <= 500) setMessage(e.target.value);
                    }}
                    className="glass-input resize-none"
                    placeholder="I really appreciate how you..."
                    rows={5}
                    required
                    maxLength={500}
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-slate-500">
                    {message.length}/500
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || sentCount >= MAX_SENT}
                className="btn-primary w-full py-3 text-lg"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                    Send Appreciation
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="px-6 py-4 text-center border-t border-white/10">
            <p className="text-xs text-slate-500">
              Your appreciation will be visible to the whole team on the Happenings feed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appreciate;
