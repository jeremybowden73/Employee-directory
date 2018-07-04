
// $.ajax({
//   url: 'https://randomuser.me/api/',
//   dataType: 'json',
//   success: function (data) {
//     console.log(data.results[0].email);
//   }
// });



function createCard() {
  const newCard = document.createElement("div");
  newCard.className = "gridCard";
  // create divs for the card information
  const photoDiv = document.createElement("div");
  photoDiv.className = "photo";
  const nameDiv = document.createElement("div");
  nameDiv.className = "name";
  const emailDiv = document.createElement("div");
  emailDiv.classList.add("email");
  const locationDiv = document.createElement("div");
  locationDiv.classList.add("location");
  // drop the four elements into the 'newCard' element
  newCard.appendChild(photoDiv);
  newCard.appendChild(nameDiv);
  newCard.appendChild(emailDiv);
  newCard.appendChild(locationDiv);
  // ajax request
  $.ajax({
    url: 'https://randomuser.me/api/',
    dataType: 'json',
    success: function (data) {
      //console.log(data);
      // populate the card elements from the ajax response
      let firstName = data.results[0].name.first;
      nameDiv.innerHTML = firstName.charAt(0).toUpperCase() + firstName.slice(1);
      emailDiv.innerHTML = data.results[0].email;
      locationDiv.innerHTML = data.results[0].location.city;
    }
  });
  //
  return newCard;
};


const divGridContainer = document.querySelector(".gridContainer");
// add 12 "grid cards" to the main grid
divGridContainer.appendChild(createCard());

