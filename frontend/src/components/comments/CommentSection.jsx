import Spinner from "../common/Spinner";
import ErrorMessage from "../ui/ErrorMessage";
import EmptyState from "../ui/EmptyState";
import { useComments } from "../../hooks/useComments";
import { formatRelativeDate } from "../../utils/formatRelativeDate";

function CommentSection({ postId }) {
  const { comments, isLoading, error, handleRetry } = useComments(postId);

  // Loading
  if (isLoading) {
    return (
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Comentarios</h2>

        <Spinner
          icon="progress_activity"
          message="Cargando comentarios..."
        />
      </section>
    );
  }

  // Error
  if (error) {
    return (
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Comentarios</h2>

        <ErrorMessage icon="error" message={error} onRetry={handleRetry}/>
      </section>
    );
  }

  // Estado vacío
  if (comments.length === 0) {
    return (
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Comentarios</h2>

        <EmptyState icon="forum" message="Aún no hay comentarios. ¡Sé el primero!" />
      </section>
    );
  }

  // Lista de comentarios
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold mb-6">Comentarios</h2>

      <div className="space-y-6">
        {comments.map((comment) => (
          <article key={comment.id} className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-on-surface">{comment.author.name}</h3>

             <span className="text-sm text-on-surface-variant">
                {formatRelativeDate(comment.createdAt)}
              </span>
            </div>

           <p className="text-on-surface-variant">{comment.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default CommentSection;