function HeroSearch() {
  return (
    <section className="mb-16">
      <div className="relative p-12 rounded-3xl overflow-hidden bg-linear-to-br from-primary/5 to-primary-container/10">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-5xl font-extrabold text-on-surface mb-6 tight-tracking leading-tight">
            Últimas publicaciones
          </h1>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-4 text-outline">
              search
            </span>
            <input
              className="w-full pl-12 pr-6 py-4 bg-surface-container-lowest border-none rounded-2xl shadow-sm focus:ring-2 focus:ring-primary/20 transition-all text-lg placeholder:text-outline/50"
              placeholder="Buscar artículos..."
              type="text"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSearch;
