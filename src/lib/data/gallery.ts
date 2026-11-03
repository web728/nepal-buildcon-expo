import "server-only";

import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const GALLERY_DIR = path.join(process.cwd(), "public", "images", "gallery");
const VALID_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

export type PublicGalleryImage = {
  _id: string;
  imageUrl: string;
  title: string;
  /** Last modified timestamp in milliseconds; determines newest-first order. */
  date: number;
};

function titleFromFileName(fileName: string): string {
  return fileName
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function readImages(directory: string, relativeDirectory = ""): Promise<PublicGalleryImage[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const groups = await Promise.all(
    entries.map(async (entry): Promise<PublicGalleryImage[]> => {
      const relativePath = path.join(relativeDirectory, entry.name);
      const absolutePath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return readImages(absolutePath, relativePath);
      }
      if (!entry.isFile() || !VALID_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
        return [];
      }
      try {
        const info = await stat(absolutePath);
        const urlPath = relativePath.split(path.sep).map(encodeURIComponent).join("/");
        return [{
          _id: relativePath,
          imageUrl: `/images/gallery/${urlPath}`,
          title: titleFromFileName(entry.name),
          date: info.mtimeMs,
        }];
      } catch {
        return [];
      }
    })
  );
  return groups.flat();
}

/** Scan public/images/gallery, including subfolders. No database required. */
export async function getPublicGalleryItems(): Promise<PublicGalleryImage[]> {
  try {
    const images = await readImages(GALLERY_DIR);
    return images.sort((a, b) => b.date - a.date || a.title.localeCompare(b.title));
  } catch (error) {
    // An absent folder should simply render the empty gallery.
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      console.error("Unable to read public gallery images:", error);
    }
    return [];
  }
}
