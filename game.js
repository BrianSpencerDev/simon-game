let gamePattern = [];
let userClickedPattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];

var randomChosenColor;
var audio;
var isStarted = false;
var level = 0;

//add next color in sequence to game pattern
$(document).on("keydown", startGame);

//store player pattern
$(".btn").on("click", handleClick);


function startGame(){
  if(isStarted)
    console.log("game has already started");
  else{
    nextSequence();
    isStarted = true;
  }

}

function nextSequence(){
  randomChosenColor = Math.floor(Math.random() * 4);
  var currentColor = buttonColors[randomChosenColor];

  userClickedPattern = [];
  //increment level and change level header text accordingly
  level++;
  $("#level-title").text("Level " + level);

  //add current color to game pattern sequence
  gamePattern.push(currentColor);

  //display current color to user
  $("#" + currentColor).fadeOut(100).fadeIn(100);
  playSound(currentColor);

}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern [currentLevel]){
    console.log("success");
    if(currentLevel === gamePattern.length - 1){
      console.log("next shit?")
      setTimeout(function() {nextSequence();}, 1000);
      //userClickedPattern = [];
    }
  }
  else{
    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over")
    setTimeout(function() { $("body").removeClass("game-over"); }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function playSound(name){
  var soundFile = "sounds/" + name + ".mp3"
  var sound = new Audio(soundFile);

  sound.play();
}

function startOver(){
  level = 0;
  gamePattern = [];
  isStarted = false;
}

function animatePress(currentColor){
  $("#" + currentColor).addClass('pressed');
  setTimeout(function(){ $("#" + currentColor).removeClass('pressed'); }, 100);
}

function handleClick(){
  var userChosenColor = this.id;

  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
}
