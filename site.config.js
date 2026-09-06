/* Edit this file to update site copy, images, links, colors, or section order. */
window.SITE_CONFIG = {
  business: {
    name: 'grüm',
    title: 'Grüm — Dog Grooming',
    description: 'Grüm dog grooming — tailored grooming, bathing and coat care.',
    instagramUrl: 'https://www.instagram.com/',
  },

  theme: {
    cream: '#f3ebe7',
    surface: '#f3ebe7',
    experience: '#e8ddd6',
    final: '#f3ece8',
    green: '#01463c',
    greenDark: '#01463c',
    pink: '#f87686',
    pinkSoft: '#f7a7b1',
    ink: '#222121',
    orange: '#f26312',
  },

  layout: {
    sectionOrder: ['hero', 'services', 'experience', 'gallery', 'final-cta'],
  },

  navigation: [
    { label: 'HOME', target: 'index.html' },
    { label: 'ABOUT', target: 'about.html' },
    { label: 'SERVICES', target: 'services.html' },
    { label: 'GALLERY', target: 'gallery.html' },
    { label: 'BLOG', target: 'blog.html' },
    { label: 'CONTACT', target: 'contact.html' },
  ],

  hero: {
    headlineHtml: '<img class="hero-headline-img" src="assets/hero-headline-tailored-hd.png" alt="Tailored grooming for distinguished pets" />',
    subtitle: 'Luxury care. Happy tails.',
    primaryButton: 'BOOK APPOINTMENT',
    secondaryButton: 'WATCH VIDEO',
    image: 'assets/hero-clean.png',
    imageAlt: 'Golden retriever being washed with bubbles',
    chipTitle: 'ONE-ON-ONE CARE',
    chipTextHtml: 'Each pet enjoys our<br>undivided attention.',
  },

  services: {
    kicker: 'OUR SERVICES',
    headingHtml: 'DOG GROOMING,<br><span>BATHING &amp; COAT CARE</span>',
    introHtml: 'From refreshing baths to complete makeovers,<br>we provide exceptional care tailored to<br>your pet’s unique needs.',
    linkLabel: 'VIEW ALL SERVICES',
    cards: [
      { number: '01', title: 'BATH & BRUSH', descriptionHtml: 'A relaxing bath, gentle cleanse<br>and thorough brushing for a<br>fresh, healthy coat.', image: 'assets/service-bath.jpg', imageAlt: 'White dog wrapped in a towel', style: 'green' },
      { number: '02', title: 'HAIRCUT & STYLING', descriptionHtml: 'Custom haircuts and styling<br>designed to bring out your pet’s<br>best look.', image: 'assets/service-hair.jpg', imageAlt: 'Fluffy pomeranian dog', style: 'black', featured: true },
      { number: '03', title: 'NAIL CLIPPING', descriptionHtml: 'Safe, precise nail trimming<br>to keep your pet comfortable<br>and confident.', image: 'assets/service-nails.jpg', imageAlt: 'Small dog having nails clipped', style: 'orange' },
      { number: '04', title: 'TEETH CLEANING', descriptionHtml: 'Gentle oral care for fresher<br>breath and a happier,<br>healthier smile.', image: 'assets/service-teeth-cleaning.png', imageAlt: 'Smiling white dog ready for teeth cleaning', style: 'green' },
      { number: '05', title: 'DE-SHEDDING', descriptionHtml: 'A deep coat treatment to<br>remove loose fur and leave<br>your pet feeling lighter.', image: 'assets/ig-4.jpg', imageAlt: 'Golden retriever during a bath', style: 'black', featured: true },
      { number: '06', title: 'PUPPY INTRO', descriptionHtml: 'A calm first visit designed<br>to build trust and make<br>grooming feel easy.', image: 'assets/ig-5.jpg', imageAlt: 'Freshly groomed puppy', style: 'orange' },
    ],
    details: {
      'BATH & BRUSH': {
        lead: 'A gentle reset for a clean coat, fresh scent, and softer brush-out.',
        includes: ['Warm bath with coat-safe shampoo', 'Conditioning rinse', 'Blow dry', 'Full brush-out', 'Light finishing spray'],
        pricing: [['Small dogs', '$35+'], ['Medium dogs', '$45+'], ['Large dogs', '$60+']]
      },
      'HAIRCUT & STYLING': {
        lead: 'A full grooming appointment shaped around your dog’s coat, comfort, and style.',
        includes: ['Bath and blow dry', 'Breed or custom haircut', 'Face, feet, and sanitary trim', 'Brush-out and styling finish', 'Nail check'],
        pricing: [['Small dogs', '$55+'], ['Medium dogs', '$70+'], ['Large dogs', '$90+']]
      },
      'NAIL CLIPPING': {
        lead: 'Quick, careful nail care to keep paws comfortable and movement easy.',
        includes: ['Nail trim', 'Gentle paw handling', 'Optional file/smoothing when needed', 'Quick comfort check'],
        pricing: [['All small dogs', '$15+'], ['Medium dogs', '$18+'], ['Large dogs', '$22+']]
      },
      'TEETH CLEANING': {
        lead: 'A light oral-care add-on for fresher breath and a brighter smile.',
        includes: ['Gentle tooth brushing', 'Pet-safe oral care products', 'Breath refresh', 'Visual mouth comfort check'],
        pricing: [['All sizes', '$20+'], ['With grooming service', '$15+']]
      },
      'EAR CLEANING': {
        lead: 'A calm ear clean that helps keep ears fresh and irritation-free.',
        includes: ['Outer-ear cleaning', 'Pet-safe cleaner', 'Gentle wipe-out', 'Comfort check before finishing'],
        pricing: [['All sizes', '$15+'], ['With grooming service', '$12+']]
      },
      'DE-SHEDDING TREATMENT': {
        lead: 'A deeper coat service for loose undercoat, seasonal shedding, and a cleaner home.',
        includes: ['De-shedding shampoo', 'Conditioning treatment', 'High-velocity dry', 'Undercoat brush-out', 'Finishing comb-through'],
        pricing: [['Small dogs', '$40+'], ['Medium dogs', '$55+'], ['Large dogs', '$75+']]
      }
    },
  },

  experience: {
    kicker: 'THE GRÜM EXPERIENCE',
    headingHtml: 'MORE THAN A GROOM.<br>IT’S A MOMENT OF <span>CARE.</span>',
    button: 'LEARN MORE ABOUT US',
    image: 'assets/experience-banner.jpg',
    imageAlt: 'Golden retriever enjoying a grooming treatment',
  },

  gallery: {
    kicker: 'FOLLOW OUR JOURNEY!',
    heading: 'ON INSTAGRAM',
    linkLabel: 'VIEW MORE ON INSTAGRAM',
    phoneImage: 'assets/instagram-phone.png',
    phoneAlt: 'Grüm Instagram profile on a phone',
    images: [
      { src: 'assets/ig-1.jpg', alt: 'Dog grooming Instagram post' },
      { src: 'assets/ig-2.jpg', alt: 'Dog grooming Instagram post' },
      { src: 'assets/ig-3.jpg', alt: 'Grüm grooming products' },
      { src: 'assets/ig-4.jpg', alt: 'Golden retriever bathing' },
      { src: 'assets/ig-5.jpg', alt: 'Groomed poodle' },
      { src: 'assets/ig-6.jpg', alt: 'Grüm grooming studio' },
    ],
  },

  finalCta: {
    kicker: 'READY FOR THEIR',
    heading: 'BEST DAY EVER?',
    body: 'We can’t wait to meet your best friend.',
    button: 'BOOK APPOINTMENT',
    buttonSmall: 'CLICK TO BOOK',
    image: 'assets/footer-dog-cutout.png',
    imageAlt: 'Happy golden retriever',
  },

  legal: [
    { label: 'Privacy Policy', target: 'privacy-policy.html' },
    { label: 'Terms & Conditions', target: 'terms-and-conditions.html' },
  ],

  booking: {
    kicker: 'BOOK THEIR BEST DAY',
    heading: 'REQUEST AN APPOINTMENT.',
    submitLabel: 'REQUEST APPOINTMENT',
    // Full list for the booking modal's dropdown (shared across every page).
    // Kept separate from services.cards below, which is only the homepage's
    // 3 featured cards — that section's layout is pixel-fixed for exactly 3.
    serviceOptions: ['BATH & BRUSH', 'HAIRCUT & STYLING', 'NAIL CLIPPING', 'TEETH CLEANING', 'EAR CLEANING', 'DE-SHEDDING TREATMENT'],
  },
};
