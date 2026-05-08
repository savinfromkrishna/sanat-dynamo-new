/**
 * Per-city identity layer — the human / cultural / heritage face of each
 * Indian metro that powers the `/cities/[slug]/about` page.
 *
 * This sits alongside `cities.ts` (commercial copy) and `city-extras.ts`
 * (operational hidden gem + global peers). Together the three files give
 * each metro its own distinct page identity instead of a templated city
 * landing page Google would demote.
 *
 * Adding a new city: append a `CityIdentity` entry keyed by the city slug.
 * Always include the nickname + nicknameOrigin — they are what makes the
 * /about page rank for "why is X called Y" intent searches.
 */

export interface CityLandmark {
  name: string;
  /** Short evocative phrase — what the landmark stands for in the city's identity */
  meaning: string;
}

export interface CityCulturalBeat {
  /** e.g. "Cuisine", "Festival", "Dialect", "Music" */
  category: string;
  body: string;
}

export interface CityEconomicAnchor {
  cluster: string;
  body: string;
}

export interface CityIdentity {
  slug: string;
  /** The familiar nickname — "Pink City", "Maximum City", "Garden City" */
  nickname: string;
  /** Hindi / regional spelling of the nickname for SEO + alt text */
  nicknameRegional?: string;
  /** 2-3 sentence origin story — drives the rich snippet for "why is X called Y" */
  nicknameOrigin: string;
  /** Hex / oklch primary color for the identity panel — should be the city's vibe */
  themeColor: string;
  /** Secondary accent for the identity panel */
  themeColorAccent: string;
  /** One-line city tagline shown on the about hero */
  tagline: string;
  /** 2-3 paragraph history / formation note */
  history: string[];
  /** 5-7 landmarks */
  landmarks: CityLandmark[];
  /**
   * Optional photographic hero image for the city — full URL to a free-use
   * (Wikimedia Commons) photo of the city's most iconic landmark. Rendered
   * as a banner on the /cities/[slug] page hero. Plain <img>; not piped
   * through next/image since there are too many wiki domains to whitelist
   * and the redirect-resolved URLs are already CDN-cached.
   */
  heroImage?: {
    src: string;
    alt: string;
    /** Short attribution shown beneath the photo — e.g. "Hawa Mahal · Wikimedia Commons" */
    credit: string;
  };
  /** 3-4 cultural beats */
  culture: CityCulturalBeat[];
  /** 3-4 economic anchors (clusters) */
  economy: CityEconomicAnchor[];
  /** Why we serve here — opinionated 2-3 sentence pitch */
  whyWeServe: string;
  /** "Did you know" 2-3 facts that make the city memorable */
  didYouKnow: string[];
  /** Local language(s) we work in for this city */
  languages: string[];
  /** Year-founded / first-mention so we can render a historical timeline */
  foundedYear?: string;
}

/* -------------------------------------------------------------------------- */
/*                                   DATA                                     */
/* -------------------------------------------------------------------------- */

