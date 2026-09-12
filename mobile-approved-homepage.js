(() => {
  if (document.body.dataset.page !== 'home') return;
  const track = document.querySelector('.ig-grid');
  if (!track) return;
  const viewport = document.createElement('div');
  viewport.className = 'ig-carousel-viewport';
  viewport.tabIndex = 0;
  viewport.setAttribute('role', 'region');
  viewport.setAttribute('aria-label', 'Dog photo carousel');
  track.before(viewport); viewport.append(track);
  const images = [
    ['assets/ig-1.jpg', 'Smiling dog enjoying a bath in the studio'],
    ['assets/ig-2.jpg', 'Dog wrapped in a towel after a spa bath'],
    ['assets/ig-4.jpg', 'Golden dog surrounded by bath bubbles'],
    ['assets/ig-5.jpg', 'Small groomed dog posing with a bow tie'],
    ['assets/ig-3.jpg', 'Premium grooming products arranged on towels'],
    ['assets/ig-6.jpg', 'Warm quiet grooming studio interior'],
    ['assets/ig-7.webp', 'Funny well groomed dog smiling in the grooming studio'],
    ['assets/ig-8.webp', 'Freshly bathed dog wrapped in a towel at the salon'],
    ['assets/ig-9.webp', 'Playful dog posing after a grooming session'],
    ['assets/ig-10.webp', 'Cute dog enjoying a grooming table moment'],
    ['assets/ig-11.webp', 'Funny dog during a fresh grooming visit']
  ];
  track.replaceChildren();
  for (let set = 0; set < 3; set++) images.forEach(([src, alt]) => {
    const img = new Image(); img.src = src; img.alt = alt;
    img.draggable = false; img.width = 180; img.height = 180;
    if (set !== 1) { img.alt = ''; img.setAttribute('aria-hidden','true'); }
    track.append(img);
  });
  track.classList.add('ig-infinite-carousel');
  let x = 0, period = 0, dragging = false, lastX = 0, resumeAt = 0, lastTime = performance.now();
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const scale = () => viewport.getBoundingClientRect().width / viewport.offsetWidth || 1;
  function paint() {
    if (!period) return;
    x = -period + ((x + period) % period + period) % period;
    track.style.transform = `translate3d(${x}px,0,0)`;
  }
  function measure() {
    const next = track.children[images.length];
    const previous = period;
    period = next.offsetLeft - track.children[0].offsetLeft;
    x = previous ? x / previous * period : -period;
    paint();
  }
  const pause = () => { resumeAt = performance.now() + 2000; };
  viewport.addEventListener('dragstart', e => e.preventDefault());
  viewport.addEventListener('pointerdown', e => {
    if (e.button !== 0 || dragging) return;
    dragging = true; lastX = e.clientX;
    viewport.setPointerCapture(e.pointerId);
    viewport.classList.add('is-dragging');
  });
  viewport.addEventListener('pointermove', e => {
    if (!dragging) return;
    x += (e.clientX - lastX) / scale(); lastX = e.clientX; paint();
  });
  function finish(e) {
    if (!dragging) return;
    dragging = false; pause(); viewport.classList.remove('is-dragging');
    if (viewport.hasPointerCapture(e.pointerId)) viewport.releasePointerCapture(e.pointerId);
  }
  ['pointerup','pointercancel','lostpointercapture'].forEach(type => viewport.addEventListener(type,finish));
  viewport.addEventListener('wheel', e => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    e.preventDefault(); x -= e.deltaX / scale(); pause(); paint();
  }, {passive:false});
  viewport.addEventListener('keydown', e => {
    if (!['ArrowLeft','ArrowRight'].includes(e.key)) return;
    e.preventDefault(); x += e.key === 'ArrowLeft' ? 100 : -100; pause(); paint();
  });
  new ResizeObserver(measure).observe(viewport);
  measure();
  function tick(now) {
    const dt = Math.min(now - lastTime, 50) / 1000; lastTime = now;
    if (!dragging && now >= resumeAt && !document.hidden && !reducedMotion.matches) { x -= 9 * dt; paint(); }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();

(() => {
  if (document.body.dataset.page !== 'home') return;
  const script = document.createElement('script');
  script.src = 'hero-mobile-animation.js?v=hero-dog-3';
  script.defer = true;
  document.head.appendChild(script);
})();

(() => {
  if (document.body.dataset.page !== 'home') return;

  const spacingStyle = document.createElement('style');
  spacingStyle.id = 'localized-service-heading-spacing';
  spacingStyle.textContent = `
    html[lang="es"] body[data-page="home"] .services h2{
      line-height:1.04!important;
      letter-spacing:-.2px!important;
      padding-top:2px!important;
      padding-bottom:2px!important;
    }
    html[lang="es"] body[data-page="home"] .services h2 span{
      display:inline-block!important;
      padding-top:1px!important;
    }
  `;
  document.head.appendChild(spacingStyle);

  const legalLinks = [...document.querySelectorAll('.legal-links a')].filter(link => {
    const href = link.getAttribute('href') || '';
    return href.endsWith('privacy-policy.html') || href.endsWith('terms-and-conditions.html');
  });
  if (!legalLinks.length) return;

  const legalCopy = {
    en: {
      tabs: ['Privacy', 'Terms'], close: 'Close', aria: 'Legal documents', eyebrow: 'GRÜM LEGAL',
      documents: {
        'privacy-policy.html': {
          title: 'PRIVACY POLICY.',
          intro: 'We respect your privacy when you browse our website, contact us, or request a grooming appointment for your pet.',
          updated: 'Last updated: September 6, 2026',
          sections: [
            ['Information We Collect', 'When you use our website or appointment form, we may collect your name, phone number, email address, pet name, pet details, service preferences, appointment notes, and any message you choose to send us.'],
            ['How We Use Information', 'We use your information to answer questions, schedule and confirm appointments, prepare for your pet’s visit, provide grooming services, follow up about your request, and improve the website experience.'],
            ['Website And Device Information', 'Like most websites, we may receive basic technical information such as browser type, pages viewed, referring pages, and general usage activity. This helps us understand whether the site is working properly.'],
            ['Sharing Information', 'We do not sell personal information. We may share limited information with trusted service providers who help operate the website, manage appointment requests, or support our business, and only when needed for those services.'],
            ['Pet Health Details', 'If you provide allergy, medical, behavior, matting, flea, tick, or special handling information, we use it only to help us provide safer and more comfortable care for your pet.'],
            ['Your Choices', 'You can contact us to ask about the information you submitted, request an update, or ask us to remove appointment request details when we no longer need them for business records.'],
            ['Contact', 'If you have questions about this Privacy Policy, please contact Grüm through the contact form on our website.']
          ]
        },
        'terms-and-conditions.html': {
          title: 'TERMS & CONDITIONS.',
          intro: 'These terms explain how visitors may use the Grüm website and submit grooming appointment requests.',
          updated: 'Last updated: September 6, 2026',
          sections: [
            ['Website Use', 'By using this website, you agree to use it respectfully and only for lawful purposes. Please do not submit false information, attempt to interfere with the website, or misuse any forms or links.'],
            ['Appointment Requests', 'Submitting a form does not automatically confirm an appointment. A grooming appointment is confirmed only after Grüm contacts you and confirms the service, date, time, price range, and availability.'],
            ['Pet Health And Safety', 'You agree to tell us about allergies, medical conditions, injuries, behavior concerns, matting, fleas, ticks, anxiety, age-related needs, or any special handling requirements before your pet’s visit.'],
            ['Services And Pricing', 'Service descriptions and starting prices are general information. Final recommendations and pricing may vary based on breed, size, coat condition, behavior, service time, and the work needed to groom your pet safely.'],
            ['Cancellations And Delays', 'If you need to cancel or reschedule, please contact us as soon as possible. Late arrivals may require a shorter service, a different appointment time, or rescheduling depending on the day’s schedule.'],
            ['Website Content', 'The text, layout, images, branding, and other website materials are provided for Grüm and may not be copied or reused without permission, except where allowed by law.'],
            ['Contact', 'If you have questions about these Terms & Conditions, please contact Grüm through the contact form on our website.']
          ]
        }
      }
    },
    de: {
      tabs: ['Datenschutz', 'AGB'], close: 'Schließen', aria: 'Rechtliche Dokumente', eyebrow: 'GRÜM RECHTLICHES',
      documents: {
        'privacy-policy.html': {
          title: 'DATENSCHUTZ.',
          intro: 'Wir respektieren deine Privatsphäre beim Besuch unserer Website, bei Kontaktanfragen und bei Terminwünschen.',
          updated: 'Zuletzt aktualisiert: 6. September 2026',
          sections: [
            ['Welche Informationen wir erfassen', 'Wenn du unsere Website oder das Terminformular nutzt, können wir Name, Telefonnummer, E-Mail-Adresse, Tiername, Tierdetails, Servicewünsche, Terminnotizen und Nachrichten erfassen.'],
            ['Wie wir Informationen nutzen', 'Wir nutzen deine Angaben, um Fragen zu beantworten, Termine zu planen und zu bestätigen, uns auf den Besuch vorzubereiten, Grooming-Services zu erbringen, nachzufassen und die Website zu verbessern.'],
            ['Website- und Geräteinformationen', 'Wie die meisten Websites können wir grundlegende technische Informationen wie Browsertyp, besuchte Seiten, Verweise und allgemeine Nutzung erhalten. Das hilft uns, die Funktion der Website zu prüfen.'],
            ['Weitergabe von Informationen', 'Wir verkaufen keine personenbezogenen Daten. Begrenzte Informationen können nur bei Bedarf mit vertrauenswürdigen Dienstleistern geteilt werden, die Website, Terminanfragen oder unseren Betrieb unterstützen.'],
            ['Gesundheitsdaten deines Tieres', 'Angaben zu Allergien, Gesundheit, Verhalten, Verfilzungen, Flöhen, Zecken oder besonderem Umgang nutzen wir ausschließlich für eine sicherere und angenehmere Betreuung deines Tieres.'],
            ['Deine Rechte', 'Du kannst uns kontaktieren, um Auskunft zu deinen Angaben zu erhalten, Änderungen zu verlangen oder die Löschung von Termindaten zu bitten, sobald wir sie nicht mehr für Geschäftsunterlagen benötigen.'],
            ['Kontakt', 'Bei Fragen zu dieser Datenschutzrichtlinie kontaktiere Grüm bitte über das Kontaktformular auf unserer Website.']
          ]
        },
        'terms-and-conditions.html': {
          title: 'ALLGEMEINE BEDINGUNGEN.',
          intro: 'Diese Bedingungen erklären die Nutzung der Grüm-Website und das Senden von Grooming-Terminanfragen.',
          updated: 'Zuletzt aktualisiert: 6. September 2026',
          sections: [
            ['Nutzung der Website', 'Mit der Nutzung dieser Website erklärst du dich mit einer respektvollen und rechtmäßigen Nutzung einverstanden. Bitte sende keine falschen Angaben, störe die Website nicht und missbrauche keine Formulare oder Links.'],
            ['Terminanfragen', 'Das Absenden eines Formulars bestätigt noch keinen Termin. Ein Grooming-Termin ist erst bestätigt, wenn Grüm Service, Datum, Uhrzeit, Preisrahmen und Verfügbarkeit bestätigt hat.'],
            ['Gesundheit und Sicherheit des Tieres', 'Bitte informiere uns vor dem Besuch über Allergien, Erkrankungen, Verletzungen, Verhaltensauffälligkeiten, Verfilzungen, Flöhe, Zecken, Ängste, altersbedingte Bedürfnisse oder besondere Anforderungen.'],
            ['Leistungen und Preise', 'Leistungsbeschreibungen und Startpreise sind allgemeine Angaben. Empfehlungen und Endpreise können je nach Rasse, Größe, Fellzustand, Verhalten, Dauer und notwendigem Aufwand variieren.'],
            ['Stornierungen und Verspätungen', 'Wenn du absagen oder verschieben musst, kontaktiere uns bitte so früh wie möglich. Bei Verspätung kann je nach Tagesplan ein kürzerer Service, ein anderer Termin oder eine Verschiebung nötig sein.'],
            ['Website-Inhalte', 'Texte, Layout, Bilder, Branding und weitere Website-Materialien sind für Grüm bestimmt und dürfen ohne Erlaubnis nicht kopiert oder wiederverwendet werden, soweit dies nicht gesetzlich erlaubt ist.'],
            ['Kontakt', 'Bei Fragen zu diesen Bedingungen kontaktiere Grüm bitte über das Kontaktformular auf unserer Website.']
          ]
        }
      }
    },
    es: {
      tabs: ['Privacidad', 'Términos'], close: 'Cerrar', aria: 'Documentos legales', eyebrow: 'GRÜM LEGAL',
      documents: {
        'privacy-policy.html': {
          title: 'POLÍTICA DE PRIVACIDAD.',
          intro: 'Respetamos tu privacidad cuando visitas nuestra web, contactas con nosotros o solicitas una cita para tu mascota.',
          updated: 'Última actualización: 6 de septiembre de 2026',
          sections: [
            ['Información que recopilamos', 'Al usar la web o el formulario de citas, podemos recopilar nombre, teléfono, email, nombre y detalles de la mascota, preferencias de servicio, notas de cita y mensajes.'],
            ['Cómo usamos la información', 'Usamos tus datos para responder preguntas, programar y confirmar citas, preparar la visita, prestar servicios, hacer seguimiento y mejorar la experiencia web.'],
            ['Información de web y dispositivo', 'Como muchas webs, podemos recibir información técnica básica como navegador, páginas vistas, referencias y actividad general de uso para comprobar que la web funciona correctamente.'],
            ['Compartir información', 'No vendemos información personal. Podemos compartir información limitada con proveedores de confianza que ayudan a operar la web, gestionar citas o apoyar el negocio, solo cuando sea necesario.'],
            ['Datos de salud de la mascota', 'Si nos das información sobre alergias, salud, comportamiento, nudos, pulgas, garrapatas o manejo especial, la usamos únicamente para cuidar a tu mascota de forma más segura y cómoda.'],
            ['Tus opciones', 'Puedes contactarnos para consultar tus datos, pedir una actualización o solicitar que eliminemos información de citas cuando ya no sea necesaria para nuestros registros.'],
            ['Contacto', 'Si tienes preguntas sobre esta Política de Privacidad, contacta con Grüm mediante el formulario de nuestra web.']
          ]
        },
        'terms-and-conditions.html': {
          title: 'TÉRMINOS Y CONDICIONES.',
          intro: 'Estos términos explican cómo usar la web de Grüm y enviar solicitudes de citas.',
          updated: 'Última actualización: 6 de septiembre de 2026',
          sections: [
            ['Uso de la web', 'Al usar esta web aceptas hacerlo de forma respetuosa y legal. No envíes información falsa, no interfieras con la web ni hagas un uso indebido de formularios o enlaces.'],
            ['Solicitudes de cita', 'Enviar un formulario no confirma automáticamente una cita. La cita se confirma solo cuando Grüm confirma servicio, fecha, hora, rango de precio y disponibilidad.'],
            ['Salud y seguridad de la mascota', 'Debes informarnos antes de la visita sobre alergias, enfermedades, lesiones, comportamiento, nudos, pulgas, garrapatas, ansiedad, necesidades por edad o manejo especial.'],
            ['Servicios y precios', 'Las descripciones y precios iniciales son orientativos. Las recomendaciones y precios finales pueden variar según raza, tamaño, estado del pelo, comportamiento, tiempo y trabajo necesario.'],
            ['Cancelaciones y retrasos', 'Si necesitas cancelar o cambiar la cita, avísanos lo antes posible. Llegar tarde puede requerir un servicio más corto, otra hora o reprogramar según la agenda.'],
            ['Contenido de la web', 'Los textos, diseño, imágenes, branding y demás materiales de la web pertenecen a Grüm y no pueden copiarse o reutilizarse sin permiso salvo cuando la ley lo permita.'],
            ['Contacto', 'Si tienes preguntas sobre estos Términos y Condiciones, contacta con Grüm mediante el formulario de nuestra web.']
          ]
        }
      }
    },
    ca: {
      tabs: ['Privacitat', 'Termes'], close: 'Tancar', aria: 'Documents legals', eyebrow: 'GRÜM LEGAL',
      documents: {
        'privacy-policy.html': {
          title: 'POLÍTICA DE PRIVACITAT.',
          intro: 'Respectem la teva privacitat quan visites la nostra web, contactes amb nosaltres o sol·licites una cita per a la teva mascota.',
          updated: 'Última actualització: 6 de setembre de 2026',
          sections: [
            ['Informació que recopilem', 'Quan fas servir la web o el formulari de cites, podem recopilar el teu nom, telèfon, email, nom i detalls de la mascota, preferències de servei, notes de la cita i qualsevol missatge que ens enviïs.'],
            ['Com fem servir la informació', 'Fem servir les teves dades per respondre preguntes, programar i confirmar cites, preparar la visita, prestar serveis de perruqueria, fer seguiment de la sol·licitud i millorar l’experiència web.'],
            ['Informació de la web i del dispositiu', 'Com la majoria de webs, podem rebre informació tècnica bàsica com el tipus de navegador, pàgines visitades, pàgines de referència i activitat general d’ús. Això ens ajuda a comprovar que el lloc funciona bé.'],
            ['Compartir informació', 'No venem informació personal. Podem compartir informació limitada amb proveïdors de confiança que ens ajuden a operar la web, gestionar sol·licituds de cita o donar suport al negoci, només quan sigui necessari.'],
            ['Dades de salut de la mascota', 'Si ens proporciones informació sobre al·lèrgies, salut, comportament, nusos, puces, paparres o maneig especial, la fem servir només per oferir una cura més segura i còmoda.'],
            ['Les teves opcions', 'Pots contactar amb nosaltres per consultar les dades que has enviat, demanar una actualització o sol·licitar que eliminem detalls de cites quan ja no els necessitem per als registres del negoci.'],
            ['Contacte', 'Si tens preguntes sobre aquesta Política de privacitat, contacta amb Grüm mitjançant el formulari de contacte de la nostra web.']
          ]
        },
        'terms-and-conditions.html': {
          title: 'TERMES I CONDICIONS.',
          intro: 'Aquests termes expliquen com els visitants poden fer servir la web de Grüm i enviar sol·licituds de cita.',
          updated: 'Última actualització: 6 de setembre de 2026',
          sections: [
            ['Ús de la web', 'En fer servir aquesta web, acceptes utilitzar-la de manera respectuosa i només amb finalitats legals. No enviïs informació falsa, no intentis interferir amb la web ni facis un mal ús dels formularis o enllaços.'],
            ['Sol·licituds de cita', 'Enviar un formulari no confirma automàticament una cita. La cita queda confirmada només quan Grüm contacta amb tu i confirma el servei, la data, l’hora, el rang de preu i la disponibilitat.'],
            ['Salut i seguretat de la mascota', 'Acceptes informar-nos abans de la visita sobre al·lèrgies, condicions mèdiques, lesions, comportament, nusos, puces, paparres, ansietat, necessitats per edat o qualsevol requisit especial.'],
            ['Serveis i preus', 'Les descripcions dels serveis i els preus inicials són informació general. Les recomanacions i el preu final poden variar segons la raça, mida, estat del pelatge, comportament, durada i feina necessària per cuidar la mascota amb seguretat.'],
            ['Cancel·lacions i retards', 'Si necessites cancel·lar o canviar la cita, contacta amb nosaltres tan aviat com puguis. Arribar tard pot requerir un servei més curt, una altra hora o reprogramar segons l’agenda del dia.'],
            ['Contingut de la web', 'Els textos, el disseny, les imatges, la marca i altres materials de la web pertanyen a Grüm i no es poden copiar ni reutilitzar sense permís, excepte quan la llei ho permeti.'],
            ['Contacte', 'Si tens preguntes sobre aquests Termes i condicions, contacta amb Grüm mitjançant el formulari de contacte de la nostra web.']
          ]
        }
      }
    }
  };

  const style = document.createElement('style');
  style.id = 'legal-bubble-style';
  style.textContent = `
    .legal-bubble-modal{
      width:min(570px,calc(100% - 28px))!important;
      max-height:min(720px,calc(100dvh - 28px));
      padding:18px 18px 20px!important;
      overflow:hidden;
      border-radius:28px!important;
    }
    .legal-bubble-tabs{display:flex;gap:8px;padding-right:50px;margin-bottom:14px}
    .legal-bubble-tabs button{
      flex:1;border:1px solid rgba(0,88,77,.14);border-radius:999px;background:#fff;color:#00584d;
      padding:11px 12px;font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:.15px;
    }
    .legal-bubble-tabs button.active{background:#00584d;color:#fff;border-color:#00584d}
    .legal-bubble-scroll{max-height:calc(min(720px,100dvh - 28px) - 76px);overflow:auto;padding:6px 8px 10px 4px;overscroll-behavior:contain}
    .legal-bubble-content{padding:4px 12px 8px 6px}
    .legal-bubble-content .kicker{margin-bottom:8px}
    .legal-bubble-content h2{font-size:32px!important;line-height:.96;margin:0 44px 10px 0;color:#232121}
    .legal-bubble-intro{margin:0 0 14px;font-size:12px;line-height:1.55;color:#3f3935}
    .legal-bubble-updated{margin:0 0 22px;color:#f17080;font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.55px}
    .legal-bubble-section{padding:0 0 16px;margin:0 0 16px;border-bottom:1px solid rgba(0,88,77,.10)}
    .legal-bubble-section:last-child{border-bottom:0;margin-bottom:0}
    .legal-bubble-section h3{margin:0 0 7px;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.25;font-weight:900;letter-spacing:.1px;color:#00584d;text-transform:uppercase}
    .legal-bubble-section p{margin:0;font-size:11px;line-height:1.58;color:#443e3a}
    @media(max-width:560px){
      .legal-bubble-modal{width:calc(100% - 20px)!important;max-height:calc(100dvh - 20px);padding:14px!important;border-radius:23px!important}
      .legal-bubble-tabs{gap:6px;padding-right:46px;margin-bottom:10px}
      .legal-bubble-tabs button{padding:10px 7px;font-size:8.5px}
      .legal-bubble-scroll{max-height:calc(100dvh - 88px);padding-right:3px}
      .legal-bubble-content{padding:3px 7px 8px 3px}
      .legal-bubble-content h2{font-size:27px!important;margin-right:35px}
      .legal-bubble-intro{font-size:11px}
      .legal-bubble-section p{font-size:10.5px}
    }
  `;
  document.head.appendChild(style);

  const dialog = document.createElement('dialog');
  dialog.className = 'modal legal-bubble-modal';
  dialog.id = 'legalModal';
  dialog.innerHTML = `
    <button class="modal-close" type="button" data-close-legal aria-label="Close">×</button>
    <div class="legal-bubble-tabs" role="tablist" aria-label="Legal documents">
      <button type="button" role="tab" data-legal-page="privacy-policy.html">Privacy</button>
      <button type="button" role="tab" data-legal-page="terms-and-conditions.html">Terms</button>
    </div>
    <div class="legal-bubble-scroll"><div class="legal-bubble-content"></div></div>
  `;
  document.body.appendChild(dialog);

  const content = dialog.querySelector('.legal-bubble-content');
  const scroll = dialog.querySelector('.legal-bubble-scroll');
  const tabList = dialog.querySelector('.legal-bubble-tabs');
  const tabs = [...dialog.querySelectorAll('[data-legal-page]')];
  const closeButton = dialog.querySelector('[data-close-legal]');
  let activePage = 'privacy-policy.html';

  const getLanguage = () => {
    const lang = document.documentElement.lang || localStorage.getItem('grum-language') || 'en';
    return Object.hasOwn(legalCopy, lang) ? lang : 'en';
  };

  const renderLegal = page => {
    const pack = legalCopy[getLanguage()];
    const copy = pack.documents[page];
    if (!copy) return;
    activePage = page;
    tabs.forEach((tab, index) => {
      const active = tab.dataset.legalPage === page;
      tab.textContent = pack.tabs[index];
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    tabList.setAttribute('aria-label', pack.aria);
    closeButton.setAttribute('aria-label', pack.close);
    content.innerHTML = `
      <p class="kicker">${pack.eyebrow}</p>
      <h2>${copy.title}</h2>
      <p class="legal-bubble-intro">${copy.intro}</p>
      <p class="legal-bubble-updated">${copy.updated}</p>
      ${copy.sections.map(([heading, body]) => `<section class="legal-bubble-section"><h3>${heading}</h3><p>${body}</p></section>`).join('')}
    `;
    scroll.scrollTop = 0;
  };

  const openLegal = page => {
    renderLegal(page);
    if (!dialog.open) dialog.showModal();
    document.body.classList.add('modal-open');
  };

  document.addEventListener('click', event => {
    const link = event.target.closest('.legal-links a');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    const page = href.endsWith('privacy-policy.html') ? 'privacy-policy.html' : href.endsWith('terms-and-conditions.html') ? 'terms-and-conditions.html' : '';
    if (!page) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    openLegal(page);
  }, true);

  tabs.forEach(tab => tab.addEventListener('click', () => renderLegal(tab.dataset.legalPage)));
  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));

  document.querySelector('.language-switcher')?.addEventListener('click', event => {
    if (!event.target.closest('button[data-lang]')) return;
    window.setTimeout(() => {
      if (dialog.open) renderLegal(activePage);
    }, 0);
  });
})();
