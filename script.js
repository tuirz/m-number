const btns = [
  document.querySelector('.btn-facile'),
  document.querySelector('.btn-moyen'),
  document.querySelector('.btn-difficile'),
  document.querySelector('.btn-extreme')
];
const [btnFacile, btnMoyen, btnDifficile, btnExtreme] = btns;
const betweenText = document.querySelector('.between');
const guessInput = document.querySelector('.guess');
const btnCheck = document.querySelector('.btn-check');
const message = document.querySelector('.message');
const attemptsSpan = document.querySelector('.label-attempts .attempts');
const scoreSpan = document.querySelector('.score');
const highscoreSpan = document.querySelector('.highscore');
const numberBox = document.querySelector('.btn-number');

const levels = {
  facile:    { min: 1, max: 10,   text: '(Entre 1 et 10)',   chances: 3 },
  moyen:     { min: 1, max: 50,   text: '(Entre 1 et 50)',   chances: 2 },
  difficile: { min: 1, max: 100,  text: '(Entre 1 et 100)',  chances: 1 },
  extreme:   { min: 1, max: 1000, text: '(Entre 1 et 1000)', chances: 10 }
};

// VARIABLES
let currentLevel = 'facile', chancesRestantes, mysteryNumber, score = 0, highscore = 0;

const generateMysteryNumber = () => {
  const { min, max } = levels[currentLevel];
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// MÀJ UI
const updateUI = () => {
  attemptsSpan.textContent = chancesRestantes;
  scoreSpan.textContent = score;
  highscoreSpan.textContent = highscore;
};

// DÉBUT DU JEU
const startGame = () => {
  chancesRestantes = levels[currentLevel].chances;
  mysteryNumber = generateMysteryNumber();
  betweenText.textContent = levels[currentLevel].text;
  message.textContent = "Voyons voir...";
  numberBox.textContent = "?";
  guessInput.value = "";
  guessInput.disabled = false;
  btnCheck.disabled = false;
  updateUI();
  numberBox.addEventListener('click', startGame);
};

// SÉLECTION NIVEAU
const selectLevel = level => {
  currentLevel = level;
  btns.forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.btn-${level}`).classList.add('active');
  startGame();
};

// ANIMATION WIN LOSE
const flashBackground = colorVar => {
  const body = document.body;
  const original = getComputedStyle(body).backgroundColor;
  body.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue(colorVar);
  setTimeout(() => { body.style.backgroundColor = original; }, 600);
};

// CHECK GUESS
const checkGuess = () => {
  const guess = Number(guessInput.value);
  if (!guess) return message.textContent = "Entrez un nombre !";
  if (guess === mysteryNumber) {
    message.textContent = "Bravo ! Tu as trouvé 🎉";
    numberBox.textContent = mysteryNumber;
    score += chancesRestantes;
    if (score > highscore) highscore = score;
    updateUI();
    guessInput.disabled = true;
    btnCheck.disabled = true;
    flashBackground('--bg-color-win');
  } else {
    chancesRestantes--;
    if (chancesRestantes <= 0) {
      message.textContent = `Perdu ! Le nombre était ${mysteryNumber}`;
      numberBox.textContent = mysteryNumber;
      guessInput.disabled = true;
      btnCheck.disabled = true;
      flashBackground('--bg-color-lose');
    } else {
      message.textContent = guess < mysteryNumber ? "Trop petit !" : "Trop grand !";
    }
    updateUI();
  }
};

// ÉCOUTEURS DES BOUTONS
['facile', 'moyen', 'difficile', 'extreme'].forEach(level =>
  document.querySelector(`.btn-${level}`).addEventListener('click', () => selectLevel(level))
);

// ÉCOUTEUR BOUTON CHECK !important
btnCheck.addEventListener('click', checkGuess);

// INIT DÉFAULT
selectLevel('facile');