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
import { TooltipPlace } from './types'

export type TooltipChildrenRef = MutableRefObject<HTMLElement | null>

export type TooltipProps = {
  children: ReactElement
  content: ReactNode
  childrenRef?: TooltipChildrenRef
  place?: TooltipPlace
  offsetY?: number
  offsetX?: number
}

export const Tooltip = (props: TooltipProps) => {
  const {
    children,
    content,
    childrenRef: passedChildrenRef,
    offsetX,
    offsetY,
    place,
  } = props
  const [active, setActive] = useState(false)
  const childrenRef = useRef<HTMLElement>(null)

  const HideTooltip = useCallback(() => setActive(false), [setActive])

  const handleMouseEnter = useCallback(() => {
    if (children.props.onMouseEnter) {
      children.props.onMouseEnter()
    }
    setActive(true)
  }, [setActive, children.props])
  const handleMouseLeave = useCallback(() => {
    if (children.props.onMouseLeave) {
      children.props.onMouseLeave()
    }
    setActive(false)
  }, [setActive, children.props])

  useEffect(() => {
    if (passedChildrenRef) {
      passedChildrenRef.current = childrenRef.current
    }
  }, [passedChildrenRef, children])

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
            hideTooltip={HideTooltip}
            offsetX={offsetX}
            offsetY={offsetY}
            place={place}
            childrenRef={childrenRef}>
            {content}
          </TooltipContainer>
        </BodyRenderer>
      )}
    </>
  )
}
