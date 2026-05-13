import { SearchX } from 'lucide-react'

export default function EmptyState({ title, body }) {
  return (
    <section className="empty-state">
      <SearchX aria-hidden="true" size={28} />
      <h2>{title}</h2>
      <p>{body}</p>
    </section>
  )
}
