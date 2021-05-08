const startButton = document.getElementById('startButton');
const message = document.getElementById('message');
const cardsContainer = document.getElementsByClassName('cards-container')[0];
const cards = document.getElementsByClassName('card');
let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];
let trigger = true;

//unique cards array
let icons = ["fas fa-bullhorn", "far fa-bell", "fas fa-burn", "fas fa-bahai", "fas fa-broom", "fab fa-angellist",
    "fas fa-biking", "fas fa-bomb", "fas fa-brain", "fas fa-car-side", "fas fa-bone", "fas fa-cog", "fas fa-couch",
    "fas fa-crow", "fas fa-city", "fab fa-envira", "fas fa-fish", "fas fa-key", "far fa-eye", "fas fa-lock",
    "far fa-moon", "fas fa-pizza-slice", "fas fa-rocket", "fas fa-shoe-prints", "fab fa-sticker-mule"];
let iconList = [];
for (let i = 0; i < icons.length; i++) {
    let icon = `<i class="${icons[i]}"></i>`;
    let val = i + 1;
    iconList.push({'value': val, 'icon': icon})
}

//doubled and shuffled cards array
const iconListDouble = iconList
    .concat(iconList)
    .sort(() => 0.5 - Math.random());

let game = {
    init: function () {
        startButton.addEventListener('click', game.startGame);
    },
    startGame: function () {
        startButton.innerText = "Restart game";
        message.innerText = "";
        cardsContainer.innerHTML = "";

        //show all cards
        iconListDouble.map((item, index) => {
            cardsContainer.innerHTML +=
                ` <div class="card" id="${index}">
                    <div class="front" id="value${index}">${item.icon}</div>
               </div>`
        })
        game.addListener()
    },
    flipCard: function (e) {
        message.innerText = '';
        let cardId = e.target.id;
        cardsChosen.push(iconListDouble[cardId].value);
        cardsChosenId.push(cardId);

        let card = document.getElementById(e.target.id);
        let icon = document.getElementById(e.target.children[0].id);

        card.style.backgroundImage = 'none';
        icon.classList.remove('front');
        localStorage.setItem('iconHtml', JSON.stringify(icon));

        if (cardsChosen.length === 2) {
            for (let i = 0; i < cards.length; i++) {
                cards[i].removeEventListener('click', game.flipCard);
            }
            trigger = true;
            setTimeout(game.checkForMatch, 500);
        }
    },
    checkForMatch: function () {
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];
        const chosenIcon0 = 'value' + cardsChosenId[0];
        const chosenIcon1 = 'value' + cardsChosenId[1];
        const iconId0 = document.getElementById(chosenIcon0);
        const iconId1 = document.getElementById(chosenIcon1);

        if (optionOneId === optionTwoId) {
            cards[optionOneId].style.backgroundImage = 'url("./IMG/card_back.png")';
            cards[optionTwoId].style.backgroundImage = 'url("./IMG/card_back.png")';
            message.innerText = 'You have clicked the same image!';
            game.addListener();
        } else if (cardsChosen[0] === cardsChosen[1]) {
            message.innerText = 'Well done! You found a match';
            cards[optionOneId].removeEventListener('click', game.flipCard);
            cards[optionTwoId].removeEventListener('click', game.flipCard);
            cardsWon.push(cardsChosen);
            game.addListener();
        } else {
            cards[optionOneId].style.backgroundImage = 'url("./IMG/card_back.png")';
            cards[optionTwoId].style.backgroundImage = 'url("./IMG/card_back.png")';
            iconId0.classList.add('front');
            iconId1.classList.add('front');
            message.innerText = 'Sorry, try again';
            game.addListener();
        }
        cardsChosen = [];
        cardsChosenId = [];
        if (cardsWon.length === iconListDouble.length / 2) {
            message.innerText = 'Congratulations! You found them all!';
        }
        trigger = false;

    },
    addListener: function () {
        for (let i = 0; i < cards.length; i++) {
            cards[i].addEventListener('click', game.flipCard);
        }
    }
}

window.addEventListener('load', () => {
    game.init();
});