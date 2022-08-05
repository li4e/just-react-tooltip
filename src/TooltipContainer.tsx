import React, { ReactNode, useRef, useEffect, useState, RefObject } from 'react'
import { getTooltipPosition, getPositionOptions } from './getTooltipPosition'
import { TooltipPlace } from './types'

type TooltipContainerProps = {
  children: ReactNode
  offsetY?: number
  offsetX?: number
  place?: TooltipPlace
  childrenRef: RefObject<HTMLElement>
  hideTooltip: () => void
}

export const TooltipContainer = (props: TooltipContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { children, offsetX, offsetY, place, childrenRef, hideTooltip } = props
  const [position, setPosition] = useState<{ left: string; top: string }>()

  useEffect(() => {
    // Calculating tooltip's position depends on its sizes.
    if (childrenRef.current && containerRef.current) {
      const childrenRect = childrenRef.current.getBoundingClientRect()
      const tooltipRect = containerRef.current.getBoundingClientRect()
      setPosition(
        getTooltipPosition(
          getPositionOptions(
            childrenRect,
            tooltipRect,
            {
              x: offsetX,
              y: offsetY,
            },
            place,
          ),
        ),
      )
    }
  }, [children, offsetX, offsetY, place, childrenRef])

  // Adding listeners only for showing tooltip
  useEffect(() => {
    window.addEventListener('scroll', hideTooltip)
    window.addEventListener('wheel', hideTooltip)
    window.addEventListener('resize', hideTooltip)
    window.addEventListener('orientationchange', hideTooltip)
    return () => {
      window.removeEventListener('scroll', hideTooltip)
      window.removeEventListener('wheel', hideTooltip)
      window.removeEventListener('resize', hideTooltip)
      window.removeEventListener('orientationchange', hideTooltip)
    }
  }, [hideTooltip])

  return (
    <div ref={containerRef} style={position}>
      {children}
    </div>
  )
}

// const appear = keyframes`
//   from {
//     opacity: 0;
//   }
//   to {
//     opacity: 1;
//   }
// `

// const Container = styled.div`
//   position: fixed;
//   z-index: 100;
//   top: 0;
//   left: 0;
//   animation-name: ${appear};
//   animation-duration: 400ms;
//   animation-delay: 500ms;
//   animation-fill-mode: forwards;
//   white-space: nowrap;
//   opacity: 0;
// `
