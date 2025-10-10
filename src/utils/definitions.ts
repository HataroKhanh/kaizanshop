// lib/types.ts
import { ObjectId } from "mongodb";

export type ProductType = {
  _id: ObjectId;
  name: string;
  description: string;
  price: number;
  category: string[];
  author: string[];
  images: string[];
  attributes: Record<string, string | number>;
  created_at: Date;
  updated_at: Date;
  current_page: number;
};

export type UserType = {
  _id: ObjectId;
  username: string;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  cart: {
    product_id: ObjectId;
    quantity: number;
  }[];
  created_at: Date;
};

export type OrderType = {
  _id: ObjectId;
  user_id: ObjectId;
  order_date: Date;
  items: {
    product_id: ObjectId;
    name: string;
    price: number;
    quantity: number;
  }[];
  total_amount: number;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  shipping_address: UserType["address"];
};

export type CartItemType = { name: string; price: number; quantity: number };
export type CartType = { count: number; products: CartItemType[] };
export type ProductInputType = { name: string; price: number };
