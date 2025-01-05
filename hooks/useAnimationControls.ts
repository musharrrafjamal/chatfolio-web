import { useInView } from 'react-intersection-observer'
import { useAnimation, AnimationControls } from 'framer-motion'
import { useEffect } from 'react'

export function useAnimationControls(): [AnimationControls, (node?: Element | null) => void] {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return [controls, ref]
}

