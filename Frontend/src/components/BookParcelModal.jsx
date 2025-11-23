import { useState, useEffect } from "react";
import { FaTimes, FaMapMarkerAlt, FaPhone, FaEnvelope, FaBox } from "react-icons/fa";
import { publicRequest } from "../requestMethods";

const BookParcelModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    senderName: "",
    senderEmail: "",
    senderPhone: "",
    senderCity: "",
    recipientName: "",
    recipientEmail: "",
    recipientPhone: "",
    recipientCity: "",
    weight: "",
    note: "",
    pickupCity: "",
    deliveryCity: "",
    originBranch: "",
    destinationBranch: "",
  });

  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [requestId, setRequestId] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchBranches();
    }
  }, [isOpen]);

  const fetchBranches = async () => {
    try {
      const res = await publicRequest.get("/branches");
      setBranches(res.data);
    } catch (error) {
      alert("Failed to fetch branches. Please try again.");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (
      !formData.senderName ||
      !formData.senderEmail ||
      !formData.senderPhone ||
      !formData.senderCity ||
      !formData.recipientName ||
      !formData.recipientEmail ||
      !formData.recipientPhone ||
      !formData.recipientCity ||
      !formData.weight ||
      !formData.pickupCity ||
      !formData.deliveryCity ||
      !formData.originBranch ||
      !formData.destinationBranch
    ) {
      alert("Please fill in all required fields");
      return false;
    }

    if (formData.originBranch === formData.destinationBranch) {
      alert("Origin and destination branches must be different");
      return false;
    }

    if (isNaN(formData.weight) || formData.weight <= 0) {
      alert("Please enter a valid weight");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const res = await publicRequest.post("/orders", formData);
      setRequestId(res.data.requestId);
      setSuccessMessage(`Order submitted successfully! Your Request ID is: ${res.data.requestId}`);
      alert("Parcel booking submitted successfully!");

      // Reset form after success
      setTimeout(() => {
        setFormData({
          senderName: "",
          senderEmail: "",
          senderPhone: "",
          senderCity: "",
          recipientName: "",
          recipientEmail: "",
          recipientPhone: "",
          recipientCity: "",
          weight: "",
          note: "",
          pickupCity: "",
          deliveryCity: "",
          originBranch: "",
          destinationBranch: "",
        });
        setSuccessMessage("");
        setRequestId("");
        onClose();
      }, 3000);
    } catch (error) {
      alert("Failed to submit booking. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#E9EB77] to-[#D9D964] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaBox className="text-[#0a0e27] text-2xl" />
            <h2 className="text-[#0a0e27] font-bold text-xl">Book a Parcel</h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#0a0e27] hover:bg-[#D9D964] p-2 rounded-lg transition"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="m-6 p-4 bg-green-500/20 border border-green-500 rounded-lg">
            <p className="text-green-300 font-semibold">{successMessage}</p>
            <p className="text-green-200 text-sm mt-2">
              Please save your Request ID for future reference. An admin will review your request shortly.
            </p>
          </div>
        )}

        {/* Form */}
        {!successMessage && (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Sender Details Section */}
            <div>
              <h3 className="text-[#E9EB77] font-bold text-lg mb-4 flex items-center gap-2">
                <FaEnvelope /> Sender Details
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="senderName"
                  placeholder="Full Name"
                  value={formData.senderName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#E9EB77]"
                  required
                />
                <input
                  type="email"
                  name="senderEmail"
                  placeholder="Email"
                  value={formData.senderEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#E9EB77]"
                  required
                />
                <input
                  type="tel"
                  name="senderPhone"
                  placeholder="Phone Number"
                  value={formData.senderPhone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#E9EB77]"
                  required
                />
                <input
                  type="text"
                  name="senderCity"
                  placeholder="City"
                  value={formData.senderCity}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#E9EB77]"
                  required
                />
              </div>
            </div>

            {/* Recipient Details Section */}
            <div>
              <h3 className="text-[#E9EB77] font-bold text-lg mb-4 flex items-center gap-2">
                <FaEnvelope /> Recipient Details
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="recipientName"
                  placeholder="Full Name"
                  value={formData.recipientName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#E9EB77]"
                  required
                />
                <input
                  type="email"
                  name="recipientEmail"
                  placeholder="Email"
                  value={formData.recipientEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#E9EB77]"
                  required
                />
                <input
                  type="tel"
                  name="recipientPhone"
                  placeholder="Phone Number"
                  value={formData.recipientPhone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#E9EB77]"
                  required
                />
                <input
                  type="text"
                  name="recipientCity"
                  placeholder="City"
                  value={formData.recipientCity}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#E9EB77]"
                  required
                />
              </div>
            </div>

            {/* Parcel Details Section */}
            <div>
              <h3 className="text-[#E9EB77] font-bold text-lg mb-4 flex items-center gap-2">
                <FaBox /> Parcel Details
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="number"
                  name="weight"
                  placeholder="Weight (kg)"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#E9EB77]"
                  required
                />
                <input
                  type="text"
                  name="pickupCity"
                  placeholder="Pickup City"
                  value={formData.pickupCity}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#E9EB77]"
                  required
                />
                <input
                  type="text"
                  name="deliveryCity"
                  placeholder="Delivery City"
                  value={formData.deliveryCity}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#E9EB77]"
                  required
                />
                <textarea
                  name="note"
                  placeholder="Special Instructions (Optional)"
                  value={formData.note}
                  onChange={handleChange}
                  rows="1"
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#E9EB77]"
                />
              </div>
            </div>

            {/* Branch Selection Section */}
            <div>
              <h3 className="text-[#E9EB77] font-bold text-lg mb-4 flex items-center gap-2">
                <FaMapMarkerAlt /> Branch Selection
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">
                    Origin Branch *
                  </label>
                  <select
                    name="originBranch"
                    value={formData.originBranch}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#E9EB77]"
                    required
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
                  <label className="block text-gray-300 text-sm mb-2">
                    Destination Branch *
                  </label>
                  <select
                    name="destinationBranch"
                    value={formData.destinationBranch}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#E9EB77]"
                    required
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
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-[#E9EB77] to-[#D9D964] text-[#0a0e27] font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-yellow-500/40 transition disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                {loading ? "Submitting..." : "Submit Booking"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-700 text-white font-bold py-3 rounded-lg hover:bg-gray-600 transition transform hover:scale-105"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookParcelModal;
