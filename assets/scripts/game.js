const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const GAMEBOARD = "gameBoard";
const ICON = "icon";
let cards = [];
let cardsFliped = [];
let cardsSrc = []

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


techs.forEach((tech) => {

    createCard(tech);
    createCard(tech);

});

shuffleCards(cards);


cards.forEach((card) => {
    gameBoard.appendChild(card);


    card.addEventListener('click', () => {
        let divChild = card.querySelector('div');
        let img = divChild.querySelector('img');
        let icon = img.src;

        flip(card);
        cardsSrc.push(icon);
        cardsFliped.push(card);
    })

});


console.log(cardsSrc);
console.log(cardsFliped);
checkMatch(cardsSrc);




function checkMatch(cards) {
    if (cards[0] != cards[1]) {
        setTimeout(() => flipBack(cardsFliped), 1500);

    }

}


function createCard(tech) {
    let id = tech + Math.floor(Math.random() * 1000);


    let card = document.createElement("div");
    // gameBoard.appendChild(card);
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

function flipBack(cardsFliped) {
    //encontrar uma forma de acessar os itens clicados da onde vieram os caminhos que foram inseridos no array cardsFliped, e remover a classe flip
    cardsFliped[0].classList.remove('flip');
    cardsFliped[1].classList.remove('flip');
}


