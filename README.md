# Progetto Learning By Project

Un minisito dinamico e interattivo per generare un preventivo per il servizio di emissione certificati su blockchain di Kedor Srl (KeCert).  

L’obiettivo è offrire un’interfaccia coinvolgente e moderna che illustri in modo chiaro la stima del costo dei diversi piani in base alle esigenze del cliente

## Obiettivo Progetto

Realizzare un **minisito responsive, interattivo e user-friendly** che promuova il comparatore delle funzionalità del software *KeCert*. 

Il sito dovrà:

- Presentare i **diversi piani d’acquisto** e le relative opzioni

- Offrire **dinamicità** e **alta interattività** tramite componenti UI avanzati (tabella comparativa dinamica, effetti hover, interazioni JS, animazioni, ecc.).


## Team & Ruoli

**Team**  

### Web Crafters, *Gli artigiani del web*

- Un gruppo di appassionati del Web, uniti dalla passione per il design e la tecnologia. 

**Ruoli**

| Nome                  | Ruolo                          |
|-----------------------|--------------------------------|
| **Matteo Paglietta**  | **Team Leader** – Sviluppatore JavaScript |
| **Jacopo Dell’Oste**  | Sviluppatore JavaScript        |
| **Alessandro Vecchi** | Graphic Designer – Visual & UI |
| **Matteo Cecchi**     | Sviluppatore HTML/CSS          |
| **Cosmin Grosu**      | Sviluppatore HTML/CSS          |
| **Federico Peducci**  | Sviluppatore HTML/CSS          |


## Proposta Progettuale

La nostra proposta consiste nella realizzazione di un **sito one-page** moderno e altamente interattivo per il generatore di preventivi

L’obiettivo è comunicare con efficacia le funzionalità del prodotto, il costo dei vari piani e mettere in contatto diretto con Kedos determinati clienti per soluzioni personalizzate.


### Architettura del Sito

1. **Hero Section – Presentazione del Prodotto**

   Sezione d’apertura ad alto impatto visivo, con:

   * **Titolo chiaro e tagline** per introdurre il configuratore KeCert.

   * **Call to Action** per accedere rapidamente alla configurazione del piano.

2. **Sezione Blockchain – Cos'è e come funziona**

   Sezione informativa dedicata alla tecnologia blockchain, con:

   * Spiegazione sintetica e visivamente efficace del **funzionamento della blockchain**.

   * **Call to Action** che guida l’utente verso il configuratore.

3. **Sezione Configuratore – Crea il tuo piano KeCert**

   Sezione centrale dedicata alla **configurazione interattiva** del proprio piano, tramite:

   * Scelta delle funzionalità desiderate.

   * Visualizzazione in tempo reale delle opzioni selezionate.

4. **Sezione Offerta Personalizzata – Contatta Kedos**

   Sezione pensata per utenti con esigenze specifiche, con:

   * **Call to Action** per aprire un form di contatto diretto con Kedos.

5. **Sezione Preventivo – Richiedi maggiori informazioni**

   Sezione conclusiva operativa, con:

   * **Visualizzazione del costo** del piano configurato.

   * **Form per il contatto**: nome, email, messaggio.

        Invito all’invio per ricevere maggiori informazioni.

6. **Footer – Collegamenti e Contatti**

   Sezione di chiusura del sito, contenente:

   * **Logo Kedos**, link ai **social media** e **contatti** ufficiali.

   * **Anchor link** per la navigazione rapida tra le sezioni.

### Esperienza Utente

Il sito è pensato per offrire un'esperienza **fluida, accessibile e mobile-first**, utilizzando:

* **Bootstrap 5.3** per un layout responsive

* **Animazioni CSS e JavaScript** per un’interazione dinamica

* **Design moderno** con attenzione a tipografia, spaziature e icone

* **Navigazione sticky + smooth scroll** per accompagnare l’utente.


##  Tecnologie e Strumenti

