import { expect, describe, it } from 'bun:test'
import { calcToggleButton } from './toggle-button'

describe('calcToggleButton', () => {
  it('calcToggleButton for test input', async () => {
    const input = await Bun.file('day10/data/01.txt').text()
    expect(calcToggleButton(input)).toBe(7)
  })

  it('calcToggleButton for full input', async () => {
    const input = await Bun.file('day10/data/02.txt').text()
    expect(calcToggleButton(input)).toBe(475)
  })
})
