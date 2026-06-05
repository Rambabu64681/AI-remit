const exchangeRates = {
  "USD_INR": 83.15,
  "USD_MXN": 17.2,
  "USD_PHP": 57.6,
  "USD_EUR": 0.92,
  "USD_GBP": 0.78,
  "EUR_INR": 90.25,
  "GBP_INR": 105.4
};

function getFee(sendAmount, deliveryMethod) {
  const amount = Number(sendAmount);

  if (Number.isNaN(amount) || amount <= 0) {
    throw new Error("Send amount must be greater than 0");
  }

  let baseFee = 3.99;

  if (deliveryMethod === "cash") {
    baseFee = 5.99;
  }

  if (deliveryMethod === "wallet") {
    baseFee = 2.49;
  }

  if (amount > 1000) {
    baseFee += 7.5;
  }

  if (amount > 3000) {
    baseFee += 15;
  }

  return Number(baseFee.toFixed(2));
}

function getExchangeRate(sendCurrency, receiveCurrency) {
  if (sendCurrency === receiveCurrency) {
    return 1;
  }

  const key = `${sendCurrency}_${receiveCurrency}`;
  const rate = exchangeRates[key];

  if (!rate) {
    throw new Error(`Exchange rate not available for ${sendCurrency} to ${receiveCurrency}`);
  }

  return rate;
}

function calculateQuote({ sendAmount, sendCurrency, receiveCurrency, deliveryMethod }) {
  const amount = Number(sendAmount);
  const fee = getFee(amount, deliveryMethod);
  const exchangeRate = getExchangeRate(sendCurrency, receiveCurrency);
  const totalToPay = amount + fee;
  const receiveAmount = amount * exchangeRate;

  return {
    sendAmount: Number(amount.toFixed(2)),
    fee,
    totalToPay: Number(totalToPay.toFixed(2)),
    exchangeRate,
    receiveAmount: Number(receiveAmount.toFixed(2)),
    estimatedDelivery: deliveryMethod === "bank" ? "1-2 business days" : "Minutes",
    sendCurrency,
    receiveCurrency,
    deliveryMethod
  };
}

module.exports = {
  calculateQuote
};
