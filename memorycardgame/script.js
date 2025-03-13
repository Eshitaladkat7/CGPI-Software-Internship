const emojis = ["🍎", "🍌", "🍇", "🍓", "🍒", "🍍", "🥝", "🍉"];
let cards = [...emojis, ...emojis]; // Duplicates for matching pairs
let flippedCards = [];
let matchedCards = [];
let gameBoard = document.getElementById("gameBoard");
let timerDisplay = document.getElementById("timer");
let restartBtn = document.getElementById("restart");
let timer;
let seconds = 0;
let isGameActive = false;

// Shuffle function using Fisher-Yates algorithm
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startGame() {
    gameBoard.innerHTML = "";
    shuffledCards = [...cards];
    shuffle(shuffledCards);
    matchedCards = [];
    flippedCards = [];
    isGameActive = false;
    seconds = 0;
    timerDisplay.textContent = "0";
    clearInterval(timer);

    shuffledCards.forEach((emoji, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.emoji = emoji;
        card.dataset.index = index;
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (!isGameActive) {
        isGameActive = true;
        timer = setInterval(() => {
            seconds++;
            timerDisplay.textContent = seconds;
        }, 1000);
    }

    if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
        this.textContent = this.dataset.emoji;
        this.classList.add("flipped");
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

function checkForMatch() {
    let [card1, card2] = flippedCards;
    if (card1.dataset.emoji === card2.dataset.emoji) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedCards.push(card1, card2);
        flippedCards = [];

        if (matchedCards.length === cards.length) {
            clearInterval(timer);
            setTimeout(() => alert(`You won in ${seconds} seconds! 🎉`), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1.textContent = "";
            card2.textContent = "";
            flippedCards = [];
        }, 1000);
    }
}

restartBtn.addEventListener("click", startGame);
startGame();
