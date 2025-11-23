import { useEffect, useState } from "react";
import { FaUser, FaBox, FaCopy, FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/userRedux";

const MyParcels = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getParcels = async () => {
      try {
        const res = await publicRequest.post("/parcels/me", {
          email: user.currentUser.email,
        });
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getParcels();
  }, []);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleCopyTrackingId = (trackingId, e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(trackingId);
    setCopiedId(trackingId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  // Map numeric status to label
  const getStatusLabel = (status) => {
    const statusMap = {
      1: "Pending",
      2: "Dispatched",
      3: "In Transit",
      4: "Out for Delivery",
      5: "Delivered",
    };
    return statusMap[status] || "Unknown";
  };

  // Get status color
  const getStatusColor = (status) => {
    if (status === 1) return "bg-[#ffd400] text-[#0b0b0b]";
    if (status === 5) return "bg-green-500 text-white";
    if (status >= 2 && status <= 4) return "bg-blue-500 text-white";
    return "bg-[#555] text-white";
  };
  return (
    <div>
      <div className="relative flex items-end justify-end mr-[20%] mt-[3%]">
        <div>
          <span
            className="flex items-center text-white font-semibold cursor-pointer"
            onClick={handleOpen}
          >
            <FaUser className="mr-[10px]" />
            {user.currentUser?.fullname || "User"}
          </span>
        </div>
        {open && (
          <div className="absolute top-[20px] right-0 h-[200px] w-[250px] bg-[#0b0b0b] z-[999] shadow-xl rounded-md text-[#ffd400]">
            <ul className="flex flex-col items-center justify-center mt-[10px]">
              <Link to="/allparcels">
                <li className="hover:opacity-90 my-[8px] cursor-pointer text-[#fff] px-4 py-1 rounded">
                  All parcels
                </li>
              </Link>
              <li className="hover:opacity-90 my-[8px] cursor-pointer text-[#fff] px-4 py-1 rounded">
                Statements
              </li>
              <li className="hover:opacity-90 my-[8px] cursor-pointer text-[#fff] px-4 py-1 rounded" onClick={handleLogout}>
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="flex justify-evenly px-[5%]">
        <div className="h-[90vh] w-[60vw] rounded-md">
          <h2 className="text-[20px] text-[#ffd400] p-[20px]">My Parcels</h2>
          {data.map((parcel, index) => (
            <Link key={index} to={`/parcel/${parcel._id}`}>
              <div className="flex justify-between bg-[#0f0f10] h-[180px] w-[60vw] m-[20px] p-[20px] cursor-pointer rounded-md shadow-inner hover:bg-[#1a1a1b] transition">
                <div className="text-[#e6e6e6] flex-1">
                  <ul>
                    <li>From: <span className="text-[#fff]">{parcel.from}</span></li>
                    <li>Weight: <span className="text-[#fff]">{parcel.weight} kg</span></li>
                    <li>Date: <span className="text-[#fff]">{parcel.date}</span></li>
                    <li>Sender: <span className="text-[#fff]">{parcel.sendername}</span></li>
                    <li className="text-xs mt-2">
                      Tracking ID: 
                      <span className="text-[#ffd400] font-mono text-[11px] ml-1">
                        {parcel._id.substring(0, 12)}...
                      </span>
                      <button
                        onClick={(e) => handleCopyTrackingId(parcel._id, e)}
                        className="ml-2 text-[#ffd400] hover:text-[#fff] transition"
                        title="Copy full tracking ID"
                      >
                        {copiedId === parcel._id ? (
                          <FaCheck className="inline text-green-400" />
                        ) : (
                          <FaCopy className="inline" />
                        )}
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <span className="text-[#fff]">To: {parcel.to}</span>
                  <div className="flex flex-col items-center gap-2">
                    <Link to="/track" onClick={(e) => e.stopPropagation()}>
                      <button
                        className="bg-[#0066ff] text-[#fff] text-xs w-[110px] cursor-pointer p-2 rounded-md hover:bg-[#0052cc] transition flex items-center justify-center gap-1"
                        title="Track this parcel"
                      >
                        <FaBox className="text-sm" />
                        Track
                      </button>
                    </Link>
                    <button
                      className={`${getStatusColor(parcel.status)} w-[110px] cursor-pointer p-2 rounded-md font-semibold text-sm`}
                    >
                      {getStatusLabel(parcel.status)}
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyParcels;
