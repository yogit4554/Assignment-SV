import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api.js";

const AllBooks = ({ user }) => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await api.get("/books/getBooks");
        setBooks(data.data);
      } catch (error) {
        alert("Failed to fetch books.");
      }
    };
    fetchBooks();
  }, []);

  const handleDelete = async (bookId) => {
    try {
      await api.delete(`/books/${bookId}`);
      setBooks(books.filter((book) => book._id !== bookId));
      alert("Book deleted successfully.");
    } catch (error) {
      alert("Error deleting the book.");
    }
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.publicationYear.toString().includes(searchQuery)
  );

  return (
    <div
      className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-600 text-white"
      style={{
        background: "linear-gradient(to right, #1f2937, #4b5563)",
        paddingBottom: "40px",
      }}
    >
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-semibold text-center mb-8">Library Books</h2>

        {/* Search Bar */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-full sm:w-2/3 lg:w-1/2">
            <input
              type="text"
              placeholder="Search by title, author, or year"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none"
            />
            {searchQuery && (
              <button
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-400 text-gray-900 rounded-full w-6 h-6 flex items-center justify-center"
                onClick={() => setSearchQuery("")}
              >
                &times;
              </button>
            )}
          </div>
        </div>

        {/* Book Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <div key={book._id} className="bg-gray-700 border border-gray-600 p-4 rounded shadow">
              <h3 className="font-bold text-lg mb-2">{book.title}</h3>
              <p className="mb-1">Author: {book.author}</p>
              <p className="mb-1">Year: {book.publicationYear}</p>
              <p className="mb-2">Status: {book.availabilityStatus ? "Available" : "Borrowed"}</p>
              {user && user.role === "admin" && (
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => navigate(`/updatebook/${book._id}`)}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="bg-red-500 text-white py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}

          {filteredBooks.length === 0 && (
            <p className="col-span-full text-center text-gray-200">
              No books found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllBooks;