import { useState } from "react";
import { FaSave, FaTimes, FaUser, FaBirthdayCake, FaCheckCircle, FaEnvelope } from "react-icons/fa";

const Settings = () => {
  const [formData, setFormData] = useState({
    name: "Admin User",
    age: 28,
  });

  const [savedData, setSavedData] = useState({
    name: "Admin User",
    age: 28,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "age" ? parseInt(value) : value,
    });
  };

  const handleSave = () => {
    // Validate inputs
    if (!formData.name.trim()) {
      alert("Name cannot be empty");
      return;
    }
    if (formData.age < 18 || formData.age > 120) {
      alert("Age must be between 18 and 120");
      return;
    }

    // Save changes
    setSavedData(formData);
    setIsEditing(false);
    setSuccessMessage("Settings saved successfully!");

    // Clear success message after 3 seconds
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleCancel = () => {
    setFormData(savedData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0f1428] p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage and update your profile information</p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 flex items-center gap-3">
            <FaCheckCircle className="text-green-400 text-xl" />
            <p className="text-green-300 font-semibold">{successMessage}</p>
          </div>
        )}

        {/* Settings Card */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 border border-white/10 mb-8">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#E9EB77] to-[#D9D964] flex items-center justify-center">
              <FaUser className="text-[#0a0e27]" />
            </div>
            Edit Profile
          </h2>
          {/* Editable Name Field */}
          <div className="mb-8">
            <label className="text-gray-300 font-semibold text-sm mb-3 flex items-center gap-2">
              <FaUser className="text-[#E9EB77]" />
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-gray-700/50 text-white p-4 rounded-lg border-2 border-[#E9EB77] outline-none transition focus:border-[#D9D964] focus:shadow-lg"
                placeholder="Enter your name"
              />
            ) : (
              <div className="bg-gray-700/50 p-4 rounded-lg border border-white/10">
                <p className="text-white text-lg font-semibold">{savedData.name}</p>
              </div>
            )}
          </div>

          {/* Editable Age Field */}
          <div className="mb-8">
            <label className="text-gray-300 font-semibold text-sm mb-3 flex items-center gap-2">
              <FaBirthdayCake className="text-[#E9EB77]" />
              Age
            </label>
            {isEditing ? (
              <div>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  min="18"
                  max="120"
                  className="w-full bg-gray-700/50 text-white p-4 rounded-lg border-2 border-[#E9EB77] outline-none transition focus:border-[#D9D964] focus:shadow-lg"
                  placeholder="Enter your age"
                />
                <p className="text-gray-400 text-sm mt-2">Age must be between 18 and 120</p>
              </div>
            ) : (
              <div className="bg-gray-700/50 p-4 rounded-lg border border-white/10">
                <p className="text-white text-lg font-semibold">{savedData.age} years old</p>
              </div>
            )}
          </div>

          {/* Email Field (Read-only) */}
          <div className="mb-8">
            <label className="text-gray-300 font-semibold text-sm mb-3 flex items-center gap-2">
              <FaEnvelope className="text-blue-400" />
              Email Address (Fixed)
            </label>
            <div className="bg-gray-700/30 p-4 rounded-lg border border-blue-500/30 cursor-not-allowed">
              <p className="text-blue-300 text-lg font-semibold">admin@shipfloww.com</p>
              <p className="text-gray-400 text-sm mt-2">Email address cannot be changed</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end mt-10 pt-8 border-t border-white/10">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="bg-red-500/20 hover:bg-red-500/30 text-red-300 font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center gap-2 border border-red-500/30 hover:border-red-500/50"
                >
                  <FaTimes />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:shadow-lg text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
                >
                  <FaSave />
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-gradient-to-r from-[#E9EB77] to-[#D9D964] hover:shadow-lg text-[#0a0e27] font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Edit Settings
              </button>
            )}
          </div>
        </div>

        {/* Account Information Card */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-6">Account Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-700/50 rounded-lg p-4 border border-white/10">
              <p className="text-gray-400 text-sm font-medium mb-2">Account Type</p>
              <p className="text-white font-semibold">Administrator</p>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4 border border-white/10">
              <p className="text-gray-400 text-sm font-medium mb-2">Status</p>
              <span className="inline-block px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm font-medium border border-green-500/30">Active</span>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4 border border-white/10">
              <p className="text-gray-400 text-sm font-medium mb-2">Last Updated</p>
              <p className="text-white font-semibold">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
