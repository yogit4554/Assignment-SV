import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AllBooks from "./pages/AllBook";
import Dashboard from "./pages/admin/Dashboard";
import AddBook from "./pages/admin/AddBook";
import UpdateBook from "./pages/admin/UpdateBook";
import Transactions from "./pages/admin/Transactions";
import BorrowBook from "./pages/User/BorrowBook";
import ReturnBook from "./pages/User/ReturnBook";
import UserTransactions from "./pages/user/UserTransactions";
import DeleteBook from "./pages/Admin/DeleteBook";


const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <Router className="min-h-screen bg-gray-100">
      <Navbar user={user} />
      <Routes>
        {!user ? (
          <>
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : user.role === "admin" ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/allbooks" element={<AllBooks user={user} />} />
            <Route path="/addbook" element={<AddBook />} />
            <Route path="/updatebook/:id" element={<UpdateBook />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/deletebook" element={<DeleteBook />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        ) : (
          <>
            <Route path="/allbooks" element={<AllBooks user={user}/>} />
            <Route path="/borrow" element={<BorrowBook />} />
            <Route path="/return" element={<ReturnBook />} />
            <Route path="/transactions" element={<UserTransactions />} />
            <Route path="*" element={<Navigate to="/allbooks" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
