import { useState } from "react";
import { askAssistant } from "../services/api.js";

function AiAssistant() {
  const [message, setMessage] = useState("What is the safest way to send money?");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAsk(event) {
    event.preventDefault();
    setLoading(true);
    setReply("");

    try {
      const data = await askAssistant(message);
      setReply(data.reply);
    } catch (error) {
      setReply("Assistant is unavailable. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>AI Transfer Assistant</h2>
      <p className="muted">
        Ask about fees, delivery times, fraud safety, or transfer limits.
      </p>

      <form onSubmit={handleAsk} className="form">
        <label>
          Question
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </label>

        <button className="primary" disabled={loading}>
          {loading ? "Thinking..." : "Ask AI Assistant"}
        </button>
      </form>

      {reply && (
        <div className="assistant-reply">
          <strong>Assistant:</strong>
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
}

export default AiAssistant;
