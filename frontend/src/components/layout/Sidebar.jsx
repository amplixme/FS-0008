function Sidebar() {
  return (
    <aside className="h-screen sticky top-24 w-64 hidden lg:flex flex-col gap-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-4 tight-tracking">
          Categorías
        </h3>
        <nav className="flex flex-col gap-2">
          <a
            className="flex items-center justify-between gap-3 bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 rounded-xl p-3 shadow-sm transition-all hover:translate-x-1"
            href="#"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined">palette</span>
              <span className="font-medium">Design</span>
            </div>
            <span className="text-xs bg-primary/10 px-2 py-1 rounded-full font-bold">
              24
            </span>
          </a>
          <a
            className="flex items-center justify-between gap-3 text-slate-500 dark:text-slate-400 p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all hover:translate-x-1"
            href="#"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined">terminal</span>
              <span className="font-medium">Engineering</span>
            </div>
            <span className="text-xs text-slate-400">18</span>
          </a>
          <a
            className="flex items-center justify-between gap-3 text-slate-500 dark:text-slate-400 p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all hover:translate-x-1"
            href="#"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined">inventory_2</span>
              <span className="font-medium">Product</span>
            </div>
            <span className="text-xs text-slate-400">12</span>
          </a>
          <a
            className="flex items-center justify-between gap-3 text-slate-500 dark:text-slate-400 p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all hover:translate-x-1"
            href="#"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined">diversity_3</span>
              <span className="font-medium">Culture</span>
            </div>
            <span className="text-xs text-slate-400">9</span>
          </a>
          <a
            className="flex items-center justify-between gap-3 text-slate-500 dark:text-slate-400 p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all hover:translate-x-1"
            href="#"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined">newspaper</span>
              <span className="font-medium">News</span>
            </div>
            <span className="text-xs text-slate-400">31</span>
          </a>
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
