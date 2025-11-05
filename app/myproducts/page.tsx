"use client";
import Header from "../components/Header";
import useSWR from "swr";
import { MyProductsHeader } from "../components/myproducts/MyProductsHeader";
import { MyProductsGrid } from "../components/myproducts/MyProductsGrid";

interface Product {
  idProduct: string;
  nameProduct: string;
  description: string;
  price: number;
  count?: number;
  rate?: number;
  images: { id: string }[];
}

export default function MyProductsPage() {
  const { data, isLoading } = useSWR<Product[]>(
    "/api/products/show_shop_self",
    (url: any) =>
      fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json())
  );

  return (
    <>
      <Header />
      <section className="flex flex-col mx-auto mt-6 sm:mt-10 p-4 sm:p-8 pt-0 max-w-7xl transition-colors duration-300 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <MyProductsHeader />
        <MyProductsGrid isLoading={isLoading} data={data} />
      </section>
    </>
  );
}
