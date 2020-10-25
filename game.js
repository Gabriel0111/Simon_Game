var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
var currentLevel = 0;

$(document).on("keydown touchstart", function () {
  if (!started) {
    started = true;
    nextSequence();
  }
});

$(".btn").click(function () {
  if (started) {
    var chosenColour = this.id;
    userClickedPattern.push(chosenColour);

    animateCell(chosenColour);
    playSound(chosenColour);

    currentLevel++;
    checkAnswer(currentLevel);
  }
});

function nextSequence() {
  ++level;
  currentLevel = 0;

  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  playSound(randomChosenColour);
  animateCell(randomChosenColour);
}

function playSound(sound) {
  var audio = new Audio("sounds/" + sound + ".mp3");
  audio.play();
}

function animateCell(cell) {
  $("#" + cell)
    .addClass("pressed")
    .animate({ opacity: 0 }, 100)
    .animate({ opacity: 100 }, 100);

  setTimeout(() => {
    $("#" + cell).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  var hasTrue = true;

  for (var i = 0; i < currentLevel; i++) {
    if (userClickedPattern[i] != gamePattern[i]) {
      hasTrue = false;
      break;
    }
  }

  if (!hasTrue) {
    gameOver();
    return;
  }

  if (currentLevel === level) {
    setTimeout(() => {
      userClickedPattern = [];
      nextSequence();
    }, 1000);
  }
}

function gameOver() {
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("h1").text("Game Over, Press Any Key to Restart...");
  $("body").addClass("game-over");

  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);

  startOver();
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
