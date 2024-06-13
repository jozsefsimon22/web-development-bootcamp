
$(".box").mousedown(function () {
    $(this).addClass("pressed");
    console.log(nextButton());
});

$(".box").mouseup(function () {
    $(this).removeClass("pressed");
});


function nextButton(){
    var button = Math.floor(Math.random() * 4);
    return button;
}