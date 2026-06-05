import type { Review } from "./admin-types";

export const defaultReviews: Review[] = [
  {
    id: "rev-1",
    name: "Rajesh Maharjan",
    initials: "RM",
    role: "Homeowner · Lalitpur",
    quote: {
      en: "Horizon Nepal delivered our family home on time and 4% under budget. The weekly updates made everything feel under control.",
      np: "होरिजन नेपालले हाम्रो पारिवारिक घर समयमै र बजेटभन्दा ४% कममा हस्तान्तरण गर्यो। साप्ताहिक अपडेटले सबै कुरा नियन्त्रणमा रहेको महसुस गरायो।",
    },
    rating: 5,
  },
  {
    id: "rev-2",
    name: "Sita Gurung",
    initials: "SG",
    role: "MD · Annapurna Retail",
    quote: {
      en: "We've now done three commercial fit-outs with this team. The attention to structural detail is genuinely unmatched in the valley.",
      np: "हामीले यो टोलीसँग तीनवटा व्यावसायिक फिट-आउट गरिसकेका छौं। संरचनात्मक विवरणमा ध्यान उपत्यकामा वास्तवमै अतुलनीय छ।",
    },
    rating: 5,
  },
  {
    id: "rev-3",
    name: "Bibek Karki",
    initials: "BK",
    role: "Director · Public Works",
    quote: {
      en: "Their road maintenance crew is the rare contractor that finishes ahead of schedule and still passes every inspection.",
      np: "तिनीहरूको सडक मर्मत टोली दुर्लभ ठेकेदार हो जसले तालिका भन्दा पहिले काम सक्छ र अझै पनि हरेक निरीक्षण पास गर्छ।",
    },
    rating: 5,
  },
  {
    id: "rev-4",
    name: "Anita Sharma",
    initials: "AS",
    role: "Hotelier · Thamel",
    quote: {
      en: "The interior renovation was handled with respect for our heritage building. Craftsmanship at a level we hadn't seen before.",
      np: "भित्री नवीकरण हाम्रो सम्पदा भवनको सम्मानका साथ गरिएको थियो। कारीगरी यस्तो स्तरमा थियो जुन हामीले पहिले देखेका थिएनौं।",
    },
    rating: 5,
  },
];
