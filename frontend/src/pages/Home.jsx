import { useSearchParams } from "react-router";
import PostCard from "../components/posts/PostCard";
import Sidebar from "../components/layout/Sidebar";
import Pagination from "../components/ui/Pagination";
import HeroSearch from "../components/home/HeroSearch";
import Spinner from "../components/common/Spinner";
import ErrorMessage from "../components/common/ErrorMessage";
import EmptyState from "../components/common/EmptyState";
import { useCategories } from "../hooks/useCategories";
import { usePosts } from "../hooks/usePosts";

function Home() {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");

  const {
    categories,
    isLoading: isLoadingCategories,
    error: categoriesError,
    handleRetry: handleRetryCategories,
  } = useCategories();

  const {
    posts,
    isLoading: isLoadingPosts,
    error: postsError,
    handleRetry: handleRetryPosts,
  } = usePosts(selectedCategory);

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-6">
      <HeroSearch />

      <div className="flex flex-col md:flex-row gap-2 md:gap-12">
        <Sidebar
          categories={categories}
          isLoading={isLoadingCategories}
          error={categoriesError}
          onRetry={handleRetryCategories}
        />

        <div className="flex-1">
          {isLoadingPosts ? (
            <Spinner
              icon="progress_activity"
              message="Cargando publicaciones..."
            />
          ) : postsError ? (
            <ErrorMessage
              icon="error"
              message="Ha ocurrido un error al cargar los datos"
              onRetry={handleRetryPosts}
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
