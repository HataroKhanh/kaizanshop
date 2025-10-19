"use client";
import { Star,Badge } from "./utils/Index";

type Product = {
  id: string;
  title: string;
  price: number;
  currency: string;
  image: string;
  shopId: string;
  rating?: number;
  sold?: number;
  tags?: string[];
};

export default function ProductCard({ p }: { p: Product }) {
  return (
    <article className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-white dark:bg-neutral-950 hover:shadow-lg transition-shadow">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={p.image}
          alt={p.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-2 top-2 flex gap-2">
          {p.tags?.slice(0, 2).map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="line-clamp-2 text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-100">
          {p.title}
        </h3>
        <div className="mt-1.5 flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
          <Star className="w-3.5 h-3.5" /> {p.rating?.toFixed(1)} • {p.sold}+
          sold
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
            {new Intl.NumberFormat(undefined, {
              style: "currency",
              currency: p.currency,
            }).format(p.price)}
          </div>
          <button className="rounded-xl border border-neutral-300 dark:border-neutral-700 px-3 py-1.5 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900">
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}
