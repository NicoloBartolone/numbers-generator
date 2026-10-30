let isRigged = false;
const RIGGED_NUMBER = 6;

const secretBtn = document.getElementById('secret-trigger');
const generateBtn = document.getElementById('generate-btn');
const resultsContainer = document.getElementById('results');

// Funzione per armare/disarmare il trucco (funziona sia su click che touch)
const attivaTrucco = (e) => {
  e.preventDefault();
  isRigged = !isRigged; // Toggle on/off

  secretBtn.classList.toggle('active', isRigged);

  // Vibrazione (solo dove supportata, es. Android)
  if (navigator.vibrate) {
    navigator.vibrate(isRigged ? 60 : [30, 50, 30]);
  }
};

// Usa pointerdown: gestisce mouse, touch screen e penna senza conflitti né ritardi
secretBtn.addEventListener('pointerdown', attivaTrucco);

generateBtn.addEventListener('click', () => {
  const min = parseInt(document.getElementById('min-val').value, 10);
  const max = parseInt(document.getElementById('max-val').value, 10);
  const count = parseInt(document.getElementById('count-val').value, 10);

  if (isNaN(min) || isNaN(max) || isNaN(count) || min > max || count < 1) {
    alert("Compila tutti i campi con valori validi!");
    return;
  }

  resultsContainer.innerHTML = '';
  const numbers = [];

  for (let i = 0; i < count; i++) {
    const rnd = Math.floor(Math.random() * (max - min + 1)) + min;
    numbers.push(rnd);
  }

  // Se il trucco è attivo, inserisce RIGGED_NUMBER assicurandosi che non sia già uscito
  if (isRigged) {
    if (!numbers.includes(RIGGED_NUMBER)) {
      const randomIndex = Math.floor(Math.random() * count);
      numbers[randomIndex] = RIGGED_NUMBER;
    }
    // Resetta lo stato dopo l'estrazione
    isRigged = false;
    secretBtn.classList.remove('active');
  }

  // Mostra i badge con animazione a cascata
  numbers.forEach((val, idx) => {
    setTimeout(() => {
      const badge = document.createElement('div');
      badge.className = 'number-badge shadow-sm';
      badge.textContent = val;
      resultsContainer.appendChild(badge);
    }, idx * 100);
  });
});