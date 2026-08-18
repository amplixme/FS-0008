import { Link } from "react-router";
import EmptyState from "../../common/EmptyState";
import Spinner from "../../common/Spinner";
import ErrorMessage from "../../common/ErrorMessage";
import WarningIcon from "~icons/material-symbols/warning-outline";
import ProgressActivityIcon from "~icons/material-symbols/progress-activity";
import ArticleIcon from "~icons/material-symbols/article-outline";
import DeleteIcon from "~icons/material-symbols/delete-outline";
import { formatDate } from "../../../utils/formatDate";

function CategoryChips({ categories = [] }) {
  if (categories.length === 0) {
    return <span className="text-on-surface-variant text-sm">—</span>;
  }
  return (
    <div className="flex flex-wrap gap-1.5">
      {categories.map((category) => (
        <span
          key={category.id}
          className="text-xs font-bold text-secondary uppercase tracking-widest bg-secondary-fixed/40 px-2 py-0.5 rounded-full"
        >
          {category.name}
        </span>
      ))}
    </div>
  );
}

function RecentPostsTable({ posts = [], isLoading, error, onRetry, onDelete }) {
  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-surface-variant/30">
        <h2 className="text-xl font-bold tracking-tight text-on-surface">
          Posts recientes
        </h2>
      </div>

      {error ? (
        <div className="p-6">
          <ErrorMessage icon={WarningIcon} message={error} onRetry={onRetry} />
        </div>
      ) : isLoading ? (
        <Spinner icon={ProgressActivityIcon} message="Cargando posts..." />
      ) : posts.length === 0 ? (
        <EmptyState icon={ArticleIcon} message="No hay posts publicados aún." />
      ) : (
        <>
          {/* Tabla: desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container border-b border-surface-variant/30 text-xs font-bold text-outline uppercase">
                  <th className="py-4 px-6">Título</th>
                  <th className="py-4 px-6">Autor</th>
                  <th className="py-4 px-6">Categorías</th>
                  <th className="py-4 px-6">Fecha</th>
                  <th className="py-4 px-6 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-variant/30">
                {posts.map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-surface-container transition-colors"
                  >
                    <td className="py-4 px-6 text-sm font-semibold text-on-surface max-w-xs">
                      {post.title}  
                    </td>
                    <td className="py-4 px-6 text-sm text-on-surface-variant">
                      {post.author?.name}
                    </td>
                    <td className="py-4 px-6">
                      <CategoryChips categories={post.categories} />
                    </td>
                    <td className="py-4 px-6 text-sm text-on-surface-variant">
                      {formatDate(post.createdAt)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex justify-end items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onDelete(post)}
                          title="Eliminar post"
                          className="p-2 text-error hover:bg-error-container/40 rounded-full transition-colors"
                        >
                          <DeleteIcon className="text-lg" aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tarjetas: mobile */}
          <div className="md:hidden divide-y divide-surface-variant/30">
            {posts.map((post) => (
              <div key={post.id} className="p-5 space-y-4">
                <div className="flex gap-4">
                  {post.coverImage && (
                    <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                      <img
                        className="w-full h-full object-cover"
                        src={post.coverImage}
                        alt={post.title}
                      />
                    </div>
                  )}
                  <div className="flex flex-col justify-center min-w-0 gap-1">
                    <CategoryChips categories={post.categories} />
                    <h3 className="font-bold text-on-surface leading-tight truncate">
                      {post.title}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-3 border-t border-surface-variant/30">
                  <div>
                    <span className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-1">
                      Autor
                    </span>
                    <span className="text-sm font-medium text-on-surface">
                      {post.author?.name}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-1">
                      Fecha
                    </span>
                    <span className="text-sm font-medium text-on-surface">
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="flex border-t border-surface-variant/30 -mx-5 -mb-5">
                  <Link
                    to={`/posts/${post.id}/edit`}
                    className="flex-1 py-3 text-sm font-bold text-primary hover:bg-surface-container transition-colors text-center"
                  >
                    Editar Post
                  </Link>
                  <button
                    type="button"
                    onClick={() => onDelete(post)}
                    className="flex-1 py-3 text-sm font-bold text-error hover:bg-error-container/40 transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default RecentPostsTable;
