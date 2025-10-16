// /lib/users.ts
import clientPromise from "@/lib/mongodb";

export type ProviderInfo = {
  provider: string;
  providerAccountId?: string | null;
};

export async function upsertUser({
  name,
  email,
  image,
  provider,
  providerAccountId,
}: {
  name?: string | null;
  email?: string | null;
  image?: string | null;
} & ProviderInfo) {
  if (!email) return; // không có email thì bỏ qua (một vài provider có thể ẩn email)

  const client = await clientPromise;
  const db = client.db(); // mặc định DB từ URI
  const now = new Date();

  await db.collection("users").updateOne(
    { email },
    {
      $setOnInsert: {
        email,
        createdAt: now,
      },
      $set: {
        name: name ?? null,
        image: image ?? null,
        lastLoginAt: now,
        provider,
        providerAccountId: providerAccountId ?? null,
        updatedAt: now,
      },
    },
    { upsert: true }
  );

  // Gợi ý index (chạy một lần trong migration/admin script):
  // await db.collection("users").createIndex({ email: 1 }, { unique: true });
}