export const CITY_IDENTITY: Record<string, CityIdentity> = {
  jaipur: {
    slug: "jaipur",
    heroImage: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Hawa_Mahal,_Jaipur,_India.jpg?width=1600",
      alt: "Hawa Mahal — the 953-window honeycomb facade of Jaipur, the Pink City",
      credit: "Hawa Mahal · Wikimedia Commons",
    },
    nickname: "Pink City",
    nicknameRegional: "गुलाबी नगरी",
    nicknameOrigin:
      "In 1876, Maharaja Sawai Ram Singh II ordered the entire walled city painted terracotta pink — the Rajput colour of hospitality — to welcome the visiting Prince of Wales (later King Edward VII). The colour stuck, and a city law still requires the old quarter to be repainted pink every few years.",
    themeColor: "oklch(0.72 0.16 12)",
    themeColorAccent: "oklch(0.6 0.2 30)",
    tagline:
      "Heritage craft commerce that scales: where block-print, gem, and jewellery exporters take provenance global.",
    history: [
      "Founded in 1727 by Maharaja Sawai Jai Singh II, Jaipur is one of India's first planned cities — laid out on a grid based on the Vastu Shastra, with nine rectangular sectors mirroring the nine cosmic divisions. The Pink City moniker came 150 years later, in 1876.",
      "The walled city was a planned commercial centre from day one — bazaars carved into long streets, each specialising in a specific craft: Johari Bazaar for gemstones, Bapu Bazaar for textiles, Tripolia for utensils. That cluster economy still runs the city.",
      "Modern Jaipur is the export gateway for India's craft economy — block-print, hand-loomed textiles, blue pottery, jewellery, and uncut gemstones flow from here to Tokyo, New York, Milan, and Dubai.",
    ],
    landmarks: [
      { name: "Hawa Mahal", meaning: "The 953-window honeycomb facade — Jaipur's most-photographed identity in pink lattice" },
      { name: "Amber Fort (Amer)", meaning: "Hill-top Rajput palace — sandstone + marble, mirror-work durbar" },
      { name: "City Palace", meaning: "Royal residence + museum at the heart of the walled city" },
      { name: "Jantar Mantar", meaning: "World's largest stone astronomical observatory (UNESCO)" },
      { name: "Johari Bazaar", meaning: "The traditional gem and jewellery market — still the trade's spine" },
      { name: "Albert Hall Museum", meaning: "Indo-Saracenic showpiece — Rajasthan's oldest museum" },
      { name: "Nahargarh Fort", meaning: "Sunset views over the Pink City — defensive ring of the old kingdom" },
    ],
    culture: [
      {
        category: "Cuisine",
        body: "Dal-baati-churma, laal maas, ghewar, pyaaz kachori — Marwari-Rajput palate built for desert preservation, ghee-rich, slow-cooked.",
      },
      {
        category: "Festival",
        body: "Jaipur Literature Festival (Jan), Teej (Aug — monsoon procession), and Diwali in the bazaars when the entire walled city lights up.",
      },
      {
        category: "Dialect",
        body: "Dhundhari + Marwari + Hindi — and English as the second language of trade.",
      },
      {
        category: "Craft",
        body: "Block-print (Sanganer / Bagru), blue pottery, kundan-meena jewellery, lac bangles, marble inlay — every cluster is a Geographical Indication tag.",
      },
    ],
    economy: [
      {
        cluster: "Gem & jewellery",
        body: "World's third-largest gemstone cutting-and-polishing centre. ~₹40,000Cr annual exports of gems, silver, and uncut stones from Sitapura SEZ.",
      },
      {
        cluster: "Textile + handicraft export",
        body: "Sanganer + Bagru block-print clusters export to global D2C brands. Textile exports cross ₹15,000Cr/yr.",
      },
      {
        cluster: "Tourism + hospitality",
        body: "Heritage and luxury tourism — Rambagh Palace, Samode Haveli, ITC Rajputana — Jaipur is a top-3 Indian city for foreign tourist arrivals.",
      },
      {
        cluster: "MICE + edtech",
        body: "JECC and JLF have made Jaipur a tier-1 conferences city. A new edtech belt is rising near Mansarovar / Vaishali Nagar.",
      },
    ],
    whyWeServe:
      "Heritage-craft buyers — domestic and NRI — pay a 30–50% premium for traceability, but Jaipur's exporters are still selling on generic 'handmade in India' badges. We rebuild the storefront with block-by-block artisan attribution, GI-tag schema, and multi-currency NRI checkout. The provenance is your moat.",
    didYouKnow: [
      "Jaipur was India's first planned city, laid out as a 9×9 grid based on the Vastu Shastra in 1727.",
      "Sanganer + Bagru block-print villages have been printing the same motifs since the 16th century — many family shops are 8+ generations deep.",
      "The pink-paint rule isn't tradition — it's enforced by city ordinance, repainting cycles funded by shop owners.",
    ],
    languages: ["Hindi", "Dhundhari", "Marwari", "English"],
    foundedYear: "1727",
  },

  mumbai: {
    slug: "mumbai",
    heroImage: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Mumbai_03-2016_30_Gateway_of_India.jpg?width=1600",
      alt: "Gateway of India — Mumbai's iconic basalt arch on the Apollo Bunder waterfront",
      credit: "Gateway of India · Wikimedia Commons",
    },
    nickname: "Maximum City",
    nicknameRegional: "मुंबई · आमची मुंबई",
    nicknameOrigin:
      "Coined by author Suketu Mehta in his 2004 book of the same name. The city had earlier been called the Manhattan of India and Bombay — \"Maximum\" captured the density, ambition, and intensity better than any other handle stuck.",
    themeColor: "oklch(0.62 0.2 250)",
    themeColorAccent: "oklch(0.78 0.165 50)",
    tagline:
      "India's commercial capital: D2C, BFSI, and the highest-stakes ad market in the country.",
    history: [
      "Mumbai began as a cluster of seven islands inhabited by the Koli fishing community. The Portuguese ceded it to England in 1661 as part of Catherine of Braganza's dowry; the East India Company took it over in 1668 and the seven islands were physically reclaimed and joined into one.",
      "The textile-mill economy of Lower Parel and Worli built the city's middle class through the 19th and 20th centuries — Mumbai was the Manchester of India before Ahmedabad was. The mills closed in the 80s; the land became today's BKC, Lower Parel commercial belt, and Phoenix.",
      "Modern Mumbai is the financial and entertainment capital — RBI, BSE, NSE, every major bank, every major media house, and every D2C brand chasing escape velocity. It is also the most expensive ad market in India by some margin.",
    ],
    landmarks: [
      { name: "Gateway of India", meaning: "Triumphal sea-arch (1924) — the Apollo Bunder skyline icon" },
      { name: "Chhatrapati Shivaji Terminus", meaning: "UNESCO Victorian Gothic railway station — Bombay GIPR's heart" },
      { name: "Marine Drive", meaning: "The 'Queen's Necklace' — Bandra-Worli Sea Link's predecessor curve" },
      { name: "Bandra-Worli Sea Link", meaning: "The 5.6 km cable-stayed bridge — the modern skyline icon" },
      { name: "Dharavi", meaning: "Asia's largest informal-economy cluster — leather, recycling, ceramics" },
      { name: "BKC", meaning: "Bandra Kurla Complex — India's most expensive office market" },
      { name: "Elephanta Caves", meaning: "Rock-cut Hindu temple complex (UNESCO) — 5th–8th century" },
    ],
    culture: [
      { category: "Cuisine", body: "Vada-pav, pav-bhaji, bhel-puri, Parsi-Irani cafés, Konkani seafood, Mughlai at Mohammed Ali Road." },
      { category: "Festival", body: "Ganesh Chaturthi (10-day immersion), Eid at Bohra mohallas, Mount Mary feast at Bandra." },
      { category: "Dialect", body: "Marathi + Hindi-Mumbaiya creole + English — code-switching is the default." },
      { category: "Cinema", body: "Bollywood — Film City Goregaon, Yash Raj, Dharma — defines India's pop-culture export." },
    ],
    economy: [
      { cluster: "BFSI capital", body: "RBI, SEBI, BSE, NSE, every major Indian bank — concentrated in BKC, Worli, Nariman Point." },
      { cluster: "D2C battleground", body: "Bandra–Andheri–Powai is India's densest D2C founder cluster — Shopify Plus volume mostly originates here." },
      { cluster: "Real estate & redevelopment", body: "Mumbai Metropolitan Region's redevelopment market is among the world's most active premium-property funnels." },
      { cluster: "Bollywood + media", body: "Film, OTT, music, advertising — Mumbai owns ~70% of India's media industry revenue." },
    ],
    whyWeServe:
      "Mumbai CPMs are the highest in India and the lifecycle gap from cart-abandon to first WhatsApp touch is the single biggest leak. We close the 90-second window and double the value of every paid click — most Mumbai engagements pay back inside 60 days.",
    didYouKnow: [
      "Mumbai is built on seven joined islands — large parts of South Bombay are reclaimed land.",
      "BKC alone hosts 40% of India's banking-sector tenancy by area.",
      "Dharavi's GDP is estimated at over $1B/year — the densest economic activity per square kilometre on Earth.",
    ],
    languages: ["Marathi", "Hindi", "English", "Gujarati"],
    foundedYear: "1668",
  },

  delhi: {
    slug: "delhi",
    heroImage: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/India_Gate_New_Delhi.jpg?width=1600",
      alt: "India Gate — the 42-metre war memorial at the heart of Lutyens' Delhi",
      credit: "India Gate · Wikimedia Commons",
    },
    nickname: "Capital of Empires",
    nicknameRegional: "दिल्ली · NCR",
    nicknameOrigin:
      "Delhi has been the capital of seven recorded empires — from the Tomars and the Khiljis through the Mughals and the British Raj. No Indian city has been a seat of imperial power for longer; the layered ruins (Tughlaqabad, Lodi, Mehrauli, Shahjahanabad, Lutyens') are why archaeologists call Delhi the Capital of Empires.",
    themeColor: "oklch(0.55 0.22 25)",
    themeColorAccent: "oklch(0.78 0.165 70)",
    tagline:
      "Real estate capital + edtech corridor — the highest-stakes lead-velocity market in India.",
    history: [
      "Delhi's earliest fortified settlement is Indraprastha (Mahabharata-era). Seven historical 'Delhis' overlap on the modern city — Lal Kot (Tomars, 1052), Siri (Khilji, 1303), Tughlaqabad (1321), Jahanpanah, Firozabad, Shahjahanabad (Old Delhi, 1639), and finally Lutyens' New Delhi (1931).",
      "The British shifted India's capital from Calcutta to Delhi in 1911. Edwin Lutyens designed the new city around Rajpath, India Gate, and Rashtrapati Bhavan — the layout the Republic of India inherited in 1947.",
      "Today Delhi NCR is a mega-region of 32M+ people across Delhi, Gurugram, Noida, Greater Noida, Faridabad, and Ghaziabad — India's largest premium real estate market and a top-3 edtech corridor.",
    ],
    landmarks: [
      { name: "India Gate", meaning: "WWI memorial arch — the spine of the ceremonial Lutyens' axis" },
      { name: "Red Fort (Lal Qila)", meaning: "Mughal palace-fort (UNESCO) — the centre of Shahjahanabad" },
      { name: "Qutub Minar", meaning: "73-metre Mamluk-era minaret (UNESCO, 1193)" },
      { name: "Lotus Temple", meaning: "Bahá'í House of Worship — modern architectural icon" },
      { name: "Humayun's Tomb", meaning: "Mughal tomb-garden (UNESCO) — the architectural blueprint for the Taj" },
      { name: "Connaught Place", meaning: "Lutyens' colonnaded commercial centre — still the heart of central Delhi" },
      { name: "Cyber Hub Gurugram", meaning: "The face of NCR's modern services + tech economy" },
    ],
    culture: [
      { category: "Cuisine", body: "Chhole-bhature, butter chicken, Daryaganj kebabs, Karol Bagh chaat, Mughlai biryanis, Punjabi dhabas." },
      { category: "Festival", body: "Diwali in Chandni Chowk, Republic Day parade on Rajpath, Eid in Old Delhi, Chhath at Yamuna ghats." },
      { category: "Dialect", body: "Hindi-Urdu Hindustani blend; Punjabi heavy in West Delhi; English the language of NCR corporate." },
      { category: "Architecture", body: "Mughal layered monuments + colonial Lutyens grid + 21st-century glass HQs in DLF Cyber City." },
    ],
    economy: [
      { cluster: "Real estate (NCR)", body: "DLF, Godrej, M3M, ATS, Lodha, Hiranandani — premium and mid-market builders ship India's largest real-estate-funnel volume here." },
      { cluster: "EdTech & coaching", body: "Karol Bagh + Mukherjee Nagar (UPSC), Saket (NEET / IIT), Sector 18 Noida — saturation comparable only to Beijing globally." },
      { cluster: "Auto & manufacturing (NCR)", body: "Manesar, Gurugram, Faridabad — Maruti, Hero, Honda's component bench." },
      { cluster: "B2B SaaS / IT", body: "Cyber Hub Gurugram — the post-Bengaluru SaaS bench." },
    ],
    whyWeServe:
      "NCR real-estate leads cool 8x after the 5-minute window. Most agencies optimize CPC; the actual lever is sub-5-minute round-robin routing with WhatsApp fallback. We build the funnel that closes the site visit before the buyer's next inquiry.",
    didYouKnow: [
      "There have been at least seven historical 'Delhis' — and you can still see ruins of all of them inside the modern city limits.",
      "Connaught Place is one of the largest financial and commercial hubs in India and has the highest land value in NCR.",
      "Delhi NCR has more registered cars than the entire population of New Zealand.",
    ],
    languages: ["Hindi", "Punjabi", "Urdu", "English"],
    foundedYear: "1052 (Lal Kot)",
  },

  bengaluru: {
    slug: "bengaluru",
    heroImage: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Vidhana_Soudha_Bangalore.jpg?width=1600",
      alt: "Vidhana Soudha — Karnataka's neo-Dravidian state legislature, Bengaluru's civic centerpiece",
      credit: "Vidhana Soudha · Wikimedia Commons",
    },
    nickname: "Silicon Valley of India",
    nicknameRegional: "ಬೆಂಗಳೂರು · Garden City",
    nicknameOrigin:
      "Karnataka named the city Bangalore (anglicised) for centuries — but it picked up the 'Silicon Valley of India' tag in the late 90s when ITPL Whitefield, Electronics City, and Wipro / Infosys put 60% of India's IT exports through Karnataka. Older locals still prefer Garden City — for the city's once-dense canopy and 240+ lakes.",
    themeColor: "oklch(0.66 0.18 180)",
    themeColorAccent: "oklch(0.74 0.16 155)",
    tagline:
      "Engineering-honest SaaS capital — global B2B sales runs from here.",
    history: [
      "Bengaluru was founded by Kempe Gowda in 1537 as a garrison town for the Vijayanagara empire — its name comes from 'Bendakaaluru', the place of boiled beans, after a legend involving the Hoysala king Veera Ballala II.",
      "The city's cantonment under the British (post 1809) made it a trading and military hub. After independence Bengaluru was a hub for HAL, BEL, and ISRO — public-sector engineering preceded the private-sector IT wave by 30 years.",
      "The 1990s liberalisation and Y2K migration pivoted the city: Infosys, Wipro, and TCS scaled, the SEZ act made ITPL and Electronics City possible, and the Bengaluru SaaS founder bench (Freshworks, Razorpay, Postman, Zoho) followed.",
    ],
    landmarks: [
      { name: "Vidhana Soudha", meaning: "Karnataka State Legislature — granite Indo-Saracenic monument (1956)" },
      { name: "Cubbon Park", meaning: "300-acre central garden — last surviving lung of Garden City" },
      { name: "Lalbagh Botanical Garden", meaning: "Tipu Sultan-era gardens with the Glass House and Republic Day flower show" },
      { name: "Bangalore Palace", meaning: "Tudor-revival royal residence (1878)" },
      { name: "ISRO Headquarters", meaning: "India's space agency — Mangalyaan, Chandrayaan, Aditya were planned here" },
      { name: "ITPL Whitefield", meaning: "International Tech Park Bangalore — the SEZ that anchored the IT explosion" },
      { name: "MG Road", meaning: "The historical CBD — colonial-era arcade meets metro-rail Bengaluru" },
    ],
    culture: [
      { category: "Cuisine", body: "Bisi-bele-bath, masala dosa at MTR / CTR, ragi mudde, filter coffee, Mangalorean and Andhra cross-cuisine." },
      { category: "Festival", body: "Karaga (10-day folk festival), Dasara, Bengaluru Tech Summit (Nov)." },
      { category: "Dialect", body: "Kannada is mother-tongue; Tamil + Telugu + Hindi + English fluently spoken in tech." },
      { category: "Climate", body: "1000m above sea level — moderate weather year-round, the most pleasant climate of any Indian metro." },
    ],
    economy: [
      { cluster: "SaaS & dev tools", body: "Freshworks, Razorpay, Postman, Zoho, Atlassian-India — the densest B2B SaaS founder bench in India." },
      { cluster: "IT services", body: "Infosys, Wipro, TCS, Accenture-India — over 60% of India's $250B IT export industry runs through Bengaluru." },
      { cluster: "Aerospace + defence", body: "HAL, BEL, ISRO + the rising private-space sector (Pixxel, Skyroot) — ISRO trained the bench." },
      { cluster: "Biotech & deeptech", body: "Bangalore Bio-cluster, Strand Life Sciences, Biocon — South Asia's largest biotech research density." },
    ],
    whyWeServe:
      "Bengaluru's buyer reads /docs before /pricing. The marketing site that ships live screenshots, public pricing calculators, and developer-doc-style integration pages closes the US deal that template Webflow sites lose.",
    didYouKnow: [
      "Bengaluru once had 240+ lakes — most are now built over. The remaining ones (Ulsoor, Hebbal, Bellandur) define the modern city map.",
      "The first ATM in India was set up at HSBC's Mahatma Gandhi Road branch, 1987.",
      "Bengaluru's startup ecosystem is the world's third-largest after SF and London by funded startups.",
    ],
    languages: ["Kannada", "English", "Tamil", "Telugu", "Hindi"],
    foundedYear: "1537",
  },

  pune: {
    slug: "pune",
    heroImage: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Shaniwar_Wada.jpg?width=1600",
      alt: "Shaniwar Wada — the Peshwa-era stone fortress at the heart of old Pune",
      credit: "Shaniwar Wada · Wikimedia Commons",
    },
    nickname: "Oxford of the East",
    nicknameRegional: "पुणे · Cultural Capital of Maharashtra",
    nicknameOrigin:
      "Pune earned 'Oxford of the East' for its dense university tradition — Fergusson College (1885), University of Pune, FTII, NDA, Symbiosis, plus 100+ engineering and management institutes. The city has more colleges per capita than any Indian metro.",
    themeColor: "oklch(0.55 0.18 30)",
    themeColorAccent: "oklch(0.66 0.18 295)",
    tagline:
      "Manufacturing precision meets IT scale: the Stuttgart of India next to the Hinjewadi SaaS bench.",
    history: [
      "Pune was the political seat of the Maratha Empire — Shaniwar Wada (the Peshwa palace, 1730) anchored the empire's expansion across India through the 18th century until the Battle of Khadki (1817).",
      "Post-independence, Pune became India's first auto-manufacturing hub — Tata Motors at Pimpri (1945) and the Bajaj plant followed. Pimpri-Chinchwad-Chakan is now India's Detroit.",
      "From the 1990s, the IT services and SaaS economy scaled around Hinjewadi and Kharadi — Wipro, Infosys, Persistent — turning Pune into the manufacturing-and-IT dual-personality city it is today.",
    ],
    landmarks: [
      { name: "Shaniwar Wada", meaning: "Peshwa fortified palace (1730) — Maratha empire's seat of power" },
      { name: "Aga Khan Palace", meaning: "Where Mahatma Gandhi was interned during Quit India (1942–44)" },
      { name: "Sinhagad Fort", meaning: "Hill fort 30km from Pune — 'Lion's Fort' captured by Tanaji" },
      { name: "Dagdusheth Halwai Ganpati", meaning: "Most-visited Ganesh temple — Pune's spiritual heart" },
      { name: "FC Road / JM Road", meaning: "Student / cultural commercial spine — Fergusson + Modern College" },
      { name: "Hinjewadi IT Park", meaning: "Phase I/II/III — Pune's largest tech employer cluster" },
      { name: "Chakan MIDC", meaning: "Auto and component manufacturing belt — Bajaj, Volkswagen, Mahindra" },
    ],
    culture: [
      { category: "Cuisine", body: "Misal-pav, pav-bhaji, bakarwadi, sabudana khichdi, Konkani-Maharashtrian fusion at FC Road." },
      { category: "Festival", body: "Ganesh Chaturthi (Pune is the historical home of the public Ganpati), Pune International Film Festival (Jan), Sawai Gandharva music festival." },
      { category: "Dialect", body: "Marathi (Puneri Marathi famously punctilious) + Hindi + English — and increasingly Telugu / Tamil in Hinjewadi tech." },
      { category: "Music", body: "Hindustani classical heartland — the Sawai Gandharva Bhimsen festival is one of India's premier classical events." },
    ],
    economy: [
      { cluster: "Auto & manufacturing", body: "Pimpri-Chinchwad-Chakan — Tata Motors, Bajaj, Mahindra, Volkswagen, Mercedes-Benz. India's tier-1 auto-component supply heart." },
      { cluster: "IT services + SaaS", body: "Hinjewadi + Kharadi — Wipro, Infosys, Persistent, Cognizant; the SaaS bench is rising fast." },
      { cluster: "Education", body: "200+ engineering colleges, NDA, FTII, Symbiosis, ISB satellite — the human-capital pipeline of Maharashtra." },
      { cluster: "Pharma + biotech", body: "Pune-Bhosari belt — Cipla, Lupin, Serum Institute (Pune is home to the world's largest vaccine manufacturer)." },
    ],
    whyWeServe:
      "Pune manufacturers spend on marketing sites that don't move revenue while their dealers — the actual buyers — still phone reps for stock. The lever is a Tally-integrated dealer portal with WhatsApp order updates. We've shipped this for 9+ Pune manufacturers.",
    didYouKnow: [
      "Serum Institute of India in Pune produced 1.5B+ COVID vaccine doses — the largest by any vaccine maker globally.",
      "Pune has the largest per-capita number of registered colleges in India.",
      "Tata Motors' first commercial vehicle rolled out of Pimpri in 1954.",
    ],
    languages: ["Marathi", "Hindi", "English"],
    foundedYear: "937 CE (Kasbe Pune)",
  },

  chennai: {
    slug: "chennai",
    heroImage: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Marina_beach.jpg?width=1600",
      alt: "Marina Beach — the 13-kilometre Bay of Bengal stretch defining Chennai's coastline",
      credit: "Marina Beach · Wikimedia Commons",
    },
    nickname: "Detroit of India",
    nicknameRegional: "சென்னை · Gateway of South India",
    nicknameOrigin:
      "Chennai is called the Detroit of India for its auto-manufacturing density — Sriperumbudur and the Oragadam belt host Hyundai, Ford, Nissan, Renault, Daimler, BMW, Yamaha, and tier-1 component suppliers. Chennai's plants assemble nearly 40% of India's car exports.",
    themeColor: "oklch(0.65 0.16 200)",
    themeColorAccent: "oklch(0.78 0.165 70)",
    tagline:
      "Auto + healthcare + IT corridor: Tamil-first SEO catches the bottom-of-funnel intent the rest of India misses.",
    history: [
      "Chennai was founded as Madraspatnam in 1639 when the East India Company's Francis Day acquired a strip of land from the Vijayanagara nayak — Fort St. George (1644) was the first English settlement on the subcontinent.",
      "The city was the capital of the Madras Presidency through the British era — South India's administrative, educational, and commercial centre.",
      "Post-independence Chennai retained its educational pre-eminence (IIT-M, Anna University) and added a manufacturing layer in the 1990s — now the second-largest IT exporter in India after Bengaluru, and the largest auto exporter.",
    ],
    landmarks: [
      { name: "Marina Beach", meaning: "Second-longest urban beach in the world — Chennai's social spine" },
      { name: "Kapaleeshwarar Temple", meaning: "8th-century Pallava-era Shiva temple — Mylapore's heart" },
      { name: "Fort St. George", meaning: "First English fortress in India (1644) — now the Tamil Nadu Secretariat" },
      { name: "San Thome Basilica", meaning: "Built over Apostle Thomas's tomb — one of three known apostle-tomb cathedrals" },
      { name: "Mahabalipuram", meaning: "Pallava-era rock-cut temples (UNESCO) — 60km south of Chennai" },
      { name: "T. Nagar (Pondy Bazaar)", meaning: "Most-trafficked retail belt — saree, jewellery, electronics shopping" },
      { name: "OMR (IT Expressway)", meaning: "Old Mahabalipuram Road — Chennai's tech corridor (Tidel Park to Siruseri)" },
    ],
    culture: [
      { category: "Cuisine", body: "Idli-dosa, filter coffee, Chettinad meals, Saravana Bhavan, Murugan Idli Shop, Madras-club anglo-Indian." },
      { category: "Festival", body: "Pongal (4-day harvest festival), Margazhi music season (Dec) — Carnatic classical capital of the world." },
      { category: "Dialect", body: "Tamil is mother-tongue; English is the second language of trade; Telugu + Malayalam common." },
      { category: "Cinema", body: "Kollywood — Tamil cinema is the second-largest Indian film industry by revenue." },
    ],
    economy: [
      { cluster: "Automotive", body: "Sriperumbudur + Oragadam — Hyundai, Ford, Nissan, Renault, Daimler, BMW. ~40% of India's car exports." },
      { cluster: "IT services + BPO", body: "OMR (Tidel + Siruseri), TCS, Cognizant, Infosys, HCL — second-largest IT exporter after Bengaluru." },
      { cluster: "Healthcare", body: "Apollo (founded here), MIOT, Sankara Nethralaya — Chennai is India's largest medical-tourism destination." },
      { cluster: "Logistics + port", body: "Chennai Port + Ennore Port — handles ~15% of India's container throughput." },
    ],
    whyWeServe:
      "Chennai healthcare and coaching buyers Google in Tamil more than agencies admit. Sites that ship en-only schema lose the bottom-of-funnel intent. We build bilingual hreflang + Tamil schema + locality pages that rank for ம்-language queries — most agencies don't bother.",
    didYouKnow: [
      "Chennai is home to the world's second-longest urban beach — Marina is 13 km long.",
      "The first English fort in India, Fort St. George, was built in Chennai in 1644.",
      "Chennai's Apollo Hospitals was India's first corporate hospital — founded in 1983.",
    ],
    languages: ["Tamil", "English", "Telugu", "Malayalam"],
    foundedYear: "1639",
  },

  hyderabad: {
    slug: "hyderabad",
    heroImage: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Charminar-Pride_of_Hyderabad.jpg?width=1600",
      alt: "Charminar — the four-minaret mosque at the centre of old Hyderabad, built 1591",
      credit: "Charminar · Wikimedia Commons",
    },
    nickname: "City of Pearls",
    nicknameRegional: "హైదరాబాద్ · Cyberabad",
    nicknameOrigin:
      "Hyderabad's pearl trade dates to the 16th-century Qutb Shahi dynasty — it was the world's primary cutting and trading centre for natural pearls until the 19th century. The Charminar bazaars still anchor the trade. The modern moniker 'Cyberabad' captures the HITEC City IT explosion since the 90s.",
    themeColor: "oklch(0.62 0.18 295)",
    themeColorAccent: "oklch(0.74 0.16 155)",
    tagline:
      "Pharma capital + biotech + India's most successful planned IT-city.",
    history: [
      "Hyderabad was founded in 1591 by Muhammad Quli Qutb Shah, the 5th sultan of the Qutb Shahi dynasty — built around Charminar to commemorate the end of a plague. The Nizams of Hyderabad ruled the princely state through the British era; Hyderabad was the largest princely state at independence.",
      "The Operation Polo military action (1948) integrated Hyderabad into the Indian Union. The city became the capital of Andhra Pradesh and, since 2014, of Telangana.",
      "The HITEC City + Cyberabad master-plan in the late 90s (under Chandrababu Naidu) made Hyderabad the second-most successful IT-city after Bengaluru — Microsoft, Google, Meta, Apple all anchor major campuses here.",
    ],
    landmarks: [
      { name: "Charminar", meaning: "1591 four-minaret monument — Hyderabad's defining icon" },
      { name: "Golconda Fort", meaning: "Qutb Shahi citadel — diamonds (including the Koh-i-Noor) once traded here" },
      { name: "Hussain Sagar", meaning: "16th-century lake with the world's tallest monolithic Buddha statue" },
      { name: "Ramoji Film City", meaning: "World's largest film studio complex (Guinness)" },
      { name: "HITEC City + Cyberabad", meaning: "India's most successfully planned IT-city — 600,000+ jobs" },
      { name: "Salar Jung Museum", meaning: "South Asia's largest one-man art collection — 38,000+ artefacts" },
      { name: "Genome Valley", meaning: "Asia's largest life-sciences cluster — 200+ pharma and biotech firms" },
    ],
    culture: [
      { category: "Cuisine", body: "Hyderabadi biryani (the world standard), haleem, kebabs, Irani chai, double-ka-meetha." },
      { category: "Festival", body: "Bonalu (Telangana folk festival), Bathukamma (floral festival), Numaish (45-day winter expo)." },
      { category: "Dialect", body: "Telugu + Hyderabadi Urdu (Dakhani) + Hindi + English — the Charminar-old-city Urdu is its own dialect." },
      { category: "Craft", body: "Pearl polishing, bidri-ware, Patancheru handicrafts, Pochampally ikat textiles." },
    ],
    economy: [
      { cluster: "Pharma & biotech", body: "Genome Valley + Hyderabad's pharma cluster produce ~40% of India's bulk drug exports. Dr. Reddy's, Aurobindo, Bharat Biotech." },
      { cluster: "IT & SaaS", body: "HITEC City + Gachibowli — Microsoft (largest campus outside US), Google, Meta, Apple, Amazon." },
      { cluster: "Aerospace & defence", body: "Hyderabad is India's hub for missile / defence systems — DRDL, RCI, ECIL, Tata Aerospace." },
      { cluster: "Pearl + bidri craft", body: "Patel Market + Charminar — still the global hub for pearl trading and bidri-ware." },
    ],
    whyWeServe:
      "Hyderabad pharma buyers Google for /quality and /compliance pages before they ever look at the product range. If your DMF / GMP / CDSCO landing pages don't outrank your homepage on intent searches, you're invisible to the actual buyer.",
    didYouKnow: [
      "Hyderabad was once the world's pearl-trading capital — and it produced the Koh-i-Noor diamond.",
      "Microsoft's Hyderabad campus is its largest outside the United States.",
      "Bharat Biotech (Hyderabad) developed COVAXIN — one of India's two indigenous COVID vaccines.",
    ],
    languages: ["Telugu", "Urdu", "Hindi", "English"],
    foundedYear: "1591",
  },

  kolkata: {
    slug: "kolkata",
    heroImage: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Howrah_Bridge_Kolkata.jpg?width=1600",
      alt: "Howrah Bridge — the cantilever truss bridge over the Hooghly, Kolkata's working spine",
      credit: "Howrah Bridge · Wikimedia Commons",
    },
    nickname: "City of Joy",
    nicknameRegional: "কলকাতা · Cultural Capital",
    nicknameOrigin:
      "Coined by Dominique Lapierre's 1985 novel La Cité de la Joie set in the Anand Nagar slum — the title captured the city's defining paradox of dignity and ferocious cultural intensity in the face of poverty. Kolkata is also called the Cultural Capital of India for the Tagore-Vivekananda-Bose intellectual heritage.",
    themeColor: "oklch(0.55 0.18 25)",
    themeColorAccent: "oklch(0.78 0.165 70)",
    tagline:
      "Legacy commerce, education, and the literary capital of India — buyers who convert on the phone, not the form.",
    history: [
      "The British East India Company established a trading post here in 1690; Job Charnock's settlement at Sutanuti grew into Calcutta — the capital of British India from 1772 to 1911.",
      "19th-century Calcutta was India's intellectual capital — the Bengal Renaissance produced Rammohun Roy, Vidyasagar, Tagore, Vivekananda, Bose, Ray. Calcutta University (1857) is one of Asia's oldest.",
      "After the British shifted the capital to Delhi in 1911, Kolkata's commercial weight slowly migrated to Mumbai. The city's contribution today is disproportionate in education, literature, and cultural production rather than industrial scale.",
    ],
    landmarks: [
      { name: "Howrah Bridge", meaning: "Cantilevered 1943 bridge over the Hooghly — Kolkata's defining skyline" },
      { name: "Victoria Memorial", meaning: "Marble Indo-Saracenic museum (1921) — Kolkata's ceremonial heart" },
      { name: "Park Street", meaning: "Historic colonial commercial spine — Flury's, Trinca's, Mocambo" },
      { name: "Kalighat Temple", meaning: "Ancient Kali shrine — origin of the city's name (Kali-kata = 'cut by Kali')" },
      { name: "Indian Museum", meaning: "Founded 1814 — oldest museum in Asia" },
      { name: "Dakshineswar Temple", meaning: "19th-century Kali temple where Sri Ramakrishna lived" },
      { name: "BBD Bagh", meaning: "Colonial CBD — Writers' Building, GPO, Reserve Bank" },
    ],
    culture: [
      { category: "Cuisine", body: "Macher jhol, kosha mangsho, biryani (Kolkata-style with potato), Park Street confectionery, Bengali sweets — rosogolla, sandesh." },
      { category: "Festival", body: "Durga Puja (UNESCO ICH) — the city's defining 5-day celebration; Kali Puja, Saraswati Puja, Kolkata Book Fair (Jan)." },
      { category: "Dialect", body: "Bengali (the literary standard) + Hindi + English — code-switching is heavy in commerce." },
      { category: "Literature", body: "Tagore (Nobel 1913), Satyajit Ray (Oscar), Amartya Sen — Kolkata's intellectual export is its biggest signature." },
    ],
    economy: [
      { cluster: "Legacy commerce", body: "BBD Bagh + Dalhousie + Burrabazar — India's oldest continuous commercial district." },
      { cluster: "Higher education", body: "Calcutta Univ, Jadavpur, IIM Calcutta, ISI — Asia's deepest research-university density." },
      { cluster: "Jute, tea, leather", body: "West Bengal still leads India in jute exports and Darjeeling tea — old industries reinventing." },
      { cluster: "IT services", body: "Sector V Salt Lake + New Town — IBM, TCS, Cognizant, Wipro." },
    ],
    whyWeServe:
      "Kolkata buyers will fill a form if it offers a callback in 10 minutes. They will not fill one that promises an email reply. We build the click-to-call funnel, the WhatsApp opt-in, and the Bengali confirmation flow — most agencies still ship the desk-bound 'submit and we'll get back' template.",
    didYouKnow: [
      "Calcutta was the capital of British India for 139 years before Delhi was named capital in 1911.",
      "The Indian Museum (1814) is the oldest museum in Asia.",
      "Kolkata's Durga Puja was added to the UNESCO Intangible Cultural Heritage list in 2021.",
    ],
    languages: ["Bengali", "Hindi", "English"],
    foundedYear: "1690",
  },

  ahmedabad: {
    slug: "ahmedabad",
    heroImage: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Sabarmati_Riverfront.jpg?width=1600",
      alt: "Sabarmati Riverfront — Ahmedabad's modern civic spine on the river that anchors the city",
      credit: "Sabarmati Riverfront · Wikimedia Commons",
    },
    nickname: "Manchester of India",
    nicknameRegional: "અમદાવાદ · Karnavati",
    nicknameOrigin:
      "Ahmedabad earned 'Manchester of India' from the late 19th century onwards for its dense textile-mill economy — Calico, Arvind, Ashima, Anil — at its peak the city had 70+ textile mills. The original Manchester comparison was made by the British administration in the 1890s.",
    themeColor: "oklch(0.55 0.22 250)",
    themeColorAccent: "oklch(0.78 0.165 50)",
    tagline:
      "Textile capital that built modern India's manufacturing playbook — and the new Tally-to-cloud-ERP frontier.",
    history: [
      "Ahmedabad was founded in 1411 by Sultan Ahmad Shah I on the east bank of the Sabarmati. It became the principal city of Gujarat, a centre of Indo-Islamic architecture (the Sidi Saiyyed jali, the jamali kamali tombs, the Adalaj stepwell), and a major trade-route node.",
      "From the 1860s onwards, Ahmedabad pivoted into industrial textile manufacturing — the Calico Mills (1880) and Arvind Mills (1931) put the city on the map as the Manchester of India.",
      "Mahatma Gandhi established the Sabarmati Ashram (1917–30) here — and the Salt March began here in 1930. Modern Ahmedabad is a manufacturing-and-trade hub that birthed Reliance, Adani, and the GIFT City international finance experiment.",
    ],
    landmarks: [
      { name: "Sabarmati Ashram", meaning: "Gandhi's residence (1917–30) — the spiritual centre of the Indian independence movement" },
      { name: "Sidi Saiyyed Mosque", meaning: "1573 mosque famous for its tree-of-life jali — Ahmedabad's defining architectural motif" },
      { name: "Jama Masjid", meaning: "1424 — one of India's most beautiful early Indo-Islamic mosques" },
      { name: "Adalaj Stepwell", meaning: "5-storey 1499 stepwell — a Solanki-era engineering marvel" },
      { name: "Sardar Vallabhbhai Patel Statue", meaning: "Statue of Unity (Kevadia) — world's tallest statue" },
      { name: "GIFT City", meaning: "India's first International Financial Services Centre — modelled on Singapore" },
      { name: "Akshardham", meaning: "Carved stone temple — Gandhinagar's signature monument" },
    ],
    culture: [
      { category: "Cuisine", body: "Dhokla, fafda-jalebi, undhiyu, khaman, kachori — Gujarati thali tradition, Ahmedabad's Manek Chowk midnight food market." },
      { category: "Festival", body: "Navratri (9-day Garba — the world's longest dance festival), Uttarayan (kite festival, Jan 14), Rann Utsav." },
      { category: "Dialect", body: "Gujarati (Ahmedabadi inflection) + Hindi + English. Marwari, Sindhi, Kutchi common in trade." },
      { category: "Architecture", body: "Indo-Islamic + carved-wood Pol houses (UNESCO old city) + Le Corbusier's IIM-A campus + Doshi-Kanvinde modernism." },
    ],
    economy: [
      { cluster: "Textile manufacturing", body: "Naroda, Narol, Vatva clusters — denim, woven, knitwear. Arvind, Ashima, Welspun. ~30% of India's denim exports." },
      { cluster: "Chemical + petrochemical", body: "Vatva GIDC + Dahej — bulk and specialty chemicals, dyes, intermediates. Reliance Hazira nearby." },
      { cluster: "Engineering goods", body: "Auto-component, machinery, plastics. Mahindra, Hyundai-Hyderabad's Sanand expansion (Tata Nano belt now Suzuki)." },
      { cluster: "Diamonds", body: "Ahmedabad + Surat together cut and polish 90% of the world's diamonds." },
    ],
    whyWeServe:
      "Ahmedabad textile clusters live on WhatsApp groups, not portals. A website doesn't reach them; a catalog link seeded into the right group does. We migrate Tally to cloud ERP, ship the GST e-invoicing layer, and seed the catalog where the actual buyer is — in the WhatsApp group.",
    didYouKnow: [
      "Ahmedabad's old walled city (Pol architecture) was India's first UNESCO World Heritage City (2017).",
      "Ahmedabad and Surat together cut 90% of the world's diamonds.",
      "The Ahmedabad Stock Exchange (1894) was Asia's second oldest after Bombay.",
    ],
    languages: ["Gujarati", "Hindi", "English"],
    foundedYear: "1411",
  },

  indore: {
    slug: "indore",
    heroImage: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Indore_Rajwada_at_night.jpg?width=1600",
      alt: "Rajwada — the seven-storey Holkar palace at the centre of old Indore, lit at night",
      credit: "Rajwada Palace · Wikimedia Commons",
    },
    nickname: "Mini Mumbai",
    nicknameRegional: "इंदौर · Cleanest City",
    nicknameOrigin:
      "Indore is called Mini Mumbai for its trader-led commercial intensity, food-centric street culture, and round-the-clock economy — and 'Cleanest City of India' since it has won Swachh Survekshan #1 every year since 2017 (a record in Indian municipal governance).",
    themeColor: "oklch(0.7 0.2 50)",
    themeColorAccent: "oklch(0.66 0.18 295)",
    tagline:
      "India's logistics throat and rising trade capital — the MP commercial spine.",
    history: [
      "Indore was founded in the 16th century around the Indreshwar (Shiva) temple and grew under the Maratha Holkar dynasty (1733–1948) — Ahilyabai Holkar's 18th-century rule turned Indore into a political and economic centre.",
      "Post-independence Indore was the commercial capital of Madhya Pradesh — central India's trading and education hub. The Pithampur SEZ (1990s) added an industrial layer.",
      "Modern Indore is one of India's fastest-growing tier-2 metros — IIM Indore, IIT Indore, the Devi Ahilya Vishwavidyalaya, plus a logistics-and-trade backbone serving the entire central India belt.",
    ],
    landmarks: [
      { name: "Rajwada Palace", meaning: "Holkar dynasty 7-storey wood-and-stone palace (1747)" },
      { name: "Sarafa Bazaar", meaning: "By day a jewellery market, by night India's most-loved street-food destination" },
      { name: "Lal Baag Palace", meaning: "Holkar Maharaja's Italianate residence — modelled on Buckingham Palace" },
      { name: "Khajrana Ganesh Temple", meaning: "One of India's most-visited Ganesh temples" },
      { name: "Pithampur SEZ", meaning: "Industrial belt — 700+ companies in auto, pharma, engineering" },
      { name: "IIM Indore + IIT Indore", meaning: "Twin elite institutions anchoring Indore's research economy" },
      { name: "Patalpani Falls", meaning: "Monsoon waterfall on the Mhow plateau — 35km from the city" },
    ],
    culture: [
      { category: "Cuisine", body: "Poha-jalebi (signature breakfast), bhutte ki kees, sabudana khichdi, Sarafa Bazaar all-night street food, malpua." },
      { category: "Festival", body: "Ahilya Utsav, Ranji Tiranga (Aug 15 — Indore was MP's first city to fly the tricolour), Rangpanchami procession." },
      { category: "Dialect", body: "Malwi + Hindi + English — Marwari, Sindhi, Maharashtrian communities common in trade." },
      { category: "Civic", body: "India's cleanest city since 2017 (#1 in Swachh Survekshan 7 years running) — civic pride is part of the city's identity." },
    ],
    economy: [
      { cluster: "Logistics & trade", body: "Indore is the distribution gateway for the entire central India belt — MP, Chhattisgarh, parts of UP and Rajasthan flow through here." },
      { cluster: "Manufacturing (Pithampur)", body: "Pithampur SEZ — auto components, pharma, engineering. ~700 companies, ₹40,000Cr+ output." },
      { cluster: "Education", body: "IIM Indore, IIT Indore, DAVV — central India's premier research-and-management university belt." },
      { cluster: "Food processing", body: "Soya, dairy, wheat — MP's agricultural base feeds Indore's processing economy." },
    ],
    whyWeServe:
      "Indore SMEs check your tracker UI before they call you. Whoever ships a public consignment-lookup widget on the homepage closes the trust gap before the first call. We ship the tracker first, marketing copy second — Hindi-first invoice and dashboard.",
    didYouKnow: [
      "Indore has won the Swachh Survekshan #1 cleanliness ranking 7 consecutive years (2017–2023) — a national record.",
      "Sarafa Bazaar transforms into a street-food market every night after 9pm — by day it's one of central India's biggest jewellery markets.",
      "Indore is the only city in India that has both an IIM and an IIT.",
    ],
    languages: ["Hindi", "Malwi", "English"],
    foundedYear: "1715",
  },

  bhopal: {
    slug: "bhopal",
    heroImage: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Taj-ul-Masjid.jpg?width=1600",
      alt: "Taj-ul-Masjid — one of Asia's largest mosques, the architectural anchor of old Bhopal",
      credit: "Taj-ul-Masjid · Wikimedia Commons",
    },
    nickname: "City of Lakes",
    nicknameRegional: "भोपाल · Tāl-Tālāōn kā Shahar",
    nicknameOrigin:
      "Bhopal earned 'City of Lakes' for its system of natural and artificial water bodies — the Upper Lake (Bada Talab, built by Raja Bhoj in the 11th century) and the Lower Lake (Chhota Talab) define the city's geography. Bhopal has more lakes per capita than any Indian state capital.",
    themeColor: "oklch(0.6 0.16 200)",
    themeColorAccent: "oklch(0.74 0.16 155)",
    tagline:
      "Madhya Pradesh's planned capital — government, education, and the post-Bhopal Gas Tragedy reinvention.",
    history: [
      "Bhopal was founded around the 11th-century Bhoj Tal (Upper Lake) by Raja Bhoj of the Paramara dynasty. The modern city grew under the Begums of Bhopal (1819–1926) — Qudsia Begum, Sikandar Begum, Shahjahan Begum, Sultan Jahan Begum — a rare 100-year matriarchal succession in Indian history.",
      "Post-independence Bhopal became the capital of the new state of Madhya Pradesh (1956). Bharat Heavy Electricals (BHEL Bhopal) gave the city a public-sector industrial spine.",
      "The 1984 Bhopal Gas Tragedy at the Union Carbide pesticide plant remains one of the world's worst industrial disasters; the city's modern identity was shaped by recovery and reinvention — from civic infrastructure to the rise of a planned IT and education economy.",
    ],
    landmarks: [
      { name: "Taj-ul-Masajid", meaning: "Asia's largest mosque (1844) — the architectural signature of Bhopal" },
      { name: "Upper Lake (Bada Talab)", meaning: "11th-century Raja Bhoj-era artificial lake — the city's water lifeline" },
      { name: "Bhimbetka Rock Shelters", meaning: "UNESCO prehistoric paintings 45km from Bhopal — 30,000 years old" },
      { name: "Sanchi Stupa", meaning: "UNESCO 3rd-century BCE Buddhist stupa — 46km from Bhopal" },
      { name: "Bharat Bhavan", meaning: "Charles Correa-designed cultural centre on the Upper Lake" },
      { name: "Van Vihar National Park", meaning: "Urban national park inside the city — 4.5 km² of forest beside the Upper Lake" },
      { name: "Chowk Bazaar (Old Bhopal)", meaning: "Begum-era walled-city commerce — silver, embroidery, batua-purse craft" },
    ],
    culture: [
      { category: "Cuisine", body: "Bhopali biryani (lighter than Hyderabadi), kebabs, paya, sutarfeni, malpua. Old-Bhopal cuisine is Lucknow + Bhopal Nawabi." },
      { category: "Festival", body: "Bhopal Ijtema (one of Asia's largest Muslim congregations), Lokrang, Lake Festival." },
      { category: "Dialect", body: "Hindi + Bhopali Urdu (Begumati zubaan) + English. Bundelkhandi influence to the east." },
      { category: "Heritage", body: "Begum-era zenana architecture + Charles Correa modernism + post-disaster civic reinvention." },
    ],
    economy: [
      { cluster: "Government & PSU", body: "MP state capital — Vidhan Sabha, secretariat, BHEL Bhopal, public-sector procurement." },
      { cluster: "Education", body: "IISER Bhopal, MANIT, AIIMS Bhopal, NLIU — central India's research-and-medical-education bench." },
      { cluster: "Pharma + manufacturing", body: "Mandideep + Govindpura industrial belts — pharma, electricals, light engineering." },
      { cluster: "Tourism + heritage", body: "Sanchi, Bhimbetka, Pachmarhi within day-trip range — Bhopal is the gateway to MP's heritage circuit." },
    ],
    whyWeServe:
      "Bhopal's revenue mix is heavy on state government, PSU, and central-board buyers — and they procure on RFP, not Razorpay. The downloadable proposal kit beats the homepage redesign every time. We ship the GeM-ready capability deck and the bilingual outreach.",
    didYouKnow: [
      "Bhopal was ruled by four successive Begums for 107 years (1819–1926) — one of the longest documented matriarchal successions in any Indian princely state.",
      "Taj-ul-Masajid (literally 'Crown of Mosques') is Asia's largest mosque.",
      "The Bhimbetka rock shelters (45 km from Bhopal) hold prehistoric paintings dated 30,000 years old — among the oldest known human artworks.",
    ],
    languages: ["Hindi", "Urdu", "English"],
    foundedYear: "11th century (Bhoj era)",
  },
};

export function getCityIdentity(slug: string): CityIdentity | undefined {
  return CITY_IDENTITY[slug];
}
