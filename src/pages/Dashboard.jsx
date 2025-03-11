import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiRequest } from "../utils/api";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if user is logged in
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) {
          navigate("/login");
          return;
        }
        setUser(storedUser);

        // Fetch balance
        const balanceResponse = await apiRequest("/bank/balance", "GET");
          setBalance(balanceResponse.balance);


        // Fetch transactions
        const transactionsResponse = await apiRequest("/bank/transactions", "GET");
          setTransactions(transactionsResponse.transactions);
      } catch (error) {
        toast.error("Error fetching data.");
        console.error(error);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Format email (hide part of receiverEmail)
  const formatEmail = (email) => {
    if (!email) return "N/A";
    const [name, domain] = email.split("@");
    return `${name.slice(0, 2)}***@${domain}`;
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.info("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Welcome, {user}!</h2>
      <div className="card p-3 mt-3 shadow">
        <h4>Account Balance: {balance !== null ? balance.toFixed(2) : "  Loading..."}$</h4>
      </div>

      <div className="card mt-3 p-3 shadow">
        <h4>Transaction History</h4>
        {transactions.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped table-bordered mt-3">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Receiver</th>
                  <th>Amount ($)</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{formatEmail(transaction.receiverEmail)}</td>
                    <td>{transaction.amount}</td>
                    <td>{new Date(transaction.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center">No transactions available.</p>
        )}
      </div>

      <button className="btn btn-danger mt-3" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
