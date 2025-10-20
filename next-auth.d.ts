// file: types/next-auth.d.ts (hoặc tên tương tự)
import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Mở rộng đối tượng Session mặc định để thêm 'id'
   */
  interface Session {
    user: {
      /** ID người dùng từ database */
      id: string;
    } & DefaultSession["user"]; // Giữ lại các thuộc tính mặc định (name, email, image)
  }
}

declare module "next-auth/jwt" {
  /**
   * Mở rộng đối tượng Token mặc định để thêm 'id'
   */
  interface JWT {
    /** ID người dùng từ database */
    id: string;
  }
}