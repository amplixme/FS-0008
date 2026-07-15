import PostCard from "../components/posts/PostCard";
import { POSTS } from "../data/data";
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
        const posts = await getAll();
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setPosts(posts);
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
          ) : posts.length === 0 ? (
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
