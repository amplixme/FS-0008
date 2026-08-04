import { useState, useEffect, useCallback } from "react";
import { getAll } from "../services/post.service";

export function useAdminPosts(limit = 5) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const handleRetry = useCallback(() => {
    setRetryCount((count) => count + 1);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function fetchPosts() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getAll(`?limit=${limit}&sort=newest`);
        if (isMounted) setPosts(data);
      } catch (err) {
        if (isMounted)
          setError(err.message || "Error al obtener publicaciones.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchPosts();

    return () => {
      isMounted = false;
    };
  }, [limit, retryCount]);

  return { posts, isLoading, error, handleRetry };
}
