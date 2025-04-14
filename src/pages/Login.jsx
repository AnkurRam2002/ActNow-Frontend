import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Email format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("userEmail", response.data.userEmail);
      localStorage.setItem("userRole", response.data.userRole);
      alert("Logged in successfully");
      navigate("/home"); // Redirect after login
    } catch (error) {
      alert(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-3xl shadow-lg">
        {/* Header Tabs */}
        <div className="flex justify-between mb-6">
          <button className="w-1/2 py-2 text-lg font-semibold bg-[#463E3E] text-white rounded-l-2xl">
            Login
          </button>
          <Link to="/register" className="w-1/2 text-center py-2 text-lg font-semibold bg-gray-100 text-[#463E3E] rounded-r-2xl">
            Register
          </Link>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="font-bold block text-[#463E3E]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#463E3E]"
              required
            />
          </div>

          <div>
            <label className="font-bold block text-[#463E3E]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#463E3E]"
              required
            />
          </div>

          <div className="font-bold text-right text-sm text-[#463E3E]">
            <a href="/forgot-password" className="hover:underline cursor-pointer">Forgot password?</a>
          </div>

          <button className="w-full bg-[#463E3E] text-white font-bold py-2 rounded-xl cursor-pointer">
            Login
          </button>

          <div className="text-center text-sm font-bold text-[#463E3E] mt-2">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="cursor-pointer text-[#463E3E] underline hover:no-underline">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
