
const dropListSelect = document.querySelectorAll('.drop-list-container .select-box');
// console.log(dropListSelect) ;

//Placing country currency codes inside select elements
for (let i = 0; i < dropListSelect.length; i++) {
    for(key in countryCurrencyList) {
 
        let selected;
        if(i===0) {
            selected = key === 'USD' ? 'selected' : '';
        } else if (i===1) {
            selected = key === 'TRY' ? ' selected' : '';
        }

        const optionTag = document.createElement('option');
        optionTag.selected = selected;
        optionTag.innerText = `${key}`;
        
        dropListSelect[i].appendChild(optionTag);
    }
};

const getButton = document.querySelector('.form-button');
const fromCurrency = document.getElementById('from-select')
const toCurrency = document.getElementById('to-select');

getButton.addEventListener('click',(e) => {
    e.preventDefault();
    getExchangeRate();
})

 async function getExchangeRate() {

    const amount = document.querySelector('.amount-input');
    let amountVal= amount.value;

    if(amountVal == '' || amountVal == 0) {
        amountVal= 1;
    } 

    let exchangeRateText = document.querySelector('.exhange-rate-text');
    exchangeRateText.innerText = 'Getting exchange rate...';

    const apiKey = '519e5ca6420b42e656620715';
    let URL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;
    // console.log(URL);

    try {
        const response = await fetch(URL);
        const result = await response.json();
        
        let currentlyExchange = result.conversion_rates[toCurrency.value];
        // console.log(currentlyExchange)
        let totalExchangeRate = (amountVal * currentlyExchange).toFixed(3);

        exchangeRateText.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value} `;
        
    } catch(error) {
        console.error("There is an error : ", error);
        throw(error);
    }
};

//icon changing section
const exchangeIcon = document.querySelector('.drop-list-container .icon');

exchangeIcon.addEventListener('click', () => {
    let currentlyCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = currentlyCode;
    getExchangeRate();
})


//Table seciton function

async function getCurrencyTable() {

    const apiKey = '519e5ca6420b42e656620715';
    const UrlTry = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/TRY`;
    const displayCurrencies = ['usd', 'gbp', 'eur', 'sek', 'cny', 'jpy'];
    try {
        const response = await fetch(UrlTry);
        const result = await response.json();

        const tryValue = result.conversion_rates.TRY;
        
        const tryEquivalentForDisplayCurrencies =  displayCurrencies.map(currencyCode => (
                {currencyCode: currencyCode, value: getTryRate(tryValue, result.conversion_rates[currencyCode.toUpperCase()])}
            )
        );
        // console.log(tryEquivalentForDisplayCurrencies)
        
        for (const key in tryEquivalentForDisplayCurrencies) {
            setCurrencyCellText(tryEquivalentForDisplayCurrencies[key].currencyCode, tryEquivalentForDisplayCurrencies[key].value);
        }
        
    } catch(error) {
        console.error(error);
        throw(error);
    }
}

function getTryRate(tryValue, comparisonCurrencyValue) {
    return (tryValue / comparisonCurrencyValue).toFixed(3);
};

function setCurrencyCellText(currencyCode, currencyToTryValue) {
    return document.querySelector(`#${currencyCode}`).innerText = `${currencyToTryValue} TL`;
};


//window section
window.addEventListener('load',() => {
    getExchangeRate();
    getCurrencyTable();
})




