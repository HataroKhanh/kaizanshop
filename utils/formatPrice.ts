export function formatPrice(v: number) {
  const s = Math.round(v).toString();
  return s.replace(/\\B(?=(\\d{3})+(?!\\d))/g, ".") + "đ";
}
