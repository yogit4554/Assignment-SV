import React, { useEffect, useState } from "react";
import api from "../../utils/api";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data } = await api.get("/transactions");
        setTransactions(data.data);
      } catch (error) {
        alert("Error fetching transactions: " + error.response.data.message);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div
      className="min-h-screen p-4"
      style={{
        background: "linear-gradient(to right, #4b5563, #374151)", // Full-screen gradient background
        color: "#d1d5db", // Light text color
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", // Updated font type
      }}
    >
      <h2 className="text-3xl font-semibold mb-6 text-center">All Transactions</h2>
      {transactions.length > 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-700">
              <th className="border border-gray-300 p-3 text-white">Book Title</th>
              <th className="border border-gray-300 p-3 text-white">User Name</th>
              <th className="border border-gray-300 p-3 text-white">Borrow Date</th>
              <th className="border border-gray-300 p-3 text-white">Return Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx._id} className="text-center text-gray-200">
                <td className="border border-gray-300 p-3">{tx.bookId?.title}</td>
                <td className="border border-gray-300 p-3">{tx.userId?.name}</td>
                <td className="border border-gray-300 p-3">{new Date(tx.borrowDate).toLocaleDateString()}</td>
                <td className="border border-gray-300 p-3">
                  {tx.returnDate ? new Date(tx.returnDate).toLocaleDateString() : "Not Returned"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-white">No transactions found.</p>
      )}
    </div>
  );
};

export default Transactions;
