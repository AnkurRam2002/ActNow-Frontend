import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [role, setRole] = useState("volunteer");
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);
  const [idPdf, setIdPdf] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    //phone no. format validation
    if (!/^\d{10}$/.test(phone)) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone", phone);
      formData.append("city", city);
      formData.append("role", role);
      if (skills) {
        formData.append("skills", skills);
      }
      formData.append("idPdf", idPdf); // 🆕

      const response = await api.post("/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("User registration submitted for approval successfully");
      console.log("Response:", response.data);
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
      console.error("Error response:", error.response);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false); // Stop loading after process
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-3xl shadow-lg">
        {/* Header Tabs */}
        <div className="flex justify-between mb-6">
          <Link
            to="/login"
            className="w-1/2 text-center py-2 text-lg font-semibold bg-gray-100 hover:bg-gray-200 transition-all text-[#463E3E] rounded-l-2xl"
          >
            Login
          </Link>
          <button className="w-1/2 py-2 text-lg font-semibold bg-[#463E3E] text-white rounded-r-2xl">
            Register
          </button>
        </div>

        {/* Role Selection */}
        <div className="px-2 pb-2">
          <label className="font-bold block text-[#463E3E] mb-1">
            Register As
          </label>
          <div className="flex gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="volunteer"
                checked={role === "volunteer"}
                onChange={(e) => setRole(e.target.value)}
                className="w-4 h-4"
                required
              />
              <span className="text-[#463E3E]">Volunteer</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="ngo"
                checked={role === "ngo"}
                onChange={(e) => setRole(e.target.value)}
                className="w-4 h-4"
                required
              />
              <span className="text-[#463E3E]">NGO</span>
            </label>
          </div>
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
            <label className="font-bold block text-[#463E3E]">
              Phone Number
            </label>
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

          <div>
            <label className="font-bold block text-[#463E3E]">
              Skills{" "}
              <span className="font-normal text-sm text-gray-500">
                (optional, comma-separated)
              </span>
            </label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g., Teaching, First Aid, Public Speaking"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#463E3E]"
            />
          </div>

           {/* 📄 PDF Upload */}
            <div>
              <label className="font-bold block text-[#463E3E] mb-2">Upload ID Proof (PDF) [Max 5 MB]</label>

              <div className="flex items-center gap-3">
                {/* Hidden actual input */}
                <input
                  type="file"
                  id="pdf-upload"
                  accept=".pdf"
                  onChange={(e) => setIdPdf(e.target.files[0])}
                  className="hidden"
                  required
                />

                {/* Custom button */}
                <label
                  htmlFor="pdf-upload"
                  className="px-4 py-2 bg-[#463E3E] text-white rounded-md cursor-pointer hover:bg-[#2e2828] transition"
                >
                  {idPdf ? "Change File" : "Choose File"}
                </label>

                {/* Show selected file name */}
                {idPdf && (
                  <span className="text-sm text-green-700 font-medium">{idPdf.name}</span>
                )}
              </div>
            </div>

          <button
            className={`flex items-center justify-center gap-2 w-full font-bold py-2 rounded-xl transition-all text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#463E3E] hover:bg-[#2e2929] active:bg-[#463E3E] cursor-pointer"
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>

          <div className="text-center text-sm font-bold text-[#463E3E] mt-2">
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                className="cursor-pointer text-[#463E3E] underline hover:no-underline"
              >
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
