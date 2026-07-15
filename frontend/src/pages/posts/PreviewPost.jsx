import { Link, useParams } from "react-router";
import { POSTS } from "../../data/data";
import PostAuthorMeta from "../../components/posts/PostAuthorMeta";
import Alert from "../../components/ui/Alert";

function PreviewPost() {
  const { id } = useParams();
  const post = POSTS.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <div className="min-h-screen bg-surface px-6 py-10 max-w-3xl mx-auto">
        <Alert type="error" message="El post de muestra solicitado no existe." />
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-6">
      <header>
        <div className="flex items-center h-16 px-6 max-w-3xl mx-auto">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
            Volver a inicio
          </Link>
        </div>
      </header>

      <main className="px-6 py-10 max-w-3xl mx-auto">
        <article>
          <span className="inline-block px-3 py-1 bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
            Contenido de muestra
          </span>
          <h1 className="text-3xl md:text-[2.75rem] font-extrabold leading-tight tracking-tight text-on-surface mb-6">
            {post.title}
          </h1>

          <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
            <PostAuthorMeta authorName={post.author.name} date={post.date} />
          </div>

          <div className="prose-content text-lg leading-[1.75] text-on-surface-variant whitespace-pre-line">
            {post.excerpt}
          </div>
        </article>
      </main>
    </div>
  );
}

export default PreviewPost;