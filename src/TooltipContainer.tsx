import React, {
  ReactNode,
  useRef,
  useEffect,
  useState,
  RefObject,
  CSSProperties,
} from 'react'
import { getTooltipPosition, getPositionOptions } from './getTooltipPosition'
import { TooltipPositionProps } from './types'

type TooltipContainerProps = {
  children: ReactNode
  childrenRef: RefObject<HTMLElement>
  hideTooltip: () => void
} & TooltipPositionProps

export const TooltipContainer = (props: TooltipContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const {
    children,
    offsetX,
    offsetY,
    place,
    childrenRef,
    hideTooltip,
    fromEdge,
  } = props
  const [styles, setStyles] = useState<{
    left: string
    top: string
    opacity: string
  }>()

  useEffect(() => {
    // Calculating tooltip's position depends on its sizes.
    if (childrenRef.current && containerRef.current) {
      const childrenRect = childrenRef.current.getBoundingClientRect()
      const tooltipRect = containerRef.current.getBoundingClientRect()
      setStyles(
        Object.assign(
          {
            opacity: '1',
          },
          getTooltipPosition(
            getPositionOptions(childrenRect, tooltipRect, {
              offsetX,
              offsetY,
              place,
              fromEdge,
            }),
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
    <div ref={containerRef} style={{ ...containerStyle, ...styles }}>
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
