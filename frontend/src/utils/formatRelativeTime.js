// Convierte una fecha ISO en un texto relativo.
// Ejemplo: "Hace un momento", "Hace 5 min", "Hace 2 horas", "Hace 3 días", 
// "Hace 1 semana". Pasado ese punto, devuelve la fecha completa.

export function formatRelativeTime(date) {
  const now = new Date();
  const target = new Date(date);

  const diffInSeconds = Math.floor((now - target) / 1000);

  if (diffInSeconds < 60) {
    return "Hace un momento";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);

  if (diffInMinutes < 60) {
    return `Hace ${diffInMinutes} min`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) {
    return `Hace ${diffInHours} hora${diffInHours !== 1 ? "s" : ""}`;
  }

  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays < 7) {
    return `Hace ${diffInDays} día${diffInDays !== 1 ? "s" : ""}`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);

  if (diffInWeeks < 4) {
    return `Hace ${diffInWeeks} semana${diffInWeeks !== 1 ? "s" : ""}`;
  }

  return target.toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
