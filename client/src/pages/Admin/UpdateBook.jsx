import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";

const UpdateBook = () => {
  const { id } = useParams(); // Getting the book ID from URL params
  const [book, setBook] = useState({ title: "", author: "", publicationYear: "" });

  // Fetch the book details based on the provided ID
  useEffect(() => {
    const fetchBook = async () => {
      try {
        console.log("Fetching book with ID:", id); // Log the ID to ensure it's correct
        const { data } = await api.get(`/books/${id}`); // Fetching the book
        setBook(data); // Assuming response data is the book object
      } catch (error) {
        console.error("Error fetching book details:", error);
        alert("Error fetching book details: " + (error.response?.data?.message || error.message));
      }
    };
    fetchBook();
  }, [id]); // Runs when the component mounts or `id` changes

  // Handle book update on form submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Ensure publicationYear is sent as a string (in case it's a number field)
      const updatedBook = { 
        title: book.title, 
        author: book.author, 
        publicationYear: book.publicationYear.toString() 
      };

      // Making the PUT request to update the book
      await api.put(`/books/${id}`, updatedBook);

      alert("Book updated successfully!");
    } catch (error) {
      console.error("Error updating book:", error);
      alert("Error updating book: " + (error.response?.data?.message || error.message));
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
        onSubmit={handleUpdate}
      >
        <h2 className="text-3xl font-semibold mb-6 text-white">Update Book</h2>
        <div className="space-y-4">
          <input
            type="text"
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Title"
            value={book.title}
            onChange={(e) => setBook({ ...book, title: e.target.value })}
            required
          />
          <input
            type="text"
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Author"
            value={book.author}
            onChange={(e) => setBook({ ...book, author: e.target.value })}
            required
          />
          <input
            type="number"
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Publication Year"
            value={book.publicationYear}
            onChange={(e) => setBook({ ...book, publicationYear: e.target.value })}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Update Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBook;
