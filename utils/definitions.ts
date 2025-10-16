export type Product = {
  id: string;
  title: string;
  price: number;
  currency: string;
  image: string;
  shopId: string;
  rating?: number;
  sold?: number;
  tags?: string[];
};

export type Shop = {
  id: string;
  name: string;
  avatar: string;
  banner: string;
  rating: number;
  products: number;
  isVerified?: boolean;
};
