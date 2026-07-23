export default function EmptyState({ tag = '// coming soon', title, body }) {
  return (
    <div className="empty-state">
      <span className="tag">{tag}</span>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  )
}
