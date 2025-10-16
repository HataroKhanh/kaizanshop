"use client";
import GallaryProduct from "@/app/components/GallaryProduct";
import Header from "@/app/components/Header";
import { formatPrice } from "@/utils/formatPrice";
import formatStringTitle from "@/utils/formatStringTitle";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa";

export default function NewProductPage() {
  const [nameProduct, setNameProduct] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);

  const [mainImage, setMainImage] = useState<string>();
  const [listImage, setListImage] = useState<string[]>([]);

  const MAX_IMAGES = 3;

  function onchangeImg(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = e.currentTarget.files;
    if (!files?.length) return;

    const picked = Array.from(files);
    setListImage((prev) => {
      const remaining = MAX_IMAGES - prev.length;
      if (remaining <= 0) return prev;

      const selected = picked
        .slice(0, remaining)
        .filter((f) => f.type.startsWith("image/"));

      const newUrls = selected.map((f) =>
        URL.createObjectURL(f)
      );
      const newListImage = [...prev, ...newUrls];
      setMainImage(newListImage[0] || "/fallback.png");
      return newListImage;
    });
  }

  function handleRemoveImage(url: string) {
    setListImage((prev) => {
      const next = prev.filter((item) => item !== url);

      setMainImage((cur) => {
        if (cur === url) {
          return next.length
            ? next[next.length - 1]
            : "/fallback.png";
        }

        return next.includes(cur ?? "")
          ? cur
          : next.length
          ? next[next.length - 1]
          : "/fallback.png";
      });

      return next;
    });

    URL.revokeObjectURL(url);
  }

  async function actionSubmit(formData: FormData) {
    const imageRegex =
      /\.(png|jpe?g|webp|gif|bmp|svg|avif)$/i;
    const product = /\.(exe|rar|zip|tar(\.gz)?|gz)$/i;

    const name = (formData.get("name-product") || "")
      .toString()
      .trim();
    const description = (
      formData.get("description-product") || ""
    )
      .toString()
      .trim();
    const price = Number(formData.get("price") || 0);

    const files = formData.getAll("file") as File[];

    const imageList = files.filter(
      (f) =>
        imageRegex.test(f.name) && !product.test(f.name)
    );

    const fileProduct = files.find(
      (f) =>
        !imageRegex.test(f.name) && product.test(f.name)
    );
  }

  return (
    <>
      <Header />
      <section className='p-10 mx-auto items-center'>
        <div className=' p-10 flex flex-col gap-5 mx-auto'>
          <h1 className='text-5xl text-start '>
            Tạo sản phẩm mới
          </h1>
          <div className='flex flex-row mt-10 items-center gap-10'>
            <form
              encType='multipart/form-data'
              action='/api/products/push_new_product'
              method='POST'
              className='flex-1 bg-white/5 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/10'>
              <h2 className='text-2xl font-semibold mb-6 text-gray-100'>
                Thông tin sản phẩm
              </h2>

              <div className='flex flex-col gap-6 w-full'>
                {/* Tên sản phẩm */}
                <div className='flex flex-col gap-2'>
                  <label
                    htmlFor='name-product'
                    className='text-gray-300 font-medium'>
                    Tên sản phẩm
                  </label>
                  <input
                    id='name-product'
                    type='text'
                    name='name-product'
                    placeholder='Nhập tên sản phẩm...'
                    className='px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-gray-100 placeholder-gray-400 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    onChange={(e) =>
                      setNameProduct(e.target.value)
                    }
                  />
                </div>

                {/* Mô tả */}
                <div className='flex flex-col gap-2'>
                  <label
                    htmlFor='description-product'
                    className='text-gray-300 font-medium'>
                    Mô tả
                  </label>
                  <textarea
                    id='description-product'
                    name='description-product'
                    rows={3}
                    placeholder='Mô tả ngắn về sản phẩm...'
                    className='px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-gray-100 placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none'
                    onChange={(e) =>
                      setDescription(e.target.value)
                    }
                  />
                </div>

                {/*Giá sản phẩm*/}
                <div className='flex flex-col'>
                  <label htmlFor='price'>Giá</label>
                  <input
                    onChange={(e) =>
                      setPrice(Number(e.target.value))
                    }
                    type='number'
                    name='price'
                    id='price'
                    className='px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-gray-100 placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none'
                  />
                </div>

                {/* Ảnh sản phẩm */}
                <div className='flex flex-col gap-2'>
                  <label className='text-gray-300 font-medium'>
                    Ảnh sản phẩm
                  </label>
                  <input
                    onChange={onchangeImg}
                    type='file'
                    name='file-image'
                    multiple
                    accept='image/*'
                    className='file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
                   file:text-sm file:font-medium file:bg-blue-600 file:text-white
                   hover:file:bg-blue-700 transition-all duration-200 text-gray-100'
                  />
                  <p className='text-sm text-gray-400'>
                    *Hiện tại chỉ hỗ trợ tối đa 3 ảnh
                  </p>
                </div>
                {/*Tool upload*/}
                <div className='flex flex-col gap-2'>
                  <label className='text-gray-300 font-medium'>
                    File tool
                  </label>
                  <input
                    type='file'
                    name='file-product'
                    accept='.exe,.rar,.zip,.tar,.tar.gz'
                    className='file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
             file:text-sm file:font-medium file:bg-blue-600 file:text-white
             hover:file:bg-blue-700 transition-all duration-200 text-gray-100'
                  />{" "}
                  <p className='text-sm text-gray-400'>
                    *Hỗ trợ file .exe .rar .zip .tar.gz
                  </p>
                </div>
                {/* Submit*/}

                <div>
                  <button
                    type='submit'
                    className='hover:file:bg-blue-700 transition-all duration-200 text-gray-100 w-full border-1 border-b-blue-200 py-3 rounded-2xl cursor-pointer'>
                    Tạo sản phẩm
                  </button>
                </div>
              </div>
            </form>
            <div className='flex-2 items-center'>
              <div className='flex p-15 border-1 gap-10 '>
                <div className='flex flex-col gap-5'>
                  <div>
                    {/*Gallary (i stupit for create component :(((*/}
                    <div className='flex flex-col gap-4'>
                      {/* Ảnh chính */}
                      <div className='relative w-full max-w-md aspect-square overflow-hidden rounded-lg mx-auto'>
                        <Image
                          src={mainImage || "/fallback.png"}
                          alt='main image'
                          width={250}
                          height={250}
                          className='object-cover bg-white'
                        />
                      </div>

                      {/* Ảnh nhỏ */}

                      <div className='grid grid-cols-3 gap-3 place-items-center'>
                        {listImage.length === 0 ? (
                          <div
                            className={`relative w-20 aspect-square overflow-hidden rounded border cursor-pointer "ring-2 ring-blue-500`}>
                            <Image
                              src='/fallback.png'
                              alt={`thumb-fallback`}
                              fill
                              className='object-cover relative bg-white'></Image>
                          </div>
                        ) : (
                          listImage.map((item, i) => (
                            <div
                              key={i}
                              className={`relative w-20 aspect-square overflow-hidden rounded border cursor-pointer ${
                                item === mainImage
                                  ? "ring-2 ring-blue-500"
                                  : "border-gray-300"
                              }`}
                              onClick={() =>
                                setMainImage(item)
                              }>
                              <Image
                                src={item}
                                alt={`thumb-${i}`}
                                fill
                                className='object-cover relative'></Image>
                              <button
                                onClick={() =>
                                  handleRemoveImage(item)
                                }
                                className='absolute z-10 top-0 right-0'>
                                <FaTrashAlt />
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <p>Số lượt bán: 0</p>
                    <p>Giá: {formatPrice(price)}</p>
                  </div>
                </div>
                <div className='flex flex-col gap-5'>
                  <h2 className='text-3xl'>
                    {nameProduct === ""
                      ? "Tên sản phẩm"
                      : formatStringTitle(nameProduct)}{" "}
                  </h2>{" "}
                  <div>
                    {description === ""
                      ? "Mô tả ngắn: "
                      : description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
