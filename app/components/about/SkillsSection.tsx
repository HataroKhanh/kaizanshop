import SkillCard from "./SkillCard";

export default function SkillsSection() {
  const programmingLanguages = [
    { name: "Python (Mạnh)", color: "blue" as const },
    { name: "C++", color: "blue" as const },
    { name: "JavaScript", color: "yellow" as const },
  ];

  const databasesTools = [
    { name: "MongoDB", color: "green" as const },
    { name: "Git", color: "orange" as const },
  ];

  const otherSkills = [
    { name: "Crawl Data", color: "purple" as const },
    { name: "Cấu hình Server", color: "red" as const },
    { name: "Linux (Cơ bản)", color: "indigo" as const },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Kỹ năng & Công nghệ</h2>
      
      {/* Python Highlight */}
      <div className="mb-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-3 mb-2">
          <div className="text-2xl">🐍</div>
          <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400">Python - Điểm mạnh</h3>
        </div>
        <p className="text-sm text-neutral-700 dark:text-neutral-300">
          Có kinh nghiệm sâu với Python trong phát triển ứng dụng, crawl data, xử lý dữ liệu và tự động hóa.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SkillCard title="Ngôn ngữ lập trình" skills={programmingLanguages} />
        <SkillCard title="Cơ sở dữ liệu & Công cụ" skills={databasesTools} />
        <SkillCard title="Kỹ năng khác" skills={otherSkills} fullWidth />
      </div>
    </section>
  );
}

