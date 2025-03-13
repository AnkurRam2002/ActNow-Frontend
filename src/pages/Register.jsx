import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    //phone no. format validation
    if (!/^\d{10}$/.test(phone)) {
        alert("Phone number must be exactly 10 digits.");
        return;
    }

    // if (password !== confirmPassword) {
    //   alert("Passwords do not match!");
    //   return;
    // }

    try {
      await api.post("/auth/register", { username, email, password, phone, city });
      alert("User registered successfully");
      console.log("Response:", response.data);
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
      console.error("Error response:", error.response);
      alert(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-3xl shadow-lg">
        {/* Header Tabs */}
        <div className="flex justify-between mb-6">
          <Link to="/login" className="w-1/2 text-center py-2 text-lg font-semibold bg-gray-100 text-[#463E3E] rounded-l-2xl">
            Login
          </Link>
          <button className="w-1/2 py-2 text-lg font-semibold bg-[#463E3E] text-white rounded-r-2xl">
            Register
          </button>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="font-bold block text-[#463E3E]">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#463E3E]"
              required
            />
          </div>

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

          <div>
            <label className="font-bold block text-[#463E3E]">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#463E3E]"
              required
            />
          </div>

          <div>
            <label className="font-bold block text-[#463E3E]">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter your city"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#463E3E]"
              required
            />
          </div>

          <button className="w-full bg-[#463E3E] text-white font-bold py-2 rounded-xl cursor-pointer">
            Register
          </button>

          <div className="text-center text-sm font-bold text-[#463E3E] mt-2">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="cursor-pointer text-[#463E3E] underline hover:no-underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
