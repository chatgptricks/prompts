import { ArrowRight, Layers3 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function LibraryCard({ library }) {
  return (
    <motion.a
      href={`#/library/${library.id}`}
      className={`library-card accent-${library.accent}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.18 }}
    >
      <VisualGlyph library={library} />
      <div className="library-card-body">
        <div className="card-kicker">
          <span>Prompt library</span>
          <Layers3 aria-hidden="true" size={16} />
        </div>
        <h2>{library.shortTitle}</h2>
        <div className="card-action">
          Open library
          <ArrowRight aria-hidden="true" size={17} />
        </div>
      </div>
    </motion.a>
  )
}

function VisualGlyph({ library }) {
  return (
    <div className="library-card-visual" aria-hidden="true">
      <span>{library.emoji}</span>
      <i />
      <i />
      <i />
    </div>
  )
}
