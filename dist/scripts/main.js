//Oggetto di frasi viste a schermo per ogni lingua
const translations = {
  it: {
    alert_select_course: 'Seleziona un pacchetto corsi prima di continuare',
    alert_select_qty_duration: 'Seleziona la quantità e la durata del certificato prima di proseguire.',
    alert_select_duration: 'Seleziona la durata del certificato prima di proseguire.',
    quantity_unlimited: 'Quantità illimitata',
    quantity_not_selected: 'Quantità non selezionata',
    duration_not_selected: 'Durata non selezionata',
    api_active: 'Servizio API attivato',
    api_not_active: 'Servizio API non attivato',
    active: 'Attivo',
    not_active: 'Non attivo',
    price_currency: '€',
    summary_dash: '-',
  },
  en: {
    alert_select_course: 'Please select a course package before continuing',
    alert_select_qty_duration: 'Please select the certificate quantity and duration before proceeding.',
    alert_select_duration: 'Please select the certificate duration before proceeding.',
    quantity_unlimited: 'Unlimited quantity',
    quantity_not_selected: 'Quantity not selected',
    duration_not_selected: 'Duration not selected',
    api_active: 'API service enabled',
    api_not_active: 'API service not enabled',
    active: 'Active',
    not_active: 'Not active',
    price_currency: '£',
    summary_dash: '-',
  },
  es: {
    alert_select_course: 'Por favor, seleccione un paquete de cursos antes de continuar',
    alert_select_qty_duration: 'Por favor, seleccione la cantidad y duración del certificado antes de continuar.',
    alert_select_duration: 'Por favor, seleccione la duración del certificado antes de continuar.',
    quantity_unlimited: 'Cantidad ilimitada',
    quantity_not_selected: 'Cantidad no seleccionada',
    duration_not_selected: 'Duración no seleccionada',
    api_active: 'Servicio API activado',
    api_not_active: 'Servicio API no activado',
    active: 'Activo',
    not_active: 'No activo',
    price_currency: '€',
    summary_dash: '-',
  }
};

// Rileva la lingua dalla cartella prima di index.html (dist/, dist/en/, dist/es/)
function detectLanguage() {
  const pathParts = window.location.pathname.split('/');
  const distIndex = pathParts.indexOf('dist');
  if (distIndex !== -1 && pathParts.length > distIndex + 1) {
    const langCandidate = pathParts[distIndex + 1];
    if (['en', 'es'].includes(langCandidate)) return langCandidate;
  }
  return 'it';
}

const lang = detectLanguage();

function t(key) {
  return translations[lang][key] || key;
}

function changeLanguage(newLang) {
  sessionStorage.removeItem('configuratorActive');

  const currentStep = sessionStorage.getItem('currentStep') || 'step1';
  const newPath = newLang === 'it' ? '/dist/' : `/dist/${newLang}/`;
  window.location.href = newPath + 'index.html?step=' + currentStep;
}


