import { useState } from "react";
import Spinner from "../common/Spinner";
import ErrorMessage from "../common/ErrorMessage";
import EmptyState from "../common/EmptyState";
import { useComments } from "../../hooks/useComments";
import { formatRelativeTime } from "../../utils/formatRelativeTime";
import CommentForm from "./CommentForm";
import useAuth from "../../hooks/useAuth";
import { update } from "../../services/comment.service";
import { delete as deleteComment } from "../../services/comment.service";
import ConfirmModal from "../common/ConfirmModal";
import Alert from "../ui/Alert";
import ProgressActivityIcon from "~icons/material-symbols/progress-activity";
import ErrorIcon from "~icons/material-symbols/error-outline";
import ForumIcon from "~icons/material-symbols/forum-outline";

function CommentSection({ postId }) {
  const { user } = useAuth();
  const { comments, isLoading, error, refreshComments } = useComments(postId);
  const [editingId, setEditingId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [actionError, setActionError] = useState("");

  // Loading
  if (isLoading) {
    return (
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Comentarios</h2>

        <Spinner
          icon={ProgressActivityIcon}
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
          icon={ErrorIcon}
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
    setActionError("");
    setIsSaving(true);

    try {
      await update(comment.id, {
        content: editedContent,
      });

      setEditingId(null);
      setEditedContent("");

      await refreshComments();
    } catch (error) {
      console.error(error);
      setActionError("No se pudo editar el comentario.");
    } finally {
      setIsSaving(false);
    }
  }

  function handleDelete(comment) {
    setCommentToDelete(comment);
    setShowConfirmModal(true);
  }

  async function confirmDelete() {
    if (!commentToDelete) return;

    setActionError("");
    setIsDeleting(true);

    try {
      await deleteComment(commentToDelete.id);

      setShowConfirmModal(false);
      setCommentToDelete(null);

      await refreshComments();
    } catch (error) {
      console.error(error);
      setActionError("No se pudo eliminar el comentario.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold mb-6 text-on-surface">Comentarios</h2>

      {actionError && (
        <div className="mb-4">
          <Alert type="error" message={actionError} />
        </div>
      )}

      {comments.length === 0 ? (
        <EmptyState
          icon={ForumIcon}
          message="Aún no hay comentarios. ¡Sé el primero!"
        />
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed text-xs font-bold uppercase shrink-0">
                {comment.author.name?.charAt(0)}
              </div>

              <div className="flex flex-col flex-1 min-w-0">
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
                    className="w-full bg-surface-container-lowest text-on-surface rounded-lg border border-outline-variant p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                ) : (
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {comment.content}
                  </p>
                )}

                {user?.id === comment.authorId &&
                  (editingId === comment.id ? (
                    <div className="flex gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => handleSave(comment)}
                        disabled={isSaving}
                        className="text-sm text-primary hover:underline disabled:opacity-50"
                      >
                        {isSaving ? "Guardando..." : "Guardar"}
                      </button>

                      <button
                        type="button"
                        onClick={handleCancel}
                        disabled={isSaving}
                        className="text-sm text-outline hover:underline disabled:opacity-50"
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
                        onClick={() => handleDelete(comment)}
                        className="text-sm text-red-600 hover:underline"
                      >
                        Eliminar
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <CommentForm postId={postId} onSuccess={refreshComments} />

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => {
          setShowConfirmModal(false);
          setCommentToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Eliminar comentario"
        message="¿Estás seguro de que querés eliminar este comentario?"
        isProcessing={isDeleting}
        confirmText={isDeleting ? "Eliminando..." : "Eliminar"}
        isDestructive
      />
    </section>
  );
}

export default CommentSection;
