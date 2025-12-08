import { expect, describe, it } from 'bun:test'
import {
  formatInput,
  getAllFreshIngredientIds,
  getFreshIngredientIds,
} from './fresh-range'

describe('getFreshIngredientIds', () => {
  it('gets fresh ingredients for test input', async () => {
    const input = await Bun.file('day05/data/01.txt').text()
    const res = formatInput(input)
    expect(getFreshIngredientIds(...res)).toBe(3)
  })
  it('gets fresh ingredients for full input', async () => {
    const input = await Bun.file('day05/data/02.txt').text()
    const res = formatInput(input)
    expect(getFreshIngredientIds(...res)).toBe(577)
  })

  it('gets all fresh ingredients for test input', async () => {
    const input = await Bun.file('day05/data/01.txt').text()
    const res = formatInput(input)
    expect(getAllFreshIngredientIds(res[0])).toBe(14)
  })
  it('gets all fresh ingredients for full input', async () => {
    const input = await Bun.file('day05/data/02.txt').text()
    const res = formatInput(input)
    expect(getAllFreshIngredientIds(res[0])).toBe(350513176552950)
  })
})
