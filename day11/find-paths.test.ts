import { expect, describe, it } from 'bun:test'
import { calcSvrToOut, calcYouToOut } from './find-paths'

describe.skip('calcYouToOut', () => {
  it('calcYouToOut for test input', async () => {
    const input = await Bun.file('day11/data/01.txt').text()
    expect(calcYouToOut(input)).toBe(5)
  })

  it('calcYouToOut for full input', async () => {
    const input = await Bun.file('day11/data/02.txt').text()
    expect(calcYouToOut(input)).toBe(791)
  })
})

describe('calcSvrToOut', () => {
  it('calcSvrToOut for test input', async () => {
    const input = await Bun.file('day11/data/03.txt').text()
    expect(calcSvrToOut(input)).toBe(2)
  })

  it('calcSvrToOut for full input', async () => {
    const input = await Bun.file('day11/data/02.txt').text()
    expect(calcSvrToOut(input)).toBe(0)
  })
})
