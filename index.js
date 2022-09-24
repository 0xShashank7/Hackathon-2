// function refresh(){
//     window.location.reload();
// }

// setInterval(refresh,5000);

const resultScreen = document.querySelector(".result");

let clickedCounter = 0;
let countryName = "",
  time = 30,
  timerUpdate,
  points = 0,
  streak = 0;

const startBtn = document.querySelector(".start-btn");
const body = document.querySelector("body");
const gameScreen = document.querySelector(".game");
const startContainer = document.querySelector(".container");
const username = document.querySelector("#userName");

const tiles = document.querySelector("#tiles-div-easy-9");
const tilesChildren = tiles.children;

function startTimer60() {
  timerUpdate = setInterval(() => {
    document.querySelector(".timer").innerHTML = `Time left: ${time} secs`;
    time--;
    if (time == -1) {
      clearInterval(timerUpdate);
      tiles.style.pointerEvents = "none";
      gameScreen.style.display = "none";
      const resultScreen = document.querySelector(".result");
      resultScreen.style.display = "flex";
      let scoreResult = document.querySelector(".score-result");
      let streakResult = document.querySelector(".streak-result");
      scoreResult.innerHTML = `Score: ${points}`;
      streakResult.innerHTML = `Streak: ${streak}`;
      points = 0;
      streak = 0;
    }
  }, 1000);
}

startBtn.addEventListener("click", () => {
  startContainer.style.display = "none";
  gameScreen.style.display = "block";
  let name = username.value;
  if (name == "") {
    name = "Guest";
  }
  document.querySelector(".name").innerHTML = `Hi, ${name} 👋🏻`;
});

tiles.addEventListener("click", (e) => {
  // console.log(e.target.classList);
  if (clickedCounter < 5) {
    for (let i = 0; i < 9; i++) {
      if (e.target.classList.contains(`${i + 1}`)) {
        tilesChildren[i].style.backgroundColor = "transparent";
        tilesChildren[i].style.pointerEvents = "none";
        tilesChildren[i].style.border = "none";
        document.querySelector(".clicks").innerHTML = `Clicks left: ${
          5 - (clickedCounter + 1)
        }`;
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
    startTimer60();
    countryName = res.data[randomIndex].name.common;
    document.querySelector(".game-image").src = res.data[randomIndex].flags.png;
    let showString = "";
    let x = parseInt(countryName.length / 2);
    for (let i = 0; i < x; i++) {
      if (countryName[i] == " ") {
        showString += "&nbsp;&nbsp;&nbsp;";
      } else {
        showString += "_ ";
      }
    }
    showString += countryName.slice(x);
    setTimeout(() => {
      document.querySelector(
        "#word-hint"
      ).innerHTML = `<label style="padding: 5px;">${showString}</label><label style="padding: 5px;">Continent - ${res.data[randomIndex].continents[0]}</label>`;
    }, 2000);
  });
}

callLogo();

document.querySelector(".submit").addEventListener("click", () => {
  clearInterval(timerUpdate);
  time = 30;
  let userInputValue = document.querySelector(".user-input").value;
  if (userInputValue.toLowerCase() == countryName.toLowerCase()) {
    //right answer code here
    document.querySelector(
      "#alert"
    ).innerHTML = `YOU GOT IT RIGHT<br>${countryName}`;
    document.querySelector("#alert").style.display = "flex";
    setTimeout(() => {
      document.querySelector("#alert").style.display = "none";
    }, 2000);
    document.querySelector("#tiles-div-easy-9").style.display = "none";
    points += 5 - clickedCounter + 5;
    streak++;
    document.querySelector(".score").innerHTML = `Score: ${points}`;
    document.querySelector(".streak").innerHTML = `Streak: ${streak}`;
    console.log("right answer");
    // alert("RIGHT ANSWER");
    setTimeout(() => {
      callLogo();
      clickedCounter = 0;
      document.querySelector(".clicks").innerHTML = `Clicks left: 5`;
      document.querySelector(".user-input").value = "";
      tiles.style.pointerEvents = "auto";
      for (let i = 0; i < 9; i++) {
        tilesChildren[i].style.backgroundColor = "purple";
        tilesChildren[i].style.pointerEvents = "auto";
        tilesChildren[i].style.border = "2px solid #ececef";
      }
      document.querySelector("#tiles-div-easy-9").style.display = "flex";
    }, 3000);
  } else if (userInputValue.toLowerCase() !== countryName.toLowerCase()) {
    // console.log("wrong answer");
    // alert("WRONG ANSWER");
    gameScreen.style.display = "none";

    if (streak > 5) {
      document.querySelector(".result-img").src =
        "https://media.kulfyapp.com/RmJKQc/RmJKQc-360.gif";
      // superStar
    } else if (streak > 0) {
      document.querySelector(".result-img").src =
        "https://c.tenor.com/Wx7Em_VR0o4AAAAC/laugh.gif";
      // vadivelu
    } else if (streak == 0) {
      document.querySelector(".result-img").src =
        "https://c.tenor.com/-e3miX1u_4YAAAAM/yento-endo-emo.gif";
      // brahmananadam
    }

    resultScreen.style.display = "flex";
    let scoreResult = document.querySelector(".score-result");
    let streakResult = document.querySelector(".streak-result");
    scoreResult.innerHTML = `Score: ${points}`;
    streakResult.innerHTML = `Streak: ${streak}`;

    points = 0;
    streak = 0;
  }
});

const playAgain = document.querySelector(".play-again");

playAgain.addEventListener("click", () => {
  // callLogo();
  // document.querySelector(".user-input").value = "";
  // resultScreen.style.display = "none";
  // startContainer.style.display = "flex";
  window.location.reload();
});
