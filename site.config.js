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
    headlineHtml: '<span class="green">TAILORED<br>GROOMING</span><br>FOR<br>DISTINGUISHED<br>PETS<span class="dot">.</span>',
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
      { number: '04', title: 'TEETH CLEANING', descriptionHtml: 'Gentle oral care for fresher<br>breath and a happier,<br>healthier smile.', image: 'assets/ig-1.jpg', imageAlt: 'Happy dog after grooming', style: 'green' },
      { number: '05', title: 'DE-SHEDDING', descriptionHtml: 'A deep coat treatment to<br>remove loose fur and leave<br>your pet feeling lighter.', image: 'assets/ig-4.jpg', imageAlt: 'Golden retriever during a bath', style: 'black', featured: true },
      { number: '06', title: 'PUPPY INTRO', descriptionHtml: 'A calm first visit designed<br>to build trust and make<br>grooming feel easy.', image: 'assets/ig-5.jpg', imageAlt: 'Freshly groomed puppy', style: 'orange' },
    ],
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
    phoneImage: 'assets/phone.jpg',
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
    image: 'assets/bottom-dog.jpg',
    imageAlt: 'Happy golden retriever',
  },

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
