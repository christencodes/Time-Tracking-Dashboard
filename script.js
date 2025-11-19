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

const activityTypes = [
  "work",
  "play",
  "study",
  "exercise",
  "social",
  "selfcare",
];
// console.log(activityTypes[0], typeof activityTypes[0]);

//Get Time Selection UNOrdered List
const timeSelection = document.querySelector(".time-selections");

//Get List Items from timeSelection and place in array
const times = timeSelection.querySelectorAll("li");
//this will hold the current user selection
let userPick = 0;

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

    //need to target each element based on activity -type remember this is where we //left off look at the log
    const certainTimes = ["Yesterday", "Last Week", "Last Month"];

    switch (pick) {
      case 0:
        //we want to update all  cards based on type and hours from json
        //lets start with the current hours
        cardsArray[i].querySelector(".activity-hours").textContent =
          data[i].timeframes.daily.current + " hrs";
        cardsArray[i].querySelector(
          ".activity-previous"
        ).textContent = ` ${certainTimes[pick]} - ${data[i].timeframes.daily.previous}hrs`;
        cardsArray[i].querySelector(
          ".-d-w-m .activity-previous"
        ).textContent = ` ${certainTimes[pick]} - ${data[i].timeframes.daily.previous}hrs`;
        break;
      case 1:
        cardsArray[i].querySelector(".activity-hours").textContent =
          data[i].timeframes.weekly.current + "hrs";
        cardsArray[i].querySelector(
          ".activity-previous"
        ).textContent = ` ${certainTimes[pick]} - ${data[i].timeframes.weekly.previous}hrs`;
        cardsArray[i].querySelector(
          ".-d-w-m .activity-previous"
        ).textContent = ` ${certainTimes[pick]} - ${data[i].timeframes.weekly.previous}hrs`;
        break;
      case 2:
        cardsArray[i].querySelector(".activity-hours").textContent =
          data[i].timeframes.monthly.current + " hrs";
        cardsArray[i].querySelector(
          ".activity-previous"
        ).textContent = ` ${certainTimes[pick]} - ${data[i].timeframes.monthly.previous}hrs`;
        cardsArray[i].querySelector(
          ".-d-w-m .activity-previous"
        ).textContent = ` ${certainTimes[pick]} - ${data[i].timeframes.monthly.previous}hrs`;
        break;

      default:
        break;
    }
  }
}

getJSONinfo();

window.onload = (e) => {
  getJSONinfo();
  let desktopArray = document.querySelectorAll(".desktop-d-w-m");
  let mobileArray = document.querySelectorAll(".-d-w-m");
  // e.preventDefault;
  if (window.screen.width < 1000) {
    for (let i = 0; i <= 5; i++) {
      desktopArray[i].classList.add("hidden");
      mobileArray[i].classList.remove("hidden");
    }
  } else if (window.screen.width >= 1000) {
    for (let i = 0; i <= 5; i++) {
      mobileArray[i].classList.add("hidden");
      desktopArray[i].classList.remove("hidden");
    }
  }
};

window.addEventListener("resize", (e) => {
  getJSONinfo();
  let desktopArray = document.querySelectorAll(".desktop-d-w-m");
  let mobileArray = document.querySelectorAll(".-d-w-m");
  // e.preventDefault;
  if (window.screen.width < 1000) {
    for (let i = 0; i <= 5; i++) {
      desktopArray[i].classList.add("hidden");
      mobileArray[i].classList.remove("hidden");
    }
  } else if (window.screen.width >= 1000) {
    for (let i = 0; i <= 5; i++) {
      mobileArray[i].classList.add("hidden");
      desktopArray[i].classList.remove("hidden");
    }
  }
});
