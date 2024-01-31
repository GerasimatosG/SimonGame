var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var randomChosenColour;
var hasGameStarted = false;
var level = 0;
var userChosenColourIndex;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).addClass("flashed");
  setTimeout(function () {
    $("#" + randomChosenColour).removeClass("flashed");
  }, 500);

  $("h1").text("Level 0");

  for (var i = 0; i < gamePattern.length; i++) {
    level = "Level " + i;
    $("h1").text(level);
  }

  playSound(randomChosenColour);
}

$(".btn").on("click", function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userChosenColourIndex = userClickedPattern.length - 1;
  checkAnswer(userChosenColourIndex);
});

$(document).on("keydown", function () {
  if (!hasGameStarted) {
    nextSequence();
    hasGameStarted = true;
  } else {
    startOver();
  }
});

//functions for when buttons are pushed
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//check result

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        userClickedPattern.length = 0;
        nextSequence();
      }, 1000);
    }
  } else {
    var wrong = "wrong";
    playSound(wrong);
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over\nPress any key to Restart");
    startOver();
  }
}

//start again
function startOver() {
  gamePattern.length = 0;
  userClickedPattern.length = 0;
  hasGameStarted = false;
}
