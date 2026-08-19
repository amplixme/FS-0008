import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { getById, delete as deletePost } from "../../services/post.service";
import PostAuthorMeta from "../../components/posts/PostAuthorMeta";
import PostActions from "../../components/posts/PostActions";
import Alert from "../../components/ui/Alert";
import ConfirmModal from "../../components/common/ConfirmModal";
import { CATEGORY_STYLES } from "../../constants/categories";
import CommentSection from "../../components/comments/CommentSection";
import Spinner from "../../components/common/Spinner";
import ChevronRight from "~icons/material-symbols/chevron-right";
import ProgressActivityIcon from "~icons/material-symbols/progress-activity";

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
          <nav
            className="flex items-center gap-2 text-sm text-gray-500 mb-6"
            aria-label="Breadcrumb"
          >
            <Link to="/" className="hover:text-gray-900 transition-colors">
              Inicio
            </Link>
            <ChevronRight />
            {post.categories.length > 0 && (
              <>
                <Link
                  to={`/?category=${post.categories[0].slug}`}
                  className="hover:text-gray-900 transition-colors capitalize"
                >
                  {post.categories[0].name}
                </Link>
                <ChevronRight />
              </>
            )}
            <span className="text-gray-900 font-medium truncate max-w-xs sm:max-w-md">
              {post.title}
            </span>
          </nav>
        )}

        {loading && (
          <div className="flex items-center justify-center py-20">
            <Spinner
              icon={ProgressActivityIcon}
              message="Cargando artículo..."
            />
          </div>
        )}

        {!loading && error && <Alert type="error" message={error} />}

        {!loading && !error && post && (
          <article>
            <div className="aspect-[16/9] overflow-hidden relative rounded-xl">
              <div className="absolute top-4 left-4 z-10 gap-2 flex">
                {/* Si no hay categoria */}
                {post.categories?.length === 0 && (
                  <span
                    className={`px-3 py-1 ${
                      CATEGORY_STYLES.default || "bg-gray-200 text-gray-800"
                    } text-[10px] font-extrabold uppercase tracking-widest rounded-full `}
                  >
                    Sin categoria
                  </span>
                )}

                {/* Si hay categorias */}
                {post.categories?.length > 0 &&
                  post.categories.slice(0, 3).map((category) => (
                    <span
                      key={category.id}
                      className={`px-3 py-1 ${
                        CATEGORY_STYLES[category.slug] ||
                        CATEGORY_STYLES.default ||
                        "bg-gray-200 text-gray-800"
                      } text-[10px] font-extrabold uppercase tracking-widest rounded-full `}
                    >
                      {category.name}
                    </span>
                  ))}

                {/* Más de 3 categorías */}
                {post.categories?.length > 3 && (
                  <span
                    className={`px-3 py-1 ${
                      CATEGORY_STYLES.default || "bg-gray-200 text-gray-800"
                    } text-[10px] font-extrabold uppercase tracking-widest rounded-full`}
                  >
                    +{post.categories.length - 3}
                  </span>
                )}
              </div>
              <img
                alt="Post cover image"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                data-alt=""
                src={post.coverImage || "https://placehold.co/600x400"}
              />
            </div>{" "}
            <h1 className="text-3xl md:text-[2.75rem] font-extrabold leading-tight tracking-tight text-on-surface mb-4 mt-4 md:mb-6 md:mt-6">
              {post.title}
            </h1>
            <div className="flex items-center w-full mb-6">
              <PostAuthorMeta author={post.author} date={formattedDate} />
            </div>
            <div className="prose-content text-lg leading-[1.75] text-on-surface-variant whitespace-pre-line pb-12">
              {post.content}
            </div>
            {isOwner && (
              <PostActions
                postId={post.id}
                onDelete={() => setIsDeleteModalOpen(true)}
              />
            )}
            <CommentSection postId={post.id} />
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
