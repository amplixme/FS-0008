import { useState, useEffect } from "react";
import { getByPostId } from "../services/comment.service";

export function useComments( postId ) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const handleRetry = () => {
    setRetryCount((count) => count + 1);
  };

  useEffect(() => {

    if (!postId) return;


    let isMounted = true;

    async function fetchComments() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getByPostId(postId);

        if (isMounted) setComments(data);
      } catch (err) {
        if (isMounted)
          setError(err.message || "Error al obtener comentarios.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchComments();

    return () => {
      isMounted = false;
    };
  }, [postId, retryCount]);
  

  return {
    comments,
    isLoading,
    error,
    handleRetry,
  };
}

