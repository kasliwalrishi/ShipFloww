import { Link } from "react-router-dom";
import { FaTrash, FaEdit, FaBox } from "react-icons/fa";
import { useEffect } from "react";
import { useState } from "react";
import { publicRequest } from "../requestMethods";

const Parcels = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getParcels = async () => {
      try {
        setLoading(true);
        const res = await publicRequest.get("/parcels");
        setParcels(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getParcels();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this parcel?")) {
      try {
        await publicRequest.delete(`/parcels/${id}`);
        setParcels(parcels.filter((parcel) => parcel._id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getStatusColor = (status) => {
    const statusMap = {
      1: { label: "Pending", color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" },
      2: { label: "Dispatched", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
      3: { label: "In Transit", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
      4: { label: "Out for Delivery", color: "bg-orange-500/20 text-orange-300 border-orange-500/30" },
      5: { label: "Delivered", color: "bg-green-500/20 text-green-300 border-green-500/30" },
    };
    return statusMap[status] || { label: "Unknown", color: "bg-gray-500/20 text-gray-300 border-gray-500/30" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0f1428] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <FaBox className="text-[#E9EB77]" />
              All Parcels
            </h1>
            <p className="text-gray-400">Manage all parcels and deliveries</p>
          </div>
          <Link to="/newparcel">
            <button className="bg-gradient-to-r from-[#E9EB77] to-[#D9D964] hover:shadow-lg text-[#0a0e27] font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center gap-2 transform hover:scale-105">
              <FaBox />
              New Parcel
            </button>
          </Link>
        </div>

        {/* Parcels Grid */}
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-gray-400 text-xl">Loading parcels...</div>
          </div>
        ) : parcels.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-12 border border-white/10 text-center">
            <FaBox className="text-6xl text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl text-gray-400 mb-2">No parcels found</h3>
            <p className="text-gray-500">Add a new parcel to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {parcels.map((parcel) => {
              const statusInfo = getStatusColor(parcel.status);
              return (
                <div
                  key={parcel._id}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg p-6 border border-white/10 hover:border-[#E9EB77]/30 transition-all duration-300 transform hover:scale-105"
                >
                  {/* Parcel Header */}
                  <div className="flex items-start justify-between mb-4 pb-4 border-b border-white/10">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <FaBox className="text-blue-400 text-lg" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusInfo.color}`}>
                      {statusInfo.label}
                    </span>
                  </div>

                  {/* Parcel Info */}
                  <div className="space-y-3 mb-6">
                    <div>
                      <p className="text-gray-400 text-sm font-medium">From</p>
                      <p className="text-white font-semibold">{parcel.from}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm font-medium">To</p>
                      <p className="text-white font-semibold">{parcel.to}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-gray-400 text-sm font-medium">Sender</p>
                        <p className="text-white text-sm">{parcel.sendername}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm font-medium">Recipient</p>
                        <p className="text-white text-sm">{parcel.recipientname}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm font-medium">Note</p>
                      <p className="text-gray-300 text-sm truncate">{parcel.note}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t border-white/10">
                    <Link to={`/parcel/${parcel._id}`} className="flex-1">
                      <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg text-white font-semibold py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                        <FaEdit className="text-sm" />
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(parcel._id)}
                      className="bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 p-2 rounded-lg transition-all border border-red-500/30 hover:border-red-500/50"
                      title="Delete parcel"
                    >
                      <FaTrash className="text-lg" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Summary Footer */}
        {!loading && parcels.length > 0 && (
          <div className="mt-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-4 text-center">
            <p className="text-gray-300">
              Total Parcels: <span className="font-bold text-[#E9EB77]">{parcels.length}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Parcels;
