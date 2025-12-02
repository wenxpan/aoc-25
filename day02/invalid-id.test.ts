import { expect, describe, it } from 'bun:test'
import {
  calcInvalidIdsTotal,
  findInvalidIdsWithinRange,
  isInvalidId,
  isInvalidIdAtLeastTwice,
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

  it('finds invalid ids within range with second method', () => {
    expect(
      findInvalidIdsWithinRange('11', '22', isInvalidIdAtLeastTwice)
    ).toEqual(['11', '22'])
    expect(
      findInvalidIdsWithinRange('95', '115', isInvalidIdAtLeastTwice)
    ).toEqual(['99', '111'])
    expect(
      findInvalidIdsWithinRange('998', '1012', isInvalidIdAtLeastTwice)
    ).toEqual(['999', '1010'])
    expect(
      findInvalidIdsWithinRange(
        '1188511880',
        '1188511890',
        isInvalidIdAtLeastTwice
      )
    ).toEqual(['1188511885'])
    expect(
      findInvalidIdsWithinRange('222220', '222224', isInvalidIdAtLeastTwice)
    ).toEqual(['222222'])
    expect(
      findInvalidIdsWithinRange('1698522', '1698528', isInvalidIdAtLeastTwice)
    ).toHaveLength(0)
    expect(
      findInvalidIdsWithinRange('446443', '446449', isInvalidIdAtLeastTwice)
    ).toEqual(['446446'])
    expect(
      findInvalidIdsWithinRange('38593856', '38593862', isInvalidIdAtLeastTwice)
    ).toEqual(['38593859'])
    expect(
      findInvalidIdsWithinRange('565653', '565659', isInvalidIdAtLeastTwice)
    ).toEqual(['565656'])
    expect(
      findInvalidIdsWithinRange(
        '824824821',
        '824824827',
        isInvalidIdAtLeastTwice
      )
    ).toEqual(['824824824'])
    expect(
      findInvalidIdsWithinRange(
        '2121212118',
        '2121212124',
        isInvalidIdAtLeastTwice
      )
    ).toEqual(['2121212121'])
  })
})

describe('calcInvalidIdsTotal', () => {
  it('calculates invalid ids total with first method', async () => {
    const input = await Bun.file('day02/data/01.txt').text()
    expect(calcInvalidIdsTotal(input)).toBe(1227775554)

    const input2 = await Bun.file('day02/data/02.txt').text()
    expect(calcInvalidIdsTotal(input2)).toBe(21139440284)
  })

  it('calculates invalid ids total with second method', async () => {
    const input = await Bun.file('day02/data/01.txt').text()
    expect(calcInvalidIdsTotal(input, isInvalidIdAtLeastTwice)).toBe(4174379265)

    const input2 = await Bun.file('day02/data/02.txt').text()
    expect(calcInvalidIdsTotal(input2, isInvalidIdAtLeastTwice)).toBe(
      38731915928
    )
  })
})
