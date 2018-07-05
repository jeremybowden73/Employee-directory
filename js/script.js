
// variable to store data for 12 random people
let randomPeople = {};

function createCard() {
  const newCard = document.createElement("div");
  newCard.className = "gridCard";
  // create divs for the card information
  const photoDiv = document.createElement("div");
  photoDiv.className = "photo";
  const photoImg = document.createElement("img");
  photoImg.className = "cardPhoto";
  const nameDiv = document.createElement("div");
  nameDiv.className = "name";
  const emailDiv = document.createElement("div");
  emailDiv.className = "email";
  const locationDiv = document.createElement("div");
  locationDiv.className = "location";
  // insert the four elements into the 'newCard' element
  newCard.appendChild(photoDiv);
  photoDiv.appendChild(photoImg);
  newCard.appendChild(nameDiv);
  newCard.appendChild(emailDiv);
  newCard.appendChild(locationDiv);
  return newCard;
};

// add 12 new "grid cards" to the main grid
const divGridContainer = document.querySelector(".gridContainer");
for (let i = 0; i < 12; i++) {
  divGridContainer.appendChild(createCard());
}


//
//
// AJAX request for 12 random users using Fetch
function checkFetchStatus(response) {
  if (response.status !== 200) {
    console.log("Failed to get data from API. Status code: " + response.status);
    return Promise.reject(response);
  } else {
    return Promise.resolve(response);
  }
}

function jsonify(response) {
  return response.json();
}

function jsonSuccess(response) {
  console.log("fetch request succeeded");
  randomPeople = response.results;
  populateCards(randomPeople);
}

function jsonError() {
  console.log("fetch request failed");
}

fetch('https://randomuser.me/api/?results=12')
  .then(checkFetchStatus)
  .then(jsonify)
  .then(jsonSuccess)
  .catch(jsonError)

//
//

// setTimeout(function () {
//   console.log(randomPeople[0].email);
// }, 2000);

function populateCards(dataSet) {
  // this function loops over the 12 cards and populates the required fields
  // using the 12 objects in the provided dataSet
  let nameDivs = document.getElementsByClassName("name");
  let emailDivs = document.getElementsByClassName("email");
  let locationDivs = document.getElementsByClassName("location");
  let photoDivs = document.getElementsByClassName("cardPhoto");
  for (let i = 0; i < 12; i++) {
    nameDivs[i].innerHTML = dataSet[i].name.first.charAt(0).toUpperCase()
      + dataSet[i].name.first.slice(1)
      + " "
      + dataSet[i].name.last.charAt(0).toUpperCase()
      + dataSet[i].name.last.slice(1);
    emailDivs[i].innerHTML = dataSet[i].email;
    if (emailDivs[i].innerHTML.length >= 28) {
      emailDivs[i].style.fontSize = "0.5rem";
    }
    locationDivs[i].innerHTML = dataSet[i].location.city.charAt(0).toUpperCase()
      + dataSet[i].location.city.slice(1);
    photoDivs[i].src = dataSet[i].picture.large;
  }
}









function modalWindow(dataSet) {
  //console.log(dataSet);
  console.log(dataSet[0].location.city);

  divGridContainer.onclick = function (event) {
    // traverse up the DOM tree from the event.target, until we get to the DIV with class="gridCard", then add a class "selected"
    let clickedDiv = event.target;
    while (clickedDiv.className !== "gridCard") {
      clickedDiv = clickedDiv.parentNode;
    }
    clickedDiv.id = "selected";

    const selectedCard = document.getElementById("selected");



  };
};

