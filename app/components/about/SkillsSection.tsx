import SkillCard from "./SkillCard";

export default function SkillsSection() {
  const programmingLanguages = [
    { name: "Python", color: "blue" as const },
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SkillCard title="Ngôn ngữ lập trình" skills={programmingLanguages} />
        <SkillCard title="Cơ sở dữ liệu & Công cụ" skills={databasesTools} />
        <SkillCard title="Kỹ năng khác" skills={otherSkills} fullWidth />
      </div>
    </section>
  );
}

