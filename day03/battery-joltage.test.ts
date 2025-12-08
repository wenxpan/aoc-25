import { expect, describe, it } from 'bun:test'
import {
  calcTotalJoltage,
  calcTotalJoltageMoreDigits,
  checkBankJoltage,
  checkBankJoltageMuchMoreDigits,
} from './battery-joltage'

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

describe('checkBankJoltageMuchMoreDigits', () => {
  it('finds the largest joltage possible with more digits', () => {
    expect(checkBankJoltageMuchMoreDigits('987654321111111')).toBe(987654321111)
    expect(checkBankJoltageMuchMoreDigits('811111111111119')).toBe(811111111119)
    expect(checkBankJoltageMuchMoreDigits('234234234234278')).toBe(434234234278)
    expect(checkBankJoltageMuchMoreDigits('818181911112111')).toBe(888911112111)
  })
})

describe('calcTotalJoltageMoreDigits', () => {
  it('calcs total joltage with more digits', async () => {
    const input = await Bun.file('day03/data/01.txt').text()
    const banks = input.trim().split('\n')
    expect(calcTotalJoltageMoreDigits(banks)).toBe(3121910778619)

    const input2 = await Bun.file('day03/data/02.txt').text()
    const banks2 = input2.trim().split('\n')
    expect(calcTotalJoltageMoreDigits(banks2)).toBe(173685428989126)
  })
})
