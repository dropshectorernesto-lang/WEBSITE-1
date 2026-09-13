(() => {
  const frame = document.getElementById('customer-demo');
  if (!frame) return;

  const BLOG = {
    de: {
      'HOW OFTEN SHOULD YOU ACTUALLY BATHE YOUR DOG?': ['GROOMING-BASICS','WIE OFT SOLLTE MAN EINEN HUND WIRKLICH BADEN?','Wie oft ein Hund gebadet werden sollte, hängt von Felltyp, Haut, Aktivität und Alltag ab — ein fester Monatsrhythmus passt nicht für jeden Hund.'],
      'BRUSHING BETWEEN VISITS: A 5-MINUTE ROUTINE THAT WORKS': ['FELLPFLEGE','BÜRSTEN ZWISCHEN TERMINEN: EINE 5-MINUTEN-ROUTINE, DIE FUNKTIONIERT','Eine kurze, regelmäßige Bürstenroutine hilft gegen Verfilzungen und lose Haare und macht den nächsten Pflegetermin angenehmer.'],
      "SIGNS YOUR DOG'S NAILS ARE OVERDUE FOR A TRIM": ['KRALLEN & PFOTEN','ANZEICHEN, DASS DIE KRALLEN DEINES HUNDES GESCHNITTEN WERDEN SOLLTEN','Klicken auf harten Böden, lange oder gebogene Krallen und verändertes Laufen sind typische Zeichen, dass ein Krallenschnitt fällig ist.'],
      "WHAT TO EXPECT AT YOUR DOG'S FIRST GRÜM APPOINTMENT": ['ERSTER BESUCH','WAS DICH BEIM ERSTEN GRÜM-TERMIN DEINES HUNDES ERWARTET','So läuft der erste Pflegetermin ab — vom kurzen Check-in bis zur ruhigen, individuellen Betreuung und den Empfehlungen für zu Hause.']
    },
    es: {
      'HOW OFTEN SHOULD YOU ACTUALLY BATHE YOUR DOG?': ['BÁSICOS DE PELUQUERÍA','¿CADA CUÁNTO DEBERÍAS BAÑAR REALMENTE A TU PERRO?','La frecuencia ideal del baño depende del tipo de pelo, la piel, la actividad y el día a día de tu perro; una vez al mes no sirve para todos.'],
      'BRUSHING BETWEEN VISITS: A 5-MINUTE ROUTINE THAT WORKS': ['CUIDADO DEL PELO','CEPILLADO ENTRE VISITAS: UNA RUTINA DE 5 MINUTOS QUE FUNCIONA','Una rutina corta y constante ayuda a prevenir nudos, reducir la muda y hacer que la siguiente cita de peluquería sea más cómoda.'],
      "SIGNS YOUR DOG'S NAILS ARE OVERDUE FOR A TRIM": ['UÑAS & PATAS','SEÑALES DE QUE TU PERRO NECESITA UN CORTE DE UÑAS','Los clics al caminar, las uñas largas o curvadas y los cambios al apoyar las patas son señales de que toca recortarlas.'],
      "WHAT TO EXPECT AT YOUR DOG'S FIRST GRÜM APPOINTMENT": ['PRIMERA VISITA','QUÉ ESPERAR EN LA PRIMERA CITA DE TU PERRO EN GRÜM','Así funciona una primera cita profesional: breve revisión inicial, cuidado al ritmo de tu perro y recomendaciones para mantener el pelo en casa.']
    },
    ca: {
      'HOW OFTEN SHOULD YOU ACTUALLY BATHE YOUR DOG?': ['BÀSICS DE PERRUQUERIA','CADA QUANT HAURIES DE BANYAR REALMENT EL TEU GOS?','La freqüència ideal del bany depèn del tipus de pelatge, la pell, l’activitat i el dia a dia del teu gos; un cop al mes no serveix per a tothom.'],
      'BRUSHING BETWEEN VISITS: A 5-MINUTE ROUTINE THAT WORKS': ['CURA DEL PELATGE','RASPALLAT ENTRE VISITES: UNA RUTINA DE 5 MINUTS QUE FUNCIONA','Una rutina curta i constant ajuda a prevenir nusos, reduir la muda i fer que la següent cita de perruqueria sigui més còmoda.'],
      "SIGNS YOUR DOG'S NAILS ARE OVERDUE FOR A TRIM": ['UNGLES & POTES','SENYALS QUE EL TEU GOS NECESSITA UN TALL D’UNGLES','Els clics en caminar, les ungles llargues o corbades i els canvis en la manera de recolzar les potes indiquen que toca retallar-les.'],
      "WHAT TO EXPECT AT YOUR DOG'S FIRST GRÜM APPOINTMENT": ['PRIMERA VISITA','QUÈ ESPERAR A LA PRIMERA CITA DEL TEU GOS A GRÜM','Així funciona una primera cita professional: una breu revisió inicial, cura al ritme del teu gos i recomanacions per mantenir el pelatge a casa.']
    }
  };

  const applyBlogPreviewLocale = (doc) => {
    if (!doc?.documentElement) return;
    const lang = (doc.documentElement.lang || 'en').toLowerCase();
    doc.querySelectorAll('.blog-post').forEach((post) => {
      const key = post.dataset.blogTitle || '';
      const category = post.querySelector('.blog-date');
      const title = post.querySelector('.blog-post-body > h3');
      const preview = post.querySelector('.blog-post-body > h3 + p');
      if (!post.dataset.previewCategory && category) post.dataset.previewCategory = category.textContent;
      if (!post.dataset.previewTitle && title) post.dataset.previewTitle = key || title.textContent;
      if (!post.dataset.previewText && preview) post.dataset.previewText = preview.textContent;
      const translated = BLOG[lang]?.[key];
      if (category) category.textContent = translated?.[0] || post.dataset.previewCategory || category.textContent;
      if (title) title.textContent = translated?.[1] || post.dataset.previewTitle || title.textContent;
      if (preview) preview.textContent = translated?.[2] || post.dataset.previewText || preview.textContent;
    });
  };

  const bind = () => {
    try {
      const doc = frame.contentDocument;
      if (!doc?.documentElement) return;
      applyBlogPreviewLocale(doc);
      if (!doc.documentElement.dataset.demoBlogLocaleBound) {
        doc.documentElement.dataset.demoBlogLocaleBound = '1';
        new doc.defaultView.MutationObserver(() => {
          doc.defaultView.setTimeout(() => applyBlogPreviewLocale(doc), 0);
        }).observe(doc.documentElement, { attributes:true, attributeFilter:['lang'] });
      }
    } catch (_) {}
  };

  frame.addEventListener('load', bind);
})();
