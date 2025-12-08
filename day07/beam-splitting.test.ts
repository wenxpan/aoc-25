import { expect, describe, it } from 'bun:test'
import { calcTimesOfBeamSplit } from './beam-splitting'

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
