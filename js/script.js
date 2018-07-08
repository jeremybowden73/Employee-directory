/*
		Treehouse techdegree project 5
    
    USE A PUBLIC API TO CREATE AN EMPLOYEE DIRECTORY
    
		All code contained in this JS file is the work of me, Jeremy Bowden
		email: jeremy@jeremybowden.net
*/

// function to create a blank employee card
function createCard(i) {
  const newCard = document.createElement("div");
  newCard.className = "grid";
  newCard.classList.add("card");
  newCard.id = i;
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

// function to populate the employee cards by looping over them and adding
// the required fields using the 12 objects in the variable 'randomPeople'
function populateCards() {
  let nameDivs = document.getElementsByClassName("name");
  let emailDivs = document.getElementsByClassName("email");
  let locationDivs = document.getElementsByClassName("location");
  let photoDivs = document.getElementsByClassName("cardPhoto");
  for (let i = 0; i < 12; i++) {
    let cardDetails = populateInfo(randomPeople[i]);
    nameDivs[i].innerHTML = cardDetails.name;
    emailDivs[i].innerHTML = cardDetails.email;
    if (emailDivs[i].innerHTML.length >= 28) {
      emailDivs[i].style.fontSize = "0.5rem";
    }
    locationDivs[i].innerHTML = cardDetails.location;
    photoDivs[i].src = cardDetails.photo;
  }
}

// populate the modal view with the data for the 'clicked on' card id
function populateModal(cardNumber) {
  let modalDetails = populateInfo(randomPeople[cardNumber]);
  let nameDiv = document.getElementsByClassName("nameModal")[0];
  let emailDiv = document.getElementsByClassName("emailModal")[0];
  let locationDiv = document.getElementsByClassName("locationModal")[0];
  let photoDiv = document.getElementsByClassName("cardPhotoModal")[0];
  let phoneDiv = document.getElementsByClassName("phoneModal")[0];
  let addressDiv = document.getElementsByClassName("addressModal")[0];
  let birthdayDiv = document.getElementsByClassName("birthdayModal")[0];
  nameDiv.innerHTML = modalDetails.name;
  emailDiv.innerHTML = modalDetails.email;
  if (emailDiv.innerHTML.length >= 28) {
    emailDiv.style.fontSize = "0.75rem";
  }
  locationDiv.innerHTML = modalDetails.location;
  photoDiv.src = modalDetails.photo;
  phoneDiv.innerHTML = modalDetails.phone;
  addressDiv.innerHTML = modalDetails.address;
  if (addressDiv.innerHTML.length >= 28) {
    addressDiv.style.fontSize = "0.75rem";
  }
  birthdayDiv.innerHTML = modalDetails.birthday;
};


// function to get the required info from a person object and store it in a new object
function populateInfo(person) {
  let oneCard = {}; // new object to store the required info for a person
  oneCard.name = person.name.first.charAt(0).toUpperCase()
    + person.name.first.slice(1)
    + " "
    + person.name.last.charAt(0).toUpperCase()
    + person.name.last.slice(1);
  oneCard.email = person.email;
  oneCard.location = person.location.city.charAt(0).toUpperCase()
    + person.location.city.slice(1);
  oneCard.photo = person.picture.large;
  oneCard.phone = person.phone;
  oneCard.address = person.location.street
    + ", "
    + oneCard.location
    + ", "
    + person.location.state.charAt(0).toUpperCase()
    + person.location.state.slice(1);
  const dob = person.dob.date;
  oneCard.birthday = "Birthday: "
    + dob.slice(8, 10)
    + "/"
    + dob.slice(5, 7)
    + "/"
    + dob.slice(0, 4);
  return oneCard;
};


// function to create a blank modal window, for when an employee card is clicked on
function modalWindow() {
  const modalView = document.createElement("div");
  modalView.className = "grid";
  modalView.classList.add("modalView");
  // create divs for the modal view information
  const photoDiv = document.createElement("div");
  photoDiv.className = "photoModal";
  const photoImg = document.createElement("img");
  photoImg.className = "cardPhotoModal";
  const nameDiv = document.createElement("div");
  nameDiv.className = "nameModal";
  const emailDiv = document.createElement("div");
  emailDiv.className = "emailModal";
  const locationDiv = document.createElement("div");
  locationDiv.className = "locationModal";
  const phoneDiv = document.createElement("div");
  phoneDiv.className = "phoneModal";
  const addressDiv = document.createElement("div");
  addressDiv.className = "addressModal";
  const birthdayDiv = document.createElement("div");
  birthdayDiv.className = "birthdayModal";
  const closeButton = document.createElement("div");
  closeButton.className = "closeButton";
  closeButton.innerHTML = "&times;";
  // insert the elements into the 'newCard' element
  modalView.appendChild(photoDiv);
  photoDiv.appendChild(photoImg);
  modalView.appendChild(nameDiv);
  modalView.appendChild(emailDiv);
  modalView.appendChild(locationDiv);
  modalView.appendChild(phoneDiv);
  modalView.appendChild(addressDiv);
  modalView.appendChild(birthdayDiv);
  modalView.appendChild(closeButton);
  // append the div to the main page div
  document.getElementsByClassName("page")[0].appendChild(modalView);
  return modalView;
}

// set-up is done; add 12 new "grid cards" to the main grid
const divGridContainer = document.querySelector(".gridContainer");
for (let i = 0; i < 12; i++) {
  divGridContainer.appendChild(createCard(i));
}

// variable to store data for 12 random people
let randomPeople = {};

// create the modal view window (initially hidden by CSS) and assign it to the variable 'modal'
let modal = modalWindow();

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
  // update the variable 'randomPeople' using the returned JSON object
  randomPeople = response.results;
  populateCards();
}

function jsonError() {
  console.log("fetch request failed");
  console.log(response.error);
}

fetch('https://randomuser.me/api/?nat=au,gb,ie,nz,us&results=12')
  .then(checkFetchStatus)
  .then(jsonify)
  .then(jsonSuccess)
  .catch(jsonError)



//
// EVENT HANDLERS
//
// event handler for when a card is clicked on
divGridContainer.onclick = function (event) {
  // traverse up the DOM tree from the event.target, until we get to the DIV with class="grid card"
  let clickedDiv = event.target;
  while (clickedDiv.className !== "grid card") {
    clickedDiv = clickedDiv.parentNode;
  }

  // variable to store the card number of the card that was clicked on
  let cardNumber = clickedDiv.id;

  // populate the fields on the modal view using the data of the card selected
  populateModal(cardNumber);

  // show the modal view
  modal.style.display = "grid";

  // disable the main page
  divGridContainer.classList.add("disabledDIV");
};

// event handler for when the modal window 'close' button is clicked on
const closeBtn = document.querySelector(".closeButton");
closeBtn.onclick = function (event) {
  modal.style.display = "none";
  divGridContainer.classList.remove("disabledDIV");
}





