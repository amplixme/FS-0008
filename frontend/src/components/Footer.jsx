import { Link } from "react-router";

const date = new Date();
const currentYear = date.getFullYear();

function Footer() {
  return (
    <footer className="w-full py-12 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-slate-900 dark:text-slate-100 text-xl tight-tracking">
            TheCanvas
          </span>
          <p className="text-label-md font-inter text-slate-500">
            © {currentYear} TheCanvas.
          </p>
        </div>
        <nav aria-label="Menú secundario">
          <ul className="flex gap-8">
            <li>
              <Link
                className="text-slate-500 hover:text-blue-600 transition-colors text-label-md font-inter"
                to="#"
              >
                Politica de privacidad
              </Link>
            </li>
            <li>
              <Link
                className="text-slate-500 hover:text-blue-600 transition-colors text-label-md font-inter"
                to="#"
              >
                Terminos de Servicio
              </Link>
            </li>
            <li>
              <Link
                className="text-slate-500 hover:text-blue-600 transition-colors text-label-md font-inter"
                to="#"
              >
                RSS Feed
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex gap-4">
          <button
            className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center hover:bg-primary transition-all group"
            aria-label="Cambiar idioma"
          >
            <span className="material-symbols-outlined text-sm group-hover:text-white">
              language
            </span>
          </button>
          <button
            className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center hover:bg-primary transition-all group"
            aria-label="Compartir enlace"
          >
            <span className="material-symbols-outlined text-sm group-hover:text-white">
              share
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
