export function formatPrice(v: number) {
  // Simple VND formatter without Intl to keep it tree‑shakable
  const s = Math.round(v).toString();
  return s.replace(/\\B(?=(\\d{3})+(?!\\d))/g, ".") + "đ";
}
