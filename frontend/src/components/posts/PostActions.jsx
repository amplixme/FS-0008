import { Link } from "react-router";

function PostActions({ postId, onDelete }) {
  return (
    <div className="flex items-center gap-3">
      <Link
        to={`/posts/${postId}/edit`}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-outline-variant text-on-surface-variant text-sm font-semibold hover:bg-surface-container-low transition-colors"
      >
        <span className="material-symbols-outlined text-lg">edit</span>
        Editar
      </Link>
      <button
        type="button"
        onClick={onDelete}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-error/30 text-error text-sm font-semibold hover:bg-error-container/40 transition-colors"
      >
        <span className="material-symbols-outlined text-lg">delete</span>
        Eliminar
      </button>
    </div>
  );
}

export default PostActions;
