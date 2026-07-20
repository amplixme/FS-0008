import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { getById, delete as deletePost } from "../../services/post.service"; 
import PostAuthorMeta from "../../components/posts/PostAuthorMeta";
import PostActions from "../../components/posts/PostActions";
import Alert from "../../components/ui/Alert";
import ConfirmModal from "../../components/common/ConfirmModal"; 

import Spinner from "../../components/common/Spinner";

function PostDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate(); 
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchPost() {
      setLoading(true);
      setError(null);
      try {
        const data = await getById(id);
        if (isMounted) setPost(data);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchPost();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const isOwner = post ? user?.id === post.authorId : false;

  const formattedDate = post
    ? new Date(post.createdAt).toLocaleDateString("es-AR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

    const handleDelete = async () => {
    setIsProcessing(true);
    try {
      await deletePost(id);
      alert("Artículo eliminado con éxito"); 
      navigate("/");
    } catch (error) {
      console.error(error); 
      setError("Error al eliminar el artículo");
      setIsProcessing(false);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-6">
      <div className="max-w-3xl mx-auto">
        {!loading && (
          <div className="flex items-center h-16 mb-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-xl">arrow_back</span>
              Volver a inicio
            </Link>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-20">
            <Spinner icon="progress_activity" message="Cargando artículo..." />
          </div>
        )}

        {!loading && error && <Alert type="error" message={error} />}

        {!loading && !error && post && (
          <article>
            <h1 className="text-3xl md:text-[2.75rem] font-extrabold leading-tight tracking-tight text-on-surface mb-6">
              {post.title}
            </h1>

            <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
              <PostAuthorMeta authorName={post.author.name} date={formattedDate} />
              {isOwner && (
             
                <PostActions postId={post.id} onDelete={() => setIsDeleteModalOpen(true)} />
              )}
            </div>
            <div className="prose-content text-lg leading-[1.75] text-on-surface-variant whitespace-pre-line">
              {post.content}
            </div>
        
            <ConfirmModal
              isOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              onConfirm={handleDelete}
              isProcessing={isProcessing}
              title="Eliminar artículo"
              message="¿Estás seguro de que deseas eliminar este artículo? Esta acción no se puede deshacer."
            />
          </article>
        )}
      </div>
    </div>
  );
}
export default PostDetails;
