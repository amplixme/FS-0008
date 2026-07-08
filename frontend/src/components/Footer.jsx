const date = new Date();
const currentYear = date.getFullYear();

function Footer() {
  return (
    <footer className="w-full py-12 mt-20 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-slate-900 dark:text-slate-100 text-xl tight-tracking">
            TheCanvas
          </span>
          <p className="text-label-md font-inter text-slate-500">
            © {currentYear} TheCanvas.
          </p>
        </div>
        <div className="flex gap-8">
          <a
            className="text-slate-500 hover:text-blue-600 transition-colors text-label-md font-inter"
            href="#"
          >
            Politica de privacidad
          </a>
          <a
            className="text-slate-500 hover:text-blue-600 transition-colors text-label-md font-inter"
            href="#"
          >
            Terminos de Servicio
          </a>
          <a
            className="text-slate-500 hover:text-blue-600 transition-colors text-label-md font-inter"
            href="#"
          >
            RSS Feed
          </a>
        </div>
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center hover:bg-primary transition-all group cursor-pointer">
            <span className="material-symbols-outlined text-sm group-hover:text-white">
              language
            </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center hover:bg-primary transition-all group cursor-pointer">
            <span className="material-symbols-outlined text-sm group-hover:text-white">
              share
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
