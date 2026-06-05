import { useEffect, useState } from "react";
import TransferForm from "./components/TransferForm.jsx";
import TransactionList from "./components/TransactionList.jsx";
import AiAssistant from "./components/AiAssistant.jsx";
import { getTransfers, getHealth } from "./services/api.js";

function App() {
  const [transfers, setTransfers] = useState([]);
  const [health, setHealth] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  async function loadTransfers() {
    try {
      const data = await getTransfers();
      setTransfers(data.transfers);
    } catch (error) {
      console.error("Failed to load transfers", error);
    }
  }

  async function loadHealth() {
    try {
      const data = await getHealth();
      setHealth(data);
    } catch (error) {
      setHealth({ status: "DOWN" });
    }
  }

  useEffect(() => {
    loadHealth();
    loadTransfers();
  }, [refreshKey]);

  function handleTransferCreated() {
    setRefreshKey((value) => value + 1);
  }

  return (
    <div className="app">
      <header className="hero">
        <div>
          <p className="eyebrow">Fintech + AI Portfolio Project</p>
          <h1>AI Remit Assistant</h1>
          <p>
            Send money, calculate fees, review AI-style fraud risk, and ask a
            transfer assistant for guidance.
          </p>
        </div>

        <div className="status-card">
          <span className={health?.status === "UP" ? "dot green" : "dot red"} />
          API Status: {health?.status || "Checking"}
        </div>
      </header>

      <main className="grid">
        <section className="panel">
          <TransferForm onTransferCreated={handleTransferCreated} />
        </section>

        <section className="panel">
          <AiAssistant />
        </section>

        <section className="panel wide">
          <TransactionList transfers={transfers} />
        </section>
      </main>
    </div>
  );
}

export default App;
