import { useEffect, useRef } from 'react'

export default function GlobalBackground() {
  const glowRef = useRef(null)

  useEffect(() => {
    const el = glowRef.current
    if (!el) return
    const onMove = (e) => {
      el.style.transform = `translate(${e.clientX - 350}px, ${e.clientY - 350}px)`
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <div className="aurora-layer" aria-hidden="true">
        <div className="aurora-orb aurora-orb-1" />
        <div className="aurora-orb aurora-orb-2" />
        <div className="aurora-orb aurora-orb-3" />
      </div>
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
      <div className="grain-overlay" aria-hidden="true" />
    </>
  )
}
