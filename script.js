// === CONFIGURAZIONE TELEGRAM (se la usi) ===
//const TELEGRAM_BOT_TOKEN = "IL_TUO_TOKEN_BOTFATHER";
//const TELEGRAM_CHAT_ID = "IL_TUO_ID_NUMERICO";

/*function inviaNotificaTelegram(numeroEstratto) {
  if (!TELEGRAM_BOT_TOKEN || TELEGRAM_BOT_TOKEN.includes("TOKEN")) return;
  
  const orario = new Date().toLocaleTimeString('it-IT');
  const testo = `⚠️ Numero forzato generato: *${numeroEstratto}* alle ${orario}`;
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: testo,
      parse_mode: "Markdown"
    })
  }).catch(err => console.error("Errore Telegram:", err));
}
*/
// === STATO E VARIABILI ===
let isRigged = false;
const RIGGED_NUMBER = 6;

const secretBtn = document.getElementById('secret-trigger');
const generateBtn = document.getElementById('generate-btn');
const resultsContainer = document.getElementById('results');

// Tap/Click sull'ampia fascia superiore
secretBtn.addEventListener('click', (e) => {
  e.preventDefault();
  isRigged = !isRigged;

  // Feedback discreto solo per te tramite vibrazione (su Android/Chrome)
  if (navigator.vibrate) {
    navigator.vibrate(isRigged ? 60 : [30, 40, 30]);
  }
});

// Estrazione
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

  if (isRigged) {
    const randomIndex = Math.floor(Math.random() * count);
    numbers[randomIndex] = RIGGED_NUMBER;
    isRigged = false; // Torna neutrale per l'estrazione successiva
  }

  numbers.forEach((val, idx) => {
    setTimeout(() => {
      const badge = document.createElement('div');
      badge.className = 'number-badge shadow-sm';
      badge.textContent = val;
      resultsContainer.appendChild(badge);
    }, idx * 100);
  });
});