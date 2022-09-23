// function refresh(){
//     window.location.reload();
// }

// setInterval(refresh,5000);

let clickedCounter = 0;
let countryName = "",
  time = 60.0;

const startBtn = document.querySelector(".start-btn");
const body = document.querySelector("body");
const gameScreen = document.querySelector(".game");
const startContainer = document.querySelector(".container");

const tiles = document.querySelector("#tiles-div-easy-9");
const tilesChildren = tiles.children;
// console.log(tilesChildren[1]);

startBtn.addEventListener("click", () => {
  startContainer.style.display = "none";
  gameScreen.style.display = "block";
  let timerUpdate = setInterval(() => {
    document.querySelector(".timer").innerHTML = `time left: ${time}`;
    time--;
    if (time == -1) {
      clearInterval(timerUpdate);
      tiles.style.pointerEvents = "none";
    }
  }, 1000);
});

tiles.addEventListener("click", (e) => {
  // console.log(e.target.classList);
  if (clickedCounter < 5) {
    for (let i = 0; i < 9; i++) {
      if (e.target.classList.contains(`${i + 1}`)) {
        tilesChildren[i].style.backgroundColor = "transparent";
        tilesChildren[i].style.pointerEvents = "none";
        tilesChildren[i].style.border = "none";
      }
    }
  } else {
    console.log("Max clicks surpassed in LOGO game.");
  }
  clickedCounter++;
  if (clickedCounter == 5) {
    tiles.style.pointerEvents = "none";
  }
});

function callLogo() {
  let randomIndex = Math.floor(Math.random() * 250); //250 elements so 0 to 249
  let url = "https://restcountries.com/v3.1/all";
  axios.get(url).then((res) => {
    countryName = res.data[randomIndex].name.common;
    if (countryName.length > 15 || countryName.length < 7) {
      console.log(`Failed country logo - ${countryName}`);
      callLogo();
    } else {
      console.log(countryName);
      console.log(res.data[randomIndex].flags.png);
      document.querySelector(".game-image").src =
        res.data[randomIndex].flags.png;
      let showString = "";
      let index1 = Math.floor(Math.random() * countryName.length);
      let index2 = Math.floor(Math.random() * countryName.length);
      let index3 = Math.floor(Math.random() * countryName.length);
      let index4 = Math.floor(Math.random() * countryName.length);
      for (let i = 0; i < countryName.length; i++) {
        if (i == index1 || i == index2 || i == index3 || i == index4) {
          showString += countryName[i] + " ";
        } else {
          showString += "_ ";
        }
      }
      document.querySelector(".user-input").value = showString;
    }
  });
}

callLogo();

document.querySelector(".submit").addEventListener("click", () => {
  let userInputValue = document.querySelector(".user-input").value;
  if (userInputValue == countryName) {
    console.log("right answer");
    alert("RIGHT ANSWER");
  }
});
