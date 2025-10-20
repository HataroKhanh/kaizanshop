"use client";
import Header from "@/app/components/Header";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import useSWR from "swr";
import { ChangeEvent } from "react";
export default function EditProductPage() {
  const id = "68f6482331a9921d88b1a84f";
  const swr = useSWR(`/api/products/get_self_product?id=${id}`, (url) => 
    fetch(url).then((data) => data.json())
  );

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const handleAddImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList;
    const newFiles = Array.from(files);
    setImageFiles((prev) => [...prev, ...newFiles]);
  };
  return (
    <>
      <Header></Header>
      {console.log(imageFiles)}
      {swr.isLoading ? null : (
        <form>
          <label htmlFor="name">Tên</label>
          <input
            type="file"
            accept="image/*"
            name="file-image"
            id="file-image"
            multiple
            onChange={(e) => handleAddImage(e)}
          />
        </form>
      )}
    </>
  );
}
