"use strict"

let cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this == firstCard) return;

    this.classList.add("flip");

    if( !hasFlippedCard ) {
        // first click
        hasFlippedCard = true;
        firstCard = this;

        return;
    } 

    //second card
    hasFlippedCard = false;
    secondCard = this;

    checkForMatch()
}

function checkForMatch() {
    // do cards match?
    if (firstCard.dataset.image == secondCard.dataset.image) {
        // it's a match!
        disableCards()
    } else {
        //not a match
        unflipCards()
    }
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard()
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard()
    }, 1200);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    })
})();

cards.forEach(card => card.addEventListener("click", flipCard))