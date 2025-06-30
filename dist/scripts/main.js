document.addEventListener('DOMContentLoaded', () => {
  // Variabili DOM
  const introSection = document.getElementById('introSection');
  const configurator = document.getElementById('configurator');

  // Carousel
  const carouselTrack = document.getElementById('carouselTrack');
  const cards = carouselTrack.querySelectorAll('.custom-card');
  const btnCarouselPrev = document.getElementById('prevBtn');
  const btnCarouselNext = document.getElementById('nextBtn');

  // Step navigation buttons
  const btnSelect = document.querySelector('#step-1 button.btn-verdekd'); // Seleziona button
  const btnStep2Next = document.querySelector('#step-2 button.btn-verdekd'); // Avanti step 2
  const btnStep2Prev = document.querySelector('#step-2 button.btn-rossokd'); // Indietro step 2
  const btnStep3Prev = document.querySelector('#step-3 button.btn-rossokd'); // Indietro step 3

  // Step div
  const step1 = document.getElementById('step-1');
  const step2 = document.getElementById('step-2');
  const step3 = document.getElementById('step-3');

  // Riepilogo elementi
  const totalSelectedSpan = document.getElementById('total-selected');
  const selectedCoursesList = document.getElementById('selected-courses-list');

  // Configurazione selezionata (usiamo oggetto semplice)
  let selectedCourseCount = 0;

  // Carousel index
  let currentIndex = 0;

  // Funzione per mostrare uno step solo
  function showStep(stepNumber) {
    step1.style.display = stepNumber === 1 ? 'block' : 'none';
    step2.style.display = stepNumber === 2 ? 'block' : 'none';
    step3.style.display = stepNumber === 3 ? 'block' : 'none';
  }

  // Inizializza visibilità
  showStep(1);

  // Funzione aggiorna carousel e classe active
  function updateCarousel() {
    const translateX = -currentIndex * 100;
    carouselTrack.style.transform = `translateX(${translateX}%)`;
    cards.forEach((card, i) => {
      if (i === currentIndex) card.classList.add('active');
      else card.classList.remove('active');
    });
  }

  // Eventi carousel
  btnCarouselPrev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
  });
  btnCarouselNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
  });

  // Seleziona card cliccata
  cards.forEach((card, i) => {
    card.addEventListener('click', () => {
      currentIndex = i;
      updateCarousel();
    });
  });

  updateCarousel();

  // Funzione per ottenere corsi selezionati
  function getSelectedCourses() {
    const activeCard = carouselTrack.querySelector('.custom-card.active');
    if (!activeCard) return 0;
    return parseInt(activeCard.dataset.courses, 10) || 0;
  }

  // Aggiorna riepilogo step 2
  function updateSummary() {
    selectedCourseCount = getSelectedCourses();

    sessionStorage.setItem('corsoSelezionato', selectedCourseCount);

    totalSelectedSpan.textContent = selectedCourseCount;

    const certQty = document.querySelector('input[name="certQty"]:checked')?.nextElementSibling?.textContent.trim() || "Quantità non selezionata";
    const certDuration = document.querySelector('input[name="certDuration"]:checked')?.nextElementSibling?.textContent.trim() || "Durata non selezionata";
    const apiActive = document.getElementById('apiAccess')?.checked ? "Servizio API attivato" : "Servizio API non attivato";

    const cardQty = document.getElementById('cardQty');
    if (cardQty) {
      if (selectedCourseCount === 1) {
        cardQty.style.display = 'none';
      } else {
        cardQty.style.display = 'block';
      }
    }
  }

  function resetStep2() {
  // Deseleziona radio certQty solo se NON è corso 1
  const corsoSelezionato = sessionStorage.getItem('corsoSelezionato');
  if (corsoSelezionato !== "1") {
    console.log("funziona");
    document.querySelectorAll('input[name="certQty"]').forEach(radio => radio.checked = false);
  }

  // Deseleziona durata e api
  document.querySelectorAll('input[name="certDuration"]').forEach(radio => radio.checked = false);
  const apiCheckbox = document.getElementById('apiAccess');
  if (apiCheckbox) apiCheckbox.checked = false;

  // Reset summary
  const summaryQty = document.getElementById('summary-cert-qty');
  const summaryDurata = document.getElementById('summary-cert-duration');
  const summaryApi = document.getElementById('summary-api');

  if (corsoSelezionato === "1") {
    
    summaryQty.textContent = 'Quantità illimitata';
    
  } else {
    summaryQty.textContent = '-';
  }

  summaryDurata.textContent = '-';
  summaryApi.textContent = 'Non attivo';
}

  let prizes = {
    "1": {
      "multi": {
        "10": 100,
        "illimitata": 250
      }
    },
    "10": {
      "single": {
        "10": 300,
        "illimitata": 750
      },
      "multi": {
        "10": 500,
        "illimitata": 1250
      }
    },
    "50": {
      "single": {
        "10": 800,
        "illimitata": 2000
      },
      "multi": {
        "10": 1000,
        "illimitata": 2500
      }
    }
  };

  sessionStorage.setItem('prezzi', JSON.stringify(prizes));

  // Avvio configuratore (dal bottone della intro)
  const btnStart = introSection.querySelector('button.btn-verdekd');
  btnStart.addEventListener('click', () => {
    introSection.style.display = 'none';
    configurator.style.display = 'block';
  });

  // Pulsante Seleziona (step 1 -> step 2)
  btnSelect.addEventListener('click', () => {
    selectedCourseCount = getSelectedCourses();
    if (selectedCourseCount === 0) {
      alert('Seleziona un pacchetto corsi prima di continuare');
      return;
    }
    sessionStorage.setItem('corsoSelezionato', selectedCourseCount);
    updateSummary();
    showStep(2);

    const certQtyRadios = document.querySelectorAll('input[name="certQty"]');
    const certDurationRadios = document.querySelectorAll('input[name="certDuration"]');
    const apiCheckbox = document.getElementById('apiAccess');

    certQtyRadios.forEach(radio => radio.addEventListener('change', updateSummarySelections));
    certDurationRadios.forEach(radio => radio.addEventListener('change', updateSummarySelections));
    apiCheckbox.addEventListener('change', updateSummarySelections);

    updateSummarySelections();
  });

  // Pulsante Indietro step 2 -> step 1
  btnStep2Prev.addEventListener('click', () => {
    resetStep2();  // Azzera tutto
    showStep(1);
  });

  // Pulsante Avanti step 2 -> step 3
  btnStep2Next.addEventListener('click', () => {
    const certQtySelected = document.querySelector('input[name="certQty"]:checked');
    const certDurationSelected = document.querySelector('input[name="certDuration"]:checked');

    if (selectedCourseCount > 1) {
      if (!certQtySelected || !certDurationSelected) {
        alert('Seleziona la quantità e la durata del certificato prima di proseguire.');
        return;
      }
    }
    else {
      const SummaryCertQty = document.getElementById('summary-cert-qty');
      
      if (!certDurationSelected) {
        alert('Seleziona la durata del certificato prima di proseguire.');
        return;
      }
    }

    updateSummary();
    showStep(3);


    let prezzoFinale = sessionStorage.getItem('prezzoCalcolato');
    // Qui puoi aggiungere il calcolo finale prezzo e dettagli
    document.getElementById('finalPrice').textContent = prezzoFinale; // Calcolo prezzo da fare
  });

  // Pulsante Indietro step 3 -> step 2
  btnStep3Prev.addEventListener('click', () => {
    resetStep2();
    showStep(2);
    updateSummarySelections();
  });

});

