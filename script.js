// Generating a Card Deck
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["♥️", "♦️", "♣️", "♠️"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      var cardValue = rankCounter;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "Ace";
        cardValue = 1;
      } else if (cardName == 11) {
        cardName = "Jack";
        cardValue = 10;
      } else if (cardName == 12) {
        cardName = "Queen";
        cardValue = 10;
      } else if (cardName == 13) {
        cardName = "King";
        cardValue = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};
// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  cardDeck = makeDeck();
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// Shuffle the deck and save it in a new variable shuffledDeck
// to communicate that we have shuffled the deck.
var shuffledDeck = shuffleCards(cardDeck);
var cardDeck = makeDeck();

var cpuHand = [];
var cpuScore = 0;
var playerScore = 0;
var playerFinalScore = 0;
var playerHand = [];
var playerHandScore = [];
var myOutputValue = "";
var prizePool = 100;
var playerBet = 0;
var gameOutcome = " ";

var betMode = "Select your bet";
var playerDeal = "Player's turn to draw cards";
var playerDraw = "Player decision to draw";
var cpuTurn = "CPU's turn to draw cards";
var gameMode = betMode;
var holdButton = document.getElementById("Hold-button");
var hitButton = document.getElementById("hit-button");

var calculateHandScore = function (array) {
  //we assume that array is an array of cards
  var arrayScore = 0;
  var hasAce = false; // assume that the array has no Ace

  for (i = 0; i < array.length; i += 1) {
    arrayScore = arrayScore + Number(array[i]);
    if (array[i] == "1") {
      hasAce = true;
      if ((hasAce = true && array.length < 3 && arrayScore + 10 <= 21)) {
        // if array score +10 is less that 21, then maybe you can use Ace as 11, rather than 1
        arrayScore = arrayScore + 10;
      }
    }
  }

  return arrayScore;
};
// if (array.length == 2) {
//   index = array.indexOf("1");
//   if (index !== -1) {
//     //prompt user for desire value of Ace
//     let aceValue = prompt("Do you want the Ace to be 1 or 11");
//     aceValue = parseInt(aceValue); // Conver the input to a number

//     //check if input is valid
//     if (aceValue !== 1 && aceValue !== 11) {
//       console.error("Invalid input. Ace value must be 1 or 11");
//       return;
//     }
//     array[index] = aceValue;
//   }
// } else if (array.length > 3) {
//   index = array.indexOf("11");
//   if (index !== -1) {
//     array[index] = 1;
//   }
// }
var main = function (input) {
  hitButton.disabled = true;
  holdButton.disabled = true;
  if (gameMode == betMode) {
    playerScore = 0;
    playerHand = [];
    playerHandScore = [];
    if (!input) {
      //validate input
      button.textContent = "What's your bet?";
      return "Invalid input, please key in your bet amount";
    } else playerBet = Number(input);

    var prizePoolRemaining = prizePool - playerBet;
    gameMode = playerDeal;
    button.textContent = "Deal 'em!";
    return (
      "Let's start the game with your bet of $" +
      playerBet +
      "!!" +
      "<br><br> You have $" +
      prizePoolRemaining +
      " left!"
    );
  }

  //Player turn to start
  if (gameMode === playerDeal) {
    button.disabled = true;
    hitButton.disabled = false;
    document.getElementById("input-field").disabled = true;
    // Player draws 2 cards
    for (let counter = 0; counter <= 2; counter += 1) {
      var playerCard = shuffledDeck.pop();

      //push into playerhand array
      playerHand.push(playerCard.name + playerCard.suit);
      playerHandScore.push("" + playerCard.value);
      counter = counter + 1;
    }

    var playerScore = calculateHandScore(playerHandScore);

    playerFinalScore = playerScore;
    if (playerFinalScore == 21 && playerHand.length == 2) {
      myOutputValue =
        "Black Jack!<br><br> You drew " +
        playerHand +
        ". You win $" +
        playerBet * 2 +
        "!<br><br> Hit 'Submit' to start a new game!";
      document.getElementById("input-field").disabled = false;
      prizePool = prizePool + playerBet * 2;
      gameMode == betMode;
      button.disabled = false;
      button.textContent = "Submit";
      playerScore = 0;
      playerHand = [];
      playerHandScore = [];
      return myOutputValue;
    }
    holdButton.disabled = false;
    hitButton.disabled = false;
    gameMode == betMode;
  }

  var myOutputValue =
    "Your last drawn cards is " +
    playerCard.name +
    playerCard.suit +
    "!<br> Your Hand is " +
    playerHand +
    ". <br><br> Your score is " +
    playerFinalScore +
    "<br><br> Select 'Hit' if you want to draw a card";
  button.textContent = "Hit or Hold";

  return myOutputValue;
};

