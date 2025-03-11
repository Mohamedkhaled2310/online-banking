import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiRequest } from "../utils/api";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const handleTransferRedirect = useCallback(() => {
    navigate("/transfer");
  }, [navigate]);

  const fetchUserData = useCallback(async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);

      const balanceResponse = await apiRequest("/bank/balance", "GET");
      if (balanceResponse.statusCode === 200) {
        setBalance(balanceResponse.balance);
      }

      const transactionsResponse = await apiRequest(
        `/bank/transactions?page=${currentPage}`,
        "GET"
      );
      if (transactionsResponse.statusCode === 200) {
        setTransactions(transactionsResponse.transactions);
        setTotalPages(transactionsResponse.totalPages);
      }
    } catch (error) {
      toast.error("Error fetching data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const formatEmail = useCallback((email) => {
    if (!email) return "N/A";
    const [name, domain] = email.split("@");
    return `${name.slice(0, 2)}***@${domain}`;
  }, []);

  const formatSenderReceiver = useCallback(
    (email) => {
      if (!email) return "N/A";
      return email === "me" ? "me" : formatEmail(email);
    },
    [ formatEmail]
  );

  const handleLogout = useCallback(() => {
    localStorage.removeItem("user");
    toast.info("Logged out successfully!");
    navigate("/login");
  }, [navigate]);

  const handlePageChange = useCallback(
    (page) => {
      if (page < 1 || page > totalPages) return;
      setCurrentPage(page);
    },
    [totalPages]
  );

  const transactionRows = useMemo(() => {
    return transactions.map((transaction, index) => (
      <tr key={index}>
        <td>{(currentPage - 1) * 5 + index + 1}</td>
        <td>{formatSenderReceiver(transaction.sender)}</td>
        <td>{formatSenderReceiver(transaction.receiver)}</td>
        <td>{transaction.amount}</td>
        <td>{new Date(transaction.timestamp).toLocaleString()}</td>
      </tr>
    ));
  }, [transactions, currentPage, formatSenderReceiver]);

  return (
    <div className="container-fluid pt-4">
      <h2 className="text-center">Welcome, {user ? user : ""}!</h2>
      <div className="card p-3 mt-3 shadow">
        <h4>Account Balance: {balance !== null ? `${balance.toFixed(2)}$` : "Loading..."}</h4>
      </div>

      <div className="card mt-3 p-3 shadow">
        <h4>Transaction History</h4>
        {loading ? (
          <div className="text-center">Loading transactions...</div>
        ) : transactions.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped table-bordered mt-3">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Sender</th>
                  <th>Receiver</th>
                  <th>Amount ($)</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>{transactionRows}</tbody>
            </table>
          </div>
        ) : (
          <p className="text-center">No transactions available.</p>
        )}
      </div>

      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-secondary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-3">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-secondary"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <div className="d-flex flex-column text-align-center justify-content-between">
        <button className="btn btn-success mt-3 w-25" onClick={handleTransferRedirect}>
          Make a Transfer
        </button>
        <button className="btn btn-danger mt-3 w-25" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default React.memo(Dashboard);