import { TooltipPositionProps } from './types'

type Rect = {
  width: number
  height: number
}

export type PositionOptions = {
  window: Rect
  tooltip: Rect
  children: { left: number; right: number; top: number; bottom: number }
} & TooltipPositionProps

export function getTooltipPosition(options: PositionOptions | null) {
  const results = {
    top: 0,
    left: 0,
  }

  if (options) {
    const childrenWidth = options.children.right - options.children.left

    const xOffsetFromTarget = options.offsetX || 0
    const yOffsetFromTarget = options.offsetY || 0
    const offsetFromEdge = options.fromEdge || 0
    const place = options.place || 'bottom'

    results.top = options.children.bottom + yOffsetFromTarget
    results.left =
      options.children.left -
      options.tooltip.width / 2 +
      childrenWidth / 2 +
      xOffsetFromTarget

    if (
      results.left + options.tooltip.width >
      options.window.width - offsetFromEdge
    ) {
      results.left =
        options.window.width - options.tooltip.width - offsetFromEdge
    } else if (results.left < offsetFromEdge) {
      results.left = offsetFromEdge
    }

    if (
      place === 'top' ||
      results.top + options.tooltip.height >
        options.window.height - offsetFromEdge
    ) {
      results.top =
        options.children.top - options.tooltip.height - yOffsetFromTarget
    } else if (results.top < offsetFromEdge) {
      results.top = offsetFromEdge
    }
  }

  return {
    left: results.left + 'px',
    top: results.top + 'px',
  }
}

export function getPositionOptions(
  childrenRect: DOMRect,
  tooltipRect: DOMRect,
  positionProps: TooltipPositionProps,
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
