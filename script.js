// Sélection des boutons et du texte d'info
const btnFacile = document.querySelector('.btn-facile');
const btnMoyen = document.querySelector('.btn-moyen');
const btnDifficile = document.querySelector('.btn-difficile');
const btnExtreme = document.querySelector('.btn-extreme');
const betweenText = document.querySelector('.between');

// Plages de chaque niveau
const levels = {
  facile: { min: 1, max: 10, text: '(Entre 1 et 10)', chances: 3 },
  moyen: { min: 1, max: 50, text: '(Entre 1 et 50)', chances:7 },
  difficile: { min: 1, max: 100, text: '(Entre 1 et 100)', chances: 10 },  
  extreme: { min: 1, max: 1000, text: '(Entre 1 et 1000)', chances: 15 }
};

let currentLevel = 'facile';
let chancesRestantes = levels[currentLevel].chances;

// Fonction pour changer de niveau
function selectLevel(level) {
  currentLevel = level;
  betweenText.textContent = levels[level].text;
  chancesRestantes = levels[level].chances;
  document.querySelector('.label-attempts .attempts').textContent = chancesRestantes;

  // Retire la classe active de tous les boutons
  [btnFacile, btnMoyen, btnDifficile, btnExtreme].forEach(btn => btn.classList.remove('active'));
  // Ajoute la classe active au bouton sélectionné
  if (level === 'facile') btnFacile.classList.add('active');
  if (level === 'moyen') btnMoyen.classList.add('active');
  if (level === 'difficile') btnDifficile.classList.add('active');
  if (level === 'extreme') btnExtreme.classList.add('active');
}

// Écouteurs d'événements
btnFacile.addEventListener('click', () => selectLevel('facile'));
btnMoyen.addEventListener('click', () => selectLevel('moyen'));
btnDifficile.addEventListener('click', () => selectLevel('difficile'));
btnExtreme.addEventListener('click', () => selectLevel('extreme'));

// Initialisation
selectLevel('facile');