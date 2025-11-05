export interface NavLink {
  href: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: "/", label: "Trang chủ" },
  { href: "/shops", label: "Cửa hàng" },
  { href: "/donate", label: "Donate" },
  { href: "/about", label: "Về Kaizan" },
];

export const authLinks: NavLink[] = [
  { href: "/login", label: "Đăng nhập" },
  { href: "/signup", label: "Đăng ký" },
];
