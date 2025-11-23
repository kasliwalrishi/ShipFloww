import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";
import { Navigate, Link } from "react-router-dom";
import { useState } from "react";
import { FaLock, FaEnvelope, FaBox, FaHome } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        setLoading(true);
        await login(dispatch, { email, password });
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  };

  if (user.currentUser) {
    return <Navigate to="/myparcels" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0f1428]">
      {/* Home Button */}
      <Link
        to="/"
        className="fixed top-6 left-6 z-50 p-3 rounded-full bg-gradient-to-r from-[#E9EB77] to-[#D9D964] hover:shadow-lg hover:shadow-yellow-500/40 text-[#0a0e27] transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center"
        title="Back to Home"
      >
        <FaHome className="text-xl" />
      </Link>
      <Navbar />
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center">
          {/* Left Section - Hero Image */}
          <div className="hidden md:flex flex-col items-center justify-center">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
                <FaBox className="text-[#E9EB77]" />
                ShipFloww
              </h2>
              <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
                Track your parcels and manage deliveries with ease
              </p>
            </div>
            <img src="/hero.png" alt="ShipFloww" className="w-full max-w-sm rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300" />
          </div>

          {/* Right Section - Login Form */}
          <div className="w-full flex justify-center">
            <div className="w-full max-w-md bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl p-8 border border-white/10 backdrop-blur-sm">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Welcome</h2>
                <p className="text-gray-400 text-sm">Sign in to track your parcels</p>
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
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value.replace(/\s/g, ''))}
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
                      className="w-full bg-gray-700/50 border-2 border-gray-600 text-white p-4 rounded-xl outline-none transition-all duration-300 focus:border-[#E9EB77] focus:shadow-lg focus:shadow-yellow-500/20 group-hover:border-gray-500 pr-12"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value.replace(/\s/g, ''))}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#E9EB77] transition-colors text-lg"
                    >
                      {showPassword ? "👁️" : "🔒"}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/30 flex items-start gap-3">
                    <span className="text-red-400 mt-0.5">⚠️</span>
                    <div>
                      <p className="font-semibold text-red-300 text-sm">Login Failed</p>
                      <p className="text-red-200 text-xs">Please ensure your email and password are correct. Double-check and try again.</p>
                    </div>
                  </div>
                )}

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#E9EB77] to-[#D9D964] hover:shadow-lg hover:shadow-yellow-500/30 disabled:opacity-50 disabled:cursor-not-allowed text-[#0a0e27] font-bold py-4 px-4 rounded-xl transition-all duration-300 text-lg transform hover:scale-105 active:scale-95"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>

              {/* Sign Up Link */}
              <div className="mt-6 text-center border-t border-white/10 pt-6">
                <p className="text-gray-400 text-sm">
                  
                  <span className="text-[#ff5f5f] hover:underline font-semibold transition-colors">
                    please use login credentials provided through email
                  </span>
                </p>
              </div>

              {/* Footer Note */}
              <p className="text-center text-gray-500 text-xs mt-6">
                🔐 Your login is secure and encrypted
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
