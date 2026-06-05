const express = require("express");
const { getAssistantReply } = require("../services/aiService");
const { scoreTransferRisk } = require("../services/riskService");

const router = express.Router();

router.post("/assistant", async (req, res) => {
  try {
    const { message } = req.body;
    const reply = await getAssistantReply(message);

    res.json({
      reply
    });
  } catch (error) {
    res.status(500).json({
      error: "AI assistant failed"
    });
  }
});

router.post("/risk-score", (req, res) => {
  try {
    const result = scoreTransferRisk(req.body);

    res.json(result);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

module.exports = router;
