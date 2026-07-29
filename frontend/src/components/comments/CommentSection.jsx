import Spinner from "../common/Spinner";
import { useComments } from "../../hooks/useComments";
import { formatRelativeDate } from "../../utils/formatRelativeDate";

function CommentSection({ postId }) {
  const { comments, isLoading, error } = useComments(postId);

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

        <p className="text-red-500">{error}</p>
      </section>
    );
  }

  // Estado vacío
  if (comments.length === 0) {
    return (
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Comentarios</h2>

        <p className="text-gray-500">
          Aún no hay comentarios. ¡Sé el primero!
        </p>
      </section>
    );
  }

  // Lista de comentarios
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold mb-6">Comentarios</h2>

      <div className="space-y-6">
        {comments.map((comment) => (
          <article
            key={comment.id}
            className="border rounded-lg p-4"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">
                {comment.author.name}
              </h3>

              <span className="text-sm text-gray-500">
                {formatRelativeDate(comment.createdAt)}
              </span>
            </div>

            <p>{comment.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default CommentSection;