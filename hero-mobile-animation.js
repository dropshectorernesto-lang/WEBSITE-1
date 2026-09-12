(() => {
  if (document.body.dataset.page !== 'home') return;

  const mobile = matchMedia('(max-width: 560px)');
  const heroWrap = document.querySelector('.hero-image-wrap');
  const hero = heroWrap?.closest('.hero');
  const heroBook = document.querySelector('.hero-actions [data-book]');
  const booking = document.getElementById('bookingModal');
  if (!heroWrap || !heroBook || !booking) return;

  const style = document.createElement('style');
  style.id = 'hero-mobile-dog-rig-style';
  style.textContent = `
    .hero-dog-rig{display:none}
    @media(max-width:560px){
      .hero-image-wrap{overflow:hidden!important}
      .hero-image-wrap>.hero-dog-rig{
        display:block!important;
        position:absolute!important;
        left:50%!important;
        top:0!important;
        height:100%!important;
        width:auto!important;
        min-width:100%!important;
        aspect-ratio:941/1672!important;
        transform:translateX(-50%)!important;
        border:0!important;
        background:transparent!important;
        pointer-events:none!important;
        z-index:2!important;
        opacity:0!important;
      }
      .hero-image-wrap.hero-dog-rig-ready>.hero-dog-rig{opacity:1!important}
      .hero-image-wrap.hero-dog-rig-ready>img{opacity:0!important}
      .hero.hero-dog-rig-active>.bubble{display:none!important}
    }
  `;
  document.head.appendChild(style);

  let rig = null;
  let rigReady = false;
  let bookingTimer = 0;

  const markRigReady = () => {
    rigReady = true;
    heroWrap.classList.add('hero-dog-rig-ready');
    hero?.classList.add('hero-dog-rig-active');
  };

  const mountRig = () => {
    if (!mobile.matches || rig) return;
    rig = document.createElement('iframe');
    rig.className = 'hero-dog-rig';
    rig.title = 'Happy dog booking animation';
    rig.src = 'assets/mobile-dog-animation/Dog Asset Rig Mobile.dc.html';
    rig.setAttribute('aria-hidden', 'true');
    rig.setAttribute('scrolling', 'no');
    rig.tabIndex = -1;
    rig.addEventListener('load', markRigReady, { once:true });
    heroWrap.appendChild(rig);
  };

  const unmountRig = () => {
    if (mobile.matches) return;
    clearTimeout(bookingTimer);
    heroWrap.classList.remove('hero-dog-rig-ready');
    hero?.classList.remove('hero-dog-rig-active');
    rig?.remove();
    rig = null;
    rigReady = false;
  };

  const sendAssetTrigger = () => rig?.contentWindow?.postMessage('grum-mobile-dog-animate', '*');

  const playExactAssetAnimation = () => {
    if (!rig) mountRig();
    if (rigReady) {
      sendAssetTrigger();
    } else {
      rig?.addEventListener('load', sendAssetTrigger, { once:true });
    }
  };

  const showBooking = () => {
    if (!booking.open) booking.showModal();
    document.body.classList.add('modal-open');
  };

  heroBook.addEventListener('click', (event) => {
    if (!mobile.matches) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    playExactAssetAnimation();
    clearTimeout(bookingTimer);
    bookingTimer = window.setTimeout(showBooking, 450);
  }, { capture:true });

  const syncViewport = () => mobile.matches ? mountRig() : unmountRig();
  if (typeof mobile.addEventListener === 'function') mobile.addEventListener('change', syncViewport);
  else if (typeof mobile.addListener === 'function') mobile.addListener(syncViewport);

  mountRig();
})();

