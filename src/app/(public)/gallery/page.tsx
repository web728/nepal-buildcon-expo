import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { getPublishedGalleryItems } from "@/lib/data/gallery";

// MongoDB-backed — must reflect admin publish/unpublish immediately.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from Nepal Buildcon International Expo showing exhibitors, products and trade visitors in Kathmandu.",
  alternates: { canonical: "/gallery" },
};

const officialGallery = [
  { _id: "official-1", imageUrl: "/images/gallery/nepal-buildcon-floor-01.jpg", title: "Trade visitors on the Nepal Buildcon exhibition floor" },
  { _id: "official-2", imageUrl: "/images/gallery/nepal-buildcon-floor-02.jpg", title: "Busy product showcase aisle at Nepal Buildcon" },
  { _id: "official-3", imageUrl: "/images/gallery/nepal-buildcon-networking-01.jpg", title: "Industry networking at Nepal Buildcon" },
  { _id: "official-4", imageUrl: "/images/gallery/nepal-buildcon-exhibitor-01.jpg", title: "Exhibitor meeting construction professionals" },
  { _id: "official-5", imageUrl: "/images/gallery/nepal-buildcon-exhibitor-02.jpg", title: "Product discussions at an exhibition stand" },
  { _id: "official-6", imageUrl: "/images/gallery/nepal-buildcon-visitors-01.jpg", title: "Visitors comparing building and construction solutions" },
  { _id: "official-7", imageUrl: "/images/gallery/nepal-buildcon-visitors-02.jpg", title: "Nepal Buildcon trade audience in Kathmandu" },
];

export default async function GalleryPage() {
  const items = await getPublishedGalleryItems();
  const galleryItems = items.length > 0 ? items : officialGallery;

  return (
    <>
      <PageHero title="Gallery" intro="Exhibition-floor highlights from Nepal Buildcon International Expo." />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <GalleryGrid items={galleryItems} />
        </Container>
      </section>
    </>
  );
}
