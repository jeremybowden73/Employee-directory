
$.ajax({
  url: 'https://randomuser.me/api/?results=10',
  dataType: 'json',
  success: function (data) {
    console.log(data);
  }
});



function createCard() {
  const newCard = document.createElement("div");
  newCard.className = "gridCard";
  // create divs for the card information
  const photoDiv = document.createElement("div");
  photoDiv.className = "photo";
  const photoImg = document.createElement("img");
  photoImg.id = "cardPhoto";
  const nameDiv = document.createElement("div");
  nameDiv.className = "name";
  const emailDiv = document.createElement("div");
  emailDiv.classList.add("email");
  const locationDiv = document.createElement("div");
  locationDiv.classList.add("location");
  // drop the four elements into the 'newCard' element
  newCard.appendChild(photoDiv);
  photoDiv.appendChild(photoImg);
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
      let lastName = data.results[0].name.last;
      nameDiv.innerHTML = firstName.charAt(0).toUpperCase()
        + firstName.slice(1)
        + " "
        + lastName.charAt(0).toUpperCase()
        + lastName.slice(1);
      emailDiv.innerHTML = data.results[0].email;
      let location = data.results[0].location.city;
      locationDiv.innerHTML = location.charAt(0).toUpperCase() + location.slice(1);
      photoImg.src = data.results[0].picture.large;
    }
  });
  //
  return newCard;
};


const divGridContainer = document.querySelector(".gridContainer");
// add 12 "grid cards" to the main grid
for (let i = 0; i < 12; i++) {
  divGridContainer.appendChild(createCard());
}

