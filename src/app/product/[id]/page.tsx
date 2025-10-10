import AddToCart from "@/components/Cart/Add-To-Cart";
import Footer from "@/components/Footer/Footer";
import Gallery from "@/components/Gallery";
import Header from "@/components/Header/Header";
import clientPromise from "@/lib/mongodb";
import { ProductType } from "@/utils/definitions";
import { ObjectId } from "mongodb";
export default async function Product({ params }: { params: { id: string } }) {
  const param = await params;
  const { id } = param;

  const client = await clientPromise;
  const db = client.db("kaizanshop");
  const products = db.collection("products");
  const productInfo = (await products.findOne({
    _id: new ObjectId(id),
  })) as ProductType ;

  const productCart = {
    name : productInfo.name,
    price : productInfo.price
  }



  // fallback images nếu chưa có dữ liệu thực
  const images = [
    "/test.png",
    "/test1.png",
    "/test3.png",
    "/test4.png",
    "/test5.png",
  ];

  return (
    <>
      <Header />
      <section className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Cột ảnh (sticky trên desktop) */}
          <div className="md:sticky md:top-24 h-fit">
            <Gallery images={images} />
          </div>

          {/* Cột thông tin */}
          <div className="flex flex-col gap-6">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              {productInfo?.name ?? "Tên sản phẩm"}
            </h1>

            <p className="text-base text-neutral-600 dark:text-neutral-300">
              {productInfo?.description ?? "Mô tả sản phẩm sẽ hiển thị ở đây."}
            </p>

            <div className="flex items-center justify-between rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4">
              <span className="text-xl md:text-2xl font-bold">
                {productInfo?.price
                  ? `${productInfo.price.toLocaleString()} ₫`
                  : "—"}
              </span>
              {/* {add to cart} */}
              <AddToCart product={
                productCart
              } quantity={1}></AddToCart>
            </div>

            {/* Thêm block attrs nếu cần */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4">
              <h2 className="font-semibold mb-2">Thông tin thêm</h2>
              <ul className="list-disc pl-5 text-sm text-neutral-700 dark:text-neutral-300 space-y-1">
                <li>
                  Danh mục: {(productInfo?.category ?? []).join(", ") || "—"}
                </li>
                <li>
                  Tác giả: {(productInfo?.author ?? []).join(", ") || "—"}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
