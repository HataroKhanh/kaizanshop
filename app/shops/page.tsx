"use client";
import Header from "../components/Header";
import useSWR from "swr";
import { ShopProductsList } from "../components/shops/ShopProductsList";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ShopsPage() {
  const { data, error, isLoading } = useSWR("/api/products/show_shop", fetcher);

  return (
    <>
      <Header />
      <ShopProductsList isLoading={isLoading} error={error} data={data} />
    </>
  );
}
