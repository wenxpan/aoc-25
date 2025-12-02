import { expect, describe, it } from 'bun:test'
import {
  calcInvalidIdsTotal,
  findInvalidIdsWithinRange,
  isInvalidId,
} from './invalid-id'

describe('isInvalidId', () => {
  it('finds repated digits', () => {
    expect(isInvalidId('55')).toBeTrue()
    expect(isInvalidId('6464')).toBeTrue()
    expect(isInvalidId('123123')).toBeTrue()
  })
})

describe('findInvalidIdsWithinRange', () => {
  it('finds invalid ids within range', () => {
    expect(findInvalidIdsWithinRange('11', '22')).toEqual(['11', '22'])
    expect(findInvalidIdsWithinRange('95', '115')).toEqual(['99'])
    expect(findInvalidIdsWithinRange('998', '1012')).toEqual(['1010'])
    expect(findInvalidIdsWithinRange('1188511880', '1188511890')).toEqual([
      '1188511885',
    ])
    expect(findInvalidIdsWithinRange('222220', '222224')).toEqual(['222222'])
    expect(findInvalidIdsWithinRange('1698522', '1698528')).toHaveLength(0)
    expect(findInvalidIdsWithinRange('446443', '446449')).toEqual(['446446'])
    expect(findInvalidIdsWithinRange('38593856', '38593862')).toEqual([
      '38593859',
    ])
  })
})

describe('calcInvalidIdsTotal', () => {
  it('calculates invalid ids total', async () => {
    const input = await Bun.file('day02/data/01.txt').text()
    expect(calcInvalidIdsTotal(input)).toBe(1227775554)

    const input2 = await Bun.file('day02/data/02.txt').text()
    expect(calcInvalidIdsTotal(input2)).toBe(21139440284)
  })
})
