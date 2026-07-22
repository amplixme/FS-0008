import { useState, useEffect } from "react";
import axios from "axios";
import { getAll } from "../services/category.service";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const handleRetry = () => {
    setRetryCount((count) => count + 1);
  };

  useEffect(() => {
    // AbortController para cancelar la solicitud si el componente se desmonta
    const controller = new AbortController();

    async function fetchCategories() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getAll({ signal: controller.signal });
        setCategories(data);
      } catch (err) {
        // Si Axios cancela la solicitud, no se establece el error
        if (axios.isCancel(err)) return;
        setError(err.message || "Error al obtener categorías.");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchCategories();

    return () => {
      controller.abort();
    };
  }, [retryCount]);

  return {
    categories,
    isLoading,
    error,
    handleRetry,
  };
}
