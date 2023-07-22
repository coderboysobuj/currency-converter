import { countryList } from './countries.js'
const fromCur = document.querySelector(".from select")
const toCur = document.querySelector(".to select")
const getBtn = document.querySelector("form button")
const exIcon = document.querySelector("form .reverse")
const amount = document.querySelector("form input")
const exRateText = document.querySelector("form .result")


function main() {

  [fromCur, toCur].forEach((select, i) => {
    for (let curCode in countryList) {
      const selected = (i === 0 && curCode === 'USD') || (i === 1 && curCode === "GBP") ? "selected" : null;
      select.insertAdjacentHTML('beforeend', `<option class='text-gray-900' value="${curCode}" ${selected}>${curCode}</option>`)

    }
  });

  getBtn.addEventListener('click', function(event) {
    event.preventDefault();
    getExchangeRate();
  })
  exIcon.addEventListener('click', function() {
    [fromCur.value, toCur.value] = [toCur.value, fromCur.value];

    [fromCur, toCur].forEach((select) => {
      const code = select.value;
      const imgTag = select.parentElement.querySelector("img");
      imgTag.src = `https://flagcdn.com/48x36/${countryList[code].toLowerCase()}.png`;
    });
    getExchangeRate();
  })
}

async function getExchangeRate() {
  const amountValue = amount.value || 1;
  exRateText.innerHTML = "Getting exchange rate...";
  try {
    const url = `https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/${fromCur.value}`
    console.log(url);
    console.log(fromCur.value)
    const response = await fetch(url);
    const result = await response.json();
    const exchangeRate = result.conversion_rates[toCur.value];
    const totalExRate = (amountValue * exchangeRate).toFixed(2);
    exRateText.innerHTML = `${amountValue} ${fromCur.value} = ${totalExRate} ${toCur.value}`
  } catch (error) {

    exRateText.innerHTML = "Something went wrong please try again.";
  }
}

document.addEventListener('DOMContentLoaded', main)




