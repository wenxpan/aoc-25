import { expect, describe, it } from 'bun:test'
import { calcSizes, calcSizesAdvanced } from './short-distance'

describe('calcSizes', () => {
  it('calcSizes for test input', async () => {
    const input = await Bun.file('day08/data/01.txt').text()
    expect(calcSizes(input)).toBe(40)
  })

  it('calcSizes for full input', async () => {
    const input = await Bun.file('day08/data/02.txt').text()
    expect(calcSizes(input, 1000)).toBe(75582)
  })
})

describe('calcSizesAdvanced', () => {
  it('calcSizesAdvanced for test input', async () => {
    const input = await Bun.file('day08/data/01.txt').text()
    expect(calcSizesAdvanced(input)).toBe(25272)
  })

  it('calcSizesAdvanced for full input', async () => {
    const input = await Bun.file('day08/data/02.txt').text()
    expect(calcSizesAdvanced(input)).toBe(59039696)
  })
})
