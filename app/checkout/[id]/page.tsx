// app/buy/[id]/page.tsx
"use server";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Product } from "@/utils/definitions";
import ProductTable from "@/app/components/checkout/ProductTable";
import PaymentCard from "@/app/components/checkout/PaymentCard";
import clientPromise from "@/lib/mongodb";
import randomSepayCode from "@/utils/random_sepay_code";

export default async function CheckOutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 1. Lấy sản phẩm
  const productRes = await fetch(
    `${process.env.NEXTAUTH_URL}/api/products/get_self_product?id=${id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    }
  );

  if (!productRes.ok) {
    return (
      <>
        <Header />
        <main className="max-w-7xl mx-auto py-20 px-4 text-center">
          <p className="text-red-600 text-lg">
            Không tìm thấy sản phẩm hoặc có lỗi xảy ra.
          </p>
        </main>
        <Footer />
      </>
    );
  }

  const data: Product = await productRes.json();

  if (!data.nameProduct) {
    return (
      <>
        <Header />
        <main className="max-w-7xl mx-auto py-20 px-4 text-center">
          <p className="text-red-600 text-lg">Sản phẩm không hợp lệ.</p>
        </main>
        <Footer />
      </>
    );
  }

  const client = await clientPromise;
  const sepay = client.db("sepay");
  const collection = sepay.collection("payments");

  const existing = await collection.findOne({
    productId: id,
    status: "pending",
  });
  let code: string;

  if (existing) {
    code = existing.code;
  } else {
    code = randomSepayCode();
    await collection.insertOne({
      code,
      productId: id,
      amount: data.price,
      status: "pending",
      createdAt: new Date(),
    });
  }

  const mainImage = data.images?.[0]?.id
    ? `/api/image/get_image?id=${data.images[0].id}`
    : "/fallback-product.webp";

  return (
    <>
      <Header />

      <main className="flex-1 max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <section className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-100">
            Thanh toán
          </h1>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ProductTable product={data} mainImage={mainImage} />
          </div>
          <div className="lg:col-span-1">
            {/* Truyền code xuống client */}
            <PaymentCard code={code} dataProduct={data} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
