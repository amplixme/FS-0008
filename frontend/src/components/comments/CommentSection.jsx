import { useState } from "react";
import Spinner from "../common/Spinner";
import ErrorMessage from "../common/ErrorMessage";
import EmptyState from "../common/EmptyState";
import { useComments } from "../../hooks/useComments";
import { formatRelativeTime } from "../../utils/formatRelativeTime";
import CommentForm from "./CommentForm";
import useAuth from "../../hooks/useAuth";
import { update } from "../../services/comment.service";


function CommentSection({ postId }) {

  const { user } = useAuth();

  const { comments, isLoading, error, refreshComments } = useComments(postId);

  const [editingId, setEditingId] = useState(null);
  const [editedContent, setEditedContent] = useState("");

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

        <ErrorMessage
          icon="error"
          message={error}
          onRetry={refreshComments}
        />
      </section>
    );
  }

  function handleEdit(comment) {
    setEditingId(comment.id);
    setEditedContent(comment.content);
  }

  function handleCancel() {
    setEditingId(null);
    setEditedContent("");
  }

  async function handleSave(comment) {
    try {
      await update(comment.id, {
        content: editedContent,
      });

      setEditingId(null);
      setEditedContent("");

      refreshComments();
    } catch (error) {
      console.error(error);
    }
}


  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold mb-6 text-on-surface">
        Comentarios
      </h2>

      {comments.length === 0 ? (
        <EmptyState
          icon="forum"
          message="Aún no hay comentarios. ¡Sé el primero!"
        />
      ) : (
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
                    {formatRelativeTime(comment.createdAt)}
                  </span>
                </div>

                {editingId === comment.id ? (
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="w-full rounded-md border border-outline p-2 text-sm"
                  />
                ) : (
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {comment.content}
                  </p>
                )}

                {user?.id === comment.authorId && (
                  editingId === comment.id ? (
                    <div className="flex gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => handleSave(comment)}
                        className="text-sm text-primary hover:underline"
                      >
                        Guardar
                      </button>

                      <button
                        type="button"
                        onClick={handleCancel}
                        className="text-sm text-outline hover:underline"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(comment)}
                        className="text-sm text-primary hover:underline"
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        className="text-sm text-red-600 hover:underline"
                      >
                        Eliminar
                      </button>
                    </div>
                  )
                )}

              </div>
            </div>
          ))}
        </div>
      )}

      <CommentForm
        postId={postId}
        onSuccess={refreshComments}
      />
    </section>
  );
}

export default CommentSection;