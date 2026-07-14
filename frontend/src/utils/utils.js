export function truncateText(text, textLength) {
    if (text )

  if (text.length <= textLength) {
    return text;
  }
  return text.slice(0, textLength) + "...";
}
