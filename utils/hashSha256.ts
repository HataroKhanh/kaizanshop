import crypto from "crypto";

export default function HashSHA256(buf: Buffer) {
  const sha256 = crypto
    .createHash("sha256")
    .update(buf)
    .digest("hex");
    return sha256
}


