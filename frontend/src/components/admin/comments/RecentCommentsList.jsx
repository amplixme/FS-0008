import EmptyState from "../../common/EmptyState";
import Spinner from "../../common/Spinner";
import ErrorMessage from "../../common/ErrorMessage";
import WarningIcon from "~icons/material-symbols/warning";
import ProgressActivityIcon from "~icons/material-symbols/progress-activity";
import ChatBubbleIcon from "~icons/material-symbols/chat-bubble";
import PersonIcon from "~icons/material-symbols/person-outline";
import DeleteIcon from "~icons/material-symbols/delete-outline";
import { formatRelativeTime } from "../../../utils/formatRelativeTime";
import { truncateText } from "../../../utils/utils";

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
          <ErrorMessage icon={WarningIcon} message={error} onRetry={onRetry} />
        </div>
      ) : isLoading ? (
        <Spinner
          icon={ProgressActivityIcon}
          message="Cargando comentarios..."
        />
      ) : comments.length === 0 ? (
        <EmptyState
          icon={ChatBubbleIcon}
          message="No hay comentarios todavía."
        />
      ) : (
        <>
          {/* Lista: desktop */}
          <ul className="hidden md:block divide-y divide-surface-variant/30">
            {comments.map((comment) => (
              <li key={comment.id} className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <PersonIcon
                        className="text-outline text-sm"
                        aria-hidden="true"
                      />
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
                    <DeleteIcon className="text-lg" aria-hidden="true" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Tarjetas: mobile */}
          <div className="md:hidden divide-y divide-surface-variant/30">
            {comments.map((comment) => (
              <div key={comment.id} className="p-5 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <PersonIcon
                        className="text-outline text-sm"
                        aria-hidden="true"
                      />
                      <span className="font-bold text-sm text-on-surface truncate">
                        {comment.author?.name}
                      </span>
                    </div>
                    <span className="text-[10px] text-outline font-medium">
                      {formatRelativeTime(comment.createdAt)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onDelete(comment)}
                    title="Eliminar comentario"
                    className="p-2 text-error hover:bg-error-container/40 rounded-full transition-colors shrink-0"
                  >
                    <DeleteIcon className="text-lg" aria-hidden="true" />
                  </button>
                </div>

                <p className="text-sm text-on-surface-variant italic leading-relaxed">
                  "{truncateText(comment.content, 140)}"
                </p>

                {comment.post?.title && (
                  <p className="text-xs text-outline truncate">
                    En: {comment.post.title}
                  </p>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default RecentCommentsList;
