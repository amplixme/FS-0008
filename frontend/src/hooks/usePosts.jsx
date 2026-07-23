import { useState, useEffect } from "react";
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
    let isMounted = true;

    async function fetchPosts() {
      setIsLoading(true);
      setError(null);

      try {
        const params = selectedCategory || "";
        const data = await getAll(`?category=${params}`);

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
  }, [selectedCategory, retryCount]);

  return {
    posts,
    isLoading,
    error,
    handleRetry,
  };
}
