import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await api.post('/forgot-password', { email });
      localStorage.setItem('email', email);

      if (response.data.message) {
        setMessage(response.data.message);
        setTimeout(() => {
          navigate('/reset-password');
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
          Forgot Password
        </h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="font-bold block text-[#463E3E]">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#463E3E]"
            />
          </div>

          {/* Error & Success Messages */}
          {message && <p className="text-green-600 text-sm font-bold">{message}</p>}
          {error && <p className="text-red-500 text-sm font-bold">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full font-bold py-2 rounded-xl cursor-pointer ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#463E3E] text-white"
            }`}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
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

export default ForgotPassword;
