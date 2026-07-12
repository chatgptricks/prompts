import { ArrowRight, Layers3 } from 'lucide-react'
import { motion } from 'framer-motion'
import brandLogoUrl from '../assets/profile.jpg'

const cardVariants = {
  initial: { opacity: 0, y: 32, scale: 0.93 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function LibraryCard({ library }) {
  return (
    <motion.a
      href={`#/library/${library.id}`}
      className={`library-card accent-${library.accent}`}
      variants={cardVariants}
      whileHover={{
        y: -12,
        scale: 1.025,
        transition: { duration: 0.26, ease: [0.22, 1, 0.36, 1] },
      }}
      whileTap={{ scale: 0.975, transition: { duration: 0.1 } }}
    >
      <div className="library-card-visual" aria-hidden="true">
        {/* Animated concentric rings */}
        <i />
        <i />
        <i />
        <img className="library-card-logo" src={brandLogoUrl} alt="" />
      </div>

      <div className="library-card-body">
        <div className="card-kicker">
          <span>Prompt library</span>
          <Layers3 aria-hidden="true" size={15} />
        </div>
        <h2>{library.shortTitle}</h2>
        <div className="card-action">
          Open library
          <ArrowRight aria-hidden="true" size={16} />
        </div>
      </div>
    </motion.a>
  )
}
