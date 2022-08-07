type TooltipPlace = 'top' | 'right' | 'bottom' | 'left'
type TooltipAlign = 'center' | 'start' | 'end'

export type TooltipPositionProps = {
  align?: TooltipAlign
  place?: TooltipPlace
  offsetY?: number
  offsetX?: number
  offsetFromEdge?: number
}
export type RequiredTooltipPositionProps = Required<TooltipPositionProps>
