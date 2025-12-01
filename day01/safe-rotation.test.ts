import {
  calcNumberOfPosition,
  calcPositionAfterRotation,
  splitInput,
} from './safe-rotation'
import { expect, describe, it } from 'bun:test'

describe('calcPositionAfterRotation', () => {
  it('calculates left and right within range', () => {
    expect(calcPositionAfterRotation(0, 'R5', 10)).toBe(5)
    expect(calcPositionAfterRotation(10, 'L5', 10)).toBe(5)
  })

  it('calculates left and right outside range', () => {
    expect(calcPositionAfterRotation(0, 'R11', 10)).toBe(0)
    expect(calcPositionAfterRotation(0, 'L4', 10)).toBe(7)
  })

  it('calculates correct position', () => {
    expect(calcPositionAfterRotation(50, 'L68')).toBe(82)
    expect(calcPositionAfterRotation(82, 'L30')).toBe(52)
    expect(calcPositionAfterRotation(52, 'R48')).toBe(0)
    expect(calcPositionAfterRotation(0, 'L5')).toBe(95)
    expect(calcPositionAfterRotation(95, 'R60')).toBe(55)
    expect(calcPositionAfterRotation(55, 'L55')).toBe(0)
    expect(calcPositionAfterRotation(0, 'L1')).toBe(99)
    expect(calcPositionAfterRotation(99, 'L99')).toBe(0)
    expect(calcPositionAfterRotation(0, 'R14')).toBe(14)
    expect(calcPositionAfterRotation(14, 'L82')).toBe(32)
  })
})

describe('calcNumberOfPosition', () => {
  it('correct number of times for test input', async () => {
    const input = await Bun.file('day01/data/01.txt').text()
    const lines = await splitInput(input)
    expect(
      calcNumberOfPosition({ startPos: 50, actions: lines, posToMatch: 0 })
    ).toBe(3)
  })

  it('correct number of times for full input', async () => {
    const input = await Bun.file('day01/data/02.txt').text()
    const lines = await splitInput(input)
    expect(
      calcNumberOfPosition({ startPos: 50, actions: lines, posToMatch: 0 })
    ).toBe(1120)
  })
})
