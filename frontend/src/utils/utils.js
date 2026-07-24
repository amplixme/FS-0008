export function truncateText(text, textLength) {
  if (!text || text.length <= textLength) {
    return text;
  }
  return text.slice(0, textLength) + "...";
}

export function generateSlug(text = "") {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
