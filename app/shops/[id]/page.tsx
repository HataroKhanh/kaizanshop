"use client";
import Header from "@/app/components/Header";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { Product } from "@/types/definitions";
import { ProductImageGallery } from "@/app/components/shops/ProductImageGallery";
import { ProductDetails } from "@/app/components/shops/ProductDetails";
import { CommentsSection } from "@/app/components/shops/CommentsSection";

const fetcher = (url: string) =>
  fetch(url, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  }).then((res) => res.json());

export default function ProductPage() {
  const { id } = useParams();
  const session = useSession();
  const router = useRouter();
  const { data, error, isLoading, mutate } = useSWR<
    Product | { error: string }
  >(`/api/products/get_self_product?id=${id}`, fetcher);

  const handleEdit = () => {
    router.push(`/myproducts/editproduct/${id}`);
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
          Đang tải dữ liệu...
        </div>
      </>
    );
  }

  if (error || (data && "error" in data)) {
    return (
      <>
        <Header />
        <div className="p-8 text-center text-red-500">Không thấy sản phẩm</div>
      </>
    );
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const isOwner = session.data?.user.id === data?.owner?.id;

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <section className="grid grid-cols-1 md:grid-cols-2 mb-8 gap-6 md:gap-10 lg:gap-20">
          <ProductImageGallery images={data.images || []} />
          <ProductDetails
            product={data}
            isOwner={isOwner}
            onEdit={handleEdit}
          />
        </section>
        <CommentsSection product={data} onRefresh={mutate} />
      </main>
    </>
  );
}
