const loaderBack = document.querySelector(".loader-back");

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    loaderBack.style.opacity = "0";

    setTimeout(() => {
      loaderBack.classList.add("hidden");
    }, 500);
  }, 2000);
  const select = document.querySelectorAll("select");
  const lastUpdate = document.querySelector(".lastUpdate");
  const nextUpdate = document.querySelector(".nextUpdate");
  const input = document.querySelector(".input");
  const output = document.querySelector(".output");
  const select1 = document.querySelector("#select1");
  const select2 = document.querySelector("#select2");
  let firstVal, secondVal;
  let apiLink =
    "https://v6.exchangerate-api.com/v6/7fdf63dd0f25b581fcd7392b/latest/USD";

  const getData = async (link) => {
    const request = await fetch(link);
    const data = await request.json();
    writeSelect(await data);
    calculate(await data);
    console.log(data);
  };
  getData(apiLink);

  const writeSelect = (DB) => {
    let moneyKeys = Object.keys(DB.conversion_rates);
    moneyKeys.forEach((item) => {
      select.forEach((selectEl) => {
        selectEl.innerHTML += `
                  <option value="${item}" >${item}</option>
                  `;
      });
    });
    lastUpdate.textContent = DB.time_last_update_utc;
    nextUpdate.textContent = DB.time_next_update_utc;
  };

  // foreach DB function
  let nameKeys;
  let nameValues;
  const calculate = (DB) => {
    nameKeys = Object.keys(DB.conversion_rates);
    nameValues = Object.values(DB.conversion_rates);
  };

  // get money keys and values function

  const sendData = (keys, values) => {
    keys.forEach((key, index) => {
      if (key == select1.value) {
        firstVal = values[index];
        output.value = (input.value / values[index]) * secondVal;
      }
      if (key == select2.value) {
        secondVal = values[index];
        console.log(secondVal);
      }
    });
  };

  // input value function

  input.addEventListener("input", () => {
    sendData(nameKeys, nameValues);
  });
  select1.addEventListener("change", () => {
    sendData(nameKeys, nameValues);
  });
  select2.addEventListener("change", () => {
    sendData(nameKeys, nameValues);
  });
}); // DOMContentLoaded
