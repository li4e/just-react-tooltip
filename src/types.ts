type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left'
type TooltipAlignment = 'center' | 'start' | 'end'

export type TooltipPositionProps = {
  alignment?: TooltipAlignment
  placement?: TooltipPlacement
  offsetY?: number
  offsetX?: number
  fromEdge?: number
}
export type RequiredTooltipPositionProps = Required<TooltipPositionProps>
