export type MarketFact = {
  id: string;
  value: string;
  label: string;
  detail: string;
  period?: string;
  source?: string;
  sourceUrl?: string;
  lastVerified?: string;
};

/**
 * Figures below are claims published in the 12th Nepal Buildcon
 * International Expo 2027 brochure, not independently verified
 * national statistics. Keep the attribution when displaying them.
 */

export const marketFacts: MarketFact[] = [
  {
    id: "infrastructure-investment",
    value: "$15B+",
    label: "Infrastructure Investment Pipeline",
    detail:
      "Ongoing and planned infrastructure projects span roads and highways, hydropower, urban development, airports and bridges.",
    period: "Ongoing and planned projects",
    source: "12th Nepal Buildcon International Expo 2027 brochure",
  },
  {
    id: "construction-sector-output",
    value: "NPR 177B",
    label: "Projected Construction-Sector GDP",
    detail:
      "Projected construction-sector economic output in Nepal by 2027, indicating the scale of activity anticipated across the industry.",
    period: "2027 projection",
    source: "12th Nepal Buildcon International Expo 2027 brochure",
  },
  {
    id: "business-trade-visitors",
    value: "25,000+",
    label: "Business & Trade Visitors — 11th Edition",
    detail:
      "Reported attendance at the 2026 edition, reflecting participation by visitors from the building and construction industries.",
    period: "5–8 February 2026",
    source: "11th Nepal Buildcon Post Show Report",
    sourceUrl:
      "/downloads/11th_Nepal_Buildcon_International_Expo_2026_Post_Show_Report.pdf",
  },
];

/** Areas of building and construction activity mentioned or reflected
 * in the exhibition brochure. These are sectors, not market forecasts. */
export const opportunityCategories: string[] = [
  "Residential Construction",
  "Commercial Buildings",
  "Roads & Highways",
  "Hydropower & Infrastructure",
  "Building Materials",
  "Construction Machinery",
  "Building Systems & Technology",
  "Architecture & Interiors",
  "Industrial Construction",
];