| Tecnologia/Tool       | Versione         | Utilizzo                                      |Link|
|------------------------|------------------|-----------------------------------------------|-----------------|
| **HTML**              | HTML5                | Struttura del sito                            |[HTML (MDN Docs)](https://developer.mozilla.org/en-US/docs/Web/HTML)|
| **SCSS**               | -                | Gestione avanzata degli stili                 |[Sassy CSS](https://sass-lang.com)|
| **Bootstrap**          | 5.3              | Framework per UI responsive                   |[Bootstrap](https://getbootstrap.com)|
| **JavaScript**         | ES6              | Interattività e logica client-side            |[Javascript (MDN Docs)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)|
| **Prepros**            | v7+              | Compilazione automatica SCSS / live preview   |[Prepros Download](https://prepros.io/)|
| **Figma**              | Web              | Wireframe, UI Design, visual e presentazioni  |[Figma (WebCrafters)](https://www.figma.com/files/team/1509552770960074561/project/391879798/Team-project?fuid=1450395265521060345)|
| **Notion**             | Web              | Gestione Lavagna Kanban       |[Notion (WebCrafters)](https://www.notion.so/Web-Crafters-203564e9bc3480749034c3ce16563409)|

## Struttura del Progetto

```
Learning-By-Project/
├── dist/
│   ├── css/
│   │   └── style.css            
│   ├── img/                     
│   │   └── bandiera-inghilterra.png
│   ├── index.html               
│   └── scripts/
│       └── main.js              
├── scss/
│   ├── vendor/                  
│   └── style.scss               
├── prepros.config               
├── README.md                    
├── Learning-By-Project.lnk      # Collegamento rapido al progetto (facoltativo)
```

##  Dettaglio Cartelle

### `dist/`

Contiene i file pronti alla pubblicazione. È la cartella "buildata" generata da Prepros.

- `css/style.css`: Stile compilato da `scss/style.scss`

- `img/`: Immagini del sito

- `scripts/main.js`: Script interattivi (toggle, animazioni, DOM)

- `index.html`: Pagina HTML principale, include:

  + Bootstrap 5.3 (da CDN)

  + Collegamento a `style.css` e `main.js`

### `scss/`
Contiene il codice sorgente SCSS, organizzato in componenti modulari.

- `style.scss`: File SCSS principale con tutti gli import

- `vendor/`: Componenti SCSS di Bootstrap da importare su `style.scss` (es. navbar, card, carousel, ecc.)

Esempio di codice SCSS:

```scss
// Imports
@import "vendor/navbar";
@import "vendor/card";
@import "vendor/carousel";
@import "vendor/utilities/api";

// Custom styles
.body {
  background-color: #f8f9fa;
}
```

Ecco la sezione `prepros.config` riscritta in modo più completo e accurato, in linea con l’uso effettivo che fate di **Prepros**:

### `prepros.config`

Il file viene **generato automaticamente** dal software Prepros e contiene le impostazioni per la **compilazione del codice SCSS in CSS**.

Nel nostro progetto, Prepros viene utilizzato per:

* **Compilare automaticamente** il file `style.scss` genera un `style.css` in `css/` ogni volta che viene salvato.

* **Minificare il CSS generato**, riducendo la dimensione del file e ottimizzandolo per la produzione.

* Gestire il **live reload** nel browser: ogni modifica al codice, Prepros aggiorna la pagina in tempo reale.

Ecco la **sezione "Avvio del Progetto"** riscritta in modo più chiaro e divisa in due sotto-sezioni: una per gli **utenti finali** che vogliono semplicemente usare il sito già pronto, e una per gli **sviluppatori** che vogliono modificarlo o estenderlo.

## Avvio del Progetto

### Per Utenti Finali

Se vuoi semplicemente **utilizzare il sito già funzionante**, segui questi passaggi:

1. Apri la cartella `dist/`

2. Avvia il file `index.html` nel tuo browser preferito.

### Per Sviluppatori

Se desideri **modificare il progetto** o **lavorare sul codice SCSS**, segui queste istruzioni:

1. **Trascina la cartella del progetto su Prepros**.

2. Verifica che il file `scss/style.scss` sia collegato correttamente a `dist/css/style.css`.

3. **Inserire la cartella `vendor/`** all’interno di `scss/`.

   > [!WARNING]  

   > `vendor/` non è presente nel repository
   
   >  La cartella `vendor/` deve contenere i file `.scss` di **Bootstrap 5.3** richiesti tramite `@import` in `style.scss` (es. `_buttons.scss`, `_navbar.scss`, `_utilities/api.scss` ecc.)

4. In Prepros, abilita:

   * **Compilazione automatica** (Auto Compile)

   * **Minificazione** (Minify Output)

   * **Live Preview** per aggiornamento istantaneo nel browser

5. Apri `dist/index.html` per visualizzare le modifiche in tempo reale.
