import Image from "next/image";

export default function AboutAuthor() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Về Tác giả</h2>
      <div className="bg-neutral-50 dark:bg-neutral-900 rounded-2xl p-4 sm:p-8 border border-neutral-200 dark:border-neutral-800">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="flex-shrink-0 mx-auto sm:mx-0">
            <div className="w-20 h-20 relative rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
              <Image src="/admin.png" fill className="object-cover rounded-full"  alt="author"/>
            </div>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Sinh viên Đại học Công nghệ Giao thông Vận tải</h3>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mb-4">
              Tôi là sinh viên đang theo học tại trường <strong className="text-neutral-900 dark:text-neutral-100">Đại học Công nghệ Giao thông Vận tải</strong>, 
              với niềm đam mê về công nghệ và phát triển phần mềm.
            </p>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
              <strong className="text-neutral-900 dark:text-neutral-100">Điểm mạnh:</strong> Tôi mạnh về <strong className="text-blue-600 dark:text-blue-400">Python</strong>, 
              có kinh nghiệm trong việc phát triển ứng dụng, crawl data, và xử lý dữ liệu với Python.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

