

function resetGame() {
  location.reload()
}

function darkTheme() {
  console.log("dark theme")
  $("body").removeClass("colour-theme")
  $("body").removeClass("light-theme")
  $("body").addClass("dark-theme")
}

function lightTheme() {
  console.log("light theme")
  $("body").removeClass("colour-theme")
  $("body").removeClass("dark-theme")
  $("body").addClass("light-theme")
}

function colourTheme() {
  console.log("colour theme")
  $("body").removeClass("dark-theme")
  $("body").removeClass("light-theme")
  $("body").addClass("colour-theme")
}
const setup = async () => {
  $("#darkTheme").on(("click"), darkTheme)
  $("#lightTheme").on(("click"), lightTheme)
  $("#colourTheme").on(("click"), colourTheme)

  var difficulty;
  var seconds;
  var numberOfPokemons = 0;
  var numberOfPairs = 0;
  var matchedPairs = 0;

  $('#easy').change(function () {
    difficulty = "easy";
    $("#buttons").removeClass("hidden")
    seconds = 20;
    numberOfPokemons = 3;

    // console.log("number of pokemons", numberOfPokemons)
  })

  $('#hard').change(function () {
    difficulty = "hard";
    $("#buttons").removeClass("hidden")
    seconds = 60;
    numberOfPokemons += 9;
    // console.log("number of pokemons", numberOfPokemons)
  })


  let numberOfClicks = 0;
  document.getElementById("clicksMade").innerText = numberOfClicks;

  const result = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=810");
  const pokemons = result.data.results;
  // console.log(pokemons);

  let firstCard = undefined
  let secondCard = undefined
  $(".card").on(("click"), function () {
    //increment numberOfClicks
    numberOfClicks += 1;
    document.getElementById("clicksMade").innerText = numberOfClicks;
    //check how many cards have the .flip-paired class
    let pairedCards = $(".flip-paired").length
    // console.log(pairedCards, "paired cards")

    //check how many cards are flipped
    let flippedCards = $(".flip").length
    //if more than 2, return
    if (flippedCards > 1) {
      console.log("2 cards flipped")
      return
    }

    $(this).addClass("flip");

    if (!firstCard) {
      firstCard = $(this).find(".front_face")[0]
      console.log(firstCard.id, "first card id")
    }
    else {
      // console.log("there was a first card")
      secondCard = $(this).find(".front_face")[0]
      // console.log(firstCard, secondCard);
      if (firstCard.id == secondCard.id) {
        console.log("same card")
        // firstCard = undefined
        // secondCard = undefined
        return
      }
      else if (firstCard.src == secondCard.src) {
        console.log("match")
        document.getElementById("pairsLeft").innerText -= 1;
        matchedPairs += 1;
        document.getElementById("pairsMatched").innerText = matchedPairs;
        $(`#${firstCard.id}`).parent().off("click")
        $(`#${secondCard.id}`).parent().off("click")
        //add .flip-paired class to both cards
        $(`#${firstCard.id}`).parent().toggleClass("flip-paired")
        $(`#${secondCard.id}`).parent().toggleClass("flip-paired")
        //remove .flip class from both cards
        $(`#${firstCard.id}`).parent().removeClass("flip")
        $(`#${secondCard.id}`).parent().removeClass("flip")
        firstCard = undefined
        secondCard = undefined
        if (matchedPairs == numberOfPairs) {
          setTimeout(() => {
            alert("You win!")
            location.reload()
          }, 1000)
          return
        }

      } else {
        console.log("no match")
        setTimeout(() => {
          console.log(firstCard.id, secondCard.id)
          $(`#${firstCard.id}`).parent().removeClass("flip")
          $(`#${secondCard.id}`).parent().removeClass("flip")
          firstCard = undefined
          secondCard = undefined
        }, 1000)
      }
    }
  });

  function startGame() {
    console.log("number of pokemons", numberOfPokemons)
    numberOfPairs = numberOfPokemons;
    document.getElementById("pairs").innerText = numberOfPairs;
    document.getElementById("pairsLeft").innerText = numberOfPairs;
    document.getElementById("pairsMatched").innerText = matchedPairs;


    $("#secondsHeader").removeClass("hidden")
    if (difficulty == "easy") {
      $("#game_grid_easy").removeClass("hidden")
      setInterval(loseGame, 20000)
    }
    else if (difficulty == "hard") {
      $("#game_grid_hard").removeClass("hidden")
      setInterval(loseGame, 60000)
    }
    else {
      return;
    }

    setInterval(decrementTime, 1000)

    function decrementTime() {
      seconds -= 1;
      document.getElementById("seconds").innerText = seconds;
    }

    function loseGame() {
      alert("GAME OVER!")
      location.reload()
    }

    function powerUp() {
      //add .flip class to all cards
      $(".card").addClass("flip")
      alert("Power Up!")
      setTimeout(() => {
        //remove .flip class from all cards
        $(".card").removeClass("flip")
      }
        , 2000)
    }

    setInterval(powerUp, 15000)
  }



  $("#resetButton").on(("click"), resetGame)
  $("#startButton").on(("click"), startGame)
}

$(document).ready(setup)