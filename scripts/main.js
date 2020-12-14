var suits = ["hearts","clubs","diamonds",'spades'];
var ranks = ["2","3","4","5","6","7","8","9","10","jack","queen","king","ace"]
var deck = [];
var dealerHand = [];
var playerHand = [];
let dealerScore = 0;
let playerScore = 0;
var playerTurn = false;

function newDeck(){
  for(let suitCounter = 0; suitCounter < suits.length; suitCounter++){
    for(let rankCounter = 0; rankCounter < ranks.length; rankCounter++){
      let weight = 0;
      if(ranks[rankCounter] == "jack" || ranks[rankCounter] == "king" || ranks[rankCounter] == "queen"){
        weight = 10;
      }
      else if(ranks[rankCounter] == "ace") {
        weight = 11;
      }
      else{
        weight = parseInt(ranks[rankCounter]);
      }
      let card = {Rank: weight, Suit: suits[suitCounter], Img: `./images/${ranks[rankCounter]}_of_${suits[suitCounter]}.png`};
      deck.push(card);
    }
  }
  return deck;
}
newDeck();

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}
shuffleArray(deck);

let deal = document.querySelector('#deal-button')
deal.addEventListener('click', () => {
  let players = ["player-hand", "dealer-hand"];
  function dealCard(player) {
    for (let x = 0; x < 1; x++) {
      let card = deck.pop();
      if (player === "player-hand"){
        playerHand.push(card);
      } else {
        dealerHand.push(card);
      }
      if(playerScore === 21){
        document.getElementById("messages2").innerHTML = "You have 21, you win!";
        hit.disabled = true;
        stand.disabled = true;
      }
      let displayCard = document.createElement('img'); // <img src='' />
      displayCard.src = card.Img;
      document.getElementById(player).appendChild(displayCard);
      calculatePoints()
    }
  }
  dealCard(players[0])
  dealCard(players[0])
  dealCard(players[1])
  deal.disabled = true;
  console.log(playerScore);
  console.log(dealerScore);
})

let hit = document.querySelector('#hit-button')
hit.addEventListener('click', () => {
  let players = ["player-hand", "dealer-hand"];
  function hitCard(player) {
    for (let x = 0; x < 1; x++) {
      let card = deck.pop();
      if (player === "player-hand"){
        playerHand.push(card);
      } else {
        dealerHand.push(card);
      }
      let displayCard = document.createElement('img'); // <img src='' />
      displayCard.src = card.Img;
      document.getElementById(player).appendChild(displayCard);
      calculatePoints()
    }
  }
  hitCard(players[0])
  lost()
  console.log(playerScore);
  console.log(dealerScore);
})

function calculatePoints() {
  playerScore = 0;
  dealerScore = 0;
  for (let i = 0; i < playerHand.length; i += 1) {
    if(playerHand[i].Rank === 11){
      if(playerScore >= 11){
        playerScore += 1
        document.getElementById("player-points").innerHTML = playerScore;
        continue;
      }
    }
    playerScore += playerHand[i].Rank;
    document.getElementById("player-points").innerHTML = playerScore;
  }
  for (let i = 0; i < dealerHand.length; i += 1) {
    if(dealerHand[i].Rank === 11){
      if(dealerScore >= 11){
        dealerScore += 1
        document.getElementById("dealer-points").innerHTML = dealerScore;
        continue;
      }
    }
    dealerScore += dealerHand[i].Rank;
    document.getElementById("dealer-points").innerHTML = dealerScore;

  }
}

function lost(){
  if (playerScore > 21){
    document.getElementById("messages").innerHTML = "You have lost, dealer wins!";
    deal.disabled = true;
    hit.disabled = true;
    stand.disabled = true;
  }
  else if (dealerScore > 21){
    document.getElementById("messages").innerHTML = "Dealer has lost, you win!";
    deal.disabled = true;
    hit.disabled = true;
    stand.disabled = true;
  }
  else if (playerScore === 21){
    document.getElementById("messages").innerHTML = "You have 21, you win!";
    deal.disabled = true;
    hit.disabled = true;
    stand.disabled = true;
  }
}

let stand = document.querySelector('#stand-button')
stand.addEventListener('click', () => {
  let players = ["dealer-hand"];
  function standCard(player) {
    while(dealerScore <= 21) {
      let card = deck.pop();
      dealerHand.push(card);
      if(dealerScore >= 17 && dealerScore <= 21){
        break;
      }
      let displayCard = document.createElement('img');
      displayCard.src = card.Img;
      document.getElementById(player).appendChild(displayCard);
      calculatePoints()
    }
  }
  
  standCard(players[0])
  lost()
  winner()
  console.log(playerScore);
  console.log(dealerScore);
  
})

function winner(){
  if(dealerScore <= 21 && dealerScore > playerScore ){
    document.getElementById("messages").innerHTML = "Dealer has higher score, you lose!";
    deal.disabled = true;
    hit.disabled = true;
    stand.disabled = true;
  } 
  else if(playerScore <= 21 && playerScore > dealerScore){
    document.getElementById("messages").innerHTML = "You have the higher score, dealer loses!";
    deal.disabled = true;
    hit.disabled = true;
    stand.disabled = true;
  }
  else if(playerScore === dealerScore){
    document.getElementById("messages").innerHTML = "Tie game, no one wins!";
    deal.disabled = true;
    hit.disabled = true;
    stand.disabled = true;
  }
}

let reset = document.querySelector("#reset-button");
reset.addEventListener('click', () =>{
    window.location.reload();
  })