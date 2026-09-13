(() => {
  const frame = document.getElementById('customer-demo');
  if (!frame) return;

  const parts = location.pathname.split('/').filter(Boolean);
  const demosIndex = parts.indexOf('demos');
  const slug = demosIndex >= 0 ? parts[demosIndex + 1] : '';
  const mode = document.body?.dataset.demoMode || (parts.includes('web-ipad') ? 'web-ipad' : parts.includes('web') ? 'web' : 'mobile');

  const COPY = {
    en: {
      email: 'Email', time: 'Available time', chooseTime: 'Choose a time', loading: 'Loading times…',
      success: 'Request received — the salon will contact you to confirm the appointment time.',
      error: 'Something went wrong. Please try again or contact the salon directly.',
      demo: 'Demo request received. Connect the secure booking backend to send salon notifications and calendar events.'
    },
    de: {
      email: 'E-Mail', time: 'Verfügbare Uhrzeit', chooseTime: 'Uhrzeit wählen', loading: 'Zeiten werden geladen…',
      success: 'Anfrage erhalten — der Salon meldet sich, um die genaue Uhrzeit zu bestätigen.',
      error: 'Etwas ist schiefgelaufen. Bitte versuche es erneut oder kontaktiere den Salon direkt.',
      demo: 'Demo-Anfrage erhalten. Verbinde das sichere Buchungs-Backend, um Benachrichtigungen und Kalendereinträge zu senden.'
    },
    es: {
      email: 'Email', time: 'Hora disponible', chooseTime: 'Elegir hora', loading: 'Cargando horas…',
      success: 'Solicitud recibida — el salón se pondrá en contacto contigo para confirmar la hora.',
      error: 'Ha ocurrido un error. Inténtalo de nuevo o contacta directamente con el salón.',
      demo: 'Solicitud de demostración recibida. Conecta el backend seguro para enviar avisos y eventos de calendario.'
    },
    ca: {
      email: 'Email', time: 'Hora disponible', chooseTime: 'Tria una hora', loading: 'Carregant hores…',
      success: 'Sol·licitud rebuda — el saló es posarà en contacte amb tu per confirmar l’hora.',
      error: 'Hi ha hagut un error. Torna-ho a provar o contacta directament amb el saló.',
      demo: 'Sol·licitud de demostració rebuda. Connecta el backend segur per enviar avisos i esdeveniments de calendari.'
    }
  };

  const clampTier = (value) => Math.max(1, Math.min(3, Number(value) || 1));
  const customerConfig = () => {
    const booking = window.DEMO_CUSTOMER?.booking || {};
    return {
      tier: clampTier(booking.tier),
      enabled: booking.enabled === true,
      apiBase: typeof booking.apiBase === 'string' ? booking.apiBase.replace(/\/$/, '') : '',
      submitPath: booking.submitPath || '/api/bookings',
      availabilityPath: booking.availabilityPath || '/api/availability'
    };
  };

  const langOf = (doc) => {
    const lang = (doc?.documentElement?.lang || 'en').toLowerCase();
    return ['en','de','es','ca'].includes(lang) ? lang : 'en';
  };

  const apiUrl = (base, path) => {
    if (!base) return path;
    return `${base}${path.startsWith('/') ? path : `/${path}`}`;
  };

  const ensureStatus = (doc, form) => {
    let status = form.querySelector('[data-booking-status]');
    if (!status) {
      status = doc.createElement('p');
      status.dataset.bookingStatus = '1';
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
      status.style.cssText = 'margin:.8rem 0 0;font-size:.92rem;line-height:1.35;min-height:1.25em;';
      form.appendChild(status);
    }
    return status;
  };

  const setStatus = (status, message, type = 'info') => {
    if (!status) return;
    status.textContent = message || '';
    status.dataset.state = type;
    status.style.color = type === 'error' ? '#9f1c1c' : '';
  };

  const ensureEmailField = (doc, form, tier) => {
    const grid = form.querySelector('.form-grid');
    if (!grid) return;
    let label = grid.querySelector('[data-booking-email]');
    if (tier < 2) {
      label?.remove();
      return;
    }
    if (!label) {
      label = doc.createElement('label');
      label.dataset.bookingEmail = '1';
      label.innerHTML = '<span data-booking-email-label>Email</span><input type="email" name="email" autocomplete="email" />';
      const phone = grid.querySelector('input[name="phone"]')?.closest('label');
      if (phone?.nextSibling) grid.insertBefore(label, phone.nextSibling);
      else grid.appendChild(label);
    }
    const text = COPY[langOf(doc)];
    const span = label.querySelector('[data-booking-email-label]');
    if (span) span.textContent = text.email;
  };

  const ensureTimeField = (doc, form, cfg) => {
    const grid = form.querySelector('.form-grid');
    if (!grid) return null;
    let label = grid.querySelector('[data-booking-time]');
    if (cfg.tier < 3) {
      label?.remove();
      return null;
    }
    if (!label) {
      label = doc.createElement('label');
      label.dataset.bookingTime = '1';
      label.innerHTML = '<span data-booking-time-label>Available time</span><select name="time" data-booking-time-select required><option value="">Choose a time</option></select>';
      const date = grid.querySelector('input[name="date"]')?.closest('label');
      if (date?.nextSibling) grid.insertBefore(label, date.nextSibling);
      else grid.appendChild(label);
    }
    const text = COPY[langOf(doc)];
    const span = label.querySelector('[data-booking-time-label]');
    const select = label.querySelector('[data-booking-time-select]');
    if (span) span.textContent = text.time;
    if (select && !select.value && select.options[0]) select.options[0].textContent = text.chooseTime;
    return select;
  };

  const normalizeSlots = (payload) => {
    const raw = Array.isArray(payload?.slots) ? payload.slots : [];
    return raw.map((slot) => {
      if (typeof slot === 'string') return { value:slot, label:slot };
      const value = slot?.value || slot?.start || slot?.time;
      if (!value) return null;
      return { value:String(value), label:String(slot.label || slot.time || slot.start || value) };
    }).filter(Boolean);
  };

  const loadAvailability = async (doc, form, cfg, select) => {
    if (!select || cfg.tier < 3) return;
    const date = form.elements.date?.value;
    const service = form.elements.service?.value;
    const text = COPY[langOf(doc)];
    select.innerHTML = `<option value="">${text.loading}</option>`;
    select.disabled = true;
    if (!date || !cfg.enabled) {
      select.innerHTML = `<option value="">${text.chooseTime}</option>`;
      return;
    }
    try {
      const response = await fetch(apiUrl(cfg.apiBase, cfg.availabilityPath), {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({ businessSlug:slug, date, service, locale:langOf(doc) })
      });
      if (!response.ok) throw new Error('availability_failed');
      const slots = normalizeSlots(await response.json());
      select.innerHTML = `<option value="">${text.chooseTime}</option>${slots.map((slot) => `<option value="${slot.value.replace(/"/g,'&quot;')}">${slot.label}</option>`).join('')}`;
      select.disabled = slots.length === 0;
    } catch (_) {
      select.innerHTML = `<option value="">${text.chooseTime}</option>`;
      select.disabled = true;
    }
  };

  const buildPayload = (doc, form, cfg) => ({
    businessSlug: slug,
    businessName: window.DEMO_CUSTOMER?.name || slug,
    tier: cfg.tier,
    locale: langOf(doc),
    mode,
    sourceUrl: location.href,
    name: String(form.elements.name?.value || '').trim(),
    petName: String(form.elements.dog?.value || form.elements.pet?.value || '').trim(),
    phone: String(form.elements.phone?.value || '').trim(),
    email: String(form.elements.email?.value || '').trim(),
    service: String(form.elements.service?.value || '').trim(),
    date: String(form.elements.date?.value || '').trim(),
    time: cfg.tier >= 3 ? String(form.elements.time?.value || '').trim() : '',
    notes: String(form.elements.notes?.value || '').trim(),
    website: ''
  });

  const bind = () => {
    try {
      const doc = frame.contentDocument;
      if (!doc?.documentElement) return;
      const form = doc.getElementById('bookingForm');
      if (!form) return;
      const cfg = customerConfig();
      const text = COPY[langOf(doc)];
      const status = ensureStatus(doc, form);
      ensureEmailField(doc, form, cfg.tier);
      const timeSelect = ensureTimeField(doc, form, cfg);
      const dateInput = form.elements.date;
      if (dateInput) {
        dateInput.required = true;
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        dateInput.min = `${yyyy}-${mm}-${dd}`;
      }

      if (timeSelect && !form.dataset.bookingAvailabilityBound) {
        form.dataset.bookingAvailabilityBound = '1';
        const refresh = () => loadAvailability(doc, form, customerConfig(), timeSelect);
        form.elements.date?.addEventListener('change', refresh);
        form.elements.service?.addEventListener('change', refresh);
      }

      if (!form.dataset.bookingSubmitBound) {
        form.dataset.bookingSubmitBound = '1';
        form.addEventListener('submit', async (event) => {
          if (event.submitter?.value === 'cancel') return;
          event.preventDefault();
          event.stopImmediatePropagation();
          if (!form.reportValidity()) return;

          const currentCfg = customerConfig();
          const currentText = COPY[langOf(doc)];
          const submit = event.submitter || form.querySelector('.submit');
          if (submit) submit.disabled = true;
          setStatus(status, '', 'info');

          try {
            if (!currentCfg.enabled) {
              setStatus(status, currentText.demo, 'info');
              form.reset();
              return;
            }

            const response = await fetch(apiUrl(currentCfg.apiBase, currentCfg.submitPath), {
              method:'POST',
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify(buildPayload(doc, form, currentCfg))
            });
            if (!response.ok) throw new Error('booking_failed');
            setStatus(status, currentText.success, 'success');
            form.reset();
          } catch (_) {
            setStatus(status, currentText.error, 'error');
          } finally {
            if (submit) submit.disabled = false;
          }
        }, true);
      }

      if (!doc.documentElement.dataset.bookingLocaleBound) {
        doc.documentElement.dataset.bookingLocaleBound = '1';
        new doc.defaultView.MutationObserver(() => doc.defaultView.setTimeout(bind, 0))
          .observe(doc.documentElement, { attributes:true, attributeFilter:['lang'] });
      }

      // Tier 3 can preview its time field immediately; live slots only load when backend is enabled.
      if (timeSelect) loadAvailability(doc, form, cfg, timeSelect);
    } catch (_) {}
  };

  frame.addEventListener('load', bind);
  try {
    if (frame.contentDocument?.readyState === 'complete' || frame.contentDocument?.readyState === 'interactive') bind();
  } catch (_) {}

  window.DEMO_BOOKING = {
    slug,
    mode,
    getConfig: customerConfig,
    refresh: bind
  };
})();