const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
let playerLives = 12;

//Link text
playerLivesCount.textContext = playerLives;

//Generate the data
const getData = () => [
    { imgSrc: "./images/File1.jpeg", name: "photo1" },
    { imgSrc: "./images/File2.jpeg", name: "photo2" },
    { imgSrc: "./images/File3.jpeg", name: "photo3" },
    { imgSrc: "./images/File4.jpeg", name: "photo4" },
    { imgSrc: "./images/File5.jpeg", name: "photo5" },
    { imgSrc: "./images/File6.jpeg", name: "photo6" },
    { imgSrc: "./images/File7.jpeg", name: "photo7" },
    { imgSrc: "./images/File8.png", name: "photo8" },
    { imgSrc: "./images/File1.jpeg", name: "photo1" },
    { imgSrc: "./images/File2.jpeg", name: "photo2" },
    { imgSrc: "./images/File3.jpeg", name: "photo3" },
    { imgSrc: "./images/File4.jpeg", name: "photo4" },
    { imgSrc: "./images/File5.jpeg", name: "photo5" },
    { imgSrc: "./images/File6.jpeg", name: "photo6" },
    { imgSrc: "./images/File7.jpeg", name: "photo7" },
    { imgSrc: "./images/File8.png", name: "photo8" }, 
];

//Randomize
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
};

//Card Generator Function
const cardGenerator = () => {
    const cardData = randomize();
    //Generate the HTML
    cardData.forEach((item) => {
        const card = document.createElement("div");
        const face = document.createElement("img");
        const back = document.createElement("div");
        card.classList = "card";
        face.classList = "face";
        back.classList = "back";
        //Attach the info to the cards
        face.src = item.imgSrc;
        card.setAttribute("name", item.name);
        //Attach the cards to the section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

       card.addEventListener('click', (e) => {
        card.classList.toggle('toggleCard');
        checkCards(e);
       });
    });
};
//Check Cards
const checkCards = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add("flipped");
    const flippedCards = document.querySelectorAll('.flipped');
    const toggleCard = document.querySelectorAll(".toggleCard");
    
    //Logic
    if(flippedCards.length === 2) {
        if (
        flippedCards[0].getAttribute("name") === 
        flippedCards[1].getAttribute("name")
        ) {
            console.log('match');
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                card.style.pointerEvents = "none";
            })
        } else {
            console.log("wrong");
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                setTimeout(() => card.classList.remove("toggleCard"), 1000);
            });
            playerLives--;
            playerLivesCount.textContent = playerLives;
            if (playerLives === 0) {
                // restart("hehe, you lose");
                restart();
                console.log("ai pierdut")
            }
        }
    }
    //Run to see if you win
    if(toggleCard.length === 16) {
        restart("you won");
    }
};

//Restart
const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    section.style.pointerEvents = "none";
    cardData.forEach((item,index) => {
        cards[index].classList.remove("toggleCard");
        //Randomize
        setTimeout(() => {
            cards[index].style.pointerEvents = "all";
            faces[index].src = item.imgSrc;
            cards[index].setAttribute("name", item.name);
            section.style.pointerEvents = "all";
        }, 1000);
    });
    playerLives = 6;
    playerLivesCount.textContent = playerLives;
    setTimeout(() => window.alert(text), 100);
};
cardGenerator();