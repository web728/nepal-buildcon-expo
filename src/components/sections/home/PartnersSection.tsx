import { OrganiserLogos } from "@/components/ui/OrganiserLogos";
import { PartnerLogo } from "@/components/ui/PartnerLogo";
import {
  getActivePartners,
  type PartnerSummary,
} from "@/lib/data/partners";
import { PartnersSectionClient } from "./PartnersSectionClient";

export async function PartnersSection() {
  let partners: PartnerSummary[] = [];

  try {
    partners = await getActivePartners();
  } catch (error) {
    console.error("Failed to load active partners:", error);
  }

  return (
    <PartnersSectionClient
      organiserLogos={<OrganiserLogos />}
      partnerLogos={partners.map((partner) => (
        <PartnerLogo
          key={partner._id}
          partner={partner}
        />
      ))}
    />
  );
}