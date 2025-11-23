import { useState } from "react";
import {
  FaBox,
  FaMapMarkerAlt,
  FaUser,
  FaEnvelope,
  FaWeight,
  FaDollarSign,
  FaCalendarAlt,
  FaNotesMedical,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import axios from "axios";

const TrackParcel = () => {
  const [trackingId, setTrackingId] = useState("");
  const [parcelData, setParcelData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  // Map status values to labels and colors
  const getStatusInfo = (status) => {
    // Convert numeric status to string label first
    const statusMap = {
      1: "Pending",
      2: "Dispatched",
      3: "In Transit",
      4: "Out for Delivery",
      5: "Delivered",
      "Pending": { label: "Pending", color: "bg-gray-400", textColor: "text-gray-700" },
      "Dispatched": { label: "Dispatched", color: "bg-blue-400", textColor: "text-blue-700" },
      "In Transit": { label: "In Transit", color: "bg-blue-500", textColor: "text-blue-700" },
      "Out for Delivery": {
        label: "Out for Delivery",
        color: "bg-orange-400",
        textColor: "text-orange-700",
      },
      "Delivered": { label: "Delivered", color: "bg-green-500", textColor: "text-green-700" },
    };
    
    // First convert numeric to string
    let statusLabel = typeof status === "number" ? statusMap[status] : status;
    
    // Then get the color mapping
    const colorInfo = statusMap[statusLabel] || { label: statusLabel, color: "bg-gray-400", textColor: "text-gray-700" };
    return colorInfo;
  };

  // Timeline steps
  const timelineSteps = [
    { step: "Parcel Created", status: "Pending", numStatus: 1 },
    { step: "Dispatched", status: "Dispatched", numStatus: 2 },
    { step: "In Transit", status: "In Transit", numStatus: 3 },
    { step: "Out for Delivery", status: "Out for Delivery", numStatus: 4 },
    { step: "Delivered", status: "Delivered", numStatus: 5 },
  ];

  const getCurrentStepIndex = (status) => {
    // Convert numeric status to number if it's a string
    const numStatus = typeof status === "string" ? parseInt(status) : status;
    return timelineSteps.findIndex((t) => t.numStatus === numStatus);
  };

  const handleSearch = async () => {
    if (!trackingId.trim()) {
      setError("Please enter a tracking ID");
      setSearched(true);
      return;
    }

    setLoading(true);
    setError("");
    setParcelData(null);

    try {
      const response = await axios.get(`http://localhost:5000/api/v1/parcels/track/${trackingId}`);

      if (response.data.success) {
        setParcelData(response.data.data);
        setSearched(true);
      } else {
        setError(response.data.message || "Parcel not found");
        setSearched(true);
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setError("Tracking ID not found");
      } else if (err.response?.status === 400) {
        setError("Invalid tracking ID format");
      } else {
        setError("Error tracking parcel. Please try again.");
      }
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const statusInfo = parcelData ? getStatusInfo(parcelData.status) : null;
  const currentStepIndex = parcelData ? getCurrentStepIndex(parcelData.status) : -1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Track Your Parcel</h1>
          <p className="text-gray-600">Enter your tracking ID to get real-time updates</p>
        </div>

        {/* Search Box */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter Tracking ID (24-character ID)"
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition duration-200"
            >
              {loading ? "Searching..." : "Track Parcel"}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && searched && (
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-8">
            <p className="text-red-700 font-semibold">{error}</p>
            <p className="text-red-600 text-sm mt-2">
              Please double-check your tracking ID and try again.
            </p>
          </div>
        )}

        {/* Parcel Details */}
        {parcelData && (
          <div className="space-y-8">
            {/* Status Badge and Main Info */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 pb-6 border-b">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Tracking ID</h2>
                  <p className="text-gray-600 font-mono text-sm">{parcelData._id}</p>
                </div>
                <div className={`${statusInfo.color} ${statusInfo.textColor} px-6 py-3 rounded-lg font-semibold text-lg`}>
                  {statusInfo.label}
                </div>
              </div>

              {/* Quick Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Origin & Destination */}
                <div className="flex items-start gap-4">
                  <FaMapMarkerAlt className="text-green-500 mt-1 text-xl" />
                  <div>
                    <p className="text-gray-500 text-sm font-semibold">From</p>
                    <p className="text-gray-900 font-semibold">{parcelData.from}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <FaMapMarkerAlt className="text-red-500 mt-1 text-xl" />
                  <div>
                    <p className="text-gray-500 text-sm font-semibold">To</p>
                    <p className="text-gray-900 font-semibold">{parcelData.to}</p>
                  </div>
                </div>

                {/* Weight & Cost */}
                <div className="flex items-start gap-4">
                  <FaWeight className="text-purple-500 mt-1 text-xl" />
                  <div>
                    <p className="text-gray-500 text-sm font-semibold">Weight</p>
                    <p className="text-gray-900 font-semibold">{parcelData.weight} kg</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <FaDollarSign className="text-green-600 mt-1 text-xl" />
                  <div>
                    <p className="text-gray-500 text-sm font-semibold">Cost</p>
                    <p className="text-gray-900 font-semibold">₹ {parcelData.cost}</p>
                  </div>
                </div>

                {/* Date & Last Updated */}
                <div className="flex items-start gap-4">
                  <FaCalendarAlt className="text-blue-500 mt-1 text-xl" />
                  <div>
                    <p className="text-gray-500 text-sm font-semibold">Shipped Date</p>
                    <p className="text-gray-900 font-semibold">
                      {new Date(parcelData.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <FaClock className="text-orange-500 mt-1 text-xl" />
                  <div>
                    <p className="text-gray-500 text-sm font-semibold">Last Updated</p>
                    <p className="text-gray-900 font-semibold">
                      {new Date(parcelData.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sender & Recipient Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Sender */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaUser className="text-blue-500" />
                  Sender Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-500 text-sm font-semibold">Name</p>
                    <p className="text-gray-900 font-semibold">{parcelData.sendername}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-semibold flex items-center gap-2">
                      <FaEnvelope className="text-red-500" />
                      Email
                    </p>
                    <p className="text-gray-900 font-semibold break-all">{parcelData.senderemail}</p>
                  </div>
                </div>
              </div>

              {/* Recipient */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaUser className="text-green-500" />
                  Recipient Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-500 text-sm font-semibold">Name</p>
                    <p className="text-gray-900 font-semibold">{parcelData.recipientname}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-semibold flex items-center gap-2">
                      <FaEnvelope className="text-red-500" />
                      Email
                    </p>
                    <p className="text-gray-900 font-semibold break-all">{parcelData.recipientemail}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            {parcelData.note && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaNotesMedical className="text-yellow-500" />
                  Additional Notes
                </h3>
                <p className="text-gray-700 leading-relaxed">{parcelData.note}</p>
              </div>
            )}

            {/* Status Timeline */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Delivery Timeline</h3>
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute top-10 left-6 bottom-0 w-1 bg-gray-300"></div>

                {/* Timeline Steps */}
                <div className="space-y-6">
                  {timelineSteps.map((timeline, index) => {
                    const isCompleted = index <= currentStepIndex;
                    const isCurrent = index === currentStepIndex;

                    return (
                      <div key={index} className="flex gap-4 relative">
                        {/* Circle */}
                        <div
                          className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                            isCurrent
                              ? "bg-blue-600 text-white ring-4 ring-blue-200"
                              : isCompleted
                              ? "bg-green-500 text-white"
                              : "bg-gray-300 text-gray-600"
                          }`}
                        >
                          {isCurrent ? <FaBox className="text-lg" /> : isCompleted ? "✓" : index + 1}
                        </div>

                        {/* Content */}
                        <div className="pt-2">
                          <p
                            className={`font-semibold ${
                              isCurrent ? "text-blue-600" : isCompleted ? "text-green-600" : "text-gray-600"
                            }`}
                          >
                            {timeline.step}
                          </p>
                          {isCurrent && (
                            <p className="text-sm text-gray-500">Current Status</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!searched && !parcelData && (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <FaBox className="mx-auto text-6xl text-gray-300 mb-4" />
            <p className="text-gray-600 text-lg">Enter your tracking ID above to view parcel details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackParcel;
