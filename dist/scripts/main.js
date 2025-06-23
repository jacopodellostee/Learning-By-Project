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
  const btnSelect = document.querySelector('#step-1 button.btn-primary'); // Seleziona button
  const btnStep2Next = document.querySelector('#step-2 button.btn-primary'); // Avanti step 2
  const btnStep2Prev = document.querySelector('#step-2 button.btn-secondary'); // Indietro step 2
  const btnStep3Prev = document.querySelector('#step-3 button.btn-secondary'); // Indietro step 3

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
    totalSelectedSpan.textContent = selectedCourseCount;

    const certQty = document.querySelector('input[name="certQty"]:checked')?.nextElementSibling?.textContent.trim() || "Quantità non selezionata";
    const certDuration = document.querySelector('input[name="certDuration"]:checked')?.nextElementSibling?.textContent.trim() || "Durata non selezionata";
    const apiActive = document.getElementById('apiAccess')?.checked ? "Servizio API attivato" : "Servizio API non attivato";

  }
  // Avvio configuratore (dal bottone della intro)
  const btnStart = introSection.querySelector('button.btn-primary');
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
    updateSummary();
    showStep(2);
  });

  // Pulsante Indietro step 2 -> step 1
  btnStep2Prev.addEventListener('click', () => {
    showStep(1);
  });

  // Pulsante Avanti step 2 -> step 3
  btnStep2Next.addEventListener('click', () => {
    const certQtySelected = document.querySelector('input[name="certQty"]:checked');
    const certDurationSelected = document.querySelector('input[name="certDuration"]:checked');

    if (!certQtySelected || !certDurationSelected) {
        alert('Seleziona la quantità e la durata del certificato prima di proseguire.');
        return; // 👈 NON andare avanti se mancano le selezioni
    }

    updateSummary();
    showStep(3);


    // Qui puoi aggiungere il calcolo finale prezzo e dettagli
    document.getElementById('finalPrice').textContent = '€XXX'; // Calcolo prezzo da fare
  });

  // Pulsante Indietro step 3 -> step 2
  btnStep3Prev.addEventListener('click', () => {
    showStep(2);
  });

});

