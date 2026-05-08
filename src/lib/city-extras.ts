/**
 * Per-city extras layered on top of `INDIA_CITIES` in `./cities.ts`.
 *
 *   - `hiddenGem`   — a sharp, opinionated operational insight specific to the
 *                     city. The thing other agencies miss. Used in the
 *                     "hidden gem" callout on the city page; differentiates
 *                     the page from the boilerplate "we serve {city}" pages
 *                     Google demotes.
 *   - `globalPeers` — 2–3 world cities whose market shape (industry mix,
 *                     buyer profile, ad-market dynamics) mirrors the Indian
 *                     metro. Used in the "global peers" card to anchor our
 *                     positioning ("we apply Stuttgart-grade ERP discipline
 *                     to Pune manufacturing"). Real cities, real reasons.
 *
 * Kept in a separate file from `INDIA_CITIES` so the surgical SEO copy in
 * `cities.ts` stays untouched — extras are intentionally additive.
 */

export type CityIntentTag =
  | "D2C"
  | "BFSI"
  | "Real Estate"
  | "EdTech"
  | "SaaS"
  | "Manufacturing"
  | "Pharma / Healthcare"
  | "Auto"
  | "Logistics / Trade"
  | "Heritage / Craft"
  | "IT Services"
  | "Government / PSU"
  | "Legacy Commerce";

export interface CityHiddenGem {
  /** 6–10 word headline — the operational edge */
  title: string;
  /** 2–3 sentence body — the insight in plain operator language */
  body: string;
  /** Quantified proof line (e.g. "3.2x conversion lift") */
  proof: string;
  /** What we ship to extract that edge — 3–5 short tags */
  ourMove: string[];
}

export interface GlobalPeerCity {
  /** Display name (e.g. "Stuttgart") */
  name: string;
  /** ISO country (e.g. "Germany") */
  country: string;
  /** Two-letter ISO code for the flag region — used as label */
  countryCode: string;
  /** lat/lng — drives the world map plot */
  geo: { lat: number; lng: number };
  /** Why this city is the peer — 1–2 sentences */
  reason: string;
  /** The shared market shape — 3–5 short tags */
  shared: CityIntentTag[];
}

export interface CityExtras {
  /** Lower-case ascii slug (matches `CityContent.slug`) */
  slug: string;
  /** The intent / industry tags that define this metro's revenue mix */
  intent: CityIntentTag[];
  /** The hidden-gem insight */
  hiddenGem: CityHiddenGem;
  /** 2–3 international peer cities */
  globalPeers: GlobalPeerCity[];
}

/* -------------------------------------------------------------------------- */
/*                                   DATA                                     */
/* -------------------------------------------------------------------------- */

