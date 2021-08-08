const baseCurrency = document.getElementById('currency-one');
const baseCurrencyAmt = document.getElementById('amount-one');

const targetCurrency = document.getElementById('currency-two');
const targetCurrencyAmt = document.getElementById('amount-two');


const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');


// Event Listeners
baseCurrency.addEventListener('change', operation);
baseCurrencyAmt.addEventListener('keydown', operation);
targetCurrency.addEventListener('change', operation);
swap.addEventListener('click', interChangeValues);


async function operation() {
    const request = await fetch(`https://v6.exchangerate-api.com/v6/6cdba9beb6975aca0a642b2a/pair/${baseCurrency.value}/${targetCurrency.value}/${baseCurrencyAmt.value}`);
    const response = await request.json();

    rateEl.innerText = `${baseCurrencyAmt.value} ${baseCurrency.value} = ${response.conversion_result} ${targetCurrency.value}`; 

    targetCurrencyAmt.value = response.conversion_result.toFixed(2);

    console.log(response);

}

function interChangeValues() {
    const amt1 = baseCurrencyAmt.value;
    const amt2 = targetCurrencyAmt.value;

    const cloneCurrency = baseCurrency.value;
    baseCurrency.value = targetCurrency.value;
    targetCurrency.value = cloneCurrency;

    baseCurrencyAmt.value = amt2;
    targetCurrencyAmt.value = amt2;
    operation();
}


window.onload = operation;