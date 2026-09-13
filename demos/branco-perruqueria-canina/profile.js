/*
  FUTURE CUSTOMER PROFILE TEMPLATE
  Replace placeholder values only. Keep the object shape and all language keys.
  Use null for unverified optional email/social values.
*/
window.DEMO_CUSTOMER = {
  name: '__BUSINESS_NAME__',
  phoneDisplay: '__PHONE_DISPLAY__',
  phoneHref: 'tel:__PHONE_DIGITS_ONLY__',
  email: null,
  social: null,

  addressLine1: '__ADDRESS_LINE_1__',
  addressLine2: '__ADDRESS_LINE_2__',
  mapsUrl: '__GOOGLE_MAPS_SHORT_OR_FULL_URL__',
  mapEmbed: 'https://www.google.com/maps?q=__URL_ENCODED_BUSINESS_NAME_AND_ADDRESS__&output=embed',

  rating: '__RATING__',
  reviewCount: '__REVIEW_COUNT__',

  seo: {
    en: { title: '__EN_SEO_TITLE__', description: '__EN_SEO_DESCRIPTION__' },
    de: { title: '__DE_SEO_TITLE__', description: '__DE_SEO_DESCRIPTION__' },
    es: { title: '__ES_SEO_TITLE__', description: '__ES_SEO_DESCRIPTION__' },
    ca: { title: '__CA_SEO_TITLE__', description: '__CA_SEO_DESCRIPTION__' }
  },

  copy: {
    en: {
      hours: '__EN_HOURS_HTML__',
      aboutHero: '__EN_ABOUT_HERO__',
      story1: '__EN_STORY_1__',
      story2: '__EN_STORY_2__',
      values: [
        ['__EN_VALUE_1_TITLE__', '__EN_VALUE_1_TEXT__'],
        ['__EN_VALUE_2_TITLE__', '__EN_VALUE_2_TEXT__'],
        ['__EN_VALUE_3_TITLE__', '__EN_VALUE_3_TEXT__'],
        ['__EN_VALUE_4_TITLE__', '__EN_VALUE_4_TEXT__']
      ],
      reviews: [
        ['__REVIEWER_1__', '__EN_REVIEW_1_PARAPHRASE__'],
        ['__REVIEWER_2__', '__EN_REVIEW_2_PARAPHRASE__'],
        ['__REVIEWER_3__', '__EN_REVIEW_3_PARAPHRASE__']
      ]
    },

    de: {
      hours: '__DE_HOURS_HTML__',
      aboutHero: '__DE_ABOUT_HERO__',
      story1: '__DE_STORY_1__',
      story2: '__DE_STORY_2__',
      values: [
        ['__DE_VALUE_1_TITLE__', '__DE_VALUE_1_TEXT__'],
        ['__DE_VALUE_2_TITLE__', '__DE_VALUE_2_TEXT__'],
        ['__DE_VALUE_3_TITLE__', '__DE_VALUE_3_TEXT__'],
        ['__DE_VALUE_4_TITLE__', '__DE_VALUE_4_TEXT__']
      ],
      reviews: [
        ['__REVIEWER_1__', '__DE_REVIEW_1_PARAPHRASE__'],
        ['__REVIEWER_2__', '__DE_REVIEW_2_PARAPHRASE__'],
        ['__REVIEWER_3__', '__DE_REVIEW_3_PARAPHRASE__']
      ]
    },

    es: {
      hours: '__ES_HOURS_HTML__',
      aboutHero: '__ES_ABOUT_HERO__',
      story1: '__ES_STORY_1__',
      story2: '__ES_STORY_2__',
      values: [
        ['__ES_VALUE_1_TITLE__', '__ES_VALUE_1_TEXT__'],
        ['__ES_VALUE_2_TITLE__', '__ES_VALUE_2_TEXT__'],
        ['__ES_VALUE_3_TITLE__', '__ES_VALUE_3_TEXT__'],
        ['__ES_VALUE_4_TITLE__', '__ES_VALUE_4_TEXT__']
      ],
      reviews: [
        ['__REVIEWER_1__', '__ES_REVIEW_1_PARAPHRASE__'],
        ['__REVIEWER_2__', '__ES_REVIEW_2_PARAPHRASE__'],
        ['__REVIEWER_3__', '__ES_REVIEW_3_PARAPHRASE__']
      ]
    },

    ca: {
      hours: '__CA_HOURS_HTML__',
      aboutHero: '__CA_ABOUT_HERO__',
      story1: '__CA_STORY_1__',
      story2: '__CA_STORY_2__',
      values: [
        ['__CA_VALUE_1_TITLE__', '__CA_VALUE_1_TEXT__'],
        ['__CA_VALUE_2_TITLE__', '__CA_VALUE_2_TEXT__'],
        ['__CA_VALUE_3_TITLE__', '__CA_VALUE_3_TEXT__'],
        ['__CA_VALUE_4_TITLE__', '__CA_VALUE_4_TEXT__']
      ],
      reviews: [
        ['__REVIEWER_1__', '__CA_REVIEW_1_PARAPHRASE__'],
        ['__REVIEWER_2__', '__CA_REVIEW_2_PARAPHRASE__'],
        ['__REVIEWER_3__', '__CA_REVIEW_3_PARAPHRASE__']
      ]
    }
  }
};
