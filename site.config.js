/*
  ============================================================
  CUSTOMER CONFIG — THIS IS THE MAIN FILE TO EDIT FOR EACH SITE
  ============================================================

  For a new customer:
  1. Duplicate this repository.
  2. Replace the images in /assets.
  3. Edit the values below.
  4. Change theme colors if needed.

  Layout/spacing live in styles.css.
  Page sections live in index.html and are clearly marked with data-section.
*/

window.SITE_CONFIG = {
  business: {
    name: "grüm",
    title: "Grüm — Dog Grooming",
    description: "Grüm dog grooming — tailored grooming, bathing and coat care.",
    instagramUrl: "https://www.instagram.com/"
  },

  theme: {
    cream: "#f0e7df",
    surface: "#f3ebe7",
    experience: "#e7ddd5",
    final: "#f1e9e4",
    green: "#005e51",
    greenDark: "#00463d",
    pink: "#f47b89",
    pinkSoft: "#f7a7b1",
    ink: "#232121",
    orange: "#f16211"
  },

  navigation: [
    { label: "HOME", target: "#home" },
    { label: "ABOUT", target: "#experience" },
    { label: "SERVICES", target: "#services" },
    { label: "GALLERY", target: "#gallery" },
    { label: "BLOG", target: "#gallery" },
    { label: "CONTACT", target: "#contact" }
  ],

  hero: {
    headlineHtml: '<span class="green">TAILORED<br>GROOMING</span><br>FOR<br>DISTINGUISHED<br>PETS<span class="dot">.</span>',
    subtitle: "Luxury care. Happy tails.",
    primaryButton: "BOOK APPOINTMENT",
    secondaryButton: "WATCH VIDEO",
    image: "assets/hero-dog.jpg",
    imageAlt: "Golden retriever being washed with bubbles",
    chipTitle: "ONE-ON-ONE CARE",
    chipTextHtml: "Each pet enjoys our<br>undivided attention."
  },

  services: {
    kicker: "OUR SERVICES",
    headingHtml: 'DOG GROOMING,<br><span>BATHING &amp; COAT CARE</span>',
    introHtml: "From refreshing baths to complete makeovers,<br>we provide exceptional care tailored to<br>your pet’s unique needs.",
    linkLabel: "VIEW ALL SERVICES",
    cards: [
      {
        number: "01",
        title: "BATH & BRUSH",
        descriptionHtml: "A relaxing bath, gentle cleanse<br>and thorough brushing for a<br>fresh, healthy coat.",
        image: "assets/service-bath.jpg",
        imageAlt: "White dog wrapped in a towel",
        style: "green"
      },
      {
        number: "02",
        title: "HAIRCUT & STYLING",
        descriptionHtml: "Custom haircuts and styling<br>designed to bring out your pet’s<br>best look.",
        image: "assets/service-hair.jpg",
        imageAlt: "Fluffy pomeranian dog",
        style: "black",
        featured: true
      },
      {
        number: "03",
        title: "NAIL CLIPPING",
        descriptionHtml: "Safe, precise nail trimming<br>to keep your pet comfortable<br>and confident.",
        image: "assets/service-nails.jpg",
        imageAlt: "Small dog having nails clipped",
        style: "orange"
      }
    ]
  },

  experience: {
    kicker: "THE GRÜM EXPERIENCE",
    headingHtml: 'MORE THAN A GROOM.<br>IT’S A MOMENT OF <span>CARE.</span>',
    button: "LEARN MORE ABOUT US",
    image: "assets/experience.jpg",
    imageAlt: "Golden retriever enjoying a grooming treatment"
  },

  gallery: {
    kicker: "FOLLOW OUR JOURNEY!",
    heading: "ON INSTAGRAM",
    linkLabel: "VIEW MORE ON INSTAGRAM",
    phoneImage: "assets/phone.jpg",
    phoneAlt: "Grüm Instagram profile on a phone",
    images: [
      { src: "assets/ig-1.jpg", alt: "Dog grooming Instagram post" },
      { src: "assets/ig-2.jpg", alt: "Dog grooming Instagram post" },
      { src: "assets/ig-3.jpg", alt: "Grüm grooming products" },
      { src: "assets/ig-4.jpg", alt: "Golden retriever bathing" },
      { src: "assets/ig-5.jpg", alt: "Groomed poodle" },
      { src: "assets/ig-6.jpg", alt: "Grüm grooming studio" }
    ]
  },

  finalCta: {
    kicker: "READY FOR THEIR",
    heading: "BEST DAY EVER?",
    body: "We can’t wait to meet your best friend.",
    button: "BOOK APPOINTMENT",
    buttonSmall: "CLICK TO BOOK",
    image: "assets/bottom-dog.jpg",
    imageAlt: "Happy golden retriever"
  },

  booking: {
    kicker: "BOOK THEIR BEST DAY",
    heading: "REQUEST AN APPOINTMENT.",
    submitLabel: "REQUEST APPOINTMENT"
  }
};
