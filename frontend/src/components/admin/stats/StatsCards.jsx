import Spinner from "../../common/Spinner";
import ErrorMessage from "../../common/ErrorMessage";

const STAT_CARDS = [
  {
    key: "totalUsers",
    label: "Usuarios Totales",
    icon: "group",
    iconBg: "bg-primary-fixed",
    iconColor: "text-primary",
  },
  {
    key: "totalPosts",
    label: "Publicaciones",
    icon: "article",
    iconBg: "bg-secondary-fixed",
    iconColor: "text-secondary",
  },
  {
    key: "totalComments",
    label: "Comentarios",
    icon: "chat_bubble",
    iconBg: "bg-tertiary-fixed",
    iconColor: "text-tertiary",
  },
];

function StatsCards({ stats, isLoading, error, onRetry }) {
  if (error) {
    return <ErrorMessage icon="warning" message={error} onRetry={onRetry} />;
  }

  if (isLoading) {
    return (
      <Spinner icon="progress_activity" message="Cargando estadísticas..." />
    );
  }

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {STAT_CARDS.map((card) => (
          <div
            key={card.key}
            className="bg-surface-container-lowest p-6 rounded-xl flex items-center gap-6 shadow-sm"
          >
            <div
              className={`w-12 h-12 rounded-full ${card.iconBg} flex items-center justify-center shrink-0`}
            >
              <span
                className={`material-symbols-outlined ${card.iconColor}`}
              >
                {card.icon}
              </span>
            </div>
            <div>
              <span className="block text-3xl font-extrabold tracking-tight text-on-surface">
                {(stats?.[card.key] ?? 0).toLocaleString("es-AR")}
              </span>
              <span className="text-sm font-medium text-outline uppercase tracking-wider">
                {card.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {stats?.postsByCategory?.length > 0 && (
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm">
          <h3 className="text-xs font-bold text-outline uppercase tracking-wider mb-4">
            Posts por categoría
          </h3>
          <div className="flex flex-wrap gap-2">
            {stats.postsByCategory.map((category) => (
              <span
                key={category.id}
                className="flex items-center gap-2 px-3 py-1.5 bg-surface-container rounded-full text-sm font-medium text-on-surface-variant"
              >
                {category.name}
                <span className="bg-primary-fixed text-on-primary-fixed text-xs font-bold px-2 py-0.5 rounded-full">
                  {category.postsCount}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default StatsCards;
