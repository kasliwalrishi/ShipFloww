import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { FaEye, FaCheck, FaTimes, FaTrash, FaArrowRight } from "react-icons/fa";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [branches, setBranches] = useState([]);
  const [parcelFormData, setParcelFormData] = useState({
    weight: "",
    cost: "",
    note: "",
    originBranch: "",
    destinationBranch: "",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    fetchOrders();
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const res = await publicRequest.get("/branches");
      setBranches(res.data);
    } catch (error) {
      alert("Failed to fetch branches");
      console.error(error);
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await publicRequest.get("/orders");
      // Filter to show only pending orders
      const pendingOrders = res.data.filter((order) => order.status === "Pending");
      setOrders(pendingOrders);
    } catch (error) {
      alert("Failed to fetch orders");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
    setParcelFormData({
      weight: order.weight || "",
      cost: "",
      note: order.note || "",
      originBranch: order.originBranch?._id || "",
      destinationBranch: order.destinationBranch?._id || "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  const handleParcelFormChange = (field, value) => {
    setParcelFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleApprove = async (orderId) => {
    // Validation
    if (!parcelFormData.weight || !parcelFormData.cost || !parcelFormData.originBranch || !parcelFormData.destinationBranch) {
      alert("Please fill in all required parcel fields (weight, cost, branches)");
      return;
    }

    if (parcelFormData.originBranch === parcelFormData.destinationBranch) {
      alert("Origin and destination branches must be different");
      return;
    }

    try {
      const res = await publicRequest.post(`/orders/${orderId}/approve`, parcelFormData);
      alert("Order approved and parcel created successfully!");
      setShowDetailModal(false);
      setSelectedOrder(null);
      setParcelFormData({
        weight: "",
        cost: "",
        note: "",
        originBranch: "",
        destinationBranch: "",
        date: new Date().toISOString().split("T")[0],
      });
      fetchOrders();
    } catch (error) {
      alert("Failed to approve order: " + (error.response?.data?.message || error.message));
      console.error(error);
    }
  };

  const handleReject = async (orderId) => {
    if (window.confirm("Are you sure you want to reject this order?")) {
      try {
        await publicRequest.delete(`/orders/${orderId}`);
        alert("Order rejected and deleted");
        fetchOrders();
      } catch (error) {
        alert("Failed to reject order");
        console.error(error);
      }
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0f1428] min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Orders Received</h1>
          <p className="text-gray-400">Review and approve pending parcel booking requests</p>
        </div>

        {/* Stats Card */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
            <p className="text-blue-300 text-sm font-semibold">Total Orders</p>
            <p className="text-blue-400 text-2xl font-bold">{orders.length}</p>
          </div>
          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
            <p className="text-yellow-300 text-sm font-semibold">Pending</p>
            <p className="text-yellow-400 text-2xl font-bold">{orders.filter(o => o.status === "Pending").length}</p>
          </div>
          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
            <p className="text-green-300 text-sm font-semibold">Approved</p>
            <p className="text-green-400 text-2xl font-bold">{orders.filter(o => o.status === "Approved").length}</p>
          </div>
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
            <p className="text-red-300 text-sm font-semibold">Rejected</p>
            <p className="text-red-400 text-2xl font-bold">{orders.filter(o => o.status === "Rejected").length}</p>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 bg-gray-800/40 rounded-lg border border-gray-700">
            <p className="text-gray-400 text-lg">No pending orders at the moment</p>
            <p className="text-gray-500 text-sm mt-2">Check back later for new booking requests</p>
          </div>
        ) : (
          /* Table */
          <div className="overflow-x-auto bg-gray-800/40 rounded-lg border border-gray-700">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-[#E9EB77] to-[#D9D964] text-[#0a0e27]">
                  <th className="px-6 py-4 text-left font-bold">Request ID</th>
                  <th className="px-6 py-4 text-left font-bold">Sender Name</th>
                  <th className="px-6 py-4 text-left font-bold">Receiver Name</th>
                  <th className="px-6 py-4 text-left font-bold">From</th>
                  <th className="px-6 py-4 text-left font-bold">To</th>
                  <th className="px-6 py-4 text-left font-bold">Date</th>
                  <th className="px-6 py-4 text-left font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-t border-gray-700 hover:bg-gray-700/40 transition"
                  >
                    <td className="px-6 py-4 text-white font-semibold">{order.requestId}</td>
                    <td className="px-6 py-4 text-gray-300">{order.senderName}</td>
                    <td className="px-6 py-4 text-gray-300">{order.recipientName}</td>
                    <td className="px-6 py-4 text-gray-400 text-sm">{order.pickupCity}</td>
                    <td className="px-6 py-4 text-gray-400 text-sm">{order.deliveryCity}</td>
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      {new Date(order.requestDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleViewDetails(order)}
                          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition text-sm font-semibold"
                        >
                          <FaEye size={14} />
                          View
                        </button>
                        <button
                          onClick={() => handleReject(order._id)}
                          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition text-sm font-semibold"
                        >
                          <FaTimes size={14} />
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Detail Modal */}
        {showDetailModal && selectedOrder && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-[#E9EB77] to-[#D9D964] px-6 py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-[#0a0e27] font-bold text-xl">Order Details</h2>
                  <p className="text-[#0a0e27] text-sm font-semibold">ID: {selectedOrder.requestId}</p>
                </div>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-[#0a0e27] hover:bg-[#D9D964] p-2 rounded-lg transition"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Sender Info */}
                <div>
                  <h3 className="text-[#E9EB77] font-bold text-lg mb-3">Sender Information</h3>
                  <div className="bg-gray-700/40 rounded-lg p-4 space-y-2">
                    <p className="text-white">
                      <span className="text-gray-400">Name:</span> {selectedOrder.senderName}
                    </p>
                    <p className="text-white">
                      <span className="text-gray-400">Email:</span> {selectedOrder.senderEmail}
                    </p>
                    <p className="text-white">
                      <span className="text-gray-400">Phone:</span> {selectedOrder.senderPhone}
                    </p>
                    <p className="text-white">
                      <span className="text-gray-400">City:</span> {selectedOrder.senderCity}
                    </p>
                  </div>
                </div>

                {/* Recipient Info */}
                <div>
                  <h3 className="text-[#E9EB77] font-bold text-lg mb-3">Recipient Information</h3>
                  <div className="bg-gray-700/40 rounded-lg p-4 space-y-2">
                    <p className="text-white">
                      <span className="text-gray-400">Name:</span> {selectedOrder.recipientName}
                    </p>
                    <p className="text-white">
                      <span className="text-gray-400">Email:</span> {selectedOrder.recipientEmail}
                    </p>
                    <p className="text-white">
                      <span className="text-gray-400">Phone:</span> {selectedOrder.recipientPhone}
                    </p>
                    <p className="text-white">
                      <span className="text-gray-400">City:</span> {selectedOrder.recipientCity}
                    </p>
                  </div>
                </div>

                {/* Parcel Info */}
                <div>
                  <h3 className="text-[#E9EB77] font-bold text-lg mb-3">Parcel Information</h3>
                  <div className="bg-gray-700/40 rounded-lg p-4 space-y-2">
                    <p className="text-white">
                      <span className="text-gray-400">Weight:</span> {selectedOrder.weight} kg
                    </p>
                    <p className="text-white">
                      <span className="text-gray-400">From:</span> {selectedOrder.pickupCity}
                    </p>
                    <p className="text-white">
                      <span className="text-gray-400">To:</span> {selectedOrder.deliveryCity}
                    </p>
                    {selectedOrder.note && (
                      <p className="text-white">
                        <span className="text-gray-400">Note:</span> {selectedOrder.note}
                      </p>
                    )}
                  </div>
                </div>

                {/* Branch Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-[#E9EB77] font-bold text-lg mb-3">Origin Branch</h3>
                    <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 space-y-2">
                      <p className="text-white font-semibold">{selectedOrder.originBranch?.name}</p>
                      <p className="text-gray-300 text-sm">{selectedOrder.originBranch?.address}</p>
                      <p className="text-gray-300 text-sm">
                        {selectedOrder.originBranch?.city}, {selectedOrder.originBranch?.state}
                      </p>
                      <p className="text-gray-300 text-sm">📞 {selectedOrder.originBranch?.phone}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[#E9EB77] font-bold text-lg mb-3">Destination Branch</h3>
                    <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 space-y-2">
                      <p className="text-white font-semibold">{selectedOrder.destinationBranch?.name}</p>
                      <p className="text-gray-300 text-sm">{selectedOrder.destinationBranch?.address}</p>
                      <p className="text-gray-300 text-sm">
                        {selectedOrder.destinationBranch?.city}, {selectedOrder.destinationBranch?.state}
                      </p>
                      <p className="text-gray-300 text-sm">📞 {selectedOrder.destinationBranch?.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Parcel Details Form */}
                <div className="border-t border-gray-700 pt-6">
                  <h3 className="text-[#E9EB77] font-bold text-lg mb-4">Complete Parcel Details</h3>
                  
                  {/* Weight and Cost */}
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-semibold mb-2">
                        Weight (kg) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        placeholder="Enter weight"
                        value={parcelFormData.weight}
                        onChange={(e) => handleParcelFormChange('weight', e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#E9EB77]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-semibold mb-2">
                        Cost (PKR) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        step="1"
                        min="0"
                        placeholder="Enter parcel cost"
                        value={parcelFormData.cost}
                        onChange={(e) => handleParcelFormChange('cost', e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#E9EB77]"
                      />
                    </div>
                  </div>

                  {/* Note */}
                  <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-semibold mb-2">
                      Note / Instructions
                    </label>
                    <textarea
                      placeholder="Add any special instructions or notes"
                      value={parcelFormData.note}
                      onChange={(e) => handleParcelFormChange('note', e.target.value)}
                      rows="3"
                      className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#E9EB77]"
                    />
                  </div>

                  {/* Branches */}
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-semibold mb-2">
                        Origin Branch <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={parcelFormData.originBranch}
                        onChange={(e) => handleParcelFormChange('originBranch', e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#E9EB77]"
                      >
                        <option value="">Select Origin Branch</option>
                        {branches.map((branch) => (
                          <option key={branch._id} value={branch._id}>
                            {branch.name} - {branch.city}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-semibold mb-2">
                        Destination Branch <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={parcelFormData.destinationBranch}
                        onChange={(e) => handleParcelFormChange('destinationBranch', e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#E9EB77]"
                      >
                        <option value="">Select Destination Branch</option>
                        {branches.map((branch) => (
                          <option key={branch._id} value={branch._id}>
                            {branch.name} - {branch.city}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-semibold mb-2">
                      Parcel Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={parcelFormData.date}
                      onChange={(e) => handleParcelFormChange('date', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#E9EB77]"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => handleApprove(selectedOrder._id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition"
                  >
                    <FaCheck size={18} />
                    Approve & Create Parcel
                  </button>
                  <button
                    onClick={() => handleReject(selectedOrder._id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition"
                  >
                    <FaTimes size={18} />
                    Reject Order
                  </button>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