function updateSummarySelections() {
  const prezziCertificati = JSON.parse(sessionStorage.getItem('prezzi')) || {};
  const corsoSelezionato = String(sessionStorage.getItem('corsoSelezionato')) || '0';
  let prezzo = 1000; // caparra iniziale

  const certQtyInput = document.querySelector('input[name="certQty"]:checked');
  const certDurationInput = document.querySelector('input[name="certDuration"]:checked');
  const apiCheckbox = document.getElementById('apiAccess');

  const quantità = certQtyInput ? certQtyInput.value : null;
  const durata = certDurationInput ? certDurationInput.value : null;

  // Calcolo prezzo solo se quantità e durata sono selezionate
  if (durata && (quantità || corsoSelezionato === "1")) {
    if (corsoSelezionato === "1") {
      const qtyToUse = quantità || 'multi';
      if (prezziCertificati["1"]?.[qtyToUse]?.[durata]) {
        prezzo += prezziCertificati["1"][qtyToUse][durata];
      }
    } else if (prezziCertificati[corsoSelezionato]?.[quantità]?.[durata]) {
      prezzo += prezziCertificati[corsoSelezionato][quantità][durata];
    }
  }

  if (apiCheckbox?.checked) prezzo += 5000;

  function getLabelText(input) {
    if (!input) return '-';
    const label = input.nextElementSibling;
    return label ? label.textContent.trim() : '-';
  }

  const summaryQtyElement = document.getElementById('summary-cert-qty');

  if (corsoSelezionato === "1") {
    summaryQtyElement.textContent = 'Quantità illimitata';
  } else if (certQtyInput) {
    summaryQtyElement.textContent = getLabelText(certQtyInput);
  } else {
    summaryQtyElement.textContent = '-';
  }
  document.getElementById('summary-cert-duration').textContent = getLabelText(certDurationInput);
  document.getElementById('summary-api').textContent = apiCheckbox?.checked ? 'Attivo' : 'Non attivo';

  sessionStorage.setItem('prezzoCalcolato', prezzo);
}