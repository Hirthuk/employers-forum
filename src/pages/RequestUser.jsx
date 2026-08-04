import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiClient from '../services/apiClient';

const RequestUser = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone_number: '',
    sapid: '',
    designation: '',
    project_name: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const validatePhone = (phone) => /^\d{10}$/.test(phone);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!form.password || form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!form.phone_number || !validatePhone(form.phone_number)) {
      newErrors.phone_number = 'Please enter a valid 10-digit phone number';
    }
    if (!form.sapid.trim() || !/^\d+$/.test(form.sapid.trim())) {
      newErrors.sapid = 'Please enter a valid numeric SAP ID';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstError = newErrors[Object.keys(newErrors)[0]];
      toast.error(firstError);
      return;
    }

    setSubmitting(true);
    try {
      await apiClient.post('/api/requestUser', {
        name: form.name,
        email: form.email,
        phone_number: Number(form.phone_number),
        sapid: Number(form.sapid.trim()),
        designation: form.designation,
        project_name: form.project_name,
        password: form.password,
      });

      // Best-effort notification email — signup succeeding shouldn't depend on mail delivery.
      try {
        await apiClient.post('/api/email', {
          name: form.name,
          email: form.email,
          sapid: Number(form.sapid.trim()),
          phoneNumber: Number(form.phone_number),
          project_name: form.project_name,
        });
      } catch {
        // ignore — the request itself already succeeded
      }

      toast.success('Request submitted successfully — an admin will review it shortly');
      setForm({
        name: '', email: '', phone_number: '', sapid: '',
        designation: '', project_name: '', password: '', confirmPassword: ''
      });
      setErrors({});
      navigate('/');
    } catch (err) {
      toast.error(err?.message || 'Failed to submit request');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute -bottom-32 -left-24 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-float-slower" />

      <div className="w-full max-w-md mx-auto z-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 shadow-[0_0_30px_-6px_rgba(217,70,239,0.7)]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>

        <div className="glass-panel rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 p-6 text-center">
            <h1 className="text-2xl font-bold text-white">Access Request</h1>
            <p className="text-white/80 mt-1 text-sm">Join our collaboration platform</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="name">Full Name</label>
              <input id="name" name="name" type="text" value={form.name} onChange={handleChange}
                className="glass-input" placeholder="Enter your full name" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange}
                className="glass-input" placeholder="Enter your email address" required />
              {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="phone_number">Phone Number</label>
              <input id="phone_number" name="phone_number" type="tel" value={form.phone_number} onChange={handleChange}
                className="glass-input" placeholder="Enter 10-digit phone number (e.g. 9876543210)" required />
              {errors.phone_number && <p className="text-xs text-rose-400 mt-1">{errors.phone_number}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="sapid">SAP ID</label>
              <input id="sapid" name="sapid" type="text" value={form.sapid} onChange={handleChange}
                className="glass-input" placeholder="Enter your SAP ID" required />
              {errors.sapid && <p className="text-xs text-rose-400 mt-1">{errors.sapid}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="designation">Designation</label>
              <input id="designation" name="designation" type="text" value={form.designation} onChange={handleChange}
                className="glass-input" placeholder="Enter your designation" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="project_name">Project Name</label>
              <input id="project_name" name="project_name" type="text" value={form.project_name} onChange={handleChange}
                className="glass-input" placeholder="Enter project name" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="password">Password</label>
              <div className="relative">
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange}
                  className="glass-input pr-10" placeholder="Enter password (min 8 chars)" required minLength="8" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-cyan-300 transition-colors p-1" tabIndex={-1}>
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="text-xs text-rose-400 mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="confirmPassword">Confirm Password</label>
              <div className="relative">
                <input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={form.confirmPassword} onChange={handleChange}
                  className="glass-input pr-10" placeholder="Confirm your password" required minLength="8" />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-cyan-300 transition-colors p-1" tabIndex={-1}>
                  {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-xs text-rose-400 mt-1">{errors.confirmPassword}</p>}
            </div>

            <p className="text-center text-xs text-slate-500 mt-2">
              Your request will appear in the admin dashboard for approval
            </p>

            <button type="submit" disabled={submitting} className="btn-primary w-full py-3 mt-4">
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Request'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestUser;