// trigger hit function on hit button
var drawCard = function () {
  var playerCard = shuffledDeck.pop();
  //push into playerhand array
  playerHand.push(playerCard.name + playerCard.suit);
  playerHandScore.push("" + playerCard.value);
  playerFinalScore = calculateHandScore(playerHandScore);
  if (playerFinalScore >= 21) {
    hitButton.disabled = true;
  }

  var myOutputValue =
    "You drew a " +
    playerCard.name +
    playerCard.suit +
    "! Your current hand is " +
    playerHand +
    "! " +
    "! <br><br> Your current score is " +
    playerFinalScore +
    ".";
  return myOutputValue + gameOutcome;
};

var cpuDraw = function () {
  cpuHand = [];
  cpuScore = 0;
  gameMode = cpuTurn;
  hitButton.disabled = true;
  holdButton.disabled = true;
  for (let counter = 0; counter <= 2; counter += 1) {
    var cpuCard = shuffledDeck.pop();
    if (cpuCard.name == "Ace" && cpuHand.length <= 2) {
      cpuCard.value = 11;
    }
    cpuScore = cpuScore + cpuCard.value;
    // push card into CPU hand array
    cpuHand.push(cpuCard.name + cpuCard.suit);
    counter = counter + 1;
  }

  if (cpuScore == 21 && cpuHand.length == 2) {
    prizePool = prizePool - 2 * playerBet;
    gameMode = betMode;
    gameOutcome =
      "You ended your turn with " +
      playerHand +
      "<br> It is now the Dealer's turn!<br><br> BLACK JACK!! Dealer wins!<br><br> You lost $" +
      2 * playerBet +
      "!";
    button.disabled = false;
    button.textContent = "Submit new bet";
    return gameOutcome;
  }
  while (cpuScore < 17) {
    cpuCard = shuffledDeck.pop();
    cpuScore = cpuScore + cpuCard.value;
    cpuHand.push(cpuCard.name + cpuCard.suit);
  }
  var myOutputValue =
    "Player Hand is " +
    playerHand +
    ". Player score is " +
    playerFinalScore +
    "<br><br> Computer drew a hand of " +
    cpuHand +
    " with a score of " +
    cpuScore +
    ". ";
  hitButton.disabled = true;
  document.getElementById("input-field").disabled = false;
  var gameOutcome = "";

  if (cpuScore > 21 && playerFinalScore <= 21) {
    prizePool = prizePool + playerBet;
    gameMode = betMode;
    gameOutcome =
      "Dealer has gone over 21, Player wins! <br> You win $" +
      playerBet +
      ". Your current cash pool is : $" +
      prizePool;
  }

  if (cpuScore <= 21 && playerFinalScore > 21) {
    prizePool = prizePool - playerBet;
    gameMode = betMode;
    gameOutcome =
      "<br><br>Your score is over 21! You lose $" +
      playerBet +
      "!<br><br>Your current cash pool is $" +
      prizePool;
  }
  if (cpuScore > 21 && playerFinalScore > 21) {
    prizePool = prizePool;
    gameMode = betMode;
    gameOutcome =
      "Both Player and Dealer has busted 21! It is a tie!<br> Your current cash pool is $" +
      prizePool;
  }
  if (cpuScore <= 21 && playerFinalScore <= 21 && cpuScore > playerFinalScore) {
    prizePool = prizePool - playerBet;
    gameMode = betMode;
    gameOutcome =
      "Dealer has won!<br><br>You lost $ " +
      playerBet +
      "! Your current cash pool is $" +
      prizePool;
  }
  if (cpuScore <= 21 && playerFinalScore <= 21 && cpuScore < playerFinalScore) {
    prizePool = prizePool + playerBet;
    gameMode = betMode;
    gameOutcome =
      "Player has won!<br><br> Your current cash pool is $" +
      prizePool +
      ". You won $" +
      playerBet +
      "!";
  } else if (
    cpuScore <= 21 &&
    playerFinalScore <= 21 &&
    cpuScore == playerFinalScore
  ) {
    prizePool = prizePool;
    gameMode = betMode;
    gameOutcome = "It's a Tie!<br><br> Your current cash pool is $" + prizePool;
  }
  button.disabled = false;
  button.textContent = "Submit a new bet?";

  return myOutputValue + gameOutcome;
};
// generate outcome of the results
