import { useEffect, useRef, useState } from 'react'

/**
 * Returns a ref to attach to a container element and a boolean `mounted`.
 * The section is only mounted (children rendered) once the container has been
 * within `rootMargin` of the viewport — i.e., just before the user scrolls to it.
 * Once mounted it stays mounted (no unmount on scroll away).
 */
export function useLazyMount(rootMargin = '200px'): {
  containerRef: React.RefObject<HTMLDivElement | null>
  mounted: boolean
} {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (mounted) return
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )
    observer.observe(el)

    return () => observer.disconnect()
  }, [mounted, rootMargin])

  return { containerRef, mounted }
}
