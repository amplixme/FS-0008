import { Link } from "react-router";

export default function AdminDashboard() {
  return (
    <div className="p-8 max-w-4xl mx-auto mt-16">
      <h1 className="text-2xl font-bold text-slate-900 mb-8">
        Panel de Administración
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to="/admin/categorias"
          className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-primary group transition-all"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-primary">
              category
            </span>
            <h2 className="text-lg font-semibold text-slate-800 group-hover:text-primary transition-colors">
              Categorías
            </h2>
          </div>
          <p className="text-slate-500 text-sm">
            Crear, editar y eliminar categorías del sistema.
          </p>
        </Link>

        <Link
          to="/admin/posts"
          className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-primary group transition-all"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-primary">
              article
            </span>
            <h2 className="text-lg font-semibold text-slate-800 group-hover:text-primary transition-colors">
              Posts
            </h2>
          </div>
          <p className="text-slate-500 text-sm">
            Gestionar las publicaciones y artículos del blog.
          </p>
        </Link>
      </div>
    </div>
  );
}
