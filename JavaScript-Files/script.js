const dropListSelect = document.querySelectorAll(
  ".drop-list-container .select-box"
);
// console.log(dropListSelect) ;

//Placing country currency codes inside select elements
dropListSelect.forEach((item, index) => {
  for (const key in countryCurrencyList) {
    const optionTag = document.createElement("option");
    optionTag.innerText = key;
    let selected;
    if (index === 0) {
      selected = key === "USD" ? "selected" : "";
    } else if (index === 1) {
      selected = key === "TRY" ? "selected" : "";
    }
    optionTag.selected = selected;
    item.appendChild(optionTag);
  }
});

const getForm = document.querySelector("#form");
const fromCurrency = document.getElementById("from-select");
const toCurrency = document.getElementById("to-select");

getForm.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});

async function getExchangeRate() {
  const amount = document.querySelector(".amount-input");
  let amountVal = amount.value;

  if (amountVal == "" || amountVal == 0) {
    amountVal = 1;
  }

  let exchangeRateText = document.querySelector(".exhange-rate-text");
  exchangeRateText.innerText = "Getting exchange rate...";

  const apiKey = "519e5ca6420b42e656620715";
  let URL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;
  // console.log(URL);

  try {
    const response = await fetch(URL);
    const result = await response.json();

    let currentlyExchange = result.conversion_rates[toCurrency.value];
    // console.log(currentlyExchange)
    let totalExchangeRate = (amountVal * currentlyExchange).toFixed(3);

    exchangeRateText.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value} `;
  } catch (error) {
    console.error("There is an error : ", error);
    throw error;
  }
}

//icon changing section
const exchangeIcon = document.querySelector(".drop-list-container .icon");

exchangeIcon.addEventListener("click", () => {
  let currentlyCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = currentlyCode;
  getExchangeRate();
});

//Table seciton function

async function getCurrencyTable() {
  const apiKey = "519e5ca6420b42e656620715";
  const UrlTry = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/TRY`;
  const displayCurrencies = ["usd", "gbp", "eur", "sek", "cny", "jpy"];
  try {
    const response = await fetch(UrlTry);
    const result = await response.json();

    const tryEquivalentForDisplayCurrencies = displayCurrencies.map((item) => ({
      currencyCode: item,
      value: getTryRate(1, result.conversion_rates[item.toUpperCase()]),
    }));

    tryEquivalentForDisplayCurrencies.map((item) =>
      setCurrencyCellText(item.currencyCode, item.value)
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function getTryRate(tryValue, comparisonCurrencyValue) {
  return (tryValue / comparisonCurrencyValue).toFixed(3);
}

function setCurrencyCellText(currencyCode, currencyToTryValue) {
  return (document.getElementById(
    `${currencyCode}`
  ).innerText = `${currencyToTryValue} TL`);
}

//window section
window.addEventListener("load", () => {
  getExchangeRate();
  getCurrencyTable();
});
