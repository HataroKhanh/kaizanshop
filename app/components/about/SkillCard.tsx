interface SkillCardProps {
  title: string;
  skills: {
    name: string;
    color: "blue" | "yellow" | "green" | "orange" | "purple" | "red" | "indigo";
  }[];
  fullWidth?: boolean;
}

export default function SkillCard({ title, skills, fullWidth = false }: SkillCardProps) {
  const colorClasses = {
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
    yellow: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
    green: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
    orange: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400",
    purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
    red: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
    indigo: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400",
  };

  return (
    <div className={`bg-neutral-50 dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-800 ${fullWidth ? "md:col-span-2" : ""}`}>
      <h3 className="font-semibold mb-3 text-lg">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className={`px-3 py-1 ${colorClasses[skill.color]} rounded-lg text-sm font-medium`}
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
}

