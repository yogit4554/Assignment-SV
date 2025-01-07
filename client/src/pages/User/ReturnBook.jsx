import React, { useEffect, useState } from "react";
import api from "../../utils/api";

const ReturnBook = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState("");

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const { data } = await api.get(`/transactions/user/${user._id}`);
        const borrowedBooks = data.data.filter((tx) => !tx.returnDate); // Get books that haven't been returned
        setTransactions(borrowedBooks);
      } catch (error) {
        alert("Error fetching borrowed books: " + error.response.data.message);
      }
    };
    fetchBorrowedBooks();
  }, []);

  const handleReturn = async () => {
    if (!selectedTransaction) {
      alert("Please select a book to return!");
      return;
    }
    try {
      await api.post("/transactions/return", { bookId: selectedTransaction });
      alert("Book returned successfully!");
      window.location.reload();
    } catch (error) {
      alert("Error returning book: " + error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-600 p-4">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-6">
        <h2 className="text-3xl font-semibold mb-4 text-center">Return a Book</h2>
        {transactions.length === 0 ? (
          <p className="text-gray-400 text-center">You have not borrowed any books.</p>
        ) : (
          <>
            <select
              className="w-full mb-4 p-2 border border-gray-300 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedTransaction}
              onChange={(e) => setSelectedTransaction(e.target.value)}
            >
              <option value="">Select a Book to Return</option>
              {transactions.map((tx) => (
                <option key={tx._id} value={tx.bookId?._id}>
                  {tx.bookId?.title} by {tx.bookId?.author}
                </option>
              ))}
            </select>
            <button
              onClick={handleReturn}
              className="w-full bg-red-500 hover:bg-red-600 transition duration-300 text-white py-3 rounded-lg"
            >
              Return Book
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ReturnBook;
