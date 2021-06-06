
$(document).ready(function(){
  $(".introduction").css("visibility", "visible");
})
$(".material-icons").click(function(){
  $(".introduction").css("visibility", "hidden");
})
var buttonColours=['red', 'blue','green','yellow'];

var gamePattern=[];

var userClickedPattern=[];
var started = false;
  var level=0;
$(document).keypress(function(){
  if(!started){
    $('#level-title').text(`Level ${level}`);
    nextSequence();
    started = true;
  }
});
$(".button").click(function(){
  if(!started){
    $('#level-title').text(`Level ${level}`);
    nextSequence();
    started = true;
  }
});
$(".btn").click(function(){

  var userChosenColour= $(this).attr("id");

  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
  //console.log(userClickedPattern);
});

function animatePress(name){
  $('#'+name).addClass("pressed");
  setTimeout(function(){
    $('#'+name).removeClass("pressed");
  },100);
}

function nextSequence(){
  userClickedPattern = [];
    level++;
  $('#level-title').text(`Level ${level}`);
  var randomNumber=Math.floor(Math.random()*4);
  var randomColours=buttonColours[randomNumber];

  gamePattern.push(randomColours);

  $('#' + randomColours).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColours)
  console.log(gamePattern);
}
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }else{
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, To Restart the game press start button");
    startOver();
    console.log("failure");
  }
  //console.log(x);
}

function startOver(){
  gamePattern = [];
  level = 0;
  started = false;
}
