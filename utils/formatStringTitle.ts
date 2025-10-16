export default function formatStringTitle(str: string) {
  let result = ""
  let capitalizeNext = false;
  let first:boolean = true
  for (const ch of str) {
    if (first){
      result += ch.toUpperCase();
      first = false
    }
    else if (ch === " ") {
      result += " ";
      capitalizeNext = true;
    } else if (capitalizeNext) {
      result += ch.toLowerCase();
      capitalizeNext = false;
    } else {
      result += ch.toLowerCase();
    }
  }
  return result;
}
