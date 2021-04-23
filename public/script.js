const startButton = document.getElementById('startButton');
const message = document.getElementById('message');
const cardsContainer = document.getElementsByClassName('cards-container')[0];
const cards = document.getElementsByClassName('card');
let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];
let trigger = true;

startButton.addEventListener('click', startGame);

function startGame() {
    //array of all unique icons
    let iconList = [
        {
            'value': '1',
            'icon': '<i class="fas fa-bullhorn"></i>',
        },
        {
            'value': '2',
            'icon': '<i class="far fa-bell"></i>',
        },
        {
            'value': '3',
            'icon': '<i class="fas fa-burn"></i>',
        },
        {
            'value': '4',
            'icon': '<i class="fas fa-bahai"></i>',
        },
        {
            'value': '5',
            'icon': '<i class="fas fa-broom"></i>',
        },
        {
            'value': '6',
            'icon': '<i class="fab fa-angellist"></i>',
        },
        {
            'value': '7',
            'icon': '<i class="fas fa-biking"></i>',
        },
        {
            'value': '8',
            'icon': '<i class="fas fa-bomb"></i>',
        },
        {
            'value': '9',
            'icon': '<i class="fas fa-brain"></i>',
        },
        {
            'value': '10',
            'icon': '<i class="fas fa-car-side"></i>',
        },
        {
            'value': '11',
            'icon': '<i class="fas fa-bone"></i>',
        },
        {
            'value': '12',
            'icon': '<i class="fas fa-cog"></i>',
        },
        {
            'value': '13',
            'icon': '<i class="fas fa-couch"></i>',
        },
        {
            'value': '14',
            'icon': '<i class="fas fa-crow"></i>',
        },
        {
            'value': '15',
            'icon': '<i class="fas fa-city"></i>',
        },
        {
            'value': '16',
            'icon': '<i class="fab fa-envira"></i>',
        },
        {
            'value': '17',
            'icon': '<i class="fas fa-fish"></i>',
        },
        {
            'value': '18',
            'icon': '<i class="fas fa-key"></i>',
        },
        {
            'value': '19',
            'icon': '<i class="far fa-eye"></i>',
        },
        {
            'value': '20',
            'icon': '<i class="fas fa-lock"></i>',
        },
        {
            'value': '21',
            'icon': '<i class="far fa-moon"></i>',
        },
        {
            'value': '22',
            'icon': '<i class="fas fa-pizza-slice"></i>',
        },
        {
            'value': '23',
            'icon': '<i class="fas fa-rocket"></i>',
        },
        {
            'value': '24',
            'icon': '<i class="fas fa-shoe-prints"></i>',
        },
        {
            'value': '25',
            'icon': '<i class="fab fa-sticker-mule"></i>',
        }

    ];

    //doubled and shuffled array
    const iconListDouble = iconList
        .concat(iconList)
        .sort(() => 0.5 - Math.random());

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

    //add event listeners to cards
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', flipCard);
    }

    //flip a card
    function flipCard(e) {
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
            trigger = true;
            setTimeout(checkForMatch, 500);
        }
    }

    //check for matches
    function checkForMatch() {
        setTimeout(function () {
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

            } else if (cardsChosen[0] === cardsChosen[1]) {
                message.innerText = 'Well done! You found a match';
                cards[optionOneId].removeEventListener('click', flipCard);
                cards[optionTwoId].removeEventListener('click', flipCard);
                cardsWon.push(cardsChosen);
            } else {
                cards[optionOneId].style.backgroundImage = 'url("./IMG/card_back.png")';
                cards[optionTwoId].style.backgroundImage = 'url("./IMG/card_back.png")';
                iconId0.classList.add('front');
                iconId1.classList.add('front');
                message.innerText = 'Sorry, try again';
            }
            cardsChosen = [];
            cardsChosenId = [];
            if (cardsWon.length === iconListDouble.length / 2) {
                message.innerText = 'Congratulations! You found them all!';
            }
            trigger = false;
        })
    }
}
