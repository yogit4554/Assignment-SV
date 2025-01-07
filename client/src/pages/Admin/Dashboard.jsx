import React, { useEffect, useState } from "react";
import api from "../../utils/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    borrowedBooks: 0,
    availableBooks: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/dashboard");
        setStats(data);
      } catch (error) {
        alert("Error fetching dashboard stats: " + error.response?.data?.message);
      }
    };
    fetchStats();
  }, []);

  return (
    <div
      className="min-h-screen p-4 flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(to right, #4b5563, #374151)", // Full-screen gradient background
        color: "#d1d5db", // Light text color
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", // Modern font type
      }}
    >
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-2xl text-center space-y-6">
        <h2 className="text-3xl font-semibold mb-4">Admin Dashboard</h2>
        <div className="space-y-4 text-lg">
          <p>
            <span className="font-bold">Total Books:</span> {stats.totalBooks}
          </p>
          <p>
            <span className="font-bold">Borrowed Books:</span> {stats.borrowedBooks}
          </p>
          <p>
            <span className="font-bold">Available Books:</span> {stats.availableBooks}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
