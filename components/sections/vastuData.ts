export interface RoomVastu {
  idealDirection: { en: string; np: string };
  facingDirection: { en: string; np: string };
  tips: { en: string; np: string }[];
  avoid: { en: string; np: string }[];
}

export interface DirectionVastu {
  deity: string;
  element: string;
  description: { en: string; np: string };
  recommended: { en: string; np: string }[];
  avoid: { en: string; np: string }[];
}

export interface SectionData {
  title: string;
  titleNp: string;
  content: { en: string; np: string }[];
}

export const rooms: Record<string, RoomVastu> = {
  "living-room": {
    idealDirection: {
      en: "North, East, or Northeast directions. The living room should be at the front of the house, spacious and large. Placing the living room in North, East, or Northeast increases positive energy flow in the home and fosters harmonious relationships among family members.",
      np: "उत्तर (North), पूर्व (East) वा उत्तर-पूर्व (Northeast) दिशाहरू। बस्ने कोठा घरको अगाडि, चौडा र ठूलो हुनुपर्छ। उत्तर, पूर्व, वा उत्तर-पूर्व दिशामा बस्ने कोठा राख्दा घरमा सकारात्मक उर्जाको प्रवाह बढ्छ र परिवारका सदस्यहरूमा आपसी सम्बन्ध मधुर रहन्छ।",
    },
    facingDirection: {
      en: "Face North or East while sitting. Facing North or East while sitting helps people achieve more positive thinking and creativity.",
      np: "उत्तर (North) वा पूर्व (East) तिर मुख गरेर बस्नुहोस्। उत्तर वा पूर्वतिर मुख गरेर बस्दा मानिसहरूले अधिक सकारात्मक सोच र सृजनशीलता प्राप्त गर्छन्।",
    },
    tips: [
      { en: "Keep Northeast corner light and open", np: "उत्तर-पूर्व कुनालाई हल्का र खुला राख्नुहोस्" },
      { en: "Use bright and welcoming colors", np: "उज्यालो र स्वागत योग्य रङहरू प्रयोग गर्नुहोस्" },
      { en: "Place heavy furniture in Southwest", np: "भारी फर्नीचर दक्षिण-पश्चिममा राख्नुहोस्" },
      { en: "Ensure good natural light", np: "राम्रो प्राकृतिक प्रकाश सुनिश्चित गर्नुहोस्" },
      { en: "Keep green and healthy plants in living room", np: "बस्ने कोठामा हरियो र स्वस्थ बोटबिरुवाहरू राख्नुहोस्" },
      { en: "Keep center part of living room empty", np: "बस्ने कोठाको केन्द्र भागलाई खाली राख्नुहोस्" },
      { en: "Place positive pictures in living room", np: "बस्ने कोठामा सकारात्मक चित्रहरू राख्नुहोस्" },
    ],
    avoid: [
      { en: "Avoid living room in Southwest", np: "दक्षिण-पश्चिममा बस्ने कोठा नराख्नुहोस्" },
      { en: "No toilets adjacent to living room", np: "बस्ने कोठा संगै शौचालय नबनाउनुहोस्" },
      { en: "Don't place TV in Northeast", np: "उत्तर-पूर्वमा टिभी नराख्नुहोस्" },
      { en: "Avoid dark colors in Northeast", np: "उत्तर-पूर्वमा गाढा रङहरू प्रयोग नगर्नुहोस्" },
      { en: "Avoid keeping broken objects in living room", np: "बस्ने कोठामा कुनै पनि प्रकारको टुटेका वस्तुहरू नराख्नुहोस्" },
      { en: "Avoid living room door opening directly to toilet", np: "बस्ने कोठाको ढोका सिधै शौचालयमा नखुल्ने गरी बनाउनुहोस्" },
      { en: "Avoid too much clutter in living room", np: "बस्ने कोठामा धेरै झोल वा अनावश्यक सामान नराख्नुहोस्" },
    ],
  },
  "master-bedroom": {
    idealDirection: {
      en: "Southwest direction is ideal for the master bedroom. The master bedroom should be in the Southwest corner of the house, which is ruled by the Earth element. This placement promotes stability, strength, and a strong bond between couples.",
      np: "दक्षिण-पश्चिम (Southwest) दिशा मास्टर बेडरूमको लागि आदर्श हो। मास्टर बेडरूम घरको दक्षिण-पश्चिम कुनामा हुनुपर्छ, जुन पृथ्वी तत्वद्वारा शासित छ। यो स्थानले स्थिरता, शक्ति र दम्पतीबीच बलियो सम्बन्धलाई बढावा दिन्छ।",
    },
    facingDirection: {
      en: "Sleep with your head toward South or East. Sleeping with the head toward South aligns with the Earth's magnetic field and promotes restful sleep and good health.",
      np: "दक्षिण (South) वा पूर्व (East) तिर टाउको राखेर सुत्नुहोस्। दक्षिणतिर टाउको राखेर सुत्दा पृथ्वीको चुम्बकीय क्षेत्रसँग मेल खान्छ र राम्रो निद्रा र स्वास्थ्यलाई बढावा दिन्छ।",
    },
    tips: [
      { en: "Place bed in Southwest corner of room", np: "ओछ्यान कोठाको दक्षिण-पश्चिम कुनामा राख्नुहोस्" },
      { en: "Use soft, calming colors like light pink or cream", np: "हल्का गुलाबी वा क्रिम जस्ता नरम, शान्त रङहरू प्रयोग गर्नुहोस्" },
      { en: "Keep Northeast part of bedroom clean and light", np: "शयनकक्षको उत्तर-पूर्व भाग सफा र उज्यालो राख्नुहोस्" },
      { en: "Place wardrobe in North or West wall", np: "अलमारी उत्तर वा पश्चिम पर्खालमा राख्नुहोस्" },
      { en: "Ensure proper ventilation and fresh air", np: "उचित भेन्टिलेसन र ताजा हावा सुनिश्चित गर्नुहोस्" },
      { en: "Keep electronic devices away from bed", np: "इलेक्ट्रोनिक उपकरणहरू ओछ्यानबाट टाढा राख्नुहोस्" },
    ],
    avoid: [
      { en: "No bedroom in Northeast or Southeast", np: "उत्तर-पूर्व वा दक्षिण-पूर्वमा शयनकक्ष नराख्नुहोस्" },
      { en: "Avoid mirrors facing the bed", np: "ओछ्यानतिर फर्केको ऐना नराख्नुहोस्" },
      { en: "No toilet attached to pooja room wall", np: "पूजा कोठाको पर्खालमा शौचालय नजोड्नुहोस्" },
      { en: "Avoid TV or computer in bedroom", np: "शयनकक्षमा टिभी वा कम्प्युटर नराख्नुहोस्" },
      { en: "Don't sleep with head toward North", np: "उत्तरतिर टाउको राखेर नसुत्नुहोस्" },
      { en: "Avoid dark and heavy colors in bedroom", np: "शयनकक्षमा गाढा र भारी रङहरू प्रयोग नगर्नुहोस्" },
    ],
  },
  "kids-bedroom": {
    idealDirection: {
      en: "West, Northwest, or North direction. Children's bedrooms in West or Northwest foster creativity, learning, and overall development. The North direction is also beneficial for children's growth and success in education.",
      np: "पश्चिम (West), उत्तर-पश्चिम (Northwest) वा उत्तर (North) दिशा। पश्चिम वा उत्तर-पश्चिममा बच्चाको कोठा राख्दा सृजनशीलता, सिकाइ र समग्र विकासलाई बढावा मिल्छ। उत्तर दिशा पनि बच्चाको वृद्धि र शिक्षामा सफलताका लागि लाभदायक हुन्छ।",
    },
    facingDirection: {
      en: "Face East or North while studying. Having children face East while studying improves concentration, memory retention, and academic performance.",
      np: "पढ्दा पूर्व (East) वा उत्तर (North) तिर मुख गर्नुहोस्। पूर्वतिर मुख गरेर पढ्दा बच्चाको एकाग्रता, स्मरण शक्ति र शैक्षिक प्रदर्शनमा सुधार हुन्छ।",
    },
    tips: [
      { en: "Place study desk in East or North of room", np: "अध्ययन डेस्क कोठाको पूर्व वा उत्तरमा राख्नुहोस्" },
      { en: "Use bright, vibrant colors for walls", np: "भित्ताका लागि उज्यालो, जीवन्त रङहरू प्रयोग गर्नुहोस्" },
      { en: "Keep room well-ventilated with natural light", np: "प्राकृतिक प्रकाशको साथ कोठा राम्रोसँग हावा चल्ने बनाउनुहोस्" },
      { en: "Place bed along South or West wall", np: "ओछ्यान दक्षिण वा पश्चिम पर्खालमा राख्नुहोस्" },
      { en: "Store toys in North or West direction", np: "खेलौनाहरू उत्तर वा पश्चिम दिशामा राख्नुहोस्" },
    ],
    avoid: [
      { en: "No bedroom in Southwest for children", np: "दक्षिण-पश्चिममा बच्चाको कोठा नराख्नुहोस्" },
      { en: "Avoid placing bed under a beam", np: "ओछ्यान मुनि बीम नराख्नुहोस्" },
      { en: "Don't place study desk against South wall", np: "दक्षिण पर्खालमा अध्ययन डेस्क नराख्नुहोस्" },
      { en: "Avoid electronic gadgets near sleeping area", np: "सुत्ने क्षेत्र नजिक इलेक्ट्रोनिक उपकरणहरू नराख्नुहोस्" },
    ],
  },
  kitchen: {
    idealDirection: {
      en: "Southeast direction (Agni / Fire element) is ideal for the kitchen. The fire element rules the Southeast direction, making it the most suitable location for cooking. Alternative: Northwest direction is also acceptable.",
      np: "दक्षिण-पूर्व (Southeast) दिशा भान्साको लागि आदर्श हो। आगो तत्वले दक्षिण-पूर्व दिशालाई शासन गर्छ, जसले यसलाई पकाउनको लागि सबैभन्दा उपयुक्त स्थान बनाउँछ। विकल्प: उत्तर-पश्चिम दिशा पनि स्वीकार्य छ।",
    },
    facingDirection: {
      en: "Cook facing East. The person cooking should face East, which is considered auspicious and ensures that the food is prepared with positive energy. Never face South while cooking.",
      np: "पकाउनेले पूर्व (East) तिर मुख गरेर पकाउनुपर्छ। पकाउने व्यक्तिले पूर्वतिर मुख गर्नुपर्छ, जुन शुभ मानिन्छ र खाना सकारात्मक उर्जाको साथ तयार हुन्छ। पकाउँदा दक्षिणतिर कहिल्यै नहेर्नुहोस्।",
    },
    tips: [
      { en: "Place cooking stove in Southeast of kitchen", np: "चुल्हो भान्साको दक्षिण-पूर्वमा राख्नुहोस्" },
      { en: "Sink should be in Northeast direction", np: "सिंक उत्तर-पूर्व दिशामा हुनुपर्छ" },
      { en: "Keep a gap between sink and stove", np: "सिंक र चुल्होबीचको दूरी राख्नुहोस्" },
      { en: "Storage shelves in South and West walls", np: "भण्डारण शेल्फ दक्षिण र पश्चिम पर्खालमा राख्नुहोस्" },
      { en: "Use light and warm color schemes", np: "हल्का र न्यानो रङ योजनाहरू प्रयोग गर्नुहोस्" },
      { en: "Ensure exhaust fan or chimney in Southeast", np: "दक्षिण-पूर्वमा एक्जस्ट फ्यान वा चिम्नी राख्नुहोस्" },
    ],
    avoid: [
      { en: "Never place kitchen in Northeast", np: "उत्तर-पूर्वमा भान्सा कहिल्यै नराख्नुहोस्" },
      { en: "No kitchen under staircase", np: "सिँढी मुनि भान्सा नराख्नुहोस्" },
      { en: "Stove and sink not adjacent (fire vs water conflict)", np: "चुल्हो र सिंक एकअर्काको छेउमा नराख्नुहोस्" },
      { en: "Avoid toilet above or adjacent to kitchen", np: "भान्साको माथि वा छेउमा शौचालय नबनाउनुहोस्" },
      { en: "Don't keep kitchen dirty or cluttered", np: "भान्सा फोहोर वा अव्यवस्थित नराख्नुहोस्" },
      { en: "Avoid dark colors in kitchen", np: "भान्सामा गाढा रङहरू प्रयोग नगर्नुहोस्" },
    ],
  },
  "dining-room": {
    idealDirection: {
      en: "Near kitchen in Southeast, Northwest, or Northeast. The dining room should be adjacent to the kitchen for convenience. West side is believed to encourage profitability. The dining table should be in the center but not toward Southwest.",
      np: "दक्षिण-पूर्व, उत्तर-पश्चिम, वा उत्तर-पूर्वमा भान्साको नजिक। खाना कक्ष सुविधाको लागि भान्साको नजिक हुनुपर्छ। पश्चिम तिरले लाभलाई प्रोत्साहन गर्दछ। खाना टेबल केन्द्रमा तर दक्षिण-पश्चिमतिर नहुनुपर्छ।",
    },
    facingDirection: {
      en: "Head of family faces East during meals. Others can face East, West, or North. Never face South while eating. Facing East during meals improves digestion and positive energy absorption.",
      np: "परिवारको मुखियाले खाना खाँदा पूर्वतिर मुख गर्नुपर्छ। अरूले पूर्व, पश्चिम, वा उत्तरतिर मुख गर्न सक्छन्। खाँदा कहिल्यै दक्षिणतिर नगर्नुहोस्। पूर्वतिर मुख गरेर खाँदा पाचन र सकारात्मक उर्जा अवशोषणमा सुधार हुन्छ।",
    },
    tips: [
      { en: "Use square or rectangular dining table (no round/oval)", np: "वर्ग वा आयताकार खाना टेबल प्रयोग गर्नुहोस् (गोलो/अण्डाकार होइन)" },
      { en: "Water/wash basin in East or North", np: "पानी/धुने कुण्ड पूर्व वा उत्तरमा राख्नुहोस्" },
      { en: "Use light blue, yellow, saffron, light green colors", np: "हल्का निलो, पहेंलो, केसरी, हल्का हरियो रङहरू प्रयोग गर्नुहोस्" },
      { en: "Hang family photos on South or West wall", np: "पारिवारिक फोटोहरू दक्षिण वा पश्चिम पर्खालमा झुण्ड्याउनुहोस्" },
      { en: "Keep dining area well-lit and ventilated", np: "खाना कक्ष राम्रोसँग उज्यालो र हावा चल्ने राख्नुहोस्" },
    ],
    avoid: [
      { en: "Don't place dining table against Southwest wall", np: "दक्षिण-पश्चिम पर्खालमा खाना टेबल नराख्नुहोस्" },
      { en: "No dining room attached to toilet", np: "शौचालयसँग जोडिएको खाना कक्ष नराख्नुहोस्" },
      { en: "Never face South while eating", np: "खाँदा कहिल्यै दक्षिणतिर नगर्नुहोस्" },
      { en: "No water basin in Southeast or Southwest", np: "दक्षिण-पूर्व वा दक्षिण-पश्चिममा पानीको कुण्ड नराख्नुहोस्" },
      { en: "Avoid kitchen waste bin visible from dining", np: "भान्साको फोहोर खाना कक्षबाट देखिने नराख्नुहोस्" },
    ],
  },
  "pooja-room": {
    idealDirection: {
      en: "Northeast corner (Ishan) is the most sacred direction for the pooja room. This direction is ruled by the Ishana (Lord Shiva) and is considered the most spiritually charged area of the home. It promotes peace, prosperity, and spiritual growth.",
      np: "उत्तर-पूर्व कुना (ईशान) पूजा कोठाको लागि सबैभन्दा पवित्र दिशा हो। यो दिशा ईशान (भगवान शिव) द्वारा शासित छ र घरको सबैभन्दा आध्यात्मिक रूपमा चार्ज गरिएको क्षेत्र मानिन्छ। यसले शान्ति, समृद्धि र आध्यात्मिक वृद्धिलाई बढावा दिन्छ।",
    },
    facingDirection: {
      en: "Face East or North while praying. The worshipper should face East or North toward the deities for maximum spiritual benefit and positive energy reception.",
      np: "पूजा गर्दा पूर्व (East) वा उत्तर (North) तिर मुख गर्नुहोस्। पूजा गर्नेले अधिकतम आध्यात्मिक लाभ र सकारात्मक उर्जा प्राप्तिको लागि पूर्व वा उत्तरतिर मुख गर्नुपर्छ।",
    },
    tips: [
      { en: "Keep pooja room in Northeast corner of house", np: "पूजा कोठा घरको उत्तर-पूर्व कुनामा राख्नुहोस्" },
      { en: "Keep clean, well-lit, and properly ventilated", np: "सफा, उज्यालो र राम्रो हावा चल्ने राख्नुहोस्" },
      { en: "Use wooden platform for idols (not marble/stone)", np: "मूर्तिहरूको लागि काठको प्लेटफर्म प्रयोग गर्नुहोस्" },
      { en: "Place idols facing West so devotee faces East", np: "पूर्वतिर फर्केर पूजा गर्न मूर्तिहरू पश्चिमतिर राख्नुहोस्" },
      { en: "Use brass or copper lamps for lighting", np: "प्रकाशको लागि पित्तल वा तामाको दिया प्रयोग गर्नुहोस्" },
    ],
    avoid: [
      { en: "No pooja room under staircase", np: "सिँढी मुनि पूजा कोठा नराख्नुहोस्" },
      { en: "No toilet adjacent or above pooja room", np: "पूजा कोठाको छेउमा वा माथि शौचालय नबनाउनुहोस्" },
      { en: "No bathroom attached to pooja room", np: "पूजा कोठामा स्नानघर नजोड्नुहोस्" },
      { en: "Avoid sleeping or non-spiritual activities in pooja room", np: "पूजा कोठामा सुत्ने वा गैर-आध्यात्मिक गतिविधिहरू नगर्नुहोस्" },
      { en: "Don't place idols directly on floor", np: "मूर्तिहरू भुइँमा सीधा नराख्नुहोस्" },
    ],
  },
  bathroom: {
    idealDirection: {
      en: "West or Northwest direction. Bathrooms and toilets in the West or Northwest direction are considered suitable. The toilet seat should face North-South alignment. Ensure proper ventilation to maintain hygiene.",
      np: "पश्चिम (West) वा उत्तर-पश्चिम (Northwest) दिशा। पश्चिम वा उत्तर-पश्चिम दिशामा शौचालय र बाथरूम उपयुक्त मानिन्छ। शौचालय सिट उत्तर-दक्षिण पङ्क्तिमा हुनुपर्छ। स्वच्छता कायम राख्न उचित भेन्टिलेसन सुनिश्चित गर्नुहोस्।",
    },
    facingDirection: {
      en: "Face North-South while using the toilet. The ideal alignment is North-South direction, which is in harmony with the Earth's magnetic field.",
      np: "शौचालय प्रयोग गर्दा उत्तर-दक्षिण तिर फर्कनुहोस्। आदर्श पङ्क्ति उत्तर-दक्षिण दिशा हो, जुन पृथ्वीको चुम्बकीय क्षेत्रसँग सामञ्जस्यमा हुन्छ।",
    },
    tips: [
      { en: "Place bathroom in West or Northwest", np: "पश्चिम वा उत्तर-पश्चिममा बाथरूम राख्नुहोस्" },
      { en: "Ensure exhaust fan for ventilation", np: "भेन्टिलेसनको लागि एक्जस्ट फ्यान राख्नुहोस्" },
      { en: "Keep bathroom clean and dry at all times", np: "बाथरूम सधैं सफा र सुख्खा राख्नुहोस्" },
      { en: "Use light-colored tiles (white, cream, light blue)", np: "हल्का रङका टाइल्स प्रयोग गर्नुहोस्" },
      { en: "Keep door closed when not in use", np: "प्रयोगमा नहुँदा ढोका बन्द राख्नुहोस्" },
    ],
    avoid: [
      { en: "No toilet in Northeast (Ishan) corner", np: "उत्तर-पूर्व (ईशान) कुनामा शौचालय नबनाउनुहोस्" },
      { en: "Avoid toilet in Southeast (fire zone)", np: "दक्षिण-पूर्व (आगो क्षेत्र) मा शौचालय नबनाउनुहोस्" },
      { en: "No toilet adjacent to pooja room", np: "पूजा कोठाको छेउमा शौचालय नबनाउनुहोस्" },
      { en: "Don't attach bathroom to kitchen wall", np: "भान्साको पर्खालमा बाथरूम नजोड्नुहोस्" },
      { en: "Avoid toilet in center of house (Brahmasthan)", np: "घरको केन्द्र (ब्रह्मस्थान) मा शौचालय नबनाउनुहोस्" },
    ],
  },
  "study-room": {
    idealDirection: {
      en: "East, North, or Northeast direction. The study room should face East or North, as these directions enhance concentration, memory, and intellectual capabilities. Northeast is also highly beneficial for meditation and deep study.",
      np: "पूर्व (East), उत्तर (North) वा उत्तर-पूर्व (Northeast) दिशा। अध्ययन कोठा पूर्व वा उत्तरतिर हुनुपर्छ, किनकि यी दिशाहरूले एकाग्रता, स्मरण शक्ति र बौद्धिक क्षमताहरू बढाउँछन्। उत्तर-पूर्व ध्यान र गहिरो अध्ययनको लागि पनि अत्यन्त लाभदायक छ।",
    },
    facingDirection: {
      en: "Face East or North while studying. Facing East while studying improves memory retention and concentration. North direction enhances wisdom and knowledge acquisition.",
      np: "पढ्दा पूर्व (East) वा उत्तर (North) तिर मुख गर्नुहोस्। पूर्वतिर मुख गरेर पढ्दा स्मरण शक्ति र एकाग्रतामा सुधार हुन्छ। उत्तर दिशाले बुद्धि र ज्ञान अर्जनलाई बढाउँछ।",
    },
    tips: [
      { en: "Place study desk in East or North of room", np: "अध्ययन डेस्क कोठाको पूर्व वा उत्तरमा राख्नुहोस्" },
      { en: "Keep room clutter-free and organized", np: "कोठा अव्यवस्थित-मुक्त र व्यवस्थित राख्नुहोस्" },
      { en: "Use light green or light blue wall colors", np: "हल्का हरियो वा हल्का निलो पर्खाल रङहरू प्रयोग गर्नुहोस्" },
      { en: "Ensure adequate natural light from East windows", np: "पूर्वी झ्यालहरूबाट पर्याप्त प्राकृतिक प्रकाश सुनिश्चित गर्नुहोस्" },
      { en: "Place bookshelves on South or West walls", np: "पुस्तक शेल्फहरू दक्षिण वा पश्चिम पर्खालमा राख्नुहोस्" },
    ],
    avoid: [
      { en: "No study room in Southwest or South", np: "दक्षिण-पश्चिम वा दक्षिणमा अध्ययन कोठा नराख्नुहोस्" },
      { en: "Don't study facing South or West", np: "दक्षिण वा पश्चिमतिर फर्केर नपढ्नुहोस्" },
      { en: "Avoid sleeping in study room", np: "अध्ययन कोठामा नसुत्नुहोस्" },
      { en: "No electronic distractions near study area", np: "अध्ययन क्षेत्रमा इलेक्ट्रोनिक विचलनहरू नराख्नुहोस्" },
    ],
  },
  "guest-room": {
    idealDirection: {
      en: "Northwest direction is ideal for the guest room. The Northwest is ruled by the Air element (Vayu), which is welcoming and provides comfort to guests. An alternative is the North direction.",
      np: "उत्तर-पश्चिम (Northwest) दिशा पाहुना कोठाको लागि आदर्श हो। उत्तर-पश्चिम वायु तत्व (Vayu) द्वारा शासित छ, जसले पाहुनाहरूलाई स्वागत र आराम प्रदान गर्दछ। विकल्पको रूपमा उत्तर दिशा पनि उपयुक्त छ।",
    },
    facingDirection: {
      en: "No specific facing requirement, but bed should be placed along South or West wall for stability.",
      np: "कुनै विशेष अनुहार आवश्यकता छैन, तर स्थिरताको लागि ओछ्यान दक्षिण वा पश्चिम पर्खालमा राख्नुपर्छ।",
    },
    tips: [
      { en: "Place guest room in Northwest direction", np: "पाहुना कोठा उत्तर-पश्चिम दिशामा राख्नुहोस्" },
      { en: "Keep room welcoming with warm colors", np: "न्यानो रङहरूले कोठालाई स्वागतयोग्य राख्नुहोस्" },
      { en: "Provide attached bathroom in West", np: "पश्चिममा संलग्न बाथरूम प्रदान गर्नुहोस्" },
      { en: "Ensure good ventilation and natural light", np: "राम्रो भेन्टिलेसन र प्राकृतिक प्रकाश सुनिश्चित गर्नुहोस्" },
    ],
    avoid: [
      { en: "Avoid guest room in Southwest (reserved for owner)", np: "दक्षिण-पश्चिममा पाहुना कोठा नराख्नुहोस् (मालिकको लागि आरक्षित)" },
      { en: "No guest room in Northeast (sacred zone)", np: "उत्तर-पूर्वमा पाहुना कोठा नराख्नुहोस् (पवित्र क्षेत्र)" },
      { en: "Don't attach guest room toilet to pooja room wall", np: "पूजा कोठाको पर्खालमा पाहुना कोठाको शौचालय नजोड्नुहोस्" },
    ],
  },
  "store-room": {
    idealDirection: {
      en: "South or West direction. The store room should be in the South or West part of the house. These directions are ruled by the Earth element, which is ideal for storage and preservation of goods.",
      np: "दक्षिण (South) वा पश्चिम (West) दिशा। भण्डार कोठा घरको दक्षिण वा पश्चिम भागमा हुनुपर्छ। यी दिशाहरू पृथ्वी तत्वद्वारा शासित छन्, जुन सामानको भण्डारण र संरक्षणको लागि आदर्श हो।",
    },
    facingDirection: {
      en: "No specific facing requirement for store room.",
      np: "भण्डार कोठाको लागि कुनै विशेष अनुहार आवश्यकता छैन।",
    },
    tips: [
      { en: "Place heavy items on South and West sides", np: "भारी वस्तुहरू दक्षिण र पश्चिम तर्फ राख्नुहोस्" },
      { en: "Keep store room organized and clean", np: "भण्डार कोठा व्यवस्थित र सफा राख्नुहोस्" },
      { en: "Ensure proper ventilation to prevent moisture", np: "नमी रोक्नको लागि उचित भेन्टिलेसन सुनिश्चित गर्नुहोस्" },
      { en: "Use shelves on South and West walls", np: "दक्षिण र पश्चिम पर्खालहरूमा शेल्फहरू प्रयोग गर्नुहोस्" },
    ],
    avoid: [
      { en: "No store room in Northeast", np: "उत्तर-पूर्वमा भण्डार कोठा नराख्नुहोस्" },
      { en: "Avoid store room near main entrance", np: "मुख्य ढोका नजिक भण्डार कोठा नराख्नुहोस्" },
      { en: "Don't use store room as living or sleeping space", np: "भण्डार कोठालाई बस्ने वा सुत्ने ठाउँको रूपमा प्रयोग नगर्नुहोस्" },
    ],
  },
};

