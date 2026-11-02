/**
 * Exhibition profile — 12th Nepal Buildcon International Expo 2027.
 * Editorial grouping of the product list on page 4 of the 2027 brochure.
 * Repeated brochure entries (e.g. Architectural Hardware) are listed once.
 */
export interface SectorItem {
  name: string;
  slug: string;
  subcategories: string[];
}

export const exhibitionSectors: SectorItem[] = [
  {
    name: "Building Materials",
    slug: "building-materials",
    subcategories: [
      "Cement & Steel", "Concrete Blocks & Machinery", "Gypsum Boards",
      "Lightweight Construction Materials", "Timber & Timber Products",
      "Construction Waste Management",
    ],
  },
  {
    name: "Construction Machinery & Equipment",
    slug: "construction-machinery",
    subcategories: [
      "Earthmoving Equipment", "Demolition Equipment",
      "Quarrying & Mining Equipment", "Construction Tools, Machinery & Tapes",
      "Formwork & Scaffolding", "Surveying Equipment",
    ],
  },
  {
    name: "Steel, Metal & Structural Products",
    slug: "steel-metal-structural",
    subcategories: [
      "Structural Steel Fabrication", "Structural Engineering",
      "Aluminium Extrusions", "Pre-fabricated Structures",
    ],
  },
  {
    name: "Electrical, Power & Lighting",
    slug: "electrical-power-lighting",
    subcategories: [
      "Electricals & Electronics", "Wires & Cables", "Switches & Switchgear",
      "Lighting & LED", "Batteries & Generators",
    ],
  },
  {
    name: "Doors, Windows, Glass & Aluminium",
    slug: "doors-windows-glass-aluminium",
    subcategories: [
      "Doors & Windows", "PVC/uPVC Machinery & Profiles",
      "Decorative Glass & Mirrors", "Architectural Hardware", "Roofing & Façade",
    ],
  },
  {
    name: "HVAC & Building Services",
    slug: "hvac-building-services",
    subcategories: [
      "Air Conditioning & HVAC", "Lifts & Elevators",
      "Acoustics & Soundproofing Solutions", "Noise Control Products",
    ],
  },
  {
    name: "Prefab, Precast & Modular Buildings",
    slug: "prefab-precast-modular",
    subcategories: [
      "Modular Construction Solutions", "Pre-fabricated Structures",
      "Concrete Blocks & Machinery", "Lightweight Construction Materials",
    ],
  },
  {
    name: "Tiles, Marble, Stone & Surfaces",
    slug: "tiles-marble-stone",
    subcategories: [
      "Tiles & Sanitary Ware", "Marble & Stone", "Flooring & Wall Coverings",
      "Industrial Flooring Solutions",
    ],
  },
  {
    name: "Water, Plumbing & Pumps",
    slug: "water-plumbing-pumps",
    subcategories: [
      "Plumbing Fittings & Accessories", "Kitchen & Bathroom Solutions",
    ],
  },
  {
    name: "Solar, Energy & Power Solutions",
    slug: "solar-energy-power",
    subcategories: [
      "Renewable Energy Systems", "Solar, Wind & Other Green Energy Products",
      "Batteries & Generators",
    ],
  },
  {
    name: "Hardware, Tools & Fasteners",
    slug: "hardware-tools-fasteners",
    subcategories: [
      "Construction Tools, Machinery & Tapes", "Architectural Hardware",
      "Surveying Equipment",
    ],
  },
  {
    name: "Paints, Coatings & Chemicals",
    slug: "paints-coatings-chemicals",
    subcategories: [
      "Paints & Coatings", "Adhesives & Sealants",
      "Construction Chemicals & Waterproofing",
    ],
  },
  {
    name: "Sanitaryware & Bathroom",
    slug: "sanitaryware-bathroom",
    subcategories: [
      "Tiles & Sanitary Ware", "Kitchen & Bathroom Solutions",
      "Plumbing Fittings & Accessories",
    ],
  },
  {
    name: "Fire, Safety & Security",
    slug: "fire-safety-security",
    subcategories: [
      "Fire Protection Systems", "Passive Fire Protection", "Safety & Security",
    ],
  },
  {
    name: "Interiors, Technology & Finishing",
    slug: "interiors-finishing-materials",
    subcategories: [
      "Interior Decorating Products", "Outdoor Furniture & Landscaping",
      "Building Automation", "Home Automation Systems",
      "Building Information Modelling (BIM) Software", "Infrastructure Software",
      "Flooring & Wall Coverings",
    ],
  },
];
