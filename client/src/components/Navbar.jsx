import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation(); // To track the current path

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload(); // Refresh to clear state
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className="bg-gray-800 text-white shadow-lg"
      style={{ background: "linear-gradient(to right, #1f2937, #4b5563)" }}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Library Management
        </h1>
        <div className="flex items-center space-x-4">
          {!user ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className={`px-4 py-2 rounded-lg transition duration-300 text-sm font-semibold ${
                  isActive("/login") ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className={`px-4 py-2 rounded-lg transition duration-300 text-sm font-semibold ${
                  isActive("/register") ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                Register
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/allbooks")}
                className={`px-4 py-2 rounded-lg transition duration-300 text-sm font-semibold ${
                  isActive("/allbooks") ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                All Books
              </button>
              {user.role === "admin" && (
                <>
                  <button
                    onClick={() => navigate("/dashboard")}
                    className={`px-4 py-2 rounded-lg transition duration-300 text-sm font-semibold ${
                      isActive("/dashboard")
                        ? "bg-blue-600"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => navigate("/addbook")}
                    className={`px-4 py-2 rounded-lg transition duration-300 text-sm font-semibold ${
                      isActive("/addbook")
                        ? "bg-blue-600"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    Add Book
                  </button>
                  <button
                    onClick={() => navigate("/allbooks")}
                    className={`px-4 py-2 rounded-lg transition duration-300 text-sm font-semibold ${
                      isActive("/allbooks")
                        ? "bg-blue-600"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    Update Book
                  </button>
                  <button
                    onClick={() => navigate("/transactions")}
                    className={`px-4 py-2 rounded-lg transition duration-300 text-sm font-semibold ${
                      isActive("/transactions")
                        ? "bg-blue-600"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    Transactions
                  </button>
                </>
              )}
              {user.role === "user" && (
                <>
                  <button
                    onClick={() => navigate("/borrow")}
                    className={`px-4 py-2 rounded-lg transition duration-300 text-sm font-semibold ${
                      isActive("/borrow")
                        ? "bg-blue-600"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    Borrow Book
                  </button>
                  <button
                    onClick={() => navigate("/return")}
                    className={`px-4 py-2 rounded-lg transition duration-300 text-sm font-semibold ${
                      isActive("/return")
                        ? "bg-blue-600"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    Return Book
                  </button>
                  <button
                    onClick={() => navigate("/transactions")}
                    className={`px-4 py-2 rounded-lg transition duration-300 text-sm font-semibold ${
                      isActive("/transactions")
                        ? "bg-blue-600"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    Transactions
                  </button>
                </>
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition duration-300 text-sm font-semibold"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;