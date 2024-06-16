
var currentLevel = 0;
var generatedButtons = [];
var userButtons = [];

$(".box").mousedown(function () {
    if (currentLevel != 0) {
        $(this).addClass("pressed");
        var id = parseInt($(this).attr('id'));
        playSound(id);
        userButtons.push(id);
        validateResult();
    }
});

$(".box").mouseup(function () {
    $(this).removeClass("pressed");
});


$(document).keydown(function() {
    if (currentLevel == 0) {
        currentLevel++;
        $("h1").text("Level " + currentLevel);
        nextButton();
    }
});

function playSound(number) {
    switch (number) {
        case 0:
            $(".green").addClass("pressed");
            var greenSound = new Audio("sounds/tom-1.mp3");
            greenSound.play();
            break;
        case 1:
            $(".red").addClass("pressed");
            var redSound = new Audio("sounds/tom-2.mp3");
            redSound.play();
            break;
        case 2:
            $(".yellow").addClass("pressed");
            var yellowSound = new Audio("sounds/tom-3.mp3");
            yellowSound.play();
            break;
        case 3:
            $(".blue").addClass("pressed");
            var blueSound = new Audio("sounds/tom-4.mp3");
            blueSound.play();
            break;
    }
}


function nextButton() {
    var button = Math.floor(Math.random() * 4);
    playSound(button);
    generatedButtons.push(button);

    switch (button) {
        case 0:
            $(".green").addClass("pressed");
            setTimeout(function () {
                $(".green").removeClass("pressed");
            }, 1000);
            break;
        case 1:
            $(".red").addClass("pressed");
            setTimeout(function () {
                $(".red").removeClass("pressed");
            }, 1000);
            break;
        case 2:
            $(".yellow").addClass("pressed");
            setTimeout(function () {
                $(".yellow").removeClass("pressed");
            }, 1000);
            break;
        case 3:
            $(".blue").addClass("pressed");
            setTimeout(function () {
                $(".blue").removeClass("pressed");
            }, 1000);
            break;
    }
}

function restartGame() {
    $("h1").text("Game Over, Press Any Key to Restart");
    currentLevel = 0;
    generatedButtons = [];
    userButtons = [];
}

function validateResult() {
    var gameOver = false;
    for (let i = 0; i < userButtons.length; i++) {
        if (generatedButtons[i] != userButtons[i]) {
            gameOver = true;
            restartGame();
            break;
        }
    }

    if(!gameOver && generatedButtons.length == userButtons.length){
        currentLevel++;
        userButtons = [];
        setTimeout(function () {
            $("h1").text("Level " + currentLevel);
            nextButton();
        }, 1000);
    }
}