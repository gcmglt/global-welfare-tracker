// ******************************
// ****** LET DECLARATIONS ******
// ******************************

let city; //per fetch
let searchButton = document.querySelector(".btn");
let cityNameInput = document.querySelector(
  ".city-name-input"
);
let cityDescription = document.querySelector(
  ".city-description"
);
let title = document.querySelector(".title");
let guideline = document.querySelector(".guideline");
let overallScore = document.querySelector(
  ".overall-score-container"
);
let scoreContainer = document.querySelector(
  ".score-container"
);
let errorWarning = document.querySelector(".error-warning");

// ********************************
// ****** FETCH TELEPORT API ******
// ********************************

async function teleportGetDatas() {
  //Fetch API
  let scoresRes = await fetch(
    `https://api.teleport.org/api/urban_areas/slug:${city}/scores/`
  );
  let scoresData = await scoresRes.json();

  let imageRes = await fetch(
    `https://api.teleport.org/api/urban_areas/slug:${city}/images/`
  );
  let imageData = await imageRes.json();

  // ******************************
  // ****** DOM MANIPULATION ******
  // ******************************
  console.log(scoresRes.status);
  if ((scoresRes.status != 400, 404, 500)) {
    let capsCity = city.toUpperCase().replaceAll("-", " ");

    cityNameInput.value = "";
    title.value = "";
    guideline.innerHTML = "";
    title.innerHTML = `What is life like in ${capsCity}`;
    overallScore.innerHTML = `<h1><strong>Overall score:</strong><br> ${scoresData.teleport_city_score.toFixed()} / 100</h1>`;
    cityDescription.innerHTML = "";
    cityDescription.innerHTML = `<h3><strong>Quality of life in ${capsCity}</strong>: </h3><p>${scoresData.summary}</p>`;

    scoreContainer.innerHTML = "";
    scoresData.categories.forEach((x) => {
      scoreContainer.insertAdjacentHTML(
        "afterbegin",
        `<h2><strong>${
          x.name
        }</strong>:<br> ${x.score_out_of_10.toFixed(
          1
        )} / 10</h2><br>`
      );
    });

    let cityImage = document.querySelector("header");
    cityImage.style.backgroundImage = `url(${imageData.photos[0].image.web})`;
  } else {
    getWarning(
      "<br>City not found. Check if there's a typo. <br> Remember that you have to use cities names in english. <br> If none of these problems are yours, maybe that city is not in our database."
    );
  }
}

// ***********************************************
// ****** ERROR PREVENT AND ERROR FUNCTIONS ******
// ***********************************************

function exactName(input) {
  input = input.toLowerCase();
  input = input.trim();
  input = input.replaceAll(" ", "-");
  return input;
}

function getWarning(warningMessage) {
  errorWarning.innerHTML = `<p>${warningMessage}</p>`;
  return warningMessage;
}

// ******************************
// ****** EVENT LISTENERS  ******
// ******************************

// search button per teleportGetDatas
searchButton.addEventListener("click", (onScreenButton) => {
  onScreenButton.preventDefault();
  if (cityNameInput.value == "") {
    getWarning("You must input a city name!");
  } else {
    city = exactName(cityNameInput.value);
    teleportGetDatas();
  }
});

// tasto invio per teleportGetDatas
cityNameInput.addEventListener(
  "keydown",
  function (enterKey) {
    if (enterKey.key === "Enter") {
      enterKey.preventDefault();
      city = exactName(cityNameInput.value);
      teleportGetDatas();
    }
  }
);

// tolto messaggio errore dopo averlo ricevuto
// al focus sulla textbox
cityNameInput.addEventListener("focus", () => {
  errorWarning.innerHTML = "";
});

// *************************************
// ****** STYLING EVENT LISTENERS ******
// *************************************

searchButton.addEventListener("click", (e) => {
  document
    .querySelector("#card1-style")
    .classList.add("card-style");
});

searchButton.addEventListener("click", (e) => {
  document
    .querySelector("#card2-style")
    .classList.add("card-style");
});

searchButton.addEventListener("click", (e) => {
  document
    .querySelector("#card1-style")
    .classList.remove("card-transparent");
});

searchButton.addEventListener("click", (e) => {
  document
    .querySelector("#card2-style")
    .classList.remove("card-transparent");
});
