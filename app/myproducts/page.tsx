"use client";
import { useSession } from "next-auth/react";
import Header from "../components/Header";
import useSWR from "swr";
import { CiSquarePlus } from "react-icons/ci";
import Link from "next/link";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";

export default function MyProductsPage() {
  const { data: session } = useSession();
  const swr = useSWR("/api/products/show_shop_self", (url) =>
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json())
  );

  return (
    <>
      <Header />
      <section className="flex flex-col mx-auto mt-10 p-20 pt-0 max-w-7xl">
        <div className=" py-10  flex flex-row justify-between ">
          <h1 className="text-2xl p-5 pl-0">Sản phẩm của tôi</h1>
          <div className="flex flex-row gap-1 items-center px-5 pr-0">
            <div className="flex flex-row gap-1 items-center bg-blue-900 p-2 rounded-xl ">
              <CiSquarePlus className=""></CiSquarePlus>
              <Link className="cursor-pointer" href="/myproducts/newproduct">
                {" "}
                Tạo sản phẩm mới
              </Link>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {swr.isLoading
            ? null
            : swr.data.map((item: any) => {
                return (
                  <div className="flex flex-col p-5" key={item.idProduct}>
                    <div className="flex flex-col gap-5">
                      {" "}
                      <div className="flex gap-5">
                        <div className="flex-shrink-0">
                          <Image
                            src="/fallback.png"
                            width={200}
                            height={200}
                            className="bg-white "
                            alt={item.nameProduct}
                          ></Image>
                        </div>
                        <div className="flex flex-col gap-2 min-w-0">
                          <h2 className="text-2xl truncate">
                            {item.nameProduct}
                          </h2>
                          <p className="truncate">{item.description}</p>
                          {/* Thêm "truncate" vào đây để số dài không bị vỡ */}
                          <h3 className="truncate">{item.price || 0}</h3>
                        </div>
                      </div>
                      <div className="flex flex-row justify-between align-middle ">
                        <div>
                          <p>
                            Lượt mua: <span>{item.count || 0}</span>
                          </p>
                          <p>
                            Đánh giá: <span>{item.rate || 0}</span>
                          </p>
                        </div>
                        <div className="flex items-center">
                          <Link href={`/products/${item.idProduct}`}>
                            <button className="cursor-pointer border px-5 py-2 rounded-2xl hover:animate-pulse">
                              Xem thêm
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </section>
    </>
  );
}
