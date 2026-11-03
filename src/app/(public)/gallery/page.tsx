
import type { Metadata } from "next";

import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { getPublicGalleryItems } from "@/lib/data/gallery";

export const metadata: Metadata = {
  title: "Gallery | Nepal Buildcon International Expo",
  description:
    "Explore photos, exhibition highlights, exhibitors, " +
    "building materials, construction products and trade " +
    "visitors at Nepal Buildcon International Expo.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Gallery | Nepal Buildcon International Expo",
    description:
      "Explore exhibition highlights and memorable moments " +
      "from Nepal Buildcon International Expo.",
    type: "website",
  },
};

// Read files from public/images/gallery on the server.
// Newest modified images appear first.
export default async function GalleryPage() {
  const galleryItems = await getPublicGalleryItems();

  return (
    <>
      <PageHero
        title="Gallery"
        intro="Explore the highlights and memorable moments from Nepal Buildcon International Expo."
      />

      <section className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
        <Container>
          {galleryItems.length > 0 ? (
            <GalleryGrid items={galleryItems} />
          ) : (
            <div className="flex min-h-[260px] flex-col items-center justify-center rounded-xl border border-[#111111]/10 bg-[#FAFAFA] px-6 text-center">
              <h2 className="text-xl font-bold text-[#171717]">
                Gallery Coming Soon
              </h2>

              <p className="mt-2 max-w-md text-sm leading-relaxed text-[#777777]">
                Exhibition photos and event highlights
                will be available here soon.
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
