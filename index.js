const cards = [];
const animals = [
  "fish",
  "cat",
  "paw",
  "crow",
  "otter",
  "hippo",
  "dog",
  "kiwi-bird",
  "dove",
  "horse",
  "dragon",
  "frog",
  "feather",
  "fish",
  "cat",
  "paw",
  "crow",
  "otter",
  "hippo",
  "dog",
  "kiwi-bird",
  "dove",
  "horse",
  "dragon",
  "frog",
  "feather",
];
const colors = [
  "#A2D2FF",
  "#FF4848",
  "#FFD371",
  "#9DDAC6",
  "#A2D2FF",
  "#B97A95",
  "#FFA0A0",
  "#185ADB",
  "#DE8971",
  "black",
  "#7EB5A6",
  "green",
  "gray",
  "purple",
];
// 카드에 data-animal해서 동물 종류에 대한 인덱스를 써주기
// innerHTML에 동물 그림 추가해 줄것임. map 사용해서.
const cardContainer = document.querySelector("#card-container");

function shuffleCard(n) {
  //랜덤한, 0~n 까지의 숫자 사이에서 두개를 골라서, 그 숫자를 보수와 위치를 바꿔준다.
  let shuffleCount = cards.length;
  while (shuffleCount * 3) {
    //0~n/2 중에서 랜덤한 인덱스 2개 고르기
    const chooseIndex1 = Math.round(Math.random() * Math.floor(n - 1));
    const chooseIndex2 = Math.round(Math.random() * Math.floor(n - 1));

    //두 랜덤 인덱스 사이에 위치 바꾸기
    [cards[chooseIndex1], cards[chooseIndex2]] = [
      cards[chooseIndex2],
      cards[chooseIndex1],
    ];
    shuffleCount--;
  }
}

//n개의 카드 생성
function generateCard(n) {
  //0~n까지의 숫자를 카드에 집어넣기.
  for (let i = 0; i < n; i++) {
    const card = {
      index: i,
      name: animals[i],
      color: colors[i],
    };
    card.number = i;
    cards.push(card);
    const newCard = JSON.parse(JSON.stringify(card));
    newCard.number = i + n;
    cards.push(newCard);
  }
  shuffleCard(n);
  const cardContent = cards
    .map((card) => {
      return `<div class="card closed" data-animal=${card.index} data-number=${card.number}><i class="fas fa-star-and-crescent card-item"></i></div>`;
      // return `<div class="card closed" data-animal=${card.index}><i class="fas fa-${card.name} card-item" style="color:${card.color};"></i></div>`;
    })
    .join("");
  cardContainer.innerHTML = cardContent;
}
let numberOfCard = 5;
//generateCard(numberOfCard);
const displayCards = Array.from(document.querySelectorAll(".card"));
const trialsText = document.querySelector(".trials");
const players = document.querySelectorAll(".player");
const scoreText1 = players[0].querySelector(".score");
const scoreText2 = players[1].querySelector(".score");
const form = document.querySelector("#question");
const giveCardBtn = form.querySelector("button");

let choosenCard = -1;
let firstCardIndex = -1;
let trials = 0;
let player1Score = 0;
let player2Score = 0;
let ansCount = 0;

displayCards.forEach((card) =>
  card.addEventListener("click", () => {
    //눈에 보이는 장치 : 카드의 모양과 색깔을 확인시켜준다.
    const animalIndex = card.dataset.animal;
    const numberIndex = card.dataset.number;
    const cardPic = card.querySelector("i");
    card.classList.remove("closed");
    cardPic.classList.remove("fa-star-and-crescent");
    cardPic.classList.add(`fa-${animals[animalIndex]}`);
    cardPic.style.color = `${colors[animalIndex]}`;

    //점수 획득용 장치
    //첫번쨰 카드 선택
    if (choosenCard == -1) {
      choosenCard = animalIndex;
      firstCardIndex = numberIndex;
    }
    //두번째 카드 선택
    else {
      if (choosenCard == animalIndex) {
        console.log("correct!");
        choosenCard = -1;
        ansCount++;
        if (trials == 0 || trials % 2 == 0) {
          player1Score += 10;
          scoreText1.textContent = player1Score;
        } else {
          player2Score += 10;
          scoreText2.textContent = player2Score;
        }
        //여기서 우승자 발생!
        if (ansCount == numberOfCard) {
          if (player1Score == player2Score) {
            players[0].classList.add("draw");
            players[1].classList.add("draw");
            scoreText1.textContent = "draw🎈";
            scoreText2.textContent = "draw🎈";
          } else if (player1Score > player2Score) {
            console.log("player1 wins!");
            players[0].classList.add("winner");
            players[1].classList.add("loser");
            scoreText1.textContent = "win🥇";
            scoreText2.textContent = "lose💧";
          } else {
            console.log("player2 wins!");
            players[0].classList.add("loser");
            players[1].classList.add("winner");
            scoreText2.textContent = "win🥇";
            scoreText1.textContent = "lose💧";
          }
        }
      } else {
        choosenCard = -1;
        console.log("wrong!");
        const pickedCard = cardContainer.querySelector(
          `.card[data-number="${firstCardIndex}"]`
        );
        setTimeout(() => {
          pickedCard.classList.add("closed");
          card.classList.add("closed");
        }, 1000);
      }
      trials++;
      trialsText.textContent = trials;
      setTimeout(() => {
        players.forEach((player) => {
          player.classList.toggle("active");
        });
      }, 1000);
    }
  })
);

giveCardBtn.addEventListener("click", () => {
  numberOfCard = form.querySelector("#card-num").value || 5;
  generateCard(numberOfCard);
  form.classList.add("erase");
});
