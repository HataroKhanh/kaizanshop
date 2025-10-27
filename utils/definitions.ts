import { ObjectId } from "mongodb";
import { Session } from "next-auth";

interface IComment {
  user: Session["user"];
  text: string;
  rate: number;
  createdAt: Date;
  idComment : string
}
export type Product = {
  _id : ObjectId
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
  createdAt: Date; 
  updatedAt: Date; 
};
