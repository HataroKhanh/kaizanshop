import { ProductType } from "@/utils/definitions";
import { Tag } from "lucide-react";
import { formatPrice } from "@/utils/formatPrice"; 
import Link from "next/link";
export default function ProductCard({ data }: { data: ProductType }) {
  const {
    _id,
    name,
    price,
    description,
    category,
    author,
    images,
    attributes,
    created_at,
  } = data;
  return (
    <article
      key={_id.toString()}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <Link href={`/product/${_id.toString()}`}>
      <div className="aspect-[4/3] w-full bg-slate-100" aria-hidden>
        {/* Replace with next/image when real assets exist */}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold text-slate-900 group-hover:text-sky-700">
            {name}
          </h3>
          <span className="shrink-0 rounded-lg bg-sky-50 px-2 py-1 text-xs font-medium text-sky-700 ring-1 ring-sky-100">
            {formatPrice(price)}
          </span>
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-slate-600">
          {description}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {category.map((c) => (
            <Tag key={c}>{c}</Tag>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <button className="rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-700">
            Mua / Xem chi tiết
          </button>
          <button className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-slate-300">
            Thêm vào giỏ
          </button>
        </div>
      </div>
      </Link>
    </article>
  );
}
