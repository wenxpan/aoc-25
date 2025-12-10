import { expect, describe, it } from 'bun:test'
import { calcBeamTimeline, calcTimesOfBeamSplit } from './beam-splitting'

describe('calcTimesOfBeamSplit', () => {
  it('calcTimesOfBeamSplit for test input', async () => {
    const input = await Bun.file('day07/data/01.txt').text()
    expect(calcTimesOfBeamSplit(input, '01.txt')).toBe(21)
  })

  it('calcTimesOfBeamSplit for full input', async () => {
    const input = await Bun.file('day07/data/02.txt').text()
    expect(calcTimesOfBeamSplit(input, '02.txt')).toBe(1560)
  })
})

describe('calcBeamTimeline', () => {
  it('calcBeamTimeline for test input', async () => {
    const input = await Bun.file('day07/data/01.txt').text()
    expect(calcBeamTimeline(input, '01.txt')).toBe(40)
  })

  it('calcBeamTimeline for full input', async () => {
    const input = await Bun.file('day07/data/02.txt').text()
    expect(calcBeamTimeline(input, '02.txt')).toBe(3097)
  })
})
