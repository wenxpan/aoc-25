import { expect, describe, it } from 'bun:test'
import { calcNewRolls, calcTotalRolls } from './access-paper'

describe('calcTotalRolls', () => {
  it('calcs total rolls', async () => {
    const input = await Bun.file('day04/data/01.txt').text()
    expect(calcTotalRolls(input)).toBe(13)
  })
  it('calcs total rolls for full input', async () => {
    const input = await Bun.file('day04/data/02.txt').text()
    expect(calcTotalRolls(input)).toBe(1533)
  })
})

describe('calcNewRolls', () => {
  it('calcs new rolls', async () => {
    const input = await Bun.file('day04/data/01.txt').text()
    expect(calcNewRolls(input)).toBe(43)
  })
  it('calcs new rolls for full input', async () => {
    const input = await Bun.file('day04/data/02.txt').text()
    expect(calcNewRolls(input)).toBe(9206)
  })
})
