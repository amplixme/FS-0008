import { useState, useEffect } from "react";
import { getAll } from "../services/category.service";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const handleRetry = () => {
    setRetryCount((count) => count + 1);
  };

  useEffect(() => {
    let isMounted = true;
    async function fetchCategories() {
      setIsLoading(true);
      setError(false);

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
    handleRetry,
  };
}
