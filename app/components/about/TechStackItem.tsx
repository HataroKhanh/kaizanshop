interface TechStackItemProps {
  name: string;
  category: string;
  color: "purple" | "blue" | "green" | "cyan";
}

export default function TechStackItem({ name, category, color }: TechStackItemProps) {
  const colorClasses = {
    purple: "text-purple-600",
    blue: "text-blue-600",
    green: "text-green-600",
    cyan: "text-cyan-600",
  };

  return (
    <div className="text-center">
      <div className={`text-2xl font-bold mb-1 ${colorClasses[color]}`}>{name}</div>
      <div className="text-sm text-neutral-600 dark:text-neutral-400">{category}</div>
    </div>
  );
}

