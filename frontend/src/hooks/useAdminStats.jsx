import { useState, useEffect, useCallback } from "react";
import { getStats } from "../services/admin.service";

export function useAdminStats() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const handleRetry = useCallback(() => {
    setRetryCount((count) => count + 1);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function fetchStats() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getStats();
        if (isMounted) setStats(data);
      } catch (err) {
        if (isMounted)
          setError(err.message || "Error al obtener las estadísticas.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, [retryCount]);

  return { stats, isLoading, error, handleRetry };
}
