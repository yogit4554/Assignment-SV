import React, { useEffect, useState } from "react";
import api from "../../utils/api";

const UserTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const { data } = await api.get(`/transactions/user/${user._id}`);
        setTransactions(data.data);
      } catch (error) {
        alert("Error fetching transactions: " + error.response.data.message);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(to right, #1f2937, #4b5563)", // Full-screen gradient background
        color: "#f9fafb", // Light text color
      }}
    >
      <div className="p-4 w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 align-middle">Your Transactions</h2>
        {transactions.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-800">
                <th className="border border-gray-300 p-2 text-white">Book Title</th>
                <th className="border border-gray-300 p-2 text-white">Borrow Date</th>
                <th className="border border-gray-300 p-2 text-white">Return Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx._id} className="text-center">
                  <td className="border border-gray-300 p-2">{tx.bookId?.title}</td>
                  <td className="border border-gray-300 p-2">{new Date(tx.borrowDate).toLocaleDateString()}</td>
                  <td className="border border-gray-300 p-2">
                    {tx.returnDate ? new Date(tx.returnDate).toLocaleDateString() : "Not Returned"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-white">No transactions found.</p> // Text color adjustment
        )}
      </div>
    </div>
  );
};

export default UserTransactions;
