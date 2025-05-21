const currencyList = ["USD", "EUR", "GBP", "INR", "JPY", "CAD", "AUD", "CNY", "BRL"];

window.onload = () => {
  const fromCurrency = document.getElementById('fromCurrency');
  const toCurrency = document.getElementById('toCurrency');
  
  currencyList.forEach(curr => {
    fromCurrency.innerHTML += `<option value="${curr}">${curr}</option>`;
    toCurrency.innerHTML += `<option value="${curr}">${curr}</option>`;
  });
  
  fromCurrency.value = "USD";
  toCurrency.value = "INR";
};

async function convertCurrency() {
  const amount = parseFloat(document.getElementById('amount').value);
  const from = document.getElementById('fromCurrency').value;
  const to = document.getElementById('toCurrency').value;
  const resultDiv = document.getElementById('result');

  if (isNaN(amount) || amount <= 0) {
    resultDiv.innerText = "Please enter a valid amount.";
    return;
  }

  try {
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data = await res.json();
    const rate = data.rates[to];
    const converted = (amount * rate).toFixed(2);
    resultDiv.innerText = `${amount} ${from} = ${converted} ${to}`;
  } catch (error) {
    resultDiv.innerText = "Failed to fetch exchange rate. Try again.";
  }
}
