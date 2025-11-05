"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";

export const ProfileInfo = () => {
  const session = useSession();

  return (
    <section className="mx-full flex p-4 sm:p-10">
      <div className="flex justify-center align-bottom text-center flex-col w-full">
        <div className="flex flex-col md:flex-row gap-6">
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
                src=""
                width={200}
                height={200}
                alt="avatar"
                className="rounded-full mx-auto dark:bg-white "
              ></Image>
            )}
            <h1 className="text-2xl sm:text-3xl font-bold mt-5">
              {session.data?.user?.name || "Chua co ten"}
            </h1>
            <div className="text-sm sm:text-base">ID: {session.data?.user?.id}</div>
            <div className="text-sm sm:text-base">Email: {session.data?.user?.email}</div>
          </div>
          <div className="flex-1 text-center md:text-start p-4 md:p-10 text-xl sm:text-2xl">
            Thông tin sẽ được cập nhật sau
          </div>
        </div>
      </div>
    </section>
  );
};

