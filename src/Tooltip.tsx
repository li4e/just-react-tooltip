import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  ReactElement,
  ReactNode,
  MutableRefObject,
  useMemo,
} from 'react'
import { BodyRenderer } from './BodyRenderer'
import { TooltipContainer } from './TooltipContainer'
import { TooltipPositionProps } from './types'

export type TooltipChildrenRef = MutableRefObject<HTMLElement | null>

export type TooltipProps = {
  children: ReactElement
  content: ReactNode
  childrenRef?: TooltipChildrenRef
  showDelay?: number
  hideDelay?: number
} & TooltipPositionProps

export const Tooltip = (props: TooltipProps) => {
  const {
    children,
    content,
    childrenRef: passedChildrenRef,
    fromEdge,
    offsetX,
    offsetY,
    place,
    showDelay,
    hideDelay,
  } = props
  const [active, setActive] = useState(false)
  const childrenRef = useRef<HTMLElement>(null)
  const delayTimerRef = useRef<ReturnType<typeof setTimeout>>()

  const hideTooltip = useCallback(() => setActive(false), [setActive])

  const handleMouseEnter = useCallback(() => {
    if (children.props.onMouseEnter) {
      children.props.onMouseEnter()
    }
    if (delayTimerRef.current) {
      clearTimeout(delayTimerRef.current)
    }

    if (showDelay && showDelay > 0) {
      delayTimerRef.current = setTimeout(() => setActive(true), showDelay)
    } else {
      setActive(true)
    }
  }, [setActive, children.props, showDelay])
  const handleMouseLeave = useCallback(() => {
    if (children.props.onMouseLeave) {
      children.props.onMouseLeave()
    }
    if (delayTimerRef.current) {
      clearTimeout(delayTimerRef.current)
    }

    if (hideDelay && hideDelay > 0) {
      delayTimerRef.current = setTimeout(() => setActive(false), hideDelay)
    } else {
      setActive(false)
    }
  }, [setActive, children.props, hideDelay])

  useEffect(() => {
    if (passedChildrenRef) {
      passedChildrenRef.current = childrenRef.current
    }
  }, [passedChildrenRef, children])

  useEffect(() => {
    clearTimeout(delayTimerRef.current)
  }, [])

  const wrappedChildren = useMemo(
    () =>
      React.cloneElement(children, {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        ref: childrenRef,
      }),
    [children, handleMouseEnter, handleMouseLeave],
  )

  return (
    <>
      {wrappedChildren}
      {active && (
        <BodyRenderer>
          <TooltipContainer
            hideTooltip={hideTooltip}
            offsetX={offsetX}
            offsetY={offsetY}
            fromEdge={fromEdge}
            place={place}
            childrenRef={childrenRef}>
            {content}
          </TooltipContainer>
        </BodyRenderer>
      )}
    </>
  )
}
