# AI Remit Assistant

A complete legal sample project inspired by fintech/remittance workflows.

This is NOT Western Union code and does not contain any proprietary client code.
It is a portfolio-ready full-stack demo showing:

- Money transfer quote calculation
- Transfer creation
- Transaction history
- AI assistant for transfer guidance
- AI-style fraud/risk scoring
- React frontend
- Node.js + Express backend
- Optional OpenAI integration if you add an API key

## Tech Stack

Frontend:
- React
- Vite
- Axios
- CSS

Backend:
- Node.js
- Express
- CORS
- dotenv
- UUID

## Run Locally

### 1. Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

### 2. Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## Optional OpenAI Setup

Create `backend/.env`:

```env
PORT=5000
OPENAI_API_KEY=your_api_key_here
```

If no API key is provided, the backend uses a mock AI response.

## API Endpoints

### Health Check

```http
GET /api/health
```

### Get Transfer Quote

```http
POST /api/quote
```

Body:

```json
{
  "sendAmount": 500,
  "sendCurrency": "USD",
  "receiveCurrency": "INR",
  "deliveryMethod": "bank"
}
```

### Create Transfer

```http
POST /api/transfers
```

Body:

```json
{
  "senderName": "Amrutha",
  "receiverName": "Sai",
  "receiverCountry": "India",
  "sendAmount": 500,
  "sendCurrency": "USD",
  "receiveCurrency": "INR",
  "purpose": "Family support",
  "deliveryMethod": "bank"
}
```

### List Transfers

```http
GET /api/transfers
```

### AI Assistant

```http
POST /api/ai/assistant
```

Body:

```json
{
  "message": "What is the safest way to send money?"
}
```

## Portfolio Note

You can add this to your resume as:

AI Remit Assistant — Full-Stack Fintech Transfer Platform  
React, Node.js, Express, REST APIs, AI Risk Scoring, OpenAI API, JavaScript

- Built a full-stack remittance workflow with quote calculation, transfer creation, transaction tracking, and AI-powered transfer guidance.
- Designed REST APIs for transfer quotes, fraud-risk scoring, and transaction history using Node.js and Express.
- Integrated mock/OpenAI-ready AI assistant logic to provide customer support and compliance-style guidance.
