/**
 * Visitor audiences from page 4 of the 12th Nepal Buildcon 2027 brochure.
 * Original audience labels are retained in visitorProfiles; visitorGroups
 * arranges those labels for presentation, without implying verified attendance.
 */
export const visitorProfiles = [
  "Academics & Researchers",
  "Architects & Planners",
  "Builders & Developers",
  "Building Contractors",
  "Building Material Suppliers",
  "Construction Industry Professionals",
  "Consulting Engineers, Universities & Technical Research Institutes",
  "Contractors & Subcontractors",
  "Dealers & Distributors",
  "Engineers",
  "Energy Efficiency Experts",
  "Facility Managers",
  "General Visitors",
  "Government Agencies & Building Authorities",
  "Homeowners & Property Investors",
  "Hoteliers",
  "Hospitality Industry Professionals",
  "Importers",
  "Interior Design Professionals",
  "Investors & Financiers",
  "Media & Press",
  "Project Managers & Consultants",
  "Safety & Security Professionals",
  "Sourcing Professionals from Hospitality & Health Facilities",
  "Structural & Civil Engineers",
  "Urban Planners & Designers",
] as const;

export interface VisitorGroup {
  slug: string;
  name: string;
  description: string;
  roles: readonly (typeof visitorProfiles)[number][];
}

/** All 26 brochure audiences appear exactly once across these six groups. */
export const visitorGroups: VisitorGroup[] = [
  {
    slug: "design-engineering",
    name: "Architecture, Design & Engineering",
    description: "Professionals involved in planning, design, technical assessment and specification.",
    roles: [
      "Architects & Planners",
      "Engineers",
      "Structural & Civil Engineers",
      "Interior Design Professionals",
      "Urban Planners & Designers",
      "Energy Efficiency Experts",
    ],
  },
  {
    slug: "construction-projects",
    name: "Construction & Project Delivery",
    description: "Teams responsible for building, developing and managing projects.",
    roles: [
      "Builders & Developers",
      "Building Contractors",
      "Contractors & Subcontractors",
      "Construction Industry Professionals",
      "Project Managers & Consultants",
    ],
  },
  {
    slug: "trade-supply",
    name: "Trade, Supply & Distribution",
    description: "Organisations sourcing and supplying building and construction products.",
    roles: [
      "Building Material Suppliers",
      "Dealers & Distributors",
      "Importers",
    ],
  },
  {
    slug: "property-facilities",
    name: "Property, Facilities & Hospitality",
    description: "Property stakeholders and teams responsible for operational spaces.",
    roles: [
      "Facility Managers",
      "Homeowners & Property Investors",
      "Hoteliers",
      "Hospitality Industry Professionals",
      "Sourcing Professionals from Hospitality & Health Facilities",
      "Safety & Security Professionals",
    ],
  },
  {
    slug: "institutions-research",
    name: "Government, Research & Institutions",
    description: "Public, academic and technical organisations with an interest in the sector.",
    roles: [
      "Academics & Researchers",
      "Consulting Engineers, Universities & Technical Research Institutes",
      "Government Agencies & Building Authorities",
    ],
  },
  {
    slug: "industry-community",
    name: "Industry & General Visitors",
    description: "Other audiences interested in construction products and industry developments.",
    roles: [
      "Investors & Financiers",
      "Media & Press",
      "General Visitors",
    ],
  },
];