export const directions: Record<string, DirectionVastu> = {
  north: {
    deity: "Kubera (God of Wealth)",
    element: "Water",
    description: {
      en: "North direction is governed by Kubera, the God of Wealth. This direction is highly auspicious for financial growth and prosperity. The North direction brings abundance, success, and career advancement when properly utilized. It is associated with the Water element, which represents flow and abundance.",
      np: "उत्तर दिशा कुबेर (धनका देवता) द्वारा शासित छ। यो दिशा आर्थिक वृद्धि र समृद्धिको लागि अत्यन्त शुभ छ। उत्तर दिशाले सही रूपमा उपयोग गर्दा प्रचुरता, सफलता र करियर उन्नति ल्याउँछ। यो जल तत्वसँग सम्बन्धित छ, जसले प्रवाह र प्रचुरतालाई प्रतिनिधित्व गर्दछ।",
    },
    recommended: [
      { en: "Main entrance in North is highly auspicious", np: "उत्तरमा मुख्य ढोका अत्यन्त शुभ छ" },
      { en: "Best for living room and study room", np: "बस्ने कोठा र अध्ययन कोठाको लागि उत्तम" },
      { en: "Ideal for water elements (fountains, tanks)", np: "पानी तत्वहरूको लागि आदर्श (फाउन्टेन, ट्याङ्की)" },
      { en: "Keep this area open and clutter-free", np: "यस क्षेत्रलाई खुला र अव्यवस्थित-मुक्त राख्नुहोस्" },
      { en: "Good for placing heavy items in Northwest of this zone", np: "यस क्षेत्रको उत्तर-पश्चिममा भारी वस्तुहरू राख्नुहोस्" },
    ],
    avoid: [
      { en: "No heavy structures blocking North side", np: "उत्तर तर्फ भारी संरचनाहरू नराख्नुहोस्" },
      { en: "No toilet or bathroom in North zone", np: "उत्तर क्षेत्रमा शौचालय वा स्नानघर नबनाउनुहोस्" },
      { en: "Avoid dark and heavy colors", np: "गाढा र भारी रङहरू प्रयोग नगर्नुहोस्" },
      { en: "No bedroom in North direction", np: "उत्तर दिशामा शयनकक्ष नराख्नुहोस्" },
      { en: "Avoid kitchen in North zone", np: "उत्तर क्षेत्रमा भान्सा नराख्नुहोस्" },
    ],
  },
  northeast: {
    deity: "Ishana (Lord Shiva)",
    element: "Water & Space",
    description: {
      en: "Northeast (Ishan) is the most sacred direction in Vastu Shastra, ruled by Ishana (Lord Shiva). This direction is the source of all positive cosmic energy. The Northeast corner must be kept open, clean, and light. It represents the Water and Space elements and is ideal for spiritual activities like prayer and meditation.",
      np: "उत्तर-पूर्व (ईशान) वास्तु शास्त्रको सबैभन्दा पवित्र दिशा हो, जुन ईशान (भगवान शिव) द्वारा शासित छ। यो दिशा सबै सकारात्मक ब्रह्माण्डीय उर्जाको स्रोत हो। उत्तर-पूर्व कुनालाई खुला, सफा र हल्का राख्नुपर्छ। यसले जल र आकाश तत्वहरूको प्रतिनिधित्व गर्दछ र प्रार्थना र ध्यान जस्ता आध्यात्मिक गतिविधिहरूको लागि आदर्श हो।",
    },
    recommended: [
      { en: "Best location for pooja room and meditation", np: "पूजा कोठा र ध्यानको लागि उत्तम स्थान" },
      { en: "Ideal for underground water tanks and wells", np: "भूमिगत पानी ट्याङ्की र इनारहरूको लागि आदर्श" },
      { en: "Keep this corner open with maximum openings", np: "यस कुनालाई अधिकतम खुल्ला ठाउँसहित खुला राख्नुहोस्" },
      { en: "Use light colors and natural materials", np: "हल्का रङ र प्राकृतिक सामग्रीहरू प्रयोग गर्नुहोस्" },
      { en: "Best for garden, open space, and courtyard", np: "बगैंचा, खुला ठाउँ र आँगनको लागि उत्तम" },
    ],
    avoid: [
      { en: "No toilet or bathroom ever in Northeast", np: "उत्तर-पूर्वमा कहिल्यै शौचालय वा स्नानघर नबनाउनुहोस्" },
      { en: "No kitchen in Northeast", np: "उत्तर-पूर्वमा भान्सा नराख्नुहोस्" },
      { en: "No bedroom or master bedroom", np: "शयनकक्ष वा मास्टर बेडरूम नराख्नुहोस्" },
      { en: "No heavy structures or storage", np: "भारी संरचना वा भण्डारण नराख्नुहोस्" },
      { en: "Avoid septic tanks, garbage, or dirty items", np: "सेप्टिक ट्याङ्की, फोहोर वा फोहोर वस्तुहरू नराख्नुहोस्" },
    ],
  },
  east: {
    deity: "Indra (King of Gods)",
    element: "Sun / Fire",
    description: {
      en: "East direction is ruled by Indra, the King of Gods, and is associated with the rising Sun. This direction brings vitality, health, and prosperity. The East represents new beginnings, knowledge, and enlightenment. It is one of the most important and auspicious directions in Vastu.",
      np: "पूर्व दिशा इन्द्र (देवताहरूको राजा) द्वारा शासित छ र उदाउँदो सूर्यसँग सम्बन्धित छ। यो दिशाले जीवनशक्ति, स्वास्थ्य र समृद्धि ल्याउँछ। पूर्वले नयाँ सुरुवात, ज्ञान र ज्ञानको प्रतिनिधित्व गर्दछ। यो वास्तुको सबैभन्दा महत्त्वपूर्ण र शुभ दिशाहरू मध्ये एक हो।",
    },
    recommended: [
      { en: "Main entrance in East is very auspicious", np: "पूर्वमा मुख्य ढोका धेरै शुभ छ" },
      { en: "Best for windows and openings for morning sunlight", np: "बिहानको सूर्यको प्रकाशको लागि झ्यालहरूको लागि उत्तम" },
      { en: "Ideal for living room and study room", np: "बस्ने कोठा र अध्ययन कोठाको लागि आदर्श" },
      { en: "Best for open verandas and balconies", np: "खुला बरामदा र बालकनीहरूको लागि उत्तम" },
      { en: "Keep this side with more open space", np: "यस तर्फ अधिक खुला ठाउँ राख्नुहोस्" },
    ],
    avoid: [
      { en: "No bedroom in East", np: "पूर्वमा शयनकक्ष नराख्नुहोस्" },
      { en: "No toilet in East direction", np: "पूर्व दिशामा शौचालय नबनाउनुहोस्" },
      { en: "Avoid blocking East with tall structures", np: "अग्लो संरचनाहरूले पूर्व नछोप्नुहोस्" },
      { en: "No heavy storage in East", np: "पूर्वमा भारी भण्डारण नराख्नुहोस्" },
      { en: "Avoid dark or heavy walls on East side", np: "पूर्व तर्फ गाढा वा भारी पर्खालहरू नराख्नुहोस्" },
    ],
  },
  southeast: {
    deity: "Agni (God of Fire)",
    element: "Fire (Agni)",
    description: {
      en: "Southeast direction is governed by Agni, the God of Fire. This direction is the zone of the Fire element and is therefore the most suitable location for the kitchen. The Southeast direction represents energy, transformation, and vitality. Proper use of this direction brings health, strength, and prosperity.",
      np: "दक्षिण-पूर्व दिशा अग्नि (आगोका देवता) द्वारा शासित छ। यो दिशा आगो तत्वको क्षेत्र हो र त्यसैले भान्साको लागि सबैभन्दा उपयुक्त स्थान हो। दक्षिण-पूर्व दिशाले उर्जा, परिवर्तन र जीवनशक्तिलाई प्रतिनिधित्व गर्दछ। यस दिशाको सही प्रयोगले स्वास्थ्य, शक्ति र समृद्धि ल्याउँछ।",
    },
    recommended: [
      { en: "Ideal location for kitchen (Agni zone)", np: "भान्साको लागि आदर्श स्थान (अग्नि क्षेत्र)" },
      { en: "Best for electrical appliances and equipment", np: "विद्युतीय उपकरणहरूको लागि उत्तम" },
      { en: "Place cooking stove in Southeast", np: "चुल्हो दक्षिण-पूर्वमा राख्नुहोस्" },
      { en: "Use warm colors like red, orange, pink", np: "रातो, सुन्तला, गुलाबी जस्ता न्यानो रङहरू प्रयोग गर्नुहोस्" },
      { en: "Good for placing electrical panels and meters", np: "विद्युतीय प्यानल र मिटरहरूको लागि राम्रो" },
    ],
    avoid: [
      { en: "No bedroom or master bedroom", np: "शयनकक्ष वा मास्टर बेडरूम नराख्नुहोस्" },
      { en: "No toilet or bathroom in Southeast", np: "दक्षिण-पूर्वमा शौचालय वा स्नानघर नबनाउनुहोस्" },
      { en: "Avoid water elements (sink, tank) in this zone", np: "यस क्षेत्रमा पानी तत्वहरू नराख्नुहोस्" },
      { en: "No pooja room in Southeast", np: "दक्षिण-पूर्वमा पूजा कोठा नराख्नुहोस्" },
      { en: "Avoid main entrance in Southeast", np: "दक्षिण-पूर्वमा मुख्य ढोका नबनाउनुहोस्" },
    ],
  },
  south: {
    deity: "Yama (God of Death)",
    element: "Earth",
    description: {
      en: "South direction is governed by Yama, the God of death. It provides stability and protection when properly balanced. The South direction is a symbol of strength and endurance. Building high structures in this direction increases the stability of the house. Heavy items and storage are best placed in the South.",
      np: "दक्षिण दिशा यम (मृत्युका देवता) द्वारा शासित छ। यसले स्थिरता र सुरक्षा प्रदान गर्दछ जब सही तरिकाले संतुलित हुन्छ। दक्षिण दिशा शक्ति र सहनशीलताको प्रतीक हो। यस दिशामा अग्लो भवन वा भारी वस्तुहरू राख्दा घरको स्थिरता बढ्छ।",
    },
    recommended: [
      { en: "Best for master bedroom placement", np: "मास्टर बेडरूम राख्नको लागि उत्तम" },
      { en: "Ideal for heavy furniture and storage", np: "भारी फर्नीचर र स्टोरेजको लागि आदर्श" },
      { en: "Good for staircase and structural support", np: "सीढी र संरचनात्मक समर्थनको लागि राम्रो" },
      { en: "Use warm colors like red, orange, brown", np: "रातो, सुन्तला, खैरो जस्ता तातो रङहरू प्रयोग गर्नुहोस्" },
      { en: "Build elevated structures in south direction", np: "दक्षिण दिशामा उचाइ भएको निर्माण गर्नुहोस्" },
      { en: "Keep safe and valuables in this direction", np: "यस दिशामा तिजोरी र मूल्यवान वस्तुहरू राख्नुहोस्" },
    ],
    avoid: [
      { en: "Avoid main entrance in south", np: "दक्षिणमा मुख्य ढोका नबनाउनुहोस्" },
      { en: "No water elements or bathrooms in south", np: "दक्षिण दिशामा पानीका तत्व वा शौचालय नबनाउनुहोस्" },
      { en: "Don't keep this area empty", np: "यस क्षेत्रलाई खाली नराख्नुहोस्" },
      { en: "Avoid light colors in this zone", np: "यस जोनमा हल्का रङहरू प्रयोग नगर्नुहोस्" },
      { en: "Avoid underground tanks or water sources", np: "भूमिगत ट्याङ्की वा पानीको स्रोत नबनाउनुहोस्" },
    ],
  },
  southwest: {
    deity: "Nirriti (Goddess of Destruction)",
    element: "Earth",
    description: {
      en: "Southwest direction is ruled by Nirriti. This direction is extremely important for stability and strength. The heaviest and most elevated parts of the house should be in the Southwest. The master bedroom is ideally located here. This direction is associated with the Earth element and provides grounding and protection.",
      np: "दक्षिण-पश्चिम दिशा निर्ऋति द्वारा शासित छ। यो दिशा स्थिरता र शक्तिको लागि अत्यन्त महत्त्वपूर्ण छ। घरको सबैभन्दा भारी र अग्लो भाग दक्षिण-पश्चिममा हुनुपर्छ। मास्टर बेडरूम आदर्श रूपमा यहाँ राखिन्छ। यो दिशा पृथ्वी तत्वसँग सम्बन्धित छ र आधार र सुरक्षा प्रदान गर्दछ।",
    },
    recommended: [
      { en: "Ideal for master bedroom (owner's room)", np: "मास्टर बेडरूमको लागि आदर्श (मालिकको कोठा)" },
      { en: "Best for heavy storage and almirahs", np: "भारी भण्डारण र अलमारीहरूको लागि उत्तम" },
      { en: "Make this side higher and heavier", np: "यस तर्फ अग्लो र भारी बनाउनुहोस्" },
      { en: "Best for valuables and safe placement", np: "मूल्यवान वस्तु र सुरक्षित स्थानको लागि उत्तम" },
      { en: "Use dark and earthy colors", np: "गाढा र माटोको रङहरू प्रयोग गर्नुहोस्" },
    ],
    avoid: [
      { en: "No kitchen in Southwest", np: "दक्षिण-पश्चिममा भान्सा नराख्नुहोस्" },
      { en: "No toilet or bathroom in Southwest", np: "दक्षिण-पश्चिममा शौचालय वा स्नानघर नबनाउनुहोस्" },
      { en: "No main entrance in Southwest", np: "दक्षिण-पश्चिममा मुख्य ढोका नबनाउनुहोस्" },
      { en: "Avoid water elements (fountains, tanks)", np: "पानी तत्वहरू नराख्नुहोस्" },
      { en: "Don't keep this area open or empty", np: "यस क्षेत्रलाई खुला वा खाली नराख्नुहोस्" },
      { en: "No borewell or underground tank", np: "बोरवेल वा भूमिगत ट्याङ्की नबनाउनुहोस्" },
    ],
  },
  west: {
    deity: "Varuna (God of Water)",
    element: "Water",
    description: {
      en: "West direction is governed by Varuna, the God of Water. This direction is associated with prosperity, fame, and social recognition. The West is suitable for dining rooms, children's bedrooms, and storage. Properly utilizing the West direction brings success, reputation, and material comforts.",
      np: "पश्चिम दिशा वरुण (पानीका देवता) द्वारा शासित छ। यो दिशा समृद्धि, प्रसिद्धि र सामाजिक मान्यतासँग सम्बन्धित छ। पश्चिम खाना कक्ष, बच्चाको शयनकक्ष र भण्डारणको लागि उपयुक्त छ। पश्चिम दिशाको सही उपयोगले सफलता, प्रतिष्ठा र भौतिक आराम ल्याउँछ।",
    },
    recommended: [
      { en: "Good for dining room and children's bedrooms", np: "खाना कक्ष र बच्चाको शयनकक्षको लागि राम्रो" },
      { en: "Ideal for store room and storage", np: "भण्डार कोठा र भण्डारणको लागि आदर्श" },
      { en: "Best for toilets and bathrooms", np: "शौचालय र स्नानघरको लागि उत्तम" },
      { en: "Suitable for staircase placement", np: "सीढी राख्नको लागि उपयुक्त" },
      { en: "Keep this side moderately built", np: "यस तर्फ मध्यम रूपमा निर्मित राख्नुहोस्" },
    ],
    avoid: [
      { en: "No main entrance in West", np: "पश्चिममा मुख्य ढोका नबनाउनुहोस्" },
      { en: "Avoid kitchen in West direction", np: "पश्चिम दिशामा भान्सा नराख्नुहोस्" },
      { en: "No pooja room in West", np: "पश्चिममा पूजा कोठा नराख्नुहोस्" },
      { en: "Avoid underground water tanks in West", np: "पश्चिममा भूमिगत पानी ट्याङ्की नराख्नुहोस्" },
    ],
  },
  northwest: {
    deity: "Vayu (God of Air)",
    element: "Air (Vayu)",
    description: {
      en: "Northwest direction is governed by Vayu, the God of Air. This direction represents movement, communication, and social connections. The Northwest is ideal for guest rooms, children's bedrooms, and vehicle parking. It is associated with the Air element, bringing fresh energy and dynamic interactions.",
      np: "उत्तर-पश्चिम दिशा वायु (हावाका देवता) द्वारा शासित छ। यो दिशाले आवागमन, सञ्चार र सामाजिक सम्बन्धहरूको प्रतिनिधित्व गर्दछ। उत्तर-पश्चिम पाहुना कोठा, बच्चाको शयनकक्ष र सवारी पार्किङको लागि आदर्श हो। यो वायु तत्वसँग सम्बन्धित छ, जसले ताजा उर्जा र गतिशील अन्तरक्रिया ल्याउँछ।",
    },
    recommended: [
      { en: "Ideal for guest room and children's bedroom", np: "पाहुना कोठा र बच्चाको शयनकक्षको लागि आदर्श" },
      { en: "Best for vehicle parking and garage", np: "सवारी पार्किङ र ग्यारेजको लागि उत्तम" },
      { en: "Good for toilet and bathroom placement", np: "शौचालय र स्नानघर राख्नको लागि राम्रो" },
      { en: "Suitable for secondary kitchen", np: "माध्यमिक भान्साको लागि उपयुक्त" },
      { en: "Keep this area lightweight and airy", np: "यस क्षेत्रलाई हल्का र हावादार राख्नुहोस्" },
    ],
    avoid: [
      { en: "No master bedroom in Northwest", np: "उत्तर-पश्चिममा मास्टर बेडरूम नराख्नुहोस्" },
      { en: "No main entrance in Northwest", np: "उत्तर-पश्चिममा मुख्य ढोका नबनाउनुहोस्" },
      { en: "Avoid heavy structures in Northwest", np: "उत्तर-पश्चिममा भारी संरचनाहरू नराख्नुहोस्" },
      { en: "No pooja room in Northwest", np: "उत्तर-पश्चिममा पूजा कोठा नराख्नुहोस्" },
      { en: "Avoid underground storage or heavy items", np: "भूमिगत भण्डारण वा भारी वस्तुहरू नराख्नुहोस्" },
    ],
  },
};