document.addEventListener('DOMContentLoaded', () => {

  // Variabili DOM
  const introSection = document.getElementById('introSection');
  const configurator = document.getElementById('configurator');

  const introShown = sessionStorage.getItem('introShown');

  if (introShown) {
    introSection.style.display = 'none';
    configurator.style.display = 'block';
  } else {
    introSection.style.display = 'block';
    configurator.style.display = 'none';
  }
  // Avvio configuratore (dal bottone della intro)
  const btnStart = introSection.querySelector('button.btn-verdekd');
  btnStart.addEventListener('click', () => {
    introSection.style.display = 'none';
    configurator.style.display = 'block';
  });

  // Carousel
  const carouselTrack = document.getElementById('carouselTrack');
  const cards = carouselTrack.querySelectorAll('.custom-card');
  const btnCarouselPrev = document.getElementById('prevBtn');
  const btnCarouselNext = document.getElementById('nextBtn');

  // Step navigation buttons
  const btnSelect = document.querySelector('#step-1 button.btn-verdekd'); // Seleziona button
  const btnStep2Next = document.querySelector('#step-2 button.btn-verdekd'); // Avanti step 2
  const btnStep2Prev = document.querySelector('#step-2 a.link-rossokd'); // Indietro step 2
  const btnStep3Prev = document.querySelector('#step-3 a.link-rossokd'); // Indietro step 3

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

  document.getElementById('homeButton').addEventListener('click', (e) => {
    e.preventDefault();
    sessionStorage.removeItem('currentStep');

    const introSection = document.getElementById('introSection');
    const configurator = document.getElementById('configurator');

    introSection.style.display = 'block';
    configurator.style.display = 'none';

    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Funzione per mostrare uno step solo
  function showStep(stepNumber) {
    sessionStorage.setItem('currentStep', `step${stepNumber}`);
    step1.style.display = stepNumber === 1 ? 'block' : 'none';
    step2.style.display = stepNumber === 2 ? 'block' : 'none';
    step3.style.display = stepNumber === 3 ? 'block' : 'none';

    if (stepNumber === 3) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  btnSelect.addEventListener('click', () => {
    selectedCourseCount = getSelectedCourses();
    if (selectedCourseCount === 0) {
      alert(t('alert_select_course'));
      return;
    }
    sessionStorage.setItem('corsoSelezionato', selectedCourseCount);
    updateSummary();
    restoreSummary();
    showStep(2);

    initStep2Events();

    updateSummarySelections();
  });

  function initStep2Events() {

    const qtyContainer = document.getElementById('certQtyOptions');
    const durationContainer = document.getElementById('certDurationOptions');

    if (qtyContainer) {
      qtyContainer.querySelectorAll('.select-btn').forEach(button => {
        button.addEventListener('click', () => {
          // Deseleziona tutte le card
          qtyContainer.querySelectorAll('.option-card').forEach(card => card.classList.remove('selected'));

          // Seleziona quella cliccata
          const selectedCard = button.closest('.option-card');
          selectedCard.classList.add('selected');

          // Salva valore
          sessionStorage.setItem('certQuantity', selectedCard.dataset.value);

          updateSummarySelections();
        });
      });
    }

    if (durationContainer) {
      durationContainer.querySelectorAll('.select-btn').forEach(button => {
        button.addEventListener('click', () => {
          durationContainer.querySelectorAll('.option-card').forEach(card => card.classList.remove('selected'));
          const selectedCard = button.closest('.option-card');
          selectedCard.classList.add('selected');
          sessionStorage.setItem('certDuration', selectedCard.dataset.value);

          updateSummarySelections();
        });
      });
    }

    const apiCheckbox = document.getElementById('apiAccess');
    if (apiCheckbox) {
      apiCheckbox.addEventListener('change', updateSummarySelections);
    }
  }


  // Inizializza visibilità
  const savedStep = sessionStorage.getItem('currentStep');
  const urlParams = new URLSearchParams(window.location.search);
  const stepFromURL = urlParams.get('step');

  if (!stepFromURL) {
    // Nessun parametro step = siamo nella home
    console.log(savedStep);
    introSection.style.display = 'block';
    configurator.style.display = 'none';
  } else if (savedStep === 'step1') {
    console.log(savedStep);
    introSection.style.display = 'none';
    configurator.style.display = 'block';
    showStep(1);
  } else if (savedStep === 'step2') {
    introSection.style.display = 'none';
    configurator.style.display = 'block';
    restoreSummary();
    showStep(2);
    restoreStep2Selections();
    setTimeout(() => {
      initStep2Events();
      updateSummarySelections();
    }, 0);
  } else if (savedStep === 'step3') {
    console.log(savedStep);
    introSection.style.display = 'none';
    configurator.style.display = 'block';
    restoreSummary();
    initStep2Events();
    updateSummarySelections();
    showStep(3);
  }
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
    const courseCount = parseInt(activeCard.dataset.courses, 10) || 0;
    sessionStorage.setItem('selectedCoursesCount', courseCount);
    return courseCount;
  }
  function restoreStep2Selections() {
    const savedQty = sessionStorage.getItem('certQuantity');
    const savedDuration = sessionStorage.getItem('certDuration');
    const savedApi = sessionStorage.getItem('apiService');

    if (savedQty) {
      const qtyInput = document.querySelector(`input[name="certQty"][value="${savedQty}"]`);
      if (qtyInput) qtyInput.checked = true;
    }

    if (savedDuration) {
      const durationInput = document.querySelector(`input[name="certDuration"][value="${savedDuration}"]`);
      if (durationInput) durationInput.checked = true;
    }

    if (savedApi === 'Attivo' || savedApi === 'Active') {
      const apiInput = document.getElementById('apiAccess');
      if (apiInput) apiInput.checked = true;
    }
  }
  // Aggiorna riepilogo step 2
  function updateSummary() {
    const selectedCourseCount = getSelectedCourses();


    // Aggiorna il numero totale di corsi nel riepilogo
    totalSelectedSpan.textContent = selectedCourseCount;

    // Elementi riepilogo quantità e durata
    const summaryCertQty = document.getElementById('summary-cert-qty');
    const summaryCertDuration = document.getElementById('summary-cert-duration');

    if (selectedCourseCount === 1) {
      summaryCertQty.textContent = t('unlimited_quantity');
      summaryCertDuration.textContent = '-';
    } else if (selectedCourseCount === 10 || selectedCourseCount === 50) {
      summaryCertQty.textContent = '-';
      summaryCertDuration.textContent = '-';
    } else {
      summaryCertQty.textContent = '-';
      summaryCertDuration.textContent = '-';
    }

    // Stato API
    const apiActive = document.getElementById('apiAccess')?.checked ? t('api_active') : t('api_not_active');
    document.getElementById('summary-api').textContent = apiActive;
  }
  // Qui dentro metti il codice per agganciare i click
  document.querySelectorAll('.select-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const label = button.closest('label');
      if (!label) return;

      const radioId = label.getAttribute('for');
      if (!radioId) return;

      const radio = document.getElementById(radioId);
      if (!radio) return;
      radio.checked = true;
      const groupContainer = label.closest('.row.flex-column');

      if (groupContainer) {
        groupContainer.querySelectorAll('.select-btn').forEach(btn => btn.classList.remove('active'));
      }
      button.classList.add('active');
      updateSummarySelections();
      updateSummary();
    });
  });
  function updateButtonsState() {
    ['certQtyOptions', 'certDurationOptions'].forEach(groupId => {
      const group = document.getElementById(groupId);
      if (!group) return;

      const radios = group.querySelectorAll('input[type="radio"]');

      radios.forEach(radio => {
        const label = group.querySelector(`label[for="${radio.id}"]`);
        if (!label) return;

        const button = label.querySelector('.select-btn');
        if (!button) return;

        if (radio.checked) {
          button.classList.add('active');
        } else {
          button.classList.remove('active');
        }
      });
    });

    // Per la checkbox API
    const apiCheckbox = document.getElementById('apiAccess');
    const apiLabel = apiCheckbox ? apiCheckbox.closest('label') : null;
    // Se vuoi, aggiorna qualche stato visivo per la checkbox qui
  }

  // Aggiorna resetStep2
  function resetStep2() {
    const corsoSelezionato = parseInt(sessionStorage.getItem('corsoSelezionato'), 10) || 0;

    if (corsoSelezionato !== 1) {
      document.querySelectorAll('input[name="certQty"]').forEach(radio => radio.checked = false);
    }

    document.querySelectorAll('input[name="certDuration"]').forEach(radio => radio.checked = false);

    const apiCheckbox = document.getElementById('apiAccess');
    if (apiCheckbox) apiCheckbox.checked = false;

    const summaryQty = document.getElementById('summary-cert-qty');
    const summaryDurata = document.getElementById('summary-cert-duration');
    const summaryApi = document.getElementById('summary-api');

    if (corsoSelezionato === 1) {
      summaryQty.textContent = t('quantity_unlimited');
      summaryDurata.textContent = t('summary_dash');
    } else if (corsoSelezionato === 10 || corsoSelezionato === 50) {
      summaryQty.textContent = t('summary_dash');
      summaryDurata.textContent = t('summary_dash');
    } else {
      summaryQty.textContent = t('summary_dash');
      summaryDurata.textContent = t('summary_dash');
    }

    summaryApi.textContent = t('not_active');

    // Aggiorna lo stato visivo dei pulsanti seleziona
    updateButtonsState();
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

  // Pulsante Seleziona (step 1 -> step 2)
  btnSelect.addEventListener('click', () => {
    selectedCourseCount = getSelectedCourses();

    if (selectedCourseCount === 0) {
      alert(t('alert_select_course'));
      return;
    }

    sessionStorage.setItem('corsoSelezionato', selectedCourseCount);
    updateSummary();
    restoreSummary();
    showStep(2);

    // Inizializza gli eventi delle card al passaggio a Step 2
    initStep2Events();

    updateSummarySelections();
  });


  // Pulsante Indietro step 2 -> step 1
  btnStep2Prev.addEventListener('click', (e) => {
    e.preventDefault();
    resetStep2();
    showStep(1);
  });

  btnStep3Prev.addEventListener('click', (e) => {
    e.preventDefault();
    updateSummary();
    resetStep2();
    showStep(2);
  });
  // Pulsante Avanti step 2 -> step 3
  btnStep2Next.addEventListener('click', () => {
    const certQtySelected = document.querySelector('input[name="certQty"]:checked');
    const certDurationSelected = document.querySelector('input[name="certDuration"]:checked');

    if (selectedCourseCount > 1) {
      if (!certQtySelected || !certDurationSelected) {
        alert(t('alert_select_course'));
        return;
      }
    }
    else {
      if (!certDurationSelected) {
        alert(t('alert_select_course'));
        return;
      }
    }

    updateSummary();
    restoreSummary();
    showStep(3);
  });
  //Ripristina i dati al caricamento di Step 2 o Step 3
  function restoreSummary() {
    document.getElementById('total-selected').textContent = sessionStorage.getItem('selectedCoursesCount') || '0';

    // Leggo dal sessionStorage e aggiorno i testi, con fallback
    const certQty = sessionStorage.getItem('certQuantity') || '-';
    const certDuration = sessionStorage.getItem('certDuration') || '-';
    const apiService = sessionStorage.getItem('apiService') || t('not_active');
    const prezzoFinale = sessionStorage.getItem('prezzoCalcolato');

    document.getElementById('summary-cert-qty').textContent = certQty;
    document.getElementById('summary-cert-duration').textContent = certDuration;
    document.getElementById('summary-api').textContent = apiService;

    if (prezzoFinale) {
      document.getElementById('finalPrice').textContent = prezzoFinale + ' ' + t('price_currency');
    } else {
      document.getElementById('finalPrice').textContent = '-';
    }

    // Mostra/nascondi cardQty se definita e in base a selectedCourseCount
    if (typeof cardQty !== 'undefined' && cardQty) {
      const selectedCourseCount = parseInt(sessionStorage.getItem('selectedCoursesCount'), 10) || 0;
      if (selectedCourseCount === 1 || selectedCourseCount === 0) {
        cardQty.style.display = 'none';
      } else {
        cardQty.style.display = 'block';
      }
    }
  }

});

