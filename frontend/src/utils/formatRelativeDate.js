// Convierte una fecha ISO en un texto relativo.
// Ejemplo: "Hace 2 minutos", "Hace 3 días".

export function formatRelativeDate(date) {
  const now = new Date();
  const target = new Date(date);

  const diffInSeconds = Math.floor((now - target) / 1000);

  if (diffInSeconds < 60) {
    return "Hace unos segundos";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);

  if (diffInMinutes < 60) {
    return `Hace ${diffInMinutes} minuto${diffInMinutes !== 1 ? "s" : ""}`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) {
    return `Hace ${diffInHours} hora${diffInHours !== 1 ? "s" : ""}`;
  }

  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays < 30) {
    return `Hace ${diffInDays} día${diffInDays !== 1 ? "s" : ""}`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);

  if (diffInMonths < 12) {
    return `Hace ${diffInMonths} mes${diffInMonths !== 1 ? "es" : ""}`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);

  return `Hace ${diffInYears} año${diffInYears !== 1 ? "s" : ""}`;
}