import { expect, describe, it } from 'bun:test'
import { calcTotalJoltage, checkBankJoltage } from './battery-joltage'

describe('checkBankJoltage', () => {
  it('finds the largest joltage possible', () => {
    expect(checkBankJoltage('987654321111111')).toBe(98)
    expect(checkBankJoltage('811111111111119')).toBe(89)
    expect(checkBankJoltage('234234234234278')).toBe(78)
    expect(checkBankJoltage('818181911112111')).toBe(92)
  })
})

describe('calcTotalJoltage', () => {
  it('calcs total joltage', async () => {
    const input = await Bun.file('day03/data/01.txt').text()
    const banks = input.trim().split('\n')
    expect(calcTotalJoltage(banks)).toBe(357)

    const input2 = await Bun.file('day03/data/02.txt').text()
    const banks2 = input2.trim().split('\n')
    expect(calcTotalJoltage(banks2)).toBe(17493)
  })
})
