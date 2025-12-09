import { expect, describe, it } from 'bun:test'
import { findLargestArea } from './find-tiles'

describe('findLargestArea', () => {
  it('findLargestArea for test input', async () => {
    const input = await Bun.file('day09/data/01.txt').text()
    expect(findLargestArea(input)).toBe(50)
  })

  it('findLargestArea for full input', async () => {
    const input = await Bun.file('day09/data/02.txt').text()
    expect(findLargestArea(input)).toBe(4735268538)
  })
})
