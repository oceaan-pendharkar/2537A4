


const setup = () => {
  let firstCard = undefined
  let secondCard = undefined
  $(".card").on(("click"), function () {
    //check how many cards have the .flip-paired class
    let pairedCards = $(".flip-paired").length
    //find number of cards
    let numberOfCards = $(".card").length

    //check how many cards are flipped
    let flippedCards = $(".flip").length
    //if more than 2, return
    if (flippedCards > 1) return

    $(this).toggleClass("flip");

    if (!firstCard)
      firstCard = $(this).find(".front_face")[0]
    else {
      secondCard = $(this).find(".front_face")[0]
      console.log(firstCard, secondCard);
      if (firstCard.id == secondCard.id) {
        console.log("same card")
        firstCard = undefined
        return
      }
      if (
        firstCard.src
        ==
        secondCard.src
      ) {
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
      } else {
        console.log("no match")
        setTimeout(() => {
          $(`#${firstCard.id}`).parent().toggleClass("flip")
          $(`#${secondCard.id}`).parent().toggleClass("flip")
          firstCard = undefined
        }, 1000)
      }
    }
  });
}

$(document).ready(setup)