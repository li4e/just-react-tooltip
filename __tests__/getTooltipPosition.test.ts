import { getTooltipPosition } from '../src/getTooltipPosition'

const baseInput = {
  window: {
    width: 1000,
    height: 1000,
  },
  children: {
    top: 400,
    right: 600,
    bottom: 600,
    left: 400,
  },
  tooltip: {
    width: 50,
    height: 50,
  },
  offsetX: 0,
  offsetY: 0,
  fromEdge: 0,
}

describe('Tooltip should be shown', () => {
  test('top center', () => {
    const result = getTooltipPosition({
      ...baseInput,
      placement: 'top',
      alignment: 'center',
    })
    expect(result.top).toBe('350px')
    expect(result.left).toBe('475px')
  })

  test('top start', () => {
    const result = getTooltipPosition({
      ...baseInput,
      placement: 'top',
      alignment: 'start',
    })
    expect(result.top).toBe('350px')
    expect(result.left).toBe('400px')
  })

  test('top end', () => {
    const result = getTooltipPosition({
      ...baseInput,
      placement: 'top',
      alignment: 'end',
    })
    expect(result.top).toBe('350px')
    expect(result.left).toBe('550px')
  })

  test('left center', () => {
    const result = getTooltipPosition({
      ...baseInput,
      placement: 'left',
      alignment: 'center',
    })
    expect(result.top).toBe('475px')
    expect(result.left).toBe('350px')
  })

  test('left start', () => {
    const result = getTooltipPosition({
      ...baseInput,
      placement: 'left',
      alignment: 'start',
    })
    expect(result.top).toBe('400px')
    expect(result.left).toBe('350px')
  })

  test('left end', () => {
    const result = getTooltipPosition({
      ...baseInput,
      placement: 'left',
      alignment: 'end',
    })
    expect(result.top).toBe('550px')
    expect(result.left).toBe('350px')
  })

  test('bottom center', () => {
    const result = getTooltipPosition({
      ...baseInput,
      placement: 'bottom',
      alignment: 'center',
    })
    expect(result.top).toBe('600px')
    expect(result.left).toBe('475px')
  })

  test('bottom start', () => {
    const result = getTooltipPosition({
      ...baseInput,
      placement: 'bottom',
      alignment: 'start',
    })
    expect(result.top).toBe('600px')
    expect(result.left).toBe('400px')
  })

  test('bottom end', () => {
    const result = getTooltipPosition({
      ...baseInput,
      placement: 'bottom',
      alignment: 'end',
    })
    expect(result.top).toBe('600px')
    expect(result.left).toBe('550px')
  })

  test('right center', () => {
    const result = getTooltipPosition({
      ...baseInput,
      placement: 'right',
      alignment: 'center',
    })
    expect(result.top).toBe('475px')
    expect(result.left).toBe('600px')
  })

  test('right start', () => {
    const result = getTooltipPosition({
      ...baseInput,
      placement: 'right',
      alignment: 'start',
    })
    expect(result.top).toBe('400px')
    expect(result.left).toBe('600px')
  })

  test('right end', () => {
    const result = getTooltipPosition({
      ...baseInput,
      placement: 'right',
      alignment: 'end',
    })
    expect(result.top).toBe('550px')
    expect(result.left).toBe('600px')
  })

  test('top start - inverted and stickied with offsets', () => {
    const result = getTooltipPosition({
      ...baseInput,
      placement: 'top',
      alignment: 'start',
      children: {
        top: 0,
        right: 20,
        bottom: 20,
        left: -20,
      },
      fromEdge: 10,
      offsetX: -10,
      offsetY: -10,
    })
    expect(result.top).toBe('30px')
    expect(result.left).toBe('10px')
  })

  test('bottom end - inverted and stickied', () => {
    const result = getTooltipPosition({
      ...baseInput,
      placement: 'bottom',
      alignment: 'end',
      children: {
        top: 900,
        right: 1020,
        bottom: 1020,
        left: 900,
      },
      offsetX: 10,
      offsetY: 10,
      fromEdge: 10,
    })
    expect(result.top).toBe('840px')
    expect(result.left).toBe('940px')
  })

  test('left center - inverted and stickied', () => {
    const result = getTooltipPosition({
      ...baseInput,
      placement: 'left',
      alignment: 'center',
      children: {
        top: -10,
        right: 30,
        bottom: 30,
        left: -30,
      },
      offsetX: -10,
      offsetY: 10,
      fromEdge: 10,
    })
    expect(result.top).toBe('10px')
    expect(result.left).toBe('40px')
  })

  test('right start - inverted and stickied', () => {
    const result = getTooltipPosition({
      ...baseInput,
      placement: 'right',
      alignment: 'start',
      children: {
        top: -10,
        right: 1100,
        bottom: 30,
        left: 970,
      },
      offsetX: 10,
      offsetY: 10,
      fromEdge: 10,
    })
    expect(result.top).toBe('10px')
    expect(result.left).toBe('910px')
  })
})