function updateSummarySelections() {
  const prezziCertificati = JSON.parse(sessionStorage.getItem('prezzi')) || {};
  const corsoSelezionato = String(sessionStorage.getItem('corsoSelezionato')) || '0';
  const cardMt3 = document.querySelector('.card-mt-3');
  let prezzo = 1000; // caparra iniziale

  if (corsoSelezionato === "1") {
    cardMt3.style.marginTop = '1rem';
  }


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
    summaryQtyElement.textContent = t('quantity_unlimited');
  } else if (certQtyInput) {
    summaryQtyElement.textContent = getLabelText(certQtyInput);
  } else {
    summaryQtyElement.textContent = t('summary_dash');
  }
  document.getElementById('summary-cert-duration').textContent = getLabelText(certDurationInput);
  document.getElementById('summary-api').textContent = apiCheckbox?.checked ? t('active') : t('not_active');

  sessionStorage.setItem('prezzoCalcolato', prezzo);
}

// Animazioni CSS

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target); // osserva solo una volta
    }
  });
});

// Seleziona TUTTI gli elementi da animare
document.querySelectorAll('.fade-in-down, .pop-in, .slide-in-left, .slide-in-right, .fade-in-up').forEach(elem => {
  observer.observe(elem);
});

//STEP 2 MOBILE
document.addEventListener("DOMContentLoaded", function () {
  const summary = document.getElementById("summaryContainer");
  const footer = document.querySelector("footer");
  const wrapper = document.getElementById("summaryWrapper");

  if (!summary || !footer || !wrapper) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        summary.classList.add("stop-fixed");
      } else {
        summary.classList.remove("stop-fixed");
      }
    },
    {
      root: null,
      threshold: 0,
    }
  );

  observer.observe(footer);
});

