import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/adminSlice";
import { FaSignOutAlt, FaBell } from "react-icons/fa";

const Navbar = () => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-gradient-to-r from-[#0a0e27] via-[#1a1f3a] to-[#0f1428] border-b border-white/10 shadow-2xl">
      <div className="flex items-center justify-between h-20 px-8">
        {/* Logo/Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#E9EB77] to-[#D9D964] flex items-center justify-center">
            <span className="text-[#0a0e27] font-bold text-lg">SF</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">ShipFloww</h1>
            <p className="text-[#E9EB77] text-xs font-medium">Admin Panel</p>
          </div>
        </div>

        {/* Admin Info and Actions */}
        <div className="flex items-center gap-6">
          {/* Notifications */}
          <button className="relative p-2 text-gray-300 hover:text-[#E9EB77] transition-colors">
            <FaBell className="text-xl" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          {/* Admin Info */}
          {admin.currentAdmin && (
            <div className="flex items-center gap-4 border-l border-white/20 pl-6">
              <div className="text-right">
                <p className="text-white font-semibold text-sm">Admin</p>
                <p className="text-gray-400 text-xs">{admin.currentAdmin.email}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E9EB77] to-[#D9D964] flex items-center justify-center text-[#0a0e27] font-bold cursor-pointer hover:shadow-lg transition-all">
                {admin.currentAdmin.email.charAt(0).toUpperCase()}
              </div>
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 px-4 py-2 rounded-lg transition-all duration-300 border border-red-500/30 hover:border-red-500/50"
          >
            <FaSignOutAlt className="text-sm" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
