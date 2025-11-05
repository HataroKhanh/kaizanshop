"use client";
import Header from "@/app/components/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProductPreview } from "@/app/components/newproduct/ProductPreview";
import { ProductForm } from "@/app/components/newproduct/ProductForm";

export default function NewProductPage() {
  const router = useRouter();

  const [nameProduct, setNameProduct] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [mainImage, setMainImage] = useState<string>("");
  const [listImage, setListImage] = useState<File[]>([]);

  const [productFile, setProductFile] = useState<File | null>(null);
  const [percentProcess, setPercentProcess] = useState<number>(0);
  const [infoProcess, setInfoProcess] = useState<{
    className: string;
    text: string;
  }>({ className: "", text: "" });
  const [infoError, setInfoError] = useState<boolean>(false);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };

    if (percentProcess !== 0 && percentProcess < 100 && !infoError) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    } else {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [percentProcess, infoError]);

  useEffect(() => {
    if (percentProcess !== 0 && percentProcess < 100 && !infoError) {
      setInfoProcess({
        className: "text-[#ffc100]",
        text: "Vui lòng không đóng tab hay reload lại trang web!",
      });
    }
  }, [percentProcess, infoError]);

  const MAX_IMAGES = 3;

  function onchangeImg(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.currentTarget.files as FileList;
    const picked = Array.from(files);

    setListImage((prev) => {
      const remaining = MAX_IMAGES - prev.length;
      if (remaining <= 0) return prev;

      const newMainImage = picked[0];
      const newListImage = [...prev, ...picked];

      setMainImage(URL.createObjectURL(newMainImage));

      return newListImage;
    });
    e.currentTarget.value = "";
  }

  function handleRemoveImage({ url, name }: { url: string; name: string }) {
    setListImage((prev) => prev.filter((item) => name !== item.name));
    URL.revokeObjectURL(url);
  }

  function handleSubmit() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/products/push_new_product");

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        router.push("/myproducts");
      } else if (xhr.status == 409) {
        setInfoProcess({
          className: "text-[#ff4545]",
          text: "File này đã tồn tại trên hệ thống! Vui lòng liên hệ admin nếu bạn là chủ của file này",
        });
        setInfoError(true);
        setPercentProcess(0);
      } else {
        setInfoProcess({
          className: "text-[#ff4545]",
          text: `Upload thất bại. Lỗi: ${xhr.statusText || xhr.status}`,
        });
        setInfoError(true);
        setPercentProcess(0);
      }
    };

    xhr.onerror = () => {
      setInfoProcess({
        className: "text-[#ff4545]",
        text: "Lỗi mạng. Vui lòng kiểm tra kết nối và thử lại.",
      });
      setInfoError(true);
      setPercentProcess(0);
    };

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = (event.loaded / event.total) * 100;
        setPercentProcess(percent);
      }
    };

    const formData = new FormData();
    formData.append("name-product", nameProduct);
    formData.append("description-product", description);
    formData.append("price", price.toString());
    if (productFile) formData.append("file-product", productFile);
    if (listImage) {
      listImage.forEach(async (item) => {
        formData.append("file-image", item);
      });
    }

    xhr.send(formData);
  }

  return (
    <>
      <Header />
      <section className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto">
        <div className="flex flex-col gap-6 sm:gap-8">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-semibold text-center sm:text-left text-white">
            Tạo sản phẩm mới
          </h1>

          {/* Layout responsive */}
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10 mt-4 sm:mt-6">
            <ProductPreview
              nameProduct={nameProduct}
              description={description}
              price={price}
              mainImage={mainImage}
              listImage={listImage}
              onRemoveImage={handleRemoveImage}
              onSetMainImage={setMainImage}
            />
            <ProductForm
              nameProduct={nameProduct}
              description={description}
              price={price}
              onNameChange={setNameProduct}
              onDescriptionChange={setDescription}
              onPriceChange={setPrice}
              onImageChange={onchangeImg}
              onFileChange={(e) => setProductFile(e.target.files?.[0] || null)}
              onSubmit={handleSubmit}
              percentProcess={percentProcess}
              infoProcess={infoProcess}
              infoError={infoError}
            />
          </div>
        </div>
      </section>
    </>
  );
}
