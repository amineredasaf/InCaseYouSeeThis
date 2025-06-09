"use client"

import { useState, useEffect, useCallback, useRef } from "react"

export function useResponsiveLimit() {
  const hasSetInitialLimit = useRef(false)

  const [limit, setLimit] = useState<number | undefined>(undefined)

  const currentWidth = useRef(0)

  const getLimit = useCallback((width: number): number => {
    currentWidth.current = width

    console.log(`Calculating limit for width: ${width}px`)

    if (width >= 1024) {
      return 8
    } else if (width >= 640) {
      return 4
    } else {
      return 3
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined" && !hasSetInitialLimit.current) {
      const initialLimit = getLimit(window.innerWidth)
      setLimit(initialLimit)
      hasSetInitialLimit.current = true
    }

  }, [getLimit])

  useEffect(() => {
    if (typeof window === "undefined") return

    let timeoutId: NodeJS.Timeout | null = null

    const handleResize = () => {
      if (timeoutId) clearTimeout(timeoutId)

      timeoutId = setTimeout(() => {
        const newLimit = getLimit(window.innerWidth)

        setLimit(prevLimit => {
          if (newLimit !== prevLimit) {
            return newLimit
          }
          return prevLimit
        })
      }, 250) // longer debounce for better stability
    }

    window.addEventListener("resize", handleResize)

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      window.removeEventListener("resize", handleResize)
    }
  }, [getLimit])

  // useEffect(() => {
  //   if (limit !== undefined) {
  //     console.log(`Limit changed to: ${limit}`)
  //   }
  // }, [limit])

  return limit
}
