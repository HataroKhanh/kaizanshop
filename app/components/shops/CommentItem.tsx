"use client";
import { CgTrash } from "react-icons/cg";

interface CommentItemProps {
  comment: {
    idComment: string;
    user: {
      name?: string | null;
      image?: string | null;
    };
    rate: number;
    text: string;
  };
  onRemove: (idComment: string) => void;
}

export const CommentItem = ({ comment, onRemove }: CommentItemProps) => {
  return (
    <div className="p-3 sm:p-4 border rounded-lg bg-white dark:bg-gray-800 flex flex-row justify-between flex-wrap">
      <div className="w-full">
        <div className="flex items-center gap-2 mb-2 justify-between">
          <div className="flex gap-2 items-center">
            <img
              src={`/${comment.user?.image || "default-avatar.svg"}`}
              alt={comment.user?.name || "User avatar"}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white"
            />
            <span className="font-semibold text-sm sm:text-base text-gray-800 dark:text-gray-200 truncate">
              {comment.user?.name || "Anonymous"}
            </span>
          </div>
          <div onClick={() => onRemove(comment.idComment)}>
            <CgTrash className="text-2xl sm:text-3xl border p-1 rounded-[5px] hover:bg-[#f70000] cursor-pointer transition-transform hover:-translate-y-1/12s flex-shrink-0" />
          </div>
        </div>
        <div className="flex items-center mb-1 text-yellow-400 text-sm sm:text-base">
          {"★".repeat(comment.rate)}
          {"☆".repeat(5 - comment.rate)}
        </div>
        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 break-words line-clamp-6">
          {comment.text}
        </p>
      </div>
    </div>
  );
};

