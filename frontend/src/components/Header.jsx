import { Link } from "react-router";

function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 opacity-95 shadow-sm dark:shadow-none">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center w-full">
        <div className="flex items-center gap-6 md:gap-8">
          {/* menu burger */}
          <button className="block md:hidden active:scale-95 h-fit transition-transform text-primary">
            <span
              className="material-symbols-outlined text-2xl"
              data-icon="menu"
            >
              menu
            </span>
          </button>
          <Link
            className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 tight-tracking"
            to="/"
          >
            TheCanvas
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link className="text-blue-700 dark:text-blue-400 font-bold border-b-2 border-blue-700 dark:border-blue-400 pb-1 font-inter tracking-tight">
              Recientes
            </Link>
            <Link className="text-slate-600 dark:text-slate-400 font-medium hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-200 font-inter tracking-tight">
              Populares
            </Link>
            <Link className="text-slate-600 dark:text-slate-400 font-medium hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-200 font-inter tracking-tight">
              Boletín
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link
            className="hidden md:block px-5 py-2 text-slate-600 font-medium hover:bg-slate-50 transition-colors duration-200 rounded-full"
            to="/login"
          >
            Iniciar sesión
          </Link>
          <Link
            className="px-6 py-2 hidden md:block bg-primary text-on-primary font-bold rounded-full hover:shadow-lg transition-transform active:scale-95 duration-200"
            to="/register"
          >
            Suscribirse
          </Link>
          <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden border-2 border-primary/10 hidden md:block">
            <img
              alt="Perfil de usuario"
              className="w-full h-full object-cover"
              data-alt="retrato en primer plano de un profesional sonriendo sutilmente, fotografía editorial de alta calidad con luz natural suave"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDT95iqiYxi6VZXmrtLvbsuXkNVD367C45aiXNvED7mI-XevT2y4sbMA_NgYjv00TpUJL3vsTnmUBtnvrmSBHbXwPx-Xjum6GGBODPuq-P3ntfsg9lF7VaQ9VUkDVO8S2FEKTR-1xCuNW3mMO3uTar5TF_Fbj1s28RUobKNEY-1ujJ640oG2sxkptBCQtWUOLFcThP4Yd434sLN56Rv8KaZiSV6FoGRtzHoxqeQ0rcWnmHuXPhBlOOFMqVwiCnS8RHJLc7HWGoi1cqE"
            />
          </div>
          <button class="active:scale-95 transition-transform text-primary block md:hidden">
            <span class="material-symbols-outlined text-2xl" data-icon="search">
              search
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
