import React, { useState } from "react";
import { toast } from "react-toastify";
import { apiRequest } from "../utils/api"; // Assuming you have an apiRequest helper
import { useNavigate } from "react-router-dom";

const TransferMoneyPage = () => {
  const [receiverEmail, setReceiverEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);  // State to manage modal visibility
  const [confirmationData, setConfirmationData] = useState({
    email: "",
    amount: "",
  });

  const navigate = useNavigate();

  // Handle the transfer process
  const handleTransfer = async (e) => {
    e.preventDefault();

    // Validate the input
    if (!receiverEmail || !amount || amount <= 0) {
      toast.error("Invalid input data. Please check the receiver's email and the amount.");
      return;
    }

    // Convert amount to number (ensure it's a valid number)
    const amountAsNumber = parseFloat(amount);
    if (isNaN(amountAsNumber)) {
      toast.error("Amount must be a valid number.");
      return;
    }

    // Set the confirmation data and show the modal
    setConfirmationData({ email: receiverEmail, amount: amountAsNumber });
    setShowModal(true);
  };

  // Handle the modal confirmation
  const handleConfirmTransfer = async () => {
    setLoading(true);
    setShowModal(false); // Close the modal

    try {
      const response = await apiRequest("/bank/transfer", "POST", {
        receiverEmail,
        amount: parseFloat(amount), // Ensure the amount is sent as a number
      });

      if (response.statusCode === 200) {
        toast.success("Transfer successful!");
        setReceiverEmail("");
        setAmount("");  // Reset amount after successful transfer
        navigate('/dashboard');
      } else {
        toast.error(response.message || "Transfer failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error during transfer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container pt-4">
      <h2 className="text-center mb-4">Transfer Money</h2>
      <div className="card p-4 shadow-sm">
        <form onSubmit={handleTransfer}>
          <div className="mb-3">
            <label className="form-label">Receiver's Email</label>
            <input
              type="email"
              className="form-control"
              value={receiverEmail}
              onChange={(e) => setReceiverEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Amount</label>
            <input
              type="number"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="1"
            />
          </div>
          <button className="btn btn-success w-100" type="submit" disabled={loading}>
            {loading ? "Processing..." : "Transfer"}
          </button>
        </form>
      </div>

      {/* Bootstrap Modal for Confirmation */}
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        id="confirmationModal"
        tabIndex="-1"
        aria-labelledby="confirmationModalLabel"
        aria-hidden={!showModal}
        style={{ display: showModal ? "block" : "none" }} // Manage visibility using state
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="confirmationModalLabel">
                Confirm Transfer
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to transfer <strong>{confirmationData.amount}</strong> to{" "}
                <strong>{confirmationData.email}</strong>?
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleConfirmTransfer}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferMoneyPage;
