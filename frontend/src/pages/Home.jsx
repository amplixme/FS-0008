import PostCard from "../components/PostCard";
import { POSTS } from "../data/data";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Pagination from "../components/shared/Pagination";
import LoadingSpinner from "../components/shared/states/LoadingSpinner";
import ErrorState from "../components/shared/states/ErrorState";
import EmptyState from "../components/shared/states/EmptyState";

function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // placeholder llamada a api aca
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setPosts(POSTS);
        setError(false);
      } catch (error) {
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
      <section className="mb-16">
        <div className="relative p-12 rounded-3xl overflow-hidden bg-linear-to-br from-primary/5 to-primary-container/10">
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-5xl font-extrabold text-on-surface mb-6 tight-tracking leading-tight">
              Últimas publicaciones
            </h1>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-4 text-outline">
                search
              </span>
              <input
                className="w-full pl-12 pr-6 py-4 bg-surface-container-lowest border-none rounded-2xl shadow-sm focus:ring-2 focus:ring-primary/20 transition-all text-lg placeholder:text-outline/50"
                placeholder="Buscar artículos..."
                type="text"
              />
            </div>
          </div>
        </div>
      </section>
      <div className="flex gap-12">
        <Sidebar />
        {/* grid de posts */}
        <div className="flex-1">
          {isLoading && (
            <LoadingSpinner
              icon="progress_activity"
              message="Cargando publicaciones..."
            />
          )}

          {error && !isLoading && (
            <ErrorState
              icon="error"
              message="Ha ocurrido un error al cargar los datos"
              onRetry={handleRetry}
            />
          )}

          {!isLoading && !error && posts.length === 0 && (
            <EmptyState
              icon="inbox"
              message="No hay publicaciones disponibles"
            />
          )}
          {!isLoading && !error && posts.length > 0 && (
            <>
              {" "}
              <div className="grid md:grid-cols-2 gap-8">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
              {/* placeholder por ahora */}
              {posts.length > 4 && <Pagination />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
