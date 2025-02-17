const theTimer = document.querySelector(".timer");
const testArea = document.querySelector("#test-area");
let originText = document.querySelector("#origin-text p").innerText;
const testWrapper = document.querySelector(".test-wrapper");
const resetButton = document.querySelector("#reset");
const btnNew = document.querySelector('#btnNew');
let sampleBox = document.querySelector(".right > span > span");

let timer = [0, 0, 0, 0];
let timerRunning = false;
let interval;

function leadingZero(time) {
    return time <= 9 ? "0" + time : time;
}

function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;
    timer[0] = Math.floor((timer[3] / 100) / 60);
    timer[1] = Math.floor((timer[3] / 100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

function spellCheck() {
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0, textEntered.length);

    if (textEntered === originText) {
        testArea.style.borderColor = "green";
        clearInterval(interval);
    } else {
        testArea.style.borderColor = textEntered === originTextMatch ? "yellow" : "red";
    }
}

function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0, 0, 0, 0];
    timerRunning = false;
    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
}

function start() {
    if (testArea.value.length === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
}

const newText = () => {
    let sampleListWords = `Lorem ipsum dolor sit amet consectetur adipisicing elit Dolores veniam natus quidem enim nostrum mollitia iusto praesentium fugiat fugit quasi vero Labore possimus sint corrupti ullam iste soluta quasi et Tempora nulla aliquid rerum rem mollitia aliquam error nemo nisi repellat sit suscipit Incidunt laudantium provident voluptatum Provident praesentium eum magni sit maxime omnis delectus quam eaque eius id dolorem nostrum officia corporis officiis Quod consectetur at libero Expedita praesentium voluptatem nobis Magnam Nisi nobis dolorem velit perferendis minima dicta voluptatem distinctio consectetur corrupti odit sunt reiciendis laborum repellendus Maiores debitis consequuntur illo optio Soluta a nam ex dolores swq`.split(" ");
    let newString = "";
    for (let i = 0; i < Math.ceil(Math.random() * 20); i++) {
        newString += sampleListWords[Math.ceil(Math.random() * 100)] + " ";
    }
    newString = newString.trim() + ".";
    sampleBox.innerText = newString;
    originText = newString;
};

testArea.addEventListener("keypress", start);
testArea.addEventListener("keyup", spellCheck);
resetButton.addEventListener("click", reset);
btnNew.addEventListener("click", newText);
