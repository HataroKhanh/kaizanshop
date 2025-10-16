"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { memo } from "react";
import { FaTrashAlt } from "react-icons/fa";

function GallaryProduct({ srcs }: { srcs: string[] }) {

  const [listImage, setListImage] = useState<string[]>(srcs);
  const [mainImage, setMainImage] = useState<string>(listImage[0]);

  useEffect(() => {
    setListImage(srcs);
    setMainImage(listImage[0]);
  }, [listImage]);

  function handleRemoveImage(url: string) {
    const newListImage = listImage.filter((item) => {
      return item !== url;
    });
    URL.revokeObjectURL(url)
    setListImage([...newListImage]);
  }

  return (
    
  );
}

export default memo(GallaryProduct);
