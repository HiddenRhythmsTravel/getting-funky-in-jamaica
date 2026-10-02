export interface DestinationHighlight {
  title: string;
  description: string;
  icon?: string;
}

export interface DestinationItineraryItem {
  day: string;
  title: string;
  description: string;
}

export interface DestinationFAQ {
  question: string;
  answer: string;
}

export interface DestinationData {
  slug: string;
  title: string; // < 60 chars
  description: string; // 150-160 chars
  keywords: string[];
  schemaType: "TouristDestination" | "BusinessEvent" | "TravelAction";
  heroHeader: string;
  subHeader: string;
  locationName: string;
  soundtrackTitle: string;
  soundtrackArtist: string;
  overview: string;
  highlights: DestinationHighlight[];
  itinerary: DestinationItineraryItem[];
  faqs: DestinationFAQ[];
  quote: {
    text: string;
    author: string;
  };
}

export const DESTINATIONS_DATA: Record<string, DestinationData> = {
  colombia: {
    slug: "colombia",
    title: "Colombia Experiential Travel & Cultural Journeys",
    description: "Immerse in private VIP journeys through Medellín and Cartagena. Experience authentic Colombian rhythms, salsa masters, and exclusive luxury access.",
    keywords: [
      "Colombia Travel",
      "Medellín Experiential Travel",
      "Cartagena Luxury Journeys",
      "Salsa Cultural Immersion",
      "VIP Colombia Retreats",
    ],
    schemaType: "TouristDestination",
    heroHeader: "Colombia: Rhythms of the Andes & Caribbean",
    subHeader: "Uncover private rooftop salsa sessions in Medellín, colonial luxury in Cartagena, and elite musical access.",
    locationName: "Medellín & Cartagena, Colombia",
    soundtrackTitle: "Colombia Rhythm",
    soundtrackArtist: "Curated Afro-Colombian Soundscape",
    overview: "From the dramatic mountain amphitheater of Medellín to the historic walled cobblestones of Cartagena, Colombia is a sensory tapestry of sound, gastronomy, and rhythm. Hidden Rhythms opens doors to master percussionists, private paladar dinners, and insider access unavailable to traditional travelers.",
    highlights: [
      {
        title: "Private Salsa Masterclasses",
        description: "Learn secret steps from world-champion dancers on a secluded rooftop overlooking Medellín.",
      },
      {
        title: "Afro-Colombian Drumming Circles",
        description: "Experience intimate beachfront drum rituals in Palenque with legendary heritage musicians.",
      },
      {
        title: "Exclusive Emerald & Culinary Tastings",
        description: "Dine at closed-door paladars paired with private gemologist collection showcases.",
      },
    ],
    itinerary: [
      {
        day: "Day 1-2",
        title: "Medellín Innovation & Musical Soul",
        description: "Private villa arrival, city skyline cocktail welcome, and backstage access to local acoustic ensembles.",
      },
      {
        day: "Day 3-4",
        title: "Cartagena Colonial Nights",
        description: "Chartered flight to Cartagena, private yacht sunset sail, and late-night speakeasy salsa exploration.",
      },
      {
        day: "Day 5",
        title: "Rosario Islands Seclusion",
        description: "Private island beach club relaxation paired with live ambient percussionists and seaside dining.",
      },
    ],
    faqs: [
      {
        question: "What makes Hidden Rhythms Colombia trips unique?",
        answer: "We provide true insider access—private meetings with Grammy-nominated musicians, closed-door dining, and dedicated concierges.",
      },
      {
        question: "Can trips be customized for private groups or forums?",
        answer: "Yes, all itineraries are fully bespoke for private families, executive groups, and YPO/EO forum retreats.",
      },
    ],
    quote: {
      text: "The rhythm of Colombia isn't something you listen to—it's something that rewires your soul.",
      author: "Hidden Rhythms Curator",
    },
  },

  "mexico-city": {
    slug: "mexico-city",
    title: "Mexico City Cultural & Culinary Luxury Experience",
    description: "Explore elite culinary arts, architectural icons, and underground jazz in Mexico City. Bespoke cultural itineraries for luxury travelers.",
    keywords: [
      "Mexico City Travel",
      "CDMX Cultural Immersion",
      "Luxury Mexico City Culinary",
      "Roma Norte Speakeasies",
      "Private CDMX Architecture Tour",
    ],
    schemaType: "TouristDestination",
    heroHeader: "Mexico City: Art, Architecture & Midnight Jazz",
    subHeader: "Delve into private museum access, Michelin-recognized culinary salons, and secret subterranean music clubs.",
    locationName: "Mexico City (CDMX), Mexico",
    soundtrackTitle: "Mexico City Rhythm",
    soundtrackArtist: "Curated CDMX Vinyl Sessions",
    overview: "Mexico City is one of the world's premier cultural capitals. Experience private viewings of iconic modern architecture, intimate mezcal tastings with master distillers, and midnight jazz sessions hidden beneath historic Roma Norte townhouses.",
    highlights: [
      {
        title: "After-Hours Museum Viewings",
        description: "Enjoy private, empty-gallery tours of world-renowned architectural landmarks and modern art sanctuaries.",
      },
      {
        title: "Chef-Led Gastronomic Salons",
        description: "Savor multi-course tasting menus hosted in private residential courtyards by acclaimed CDMX chefs.",
      },
      {
        title: "Underground Vinyl & Jazz Speakeasies",
        description: "Gain VIP entrance to members-only vinyl listening bars and secret subterranean jazz clubs.",
      },
    ],
    itinerary: [
      {
        day: "Day 1-2",
        title: "Condesa & Roma Architectural Immersion",
        description: "Private boutique hotel check-in, guided design walk, and welcome dinner hosted by a master mezcalier.",
      },
      {
        day: "Day 3",
        title: "Private Coyoacán & Art Collections",
        description: "Exclusive access to private art foundations followed by an acoustic courtyard concert.",
      },
      {
        day: "Day 4",
        title: "Polanco Fine Dining & Midnight Rhythms",
        description: "Curated tasting menu followed by entry into Mexico City's top underground listening lounges.",
      },
    ],
    faqs: [
      {
        question: "Is Mexico City suitable for executive retreat groups?",
        answer: "Absoluty. CDMX offers world-class dining, seamless logistics, and exceptional private venues ideal for forum retreats.",
      },
      {
        question: "Are dietary preferences accommodated for private dinners?",
        answer: "Every culinary experience is tailored to your group's exact dietary requests by our master chef partners.",
      },
    ],
    quote: {
      text: "CDMX is an endless symphony of design, flavor, and rhythm waiting to be unlocked.",
      author: "CDMX Experience Director",
    },
  },

  jamaica: {
    slug: "jamaica",
    title: "Authentic Jamaica Travel & Soundscape Experience",
    description: "Discover authentic Reggae heritage, Blue Mountain retreats, and Kingston vinyl sessions on a private luxury journey across Jamaica.",
    keywords: [
      "Jamaica Travel",
      "Authentic Reggae Experience",
      "Kingston Sound System Culture",
      "Blue Mountains Retreat",
      "Luxury Jamaica Journeys",
    ],
    schemaType: "TouristDestination",
    heroHeader: "Jamaica: Root Rhythms & Blue Mountain Seclusion",
    subHeader: "Step into private Kingston recording studios, vintage vinyl sound system dances, and pristine coastal villas.",
    locationName: "Kingston & North Coast, Jamaica",
    soundtrackTitle: "Jamaica Rhythm",
    soundtrackArtist: "Reggae Lovers Rock & Dub Mix",
    overview: "Jamaica's global cultural impact far exceeds its physical footprint. Hidden Rhythms takes you beyond the standard resort gates into the beating heart of Kingston sound system culture, legendary studio jam sessions, and tranquil mountain hideaways.",
    highlights: [
      {
        title: "Private Studio Sessions",
        description: "Sit in on live dub and reggae recording sessions with legendary musicians in historic Kingston studios.",
      },
      {
        title: "Authentic Sound System Culture",
        description: "Experience private outdoor vinyl dances with master selectors and custom-built speaker stacks.",
      },
      {
        title: "Blue Mountain Coffee & Estate Dining",
        description: "Journey into mist-shrouded peaks for private farm-to-table feasts overlooking Port Royal.",
      },
    ],
    itinerary: [
      {
        day: "Day 1-2",
        title: "Kingston Musical Heritage",
        description: "Private villa check-in, studio tour with reggae legends, and authentic Jamaican culinary welcome.",
      },
      {
        day: "Day 3",
        title: "Blue Mountain Sanctuary",
        description: "Escorted mountain drive, private coffee estate tasting, and acoustic sunset jam session.",
      },
      {
        day: "Day 4-5",
        title: "North Coast Beachfront Seclusion",
        description: "Transfer to private seaside estate, catamaran coastal cruise, and farewell seaside drum circle.",
      },
    ],
    faqs: [
      {
        question: "How does Hidden Rhythms access authentic musical sites in Jamaica?",
        answer: "Our team has decades of deep relationships with pioneer artists, sound system engineers, and local cultural leaders.",
      },
      {
        question: "What accommodation styles are included?",
        answer: "We curate exclusive private villas, historic boutique estates, and high-end eco-luxury retreats.",
      },
    ],
    quote: {
      text: "Feel the bass vibrate through the earth, and you understand the true pulse of Jamaica.",
      author: "Jamaican Sound Pioneer",
    },
  },

  "new-orleans": {
    slug: "new-orleans",
    title: "New Orleans Heritage Jazz & Funk Cultural Journeys",
    description: "Experience private brass band parades, French Quarter culinary salons, and VIP jazz club access in iconic New Orleans.",
    keywords: [
      "New Orleans Travel",
      "NOLA Jazz Experience",
      "Second Line Parade VIP",
      "Heritage Funk & Brass",
      "Luxury New Orleans Retreats",
    ],
    schemaType: "TouristDestination",
    heroHeader: "New Orleans: Brass, Funk & Culinary Soul",
    subHeader: "Lead your own private Second Line brass parade, dine in historic Creole courtyards, and unlock legendary sound studios.",
    locationName: "New Orleans (NOLA), Louisiana",
    soundtrackTitle: "New Orleans Rhythm",
    soundtrackArtist: "Vintage NOLA Brass & Funk",
    overview: "New Orleans is America's undeniable cradle of rhythm. Hidden Rhythms grants master-key access to legendary brass musicians, private French Quarter dining rooms, and custom Second Line street parades created exclusively for your group.",
    highlights: [
      {
        title: "Custom Second Line Parades",
        description: "Dance through the historic streets accompanied by a full Grammy-winning brass band and police escort.",
      },
      {
        title: "Private Courtyard Creole Salons",
        description: "Indulge in classic Creole gastronomy prepared by master chefs inside hidden 19th-century courtyards.",
      },
      {
        title: "Preservation & Funk VIP Sessions",
        description: "Private after-hours acoustic performances inside historic French Quarter music halls.",
      },
    ],
    itinerary: [
      {
        day: "Day 1-2",
        title: "French Quarter History & Funk",
        description: "Boutique hotel check-in, private cocktail history tour, and front-row seats at legendary Frenchmen Street clubs.",
      },
      {
        day: "Day 3",
        title: "The Second Line & Creole Feast",
        description: "Private brass parade through the Marigny followed by an opulent multi-course Creole dinner.",
      },
      {
        day: "Day 4",
        title: "Bayou & Heritage Experience",
        description: "Private swamp eco-tour with native naturalists and farewell jazz brunch.",
      },
    ],
    faqs: [
      {
        question: "Can we arrange a private Second Line parade for a celebration or forum?",
        answer: "Yes! We handle all city permits, band coordination, police escorts, and custom parasols for an unforgettable event.",
      },
      {
        question: "What is the best time of year for a NOLA cultural trip?",
        answer: "New Orleans is vibrant year-round, with spring (Jazz Fest season) and autumn offering ideal weather.",
      },
    ],
    quote: {
      text: "In New Orleans, music doesn't just play—it walks down the street and calls you by name.",
      author: "NOLA Cultural Ambassador",
    },
  },

  "ypo-eo-retreats": {
    slug: "ypo-eo-retreats",
    title: "YPO & EO Forum Retreats | Luxury Destination Journeys",
    description: "Bespoke executive forum retreats for YPO, EO, and leadership groups. Transformative cultural immersion and flawless luxury execution.",
    keywords: [
      "YPO Retreats",
      "EO Forum Retreats",
      "Executive Destination Retreats",
      "Luxury Forum Journeys",
      "Bespoke Corporate Retreats",
    ],
    schemaType: "BusinessEvent",
    heroHeader: "YPO & EO Forum Retreats: Elevated & Unforgettable",
    subHeader: "Deepen forum trust and connection through high-impact cultural experiences, private luxury estates, and flawless privacy.",
    locationName: "Global Destinations (Colombia, Mexico City, Jamaica, NOLA)",
    soundtrackTitle: "Bespoke Forum Rhythm",
    soundtrackArtist: "Curated Executive Soundscape",
    overview: "For executive forums and leadership groups seeking profound connection, standard corporate retreats fall short. Hidden Rhythms designs transformative journeys that blend confidential forum exercises, extraordinary culinary settings, and private musical encounters.",
    highlights: [
      {
        title: "Confidential & Private Venues",
        description: "Exclusive access to private villas, historic estates, and secluded spaces designed for deep forum work.",
      },
      {
        title: "Immersive Cultural Catalysts",
        description: "Shared experiences—from private drum circles to after-hours museum viewings—that bond forum members.",
      },
      {
        title: "White-Glove Executive Logistics",
        description: "Dedicated trip directors, VIP airport fast-tracking, private charters, and 24/7 concierge support.",
      },
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & Connection Salon",
        description: "Private villa arrival, forum opening circle, and candlelit welcome dinner prepared by a celebrity chef.",
      },
      {
        day: "Day 2",
        title: "Deep Forum Work & Cultural Catalyst",
        description: "Morning forum session in a secluded pavilion followed by a private rooftop musical masterclass.",
      },
      {
        day: "Day 3",
        title: "Transformative Group Experience",
        description: "Full-day immersion (yacht sail, studio session, or private architectural tour) ending with a closing gala feast.",
      },
    ],
    faqs: [
      {
        question: "How do you accommodate forum confidentiality and agenda requirements?",
        answer: "We work directly with your Forum Officer to integrate dedicated meeting blocks, AV setups, and complete privacy protocols.",
      },
      {
        question: "What group sizes do you specialize in?",
        answer: "We specialize in intimate groups of 6 to 25 members, ensuring hyper-personalized attention and exclusive access.",
      },
    ],
    quote: {
      text: "The most powerful forum breakthroughs happen when high-performing leaders are placed in extraordinary shared environments.",
      author: "YPO Forum Facilitator",
    },
  },

  bespoke: {
    slug: "bespoke",
    title: "Bespoke Luxury Travel & Custom Destination Retreats",
    description: "Custom-designed private journeys for discerning travelers. Tailor-made itineraries, private charters, and exclusive cultural access.",
    keywords: [
      "Bespoke Travel",
      "Custom Luxury Journeys",
      "Tailor-Made Destination Retreats",
      "Private VIP Travel Curator",
      "Hidden Rhythms Bespoke",
    ],
    schemaType: "BusinessEvent",
    heroHeader: "Bespoke Journeys: Crafted Exclusively for You",
    subHeader: "No cookie-cutter templates. Complete white-glove curation tailored precisely to your passions, timeline, and vision.",
    locationName: "Worldwide Curated Destinations",
    soundtrackTitle: "Chan Chan",
    soundtrackArtist: "Havana Meets Kingston Soundscape",
    overview: "Every traveler possesses a unique rhythm. Our Bespoke division crafts completely custom itineraries tailored to your exact tastes—whether celebrating a milestone anniversary, orchestrating a family multi-generational retreat, or curating a private musical pilgrimage.",
    highlights: [
      {
        title: "Tailor-Made Itinerary Design",
        description: "Every day, dining reservation, and cultural encounter is built around your individual preferences.",
      },
      {
        title: "Unrivaled Access & Privacy",
        description: "Private aircraft arrangements, secret venue buyouts, and meetings with world-class masters.",
      },
      {
        title: "Dedicated On-Site Concierge",
        description: "Your personal trip manager ensures flawless execution and real-time flexibility from start to finish.",
      },
    ],
    itinerary: [
      {
        day: "Phase 1",
        title: "Curatorial Consultation",
        description: "Deep-dive discovery call with our master trip architects to define your group's vision and desires.",
      },
      {
        day: "Phase 2",
        title: "Bespoke Blueprint & Selection",
        description: "Presentation of custom villa portfolios, private artist access options, and exclusive dining venues.",
      },
      {
        day: "Phase 3",
        title: "Flawless Execution",
        description: "White-glove on-ground management delivering a seamless, once-in-a-lifetime journey.",
      },
    ],
    faqs: [
      {
        question: "How far in advance should we plan a bespoke trip?",
        answer: "We recommend 3 to 6 months for optimal access to private villas and master artists, though expedited planning is available.",
      },
      {
        question: "Can we combine multiple destinations into one journey?",
        answer: "Absolutely. We routinely coordinate multi-destination charters across Latin America and the Caribbean.",
      },
    ],
    quote: {
      text: "Luxury is no longer about places—it is about moments of unscripted wonder.",
      author: "Hidden Rhythms Founder",
    },
  },
};