// Vai al configuratore dalla nav
document.addEventListener('DOMContentLoaded', () => {
  const navConfiguratorLink = document.getElementById('navConfiguratorLink');
  const introSection = document.getElementById('introSection');
  const configurator = document.getElementById('configurator');
  const contactLinkStep2 = document.getElementById('contactLinkStep2');

  if (navConfiguratorLink && introSection && configurator) {
    navConfiguratorLink.addEventListener('click', (e) => {
      e.preventDefault(); 

      introSection.style.display = 'none';
      configurator.style.display = 'block';

      configurator.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Quando clicco su una voce di menù mi reindirizza senza lasciare l'hamburger aperto
  const navLinks = document.querySelectorAll('.navbar-collapse .nav-link');
  
  const navbarCollapse = document.querySelector('.navbar-collapse');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        new bootstrap.Collapse(navbarCollapse).hide();
      }
    });
  });

  // Cambio lingua
  document.querySelectorAll('[data-lang]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = e.currentTarget.dataset.lang;
      changeLanguage(lang); 
    });
  });

  // Torna alla sezione di contatto
  if (contactLinkStep2 && introSection && configurator) {

    contactLinkStep2.addEventListener('click', (e) => {
      configurator.style.display = 'none';
      introSection.style.display = 'block';
    });
  }
});
