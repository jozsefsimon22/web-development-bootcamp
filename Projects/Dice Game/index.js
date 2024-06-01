var firstVisit = true;
checkFirstVisit();

if (!firstVisit) {
    var playerOneNumber = returnRandomNumber();
    var playerTwoNumber = returnRandomNumber();
    updateDiceImage(playerOneNumber, 1);
    updateDiceImage(playerTwoNumber, 2);
    if (playerOneNumber > playerTwoNumber) {
        document.querySelector(".winner-1").classList.add("visible");
        document.querySelector("#winner-image-1").classList.add("visible");
    }
    else if (playerOneNumber == playerTwoNumber){
        document.querySelector(".winner-1").classList.add("visible");
        document.querySelector(".winner-1").textContent = "It's a draw!";
        document.querySelector(".winner-2").classList.add("visible");
        document.querySelector(".winner-2").textContent = "It's a draw!";
    }
    else {
        document.querySelector(".winner-2").classList.add("visible");
        document.querySelector("#winner-image-2").classList.add("visible");
    }
}

function updateDiceImage(number, player){
    if (number == 1){
        document.querySelector("#dice-" + player).setAttribute("src", "./Assets/dice-six-faces-one.svg")
    }
    else if(number ==2){
        document.querySelector("#dice-" + player).setAttribute("src", "./Assets/dice-six-faces-two.svg")
    }
    else if(number ==3){
        document.querySelector("#dice-" + player).setAttribute("src", "./Assets/dice-six-faces-three.svg")
    }
    else if(number ==4){
        document.querySelector("#dice-" + player).setAttribute("src", "./Assets/dice-six-faces-four.svg")
    }
    else if(number ==5){
        document.querySelector("#dice-" + player).setAttribute("src", "./Assets/dice-six-faces-five.svg")
    }
    else{
        document.querySelector("#dice-" + player).setAttribute("src", "./Assets/dice-six-faces-six.svg")
    }
}

function checkFirstVisit() {
    if (document.cookie.indexOf("firstVisit") == -1) {
        document.cookie = "firstVisit=1"
    }
    else {
        firstVisit = false;
    }
}

function returnRandomNumber() {
    var number = Math.random();
    number = Math.round(number * 6);
    if (number == 0) {
        number++;
    }
    return number;
}