const form = document.querySelector("form");
const bill = document.querySelector(".bill");
const tipOptions = document.querySelectorAll(".tip button");
const customTip = document.querySelector(".custom");
const numberOfPeople = document.querySelector("#numberOfPeople");
const reset = document.querySelector(".reset");

const tipAmount = document.querySelector(".tip-amount");
const total = document.querySelector(".total");

let billInput = 0;
let tipInput = 0;
let numberOfPeopleInput = 1;
let tipAmountResult = 0;
let totalResult = 0;

const validate = (e) => {
  let input = e.target.value.replace(/\s+/g, "");
  if (!isNaN(input) && !isNaN(parseFloat(input))) {
    return true;
  } else {
    e.target.value = "";
    return false;
  }
};
const tipAmountFunction = () => {
  if (billInput >= 0 && tipInput >= 0 && numberOfPeopleInput !== 0) {
    tipAmountResult = (billInput * tipInput) / numberOfPeopleInput;
    totalResult = (billInput / numberOfPeopleInput + tipAmountResult);
  }
  tipAmount.innerText = "$" + tipAmountResult.toFixed(2);
  total.innerText = "$" + totalResult.toFixed(2);
};
bill.addEventListener("input", (e) => {
  if (validate(e)) {
    billInput = parseFloat(e.target.value);
  } else {
    billInput = 0;
  }
  tipAmountFunction();
});
bill.addEventListener("focusin", () => {
  billInput = 0;
  bill.value = "";
  tipAmountFunction();
});
tipOptions.forEach((button) => {
  button.addEventListener("click", () => {
    tipInput = Number(button.value) / 100;
    tipOptions.forEach(btn => {
      btn.classList.remove("selected")
    })
    button.classList.add("selected");
    customTip.value = "";
    tipAmountFunction();
  });
});
customTip.addEventListener("input", (e) => {
  if (validate(e)) {
    tipInput = Number(customTip.value) / 100;
  } else {
    tipInput = 0;
  }
  tipAmountFunction();
});
customTip.addEventListener("focusin", () => {
  tipInput = 0;
  customTip.value = "";
  tipAmountFunction();
  tipOptions.forEach(button => {
    button.classList.remove("selected")
  })
});
numberOfPeople.addEventListener("input", (e) => {
  if (validate(e)) {
    numberOfPeopleInput = Math.round(Number(numberOfPeople.value));
    numberOfPeople.value = numberOfPeopleInput;
  } else {
    numberOfPeopleInput = 0;
    numberOfPeople.value = "";
  }
  tipAmountFunction();
});
numberOfPeople.addEventListener("focusout", () => {
  if (!numberOfPeople.value) {
    numberOfPeople.value = "1";
    numberOfPeopleInput = 1;
  }
  tipAmountFunction();
});
numberOfPeople.addEventListener("focusin", () => {
  numberOfPeople.value = "";
  numberOfPeopleInput = 1;

});
const resetFunction = () => {
  bill.value = "";
  customTip.value = "";
  numberOfPeople.value = "";

  billInput = 0;
  tipInput = 0;
  numberOfPeopleInput = 0;
  tipAmount.innerText = "$0.00";
  total.innerText = "$0.00";
  tipOptions.forEach(button => {
    button.classList.remove("selected");
  })
  tipAmountFunction();
};
reset.addEventListener("click", () => {
  resetFunction();
});
document.addEventListener("DOMContentLoaded", () => {
  resetFunction();
});