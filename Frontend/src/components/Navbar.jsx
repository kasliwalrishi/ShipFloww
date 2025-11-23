import { Link } from "react-router-dom";
import { FaBox } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="h-[80px] bg-[#0b0b0b] flex items-center justify-between px-6 shadow-md">
      
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img 
          src="/logo3.jpg" 
          alt="ShipFloww Logo" 
          className="h-12 w-auto object-contain"
        />
        <span className="text-2xl font-bold text-white">ShipFloww</span>
      </Link>

      {/* Track Button */}
      <div className="flex items-center gap-4">
        <Link to="/track">
          <button className="flex items-center gap-2 bg-[#0066ff] text-white font-semibold px-4 py-2 rounded-md hover:bg-[#0052cc] transition">
            <FaBox className="text-lg" />
            <span>Track Parcel</span>
          </button>
        </Link>

        {/* Login Button */}
        <Link to="/login">
          <button className="bg-[#FFD400] text-[#0b0b0b] font-semibold p-3 rounded-md hover:opacity-90 transition">
            Login
          </button>
        </Link>
      </div>

    </div>
  );
};

export default Navbar;
