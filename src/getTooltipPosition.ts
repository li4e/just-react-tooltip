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
    offsetFromEdge,
    offsetFromTarget,
    place,
    align,
  } = options

  let top = 0,
    left = 0

  const childrenWidth = children.right - children.left
  const childrenHeight = children.bottom - children.top
  const baseTop = children.top - tooltip.height - offsetFromTarget
  const baseRight = children.right + offsetFromTarget
  const baseBottom = children.bottom + offsetFromTarget
  const baseLeft = children.left - tooltip.width - offsetFromTarget
  const xCenter = children.right - childrenWidth / 2 - tooltip.width / 2
  const xStart = children.left
  const xEnd = children.right - tooltip.width
  const yCenter = children.bottom - childrenHeight / 2 - tooltip.height / 2
  const yStart = children.top
  const yEnd = children.bottom - tooltip.height
  const stickiedTop = offsetFromEdge
  const stickiedRight = window.width - offsetFromEdge - tooltip.width
  const stickiedBottom = window.height - offsetFromEdge - tooltip.height
  const stickiedLeft = offsetFromEdge

  function isOverflowedRight(leftValue: number) {
    return leftValue + tooltip.width > window.width - offsetFromEdge
  }
  function isOverflowedLeft(leftValue: number) {
    return leftValue < offsetFromEdge
  }
  function isOverflowedTop(topValue: number) {
    return topValue < offsetFromEdge
  }
  function isOverflowedBottom(topValue: number) {
    return topValue + tooltip.height > window.height - offsetFromEdge
  }

  if (place === 'top') {
    top = baseTop
    if (align === 'start') {
      left = xStart
    } else if (align === 'end') {
      left = xEnd
    } else if (align === 'center') {
      left = xCenter
    }
  } else if (place === 'left') {
    left = baseLeft
    if (align === 'start') {
      top = yStart
    } else if (align === 'end') {
      top = yEnd
    } else if (align === 'center') {
      top = yCenter
    }
  } else if (place === 'bottom') {
    top = baseBottom
    if (align === 'start') {
      left = xStart
    } else if (align === 'end') {
      left = xEnd
    } else if (align === 'center') {
      left = xCenter
    }
  } else if (place === 'right') {
    left = baseRight
    if (align === 'start') {
      top = yStart
    } else if (align === 'end') {
      top = yEnd
    } else if (align === 'center') {
      top = yCenter
    }
  }

  left += offsetX
  top += offsetY

  // Handle edge cases
  if (isOverflowedLeft(left)) {
    if (place === 'left') {
      left = baseRight - offsetX
      if (isOverflowedRight(left)) {
        left = stickiedRight
      }
    } else {
      left = stickiedLeft
    }
  } else if (isOverflowedRight(left)) {
    if (place === 'right') {
      left = baseLeft - offsetX
      if (isOverflowedLeft(left)) {
        left = stickiedLeft
      }
    } else {
      left = stickiedRight
    }
  }

  if (isOverflowedTop(top)) {
    if (place === 'top') {
      top = baseBottom - offsetY
      if (isOverflowedBottom(top)) {
        top = stickiedBottom
      }
    } else {
      top = stickiedTop
    }
  } else if (isOverflowedBottom(top)) {
    if (place === 'bottom') {
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
