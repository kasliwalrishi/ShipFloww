import { useEffect, useState } from "react";
import { FaArrowLeft, FaCopy, FaCheck, FaBox } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";

const Parcel = () => {
  const location = useLocation();
  const parcelId = location.pathname.split("/")[2];
  const [parcel, setParcel] = useState({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const getParcel = async () => {
      try {
        const res = await publicRequest.get("/parcels/find/" + parcelId);
        setParcel(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getParcel();
  }, [parcelId]);

  const handleCopyTrackingId = () => {
    navigator.clipboard.writeText(parcel._id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

  // Get status button color
  const getStatusButtonColor = (status) => {
    if (status === 1) return "bg-[#ffd400] text-[#0b0b0b]";
    if (status === 5) return "bg-green-500 text-white";
    if (status >= 2 && status <= 4) return "bg-blue-500 text-white";
    return "bg-[#555] text-white";
  };

  return (
    <div className="flex flex-col items-center justify-center mt-[3%] mr-[5%] ml-[5%]">
      <div className="bg-[#0f0f10] h-[80vh] w-[60vw] rounded-md p-4 shadow-lg text-[#e6e6e6]">
        <Link to="/myparcels">
          <FaArrowLeft className="text-[18px] m-2 cursor-pointer text-[#ffd400]" />
        </Link>
        <div className="flex justify-between">
          <div className="flex-1">
            <ul className="m-3 space-y-2">
              <li className="mt-3">From: <span className="text-white">{parcel.from}</span></li>
              <li className="mt-3">Weight: <span className="text-white">{parcel.weight} kg</span></li>
              <li className="mt-3">Date: <span className="text-white">{parcel?.date}</span></li>
              <li className="mt-3">Sender: <span className="text-white">{parcel.sendername}</span></li>
              <li className="mt-3">To : <span className="text-white">{parcel.to}</span></li>
              <li className="mt-3">Cost : <span className="text-white">${parcel.cost}</span></li>
              <li className="mt-3">Receiver : <span className="text-white">{parcel.recipientname}</span></li>
              {parcel.originBranch && (
                <li className="mt-3">Origin Branch: <span className="text-[#ffd400]">{parcel.originBranch.name} ({parcel.originBranch.city})</span></li>
              )}
              {parcel.destinationBranch && (
                <li className="mt-3">Destination Branch: <span className="text-[#ffd400]">{parcel.destinationBranch.name} ({parcel.destinationBranch.city})</span></li>
              )}
              <li className="mt-3">
                <span className="text-[#e6e6e6]">Tracking ID: </span>
                <span className="text-[#ffd400] font-mono text-sm cursor-pointer hover:text-white transition flex items-center gap-2 mt-1">
                  {parcel._id}
                  <button
                    onClick={handleCopyTrackingId}
                    className="text-white hover:text-[#ffd400] transition"
                    title="Copy tracking ID"
                  >
                    {copied ? <FaCheck className="text-green-400" /> : <FaCopy />}
                  </button>
                </span>
              </li>
              <li className="mt-3">Note : <span className="text-white">{parcel.note}</span></li>
            </ul>
            <div className="flex gap-3 m-[20px]">
              <button
                className={`${getStatusButtonColor(parcel.status)} w-[120px] cursor-pointer p-2 rounded-md font-semibold`}
              >
                {getStatusLabel(parcel.status)}
              </button>
              <Link to="/track">
                <button className="bg-[#0066ff] text-white w-[120px] cursor-pointer p-2 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-[#0052cc] transition">
                  <FaBox className="text-sm" />
                  Track
                </button>
              </Link>
            </div>
          </div>
          <div className="flex-1 mr-[20%]">
            <ul className="m-3 space-y-2 text-white">
              <li className="mt-3">Sender Email: {parcel.senderemail}</li>
              <li className="mt-3">Recipient Email: {parcel.recipientemail}</li>
            </ul>
            <textarea
              cols={50}
              rows={7}
              name=""
              id=""
              placeholder="Leave a feedback"
              className="outline-none p-[5px] bg-[#0b0b0b] text-white border border-[#333] rounded-md"
            ></textarea>
            <button className="bg-[#ffd400] text-[#0b0b0b] w-[200px] p-[10px] mt-3 font-semibold rounded-md">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parcel;
