"use client";

import { useState } from "react";

type EditableFieldProps = {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  isTextArea?: boolean;
};

export default function EditableField({
  label,
  value,
  onChange,
  isTextArea = false,
}: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <div className="relative p-4">
        <label
          htmlFor={label}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
        {isTextArea ? (
          <textarea
            id={label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={() => setIsEditing(false)}
            autoFocus
            rows={5}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-base"
          />
        ) : (
          <input
            type="text"
            id={label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={() => setIsEditing(false)}
            autoFocus
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-base"
          />
        )}
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      title="Click để chỉnh sửa"
      className="group relative cursor-pointer rounded-lg border border-transparent p-4 transition-all hover:bg-gray-50 dark:hover:bg-gray-800"
    >
      <span className="absolute right-4 top-4 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100">
        ✏️
      </span>
      <strong className="block text-sm font-medium text-gray-500 dark:text-gray-400">
        {label}
      </strong>
      <span
        style={{ whiteSpace: "pre-wrap" }}
        className="mt-1 block text-base text-gray-900 dark:text-white break-words"
      >
        {value || <span className="text-gray-400">(Trống)</span>}
      </span>
    </div>
  );
}

