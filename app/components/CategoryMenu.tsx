"use client";
export default function CategoryMenu({ items }: { items: string[] }) {
  return (
    <div className="sticky flex top-16 z-20 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2 overflow-x-auto py-2 no-scrollbar">
          {items.map((c) => (
            <a
              key={c}
              href={`#/category/${encodeURIComponent(c)}`}
              className="shrink-0 rounded-xl border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-900"
            >
              {c}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}