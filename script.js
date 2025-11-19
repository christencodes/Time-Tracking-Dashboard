"use strict";

//Gather All Cards
const workCard = document.querySelector(".work");
const playCard = document.querySelector(".play");
const studyCard = document.querySelector(".study");
const exerciseCard = document.querySelector(".exercise");
const socialCard = document.querySelector(".social");
const selfCareCard = document.querySelector(".self-care");

//Place cards in array
const cardsArray = [
  workCard,
  playCard,
  studyCard,
  exerciseCard,
  socialCard,
  selfCareCard,
];

//Get Time Selection UNOrdered List
const timeSelection = document.querySelector(".time-selections");

//Get List Items from timeSelection and place in array
const times = timeSelection.querySelectorAll("li");
//this will hold the current user selection
let userPick;

//loop through times and add event listeners
for (let i = 0; i <= times.length - 1; i++) {
  times[i].addEventListener("click", (e) => {
    e.preventDefault;
    //when clicked they update the user pick
    switch (times[i].textContent) {
      case "Daily":
        userPick = 0;
        break;
      case "Weekly":
        userPick = 1;
        break;
      case "Monthly":
        userPick = 2;
      default:
        break;
    }
    getJSONinfo();
  });
}

//gathers the JSON data
const getJSONinfo = async () => {
  const requestURL = "data.json";
  const request = new Request(requestURL);
  const response = await fetch(request);
  const activitiesText = await response.text();

  const activitiesData = JSON.parse(activitiesText);

  updateCards(userPick, activitiesData);
};

function updateCards(pick, data) {
  let currentTime = "";
  for (let i = 0; i <= cardsArray.length - 1; i++) {
    //based on the pick we need to update the cards so lets break it down
    //lets get the current activity hours and previous activity based on the current choices

    //need to target each element based on activity -type remember this is where we left off look at the log
    console.log(cardsArray[i].querySelector(".activity-hours"));

    switch (pick) {
      case 0:
        currentTime = "Yesterday";
        cardsArray[i].querySelector(".activity-hours").textContent =
          data[pick].timeframes.daily.current + "hrs";
        cardsArray[i].querySelector(
          ".activity-previous"
        ).textContent = `Yesterday - ${data[pick].timeframes.daily.previous}hrs`;
        break;
      case 1:
        currentTime = "Week";
        cardsArray[i].querySelector(".activity-hours").textContent =
          data[pick].timeframes.daily.current + "hrs";
        cardsArray[i].querySelector(
          ".activity-previous"
        ).textContent = `Last ${currentTime} - ${data[pick].timeframes.daily.previous}hrs`;
        break;

      default:
        break;
    }

    // switch (pick) {
    //   case 0:
    //     cardsArray[i].querySelector(".activityHours").textContent =
    //       data[i].timeframes[pick].current;
    //     break;
    //   default:
    //     break;
  }
}

getJSONinfo();