export const sections: Record<string, SectionData> = {
  overview: {
    title: "Vastu Shastra Overview",
    titleNp: "वास्तु शास्त्र सिंहावलोकन",
    content: [
      {
        en: "Vastu Shastra is an ancient Indian science of architecture and building design that dates back thousands of years. The word 'Vastu' means 'dwelling' and 'Shastra' means 'science' or 'knowledge'. It provides guidelines for designing and building structures in harmony with natural laws and cosmic energies.",
        np: "वास्तु शास्त्र एक प्राचीन भारतीय वास्तुकला र भवन डिजाइनको विज्ञान हो जुन हजारौं वर्ष पुरानो हो। 'वास्तु' शब्दको अर्थ 'आवास' र 'शास्त्र' को अर्थ 'विज्ञान' वा 'ज्ञान' हो। यसले प्राकृतिक नियम र ब्रह्माण्डीय उर्जाहरूसँग सामञ्जस्यमा संरचनाहरू डिजाइन र निर्माण गर्नका लागि दिशानिर्देशहरू प्रदान गर्दछ।",
      },
      {
        en: "The core principle of Vastu Shastra is that our built environment affects our physical, mental, and spiritual well-being. A Vastu-compliant home or building promotes health, prosperity, happiness, and peace for its inhabitants. Conversely, Vastu defects (Doshas) can lead to various problems in life.",
        np: "वास्तु शास्त्रको मूल सिद्धान्त यो हो कि हाम्रो निर्मित वातावरणले हाम्रो शारीरिक, मानसिक र आध्यात्मिक कल्याणलाई असर गर्छ। वास्तु-अनुरूप घर वा भवनले यसका बासिन्दाहरूको लागि स्वास्थ्य, समृद्धि, खुशी र शान्तिलाई बढावा दिन्छ। यसको विपरीत, वास्तु दोषहरूले जीवनमा विभिन्न समस्याहरू निम्त्याउन सक्छ।",
      },
      {
        en: "Vastu is based on five fundamental elements (Panchabhutas): Earth (Prithvi), Water (Jal), Fire (Agni), Air (Vayu), and Space (Akash). These elements are harmonized through proper orientation, proportion, and placement of rooms, doors, windows, and furniture.",
        np: "वास्तु पाँच आधारभूत तत्वहरू (पञ्चभूत) मा आधारित छ: पृथ्वी (Earth), जल (Water), अग्नि (Fire), वायु (Air), र आकाश (Space)। यी तत्वहरू कोठा, ढोका, झ्याल र फर्नीचरको उचित अभिमुखीकरण, अनुपात र स्थानको माध्यमबाट सन्तुलित हुन्छन्।",
      },
    ],
  },
  elements: {
    title: "Five Elements & Principles",
    titleNp: "पाँच तत्व र सिद्धान्त",
    content: [
      {
        en: "The five elements (Panchabhutas) form the foundation of Vastu Shastra. Each element governs specific directions and aspects of life, and must be balanced in any built structure.",
        np: "पाँच तत्वहरू (पञ्चभूत) वास्तु शास्त्रको जग हो। प्रत्येक तत्वले विशिष्ट दिशा र जीवनका पक्षहरूको शासन गर्दछ, र कुनै पनि निर्मित संरचनामा सन्तुलित हुनुपर्छ।",
      },
      {
        en: "Earth (Prithvi - South-West): Represents stability, patience, and endurance. The heaviest and most solid elements of the house should be in the South-West direction. Master bedroom, heavy furniture, and storage are ideal in this zone.",
        np: "पृथ्वी (Prithvi - दक्षिण-पश्चिम): स्थिरता, धैर्य र सहनशीलताको प्रतिनिधित्व गर्दछ। घरको सबैभन्दा भारी र ठोस तत्वहरू दक्षिण-पश्चिम दिशामा हुनुपर्छ। मास्टर बेडरूम, भारी फर्नीचर र भण्डारण यस क्षेत्रको लागि आदर्श हो।",
      },
      {
        en: "Water (Jal - North-East): Represents flow, purity, and prosperity. Water elements like tanks, wells, and fountains should be in the North-East direction. This area must be kept open, clean, and clutter-free.",
        np: "जल (Jal - उत्तर-पूर्व): प्रवाह, शुद्धता र समृद्धिको प्रतिनिधित्व गर्दछ। ट्याङ्की, इनार र फाउन्टेन जस्ता पानी तत्वहरू उत्तर-पूर्व दिशामा हुनुपर्छ। यस क्षेत्रलाई खुला, सफा र अव्यवस्थित-मुक्त राख्नुपर्छ।",
      },
      {
        en: "Fire (Agni - South-East): Represents energy, transformation, and vitality. The kitchen should be in the South-East direction. Electrical appliances and the cooking stove are best placed in this zone.",
        np: "अग्नि (Agni - दक्षिण-पूर्व): उर्जा, परिवर्तन र जीवनशक्तिको प्रतिनिधित्व गर्दछ। भान्सा दक्षिण-पूर्व दिशामा हुनुपर्छ। विद्युतीय उपकरण र चुल्हो यस क्षेत्रमा राख्नु उत्तम हुन्छ।",
      },
      {
        en: "Air (Vayu - North-West): Represents movement, communication, and freshness. Guest rooms, children's rooms, and parking areas are ideal in the North-West direction. This zone should be light and airy.",
        np: "वायु (Vayu - उत्तर-पश्चिम): आवागमन, सञ्चार र ताजगीको प्रतिनिधित्व गर्दछ। पाहुना कोठा, बच्चाको कोठा र पार्किङ क्षेत्र उत्तर-पश्चिम दिशामा आदर्श हो। यो क्षेत्र हल्का र हावादार हुनुपर्छ।",
      },
      {
        en: "Space (Akash - Center/Brahmasthan): Represents the cosmic void and spiritual energy. The center of the house (Brahmasthan) must be kept open and free of any construction, pillars, or heavy objects. This allows positive cosmic energy to flow freely throughout the home.",
        np: "आकाश (Akash - केन्द्र/ब्रह्मस्थान): ब्रह्माण्डीय शून्यता र आध्यात्मिक उर्जाको प्रतिनिधित्व गर्दछ। घरको केन्द्र (ब्रह्मस्थान) खुला र कुनै पनि निर्माण, स्तम्भ वा भारी वस्तुहरूबाट मुक्त राख्नुपर्छ। यसले सकारात्मक ब्रह्माण्डीय उर्जा घरभरि स्वतन्त्र रूपमा प्रवाह गर्न अनुमति दिन्छ।",
      },
    ],
  },
  land: {
    title: "Land Selection & Preparation",
    titleNp: "जग्गा चयन र तयारी",
    content: [
      {
        en: "Choosing the right plot of land is the first and most crucial step in Vastu-compliant construction. The shape, size, slope, and surroundings of the land all affect the Vastu energy of the building.",
        np: "सही जग्गाको छनोट वास्तु-अनुरूप निर्माणको पहिलो र सबैभन्दा महत्त्वपूर्ण कदम हो। जग्गाको आकार, नाप, ढलान र वरपरको वातावरण सबैले भवनको वास्तु उर्जालाई असर गर्छ।",
      },
      {
        en: "Ideal Plot Shapes: Square and rectangular plots are considered most auspicious. Plots with North or East sides longer than South or West sides are favorable. Irregular shapes like L-shaped or triangular plots should be corrected with Vastu remedies.",
        np: "आदर्श प्लट आकार: वर्ग र आयताकार प्लटहरू सबैभन्दा शुभ मानिन्छन्। दक्षिण वा पश्चिम भन्दा उत्तर वा पूर्व तर्फ लामो भएको प्लटहरू अनुकूल हुन्छन्। एल-आकार वा त्रिकोणीय प्लट जस्ता अनियमित आकारहरू वास्तु उपचारले सच्याउनुपर्छ।",
      },
      {
        en: "Land Slope: The land should slope toward the North, East, or Northeast direction. Slope toward South or West is considered inauspicious as it can lead to financial and health problems.",
        np: "जग्गाको ढलान: जग्गा उत्तर, पूर्व वा उत्तर-पूर्व दिशातिर ढल्कनुपर्छ। दक्षिण वा पश्चिमतिरको ढलान अशुभ मानिन्छ किनकि यसले आर्थिक र स्वास्थ्य समस्याहरू निम्त्याउन सक्छ।",
      },
      {
        en: "Soil Quality: The soil should be fertile and well-draining. Dig a small pit and refill it — if there is some soil left over after refilling, it's considered good soil. Underground water should be at least 10-12 feet deep.",
        np: "माटोको गुणस्तर: माटो उर्वर र राम्रो निकास भएको हुनुपर्छ। सानो खाडल खनेर पुन: भर्नुहोस् — पुन: भर्दा केही माटो बाँकी रह्यो भने, यो राम्रो माटो मानिन्छ। भूमिगत पानी कम्तीमा १०-१२ फिट गहिरो हुनुपर्छ।",
      },
      {
        en: "Surroundings: Avoid plots near cemeteries, hospitals, temples (directly opposite), electrical substations, or sewage treatment plants. Plots with roads on the North or East side are favorable.",
        np: "वरपरको वातावरण: श्मशान घाट, अस्पताल, मन्दिर (सीधा विपरीत), विद्युत उपकेन्द्र वा ढल प्रशोधन प्लान्ट नजिकको प्लटहरूबाट बच्नुहोस्। उत्तर वा पूर्व तर्फ सडक भएको प्लटहरू अनुकूल हुन्छन्।",
      },
    ],
  },
  entrance: {
    title: "Doors & Main Entrance",
    titleNp: "ढोका र मुख्य प्रवेशद्वार",
    content: [
      {
        en: "The main entrance (Main Door) is the most important element of a Vastu-compliant home. It is the gateway for cosmic energy (Prana) to enter the house. The design, direction, size, and placement of the main door significantly impact the residents' lives.",
        np: "मुख्य प्रवेशद्वार (मुख्य ढोका) वास्तु-अनुरूप घरको सबैभन्दा महत्तपूर्ण तत्व हो। यो ब्रह्माण्डीय उर्जा (प्राण) घरमा प्रवेश गर्ने ढोका हो। मुख्य ढोकाको डिजाइन, दिशा, आकार र स्थानले बासिन्दाहरूको जीवनमा महत्त्वपूर्ण प्रभाव पार्दछ।",
      },
      {
        en: "Best Entrance Directions: North and East are the most auspicious directions for the main entrance. Northeast is also considered highly favorable. South and West entrances are generally avoided. Southwest entrance is the least desirable.",
        np: "उत्तम प्रवेश दिशाहरू: उत्तर र पूर्व मुख्य प्रवेशद्वारको लागि सबैभन्दा शुभ दिशाहरू हुन्। उत्तर-पूर्व पनि अत्यन्त अनुकूल मानिन्छ। दक्षिण र पश्चिम प्रवेश सामान्यतया बेवास्ता गरिन्छ। दक्षिण-पश्चिम प्रवेश सबैभन्दा कम वांछनीय छ।",
      },
      {
        en: "Door Specifications: The main door should be the largest door in the house, made of solid wood. It should have two doors (double-leaf door) opening inward. Auspicious symbols like Swastika, Om, or footprints of Goddess Lakshmi should be carved or placed on the door.",
        np: "ढोका विशिष्टताहरू: मुख्य ढोका घरको सबैभन्दा ठूलो ढोका हुनुपर्छ, ठोस काठले बनेको। यसका दुई ढोका (डबल-लीफ ढोका) भित्रतिर खोलिने हुनुपर्छ। स्वस्तिक, ॐ वा देवी लक्ष्मीको पाइला जस्ता शुभ प्रतीकहरू ढोकामा कुँदिएको वा राखिएको हुनुपर्छ।",
      },
      {
        en: "Additional Doors: Windows and doors in the Northeast should be larger than those in the Southwest. The number of doors and windows should be even (2, 4, 6, etc.). Avoid doors that creak or make noise. The threshold (door step) should be slightly elevated.",
        np: "अतिरिक्त ढोकाहरू: उत्तर-पूर्वमा झ्याल र ढोकाहरू दक्षिण-पश्चिम भन्दा ठूला हुनुपर्छ। ढोका र झ्यालहरूको संख्या जोर (२, ४, ६, आदि) हुनुपर्छ। चिच्याउने वा आवाज गर्ने ढोकाहरूबाट बच्नुहोस्। ढलान (ढोकाको पाइला) थोरै उच्च हुनुपर्छ।",
      },
    ],
  },
  "room-placement": {
    title: "Room Placement Guide",
    titleNp: "कोठा स्थान गाइड",
    content: [
      {
        en: "The placement of rooms within a house is critical to Vastu harmony. Each room serves a specific purpose and must be located in the appropriate direction to maximize its benefits.",
        np: "घर भित्र कोठाहरूको स्थान वास्तु सद्भावको लागि महत्त्वपूर्ण छ। प्रत्येक कोठाले एक विशिष्ट उद्देश्य प्रदान गर्दछ र यसको लाभहरू अधिकतम बनाउन उपयुक्त दिशामा स्थित हुनुपर्छ।",
      },
      {
        en: "Center (Brahmasthan): Keep completely open and free of rooms, pillars, walls, and heavy objects. This is the heart of the home where cosmic energy flows. No rooms, toilets, or kitchens should be built in the center.",
        np: "केन्द्र (ब्रह्मस्थान): पूर्ण रूपमा खुला र कोठा, स्तम्भ, पर्खाल र भारी वस्तुहरूबाट मुक्त राख्नुहोस्। यो घरको मुटु हो जहाँ ब्रह्माण्डीय उर्जा प्रवाह हुन्छ। केन्द्रमा कुनै कोठा, शौचालय वा भान्सा निर्माण नगर्नुहोस्।",
      },
      {
        en: "Master Bedroom: South-West corner is ideal. This provides stability and strength to the head of the family. Bed should be placed in the South or West part of the room with the head toward South.",
        np: "मास्टर बेडरूम: दक्षिण-पश्चिम कुना आदर्श हो। यसले परिवारको मुखियालाई स्थिरता र शक्ति प्रदान गर्दछ। ओछ्यान कोठाको दक्षिण वा पश्चिम भागमा टाउको दक्षिणतिर राख्नुपर्छ।",
      },
      {
        en: "Children's Bedroom: West or North-West is best for children as it fosters creativity and growth. Study desk should be placed in East or North of the room. Avoid South-West for children.",
        np: "बच्चाको शयनकक्ष: पश्चिम वा उत्तर-पश्चिम बच्चाहरूको लागि उत्तम हो किनकि यसले सृजनशीलता र वृद्धिलाई बढावा दिन्छ। अध्ययन डेस्क कोठाको पूर्व वा उत्तरमा राख्नुपर्छ। बच्चाहरूको लागि दक्षिण-पश्चिमबाट बच्नुहोस्।",
      },
      {
        en: "Kitchen: South-East corner (Agni zone). The person cooking should face East. Sink should be in the North-East part of the kitchen. Avoid kitchen in North-East (Ishan) and South-West.",
        np: "भान्सा: दक्षिण-पूर्व कुना (अग्नि क्षेत्र)। पकाउने व्यक्ति पूर्वतिर फर्कनुपर्छ। भान्साको उत्तर-पूर्व भागमा सिंक हुनुपर्छ। उत्तर-पूर्व (ईशान) र दक्षिण-पश्चिममा भान्साबाट बच्नुहोस्।",
      },
      {
        en: "Pooja Room: North-East corner (Ishan). The most sacred space in the home. Should be on the ground floor, clean, well-lit, and peaceful. No pooja room under stairs or adjacent to toilet.",
        np: "पूजा कोठा: उत्तर-पूर्व कुना (ईशान)। घरको सबैभन्दा पवित्र स्थान। भुइँ तलामा, सफा, उज्यालो र शान्त हुनुपर्छ। सिँढी मुनि वा शौचालयको छेउमा पूजा कोठा नराख्नुहोस्।",
      },
      {
        en: "Living Room: North, East, or North-East. Should be spacious with maximum openings toward North and East. Heavy furniture in South or West. TV and electronics in South-East.",
        np: "बस्ने कोठा: उत्तर, पूर्व वा उत्तर-पूर्व। उत्तर र पूर्वतिर अधिकतम खुल्ला ठाउँको साथ फराकिलो हुनुपर्छ। भारी फर्नीचर दक्षिण वा पश्चिममा। टिभी र इलेक्ट्रोनिक्स दक्षिण-पूर्वमा।",
      },
      {
        en: "Dining Room: Near the kitchen, preferably in the West or North-West. The dining table should not be placed against the South-West wall. Family head should face East while eating.",
        np: "खाना कक्ष: भान्साको नजिक, अधिमानतः पश्चिम वा उत्तर-पश्चिममा। खाना टेबल दक्षिण-पश्चिम पर्खालमा राख्नु हुँदैन। खाना खाँदा परिवारको मुखिया पूर्वतिर फर्कनुपर्छ।",
      },
      {
        en: "Bathroom & Toilet: West, North-West, or South-East (only for bathrooms, not toilets). Toilets should be in West or North-West. Toilet seat facing North-South.",
        np: "स्नानघर र शौचालय: पश्चिम, उत्तर-पश्चिम वा दक्षिण-पूर्व (स्नानघरको लागि मात्र, शौचालयको लागि होइन)। शौचालय पश्चिम वा उत्तर-पश्चिममा हुनुपर्छ। शौचालय सिट उत्तर-दक्षिण तर्फ।",
      },
      {
        en: "Staircase: South, West, or South-West of the house. Staircase should not be in the center (Brahmasthan) or North-East. The direction of stairs should be from East to West or North to South.",
        np: "सीढी: घरको दक्षिण, पश्चिम वा दक्षिण-पश्चिम। सीढी केन्द्र (ब्रह्मस्थान) वा उत्तर-पूर्वमा हुनु हुँदैन। सीढीको दिशा पूर्वदेखि पश्चिम वा उत्तरदेखि दक्षिण हुनुपर्छ।",
      },
    ],
  },
  "kitchen-dining": {
    title: "Kitchen & Dining",
    titleNp: "भान्सा र खाना कक्ष",
    content: [
      {
        en: "KITCHEN PLACEMENT: Ideal: Southeast (fire element). Alternative: Northwest. Cook should face East. AVOID Northeast (causes family and financial problems).",
        np: "भान्सा राख्ने ठाउँ: आदर्श: दक्षिण-पूर्व (आगो तत्व)। विकल्प: उत्तर-पश्चिम। पकाउनेले पूर्वतिर मुख गरेर पकाउनुपर्छ। उत्तर-पूर्वबाट टाढा रहनुहोस् (परिवार र आर्थिक समस्याहरू उत्पन्न गर्दछ)।",
      },
      {
        en: "KITCHEN SPECIFICS: Sink with tap water should be in Northeast of kitchen. Sink should not be near the stove (this disrupts peace in the family). Storage shelves should be in South and West walls. Heavy items stored in South and West.",
        np: "भान्साको विशेषताहरू: नलको पानीको सिंक भान्साको उत्तर-पूर्वमा हुनुपर्छ। सिंक चुल्होको नजिक हुनु हुँदैन (यसले परिवारको शान्तिलाई बिथोल्छ)। भण्डारण शेल्फहरू दक्षिण र पश्चिम पर्खालमा हुनुपर्छ। भारी वस्तुहरू दक्षिण र पश्चिममा भण्डारण गर्नुहोस्।",
      },
      {
        en: "DINING ROOM: Should be near the kitchen in Southeast, Northwest, or Northeast. West side encourages profitability. The dining table should be at the center but not toward Southwest.",
        np: "खाना कक्ष: दक्षिण-पूर्व, उत्तर-पश्चिम वा उत्तर-पूर्वमा भान्साको नजिक हुनुपर्छ। पश्चिम तिरले लाभलाई प्रोत्साहन गर्दछ। खाना टेबल केन्द्रमा तर दक्षिण-पश्चिमतिर हुनुहुँदैन।",
      },
      {
        en: "SEATING ARRANGEMENT: The head of the family should face East during meals. Others can face East, West, or North — never South. Square or rectangular tables are preferred over round or oval ones.",
        np: "बस्ने व्यवस्था: परिवारको मुखियाले खाना खाँदा पूर्वतिर मुख गर्नुपर्छ। अरूले पूर्व, पश्चिम वा उत्तरतिर मुख गर्न सक्छन् — कहिल्यै दक्षिणतिर नगर्नुहोस्। वर्ग वा आयताकार टेबललाई गोल या अण्डाकार भन्दा प्राथमिकता दिनुपर्छ।",
      },
      {
        en: "WATER PLACEMENT: Water or wash basin should be in East or North of the dining area — never in Southeast or Southwest. This ensures the balance of water and fire elements.",
        np: "पानीको स्थान: खाना क्षेत्रको पूर्व वा उत्तरमा पानी वा धुने कुण्ड हुनुपर्छ — कहिल्यै दक्षिण-पूर्व वा दक्षिण-पश्चिममा होइन। यसले जल र अग्नि तत्वहरूको सन्तुलन सुनिश्चित गर्दछ।",
      },
      {
        en: "COLORS: Recommended colors for dining area: light blue, yellow, saffron, and light green. These colors stimulate appetite and create a warm, inviting atmosphere for family meals.",
        np: "रङहरू: खाना क्षेत्रको लागि सिफारिस गरिएका रङहरू: हल्का निलो, पहेंलो, केसरी र हल्का हरियो। यी रङहरूले भोक बढाउँछन् र पारिवारिक खानाको लागि न्यानो, आकर्षक वातावरण सिर्जना गर्छन्।",
      },
    ],
  },
};

