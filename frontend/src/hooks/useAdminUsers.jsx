import { useState, useEffect, useCallback } from "react";
import { getUsers } from "../services/admin.service";

export function useAdminUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const handleRetry = useCallback(() => {
    setRetryCount((count) => count + 1);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function fetchUsers() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getUsers();
        if (isMounted) setUsers(data);
      } catch (err) {
        if (isMounted) setError(err.message || "Error al obtener usuarios.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchUsers();

    return () => {
      isMounted = false;
    };
  }, [retryCount]);

  return { users, isLoading, error, handleRetry };
}
