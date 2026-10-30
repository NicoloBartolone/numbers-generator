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

// 1. Click sul bottone nero
secretBtn.addEventListener('click', (e) => {
  e.preventDefault();
  isRigged = !isRigged;

  // Feedback visivo: diventa rosso se attivo, torna nero se disattivo
  if (isRigged) {
    secretBtn.classList.add('active');
    console.log("TRUCCO ATTIVO: Al prossimo giro uscirà il 6!");
  } else {
    secretBtn.classList.remove('active');
    console.log("TRUCCO DISATTIVATO.");
  }

  // Vibrazione su smartphone
  if (navigator.vibrate) {
    navigator.vibrate(isRigged ? 80 : [40, 40, 40]);
  }
});

// 2. Click sul bottone "Genera"
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

  // Estrai i numeri casuali richiesti
  for (let i = 0; i < count; i++) {
    const rnd = Math.floor(Math.random() * (max - min + 1)) + min;
    numbers.push(rnd);
  }

  // Se il trucco era attivo, inserisci il 6 in una posizione a caso
  if (isRigged) {
    const randomIndex = Math.floor(Math.random() * count);
    numbers[randomIndex] = RIGGED_NUMBER;

    // Spegni il trucco e fai tornare il bottone nero
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