import GroupIcon from "~icons/material-symbols/group";
import ArticleIcon from "~icons/material-symbols/article";
import ChatBubbleIcon from "~icons/material-symbols/chat-bubble";
import WarningIcon from "~icons/material-symbols/warning-outline";
import ProgressActivityIcon from "~icons/material-symbols/progress-activity";
import Spinner from "../../common/Spinner";
import ErrorMessage from "../../common/ErrorMessage";

const STAT_CARDS = [
  {
    key: "totalUsers",
    label: "Usuarios",
    icon: GroupIcon,
    iconBg: "bg-primary-fixed",
    iconColor: "text-primary",
  },
  {
    key: "totalPosts",
    label: "Publicaciones",
    icon: ArticleIcon,
    iconBg: "bg-secondary-fixed",
    iconColor: "text-secondary",
  },
  {
    key: "totalComments",
    label: "Comentarios",
    icon: ChatBubbleIcon,
    iconBg: "bg-tertiary-fixed",
    iconColor: "text-tertiary",
  },
];

function StatsCards({ stats, isLoading, error, onRetry }) {
  if (error) {
    return (
      <ErrorMessage icon={WarningIcon} message={error} onRetry={onRetry} />
    );
  }

  if (isLoading) {
    return (
      <Spinner icon={ProgressActivityIcon} message="Cargando estadísticas..." />
    );
  }

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {STAT_CARDS.map((card) => (
          <div
            key={card.key}
            className="bg-surface-container-lowest p-6 lg:p-10 rounded-xl flex flex-col items-start gap-4 lg:gap-6 shadow-sm"
          >
            <div className="w-full flex justify-between ">
              <span className="text-sm lg:text-lg font-medium lg:font-semibold text-outline tracking-wider">
                {card.label}
              </span>
              <card.icon className={`${card.iconColor} size-7`} aria-hidden="true" />
            </div>
            <span className="block text-3xl lg:text-4xl font-extrabold tracking-tight text-on-surface">
              {(stats?.[card.key] ?? 0).toLocaleString("es-AR")}
            </span>
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
