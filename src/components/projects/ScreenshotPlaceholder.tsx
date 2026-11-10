import { ImageOff } from "lucide-react";

export default function ScreenshotPlaceholder() {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
      <ImageOff size={28} aria-hidden="true" />
      <p className="text-sm font-medium">Screenshots coming soon</p>
    </div>
  );
}
