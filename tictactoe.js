// CURRENT PROBLEMS -___-
// showButtons() is not working at end of game to show the buttons again
// need to add logic in so that if a square is clicked twice (accidentally) nothing happens

console.log("tic tac toe script running")

let squares = document.querySelectorAll(".square")
let results = document.querySelector("#results-div")
let buttons = document.querySelectorAll(".button")
let onePlayerButton = document.querySelector("#one-player-button")
let twoPlayerButton = document.querySelector("#two-player-button")

let twoPlayer = false

let counter = 0
let winner = false
let choices = [1,2,3,4,5,6,7,8,9]
// console.log(choices)

let userPicks = []
let computerPicks = []
let user2Picks = []

let winningCombos = [
  [1,2,3], [1,4,7], [1,5,9], [2,5,8],
  [3,6,9], [3,5,7], [4,5,6], [7,8,9]
]

const placeX = (e) => {
  // console.log(e.target)
  
  let userPick = parseInt(e.target.id)
  
  e.target.classList.add("clickedX")
  // console.log(e.target.id)
  // parseInt turns str id into int   
  userPicks.push(parseInt(e.target.id))
  // update remaining choices by filtering out what square was clicked   
  choices = choices.filter(number => number != parseInt(e.target.id))
  // console.log(userPicks)
  console.log("player1 picks: " + userPicks)
  results.innerHTML = ``

  // CHECK FOR WIN
  checkForWin()
  counter++
  if (counter < 9) {  // max # of turns is 9
    if (twoPlayer) {
      removeXclick()
      addOclick()
    } else {
      // placeO()
      placeOsmart(userPick)
    }
   } else if (!winner) {
     console.log("it's a draw")
     results.innerHTML = `<h3>It's a draw! Refresh the page to start a new game!</h3>`
     removeXclick()
   }
  }


const placeO = () => {
  // console.log("computer turn")
  if (!winner) {
    let randomChoice = choices[Math.floor(Math.random()*choices.length)]
    // console.log(choices)
    // console.log(randomChoice)
    computerPicks.push(randomChoice)
    choices = choices.filter(number => number != randomChoice)
    // console.log(choices)
    let computerChoice = document.getElementById(randomChoice)
    // console.log(computerChoice)
    computerChoice.classList.add("clickedO")
    console.log("computer picks: " + computerPicks)
    
    // CHECK FOR WIN
    checkForWin()
    counter++
  }
}

const placeOsmart = (userPick) => {
  // computer makes a smarter move based on user's pick
  let betterChoices = []
  let smartChoice = 0
  if (!winner) {
    // FIRST GRAB CENTER SPOT IF NOT TAKEN
    if (choices.includes(5)) {
      smartChoice = 5
    } else {
        // ATTEMPT #1 - marginally smarter/less random - mostly defense (if anything)
        winningCombos.forEach(combo => {
        for (let i = 0; i < userPicks.length; i++) {
          if (combo.includes(userPicks[i])) {
            combo.forEach(number => {
              if (!userPicks.includes(number) && !computerPicks.includes(number)) {
                smartChoice = number
                console.log(number)
                // can't break during forEach :(
                // so we'll just make i the max number to end the loop
                i = userPicks.length
              }
            })
          }
        }
      })
    }
    // ATTEMPT #2
//     winningCombos.forEach(combo => {
//       if (combo.includes(userPick)) {
        
//       }
//     })
    
    computerPicks.push(smartChoice)
    choices = choices.filter(number => number != smartChoice)
    let computerChoice = document.getElementById(smartChoice)
    computerChoice.classList.add("clickedO")
    console.log("smart computer picks: " + computerPicks)
    
    checkForWin()
    counter++
    
  }
}

const placeOplayer2 = (e) => {
  // console.log("player 2's turn")
  e.target.classList.add("clickedO")
  user2Picks.push(parseInt(e.target.id))
  choices = choices.filter(number => number != parseInt(e.target.id))
  console.log("player2 picks: " + user2Picks)
  
  checkForWin()
  counter++
  removeOclick()
  addXclick()
}

