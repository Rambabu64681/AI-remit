import { useState } from "react";
import { createTransfer, getQuote } from "../services/api.js";

const initialForm = {
  senderName: "Amrutha",
  receiverName: "Sai",
  receiverCountry: "India",
  sendAmount: 500,
  sendCurrency: "USD",
  receiveCurrency: "INR",
  purpose: "Family support",
  deliveryMethod: "bank"
};

function TransferForm({ onTransferCreated }) {
  const [form, setForm] = useState(initialForm);
  const [quote, setQuote] = useState(null);
  const [createdTransfer, setCreatedTransfer] = useState(null);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value
    }));
  }

  async function handleQuote(event) {
    event.preventDefault();
    setError("");
    setCreatedTransfer(null);

    try {
      const data = await getQuote({
        sendAmount: Number(form.sendAmount),
        sendCurrency: form.sendCurrency,
        receiveCurrency: form.receiveCurrency,
        deliveryMethod: form.deliveryMethod
      });

      setQuote(data);
    } catch (err) {
      setError(err.response?.data?.error || "Unable to calculate quote");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      const data = await createTransfer({
        ...form,
        sendAmount: Number(form.sendAmount)
      });

      setCreatedTransfer(data);
      setQuote(data.quote);
      onTransferCreated();
    } catch (err) {
      setError(err.response?.data?.error || "Unable to create transfer");
    }
  }

  return (
    <div>
      <h2>Create Transfer</h2>
      <p className="muted">
        Demo workflow similar to a remittance platform transfer screen.
      </p>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          Sender Name
          <input
            name="senderName"
            value={form.senderName}
            onChange={handleChange}
          />
        </label>

        <label>
          Receiver Name
          <input
            name="receiverName"
            value={form.receiverName}
            onChange={handleChange}
          />
        </label>

        <label>
          Receiver Country
          <select
            name="receiverCountry"
            value={form.receiverCountry}
            onChange={handleChange}
          >
            <option>India</option>
            <option>Mexico</option>
            <option>Philippines</option>
            <option>United Kingdom</option>
            <option>Restricted</option>
          </select>
        </label>

        <label>
          Send Amount
          <input
            name="sendAmount"
            type="number"
            min="1"
            value={form.sendAmount}
            onChange={handleChange}
          />
        </label>

        <div className="two-col">
          <label>
            Send Currency
            <select
              name="sendCurrency"
              value={form.sendCurrency}
              onChange={handleChange}
            >
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
            </select>
          </label>

          <label>
            Receive Currency
            <select
              name="receiveCurrency"
              value={form.receiveCurrency}
              onChange={handleChange}
            >
              <option>INR</option>
              <option>MXN</option>
              <option>PHP</option>
              <option>EUR</option>
              <option>GBP</option>
            </select>
          </label>
        </div>

        <label>
          Delivery Method
          <select
            name="deliveryMethod"
            value={form.deliveryMethod}
            onChange={handleChange}
          >
            <option value="bank">Bank Account</option>
            <option value="cash">Cash Pickup</option>
            <option value="wallet">Mobile Wallet</option>
          </select>
        </label>

        <label>
          Purpose
          <textarea
            name="purpose"
            value={form.purpose}
            onChange={handleChange}
          />
        </label>

        {error && <div className="error">{error}</div>}

        <div className="button-row">
          <button type="button" onClick={handleQuote}>
            Calculate Quote
          </button>
          <button type="submit" className="primary">
            Send Money
          </button>
        </div>
      </form>

      {quote && (
        <div className="quote-card">
          <h3>Transfer Quote</h3>
          <p>Fee: {quote.fee} {quote.sendCurrency}</p>
          <p>Total To Pay: {quote.totalToPay} {quote.sendCurrency}</p>
          <p>Exchange Rate: {quote.exchangeRate}</p>
          <p>Receiver Gets: {quote.receiveAmount} {quote.receiveCurrency}</p>
          <p>Delivery: {quote.estimatedDelivery}</p>
        </div>
      )}

      {createdTransfer && (
        <div className="success">
          Transfer created. Status: {createdTransfer.status}. Risk:
          {" "}{createdTransfer.risk.riskLevel}
        </div>
      )}
    </div>
  );
}

export default TransferForm;
