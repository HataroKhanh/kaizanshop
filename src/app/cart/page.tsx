"use client";

import { useEffect, useState } from "react";
import { CartType } from "@/utils/definitions";
export default function Cart() {

  const [data, setdata] = useState<CartType>({ count: 0, products: [] });

  const totalProducts = data.products.reduce((rb, item) => {
    rb += item.price
    return rb
  }, 0);

  useEffect(() => {
    const data = sessionStorage.getItem("cart") ?? '{"count":0,"products":[]}';
    const dataParse = JSON.parse(data);
    if (data) {
      setdata(dataParse);
    }
  }, []);



  return (
    <>
      <section className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-10 md:py-16">
        <h1 className="text-4xl">Giỏ hàng</h1>
        <p className="text-sm text-gray-500 mt-2">
          Tổng số lượng: <span className="font-medium">{data.count}</span>
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 pb-16 flex flex-col gap-5 ">
        <div className="overflow-x-auto rounded-lg border ">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-50 dark:bg-[#0a0a0a] ">
              <tr>
                <th className="py-3 px-5 text-left font-medium">
                  Tên sản phẩm
                </th>
                <th className="py-3 px-5 text-left font-medium">Giá</th>
                <th className="py-3 px-5 text-left font-medium">Số lượng</th>
                <th className="py-3 px-5 text-left font-medium">Thành tiền</th>
              </tr>
            </thead>
            <tbody>{/* Product rows here */}
              {
                data.products.map((item) => {
                  return <ProductCard
                    key={item.name.toString()}
                    name={item.name} price={item.price}
                    quantity={item.quantity}
                  >
                  </ProductCard>
                })
              }
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 dark:bg-[#5a606e]">
                <td className="px-4 py-3 font-medium" colSpan={3}>
                  Tổng cộng
                </td>
                <td className="px-4 py-3 text-left font-semibold">
                  {/* total here */}
                  {
                    totalProducts
                  }
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="flex justify-end gap-5">
          <div className="px-4 py-1">
            <label htmlFor="">Mã giảm giá: </label>
            <input type="text" className="border-2" />
          </div>
          <div>
            <button className="px-4 py-1 bg-gray-800 border-2 rounded-2xl">
              <a href="/checkout">Thanh toán</a>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

function ProductCard({
  name,
  price,
  quantity,
}: {
  name: string;
  price: number;
  quantity: number;
}) {
  const total = price * quantity;
  return (
    <>
      <tr >
        <td className="text-left py-3 px-5">{name}</td>
        <td className="text-left py-3 px-5">{price}</td>
        <td className="text-left py-3 px-5"><QuantityBtn quantity={quantity} /></td>
        <td className="text-left py-3 px-5">{total}</td>
      </tr >
    </>
  );
}

function QuantityBtn({ quantity }: { quantity: number }) {
  return (
    <form className="max-w-xs mx-auto">
      <div className="relative flex items-center">
        <button type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
          <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
          </svg>
        </button>
        <span className=""></span>
        <button type="button" id="increment-button" data-input-counter-increment="counter-input" className="shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
          <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
          </svg>
        </button>
      </div>
    </form>
  )
}
