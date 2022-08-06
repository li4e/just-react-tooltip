import { getTooltipPosition } from '../src/getTooltipPosition'

describe('Tooltip should', () => {
  test('be visible above target element', () => {
    const result = getTooltipPosition({
      offsetY: 4,
      fromEdge: 8,
      place: 'top',
      window: {
        width: 1000,
        height: 1000,
      },
      children: {
        top: 500,
        right: 600,
        bottom: 600,
        left: 500,
      },
      tooltip: {
        width: 80,
        height: 80,
      },
    })
    expect(result.top).toBe('416px')
    expect(result.left).toBe('510px')
  })

  test('be visible below target element with 10px custom offset', () => {
    const result = getTooltipPosition({
      offsetY: 10,
      fromEdge: 8,
      window: {
        width: 1000,
        height: 1000,
      },
      children: {
        top: 500,
        right: 600,
        bottom: 600,
        left: 500,
      },
      tooltip: {
        width: 120,
        height: 30,
      },
    })
    expect(result.top).toBe('610px')
    expect(result.left).toBe('490px')
  })

  test('be visible above target element to prevent over edge and stick to right edge', () => {
    const result = getTooltipPosition({
      offsetY: 4,
      fromEdge: 8,
      window: {
        width: 1000,
        height: 1000,
      },
      children: {
        top: 900,
        right: 950,
        bottom: 950,
        left: 900,
      },
      tooltip: {
        width: 200,
        height: 100,
      },
    })
    expect(result.top).toBe('796px')
    expect(result.left).toBe('792px')
  })
})
