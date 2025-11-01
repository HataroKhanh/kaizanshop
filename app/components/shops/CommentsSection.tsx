"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { AiOutlineLoading } from "react-icons/ai";
import { CommentItem } from "./CommentItem";
import { Product } from "@/utils/definitions";

interface CommentsSectionProps {
  product: Product;
  onRefresh: () => void;
}

export const CommentsSection = ({ product, onRefresh }: CommentsSectionProps) => {
  const session = useSession();
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [loadingPushComment, setLoadingPushComment] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };

    if (loadingPushComment) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    } else {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [loadingPushComment]);

  const handleAddComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!comment) return;

    setLoadingPushComment(true);

    const formData = new FormData();
    formData.append("options", "add_comment");
    formData.append("text", comment);
    formData.append("rate", rating.toString());
    formData.append("user", JSON.stringify(session.data?.user));
    formData.append("idProduct", product.idProduct);

    try {
      await fetch("/api/products/update_self_product", {
        method: "POST",
        body: formData,
      });

      setComment("");
      setRating(0);

      await onRefresh();
    } catch (error) {
      console.error("Error when posting comment:", error);
    } finally {
      setLoadingPushComment(false);
    }
  };

  const handleRemoveComment = async (idComment: string) => {
    if (!idComment) return;

    const formData = new FormData();
    formData.append("options", "remove_comment");
    formData.append("id_comment", idComment);
    formData.append("idProduct", product.idProduct);

    await fetch("/api/products/update_self_product", {
      method: "POST",
      body: formData,
    });
    await onRefresh();
  };

  return (
    <section>
      <div className="mt-10 border-t border-gray-300 dark:border-gray-700 pt-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          Bình luận & Đánh giá
        </h2>

        {/* Hiển thị danh sách bình luận */}
        <div className="space-y-4 mb-6">
          {product?.comment?.length ? (
            product.comment.map((r, i: number) => (
              <CommentItem
                key={i}
                comment={r}
                onRemove={handleRemoveComment}
              />
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              Chưa có bình luận.
            </p>
          )}
        </div>

        {/* Form bình luận */}
        {session ? (
          <form className="space-y-3">
            <div className="flex flex-col mb:flex-row sm:items-start gap-2 w-full">
              {/* Rating stars */}
              <div className="flex gap-2 text-yellow-400 text-4xl cursor-pointer w-full sm:w-auto justify-center sm:justify-between">
                {[1, 2, 3, 4, 5].map((num) => (
                  <span
                    key={num}
                    onClick={() => setRating(num)}
                    className={
                      num <= rating ? "text-yellow-400" : "text-gray-400"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Comment box */}
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Viết bình luận của bạn..."
                className="w-full p-2 border rounded-md dark:bg-gray-900 dark:text-white "
                required
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              onClick={(e) => handleAddComment(e)}
            >
              {loadingPushComment ? (
                <AiOutlineLoading className="animate-spin inline-block mx-auto" />
              ) : (
                "Gửi"
              )}
            </button>
          </form>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            Vui lòng đăng nhập để bình luận.
          </p>
        )}
      </div>
    </section>
  );
};

