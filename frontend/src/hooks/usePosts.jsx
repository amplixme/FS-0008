import { useState, useEffect } from "react";
import { getAll } from "../services/post.service";

export function usePosts(options = {}) {
  const { category, page = 1, limit = 6, sort, search } = options;

  const [posts, setPosts] = useState([]);
  const [meta, setMeta] = useState(null); // Guardamos la meta de paginación (totalPages, total, etc.)
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const handleRetry = () => {
    setRetryCount((count) => count + 1);
  };

  useEffect(() => {
    let isMounted = true;

    async function fetchPosts() {
      setIsLoading(true);
      setError(null);

      try {
        // Construimos los parámetros de consulta de forma robusta
        const params = {
          page,
          limit,
        };

        if (category) params.category = category;
        if (sort) params.sort = sort;
        if (search) params.search = search;

        const response = await getAll(params);

        if (isMounted) {
          // Como el backend ahora retorna { posts, meta }
          setPosts(response.posts || response); // Soporte por si alguna respuesta antigua devolvía solo array
          setMeta(response.meta || null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Error al obtener publicaciones.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchPosts();

    return () => {
      isMounted = false;
    };
  }, [category, page, limit, sort, search, retryCount]);

  return {
    posts,
    meta,
    isLoading,
    error,
    handleRetry,
  };
}