(() => {
  if (document.body.dataset.page !== 'home') return;

  const copy = {
    de: {
      tabs:['Datenschutz','AGB'], close:'Schließen', eyebrow:'GRÜM RECHTLICHES',
      privacy:{
        title:'DATENSCHUTZ.', intro:'Wir respektieren deine Privatsphäre beim Besuch unserer Website, bei Kontaktanfragen und bei Terminwünschen.', updated:'Zuletzt aktualisiert: 6. September 2026',
        sections:[
          ['Welche Informationen wir erfassen','Wenn du unsere Website oder das Terminformular nutzt, können wir Name, Telefonnummer, E-Mail-Adresse, Tiername, Tierdetails, Servicewünsche, Terminnotizen und Nachrichten erfassen.'],
          ['Wie wir Informationen nutzen','Wir nutzen deine Angaben, um Fragen zu beantworten, Termine zu planen und zu bestätigen, uns auf den Besuch vorzubereiten, Grooming-Services zu erbringen, nachzufassen und die Website zu verbessern.'],
          ['Website- und Geräteinformationen','Wie die meisten Websites können wir grundlegende technische Informationen wie Browsertyp, besuchte Seiten, Verweise und allgemeine Nutzung erhalten. Das hilft uns, die Funktion der Website zu prüfen.'],
          ['Weitergabe von Informationen','Wir verkaufen keine personenbezogenen Daten. Begrenzte Informationen können nur bei Bedarf mit vertrauenswürdigen Dienstleistern geteilt werden, die Website, Terminanfragen oder unseren Betrieb unterstützen.'],
          ['Gesundheitsdaten deines Tieres','Angaben zu Allergien, Gesundheit, Verhalten, Verfilzungen, Flöhen, Zecken oder besonderem Umgang nutzen wir ausschließlich für eine sicherere und angenehmere Betreuung deines Tieres.'],
          ['Deine Rechte','Du kannst uns kontaktieren, um Auskunft zu deinen Angaben zu erhalten, Änderungen zu verlangen oder die Löschung von Termindaten zu bitten, sobald wir sie nicht mehr für Geschäftsunterlagen benötigen.'],
          ['Kontakt','Bei Fragen zu dieser Datenschutzrichtlinie kontaktiere Grüm bitte über das Kontaktformular auf unserer Website.']
        ]
      },
      terms:{
        title:'ALLGEMEINE BEDINGUNGEN.', intro:'Diese Bedingungen erklären die Nutzung der Grüm-Website und das Senden von Grooming-Terminanfragen.', updated:'Zuletzt aktualisiert: 6. September 2026',
        sections:[
          ['Nutzung der Website','Mit der Nutzung dieser Website erklärst du dich mit einer respektvollen und rechtmäßigen Nutzung einverstanden. Bitte sende keine falschen Angaben, störe die Website nicht und missbrauche keine Formulare oder Links.'],
          ['Terminanfragen','Das Absenden eines Formulars bestätigt noch keinen Termin. Ein Grooming-Termin ist erst bestätigt, wenn Grüm Service, Datum, Uhrzeit, Preisrahmen und Verfügbarkeit bestätigt hat.'],
          ['Gesundheit und Sicherheit des Tieres','Bitte informiere uns vor dem Besuch über Allergien, Erkrankungen, Verletzungen, Verhaltensauffälligkeiten, Verfilzungen, Flöhe, Zecken, Ängste, altersbedingte Bedürfnisse oder besondere Anforderungen.'],
          ['Services und Preise','Servicebeschreibungen und Startpreise sind allgemeine Angaben. Empfehlungen und Endpreise können je nach Rasse, Größe, Fellzustand, Verhalten, Dauer und notwendigem Aufwand variieren.'],
          ['Stornierungen und Verspätungen','Wenn du absagen oder verschieben musst, kontaktiere uns bitte so früh wie möglich. Bei Verspätung kann je nach Tagesplan ein kürzerer Service, ein anderer Termin oder eine Verschiebung nötig sein.'],
          ['Website-Inhalte','Texte, Layout, Bilder, Branding und weitere Website-Materialien sind für Grüm bestimmt und dürfen ohne Erlaubnis nicht kopiert oder wiederverwendet werden, soweit dies nicht gesetzlich erlaubt ist.'],
          ['Kontakt','Bei Fragen zu diesen Bedingungen kontaktiere Grüm bitte über das Kontaktformular auf unserer Website.']
        ]
      }
    },
    es: {
      tabs:['Privacidad','Términos'], close:'Cerrar', eyebrow:'GRÜM LEGAL',
      privacy:{
        title:'POLÍTICA DE PRIVACIDAD.', intro:'Respetamos tu privacidad cuando visitas nuestra web, contactas con nosotros o solicitas una cita para tu mascota.', updated:'Última actualización: 6 de septiembre de 2026',
        sections:[
          ['Información que recopilamos','Al usar la web o el formulario de citas, podemos recopilar nombre, teléfono, email, nombre y detalles de la mascota, preferencias de servicio, notas de cita y mensajes.'],
          ['Cómo usamos la información','Usamos tus datos para responder preguntas, programar y confirmar citas, preparar la visita, prestar servicios, hacer seguimiento y mejorar la experiencia web.'],
          ['Información de web y dispositivo','Como muchas webs, podemos recibir información técnica básica como navegador, páginas vistas, referencias y actividad general de uso para comprobar que la web funciona correctamente.'],
          ['Compartir información','No vendemos información personal. Podemos compartir información limitada con proveedores de confianza que ayudan a operar la web, gestionar citas o apoyar el negocio, solo cuando sea necesario.'],
          ['Datos de salud de la mascota','Si nos das información sobre alergias, salud, comportamiento, nudos, pulgas, garrapatas o manejo especial, la usamos únicamente para cuidar a tu mascota de forma más segura y cómoda.'],
          ['Tus opciones','Puedes contactarnos para consultar tus datos, pedir una actualización o solicitar que eliminemos información de citas cuando ya no sea necesaria para nuestros registros.'],
          ['Contacto','Si tienes preguntas sobre esta Política de Privacidad, contacta con Grüm mediante el formulario de nuestra web.']
        ]
      },
      terms:{
        title:'TÉRMINOS Y CONDICIONES.', intro:'Estos términos explican cómo usar la web de Grüm y enviar solicitudes de citas.', updated:'Última actualización: 6 de septiembre de 2026',
        sections:[
          ['Uso de la web','Al usar esta web aceptas hacerlo de forma respetuosa y legal. No envíes información falsa, no interfieras con la web ni hagas un uso indebido de formularios o enlaces.'],
          ['Solicitudes de cita','Enviar un formulario no confirma automáticamente una cita. La cita se confirma solo cuando Grüm confirma servicio, fecha, hora, rango de precio y disponibilidad.'],
          ['Salud y seguridad de la mascota','Debes informarnos antes de la visita sobre alergias, enfermedades, lesiones, comportamiento, nudos, pulgas, garrapatas, ansiedad, necesidades por edad o manejo especial.'],
          ['Servicios y precios','Las descripciones y precios iniciales son orientativos. Recomendaciones y precios finales pueden variar según raza, tamaño, estado del pelo, comportamiento, tiempo y trabajo necesario.'],
          ['Cancelaciones y retrasos','Si necesitas cancelar o cambiar la cita, avísanos lo antes posible. Llegar tarde puede requerir un servicio más corto, otra hora o reprogramar según la agenda.'],
          ['Contenido de la web','Los textos, diseño, imágenes, branding y demás materiales de la web pertenecen a Grüm y no pueden copiarse o reutilizarse sin permiso salvo cuando la ley lo permita.'],
          ['Contacto','Si tienes preguntas sobre estos Términos y Condiciones, contacta con Grüm mediante el formulario de nuestra web.']
        ]
      }
    },
    ca: {
      tabs:['Privacitat','Termes'], close:'Tancar', eyebrow:'GRÜM LEGAL',
      privacy:{
        title:'POLÍTICA DE PRIVACITAT.', intro:'Respectem la teva privacitat quan visites la nostra web, contactes amb nosaltres o sol·licites una cita per a la teva mascota.', updated:'Última actualització: 6 de setembre de 2026',
        sections:[
          ['Informació que recopilem','Quan fas servir la web o el formulari de cites, podem recopilar el teu nom, telèfon, email, nom i detalls de la mascota, preferències de servei, notes de la cita i qualsevol missatge que ens enviïs.'],
          ['Com fem servir la informació','Fem servir les teves dades per respondre preguntes, programar i confirmar cites, preparar la visita, prestar serveis de perruqueria, fer seguiment de la sol·licitud i millorar l’experiència web.'],
          ['Informació de la web i del dispositiu','Com la majoria de webs, podem rebre informació tècnica bàsica com el tipus de navegador, pàgines visitades, pàgines de referència i activitat general d’ús. Això ens ajuda a comprovar que el lloc funciona bé.'],
          ['Compartir informació','No venem informació personal. Podem compartir informació limitada amb proveïdors de confiança que ens ajuden a operar la web, gestionar sol·licituds de cita o donar suport al negoci, només quan sigui necessari.'],
          ['Dades de salut de la mascota','Si ens proporciones informació sobre al·lèrgies, salut, comportament, nusos, puces, paparres o maneig especial, la fem servir només per oferir una cura més segura i còmoda.'],
          ['Les teves opcions','Pots contactar amb nosaltres per consultar les dades que has enviat, demanar una actualització o sol·licitar que eliminem detalls de cites quan ja no els necessitem per als registres del negoci.'],
          ['Contacte','Si tens preguntes sobre aquesta Política de privacitat, contacta amb Grüm mitjançant el formulari de contacte de la nostra web.']
        ]
      },
      terms:{
        title:'TERMES I CONDICIONS.', intro:'Aquests termes expliquen com els visitants poden fer servir la web de Grüm i enviar sol·licituds de cita.', updated:'Última actualització: 6 de setembre de 2026',
        sections:[
          ['Ús de la web','En fer servir aquesta web, acceptes utilitzar-la de manera respectuosa i només amb finalitats legals. No enviïs informació falsa, no intentis interferir amb la web ni facis un mal ús dels formularis o enllaços.'],
          ['Sol·licituds de cita','Enviar un formulari no confirma automàticament una cita. La cita queda confirmada només quan Grüm contacta amb tu i confirma el servei, la data, l’hora, el rang de preu i la disponibilitat.'],
          ['Salut i seguretat de la mascota','Acceptes informar-nos abans de la visita sobre al·lèrgies, condicions mèdiques, lesions, comportament, nusos, puces, paparres, ansietat, necessitats per edat o qualsevol requisit especial.'],
          ['Serveis i preus','Les descripcions dels serveis i els preus inicials són informació general. Les recomanacions i el preu final poden variar segons la raça, mida, estat del pelatge, comportament, durada i feina necessària per cuidar la mascota amb seguretat.'],
          ['Cancel·lacions i retards','Si necessites cancel·lar o canviar la cita, contacta amb nosaltres tan aviat com puguis. Arribar tard pot requerir un servei més curt, una altra hora o reprogramar segons l’agenda del dia.'],
          ['Contingut de la web','Els textos, el disseny, les imatges, la marca i altres materials de la web pertanyen a Grüm i no es poden copiar ni reutilitzar sense permís, excepte quan la llei ho permeti.'],
          ['Contacte','Si tens preguntes sobre aquests Termes i condicions, contacta amb Grüm mitjançant el formulari de contacte de la nostra web.']
        ]
      }
    }
  };

  const getLang = () => ['en','de','es','ca'].includes(document.documentElement.lang) ? document.documentElement.lang : 'en';
  const legalDialog = () => document.getElementById('legalModal');
  let patching = false;

  const localizeLegal = () => {
    const lang = getLang();
    if (lang === 'en' || patching) return;
    const dialog = legalDialog();
    if (!dialog) return;
    const active = dialog.querySelector('.legal-bubble-tabs button.active')?.dataset.legalPage || 'privacy-policy.html';
    const doc = active.startsWith('terms') ? copy[lang].terms : copy[lang].privacy;
    const content = dialog.querySelector('.legal-bubble-content');
    const tabs = [...dialog.querySelectorAll('.legal-bubble-tabs button')];
    const close = dialog.querySelector('[data-close-legal]');
    if (!content || tabs.length < 2) return;

    patching = true;
    tabs[0].textContent = copy[lang].tabs[0];
    tabs[1].textContent = copy[lang].tabs[1];
    dialog.querySelector('.legal-bubble-tabs')?.setAttribute('aria-label', lang === 'de' ? 'Rechtliche Dokumente' : lang === 'es' ? 'Documentos legales' : 'Documents legals');
    close?.setAttribute('aria-label', copy[lang].close);
    content.innerHTML = `
      <p class="kicker">${copy[lang].eyebrow}</p>
      <h2>${doc.title}</h2>
      <p class="legal-bubble-intro">${doc.intro}</p>
      <p class="legal-bubble-updated">${doc.updated}</p>
      ${doc.sections.map(([heading, body]) => `<section class="legal-bubble-section"><h3>${heading}</h3><p>${body}</p></section>`).join('')}
    `;
    patching = false;
  };

  const watchForDialog = () => {
    const dialog = legalDialog();
    if (!dialog) return false;
    const content = dialog.querySelector('.legal-bubble-content');
    if (!content || content.dataset.i18nWatched) return true;
    content.dataset.i18nWatched = '1';
    new MutationObserver(() => queueMicrotask(localizeLegal)).observe(content, { childList:true, subtree:true, characterData:true });
    queueMicrotask(localizeLegal);
    return true;
  };

  if (!watchForDialog()) {
    const bodyObserver = new MutationObserver(() => { if (watchForDialog()) bodyObserver.disconnect(); });
    bodyObserver.observe(document.body, { childList:true, subtree:true });
  }

  new MutationObserver(() => queueMicrotask(localizeLegal)).observe(document.documentElement, { attributes:true, attributeFilter:['lang'] });
})();
