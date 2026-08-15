import { Link } from "react-router";

function PostAuthorMeta({ authorId, authorName, date }) {
  return (
    <div className="flex flex-col">
      <Link
        to={`/perfil/${authorId}`}
        className="text-sm font-semibold text-on-surface hover:text-primary transition-colors"
      >
        {authorName}
      </Link>

      <span className="text-xs text-outline">{date}</span>
    </div>
  );
}

export default PostAuthorMeta;
