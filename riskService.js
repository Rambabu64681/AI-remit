function scoreTransferRisk(transfer) {
  let score = 10;
  const reasons = [];

  const amount = Number(transfer.sendAmount);

  if (amount >= 1000) {
    score += 20;
    reasons.push("High-value transfer");
  }

  if (amount >= 3000) {
    score += 30;
    reasons.push("Very high transfer amount");
  }

  if (!transfer.purpose || transfer.purpose.trim().length < 5) {
    score += 15;
    reasons.push("Transfer purpose is unclear");
  }

  if (transfer.deliveryMethod === "cash") {
    score += 10;
    reasons.push("Cash pickup requires additional identity checks");
  }

  const highReviewCountries = ["Unknown", "Restricted"];
  if (highReviewCountries.includes(transfer.receiverCountry)) {
    score += 25;
    reasons.push("Receiver country requires manual review");
  }

  let level = "LOW";
  if (score >= 70) {
    level = "HIGH";
  } else if (score >= 40) {
    level = "MEDIUM";
  }

  return {
    riskScore: Math.min(score, 100),
    riskLevel: level,
    reasons: reasons.length ? reasons : ["Normal transfer pattern"]
  };
}

module.exports = {
  scoreTransferRisk
};
