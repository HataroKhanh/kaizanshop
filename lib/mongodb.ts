// /lib/mongodb.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
if (!uri) throw new Error("Missing MONGODB_URI");
console.log("ok db")
const client = new MongoClient(uri, { maxPoolSize: 10 });
const clientPromise = client.connect();
export default clientPromise;
