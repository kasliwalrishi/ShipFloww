import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { FaBox, FaCheckCircle, FaClock, FaChartLine } from "react-icons/fa";

const Home = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    deliveredParcels: 0,
    pendingParcels: 0,
    recentUsers: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, parcelsRes, allUsersRes] = await Promise.all([
          publicRequest.get("/users/stats/overview"),
          publicRequest.get("/parcels/stats/overview"),
          publicRequest.get("/users"),
        ]);

        const recentUsers = allUsersRes.data.slice(0, 3);

        setStats({
          totalUsers: usersRes.data.totalUsers,
          deliveredParcels: parcelsRes.data.delivered,
          pendingParcels: parcelsRes.data.pending,
          recentUsers,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchStats();
  }, []);

  const StatCard = ({ icon: Icon, title, value, bgColor, trend }) => (
    <div className={`${bgColor} rounded-lg shadow-lg p-6 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer backdrop-blur-sm`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium opacity-90 mb-2">{title}</p>
          <h3 className="text-4xl font-bold">{value}</h3>
          {trend && (
            <p className="text-xs mt-2 opacity-75">
              <FaChartLine className="inline mr-1" />
              {trend} from last month
            </p>
          )}
        </div>
        <div className="bg-white/20 rounded-full p-3">
          <Icon className="text-2xl" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0f1428] p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back! Here's your delivery overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={FaBox}
          title="Total Users"
          value={stats.totalUsers}
          bgColor="bg-gradient-to-br from-blue-600 to-blue-800"
          trend="↑ 12%"
        />
        <StatCard
          icon={FaCheckCircle}
          title="Delivered"
          value={stats.deliveredParcels}
          bgColor="bg-gradient-to-br from-green-600 to-green-800"
          trend="↑ 8%"
        />
        <StatCard
          icon={FaClock}
          title="Pending"
          value={stats.pendingParcels}
          bgColor="bg-gradient-to-br from-orange-600 to-orange-800"
          trend="↓ 5%"
        />
        <StatCard
          icon={FaChartLine}
          title="Total Parcels"
          value={stats.deliveredParcels + stats.pendingParcels}
          bgColor="bg-gradient-to-br from-purple-600 to-purple-800"
          trend="↑ 18%"
        />
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pie Chart */}
        <div className="lg:col-span-1 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-2xl p-6">
          <h2 className="text-white text-xl font-bold mb-4">Parcel Status Distribution</h2>
          <div className="flex justify-center">
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: stats.deliveredParcels, label: "Delivered", color: "#10b981" },
                    { id: 1, value: stats.pendingParcels, label: "Pending", color: "#f59e0b" },
                    { id: 2, value: 0, label: "Rejected", color: "#ef4444" },
                  ],
                  innerRadius: 40,
                  outerRadius: 100,
                  paddingAngle: 5,
                  cornerRadius: 5,
                  startAngle: -100,
                  endAngle: 180,
                  cx: 120,
                  cy: 120,
                },
              ]}
            />
          </div>
        </div>

        {/* Recent Users */}
        <div className="lg:col-span-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-2xl p-6">
          <h2 className="text-white text-xl font-bold mb-4">Recent Users</h2>
          <div className="space-y-4">
            {stats.recentUsers.length > 0 ? (
              stats.recentUsers.map((user, index) => (
                <div
                  key={user._id}
                  className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:translate-x-2"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {user.fullname.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold">{user.fullname}</p>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">User #{index + 1}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No recent users</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/30 rounded-lg p-4">
          <p className="text-green-300 text-sm font-medium">Delivery Rate</p>
          <p className="text-2xl font-bold text-green-400 mt-2">
            {stats.deliveredParcels + stats.pendingParcels > 0
              ? ((stats.deliveredParcels / (stats.deliveredParcels + stats.pendingParcels)) * 100).toFixed(1)
              : 0}
            %
          </p>
        </div>
        <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-lg p-4">
          <p className="text-blue-300 text-sm font-medium">Active Users</p>
          <p className="text-2xl font-bold text-blue-400 mt-2">{stats.totalUsers}</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-purple-500/30 rounded-lg p-4">
          <p className="text-purple-300 text-sm font-medium">Pending Delivery</p>
          <p className="text-2xl font-bold text-purple-400 mt-2">{stats.pendingParcels}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
