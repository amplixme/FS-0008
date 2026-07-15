import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { getById, update } from "../../services/post.service";
import Alert from "../../components/ui/Alert";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import ErrorState from "../../components/ui/ErrorState";
import PostForm from "../../components/posts/PostForm";

function EditPost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getById(id);
        setPost(data);
        setError(false);
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [retryCount, id]);

  const isOwner = post ? user?.id === post.authorId : false;

  const onSubmit = async (formData) => {
    setServerError(null);
    try {
      const updatedPost = await update(id, formData);
      navigate(`/posts/${updatedPost.id}`);
    } catch (err) {
      setServerError(err.message);
    }
  };

  const handleRetry = () => {
    setIsLoading(true);
    setError(false);
    setRetryCount((prev) => prev + 1);
  };

  if (!isOwner && !isLoading) {
    return <Navigate to="/" />;
  }

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-6">
      <main className="pt-12 pb-32 px-6 max-w-200 mx-auto">
        {serverError && (
          <div className="mb-8">
            <Alert type="error" message={serverError} />
          </div>
        )}

        {isLoading ? (
          <LoadingSpinner
            icon="progress_activity"
            message="Cargando publicación..."
          />
        ) : error ? (
          <ErrorState
            icon="error"
            message="Ha ocurrido un error al cargar los datos"
            onRetry={handleRetry}
          />
        ) : (
          <PostForm
            initialValues={{
              title: post.title,
              content: post.content,
              // published: post.published
            }}
            onSubmit={onSubmit}
          />
        )}
      </main>
    </div>
  );
}

export default EditPost;
