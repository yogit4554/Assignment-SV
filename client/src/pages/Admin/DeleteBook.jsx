import React, { useState, useEffect } from "react";
import api from "../../utils/api";

const DeleteBook = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await api.get("/books/getBooks");
        setBooks(data.data);
      } catch (error) {
        alert("Error fetching books: " + error.response.data.message);
      }
    };
    fetchBooks();
  }, []);

  const handleDelete = async () => {
    if (!selectedBook) {
      alert("Please select a book to delete!");
      return;
    }
    try {
      await api.delete(`/books/${selectedBook}`);
      alert("Book deleted successfully!");
      window.location.reload();
    } catch (error) {
      alert("Error deleting book: " + error.response.data.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Delete a Book</h2>
      {books.length === 0 ? (
        <p>No books available to delete.</p>
      ) : (
        <>
          <select
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
          >
            <option value="">Select a Book to Delete</option>
            {books.map((book) => (
              <option key={book._id} value={book._id}>
                {book.title} by {book.author}
              </option>
            ))}
          </select>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            Delete Book
          </button>
        </>
      )}
    </div>
  );
};

export default DeleteBook;
