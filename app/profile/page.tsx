"use client";
import { useSession } from "next-auth/react";
import Header from "../components/Header";
import Image from "next/image";

export interface DefaultSession {
  user?: { id?: string | "" };
}

export default function ProfilePage() {
  const session = useSession();
  return (
    <>
      <Header />
      <section className="mx-full flex p-10">
        <div className="flex justify-center align-bottom text-center flex-col w-full">
          <div className="flex flex-row">
            <div className="flex-1">
              {session.data?.user?.image ? (
                <Image
                  src={session.data?.user?.image}
                  width={200}
                  height={200}
                  alt="avatar"
                  className="rounded-full mx-auto"
                ></Image>
              ) : (
                <Image
                  src="/default-avatar.svg"
                  width={200}
                  height={200}
                  alt="avatar"
                  className="rounded-full mx-auto dark:bg-white "
                ></Image>
              )}
              <h1 className="text-3xl font-bold mt-5">
                {session.data?.user?.name || "Chua co ten"}
              </h1>
              <div>ID: {session.data?.user?.id}</div>
              <div>Email: {session.data?.user?.email}</div>
            </div>
            <div className="flex-1 text-start p-10 text-2xl">Thông tin sẽ được cập nhật sau</div>
          </div>
        </div>
      </section>
    </>
  );
}
