import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import { getById } from "../../services/post.service";
import PostAuthorMeta from "../../components/posts/PostAuthorMeta";
import PostActions from "../../components/posts/PostActions";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import Alert from "../../components/ui/Alert";

function PostDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-6 py-10">
        <LoadingSpinner icon="progress_activity" message="Cargando artículo..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-surface px-6 py-10 max-w-3xl mx-auto">
        <Alert type="error" message={error} />
      </div>
    );
  }

  const isOwner = user?.id === post.authorId;

  const formattedDate = new Date(post.createdAt).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-6">
      <header>
        <div className="flex items-center h-16 px-6 max-w-3xl mx-auto">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
            Volver a inicio
          </Link>
        </div>
      </header>

      <main className="px-6 py-10 max-w-3xl mx-auto">
        <article>
          <h1 className="text-3xl md:text-[2.75rem] font-extrabold leading-tight tracking-tight text-on-surface mb-6">
            {post.title}
          </h1>

          <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
            <PostAuthorMeta authorName={post.author.name} date={formattedDate} />
            {isOwner && (
              // Los botones se ven, pero la funcionalidad real de editar/eliminar
              // se implementa en tickets futuros. El Link a /edit hoy no tiene
              // ruta destino todavia, y onDelete es un stub sin efecto.
              <PostActions postId={post.id} onDelete={() => {}} />
            )}
          </div>

          <div className="prose-content text-lg leading-[1.75] text-on-surface-variant whitespace-pre-line">
            {post.content}
          </div>
        </article>
      </main>
    </div>
  );
}

export default PostDetails;