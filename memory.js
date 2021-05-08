console.log("memory script running")

let matchDiv = document.querySelector("#match-div")
let stateGuess = document.querySelector("#answer-box")

let choice1;
let choice2;
let state;
let currentId;
let clickCounter = 0;


// originally I had a separate flipCard and first/second click functions but was able to combine into one function
// flipCard will flip the card & change the card's look, as well as store the selected state in choice1 or choice2

const flipCard = (e) => {
  
  
  // this big ol' IF is for making sure only green or blue cards count as clicks
  if (e.target.classList.contains("green") || e.target.classList.contains("blue")) {
    
    // realized that one of my main issues was the location of clickCounter
    clickCounter++
    matchDiv.innerHTML = `<h4>Try to find a match!</h4>`

    // FIRST CARD CLICKED
    if (clickCounter == 1) {

      // currentId holds the id of the first click, so if the same card is clicked twice it's not counted as a match
      currentId = e.target.getAttribute("id")

      if (e.target.classList.contains("mn")) {
        state = "mn"
        e.target.classList.toggle("flipped-" + state)
      }
      else if (e.target.classList.contains("ca")) {
        state = "ca"
        e.target.classList.toggle("flipped-" + state)   
      }
      else if (e.target.classList.contains("ny")) {
        state = "ny"
        e.target.classList.toggle("flipped-" + state)   
      }
      else if (e.target.classList.contains("mi")) {
        state = "mi"
        e.target.classList.toggle("flipped-" + state)   
      }
      else if (e.target.classList.contains("il")) {
        state = "il"
        e.target.classList.toggle("flipped-" + state)   
      }
      else if (e.target.classList.contains("nc")) {
        state = "nc"
        e.target.classList.toggle("flipped-" + state)   
      }
      else if (e.target.classList.contains("wi")) {
        state = "wi"
        e.target.classList.toggle("flipped-" + state)   
      }
      else if (e.target.classList.contains("wa")) {
        state = "wa"
        e.target.classList.toggle("flipped-" + state)   
      }

    //console.log(currentId)
    choice1 = state
    console.log("choice1: " + choice1)

    }

    // SECOND CARD CLICKED - I ended up copying the above to handle a second click
      if (clickCounter == 2) {

        if (e.target.classList.contains("mn")) {
          state = "mn"
          e.target.classList.toggle("flipped-" + state)   
        }
        else if (e.target.classList.contains("ca")) {
          state = "ca"
          e.target.classList.toggle("flipped-" + state)   
        }
        else if (e.target.classList.contains("ny")) {
          state = "ny"
          e.target.classList.toggle("flipped-" + state)   
        }
        else if (e.target.classList.contains("mi")) {
          state = "mi"
          e.target.classList.toggle("flipped-" + state)   
        }
        else if (e.target.classList.contains("il")) {
          state = "il"
          e.target.classList.toggle("flipped-" + state)   
        }
        else if (e.target.classList.contains("nc")) {
          state = "nc"
          e.target.classList.toggle("flipped-" + state)   
        }
        else if (e.target.classList.contains("wi")) {
          state = "wi"
          e.target.classList.toggle("flipped-" + state)   
        }
        else if (e.target.classList.contains("wa")) {
          state = "wa"
          e.target.classList.toggle("flipped-" + state)   
      }

      choice2 = state
      console.log("choice2: " + state)

      // make sure the second click isn't the same card as the first click
      if (choice1 == choice2 && e.target.getAttribute("id") != currentId) {
        yesMatch()
      } else {
        noMatch()
      } 
    }
  }
} //end flipCard


function yesMatch() {
  console.log("it's a match")
  
  matchDiv.innerHTML = `<h4>It's a match! What state is it?</h4>`

  clickCounter++ // this makes ClickCounter = 3 so you can't move on until the user enters text
  
} // end yesMatch


function noMatch() {
  console.log("not a match")
  
  matchDiv.innerHTML = `<h4>Not a match!</h4>`
  
  choice1 = document.querySelector("#"+state+"1")
  choice1.classList.add("unflipped")
  
  choice2 = document.querySelector("#"+state+"2")
  choice2.classList.add("unflipped")
  
  clickCounter = 0
  
} // end noMatch


const checkBonus = (e) => {
  
  if (e.keyCode == 13) {
    
    // moved the "matched" toggle here so images of states stay up while user is typing
    document.getElementById(choice1 + "1").classList.toggle("matched")
    document.getElementById(choice2 + "2").classList.toggle("matched")
    
    if (state == "mn") {
      if (stateGuess.value == "Minnesota") {
      console.log("correct!")
      matchDiv.innerHTML = `<h4>You got it!</h4>`
    }
    }
    else if (state == "ny") {
      if (stateGuess.value == "New York") {
      console.log("correct!")
      matchDiv.innerHTML = `<h4>You got it!</h4>`
    }
    }
    else if (state == "wi") {
      if (stateGuess.value == "Wisconsin") {
      console.log("correct!")
      matchDiv.innerHTML = `<h4>You got it!</h4>`
    }
    }
    else if (state == "mi") {
      if (stateGuess.value == "Michigan") {
      console.log("correct!")
      matchDiv.innerHTML = `<h4>You got it!</h4>`
    }
    }
    else if (state == "nc") {
      if (stateGuess.value == "North Carolina") {
      console.log("correct!")
      matchDiv.innerHTML = `<h4>You got it!</h4>`
    }
    }
    else if (state == "il") {
      if (stateGuess.value == "Illinois") {
      console.log("correct!")
      matchDiv.innerHTML = `<h4>You got it!</h4>`
    }
    }
    else if (state == "wa") {
      if (stateGuess.value == "Washington") {
      console.log("correct!")
      matchDiv.innerHTML = `<h4>You got it!</h4>`
    }
    }
    else if (state == "ca") {
      if (stateGuess.value == "California") {
      console.log("correct!")
      matchDiv.innerHTML = `<h4>You got it!</h4>`
    }
    }
    
    stateGuess.value = ""
    clickCounter = 0
  }
} // end checkBonus


// originally I had event listeners for all 16 cards, but found that 
// document.addEventListener streamlined the code in a big way
document.addEventListener("click", flipCard)
document.addEventListener("keypress", checkBonus)