export const roomOptions = [
  { id: "living-room", label: "Living Room", labelNp: "बस्ने कोठा" },
  { id: "master-bedroom", label: "Master Bedroom", labelNp: "मास्टर बेडरूम" },
  { id: "kids-bedroom", label: "Children's Bedroom", labelNp: "बच्चाको कोठा" },
  { id: "kitchen", label: "Kitchen", labelNp: "भान्सा" },
  { id: "dining-room", label: "Dining Room", labelNp: "खाना कक्ष" },
  { id: "pooja-room", label: "Pooja Room", labelNp: "पूजा कोठा" },
  { id: "bathroom", label: "Bathroom & Toilet", labelNp: "शौचालय" },
  { id: "study-room", label: "Study / Home Office", labelNp: "अध्ययन कोठा" },
  { id: "guest-room", label: "Guest Room", labelNp: "पाहुना कोठा" },
  { id: "store-room", label: "Store Room", labelNp: "भण्डार कोठा" },
];

export const directionOptions = [
  { id: "north", label: "North (उत्तर)", subtitle: "Wealth & Prosperity" },
  { id: "northeast", label: "Northeast (उत्तर-पूर्व)", subtitle: "Spirituality & Peace" },
  { id: "east", label: "East (पूर्व)", subtitle: "Health & Vitality" },
  { id: "southeast", label: "Southeast (दक्षिण-पूर्व)", subtitle: "Energy & Transformation" },
  { id: "south", label: "South (दक्षिण)", subtitle: "Stability & Protection" },
  { id: "southwest", label: "Southwest (दक्षिण-पश्चिम)", subtitle: "Strength & Foundation" },
  { id: "west", label: "West (पश्चिम)", subtitle: "Prosperity & Fame" },
  { id: "northwest", label: "Northwest (उत्तर-पश्चिम)", subtitle: "Movement & Communication" },
];
