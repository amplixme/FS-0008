function Pagination() {
  return (
    <nav className="mt-16 flex justify-center items-center gap-2">
      <button className="p-2 rounded-lg text-outline hover:bg-surface-container-low transition-colors">
        <span className="material-symbols-outlined">chevron_left</span>
      </button>
      <button className="w-10 h-10 rounded-lg bg-primary text-on-primary font-bold shadow-md">
        1
      </button>
      <button className="w-10 h-10 rounded-lg text-on-surface hover:bg-surface-container-low transition-colors">
        2
      </button>
      <button className="w-10 h-10 rounded-lg text-on-surface hover:bg-surface-container-low transition-colors">
        3
      </button>
      <span className="px-2 text-outline">...</span>
      <button className="w-10 h-10 rounded-lg text-on-surface hover:bg-surface-container-low transition-colors">
        12
      </button>
      <button className="p-2 rounded-lg text-outline hover:bg-surface-container-low transition-colors">
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </nav>
  );
}

export default Pagination;
