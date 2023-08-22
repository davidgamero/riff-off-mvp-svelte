let words = [];
let scores = [0, 0];

let scoreButtonOperations = {
  't1m': (scores) => { scores[0] -= 1 },
  't1p': (scores) => { scores[0] += 1 },
  't2m': (scores) => { scores[1] -= 1 },
  't2p': (scores) => { scores[1] += 1 },
  'reset': (scores) => { scores = [0, 0] }
}

function setCurrentWord(word) {
  document.getElementById('currentWord').innerText = `"${word}"`
}

function setGameMode(mode) {
  document.getElementById('gameMode').innerText = mode
}

function nextWord() {
  console.log('next')
  let currentWord = document.getElementById('currentWord').innerText
  let options = words.filter(w => w != currentWord)
  let word = options[Math.floor(Math.random() * options.length)]
  setCurrentWord(word)

  let mode = getGameMode()
  setGameMode(mode)
}

function updateScores() {
  t1s.innerText = scores[0]
  t2s.innerText = scores[1]
}

function scoreButtonClick(e) {
  let buttonId = e.target.id

  let operation = scoreButtonOperations[buttonId]
  if (!operation) {
    throw (`scoreButtonOperations does not contain ${buttonId}`)
  }
  operation(scores)
  updateScores()
}

const gameModeOdds = [
  { mode: 'player versus team', odds: 0.15 },
  { mode: 'player versus player', odds: 0.25 },
  { mode: 'normal', odds: 1 }
]

function getGameMode() {
  let r = Math.random()
  let mode = gameModeOdds.find(m => r < m.odds)
  return mode.mode
}

let t1s
let t2s

async function main() {
  document.getElementById('next').addEventListener('click', nextWord)

  t1s = document.getElementById('t1s')
  t2s = document.getElementById('t2s')

  let scoreButtons = document.getElementsByClassName('scoreButton')
  for (let i = 0; i < scoreButtons.length; i++) {
    scoreButtons[i].addEventListener('click', scoreButtonClick)
  }

  fetch('words.txt')
    .then(response => response.text())
    .then((data) => {
      words = data.split('\n')
      words = words.filter(w => w.length > 0)
      console.log(data)
      console.log(`loaded ${words.length} words`)
    })
}

window.onload = main