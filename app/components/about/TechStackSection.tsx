import TechStackItem from "./TechStackItem";

export default function TechStackSection() {
  const techStack = [
    { name: "Next.js", category: "Framework", color: "purple" as const },
    { name: "React", category: "UI Library", color: "blue" as const },
    { name: "MongoDB", category: "Database", color: "green" as const },
    { name: "TypeScript", category: "Language", color: "cyan" as const },
    { name: "Docker", category: "DevOps", color: "blue" as const },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Công nghệ sử dụng trong dự án</h2>
      <div className="bg-gradient-to-r from-neutral-50 to-purple-50 dark:from-neutral-900 dark:to-purple-950/20 rounded-xl p-4 sm:p-6 border border-neutral-200 dark:border-neutral-800">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {techStack.map((tech, index) => (
            <TechStackItem
              key={index}
              name={tech.name}
              category={tech.category}
              color={tech.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

