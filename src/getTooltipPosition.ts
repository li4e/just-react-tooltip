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

  if (left < fromEdge) {
    if (placement === 'left') {
      left = baseRight - offsetX
    } else {
      left = stickiedLeft
    }
  } else if (left + tooltip.width > window.width - fromEdge) {
    if (placement === 'right') {
      left = baseLeft - offsetX
    } else {
      left = stickiedRight
    }
  }

  if (top < fromEdge) {
    if (placement === 'top') {
      top = baseBottom - offsetY
    } else {
      top = stickiedTop
    }
  } else if (top + tooltip.height > window.height - fromEdge) {
    if (placement === 'bottom') {
      top = baseTop - offsetY
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
