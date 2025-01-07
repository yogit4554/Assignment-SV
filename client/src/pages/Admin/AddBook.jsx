import React, { useState } from "react";
import axios from "axios";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publicationYear, setPublicationYear] = useState("");

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await axios.post(
        "/api/v1/books/addBook",
        { title, author, publicationYear },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      alert("Book added successfully!");
    } catch (error) {
      alert("Failed to add book: " + error.response.data.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(to right, #4b5563, #374151)", // Full-screen gradient background
        color: "#d1d5db", // Light text color
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", // Modern font type
      }}
    >
      <form
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-center"
        onSubmit={handleAddBook}
      >
        <h2 className="text-3xl font-semibold mb-6 text-white">Add Book</h2>
        <div className="space-y-4">
          <input
            type="text"
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          <input
            type="number"
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Publication Year"
            value={publicationYear}
            onChange={(e) => setPublicationYear(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
