import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { create } from "../../services/comment.service";
import { Link } from "react-router";

function CommentForm({ postId, onSuccess }) {
  const { isAuthenticated } = useAuth();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    setIsSubmitting(true);

    try {
      await create(postId, { content });
      setContent("");
      onSuccess();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isAuthenticated ? (
        // Si está autenticado
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm mb-12 border border-outline-variant/10 focus-within:ring-2 ring-primary/20 transition-all">
          <textarea
            className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-on-surface placeholder:text-on-surface-variant/50 resize-none"
            placeholder="Escribe un comentario..."
            rows="3"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          <div className="flex justify-end mt-2">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-primary text-on-primary px-6 py-2 rounded-full font-bold hover:shadow-lg  hover:shadow-primary/30 transition-all"
            >
              {isSubmitting ? "Comentando..." : "Comentar"}
            </button>
          </div>
        </div>
      ) : (
        // Si no esta autenticado
        <Link
          className="bg-primary text-on-primary px-6 py-2 rounded-full font-bold hover:shadow-lg  hover:shadow-primary/30 transition-all"
          to="/login"
        >
          Inicia sesión para comentar
        </Link>
      )}
    </>
  );
}

export default CommentForm;
