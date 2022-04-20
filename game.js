var buttonColours = ["green", "red", "yellow", "blue"];
var gamePattern = [];

var userClickedPattern = [];


var started = false;
var restart = false;
var userclick = 0;

var level = 0;


$(document).keypress(function(event) {
  if (!started) {
    if(event.key == "a"){
      nextSequence();
      started = true;
    }
  }
  if(restart){
    nextSequence();
    restart = false;
  }
});


$(".btn").click(function(event) {
  var userChosenColour = $(this).attr("id");

  if(userChosenColour == gamePattern[userclick]){
    userclick ++;
    if(userclick == level) {
      nextSequence()
    }
  }else {
    //restart
    reset()
  }



  userClickedPattern.push(userChosenColour);


  playSound(userChosenColour);

  animePress(userChosenColour)
});

function reset(){
  gamePattern = [];
  userclick = 0;
  level = 0;
  $("#level-title").text("Game Over, Press Any Key To Restart.");
  restart = true;
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
      $("body").removeClass("game-over");
  }, 100);
}


function nextSequence() {
  level ++;


  $("#level-title").text("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];


  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(300).fadeOut(300).fadeIn(300);

  playSound(randomChosenColour);

  userclick = 0;
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}




function checkAnswer(currentLevel) {
  console.log(gamePattern)
 if(gamePattern == userClickedPattern){
   console.log("Success")
 }else {
   console.log("Wrong")
 }
}
