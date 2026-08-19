import { useMemo } from "react";
import { Link } from "react-router";
import Avatar from "../ui/Avatar";
import IconShare from "~icons/material-symbols/share-outline";
import IconBookmark from "~icons/material-symbols/bookmark-outline";

function PostAuthorMeta({ author, date, content = "" }) {
  // Calculo interno del tiempo de lectura (promedio 200 palabras por minuto)
  const readTime = useMemo(() => {
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min de lectura`;
  }, [content]);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleBookmark = () => {
    // TODO: Logica para guardar en favoritos
  };

  return (
    <div className="flex items-center w-full justify-between py-4 border-y border-outline/10">
      {/* Informacion del autor */}
      <div className="flex items-center gap-3">
        <Link to={`/perfil/${author?.id}`}>
          <Avatar
            src={author?.avatarUrl}
            alt={author?.name}
            fallback={author?.name?.[0]}
            className="w-10 h-10"
          />
        </Link>

        <div className="flex flex-col">
          <Link
            to={`/perfil/${author?.id}`}
            className="text-sm font-semibold text-on-surface hover:text-primary transition-colors"
          >
            {author?.name}
          </Link>

          <div className="flex items-center gap-1.5 text-xs text-outline">
            <span>{date}</span>
            <span>•</span>
            <span>{readTime}</span>
          </div>
        </div>
      </div>

      {/* Acciones: Compartir y Guardar */}
      <div className="flex items-center gap-1 text-outline">
        <button
          type="button"
          onClick={handleShare}
          className="p-2 rounded-full hover:bg-surface-variant hover:text-on-surface transition-colors"
          aria-label="Compartir"
        >
          <IconShare className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={handleBookmark}
          className="p-2 rounded-full hover:bg-surface-variant hover:text-on-surface transition-colors"
          aria-label="Guardar en favoritos"
        >
          <IconBookmark className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default PostAuthorMeta;
