import PostCard from "../components/posts/PostCard";
// 1. Borramos el import de { POSTS } que ya no se usa
import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Pagination from "../components/ui/Pagination";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorState from "../components/ui/ErrorState";
import EmptyState from "../components/ui/EmptyState";
import HeroSearch from "../components/home/HeroSearch";
import { getAll } from "../services/post.service";

function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAll(); // Cambiamos el nombre para no confundir
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        // 2. Nos aseguramos de que siempre guarde un Array. 
        // Si data es undefined, guarda un array vacío [] para que no explote el .length
        setPosts(data?.data || data || []); 
        setError(false);
      } catch (err) {
        // 3. Solucionamos el error del linter cambiando "error" por "err"
        console.error(err); 
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [retryCount]);

  const handleRetry = () => {
    setIsLoading(true);
    setError(false);
    setRetryCount((prev) => prev + 1);
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-6">
      <HeroSearch />

      <div className="flex gap-12">
        <Sidebar />

        <div className="flex-1">
          {isLoading ? (
            <LoadingSpinner
              icon="progress_activity"
              message="Cargando publicaciones..."
            />
          ) : error ? (
            <ErrorState
              icon="error"
              message="Ha ocurrido un error al cargar los datos"
              onRetry={handleRetry}
            />
          // 4. Agregamos una protección extra (?.) por si acaso
          ) : !posts || posts.length === 0 ? (
            <EmptyState
              icon="inbox"
              message="No hay publicaciones disponibles"
            />
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-8">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
              {posts.length > 4 && <Pagination />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;