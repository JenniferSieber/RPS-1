const computerChoices = document.querySelector(".computer-choices");
const choices = document.querySelectorAll(".choice");
const userScore = document.querySelector(".user-tally");
const botScore = document.querySelector(".bot-tally");
const statusMsg = document.querySelector("#status-msg");
const startBtn = document.querySelector(".start");
const playAgain = document.querySelector(".play-again");

let running = false;
let chosenBox = null;
let userWin = 0;
let botWin = 0;

let choicesArr = [];
const imgURLs = [
  `./imgs/ben-karpinski-ctWw2S9VqOI-unsplash.jpg`,
  "./imgs/absolutvision-WYd_PkCa1BY-unsplash.jpg",
  "./imgs/naomi-o-hare-ZxrKugW-6Eg-unsplash.jpg",
];

class Option {
  constructor(choices) {
    this.choices = choices;
    this.clicked = false;
    this.chosen = null;

    const that = this;
    const random = Math.floor(Math.random() * 10) + 1;
    //user
    let value = "";
    //bot
    let botname = "";
    let botvalue = "";
    let boturl = "";

    this.addClickEvents = function () {
      choices.forEach((choice) => {
        choice.addEventListener("click", (e) => {
          if (!that.clicked && running == true) {
            that.chosen = choice;
            value = that.chosen.getAttribute("value");
            choicesArr.push(value);
            that.clicked = true;
            that.clickChoice(choice);
            that.botImg();
            that.displayBot();
            that.userChoiceUpdate();
            that.removeClickEvents();
            that.scoreDisplay();
          }
        });
      });
    };

    this.clickChoice = function () {
      chosenBox = that.chosen;
      chosenBox.classList.add("enlarge");
      return value;
    };

    this.removeClickEvents = function () {
      choices.forEach((choice) => {
        choice.removeEventListener("click", null);
      });
    };

    this.userChoiceUpdate = function () {
      choices.forEach((choice) => {
        if (!choice.classList.contains("enlarge")) {
          choice.classList.add("hidden");
        }
      });
    };

    this.botImg = function () {
      console.log(random);
      if (random < 3.34) {
        botname = "bot";
        botvalue = "rock";
        boturl = imgURLs[0];
        choicesArr.push(botvalue);
        return [botname, botvalue, boturl];
      } else if (random < 6.68) {
        botname = "bot";
        botvalue = "paper";
        boturl = imgURLs[1];
        choicesArr.push(botvalue);
        return [botname, botvalue, boturl];
      } else {
        botname = "bot";
        botvalue = "scissors";
        boturl = imgURLs[2];
        choicesArr.push(botvalue);
        return [botname, botvalue, boturl];
      }
    };

    this.displayBot = function () {
      running = false;
      let botBox = document.querySelector(".computer-choices");
      let botImg = document.querySelector(".computer-choice");
      let botMsg = document.querySelector(".computer-choice-title");

      if (botBox.classList.contains("hidden") && choicesArr.length >= 2) {
        botBox.classList.remove("hidden");
        botImg.style.backgroundImage = `url(${boturl})`;
        botImg.style.backgroundSize = "cover";
        botMsg.textContent = `Bot chose ${botvalue}`;
      } else {
        botBox.classList.add("hidden");
      }
    };

    this.scoreDisplay = function () {
      const user = choicesArr[0];
      const bot = choicesArr[1];

      if (choicesArr[0] == choicesArr[1]) {
        statusMsg.textContent = `Draw, play Again.`;
        userWin;
        botWin;
        return `Draw`;
      }
      if (
        (user == "rock" && bot == "scissors") ||
        (user == "paper" && bot == "rock") ||
        (user == "scissors" && bot == "paper")
      ) {
        statusMsg.textContent = `You Win, play again!`;
        userWin++;
        userScore.textContent = userWin;
      } else {
        statusMsg.textContent = `Bot Wins, play again!`;
        botWin++;
        botScore.textContent = botWin;
      }
    };
  }
}

startBtn.addEventListener("click", () => {
  if (running == false) {
    running = true;
    startBtn.classList.add("hidden");
    playAgain.classList.remove("hidden");
    const click = new Option(choices);
    click.addClickEvents();
  }
});

function reset() {
  running = false;
  choicesArr = [];
  chosenBox = null;
  statusMsg.textContent = "";
  choices.forEach((choice) => {
    choice.classList.remove("hidden");
    choice.classList.remove("enlarge");
  });
  computerChoices.classList.add("hidden");
  playAgain.classList.add("hidden");
  startBtn.classList.remove("hidden");
}

playAgain.addEventListener("click", () => {
  if (running == false) {
    reset();
  }
});

document.querySelector(".clear-all").addEventListener("click", () => {
    userScore.textContent = 0;
    botScore.textContent = 0;
    userWin = 0;
    botWin = 0;
    reset();
});
