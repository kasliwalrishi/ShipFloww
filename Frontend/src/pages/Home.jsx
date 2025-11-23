import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { FaBox, FaCog } from "react-icons/fa";
import { useState } from "react";
import BookParcelModal from "../components/BookParcelModal";

const Home = () => {
  const [isBookParcelOpen, setIsBookParcelOpen] = useState(false);

  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0f1428] flex items-center">
        <div className="w-full px-8 py-12">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            {/* Left Section - Hero Content */}
            <div className="flex flex-col justify-center">
              <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                SIMPLE, FAST AND <span className="text-[#E9EB77]">RELIABLE</span> PARCEL DELIVERY
              </h1>
              <p className="text-gray-300 text-lg mb-12 leading-relaxed max-w-lg">
                Send parcels with confidence — modern tracking, secure handling and timely delivery. Access your account or manage operations below.
              </p>

              {/* Buttons Section */}
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Book Parcel Button */}
                <button
                  onClick={() => setIsBookParcelOpen(true)}
                  className="group flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:shadow-2xl hover:shadow-green-500/40 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  <FaBox className="text-lg" />
                  <span>Book Parcel</span>
                </button>

                {/* User Login Button */}
                <Link
                  to="/login"
                  className="group flex items-center justify-center gap-3 bg-gradient-to-r from-[#E9EB77] to-[#D9D964] hover:shadow-2xl hover:shadow-yellow-500/40 text-[#0a0e27] font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  <FaBox className="text-lg" />
                  <span>User Login</span>
                </Link>

                {/* Admin Login Button */}
                <a
                  href="http://localhost:5173/login"
                  className="group flex items-center justify-center gap-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 hover:shadow-2xl hover:shadow-gray-500/40 text-[#E9EB77] font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 border border-[#E9EB77]/30"
                >
                  <FaCog className="text-lg" />
                  <span>Admin Panel</span>
                </a>
              </div>

              {/* Demo Credentials Info */}
              <div className="mt-8 p-6 rounded-2xl bg-blue-500/10 border border-blue-500/30 max-w-lg">
                <p className="text-blue-300 font-semibold mb-3 flex items-center gap-2">
                  <span className="text-lg">🔑</span> Admin Demo Credentials
                </p>
                <div className="space-y-2">
                  <p className="text-blue-200 text-sm">
                    <span className="font-semibold">Email:</span> admin@shipfloww.com
                  </p>
                  <p className="text-blue-200 text-sm">
                    <span className="font-semibold">Password:</span> admin123
                  </p>
                </div>
              </div>
            </div>

            {/* Right Section - Hero Image */}
            <div className="hidden md:flex justify-center">
              <img
                src="/hero.png"
                alt="ShipFloww Delivery"
                className="max-h-[500px] w-full max-w-sm rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <BookParcelModal isOpen={isBookParcelOpen} onClose={() => setIsBookParcelOpen(false)} />
    </div>
  );
};

export default Home;
