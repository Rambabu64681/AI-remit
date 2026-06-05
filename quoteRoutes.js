const express = require("express");
const { calculateQuote } = require("../services/quoteService");

const router = express.Router();

router.post("/", (req, res) => {
  try {
    const { sendAmount, sendCurrency, receiveCurrency, deliveryMethod } = req.body;

    if (!sendAmount || !sendCurrency || !receiveCurrency || !deliveryMethod) {
      return res.status(400).json({
        error: "sendAmount, sendCurrency, receiveCurrency, and deliveryMethod are required"
      });
    }

    const quote = calculateQuote({
      sendAmount,
      sendCurrency,
      receiveCurrency,
      deliveryMethod
    });

    res.json(quote);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

module.exports = router;
