export type GalleryPhoto = {
  src: string;
  alt: string;
};

export const event = {
  bride: {
    firstName: "Anu",
    firstNameTa: "அனு",
  },
  groom: {
    firstName: "Vicky",
    firstNameTa: "விக்கி",
  },
  type: {
    en: "Engagement Ceremony",
    ta: "நிச்சயதார்த்த விழா",
  },
  datetime: "2026-11-15T10:30:00+05:30",
  timezone: "Asia/Kolkata",
  date: {
    isoDate: "2026-11-15",
    weekdayEn: "Sunday",
    displayEn: "Sunday, 15 November 2026",
    displayTa: "15 நவம்பர் 2026, ஞாயிற்றுக்கிழமை",
    short: "15.11.2026",
    heroEn: "15 NOVEMBER 2026",
  },
  time: {
    displayEn: "10:30 AM",
    displayTa: "காலை 10:30 மணி",
    heroEn: "10:30 AM",
    start: "10:30",
  },
  venue: {
    name: "Sri Lakshimi Mahal",
    nameTa: "ஸ்ரீ லக்ஷ்மி மகால்",
    city: "Salem",
    state: "Tamil Nadu",
    country: "India",
    locationLineEn: "Salem, Tamil Nadu",
    locationLineTa: "ஸ்ரீ லக்ஷ்மி மகால், சேலம்",
    mapsQuery: "Sri Lakshimi Mahal, Salem, Tamil Nadu, India",
  },
  calendar: {
    title: "Engagement Ceremony – Anu & Vicky",
    endTime: null as string | null,
  },
  audioSrc: "/audio/engagement-theme.wav",
  assets: {
    ganesh: "/images/ganesh.webp",
    mandala: "/images/mandala.webp",
    floralFrame: "/images/floral-frame.webp",
    rings: "/images/rings.webp",
    namaste: "/images/namaste.webp",
    coupleIllustration: "/images/couple-illustration.webp",
  },
  photos: {
    bride: null as string | null,
    groom: null as string | null,
    couple: null as string | null,
    gallery: [] as GalleryPhoto[],
  },
  copy: {
    introLine: "A Celebration of Love",
    openInvitation: "Open Invitation",
    heroEyebrow: "The Beginning of Forever",
    scrollHint: "Scroll to Explore",
    coupleHeading: "Two Hearts, One Beautiful Journey",
    coupleHeadingTa: "இரு மனங்கள், ஓர் அழகிய பயணம்",
    invitationEyebrow: "You Are Cordially Invited",
    invitationBlessing: "With the Blessings of Our Families",
    invitationBody: "We invite you to celebrate the engagement of",
    invitationBlessingTa: "எங்கள் குடும்பத்தினரின் அன்பான அழைப்புடன்",
    invitationNamesTa: "அனு மற்றும் விக்கி",
    invitationEventTa: "இனிய நிச்சயதார்த்த விழாவிற்கு",
    countdownHeading: "Until We Celebrate",
    celebrationEn: "The celebration has begun!",
    celebrationTa: "மகிழ்ச்சியான தருணம் தொடங்கிவிட்டது!",
    detailsHeading: "Event Details",
    venueHeading: "Venue & Directions",
    getDirections: "Get Directions",
    addToCalendar: "Add to Calendar",
    galleryHeading: "A Glimpse of Our Story",
    galleryEmpty: "Photographs of Anu and Vicky will appear here.",
    finaleLine: "Your presence will make our day more special",
    finaleSub: "We look forward to celebrating with you",
    finaleLineTa: "உங்கள் வருகை எங்கள் மகிழ்ச்சியை மேலும் சிறப்பிக்கும்",
    finaleSubTa: "உங்கள் வருகையை அன்புடன் எதிர்நோக்குகிறோம்",
    withLove: "With Love",
  },
  seo: {
    title: "Anu & Vicky — Engagement Ceremony",
    description:
      "You are invited to the engagement of Anu and Vicky. 15 November 2026, 10:30 AM at Sri Lakshimi Mahal, Salem, Tamil Nadu.",
  },
} as const;

export type EventConfig = typeof event;
