const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const GAMEBOARD = "gameBoard";
const ICON = "icon";
let cards = [];
let firstCard = null;
let secondCard = null;
let lockMode = false;
let cardsFliped = [];
let gameBoard = document.getElementsByClassName(GAMEBOARD)[0];
let techs = ['bootstrap',
    'css',
    'electron',
    'firebase',
    'html',
    'javascript',
    'jquery',
    'mongo',
    'node',
    'react'
];

startGame();


function startGame() {
    techs.forEach((tech) => {

        createCard(tech);
        createCard(tech);
        shuffleCards(cards);
    });

    cards.forEach((card) => {
        gameBoard.appendChild(card);


        card.addEventListener('click', () => {


            if (firstCard == null || secondCard == null) {
                setCard(card);
                flip(card);
                console.log(cardsFliped)
                setTimeout(() => {
                    checkMatch();
                    clearCards();
                    gameOver();
                }, 1000);

            }

        })


    });

}



function setCard(card) {
    let divChild = card.querySelector('div');
    let img = divChild.querySelector('img');
    let icon = img.src;


    if (firstCard == null || lockMode) {
        firstCard = card;
        cardsFliped.push(icon);
        return true;
    } else {
        secondCard = card;
        lockMode = true;
        cardsFliped.push(icon);
        return true;
    }
}




function createCard(tech) {
    let id = tech + Math.floor(Math.random() * 1000);

    let card = document.createElement("div");
    card.classList.add(CARD);
    card.id = id;
    cards.push(card);

    let card_front = document.createElement("div");
    card.appendChild(card_front);
    card_front.classList.add(FRONT);

    let icon = document.createElement("img");
    icon.src = "./assets/images/" + tech + ".png";
    icon.classList.add(ICON);
    card_front.appendChild(icon);

    let card_back = document.createElement("div");
    card_back.innerText = "</>"
    card.appendChild(card_back);
    card_back.classList.add(BACK);
}



function shuffleCards(array) {

    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * (currentIndex));
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array

}

function flip(card) {
    card.classList.add('flip')
}

function flipBack() {
    let idFirstCard = firstCard.id;
    let idSecondCard = secondCard.id;
    let firstcardFliped = document.getElementById(idFirstCard);
    let secondcardFliped = document.getElementById(idSecondCard);

    firstcardFliped.classList.remove('flip');
    secondcardFliped.classList.remove('flip');

}

function clearCards() {
    firstCard = null;
    secondCard = null;
    lockMode = false;
    cardsFliped = [];
}

function checkMatch() {
    if (cardsFliped != '' && cardsFliped[0] != cardsFliped[1]) {
        flipBack();
    }

}


function gameOver() {
    let allCards = document.getElementsByClassName('card');
    let allFliped = true;
    let gameOverScreen = document.getElementsByClassName('gameOver')[0];

    for (let i = 0; i < allCards.length; i++) {
        if (!allCards[i].classList.contains('flip')) {
            allFliped = false;
            break;
        }

    }

    if (allFliped == true) {

        gameOverScreen.style.display = 'flex';
        reiniciar()
    }

}

function reiniciar() {
    let button = document.getElementById('restart');
    let gameOverScreen = document.getElementsByClassName('gameOver')[0];
    button.addEventListener('click', () => {
        gameOverScreen.style.display = 'none';

        while (gameBoard.firstChild) {
            gameBoard.removeChild(gameBoard.firstChild);
        }

        cards = [];
        clearCards();
        startGame();
    })

}