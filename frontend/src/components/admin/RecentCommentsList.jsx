import EmptyState from "../common/EmptyState";
import Spinner from "../common/Spinner";
import ErrorMessage from "../common/ErrorMessage";
import { formatRelativeTime } from "../../utils/formatRelativeTime";
import { truncateText } from "../../utils/utils";

function RecentCommentsList({
  comments = [],
  isLoading,
  error,
  onRetry,
  onDelete,
}) {
  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-surface-variant/30">
        <h2 className="text-xl font-bold tracking-tight text-on-surface">
          Comentarios recientes
        </h2>
      </div>

      {error ? (
        <div className="p-6">
          <ErrorMessage icon="warning" message={error} onRetry={onRetry} />
        </div>
      ) : isLoading ? (
        <Spinner icon="progress_activity" message="Cargando comentarios..." />
      ) : comments.length === 0 ? (
        <EmptyState
          icon="chat_bubble"
          message="No hay comentarios todavía."
        />
      ) : (
        <ul className="divide-y divide-surface-variant/30">
          {comments.map((comment) => (
            <li key={comment.id} className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-outline text-sm">
                      person
                    </span>
                    <span className="font-bold text-sm text-on-surface">
                      {comment.author?.name}
                    </span>
                    <span className="text-[10px] text-outline font-medium">
                      · {formatRelativeTime(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-on-surface-variant italic leading-relaxed">
                    "{truncateText(comment.content, 140)}"
                  </p>
                  {comment.post?.title && (
                    <p className="text-xs text-outline mt-1 truncate">
                      En: {comment.post.title}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => onDelete(comment)}
                  title="Eliminar comentario"
                  className="p-2 text-error hover:bg-error-container/40 rounded-full transition-colors shrink-0"
                >
                  <span className="material-symbols-outlined text-lg">
                    delete
                  </span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecentCommentsList;
