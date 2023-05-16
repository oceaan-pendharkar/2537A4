


const setup = async () => {

  const result = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=810");
  const pokemons = result.data.results;
  console.log(pokemons)

  numberOfPokemons = 3

  for (let i = 1; i < pokemons.slice(0, numberOfPokemons).length + 1; i++) {
    pokemon = pokemons[i];
    index = i;
    let src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i}.png`
    console.log(src)

    // $("#game_grid").append(`
    // <div class="card" id="card${i}">
    //   <img id="img${i}" class="front_face" src=${src} alt="">
    //   <img class="back_face" src="back.webp" alt="">
    // </div>
    // <div class="card" id="card${i + 1}">
    //   <img id="img${i + 1}" class="front_face" src=${src} alt="">
    //   <img class="back_face" src="back.webp" alt="">
    // </div>
    // `);

  };


  let firstCard = undefined
  let secondCard = undefined
  $(".card").on(("click"), function () {
    //check how many cards have the .flip-paired class
    let pairedCards = $(".flip-paired").length
    console.log(pairedCards, "paired cards")
    //find number of cards
    let numberOfCards = $(".card").length
    console.log(numberOfCards, "cards")

    //check how many cards are flipped
    let flippedCards = $(".flip").length
    //if more than 2, return
    if (flippedCards > 1) return

    $(this).toggleClass("flip");

    if (!firstCard) {
      firstCard = $(this).find(".front_face")[0]
      console.log(firstCard.id, "first card id")
    }
    else {
      console.log("there was a first card")
      secondCard = $(this).find(".front_face")[0]
      console.log(firstCard, secondCard);
      if (firstCard.id == secondCard.id) {
        console.log("same card")
        firstCard = undefined
        return
      }
      if (firstCard.src == secondCard.src) {
        console.log("match")
        $(`#${firstCard.id}`).parent().off("click")
        $(`#${secondCard.id}`).parent().off("click")
        //add .flip-paired class to both cards
        $(`#${firstCard.id}`).parent().toggleClass("flip-paired")
        $(`#${secondCard.id}`).parent().toggleClass("flip-paired")
        //remove .flip class from both cards
        $(`#${firstCard.id}`).parent().toggleClass("flip")
        $(`#${secondCard.id}`).parent().toggleClass("flip")
        //if pairedCards == number of cards - 2, display winner after 1 second
        setTimeout(() => {
          if (pairedCards == numberOfCards - 2) {
            alert("You win!")
            return
          }
        }, 1000)
        firstCard = undefined
        secondCard = undefined
      } else {
        console.log("no match")
        setTimeout(() => {
          $(`#${firstCard.id}`).parent().toggleClass("flip")
          $(`#${secondCard.id}`).parent().toggleClass("flip")
          firstCard = undefined
          secondCard = undefined
        }, 1000)

      }
    }
  });
}

$(document).ready(setup)