import { expect, describe, it } from 'bun:test'
import { solveAdvancedWorksheet, solveWorksheet } from './math-homework'

describe('solveWorksheet', () => {
  it('solves problems for test input', async () => {
    const input = await Bun.file('day06/data/01.txt').text()
    expect(solveWorksheet(input)).toBe(4277556)
  })

  it('solves problems for full input', async () => {
    const input = await Bun.file('day06/data/02.txt').text()
    expect(solveWorksheet(input)).toBe(3525371263915)
  })
})

describe('solveAdvancedWorksheet', () => {
  it('solves problems for test input', async () => {
    const input = await Bun.file('day06/data/01.txt').text()
    expect(solveAdvancedWorksheet(input)).toBe(3263827)
  })

  it.only('solves problems for full input', async () => {
    const input = await Bun.file('day06/data/02.txt').text()
    expect(solveAdvancedWorksheet(input)).toBe(6846480843636)
  })
})
