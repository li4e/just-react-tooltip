import React, {
  ReactNode,
  useRef,
  useEffect,
  useState,
  RefObject,
  CSSProperties,
} from 'react'
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
  const [position, setPosition] = useState<{
    left: string
    top: string
    opacity: string
  }>()

  useEffect(() => {
    // Calculating tooltip's position depends on its sizes.
    if (childrenRef.current && containerRef.current) {
      const childrenRect = childrenRef.current.getBoundingClientRect()
      const tooltipRect = containerRef.current.getBoundingClientRect()
      setPosition({
        ...getTooltipPosition(
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
        opacity: '1',
      })
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
    <div ref={containerRef} style={{ ...containerStyle, ...position }}>
      {children}
    </div>
  )
}

const containerStyle: CSSProperties = {
  position: 'fixed',
  zIndex: '100',
  top: '0',
  left: '0',
  whiteSpace: 'nowrap',
  opacity: 0,
  ...getTransition('opacity .3s'),
}

function getTransition(transition: string) {
  return {
    transition,
    WebkitTransition: transition,
    MozTransition: transition,
  }
}
