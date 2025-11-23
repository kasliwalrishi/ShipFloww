import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";
import { Navigate } from "react-router-dom";
import Footer from "../components/Footer";
import { FaLock, FaEnvelope, FaHome } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("admin@shipfloww.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);

  const handleLogin = async (e) => {
    e.preventDefault();
    // Only allow hardcoded credentials
    if (email === "admin@shipfloww.com" && password === "admin123") {
      dispatch({ type: "admin/loginSuccess", payload: { email } });
    } else {
      dispatch({ type: "admin/loginFailure", payload: "Invalid credentials" });
    }
  };

  if (admin.currentAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0f1428]">
      {/* Home Button */}
      <a
        href="http://localhost:5174"
        className="absolute top-6 left-6 z-50 p-3 rounded-full bg-gradient-to-r from-[#E9EB77] to-[#D9D964] hover:shadow-lg hover:shadow-yellow-500/40 text-[#0a0e27] transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center"
        title="Back to Home"
      >
        <FaHome className="text-xl" />
      </a>
      <div className="h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-7xl grid md:grid-cols-2 gap-12 items-center">
          {/* Left Section - Branding */}
          <div className="hidden md:flex flex-col items-center justify-center">
            <div className="mb-8 text-center">
              <div className="inline-block mb-6 p-4 rounded-2xl bg-gradient-to-br from-[#E9EB77] to-[#D9D964] shadow-2xl transform hover:scale-105 transition-all duration-300">
                <span className="text-4xl font-black text-[#0a0e27]">SF</span>
              </div>
              <h1 className="text-5xl font-bold text-white mb-2">ShipFloww</h1>
              <p className="text-[#E9EB77] text-xl font-semibold mb-4">Admin Portal</p>
              <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
                Manage your parcel delivery operations with powerful admin tools
              </p>
            </div>
            <img src="/hero.png" alt="ShipFloww" className="w-full max-w-sm rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300" />
          </div>

          {/* Right Section - Login Form */}
          <div className="w-full flex justify-center">
            <div className="w-full max-w-md bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl p-8 border border-white/10 backdrop-blur-sm">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                <p className="text-gray-400 text-sm">Sign in to your admin account</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                {/* Email Input */}
                <div className="group">
                  <label className="block text-gray-300 font-semibold mb-2 text-sm flex items-center gap-2">
                    <FaEnvelope className="text-[#E9EB77]" />
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      className="w-full bg-gray-700/50 border-2 border-gray-600 text-white p-4 rounded-xl outline-none transition-all duration-300 focus:border-[#E9EB77] focus:shadow-lg focus:shadow-yellow-500/20 group-hover:border-gray-500"
                      placeholder="admin@shipfloww.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="group">
                  <label className="block text-gray-300 font-semibold mb-2 text-sm flex items-center gap-2">
                    <FaLock className="text-[#E9EB77]" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full bg-gray-700/50 border-2 border-gray-600 text-white p-4 rounded-xl outline-none transition-all duration-300 focus:border-[#E9EB77] focus:shadow-lg focus:shadow-yellow-500/20 group-hover:border-gray-500"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#E9EB77] transition-colors"
                    >
                      {showPassword ? "👁️" : "🔒"}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {admin.error && (
                  <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/30 flex items-start gap-3">
                    <span className="text-red-400 mt-1">⚠️</span>
                    <div>
                      <p className="font-semibold text-red-300">Login Failed</p>
                      <p className="text-red-200 text-sm">Invalid email or password. Please try again.</p>
                    </div>
                  </div>
                )}

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={admin.isFetching}
                  className="w-full bg-gradient-to-r from-[#E9EB77] to-[#D9D964] hover:shadow-lg hover:shadow-yellow-500/30 disabled:opacity-50 disabled:cursor-not-allowed text-[#0a0e27] font-bold py-4 px-4 rounded-xl transition-all duration-300 text-lg transform hover:scale-105 active:scale-95"
                >
                  {admin.isFetching ? "Signing in..." : "Sign In"}
                </button>
              </form>

              {/* Info Section */}
              <div className="mt-8 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <p className="text-blue-300 text-sm font-medium mb-2">Demo Credentials:</p>
                <p className="text-blue-200 text-xs">Email: admin@shipfloww.com</p>
                <p className="text-blue-200 text-xs">Password: admin123</p>
              </div>

              {/* Footer Note */}
              <p className="text-center text-gray-400 text-xs mt-6">
                🔐 Admin Portal - Secure Access Only
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
