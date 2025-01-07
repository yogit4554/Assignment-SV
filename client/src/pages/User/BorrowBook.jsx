import React, { useEffect, useState } from "react";
import api from "../../utils/api";

const BorrowBook = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await api.get("/books/availability?available=true");
        setBooks(data.data);
      } catch (error) {
        alert("Error fetching available books: " + error.response.data.message);
      }
    };
    fetchBooks();
  }, []);

  const handleBorrow = async (bookId) => {
    try {
      await api.post("/transactions/borrow", { bookId });
      alert("Book borrowed successfully!");
      window.location.reload();
    } catch (error) {
      alert("Error borrowing book: " + error.response.data.message);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-600 text-white"
      style={{
        background: "linear-gradient(to right, #1f2937, #4b5563)",
        paddingBottom: "40px",
      }}
    >
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-semibold text-center mb-8">Borrow a Book</h2>

        {/* Book Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-gray-700 border border-gray-600 p-4 rounded shadow transition duration-300 hover:bg-gray-600"
            >
              <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
              <p className="text-sm text-gray-400 mb-2">{book.author}</p>
              <p className="text-sm text-gray-300 mb-4">{book.Year}</p>
              <button
                onClick={() => handleBorrow(book._id)}
                className="w-full bg-yellow-500 hover:bg-yellow-600 transition duration-300 text-white py-2 px-4 rounded-lg"
              >
                Borrow
              </button>
            </div>
          ))}
          {books.length === 0 && (
            <p className="col-span-full text-center text-gray-200">
              No available books.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BorrowBook;
