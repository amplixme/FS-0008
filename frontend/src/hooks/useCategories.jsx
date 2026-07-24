import { useState, useEffect, useCallback } from "react";
import { getAll } from "../services/category.service";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const refetch = useCallback(() => {
    setRetryCount((count) => count + 1);
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function fetchCategories() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getAll();
        if (isMounted) setCategories(data);
      } catch (err) {
        if (isMounted) setError(err.message || "Error al obtener categorías.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, [retryCount]);

  return {
    categories,
    isLoading,
    error,
    refetch,
    handleRetry: refetch,
  };
}
