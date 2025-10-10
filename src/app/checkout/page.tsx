"use client";

import { useEffect, useState } from "react";
import { CartType } from "@/utils/definitions";
export default function Checkout() {
  const [data, setdata] = useState<CartType>({ count: 0, products: [] });

  useEffect(() => {
    const data = sessionStorage.getItem("cart")
    const dataParse = data ? JSON.parse(data) : { count: 0, products: [] }
    if (data) {
      setdata(dataParse)
    }
  })

  console.log(data);
  return 1;
}
