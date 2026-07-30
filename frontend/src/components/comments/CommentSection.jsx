import Spinner from "../common/Spinner";
import ErrorMessage from "../common/ErrorMessage";
import EmptyState from "../common/EmptyState";
import { useComments } from "../../hooks/useComments";
import { formatRelativeDate } from "../../utils/formatRelativeDate";
import CommentForm from "./CommentForm";

function CommentSection({ postId }) {
  const { comments, isLoading, error, refreshComments } = useComments(postId);

  // Loading
  if (isLoading) {
    return (
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Comentarios</h2>

        <Spinner icon="progress_activity" message="Cargando comentarios..." />
      </section>
    );
  }

  // Error
  if (error) {
    return (
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Comentarios</h2>

        <ErrorMessage icon="error" message={error} onRetry={refreshComments} />
      </section>
    );
  }

  // Estado vacío
  if (comments.length === 0) {
    return (
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Comentarios</h2>

        <EmptyState
          icon="forum"
          message="Aún no hay comentarios. ¡Sé el primero!"
        />
      </section>
    );
  }

  // Lista de comentarios
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold mb-6 text-on-surface">Comentarios</h2>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed text-xs font-bold uppercase shrink-0">
              {comment.author.name?.charAt(0)}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-bold text-on-surface">
                  {comment.author.name}
                </span>
                <span className="text-[10px] text-outline">
                  {formatRelativeDate(comment.createdAt)}
                </span>
              </div>

              <p className="text-sm text-on-surface-variant leading-relaxed">
                {comment.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Formulario para comentar */}
      <CommentForm postId={postId}
    onSuccess={refreshComments}/>
    </section>
  );
}

export default CommentSection;
