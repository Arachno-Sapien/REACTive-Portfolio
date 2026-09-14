import { useMemo } from 'react'

/**
 * Returns 'low' if the device is likely memory/CPU constrained:
 *   - touch-only pointer (coarse)
 *   - fewer than 4 logical CPU cores
 *   - less than 4GB RAM (Chrome/Edge deviceMemory API)
 *   - user has requested reduced motion
 * Returns 'high' otherwise (desktop or capable device).
 */
export function useDeviceCapability(): 'high' | 'low' {
  return useMemo(() => {
    if (typeof window === 'undefined') return 'high'

    // Respect user preference first
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return 'low'
    }

    // Touch-only pointer = mobile / tablet
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches

    // CPU core count (undefined in some browsers → assume high)
    const cores = navigator.hardwareConcurrency ?? 8

    // RAM in GB — Chrome/Edge only (undefined elsewhere → assume high)
    const ramGB = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 8

    if (isCoarsePointer || cores < 4 || ramGB < 4) {
      return 'low'
    }

    return 'high'
  }, [])
}
