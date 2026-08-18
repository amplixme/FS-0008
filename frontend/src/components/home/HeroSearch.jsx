import SearchInput from "../common/SearchInput";

function HeroSearch() {
  return (
    <section className="mb-16 hidden sm:block">
      <div className="relative lg:p-12 p-6 rounded-3xl overflow-hidden bg-linear-to-br from-primary/5 to-primary-container/10">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl lg:text-5xl font-extrabold text-on-surface mb-6 tight-tracking leading-tight">
            Últimas publicaciones
          </h1>
          <SearchInput id="hero-post-search" inputClassName="py-4 text-lg" />
        </div>
      </div>
    </section>
  );
}

export default HeroSearch;
