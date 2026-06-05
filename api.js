import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

export async function getHealth() {
  const response = await api.get("/health");
  return response.data;
}

export async function getQuote(payload) {
  const response = await api.post("/quote", payload);
  return response.data;
}

export async function createTransfer(payload) {
  const response = await api.post("/transfers", payload);
  return response.data;
}

export async function getTransfers() {
  const response = await api.get("/transfers");
  return response.data;
}

export async function askAssistant(message) {
  const response = await api.post("/ai/assistant", { message });
  return response.data;
}
