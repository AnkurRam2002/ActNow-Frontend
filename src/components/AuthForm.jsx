import { useState } from "react";

const AuthForm=() =>{
  //determines whether the user is on login/reg pg
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-3xl shadow-lg">
        {/* Header Tabs */}
        <div className="flex justify-between mb-6">
          <button
            className={`w-1/2 py-2 text-lg font-semibold cursor-pointer ${
              isLogin ? "bg-[#463E3E] text-white" : "bg-gray-100 text-[#463E3E]"
            } rounded-l-2xl`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 text-lg font-semibold cursor-pointer ${
              !isLogin ? "bg-[#463E3E] text-white" : "bg-gray-100 text-[#463E3E]"
            } rounded-r-2xl`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        {/* Form Fields */}
        <form className="space-y-4">
          <div>
            <label className="font-bold block text-[#463E3E]">Email</label>
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#463E3E]"
            />
          </div>

          {/*Password field */}
          <div>
            <label className="font-bold block text-[#463E3E]">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#463E3E]"
            />
          </div>

          {/* Confirm Password (Only for Register) */}
          {!isLogin && (
            <div>
              <label className="font-bold block text-[#463E3E]">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#463E3E]"
              />
            </div>
          )}

          {/* Forgot Password (Only for Login) */}
          {isLogin && (
            <div className="font-bold text-right text-sm text-[#463E3E]">
              <a href="#" className="hover:underline cursor-pointer">
                Forgot password?
              </a>
            </div>
          )}

          {/* Submit Button */}
          <button className="w-full bg-[#463E3E] text-white font-bold py-2 rounded-xl cursor-pointer">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
export default AuthForm;
