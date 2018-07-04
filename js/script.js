
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

// jQuery AJAX request to get 12 random profiles
const url = 'https://randomuser.me/api/?results=12';
const callback = function (response) {
  // this function loops over the 12 cards and populates the required fields
  // using the 12 objects in the AJAX response
  let nameDivs = document.getElementsByClassName("name");
  let emailDivs = document.getElementsByClassName("email");
  let locationDivs = document.getElementsByClassName("location");
  let photoDivs = document.getElementsByClassName("cardPhoto");
  for (let i = 0; i < 12; i++) {
    nameDivs[i].innerHTML = response.results[i].name.first.charAt(0).toUpperCase()
      + response.results[i].name.first.slice(1)
      + " "
      + response.results[i].name.last.charAt(0).toUpperCase()
      + response.results[i].name.last.slice(1);
    emailDivs[i].innerHTML = response.results[i].email;
    locationDivs[i].innerHTML = response.results[i].location.city.charAt(0).toUpperCase()
      + response.results[i].location.city.slice(1);
    photoDivs[i].src = response.results[i].picture.large;
  }
};
$.get(url, callback);

