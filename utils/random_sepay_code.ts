export default function randomSepayCode() {
  const number = Math.floor(Math.random() * 1000000) // 0 → 999999
    .toString()
    .padStart(6, "0");
  return `BDK${number}`;
}
