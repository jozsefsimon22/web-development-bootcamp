
var currentLevel = 1;

$(".box").mousedown(function () {
    $(this).addClass("pressed");
    console.log(nextButton());
});

$(".box").mouseup(function () {
    $(this).removeClass("pressed");
});


$(document).keydown(function (e) {
    $("h1").text("Level " + currentLevel);
    nextButton();
});


function nextButton() {
    var button = Math.floor(Math.random() * 4);


    switch (button) {
        case 0:
            $(".green").addClass("pressed");
            var greenSound = new Audio("/sounds/tom-1.mp3");
            greenSound.play();
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

    return button;
}