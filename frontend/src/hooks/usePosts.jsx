import { useState, useEffect } from "react";
import { getAll } from "../services/post.service";

export function usePosts(filters = {}) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const handleRetry = () => {
    setRetryCount((count) => count + 1);
  };

  const category = filters.category || "";
  const search = filters.search || "";

  useEffect(() => {
    let isMounted = true;

    async function fetchPosts() {
      setIsLoading(true);
      setError(null);

      try {
        const queryParams = {};
        if (category) queryParams.category = category;
        if (search) queryParams.search = search;
        const data = await getAll(queryParams);
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
  }, [category, search, retryCount]);

  return {
    posts,
    isLoading,
    error,
    handleRetry,
  };
}
