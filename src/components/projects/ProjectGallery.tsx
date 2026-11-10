import Image from "next/image";
import ScreenshotPlaceholder from "./ScreenshotPlaceholder";
import type { Project } from "@/types";

export default function ProjectGallery({ screenshots }: { screenshots: Project["screenshots"] }) {
  if (screenshots.length === 0) return <ScreenshotPlaceholder />;
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
