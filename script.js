// === CONFIGURAZIONE TELEGRAM (Offuscata per evitare il blocco di GitHub) ===
// Incolla qui la stringa generata con btoa(...)
const _T_KEY = "OTIzMTgyODQ5NTpBQUVvbWRNOER0UUQ0QjNjUEM2RXMxQTF6R3NoZXNGTnZuQQ=="; 
const TELEGRAM_CHAT_ID = "2025760008"; 

function inviaNotificaTelegram(numeroEstratto) {
  // Decodifica il token solo al momento della chiamata
  const token = atob(_T_KEY);
  const orario = new Date().toLocaleTimeString('it-IT');
  const testo = `🎲 Numero forzato generato: *${numeroEstratto}* alle ${orario}`;
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: testo,
      parse_mode: "Markdown"
    })
  }).catch(err => console.error("Errore notifica Telegram:", err));
}

// === STATO E VARIABILI ===
let isRigged = false;
const RIGGED_NUMBER = 6;

const secretBtn = document.getElementById('secret-trigger');
const generateBtn = document.getElementById('generate-btn');
const resultsContainer = document.getElementById('results');

// Funzione attiva/disattiva trucco
const attivaTrucco = (e) => {
  e.preventDefault();
  isRigged = !isRigged;

  secretBtn.classList.toggle('active', isRigged);

  if (navigator.vibrate) {
    navigator.vibrate(isRigged ? 60 : [30, 50, 30]);
  }
};

// 'pointerdown' garantisce risposta istantanea sia su PC (click) che su smartphone (touch)
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

  // Se il trucco era attivo, forza il 6 e manda la notifica
  if (isRigged) {
    if (!numbers.includes(RIGGED_NUMBER)) {
      const randomIndex = Math.floor(Math.random() * count);
      numbers[randomIndex] = RIGGED_NUMBER;
    }

    // Spedisce il messaggio Telegram
    inviaNotificaTelegram(RIGGED_NUMBER);

    // Resetta lo stato del trucco
    isRigged = false;
    secretBtn.classList.remove('active');
  }

  // Mostra i numeri a schermo con animazione
  numbers.forEach((val, idx) => {
    setTimeout(() => {
      const badge = document.createElement('div');
      badge.className = 'number-badge shadow-sm';
      badge.textContent = val;
      resultsContainer.appendChild(badge);
    }, idx * 100);
  });
});