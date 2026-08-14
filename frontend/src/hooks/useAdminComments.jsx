import { useState, useEffect, useCallback } from "react";
import { getRecentComments } from "../services/admin.service";

export function useAdminComments() {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const handleRetry = useCallback(() => {
    setRetryCount((count) => count + 1);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function fetchComments() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getRecentComments();
        if (isMounted) setComments(data);
      } catch (err) {
        if (isMounted) setError(err.message || "Error al obtener comentarios.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchComments();

    return () => {
      isMounted = false;
    };
  }, [retryCount]);

  return { comments, isLoading, error, handleRetry };
}
