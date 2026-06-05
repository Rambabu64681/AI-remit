async function getAssistantReply(message) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!message || message.trim().length === 0) {
    return "Please enter your transfer-related question.";
  }

  if (!apiKey) {
    return getMockAssistantReply(message);
  }

  // Optional OpenAI integration.
  // This uses native fetch available in Node 18+.
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful fintech remittance assistant. Give safe, simple, compliance-aware transfer guidance. Do not provide legal advice."
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.3
      })
    });

    if (!response.ok) {
      return getMockAssistantReply(message);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || getMockAssistantReply(message);
  } catch (error) {
    console.error("AI service fallback:", error.message);
    return getMockAssistantReply(message);
  }
}

function getMockAssistantReply(message) {
  const lower = message.toLowerCase();

  if (lower.includes("fee")) {
    return "Fees depend on transfer amount, destination currency, and delivery method. Bank transfers usually cost less than cash pickup.";
  }

  if (lower.includes("safe") || lower.includes("fraud")) {
    return "For safer transfers, send money only to people you personally know, verify receiver details, avoid urgent scam requests, and keep your receipt.";
  }

  if (lower.includes("time") || lower.includes("delivery")) {
    return "Wallet and cash pickup transfers may arrive within minutes. Bank transfers usually take 1-2 business days.";
  }

  if (lower.includes("limit")) {
    return "Transfer limits depend on verification level, destination country, and payment method. Larger transfers may require manual review.";
  }

  return "I can help with transfer fees, delivery time, safety checks, receiver details, and transaction status. Please ask a specific transfer question.";
}

module.exports = {
  getAssistantReply
};
