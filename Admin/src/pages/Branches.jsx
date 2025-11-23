import { useState, useEffect } from "react";
import { publicRequest } from "../requestMethods";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash, FaPlus, FaTimes, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const Branches = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    state: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    setLoading(true);
    try {
      const response = await publicRequest.get("/branches");
      setBranches(response.data);
    } catch (error) {
      console.error("Error fetching branches:", error);
      toast.error("Failed to fetch branches");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.city || !formData.state || !formData.address || !formData.phone) {
      toast.error("All fields are required");
      return;
    }

    try {
      if (editingId) {
        await publicRequest.put(`/branches/${editingId}`, formData);
        toast.success("Branch updated successfully");
      } else {
        await publicRequest.post("/branches", formData);
        toast.success("Branch created successfully");
      }

      setFormData({ name: "", city: "", state: "", address: "", phone: "" });
      setEditingId(null);
      setShowForm(false);
      fetchBranches();
    } catch (error) {
      console.error("Error saving branch:", error);
      toast.error(editingId ? "Failed to update branch" : "Failed to create branch");
    }
  };

  const handleEdit = (branch) => {
    setFormData(branch);
    setEditingId(branch._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this branch?")) {
      try {
        await publicRequest.delete(`/branches/${id}`);
        toast.success("Branch deleted successfully");
        fetchBranches();
      } catch (error) {
        console.error("Error deleting branch:", error);
        toast.error("Failed to delete branch");
      }
    }
  };

  const handleCancel = () => {
    setFormData({ name: "", city: "", state: "", address: "", phone: "" });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="m-8">
      <ToastContainer />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Branch Management</h1>
        <p className="text-gray-400">Manage all courier branches and locations</p>
      </div>

      {/* Add Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-8 bg-gradient-to-r from-[#E9EB77] to-[#D9D964] hover:shadow-lg hover:shadow-yellow-500/40 text-[#0a0e27] font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2"
      >
        <FaPlus /> Add New Branch
      </button>

      {/* Form Modal */}
      {showForm && (
        <div className="mb-8 p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-white/10 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              {editingId ? "Edit Branch" : "Add New Branch"}
            </h2>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaTimes size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 font-semibold mb-2">Branch Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Downtown Branch"
                className="w-full bg-gray-700/50 border-2 border-gray-600 text-white p-3 rounded-lg outline-none transition-all duration-300 focus:border-[#E9EB77]"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-2">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="e.g., New York"
                className="w-full bg-gray-700/50 border-2 border-gray-600 text-white p-3 rounded-lg outline-none transition-all duration-300 focus:border-[#E9EB77]"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-2">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="e.g., New York"
                className="w-full bg-gray-700/50 border-2 border-gray-600 text-white p-3 rounded-lg outline-none transition-all duration-300 focus:border-[#E9EB77]"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="e.g., +1-800-123-4567"
                className="w-full bg-gray-700/50 border-2 border-gray-600 text-white p-3 rounded-lg outline-none transition-all duration-300 focus:border-[#E9EB77]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-300 font-semibold mb-2">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter full address"
                rows="3"
                className="w-full bg-gray-700/50 border-2 border-gray-600 text-white p-3 rounded-lg outline-none transition-all duration-300 focus:border-[#E9EB77]"
              />
            </div>

            <div className="md:col-span-2 flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                {editingId ? "Update Branch" : "Create Branch"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Branches Table */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-white/10">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading branches...</div>
        ) : branches.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            No branches found. Create one to get started!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-[#E9EB77] to-[#D9D964] text-[#0a0e27]">
                  <th className="px-6 py-4 text-left font-bold">Name</th>
                  <th className="px-6 py-4 text-left font-bold">City</th>
                  <th className="px-6 py-4 text-left font-bold">State</th>
                  <th className="px-6 py-4 text-left font-bold">Address</th>
                  <th className="px-6 py-4 text-left font-bold">Phone</th>
                  <th className="px-6 py-4 text-center font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {branches.map((branch, index) => (
                  <tr
                    key={branch._id}
                    className={`border-t border-white/10 transition-colors duration-300 ${
                      index % 2 === 0 ? "bg-gray-800/50" : "bg-gray-900/30"
                    } hover:bg-gray-700/50`}
                  >
                    <td className="px-6 py-4 text-white font-semibold">{branch.name}</td>
                    <td className="px-6 py-4 text-gray-300">{branch.city}</td>
                    <td className="px-6 py-4 text-gray-300">{branch.state}</td>
                    <td className="px-6 py-4 text-gray-400 text-sm max-w-xs truncate">
                      {branch.address}
                    </td>
                    <td className="px-6 py-4 text-gray-300 flex items-center gap-2">
                      <FaPhone className="text-[#E9EB77]" />
                      {branch.phone}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => handleEdit(branch)}
                          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-all duration-300 transform hover:scale-110"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(branch._id)}
                          className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg transition-all duration-300 transform hover:scale-110"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary Footer */}
      {branches.length > 0 && (
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-500/30">
          <p className="text-gray-300 text-center">
            Total Branches: <span className="font-bold text-[#E9EB77]">{branches.length}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Branches;