export const CITY_EXTRAS: Record<string, CityExtras> = {
  mumbai: {
    slug: "mumbai",
    intent: ["D2C", "BFSI", "Real Estate", "SaaS"],
    hiddenGem: {
      title: "The 90-second WhatsApp window is the only ad-market hedge",
      body: "Mumbai CPMs are the highest in India and rising. Brands burning ₹15L+/month on Meta keep optimizing creative when the actual leak is the 4-hour gap between cart abandon and first WhatsApp touch. Close that window to 90 seconds and your paid budget compresses by a third without changing a single ad.",
      proof: "₹2Cr/yr ad budget cut 35% in two quarters with no creative changes",
      ourMove: [
        "WATI / Gupshup recovery flows",
        "Razorpay → WhatsApp under 90s",
        "Klaviyo + WhatsApp dual lifecycle",
        "Cart-recovery analytics live",
      ],
    },
    globalPeers: [
      {
        name: "New York City",
        country: "USA",
        countryCode: "US",
        geo: { lat: 40.7128, lng: -74.006 },
        reason:
          "Same D2C battleground dynamics — highest media costs in the country, attention is the binding constraint, and brands die on slow lifecycle stacks not bad products.",
        shared: ["D2C", "BFSI", "Real Estate"],
      },
      {
        name: "London",
        country: "United Kingdom",
        countryCode: "GB",
        geo: { lat: 51.5074, lng: -0.1278 },
        reason:
          "BFSI capital with strict consumer-data posture (FCA / GDPR) — closest analog for Mumbai's NBFC + insurance funnels we ship under DPDP Act.",
        shared: ["BFSI", "D2C"],
      },
      {
        name: "Singapore",
        country: "Singapore",
        countryCode: "SG",
        geo: { lat: 1.3521, lng: 103.8198 },
        reason:
          "Compact, multi-vertical financial centre where BFSI, fintech, and premium D2C cross-pollinate — the playbook for BKC compresses identically here.",
        shared: ["BFSI", "SaaS", "D2C"],
      },
    ],
  },

  delhi: {
    slug: "delhi",
    intent: ["Real Estate", "EdTech", "BFSI", "IT Services"],
    hiddenGem: {
      title: "Real-estate leads cool 8x after minute five",
      body: "NCR builders pay ₹500–₹2,000 per portal lead and lose 70% of them in the first five minutes because the SDR is on lunch or another call. The agencies optimizing CPC are missing the whole game — sub-5-minute round-robin routing with WhatsApp fallback is the lever, and most CRMs ship without it.",
      proof: "3.2x site-visit conversion within one quarter on Gurugram launch",
      ourMove: [
        "Round-robin SDR routing on WATI",
        "Calendar-locked site-visit booking",
        "RERA-compliant project microsites",
        "5-min auto-reroute on no-pickup",
      ],
    },
    globalPeers: [
      {
        name: "Dubai",
        country: "UAE",
        countryCode: "AE",
        geo: { lat: 25.2048, lng: 55.2708 },
        reason:
          "Same real-estate-driven premium funnel — high-ticket properties, NRI buyers from the same source markets (US, UK, SG), and a winners-take-all 5-minute follow-up rule.",
        shared: ["Real Estate", "BFSI"],
      },
      {
        name: "Toronto",
        country: "Canada",
        countryCode: "CA",
        geo: { lat: 43.6532, lng: -79.3832 },
        reason:
          "Sprawling NCR-shaped metro (GTA = Greater Toronto Area), heavy real estate and education spend, large diaspora pulling cross-border buyers — same systems shape.",
        shared: ["Real Estate", "EdTech"],
      },
      {
        name: "Beijing",
        country: "China",
        countryCode: "CN",
        geo: { lat: 39.9042, lng: 116.4074 },
        reason:
          "EdTech and coaching saturation comparable only to NCR — both markets are defined by parental urgency and exam-funnel infrastructure at population scale.",
        shared: ["EdTech", "Real Estate"],
      },
    ],
  },

  bengaluru: {
    slug: "bengaluru",
    intent: ["SaaS", "IT Services", "D2C"],
    hiddenGem: {
      title: "Engineering buyers read /docs before /pricing",
      body: "Bengaluru SaaS marketing sites are losing US deals because the buyer — usually a tech lead — bounces from the hero, scrolls past the pricing page, and lands on /docs to evaluate. If your docs look pitch-decky, the deal is over. The real funnel is /pricing → /docs → /demo, and most agencies don't even ship a /docs page.",
      proof: "Organic demos +280%, demo-to-close +41% in 90 days",
      ourMove: [
        "Live product screenshots (no mockups)",
        "Public pricing calculator",
        "Developer-doc-style integration pages",
        "Programmatic comparison vs G2 / Capterra",
      ],
    },
    globalPeers: [
      {
        name: "San Francisco",
        country: "USA",
        countryCode: "US",
        geo: { lat: 37.7749, lng: -122.4194 },
        reason:
          "The Bengaluru SaaS reference market — same engineering-honest buyer, same Stripe-first stack, and most Bengaluru ARR is sold here. You sell to SF, you ship like SF.",
        shared: ["SaaS", "IT Services"],
      },
      {
        name: "Tel Aviv",
        country: "Israel",
        countryCode: "IL",
        geo: { lat: 32.0853, lng: 34.7818 },
        reason:
          "Highest dev-tool startup density per capita; same architecture-first marketing pattern — public roadmap, integration matrix, technical pricing page.",
        shared: ["SaaS"],
      },
      {
        name: "Dublin",
        country: "Ireland",
        countryCode: "IE",
        geo: { lat: 53.3498, lng: -6.2603 },
        reason:
          "European B2B SaaS gateway — multi-currency, GDPR-native checkout, US-first revenue with EU operations: same compliance posture we build for Bengaluru exporters.",
        shared: ["SaaS", "IT Services"],
      },
    ],
  },

  pune: {
    slug: "pune",
    intent: ["Manufacturing", "Auto", "IT Services", "EdTech"],
    hiddenGem: {
      title: "Dealer portals beat marketing sites for manufacturers",
      body: "Pune manufacturers in Chakan, Pimpri, and Hinjewadi are spending on marketing sites that don't move revenue, while their dealers — who are the actual buyers — are still calling reps for stock and price lists. The lever isn't the brochure; it's a Tally-integrated dealer login with WhatsApp order updates.",
      proof: "Quote-to-dispatch −42%, 18 hours/week of rep time recovered",
      ourMove: [
        "Tally / Marg / SAP-B1 catalog pipe",
        "Role-based dealer logins",
        "WhatsApp order-status broadcasts",
        "GST e-invoice on every order",
      ],
    },
    globalPeers: [
      {
        name: "Stuttgart",
        country: "Germany",
        countryCode: "DE",
        geo: { lat: 48.7758, lng: 9.1829 },
        reason:
          "Auto-component manufacturing capital — same conservative buyer, same supplier-portal-as-revenue-system model, same demand for ISO-grade documentation in the front-end.",
        shared: ["Manufacturing", "Auto"],
      },
      {
        name: "Detroit",
        country: "USA",
        countryCode: "US",
        geo: { lat: 42.3314, lng: -83.0458 },
        reason:
          "Tier-1 / tier-2 supplier ecosystem mirroring Chakan and Pimpri-Chinchwad — quote-to-cash compression is the metric that wins contracts.",
        shared: ["Manufacturing", "Auto"],
      },
      {
        name: "Munich",
        country: "Germany",
        countryCode: "DE",
        geo: { lat: 48.1351, lng: 11.582 },
        reason:
          "Manufacturing + IT corridor in one city — same dual-personality market we serve across Hinjewadi (IT) and Chakan (manufacturing).",
        shared: ["Manufacturing", "IT Services"],
      },
    ],
  },

  chennai: {
    slug: "chennai",
    intent: ["Auto", "Pharma / Healthcare", "IT Services", "D2C"],
    hiddenGem: {
      title: "Tamil-first SEO converts 3–4x on healthcare + education",
      body: "Chennai healthcare and coaching buyers Google in Tamil more than agencies admit — 'பல் மருத்துவர் அண்ணா நகர்', 'NEET coaching சென்னை'. Sites that ship en-only schema lose the bottom-of-funnel intent to whoever bothered with bilingual structured data. Most agencies don't bother.",
      proof: "+62% organic appointments inside 4 months on a derma chain",
      ourMove: [
        "Bilingual hreflang + Tamil schema",
        "Locality pages per Anna Nagar / OMR / Velachery",
        "Tamil voice-to-text in EMR",
        "Google Business Profile in Tamil",
      ],
    },
    globalPeers: [
      {
        name: "Detroit",
        country: "USA",
        countryCode: "US",
        geo: { lat: 42.3314, lng: -83.0458 },
        reason:
          "Auto-manufacturing twin — Chennai's Sriperumbudur belt mirrors Detroit's tier-1 supplier model, with the same plant-portal demand we ship.",
        shared: ["Auto", "Manufacturing"],
      },
      {
        name: "Boston",
        country: "USA",
        countryCode: "US",
        geo: { lat: 42.3601, lng: -71.0589 },
        reason:
          "Healthcare and pharma R&D density mirrors Chennai's hospital-and-medical-device cluster — same compliance posture, same long-cycle buyer.",
        shared: ["Pharma / Healthcare"],
      },
      {
        name: "Atlanta",
        country: "USA",
        countryCode: "US",
        geo: { lat: 33.749, lng: -84.388 },
        reason:
          "IT-services and BPO twin — same global-delivery model, same multi-shore staffing economics that Chennai's OMR corridor runs on.",
        shared: ["IT Services"],
      },
    ],
  },

  hyderabad: {
    slug: "hyderabad",
    intent: ["Pharma / Healthcare", "IT Services", "SaaS"],
    hiddenGem: {
      title: "Pharma buyers want compliance pages before product pages",
      body: "Hyderabad pharma and biotech buyers — procurement at hospitals, regulatory at CDSCO partners — Google for your DMF, GMP, and quality docs before they ever look at your product range. If your /quality and /compliance pages don't outrank your homepage on intent searches, you're invisible to the actual buyer.",
      proof: "RFQ volume +220% in 6 months for a Genome Valley exporter",
      ourMove: [
        "Public DMF / GMP / CDSCO landing pages",
        "Schema-rich quality certifications",
        "Multilingual product datasheets",
        "Procurement-facing inquiry forms",
      ],
    },
    globalPeers: [
      {
        name: "Boston",
        country: "USA",
        countryCode: "US",
        geo: { lat: 42.3601, lng: -71.0589 },
        reason:
          "Biotech and pharma R&D capital of the US — same hospital-research-pharma triad we serve in HITEC City and Genome Valley.",
        shared: ["Pharma / Healthcare", "SaaS"],
      },
      {
        name: "Basel",
        country: "Switzerland",
        countryCode: "CH",
        geo: { lat: 47.5596, lng: 7.5886 },
        reason:
          "Pharma cluster city (Roche, Novartis HQs) — Basel's compliance-first buyer is the closest international analog to a Hyderabad CDMO procurement team.",
        shared: ["Pharma / Healthcare"],
      },
      {
        name: "Austin",
        country: "USA",
        countryCode: "US",
        geo: { lat: 30.2672, lng: -97.7431 },
        reason:
          "Mid-stage SaaS / IT migration city, similar in shape to HITEC City — engineering bench scaling without the SF cost base.",
        shared: ["SaaS", "IT Services"],
      },
    ],
  },

  kolkata: {
    slug: "kolkata",
    intent: ["Legacy Commerce", "EdTech", "BFSI"],
    hiddenGem: {
      title: "Kolkata buyers convert on the phone, not the form",
      body: "Trader, jeweller, and B2B buyers in BBD Bagh and Park Street will fill a form if it offers a callback in 10 minutes. They will not fill one that promises an email reply. Most agencies ship the same 'submit and we'll be in touch' template that's been killing Kolkata revenue for a decade.",
      proof: "Inquiry-to-conversation rate doubled in 60 days for a B2B textile exporter",
      ourMove: [
        "Callback-now CTA over email forms",
        "Click-to-call native on mobile",
        "WhatsApp opt-in over email opt-in",
        "Bengali-language confirmation flows",
      ],
    },
    globalPeers: [
      {
        name: "Liverpool",
        country: "United Kingdom",
        countryCode: "GB",
        geo: { lat: 53.4084, lng: -2.9916 },
        reason:
          "Legacy port city with deep commerce roots and a reinvention story — the same B2B-trader-meets-modern-buyer tension Kolkata is working through.",
        shared: ["Legacy Commerce", "BFSI"],
      },
      {
        name: "Edinburgh",
        country: "Scotland",
        countryCode: "GB",
        geo: { lat: 55.9533, lng: -3.1883 },
        reason:
          "Education-heavy heritage city with a strong financial-services backbone — mirrors Kolkata's college-and-bank ecosystem.",
        shared: ["EdTech", "BFSI"],
      },
    ],
  },

  ahmedabad: {
    slug: "ahmedabad",
    intent: ["Manufacturing", "Logistics / Trade", "D2C"],
    hiddenGem: {
      title: "Textile clusters live on WhatsApp groups, not portals",
      body: "Naroda, Narol, and Vatva textile traders run their entire B2B day inside WhatsApp groups. A website doesn't reach them; a catalog link seeded into the right group does. Most agencies build for the buyer they imagine in a desk chair — we build for the buyer with the phone in their hand on the shop floor.",
      proof: "Inbound RFQs +180% in 90 days from WhatsApp catalog seeding",
      ourMove: [
        "Catalog-on-WhatsApp distribution",
        "Vernacular-Gujarati order flows",
        "Tally → cloud ERP migration",
        "GST e-invoicing on every B2B order",
      ],
    },
    globalPeers: [
      {
        name: "Manchester",
        country: "United Kingdom",
        countryCode: "GB",
        geo: { lat: 53.4808, lng: -2.2426 },
        reason:
          "Original global textile capital and the historical mirror to Ahmedabad — same industrial DNA, same cluster-led B2B economics.",
        shared: ["Manufacturing", "Legacy Commerce"],
      },
      {
        name: "Shenzhen",
        country: "China",
        countryCode: "CN",
        geo: { lat: 22.5431, lng: 114.0579 },
        reason:
          "Manufacturing-and-export twin — both cities run on dense supplier clusters where WhatsApp / WeChat is the actual order book.",
        shared: ["Manufacturing", "Logistics / Trade"],
      },
      {
        name: "Istanbul",
        country: "Turkey",
        countryCode: "TR",
        geo: { lat: 41.0082, lng: 28.9784 },
        reason:
          "Textile export gateway between East and West — same SME-led, family-run mid-market shape as Ahmedabad's Naroda / Narol belts.",
        shared: ["Manufacturing", "Heritage / Craft"],
      },
    ],
  },

  jaipur: {
    slug: "jaipur",
    intent: ["Heritage / Craft", "D2C", "Logistics / Trade"],
    hiddenGem: {
      title: "Provenance pages convert craft buyers 3x harder",
      body: "Jaipur jewellery, block-print, and gem buyers — domestic and NRI — pay a premium for traceability. A page that names the cluster, the artisan family, and the technique outperforms a generic 'handmade in India' badge by 3x. Most heritage-craft sites are content-thin where they need to be richest.",
      proof: "Average order value +47% for a block-print exporter after provenance rebuild",
      ourMove: [
        "Block-by-block artisan attribution",
        "Cluster + technique schema markup",
        "Multi-currency NRI checkout (USD/GBP/AED)",
        "GI-tag + SKU-level certification",
      ],
    },
    globalPeers: [
      {
        name: "Florence",
        country: "Italy",
        countryCode: "IT",
        geo: { lat: 43.7696, lng: 11.2558 },
        reason:
          "Heritage-craft capital where lineage and provenance command premium pricing — the exact narrative arc Jaipur exporters need to ship online.",
        shared: ["Heritage / Craft", "D2C"],
      },
      {
        name: "Marrakech",
        country: "Morocco",
        countryCode: "MA",
        geo: { lat: 31.6295, lng: -7.9811 },
        reason:
          "Souk-economy and tourist-driven craft commerce twin — both run on bazaar visibility plus an e-comm export channel.",
        shared: ["Heritage / Craft", "Logistics / Trade"],
      },
      {
        name: "Antwerp",
        country: "Belgium",
        countryCode: "BE",
        geo: { lat: 51.2194, lng: 4.4025 },
        reason:
          "World gem-trade hub with the same supply-chain trust-and-certification dynamic Jaipur's gem and silver belt operates on.",
        shared: ["Heritage / Craft", "Logistics / Trade"],
      },
    ],
  },

  indore: {
    slug: "indore",
    intent: ["Logistics / Trade", "Manufacturing", "EdTech"],
    hiddenGem: {
      title: "Indore SMEs check the tracker UI before they call you",
      body: "Indore is India's logistics throat — Pithampur, the Mhow corridor, and the Madhya Pradesh distribution belt all run consignment-tracking calls all day. Whoever ships a public consignment-lookup widget on the homepage closes the trust gap before the first call. Marketing copy is irrelevant if your tracker UI is missing.",
      proof: "Sales-call inbound −38%, qualified RFQs +95% after tracker shipped",
      ourMove: [
        "Public consignment-lookup widget",
        "WhatsApp shipment status broadcasts",
        "Pithampur-to-port lane content pages",
        "Hindi-first invoice and tracker UI",
      ],
    },
    globalPeers: [
      {
        name: "Memphis",
        country: "USA",
        countryCode: "US",
        geo: { lat: 35.1495, lng: -90.049 },
        reason:
          "FedEx home and US logistics capital — same hub-and-spoke economics and tracking-as-trust dynamic that runs Indore's distribution belt.",
        shared: ["Logistics / Trade"],
      },
      {
        name: "Rotterdam",
        country: "Netherlands",
        countryCode: "NL",
        geo: { lat: 51.9225, lng: 4.4792 },
        reason:
          "Europe's logistics gateway port — same operational obsession with consignment visibility and lane efficiency.",
        shared: ["Logistics / Trade", "Manufacturing"],
      },
      {
        name: "Dubai",
        country: "UAE",
        countryCode: "AE",
        geo: { lat: 25.2048, lng: 55.2708 },
        reason:
          "Re-export trade hub running on dashboard transparency — Indore's MP-belt traders sell into Gulf buyers who expect the Dubai-grade tracker UI.",
        shared: ["Logistics / Trade"],
      },
    ],
  },

  bhopal: {
    slug: "bhopal",
    intent: ["Government / PSU", "EdTech", "Legacy Commerce"],
    hiddenGem: {
      title: "Govt and PSU buyers convert on PDFs, not landing pages",
      body: "Bhopal's revenue mix is heavy on state government, PSU, and central-board-attached buyers — and they procure on RFP, not Razorpay. A downloadable proposal kit with capability statement, GST + MSME certs, and a clean compliance one-pager closes more business than any homepage redesign.",
      proof: "Empanelment success rate +3x for a Bhopal civic-tech firm",
      ourMove: [
        "Downloadable proposal kit (PDF)",
        "MSME / NSIC / GeM-ready capability deck",
        "GeM and CPPP listing optimisation",
        "Hindi + English bilingual outreach",
      ],
    },
    globalPeers: [
      {
        name: "Canberra",
        country: "Australia",
        countryCode: "AU",
        geo: { lat: -35.2809, lng: 149.13 },
        reason:
          "Planned administrative capital — same government-and-PSU procurement dynamics and capability-statement-driven buying cycles.",
        shared: ["Government / PSU"],
      },
      {
        name: "Bern",
        country: "Switzerland",
        countryCode: "CH",
        geo: { lat: 46.948, lng: 7.4474 },
        reason:
          "Federal capital with mid-sized civic and education-board commerce — closest analog to Bhopal's MP-state ecosystem.",
        shared: ["Government / PSU", "EdTech"],
      },
    ],
  },
};

export function getCityExtras(slug: string): CityExtras | undefined {
  return CITY_EXTRAS[slug];
}