const checkForWin = () => {
  // CHECK FOR PLAYER 1 WIN
  winningCombos.forEach(combo => {
    let userMatches = 0
    for (let i=0; i<userPicks.length; i++) {
      if (combo.includes(userPicks[i])) {
        userMatches++
      }
      // console.log(userMatches)
      if (userMatches == 3) {
        console.log("player1 wins")
        winner = true
        results.innerHTML = `<h3>Player 1 wins! Refresh the page to start a new game!</h3>`
        removeXclick()
      }
    }
  })
  // CHCECK FOR PLAYER 2 WIN
  if (twoPlayer) {
    winningCombos.forEach(combo => {
      let user2Matches = 0
      for (let i=0; i<user2Picks.length; i++) {
        if (combo.includes(user2Picks[i])) {
          user2Matches++
        }
        // console.log(user2Matches)
        if (user2Matches == 3) {
          console.log("player2 wins")
          winner = true
          results.innerHTML = `<h3>Player 2 wins! Refresh the page to start a new game!</h3>`
          removeXclick()
          removeOclick()
        }
      }
    })
  } else {
  // CHECK FOR COMPUTER WIN
    winningCombos.forEach(combo => {
      let computerMatches = 0
        for (let i=0; i<computerPicks.length; i++) {
          if (combo.includes(computerPicks[i])) {
          computerMatches++
          }
      // console.log(computerMatches)
        if (computerMatches == 3) {
          console.log("computer wins")
          winner = true
          results.innerHTML = `<h3>Computer wins! Refresh the page to start a new game!</h3>`
          removeXclick()
        }
      }
    })  
  }
  // CLEAR BOARD ON KEYPRESS WHEN GAME IS WON
  // if (winner) {
  //   document.addEventListener("keypress", e => {
  //     // console.log("key pressed")
  //     results.innerHTML = ``
  //     clearBoard()
  //   })
  // }
}

// CLEAR BOARD ON SCREEN AND EMPTY LISTS
const clearBoard = () => {
  userPicks.forEach(pick => {
    let clearUserChoices = document.getElementById(pick)
    clearUserChoices.classList.remove("clickedX")
    })
  if (twoPlayer) {
    user2Picks.forEach(pick => {
      let clearUser2Choices = document.getElementById(pick)
      if (clearUser2Choices.classList.contains("clickedO")) {
        clearUser2Choices.classList.toggle("clickedO")  
      }
    })
  } else {
    computerPicks.forEach(pick => {
      let clearComputerChoices = document.getElementById(pick)
      if (clearComputerChoices.classList.contains("clickedO")) {
        clearComputerChoices.classList.remove("clickedO")  
      }
      
    })  
  }
  userPicks = []
  user2Picks = []
  computerPicks = []
  counter = 0
  winner = false
}

// REMOVE EVENT X AND O LISTENERS
const removeXclick = () => {
  squares.forEach(square => {
    square.removeEventListener("click", placeX)
  })
}

const addXclick = () => {
  squares.forEach(square => {
    square.addEventListener("click", placeX)
  })
}

const addOclick = () => {
  squares.forEach(square => {
    square.addEventListener("click", placeOplayer2)
  })
}

const removeOclick = () => {
  squares.forEach(square => {
    square.removeEventListener("click", placeOplayer2)
  })
}

//  HIDE AND SHOW(?) BUTTONS
const hideButtons = () => {
  buttons.forEach(button => {
    button.classList.add("hide-button")
  })
}

const showButtons = () => {
  // onePlayerButton.classList.remove("hide-button")
  // document.querySelector("#one-player-button").hidden = false
  // document.querySelector("#two-player-button").hidden = false
}

// EVENT LISTENERS FOR BUTTONS
onePlayerButton.addEventListener("click", e => {
  addXclick()
  hideButtons()
  results.innerHTML = `<h4>Click on a square to take your turn!</h4>`
})

twoPlayerButton.addEventListener("click", e => {
  addXclick()
  hideButtons()
  results.innerHTML = `<h4>Click on a square to take your turn!</h4>`
  twoPlayer = true
})

// document.addEventListener("keypress", e => {
//   // console.log("key pressed")
//   if (winner) {
//     results.innerHTML = ``
//     clearBoard()
//     showButtons()
//     addXclick()
//   }
// })
