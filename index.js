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
  while (shuffleCount * 2) {
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
  for (let i = 0; i < n / 2; i++) {
    const card = {
      index: i,
      name: animals[i],
      color: colors[i],
    };
    card.number = i;
    cards.push(card);
    const newCard = JSON.parse(JSON.stringify(card));
    newCard.number = i + n / 2;
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
generateCard(10);
const displayCards = Array.from(document.querySelectorAll(".card"));
let choosenCard = -1;
let firstCardIndex = -1;

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
    if (choosenCard == -1) {
      choosenCard = animalIndex;
      firstCardIndex = numberIndex;
    } else {
      if (choosenCard == animalIndex) {
        console.log("correct!");
        choosenCard = -1;
      } else {
        choosenCard = -1;
        console.log("wrong!");
        setTimeout(() => {
          pickedCard.classList.add("closed");
          card.classList.add("closed");
        }, 1000);
      }

      const pickedCard = cardContainer.querySelector(
        `.card[data-number="${firstCardIndex}"]`
      );
    }
  })
);
