import { Session } from "next-auth";
interface IComment {
  user: Session["user"];
  text: string;
  rate: number;
  createdAt: Date;
}
export type Product = {
  idProduct: string;
  nameProduct: string;
  description: string;
  owner: Session["user"];
  price: number;
  images: {
    name: string;
    id: string;
  }[];
  file: {
    fileName: string;
    fileId: string;
    hashSha256: string;
  };
  comment : IComment[]
  rate: number;
  sold?: number;
  tags?: string[];
  createdAt: Date; // ✅ Đã thêm
  updatedAt: Date; // ✅ Đã thêm
};
