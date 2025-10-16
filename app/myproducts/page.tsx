"use client";
import { useSession } from "next-auth/react";
import Header from "../components/Header";
import useSWR from "swr";
import Loading from "../components/utils/Loading";
import { CiSquarePlus } from "react-icons/ci";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/utils/formatPrice";

const exData = [
  {
    id: "1",
    nameProduct: "Sản phẩm 1",
    price: 100000,
    description: "Mô tả sản phẩm 1",
    image: ["https://via.placeholder.com/150"],
    shopId: "shop1",

    countSold: 1,
  },
  {
    id: "2",
    nameProduct: "Sản phẩm 2",
    price: 200000,
    description: "Mô tả sản phẩm 2",
    image: ["https://via.placeholder.com/150"],
    shopId: "shop1",
    countSold: 2,
  },
  {
    id: "3",
    nameProduct: "Sản phẩm 3",
    price: 300000,
    description: "Mô tả sản phẩm 3",
    image: ["https://via.placeholder.com/150"],
    shopId: "shop1",
    countSold: 100,
  },
  {
    id: "4",
    nameProduct: "Sản phẩm 4",
    price: 400000,
    description: "Mô tả sản phẩm 4",
    image: ["https://via.placeholder.com/150"],
    shopId: "shop1",
    countSold: 2,
  },
  {
    id: "5",
    nameProduct: "Sản phẩm 5",
    price: 500000,
    description: "Mô tả sản phẩm 5",
    image: ["https://via.placeholder.com/150"],
    shopId: "shop1",
    countSold: 5,
  },
];

export default function MyProductsPage() {
  const { data: session } = useSession();
  const swr = useSWR("", (url) =>
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json())
  );

  return (
    <>
      <Header />
      <section className='flex flex-col mx-auto mt-10 p-20 pt-0'>
        <div className=' py-10  flex flex-row justify-between'>
          <h1 className='text-2xl p-5 pl-0'>
            Sản phẩm của tôi
          </h1>
          <div className='flex flex-row gap-1 items-center px-5 pr-0'>
            <div className='flex flex-row gap-1 items-center bg-blue-900 p-2 rounded-xl '>
              <CiSquarePlus className=''></CiSquarePlus>
              <Link
                className='cursor-pointer'
                href='/myproducts/newproduct'>
                {" "}
                Tạo sản phẩm mới
              </Link>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
          {exData.map((product) => (
            <div key={product.id}>
              <div className='animate-pulse p-10 border-1 border-amber-100 h-70 flex flex-row bg-cover gap-5'>
                <div className='flex flex-col gap-1'>
                  <Image
                    src='/example-product.png'
                    className='object-cover w-50 h-50'
                    alt='image'
                    width={200}
                    height={200}></Image>
                  <div className='mt-5  font-semibold'>
                    Giá: {formatPrice(product.price)}
                  </div>

                  <div>
                    Số lần đã bán: {product.countSold}
                  </div>
                </div>
                <Link
                  className='gap-5 flex flex-col'
                  href={product.id}>
                  <h2 className='text-3xl'>
                    {product.nameProduct}
                  </h2>
                  <div>{product.description}</div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
