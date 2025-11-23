import { FaTrash, FaUserPlus, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { useEffect } from "react";
import { useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const res = await publicRequest.get("/users");
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await publicRequest.delete(`/users/${id}`);
        setUsers(users.filter((user) => user._id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0f1428] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <FaUsers className="text-[#E9EB77]" />
              All Users
            </h1>
            <p className="text-gray-400">Manage all system users</p>
          </div>
          <Link to="/newuser">
            <button className="bg-gradient-to-r from-[#E9EB77] to-[#D9D964] hover:shadow-lg text-[#0a0e27] font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center gap-2 transform hover:scale-105">
              <FaUserPlus />
              New User
            </button>
          </Link>
        </div>

        {/* Users Grid */}
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-gray-400 text-xl">Loading users...</div>
          </div>
        ) : users.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-12 border border-white/10 text-center">
            <FaUsers className="text-6xl text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl text-gray-400 mb-2">No users found</h3>
            <p className="text-gray-500">Add a new user to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg p-6 border border-white/10 hover:border-[#E9EB77]/30 transition-all duration-300 transform hover:scale-105"
              >
                {/* User Header */}
                <div className="flex items-start justify-between mb-4 pb-4 border-b border-white/10">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    {user.fullname.charAt(0).toUpperCase()}
                  </div>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/20 p-2 rounded-lg transition-all"
                    title="Delete user"
                  >
                    <FaTrash className="text-lg" />
                  </button>
                </div>

                {/* User Info */}
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">Name</p>
                    <p className="text-white font-semibold text-lg">{user.fullname}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm font-medium">Email</p>
                    <p className="text-white text-sm truncate">{user.email}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-gray-400 text-sm font-medium">Age</p>
                      <p className="text-white font-semibold">{user.age}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm font-medium">Country</p>
                      <p className="text-white font-semibold">{user.country || "N/A"}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm font-medium">Role</p>
                    <span className="inline-block mt-1 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-medium border border-blue-500/30">
                      {user.role || "User"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary Footer */}
        {!loading && users.length > 0 && (
          <div className="mt-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-4 text-center">
            <p className="text-gray-300">
              Total Users: <span className="font-bold text-[#E9EB77]">{users.length}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
