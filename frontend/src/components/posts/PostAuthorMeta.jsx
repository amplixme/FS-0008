function PostAuthorMeta({ authorName, date }) {
  return (
    <div className="flex flex-col">
      <span className="text-sm font-semibold text-on-surface">{authorName}</span>
      <span className="text-xs text-outline">{date}</span>
    </div>
  );
}

export default PostAuthorMeta;
