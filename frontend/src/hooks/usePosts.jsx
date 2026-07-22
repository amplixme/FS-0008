import { useState, useEffect } from "react";
import axios from "axios";
import { getAll } from "../services/post.service";

export function usePosts(selectedCategory) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const handleRetry = () => {
    setRetryCount((count) => count + 1);
  };

  useEffect(() => {
    // AbortController para cancelar la solicitud si el componente se desmonta
    const controller = new AbortController();

    async function fetchPosts() {
      setIsLoading(true);
      setError(null);

      try {
        const params = selectedCategory;
        const data = await getAll(params, { signal: controller.signal });

        setPosts(data);
      } catch (err) {
        // Si Axios cancela la solicitud, no se establece el error
        if (axios.isCancel(err)) return;
        setError(err.message || "Error al obtener publicaciones.");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchPosts();

    return () => {
      controller.abort();
    };
  }, [selectedCategory, retryCount]);

  return {
    posts,
    isLoading,
    error,
    handleRetry,
  };
}
