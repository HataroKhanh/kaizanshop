"use client"
import { Badge } from "./utils/Index"; 

type Shop = {
  id: string;
  name: string;
  avatar: string;
  banner: string;
  rating: number;
  products: number;
  isVerified?: boolean;
};

export default function ShopCard({ s }: { s: Shop }) {
  return (
    <a
      href={`#/shop/${s.id}`}
      className="block rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-white dark:bg-neutral-950 hover:shadow-lg transition-shadow"
    >
      <div className="relative h-28 w-full">
        <img
          src={s.banner}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex items-center gap-3 p-4">
        <img
          src={s.avatar}
          alt={s.name}
          className="h-12 w-12 rounded-full object-cover"
          loading="lazy"
        />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-semibold">{s.name}</h3>
            {s.isVerified && <Badge>Verified</Badge>}
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            <span className="font-medium">{s.rating.toFixed(1)}</span> rating •{" "}
            {s.products} products
          </p>
        </div>
      </div>
    </a>
  );
}
