// Configurazioni dei pacchetti
const configData = {
  single: {
    title: "1 Corso - Studenti illimitati",
    tipo: null,
    options: {
      "10 Anni - 100€": 100,
      "100 Anni - 250€": 250
    }
  },
  ten: {
    title: "10 Corsi",
    tipo: ["Individuale", "30 Studenti"],
    prices: {
      "Individuale": {
        "10 Anni - 300€": 300,
        "100 Anni - 750€": 750
      },
      "30 Studenti": {
        "10 Anni - 500€": 500,
        "100 Anni - 1250€": 1250
      }
    }
  },
  fifty: {
    title: "50 Corsi",
    tipo: ["Individuale", "30 Studenti"],
    prices: {
      "Individuale": {
        "10 Anni - 800€": 800,
        "100 Anni - 2000€": 2000
      },
      "30 Studenti": {
        "10 Anni - 1000€": 1000,
        "100 Anni - 2500€": 2500
      }
    }
  }
};

const collapsible = document.getElementById("collapsibleConfig");

const tipoWrapper = document.getElementById("tipoWrapper");

const title = document.getElementById("configTitle");

const tipoSelect = document.getElementById("tipo");

const durataSelect = document.getElementById("durata");

const form = document.getElementById("configForm");

const preventivoOutput = document.getElementById("outputPreventivo");

// Funzione per aggiornare le opzioni di durata dinamicamente
function updateDurataOptions(key, tipo) {

  const durations = configData[key].prices[tipo];

  durataSelect.innerHTML = Object.entries(durations).map(([label, val]) => `<option value="${val}">${label}</option>`).join("");
}

// Funzione principale per mostrare e popolare il modulo
function renderConfig(key) {

  const data = configData[key];

  collapsible.classList.remove("d-none");

  title.textContent = data.title;

  if (data.tipo) {

    tipoWrapper.classList.remove("d-none");

    tipoSelect.innerHTML = data.tipo.map(tipo => `<option value="${tipo}">${tipo}</option>`).join("");

    // Aggiorna la durata in base al tipo selezionato
    updateDurataOptions(key, tipoSelect.value);

    // Listener per cambiare la durata quando cambia il tipo
    tipoSelect.onchange = () => {
      updateDurataOptions(key, tipoSelect.value);
    };

  } else {

    tipoWrapper.classList.add("d-none");

    // Popola direttamente le opzioni "Durata"
    durataSelect.innerHTML = Object.entries(data.options)
      .map(([label, val]) => `<option value="${val}">${label}</option>`)
      .join("");
  }

  preventivoOutput.classList.add("d-none");
}

// Prepara la gestione del submit
form.onsubmit = function (e) {

  e.preventDefault();

  const prezzo = parseFloat(durataSelect.value);

  preventivoOutput.classList.remove("d-none");

  preventivoOutput.innerHTML = `Prezzo totale: <strong>${prezzo.toFixed(2)}€</strong>`;
};

// Aggiunge i listener ai pulsanti "Scopri di più"
document.querySelectorAll(".btn-toggle").forEach(btn => {

  btn.addEventListener("click", () => {
    const key = btn.getAttribute("data-target");
    // Se il modulo è già aperto per lo stesso pacchetto, lo chiudiamo
    if (!collapsible.classList.contains("d-none") && collapsible.dataset.opened === key) {
      collapsible.classList.add("d-none");
      collapsible.dataset.opened = "";
      return;
    }

    // Altrimenti lo mostriamo con i nuovi dati
    renderConfig(key);
    collapsible.dataset.opened = key;
  });
});


let currentIndex = 0; // Inizia dalla seconda card
const track = document.getElementById('carouselTrack');
const totalCards = track.children.length;

document.getElementById('prevBtn').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + totalCards) % totalCards;
  updateCarousel();
});

document.getElementById('nextBtn').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % totalCards;
  updateCarousel();
});

function updateCarousel() {
  const offset = -currentIndex * 100;
  track.style.transform = `translateX(${offset}%)`;

  // Gestione classe "active"
  Array.from(track.children).forEach((card, i) => {
    card.classList.remove("active");
    if (i === currentIndex) {
      card.classList.add("active");
    }
  });

  // Se il modulo è aperto, aggiorna i dati con la nuova card visibile
  if (!collapsible.classList.contains("d-none")) {
    const visibleCard = track.children[currentIndex];
    const key = visibleCard.getAttribute("data-target");
    renderConfig(key);
    collapsible.dataset.opened = key;
  }
}
updateCarousel(); 