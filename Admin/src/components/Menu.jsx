import {
  FaHome,
  FaUsers,
  FaUser,
  FaBox,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/adminSlice";

const Menu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  // Check if link is active
  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: "/", label: "Home", icon: FaHome },
    { path: "/profile", label: "Profile", icon: FaUser },
  ];

  const managementItems = [
    { path: "/parcels", label: "Parcels", icon: FaBox },
    { path: "/users", label: "Users", icon: FaUsers },
  ];

  const settingsItems = [
    { path: "/settings", label: "Settings", icon: FaCog },
  ];

  const MenuLink = ({ item }) => (
    <Link to={item.path}>
      <li
        className={`flex items-center gap-4 px-6 py-3 mx-2 my-1 rounded-lg transition-all duration-300 cursor-pointer ${
          isActive(item.path)
            ? "bg-gradient-to-r from-[#E9EB77] to-[#D9D964] text-[#0a0e27] shadow-lg transform scale-105"
            : "text-gray-300 hover:text-white hover:bg-white/10 hover:translate-x-2"
        }`}
      >
        <item.icon className="text-lg" />
        <span className="font-medium">{item.label}</span>
      </li>
    </Link>
  );

  return (
    <div className="sticky top-20 h-[calc(100vh-80px)] bg-gradient-to-b from-[#1a1f3a] via-[#0f1428] to-[#0a0e27] shadow-2xl overflow-y-auto border-r border-white/10">
      <ul className="py-6">
        {/* Main Menu */}
        <li className="px-6 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
          Dashboard
        </li>
        {menuItems.map((item) => (
          <MenuLink key={item.path} item={item} />
        ))}

        {/* Management */}
        <li className="px-6 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 mt-6">
          Management
        </li>
        {managementItems.map((item) => (
          <MenuLink key={item.path} item={item} />
        ))}

        {/* Settings */}
        <li className="px-6 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 mt-6">
          System
        </li>
        {settingsItems.map((item) => (
          <MenuLink key={item.path} item={item} />
        ))}

        {/* Divider */}
        <div className="my-6 border-t border-white/10"></div>

        {/* Logout */}
        <li
          onClick={handleLogout}
          className="flex items-center gap-4 px-6 py-3 mx-2 my-1 rounded-lg transition-all duration-300 cursor-pointer text-red-400 hover:text-red-300 hover:bg-red-500/10 hover:translate-x-2"
        >
          <FaSignOutAlt className="text-lg" />
          <span className="font-medium">Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
