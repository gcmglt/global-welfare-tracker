// **************************
// ****** DECLARATIONS ******
// **************************
const searchButton = document.querySelector(".btn");
const cityInputName = document.querySelector(".city-input__name");
const cityInputDescription = document.querySelector(".city-input__description");
const searchWrapperTitle = document.querySelector(".search-wrapper__title");
const resultContainerGuideline = document.querySelector(
  ".result-container__guideline"
);
const resultContainerError = document.querySelector(".result-container__error");
const scoreContainerOverall = document.querySelector(
  ".score-container__overall"
);
const scoreContainerCategories = document.querySelector(
  ".score-container__categories "
);
const cardScoreOverall = document.querySelector("#card-score__overall");
const cardScoreCategories = document.querySelector("#card-score__categories");
let city; //per fetch

// ********************************
// ****** FETCH TELEPORT API ******
// ********************************
const getDatas = async () => {
  //Fetch API
  const getScores = await fetch(
    `https://api.teleport.org/api/urban_areas/slug:${city}/scores/`
  );
  const scoresData = await getScores.json();

  const getImage = await fetch(
    `https://api.teleport.org/api/urban_areas/slug:${city}/images/`
  );
  const imageData = await getImage.json();

  // ******************************
  // ****** DOM MANIPULATION ******
  // ******************************
  if (getScores.status != 404) {
    // styling score container
    cardScoreOverall.classList.remove("card-transparent");
    cardScoreOverall.classList.add("card-visible");
    cardScoreCategories.classList.remove("card-transparent");
    cardScoreCategories.classList.add("card-visible");

    const setCapsName = city.toUpperCase().replaceAll("-", " ");

    cityInputName.value = "";
    searchWrapperTitle.value = "";
    resultContainerGuideline.innerHTML = "";
    searchWrapperTitle.innerHTML = `What is life like in ${setCapsName}`;
    scoreContainerOverall.innerHTML = `<h1><strong>Overall score:</strong><br> ${scoresData.teleport_city_score.toFixed()} / 100</h1>`;
    cityInputDescription.innerHTML = "";
    cityInputDescription.innerHTML = `<h3><strong>Quality of life in ${setCapsName}</strong>: </h3><p>${scoresData.summary}</p>`;

    scoreContainerCategories.innerHTML = "";
    scoresData.categories.forEach((x) => {
      scoreContainerCategories.insertAdjacentHTML(
        "afterbegin",
        `<h3><strong>${x.name}</strong>:<br> ${x.score_out_of_10.toFixed(
          1
        )} / 10</h3><br>`
      );
    });

    const setCityImage = document.querySelector("header");
    setCityImage.style.backgroundImage = `url(${imageData.photos[0].image.web})`;
  } else {
    errorHandler(
      `<br>City not found. Check if there's a typo. <br> Remember that you have to use cities names in english. <br> If none of these problems are yours, maybe that city is not in our database.`
    );
  }
};

// ****************************
// ****** ERROR HANDLING ******
// ****************************
const properNameHandler = (input) => {
  input = input.toLowerCase();
  input = input.trim();
  input = input.replaceAll(" ", "-");
  return input;
};

const errorHandler = (warningMessage) => {
  resultContainerError.innerHTML = `<p>${warningMessage}</p>`;
  return warningMessage;
};

cityInputName.addEventListener("keydown", () => {
  resultContainerError.innerHTML = "";
});

cityInputName.addEventListener("focus", () => {
  resultContainerError.innerHTML = "";
});

// *******************************
// ****** SEARCH FUNCTIONS  ******
// *******************************
searchButton.addEventListener("click", (onScreenButton) => {
  onScreenButton.preventDefault();
  if (cityInputName.value == "") {
    errorHandler("You must input a city name!");
  } else {
    city = properNameHandler(cityInputName.value);
    getDatas();
  }
});

cityInputName.addEventListener("keydown", function (enterKey) {
  if (enterKey.key === "Enter") {
    enterKey.preventDefault();
    city = properNameHandler(cityInputName.value);
    getDatas();
  }
});
