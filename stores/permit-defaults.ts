import type { BuildingPermitConfig } from "./admin-store";

export const defaultPermitConfig: BuildingPermitConfig = {
  workflowSteps: [
    {
      num: 1,
      title: { en: "Site Verification", np: "साइट सत्यापन" },
      desc: {
        en: "The municipality verifies your land ownership and conducts an on-site inspection to confirm the location and boundaries of the property.",
        np: "नगरपालिकाले तपाईंको जग्गाको स्वामित्व प्रमाणित गर्दछ र सम्पत्तिको स्थान र सीमा पुष्टि गर्न स्थलगत निरीक्षण गर्दछ।",
      },
      duration: "2–3 days",
      docs: ["Land ownership certificate", "Site photos", "Survey map"],
    },
    {
      num: 2,
      title: { en: "Design Approval", np: "डिजाइन स्वीकृति" },
      desc: {
        en: "Submit architectural and structural designs, along with cadastral extracts and required certifications, to the municipality for approval.",
        np: "नगरपालिकामा स्वीकृतिको लागि वास्तुकला र संरचनात्मक डिजाइन, क्याडस्ट्रल एक्स्ट्र्याक्ट र आवश्यक प्रमाणपत्रहरू पेश गर्नुहोस्।",
      },
      duration: "7–15 days",
      docs: ["Architectural drawings", "Structural drawings", "Plumbing & electrical plans"],
    },
    {
      num: 3,
      title: { en: "15-Day Public Notice", np: "१५ दिने सार्वजनिक सूचना" },
      desc: {
        en: "The Ward Office sends a public notice to the site's neighbors to inform them about the proposed house construction. This notice period lasts 15 days, allowing neighbors to give feedback or objections before approval proceeds. The local inquiry starts after the notice period to finalize consent.",
        np: "वडा कार्यालयले प्रस्तावित घर निर्माणको बारेमा जानकारी गराउन साइटका छिमेकीहरूलाई सार्वजनिक सूचना पठाउँछ। यो सूचना अवधि १५ दिनसम्म रहन्छ, जसले छिमेकीहरूलाई स्वीकृति अघि प्रतिक्रिया वा आपत्ति दिन अनुमति दिन्छ। सहमति अन्तिम रूप दिन सूचना अवधि पछि स्थानीय छानबिन सुरु हुन्छ।",
      },
      duration: "15 days",
      docs: ["Public Notice Form", "Proof of Land Ownership / Title Certificate", "Neighbor Acknowledgment / Consent Form / Commitment letter"],
    },
    {
      num: 4,
      title: { en: "Permit Issuance", np: "अनुमति जारी" },
      desc: {
        en: "After the notice period and local inquiry, the municipality issues the temporary or permanent building permit, allowing construction to proceed up to the plinth level. At least one neighbor must consent, or a commitment letter can be submitted by the builder to handle potential disputes.",
        np: "सूचना अवधि र स्थानीय छानबिन पछि, नगरपालिकाले अस्थायी वा स्थायी भवन अनुमति जारी गर्दछ, जसले प्लिन्थ स्तरसम्म निर्माण अघि बढाउन अनुमति दिन्छ। कम्तीमा एक जना छिमेकीले सहमति दिनुपर्छ, वा सम्भावित विवादहरू ह्यान्डल गर्न बिल्डरद्वारा प्रतिबद्धता पत्र पेश गर्न सकिन्छ।",
      },
      duration: "3–5 days",
      docs: ["Payment receipts", "All approved drawings", "Commitment Letter / Neighbor Consent"],
    },
  ],
  docCategories: [
    {
      label: { en: "Land Documents", np: "जग्गा कागजात" },
      items: [
        { en: "Land ownership certificate (Lalpurja)", np: "जग्गा स्वामित्व प्रमाणपत्र (लालपुर्जा)" },
        { en: "Tax clearance certificate", np: "कर छुट प्रमाणपत्र" },
        { en: "Survey map (Naksha Pass)", np: "सर्भे नक्सा (नक्शा पास)" },
      ],
    },
    {
      label: { en: "Design Documents", np: "डिजाइन कागजात" },
      items: [
        { en: "Site plan", np: "साइट योजना" },
        { en: "Floor plans for all levels", np: "सबै तहको भुइँ योजना" },
        { en: "Elevation drawings (all sides)", np: "उचाइ रेखाचित्र (सबै पक्ष)" },
        { en: "Structural design with calculations", np: "गणना सहित संरचनात्मक डिजाइन" },
        { en: "Plumbing layout", np: "प्लम्बिङ लेआउट" },
        { en: "Electrical layout", np: "विद्युतीय लेआउट" },
      ],
    },
    {
      label: { en: "Legal Documents", np: "कानुनी कागजात" },
      items: [
        { en: "Citizenship certificate of owner", np: "मालिकको नागरिकता प्रमाणपत्र" },
        { en: "Tax clearance certificate", np: "कर छुट प्रमाणपत्र" },
        { en: "Building permit application form", np: "भवन अनुमति आवेदन फारम" },
      ],
    },
    {
      label: { en: "Technical Documents", np: "प्राविधिक कागजात" },
      items: [
        { en: "Structural engineer certificate", np: "संरचनात्मक इन्जिनियर प्रमाणपत्र" },
        { en: "Architect registration certificate", np: "वास्तुविद् दर्ता प्रमाणपत्र" },
        { en: "Construction schedule", np: "निर्माण तालिका" },
        { en: "Building Code Compliance", np: "भवन कोड अनुपालन" },
      ],
    },
  ],
  regulations: [
    {
      title: { en: "Building Height Restrictions", np: "भवन उचाइ प्रतिबन्ध" },
      items: [
        { en: "Maximum 4 floors in residential areas", np: "आवासीय क्षेत्रमा अधिकतम ४ तला" },
        { en: "Maximum 7 floors in commercial areas", np: "व्यावसायिक क्षेत्रमा अधिकतम ७ तला" },
        { en: "Minimum setback: 1.5m from property line", np: "न्यूनतम सेटब्याक: सम्पत्ति रेखाबाट १.५ मिटर" },
        { en: "Floor-to-floor height: 2.75m to 3.35m", np: "भुइँदेखि भुइँको उचाइ: २.७५ मिटर देखि ३.३५ मिटर" },
      ],
    },
    {
      title: { en: "Earthquake Safety (NBC)", np: "भूकम्प सुरक्षा (NBC)" },
      items: [
        { en: "Seismic zone compliant design", np: "भूकम्पीय क्षेत्र अनुरूप डिजाइन" },
        { en: "Reinforced concrete frame required", np: "प्रबलित कंक्रीट फ्रेम आवश्यक" },
        { en: "Shear walls in multi-story buildings", np: "बहु-मञ्जिले भवनहरूमा शियर पर्खाल" },
        { en: "Foundation depth based on soil type", np: "माटोको प्रकारमा आधारित जगको गहिराइ" },
      ],
    },
    {
      title: { en: "Fire Safety Requirements", np: "आगो सुरक्षा आवश्यकताहरू" },
      items: [
        { en: "Fire exits in buildings over 3 stories", np: "३ तला माथिका भवनहरूमा आपतकालीन निकास" },
        { en: "Fire extinguisher on each floor", np: "प्रत्येक तलामा आगो निभाउने यन्त्र" },
        { en: "Smoke detectors in corridors", np: "कोरिडोरहरूमा धुवाँ डिटेक्टर" },
        { en: "Fire-resistant materials for staircases", np: "सिँढीका लागि आगो प्रतिरोधी सामग्री" },
      ],
    },
    {
      title: { en: "Ventilation & Lighting", np: "भेन्टिलेसन र प्रकाश" },
      items: [
        { en: "Minimum 10% of floor area as windows", np: "भुइँ क्षेत्रफलको न्यूनतम १०% झ्याल" },
        { en: "Cross-ventilation in all rooms", np: "सबै कोठामा क्रस-भेन्टिलेसन" },
        { en: "Bathrooms must have exhaust fans", np: "बाथरूममा एक्जस्ट फ्यान हुनुपर्छ" },
        { en: "Natural light in habitable rooms required", np: "बस्न योग्य कोठाहरूमा प्राकृतिक प्रकाश आवश्यक" },
      ],
    },
  ],
  municipalities: [
    { name: "Butwal Sub-Metropolitan", district: "Butwal", phone: "071-540294" },
    { name: "Bhairahawa Municipality", district: "Rupandehi", phone: "071-520145" },
    { name: "Tilottama Municipality", district: "Rupandehi", phone: "071-590123" },
    { name: "Siddharthanagar Municipality", district: "Rupandehi", phone: "071-520145" },
  ],
};
