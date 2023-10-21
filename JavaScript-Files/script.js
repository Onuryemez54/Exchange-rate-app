
const dropListSelect = document.querySelectorAll('.drop-list-container .select-box');
// console.log(dropListSelect) ;

//Placing country currency codes inside select elements
for (let i = 0; i < dropListSelect.length; i++) {
    for(currencyCode in countryCurrencyList) {
 
        let selected;
        if(i===0) {
            selected = currencyCode === 'USD' ? 'selected' : '';
        } else if (i===1) {
            selected = currencyCode === 'TRY' ? ' selected' : '';
        }

        const optionTag = document.createElement('option');
        optionTag.selected = selected;
        optionTag.value = `${currencyCode}`;
        optionTag.innerText = `${currencyCode}`;
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
        amount.value = '1';
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

    try {
        const response = await fetch(UrlTry);
        const result = await response.json();

        const tryValue = result.conversion_rates.TRY;
        let usdValue = (tryValue / result.conversion_rates.USD).toFixed(3);
        let gbpValue = (tryValue / result.conversion_rates.GBP).toFixed(3);
        let eurValue = (tryValue / result.conversion_rates.EUR).toFixed(3);
        let sekValue = (tryValue / result.conversion_rates.SEK).toFixed(3);
        let cnyValue = (tryValue / result.conversion_rates.CNY).toFixed(3);
        let jpyValue = (tryValue / result.conversion_rates.JPY).toFixed(3);

        let dollar = document.querySelector('.rates-table-box .dollar');
        dollar.innerText = `${usdValue} TL`;
        let pound = document.querySelector('.rates-table-box .pound');
        pound.innerText =  `${gbpValue} TL`;
        let euro = document.querySelector('.rates-table-box .euro');
        euro.innerText =  `${eurValue} TL`;
        let krona = document.querySelector('.rates-table-box .krona');
        krona.innerText =  `${sekValue} TL`;
        let yuan = document.querySelector('.rates-table-box .yuan');
        yuan.innerText =  `${cnyValue} TL`;
        let yen = document.querySelector('.rates-table-box .yen');
        yen.innerText =  `${jpyValue} TL`;
        
    } catch(error) {
        console.error(error);
        throw(error);
    }
}


//window section
window.addEventListener('load',() => {
    getExchangeRate();
    getCurrencyTable();
})




