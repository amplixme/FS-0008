import { Link } from "react-router";
import EditIcon from "~icons/material-symbols/edit-outline";
import DeleteIcon from "~icons/material-symbols/delete-outline";

function PostActions({ postId, onDelete }) {
  return (
    <div className="flex justify-end items-center gap-3 py-8 border-t border-outline/10">
      <Link
        to={`/posts/${postId}/edit`}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-outline-variant text-on-surface-variant text-sm font-semibold hover:bg-surface-container-low transition-colors"
      >
        <EditIcon className="text-lg" aria-hidden="true" />
        Editar
      </Link>
      <button
        type="button"
        onClick={onDelete}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-error/30 text-error text-sm font-semibold hover:bg-error-container/40 transition-colors"
      >
        <DeleteIcon className="text-lg" aria-hidden="true" />
        Eliminar
      </button>
    </div>
  );
}

export default PostActions;
