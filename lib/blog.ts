export interface BlogContentBlock {
  type: "heading" | "paragraph" | "image" | "quote" | "list" | "subheading";
  value?: string;
  items?: string[];
  caption?: string;
  src?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  author: string;
  authorRole: string;
  authorImage: string;
  content: BlogContentBlock[];
}

export const posts: BlogPost[] = [
  {
    slug: "the-future-of-sustainable-architecture-in-nepal",
    title: "The Future of Sustainable Architecture in Nepal",
    excerpt: "Exploring how eco-friendly design practices are transforming the construction landscape across the country.",
    category: "Architecture",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    date: "May 15, 2026",
    author: "Ar. Sagar Thapa",
    authorRole: "Senior Architect",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    content: [
      { type: "paragraph", value: "Nepal stands at a crossroads. As the country rebuilds and expands its urban centres, the choices we make today will shape its built environment for generations. Sustainable architecture is no longer a luxury — it is a necessity." },
      { type: "heading", value: "Why Sustainability Matters in Nepal" },
      { type: "paragraph", value: "With rapid urbanisation, rising energy costs, and the growing impact of climate change, Nepali architects and builders are turning to sustainable design principles. From passive solar orientation to locally sourced materials, the shift is both practical and philosophical." },
      { type: "quote", value: "Sustainable architecture isn't about adding expensive green technology. It's about designing intelligently — working with the climate, not against it." },
      { type: "subheading", value: "Key Principles" },
      { type: "list", items: [
        "Passive solar design — orienting buildings to maximise natural light and heat",
        "Local materials — using stone, timber, and earth that reduce transport emissions",
        "Rainwater harvesting — integrating collection systems into building design",
        "Natural ventilation — designing for airflow instead of mechanical cooling",
        "Green roofs — insulating buildings while managing stormwater runoff",
      ]},
      { type: "image", src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80", caption: "A modern sustainable home in the Kathmandu Valley" },
      { type: "heading", value: "The Role of Traditional Knowledge" },
      { type: "paragraph", value: "Nepal has a rich tradition of climate-responsive architecture. Newari townhouses with their narrow windows and brick lattices, or the sloped roofs of Himalayan villages — these are not just aesthetic choices. They are centuries-old solutions to local climate challenges." },
      { type: "paragraph", value: "Modern sustainable architecture in Nepal is rediscovering these principles and combining them with contemporary materials and engineering. The result is a uniquely Nepali form of modern architecture that is both beautiful and responsible." },
      { type: "heading", value: "Looking Ahead" },
      { type: "paragraph", value: "As more clients demand green buildings and as regulations evolve, sustainable architecture will become the standard rather than the exception. For architects and builders in Nepal, this is an opportunity to lead — creating buildings that honour both the environment and the rich cultural heritage of the country." },
    ],
  },
  {
    slug: "top-5-things-to-consider-before-building-your-dream-home",
    title: "Top 5 Things to Consider Before Building Your Dream Home",
    excerpt: "A practical guide to budgeting, site selection, design choices, and hiring the right team for your project.",
    category: "Guides",
    image: "https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=1200&q=80",
    date: "April 28, 2026",
    author: "Ramesh Poudel",
    authorRole: "Project Manager",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    content: [
      { type: "paragraph", value: "Building your dream home is one of the most significant investments you'll ever make. Getting it right requires careful planning, the right team, and a clear understanding of the process. Here are five things every homeowner should consider before breaking ground." },
      { type: "heading", value: "1. Budget Realistically" },
      { type: "paragraph", value: "Most homeowners underestimate the true cost of construction. Beyond materials and labour, factor in land acquisition, design fees, permits, utility connections, landscaping, and a contingency of at least 15% for unexpected costs." },
      { type: "list", items: [
        "Land cost: 20–30% of total budget",
        "Construction: 50–60% of total budget",
        "Design & permits: 5–8% of total budget",
        "Interior & finishes: 10–15% of total budget",
        "Contingency: 15% minimum",
      ]},
      { type: "subheading", value: "2. Choose the Right Location" },
      { type: "paragraph", value: "The site determines much of what's possible. Consider access to roads, utilities, sunlight orientation, soil conditions, and proximity to amenities. A thorough site survey and soil test can save you from costly surprises later." },
      { type: "subheading", value: "3. Prioritise Design" },
      { type: "paragraph", value: "Good design doesn't just make your home beautiful — it makes it functional, comfortable, and efficient. Invest in a good architect who understands your lifestyle and can design a home that works for you. The design phase is the cheapest time to make changes." },
      { type: "quote", value: "A well-designed home costs the same to build as a poorly designed one. The difference is how it feels to live in." },
      { type: "subheading", value: "4. Hire the Right Team" },
      { type: "paragraph", value: "Your architect, contractor, and engineer are your partners in this journey. Check references, visit completed projects, and ensure they understand local building codes and seismic requirements. A good team communicates clearly and respects your budget." },
      { type: "subheading", value: "5. Plan for the Future" },
      { type: "paragraph", value: "Think about how your needs might change. Will you need space for elderly parents? A home office? Room for children? Designing for flexibility now can save the cost of renovations later. Consider future solar panel installation, EV charging, or home extension possibilities." },
    ],
  },
  {
    slug: "modern-interior-design-trends-for-nepali-homes",
    title: "Modern Interior Design Trends for Nepali Homes",
    excerpt: "From minimalist aesthetics to fusion designs — discover the latest interior trends reshaping Kathmandu Valley.",
    category: "Design",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=1200&q=80",
    date: "April 10, 2026",
    author: "Anita Shrestha",
    authorRole: "Interior Designer",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    content: [
      { type: "paragraph", value: "Nepali interior design is evolving. While traditional aesthetics remain beloved, a new generation of homeowners is embracing contemporary styles that blend global trends with local craftsmanship. Here are the top trends shaping interiors in Kathmandu Valley." },
      { type: "heading", value: "Minimalist with Warmth" },
      { type: "paragraph", value: "Scandinavian-inspired minimalism is gaining popularity, but with a Nepali twist. Clean lines and neutral palettes are warmed up with natural wood, handmade textiles, and traditional brass accents. The result is spaces that feel serene yet lived-in." },
      { type: "image", src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80", caption: "A minimalist living room with Nepali textile accents" },
      { type: "heading", value: "Natural Materials" },
      { type: "paragraph", value: "Homeowners are moving away from synthetic finishes and embracing natural materials. Stone feature walls, bamboo screens, terracotta flooring, and reclaimed wood furniture are becoming staples of modern Nepali interiors." },
      { type: "list", items: [
        "Terrazzo flooring for kitchens and bathrooms",
        "Jute and hemp rugs for living areas",
        "Hand-carved wooden partitions",
        "Natural stone countertops",
        "Lime plaster walls for texture",
      ]},
      { type: "heading", value: "Indoor-Outdoor Connection" },
      { type: "paragraph", value: "With Nepal's temperate climate, indoor-outdoor living is a natural fit. Large sliding glass doors, rooftop gardens, and courtyard-focused layouts are becoming standard in new homes. This trend also improves natural ventilation and daylight." },
      { type: "heading", value: "Local Craft, Modern Forms" },
      { type: "paragraph", value: "Perhaps the most exciting trend is the revival of traditional crafts in contemporary settings. Thangka-inspired art, Dhaka fabric cushions, and repurposed architectural elements are being used in ways that feel fresh and intentional — not just decorative." },
      { type: "quote", value: "The best interiors tell a story. By blending modern design with local craft, we create homes that are both global and deeply Nepali." },
    ],
  },
  {
    slug: "how-to-choose-the-right-contractor-for-your-project",
    title: "How to Choose the Right Contractor for Your Project",
    excerpt: "Key factors to evaluate when selecting a construction partner — from credentials to communication style.",
    category: "Guides",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1200&q=80",
    date: "March 22, 2026",
    author: "Rajesh Hamal",
    authorRole: "Construction Director",
    authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    content: [
      { type: "paragraph", value: "Choosing the right contractor is one of the most important decisions you'll make in your building project. A good contractor can make the process smooth and enjoyable; a bad one can turn it into a nightmare. Here's how to evaluate your options." },
      { type: "heading", value: "Check Credentials and Experience" },
      { type: "paragraph", value: "Ensure the contractor is registered with the Nepal Department of Urban Development and Building Construction. Ask about their experience with projects similar to yours — residential, commercial, or heritage. Request to see completed projects and speak with past clients." },
      { type: "list", items: [
        "Valid registration and license",
        "Minimum 5 years of experience",
        "At least 3 completed projects of similar scope",
        "Positive client references",
        "Appropriate insurance coverage",
      ]},
      { type: "heading", value: "Evaluate Communication" },
      { type: "paragraph", value: "Your contractor should be responsive, transparent, and willing to explain things clearly. Poor communication is one of the biggest sources of project stress. Pay attention to how they handle your questions during the bidding process — it's a strong indicator of how they'll behave during construction." },
      { type: "heading", value: "Review the Contract Carefully" },
      { type: "paragraph", value: "A detailed contract protects both parties. It should include a clear scope of work, payment schedule, timeline with milestones, materials specifications, warranty terms, and a process for handling changes or disputes." },
      { type: "quote", value: "The cheapest bid is rarely the best. Look for value, not just price. A slightly higher bid from a reliable contractor can save you money in the long run." },
      { type: "heading", value: "Visit Active Sites" },
      { type: "paragraph", value: "Nothing reveals the quality of a contractor's work better than seeing a project in progress. Look at site organization, safety practices, the quality of materials being used, and how they treat their workers. A well-managed site is a sign of a professional contractor." },
    ],
  },
  {
    slug: "restoring-heritage-a-delicate-balance-of-old-and-new",
    title: "Restoring Heritage: A Delicate Balance of Old and New",
    excerpt: "How modern engineering techniques are breathing new life into Nepal's historic structures.",
    category: "Architecture",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80",
    date: "March 5, 2026",
    author: "Ar. Sagar Thapa",
    authorRole: "Senior Architect",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    content: [
      { type: "paragraph", value: "Nepal's architectural heritage is world-renowned. From the intricately carved windows of Bhaktapur to the ancient stupas of the Kathmandu Valley, these structures tell the story of a civilisation. But preserving them requires more than just good intentions — it requires skill, sensitivity, and science." },
      { type: "image", src: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800&q=80", caption: "A restored heritage building in Patan Durbar Square" },
      { type: "heading", value: "The Challenge" },
      { type: "paragraph", value: "Many of Nepal's heritage structures were damaged in the 2015 earthquake, and the restoration effort has been both massive and complex. The challenge is to strengthen these buildings against future earthquakes while preserving their original character and construction techniques." },
      { type: "heading", value: "Modern Solutions, Traditional Materials" },
      { type: "paragraph", value: "Restoration architects are using modern engineering analysis to understand how traditional buildings behave under seismic stress. Hidden steel reinforcement, epoxy injections for cracked timber, and base isolation techniques are being used — all invisible to the casual observer." },
      { type: "list", items: [
        "Hidden steel framing within existing walls",
        "Carbon fibre wrapping for timber beams",
        "Lime-based grouting for brick masonry",
        "Seismic dampers concealed in foundations",
        "Digital documentation with 3D laser scanning",
      ]},
      { type: "heading", value: "The Human Element" },
      { type: "paragraph", value: "Restoration is also about people. Training local artisans in traditional crafts — brick making, wood carving, stone masonry — ensures that these skills are passed on to the next generation. Every restored building is also a restored livelihood." },
      { type: "quote", value: "We're not just fixing buildings. We're preserving a way of building, a way of seeing the world, and a sense of identity." },
      { type: "paragraph", value: "As Nepal continues to rebuild, the lessons learned from heritage restoration are informing new construction. The best modern buildings in Nepal today are those that respect the past while embracing the future." },
    ],
  },
  {
    slug: "the-cost-of-building-in-nepal-2026-guide",
    title: "The Cost of Building in Nepal: 2026 Guide",
    excerpt: "A breakdown of current material prices, labour rates, and hidden costs every homeowner should know.",
    category: "Guides",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80",
    date: "February 18, 2026",
    author: "Rajesh Hamal",
    authorRole: "Construction Director",
    authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    content: [
      { type: "paragraph", value: "Building costs in Nepal have seen significant changes in 2026. With fluctuations in raw material prices and labour availability, understanding the current market is essential for anyone planning a construction project. Here's a comprehensive breakdown." },
      { type: "heading", value: "Current Material Prices (per unit)" },
      { type: "list", items: [
        "Cement (OPC, per bag): NPR 850 – 950",
        "Steel reinforcement (per kg): NPR 95 – 115",
        "Bricks (per 1,000): NPR 12,000 – 18,000",
        "Sand (per cubic ft): NPR 65 – 85",
        "Aggregate (per cubic ft): NPR 55 – 75",
        "Timber (Sal, per cubic ft): NPR 3,500 – 5,000",
      ]},
      { type: "heading", value: "Labour Rates" },
      { type: "paragraph", value: "Skilled labour continues to be in high demand, especially in Kathmandu Valley. Daily wages for masons range from NPR 1,500 to 2,500, while unskilled labourers earn NPR 800 to 1,200 per day. Expect rates to be higher in remote areas." },
      { type: "heading", value: "Average Cost Per Square Foot" },
      { type: "paragraph", value: "Based on current market rates, here are the approximate costs per square foot for different build qualities:" },
      { type: "list", items: [
        "Basic/Standard: NPR 2,200 – 2,800 per sq.ft",
        "Premium: NPR 3,000 – 4,000 per sq.ft",
        "Luxury: NPR 4,500 – 6,500 per sq.ft",
      ]},
      { type: "heading", value: "Hidden Costs to Budget For" },
      { type: "paragraph", value: "Beyond the obvious costs of materials and labour, homeowners should plan for design fees (5–8% of total), municipal permits and approvals (NPR 50,000 – 200,000 depending on project size), utility connections, and contingency funds." },
      { type: "quote", value: "The single biggest mistake new builders make is underestimating the contingency. A 15% buffer isn't pessimistic — it's prudent." },
      { type: "paragraph", value: "With proper planning and a realistic budget, building your home in Nepal is achievable. The key is to work with experienced professionals who can help you navigate the market and avoid costly surprises." },
    ],
  },
];

export function getBlogPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug) ?? null;
}
