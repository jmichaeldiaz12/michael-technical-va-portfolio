import Image from "next/image";
import ScreenshotPlaceholder from "./ScreenshotPlaceholder";
import type { Project } from "@/types";

export default function ProjectGallery({
  screenshots,
  preview,
}: {
  screenshots: Project["screenshots"];
  preview?: Project["preview"];
}) {
  if (screenshots.length > 0) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {screenshots.map((s) => (
          <Image
            key={s.src}
            src={s.src}
            alt={s.alt}
            width={1200}
            height={750}
            sizes="(min-width: 640px) 50vw, 100vw"
            className="h-auto w-full rounded-block border border-rule"
          />
        ))}
      </div>
    );
  }
  if (preview) {
    return (
      <figure>
        {/* Plain img: SVG diagrams bypass the image optimizer. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={preview.src}
          alt={preview.alt}
          width={1200}
          height={750}
          loading="lazy"
          className="h-auto w-full rounded-block border border-rule bg-paper"
        />
        <figcaption className="mt-3 text-sm text-muted">{preview.caption}</figcaption>
      </figure>
    );
  }
  return <ScreenshotPlaceholder />;
}
