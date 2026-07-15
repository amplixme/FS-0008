import { Link } from "react-router";
import { truncateText } from "../../utils/utils";
import { CATEGORY_STYLES } from "../../constants/categories";

function PostCard({
  post: { id, thumbnail, title, excerpt, author, date, comments, category },
  basePath = "/posts",
}) {
  const badgeClasses = CATEGORY_STYLES[category] || CATEGORY_STYLES.default;

  return (
    <Link to={`${basePath}/${id}`}>
      <article className="group bg-surface-container-lowest rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="aspect-video overflow-hidden">
          <img
            alt="Post thumbnail"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            data-alt="clean workspace with a modern laptop showing code, aesthetic desk setup with plants and soft morning light"
            src={thumbnail}
          />
        </div>
        <div className="p-8">
          <span
            className={`inline-block px-3 py-1 ${badgeClasses} text-[10px] font-extrabold uppercase tracking-widest rounded-full mb-4`}
          >
            {category}
          </span>
          <h2 className="text-2xl font-bold text-on-surface mb-3 tight-tracking line-clamp-2 leading-tight group-hover:text-primary transition-colors">
            {title}
          </h2>
          <p className="text-on-surface-variant line-clamp-3 leading-relaxed mb-6 text-sm">
            {truncateText(excerpt, 150)}
          </p>
          <div className="flex items-center justify-between pt-6 border-t border-surface-container">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-fixed overflow-hidden">
                <img
                  alt="Author"
                  className="w-full h-full object-cover"
                  data-alt="professional portrait of a man in his 30s wearing glasses, minimalist creative background"
                  src={author.avatar}
                />
              </div>
              <div>
                <p className="text-xs font-bold">{author.name}</p>
                <p className="text-[10px] text-outline">{date}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-outline">
              <span className="material-symbols-outlined text-sm">forum</span>
              <span className="text-xs font-medium">{comments}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default PostCard;
