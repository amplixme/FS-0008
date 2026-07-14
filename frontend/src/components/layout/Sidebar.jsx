import { CATEGORIAS } from "../../data/data";

function Sidebar() {
  return (
    <aside className="h-screen sticky top-24 w-64 hidden lg:flex flex-col gap-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-4 tight-tracking">
          Categorías
        </h3>
        <nav className="flex flex-col gap-2">
          {CATEGORIAS.map((cat, index) => {
            const isActive = index === 0;

            return (
              <a
                key={index}
                className={`flex items-center justify-between gap-3 p-3 rounded-xl transition-all hover:translate-x-1 ${
                  isActive
                    ? "bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
                href="#"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined">
                    {cat.icon || "category"}
                  </span>
                  <span className="font-medium">{cat.name}</span>
                </div>
                <span
                  className={
                    isActive
                      ? "text-xs bg-primary/10 px-2 py-1 rounded-full font-bold"
                      : "text-xs text-slate-400"
                  }
                >
                  {cat.numberOfPosts}
                </span>
              </a>
            );
          })}
        </nav>
      </div>
      <div className="mt-auto border-t border-surface-container-high pt-6 flex flex-col gap-2">
        <a
          className="flex items-center gap-3 text-slate-500 dark:text-slate-400 p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
          href="#"
        >
          <span className="material-symbols-outlined">help</span>
          <span className="font-medium">Help</span>
        </a>
        <a
          className="flex items-center gap-3 text-slate-500 dark:text-slate-400 p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
          href="#"
        >
          <span className="material-symbols-outlined">settings</span>
          <span className="font-medium">Settings</span>
        </a>
      </div>
    </aside>
  );
}

export default Sidebar;
