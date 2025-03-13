import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const ResetPassword = () => {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const email = localStorage.getItem('email');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await api.post('/reset-password', { email, otp, newPassword });
      localStorage.removeItem('email');

      if (response.data.message) {
        setSuccess(response.data.message);
        setTimeout(() => {
          navigate('/login'); 
        }, 2000);
      }
    } catch (err) {
      setError(err.response ? err.response.data.error : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-3xl shadow-lg">
        {/* Page Title */}
        <h2 className="text-2xl font-bold text-[#463E3E] text-center mb-4">
          Reset Password
        </h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="otp" className="font-bold block text-[#463E3E]">
              OTP
            </label>
            <input
              id="otp"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#463E3E]"
            />
          </div>

          <div>
            <label htmlFor="password" className="font-bold block text-[#463E3E]">
              New Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#463E3E]"
            />
          </div>

          {/* Error & Success Messages */}
          {success && <p className="text-green-600 text-sm font-bold">{success}</p>}
          {error && <p className="text-red-500 text-sm font-bold">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full font-bold py-2 rounded-xl cursor-pointer ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#463E3E] text-white"
            }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {/* Back to Login */}
        <div className="mt-4 text-center text-sm font-bold text-[#463E3E]">
          <a href="/login" className="hover:underline cursor-pointer">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

