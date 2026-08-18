import { Link, useSearchParams } from "react-router";
import ForumIcon from "~icons/material-symbols/forum-outline";
import { truncateText } from "../../utils/utils";
import { CATEGORY_STYLES } from "../../constants/categories";
import { formatRelativeTime } from "../../utils/formatRelativeTime";
import Avatar from "../ui/Avatar";

function PostCard({
  post: {
    id,
    coverImage,
    title,
    content,
    author,
    createdAt,
    commentCount,
    categories,
  },
}) {
  const [, setSearchParams] = useSearchParams();

  const handleCategoryClick = (slug) => {
    setSearchParams({ category: slug });
  };

  return (
    <article className="group bg-surface-container-lowest rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <Link to={`/posts/${id}`} className="block">
        <div className="aspect-[16/9] overflow-hidden">
          <img
            alt={`Portada de ${title}`}
            className="w-full h-full object-cover"
            data-alt=""
            src={coverImage || "https://placehold.co/600x400"}
            loading="lazy"
          />
        </div>
      </Link>

      <div className="p-8">
        {categories?.length > 0 ? (
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.slice(0, 3).map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategoryClick(category.slug)}
                className={`inline-block px-3 py-1 ${
                  CATEGORY_STYLES[category.slug] || CATEGORY_STYLES.default
                } text-[10px] font-extrabold uppercase tracking-widest rounded-full`}
              >
                {category.name}
              </button>
            ))}

            {categories.length > 3 && (
              <span
                className={`inline-block px-3 py-1 ${CATEGORY_STYLES.default} text-[10px] font-extrabold uppercase tracking-widest rounded-full`}
              >
                +{categories.length - 3}
              </span>
            )}
          </div>
        ) : (
          <span
            className={`inline-block px-3 py-1 ${CATEGORY_STYLES.default} text-[10px] font-extrabold uppercase tracking-widest rounded-full`}
          >
            Sin categoría
          </span>
        )}

        <Link to={`/posts/${id}`} className="block">
          <h2 className="text-2xl font-bold text-on-surface mb-3 tight-tracking line-clamp-2 leading-tight group-hover:text-primary transition-colors">
            {title}
          </h2>
        </Link>

        <p className="text-on-surface-variant line-clamp-3 leading-relaxed mb-6 text-sm">
          {truncateText(content, 150)}
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-surface-container">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-fixed overflow-hidden">
              <Avatar
                src={author.avatar || author.avatarUrl}
                name={author.name}
                size="sm"
              />
            </div>

            <div>
              <Link
                to={`/perfil/${author.id}`}
                className="text-xs font-bold hover:text-primary transition-colors"
              >
                {author.name}
              </Link>

              <p className="text-[10px] text-outline">
                {formatRelativeTime(createdAt)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-outline">
            <ForumIcon className="text-sm" aria-hidden="true" />
            <span className="text-xs font-medium">{commentCount ?? 0}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default PostCard;
