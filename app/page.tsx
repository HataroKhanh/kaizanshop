"use client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import useSWR from "swr";
import { HeroSection } from "./components/home/HeroSection";
import { FeaturedProductsSection } from "./components/home/FeaturedProductsSection";
import { ShopProductsList } from "./components/shops/ShopProductsList";

export default function HomePage() {
  const {data,error,isLoading} = useSWR("/api/products/show_shop", (url) =>
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json())
  );

  return (
    <>
      <Header />
      <HeroSection />
      <ShopProductsList isLoading={isLoading} error={error} data={data} />
      <Footer />
    </>
  );
}
