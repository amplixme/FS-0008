import { Link, useSearchParams } from "react-router";
import { truncateText } from "../../utils/utils";
import { CATEGORY_STYLES } from "../../constants/categories";
import { formatRelativeTime } from "../../utils/formatRelativeTime"; 

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

  const handleCategoryClick = (event, slug) => {
  event.preventDefault();
  event.stopPropagation();

  setSearchParams({ category: slug });
};

  return (
    <Link to={`posts/${id}`}>
      <article className="group bg-surface-container-lowest rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="aspect-[16/9] overflow-hidden">
          <img
            alt="Post cover image"
            className="w-full h-full object-cover"
            data-alt=""
            src={coverImage || "https://placehold.co/600x400"}
            loading="lazy"
          />
        </div>
        <div className="p-8">
          {categories?.length > 0 ? (
           <div className="flex flex-wrap gap-2 mb-4"> 
             {categories.slice(0, 3).map((category) => (
               <button
                 key={category.id}
                 type="button"
                 onClick={(event) => handleCategoryClick(event, category.slug)}
                 className={` inline-block px-3 py-1 ${
                   CATEGORY_STYLES[category.slug] || CATEGORY_STYLES.default
                 } text-[10px] font-extrabold uppercase tracking-widest rounded-full `}
               >
                 {category.name}
               </button>
            ))}

            {categories?.length > 3 && (
              <span className={`inline-block px-3 py-1 ${CATEGORY_STYLES.default} text-[10px] font-extrabold uppercase tracking-widest rounded-full`}>
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
          <h2 className="text-2xl font-bold text-on-surface mb-3 tight-tracking line-clamp-2 leading-tight group-hover:text-primary transition-colors">
            {title}
          </h2>
          <p className="text-on-surface-variant line-clamp-3 leading-relaxed mb-6 text-sm">
            {truncateText(content, 150)}
          </p>
          <div className="flex items-center justify-between pt-6 border-t border-surface-container">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-fixed overflow-hidden">
                <img
                  alt="Author"
                  className="w-full h-full object-cover"
                  data-alt="professional portrait of a man in his 30s wearing glasses, minimalist creative background"
                  src={author.avatar || "https://placehold.co/32x32"}
                />
              </div>
              <div>
                <p className="text-xs font-bold">{author.name}</p>
                <p className="text-[10px] text-outline">{formatRelativeTime(createdAt)}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-outline">
              <span className="material-symbols-outlined text-sm">forum</span>
              <span className="text-xs font-medium">{commentCount ?? 0}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default PostCard;
