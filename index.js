// function refresh(){
//     window.location.reload();
// }

// setInterval(refresh,5000);

const startBtn = document.querySelector(".start-btn");
const body = document.querySelector("body");
const gameScreen = document.querySelector(".game");
const startContainer = document.querySelector(".container");

startBtn.addEventListener("click", () => {
  startContainer.style.display = "none";
  gameScreen.style.display = "block";
});
