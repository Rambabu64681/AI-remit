const express = require("express");
const { v4: uuidv4 } = require("uuid");

const transfers = require("../data/transfers");
const { calculateQuote } = require("../services/quoteService");
const { scoreTransferRisk } = require("../services/riskService");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    count: transfers.length,
    transfers
  });
});

router.get("/:id", (req, res) => {
  const transfer = transfers.find((item) => item.id === req.params.id);

  if (!transfer) {
    return res.status(404).json({
      error: "Transfer not found"
    });
  }

  res.json(transfer);
});

router.post("/", (req, res) => {
  try {
    const {
      senderName,
      receiverName,
      receiverCountry,
      sendAmount,
      sendCurrency,
      receiveCurrency,
      purpose,
      deliveryMethod
    } = req.body;

    if (
      !senderName ||
      !receiverName ||
      !receiverCountry ||
      !sendAmount ||
      !sendCurrency ||
      !receiveCurrency ||
      !deliveryMethod
    ) {
      return res.status(400).json({
        error:
          "senderName, receiverName, receiverCountry, sendAmount, sendCurrency, receiveCurrency, and deliveryMethod are required"
      });
    }

    const quote = calculateQuote({
      sendAmount,
      sendCurrency,
      receiveCurrency,
      deliveryMethod
    });

    const risk = scoreTransferRisk({
      senderName,
      receiverName,
      receiverCountry,
      sendAmount,
      purpose,
      deliveryMethod
    });

    const status = risk.riskLevel === "HIGH" ? "UNDER_REVIEW" : "CREATED";

    const transfer = {
      id: uuidv4(),
      senderName,
      receiverName,
      receiverCountry,
      purpose: purpose || "Not specified",
      status,
      quote,
      risk,
      createdAt: new Date().toISOString()
    };

    transfers.unshift(transfer);

    res.status(201).json(transfer);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

module.exports = router;
