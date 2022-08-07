import { RequiredTooltipPositionProps } from './types'

type Rect = {
  width: number
  height: number
}

export type PositionOptions = {
  window: Rect
  tooltip: Rect
  children: { left: number; right: number; top: number; bottom: number }
} & RequiredTooltipPositionProps

export function getTooltipPosition(options: PositionOptions) {
  const {
    children,
    tooltip,
    window,
    offsetX,
    offsetY,
    fromEdge,
    placement,
    alignment,
  } = options

  let top = 0,
    left = 0

  const childrenWidth = children.right - children.left
  const childrenHeight = children.bottom - children.top
  const baseTop = children.top - tooltip.height
  const baseRight = children.right
  const baseBottom = children.bottom
  const baseLeft = children.left - tooltip.width
  const leftCenter = children.right - childrenWidth / 2 - tooltip.width / 2
  const leftStart = children.left
  const leftEnd = children.right - tooltip.width
  const topCenter = children.bottom - childrenHeight / 2 - tooltip.height / 2
  const topStart = children.top
  const topEnd = children.bottom - tooltip.height
  const stickiedTop = fromEdge
  const stickiedRight = window.width - fromEdge - tooltip.width
  const stickiedBottom = window.height - fromEdge - tooltip.height
  const stickiedLeft = fromEdge

  function isOverflowedRight(leftValue: number) {
    return leftValue + tooltip.width > window.width - fromEdge
  }
  function isOverflowedLeft(leftValue: number) {
    return leftValue < fromEdge
  }
  function isOverflowedTop(topValue: number) {
    return topValue < fromEdge
  }
  function isOverflowedBottom(topValue: number) {
    return topValue + tooltip.height > window.height - fromEdge
  }

  if (placement === 'top') {
    top = baseTop
    if (alignment === 'start') {
      left = leftStart
    } else if (alignment === 'end') {
      left = leftEnd
    } else if (alignment === 'center') {
      left = leftCenter
    }
  } else if (placement === 'left') {
    left = baseLeft
    if (alignment === 'start') {
      top = topStart
    } else if (alignment === 'end') {
      top = topEnd
    } else if (alignment === 'center') {
      top = topCenter
    }
  } else if (placement === 'bottom') {
    top = baseBottom
    if (alignment === 'start') {
      left = leftStart
    } else if (alignment === 'end') {
      left = leftEnd
    } else if (alignment === 'center') {
      left = leftCenter
    }
  } else if (placement === 'right') {
    left = baseRight
    if (alignment === 'start') {
      top = topStart
    } else if (alignment === 'end') {
      top = topEnd
    } else if (alignment === 'center') {
      top = topCenter
    }
  }

  left += offsetX
  top += offsetY

  // Handle edge cases
  if (isOverflowedLeft(left)) {
    if (placement === 'left') {
      left = baseRight - offsetX
      if (isOverflowedRight(left)) {
        left = stickiedRight
      }
    } else {
      left = stickiedLeft
    }
  } else if (isOverflowedRight(left)) {
    if (placement === 'right') {
      left = baseLeft - offsetX
      if (isOverflowedLeft(left)) {
        left = stickiedLeft
      }
    } else {
      left = stickiedRight
    }
  }

  if (isOverflowedTop(top)) {
    if (placement === 'top') {
      top = baseBottom - offsetY
      if (isOverflowedBottom(top)) {
        top = stickiedBottom
      }
    } else {
      top = stickiedTop
    }
  } else if (isOverflowedBottom(top)) {
    if (placement === 'bottom') {
      top = baseTop - offsetY
      if (isOverflowedTop(top)) {
        top = stickiedTop
      }
    } else {
      top = stickiedBottom
    }
  }

  return {
    left: left + 'px',
    top: top + 'px',
  }
}

export function getPositionOptions(
  childrenRect: DOMRect,
  tooltipRect: DOMRect,
  positionProps: RequiredTooltipPositionProps,
): PositionOptions {
  return {
    window: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    children: {
      left: childrenRect.left,
      right: childrenRect.right,
      top: childrenRect.top,
      bottom: childrenRect.bottom,
    },
    tooltip: {
      width: tooltipRect.width,
      height: tooltipRect.height,
    },
    ...positionProps,
  }
}
