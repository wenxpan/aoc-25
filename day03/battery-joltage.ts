const findLargestIndex = (numbers: number[]) => {
  return numbers.findIndex((number) => number === Math.max(...numbers))
}

export const checkBankJoltage = (bank: string): number => {
  const numbers = bank.split('').map((char) => +char)

  const largestIndexRaw = findLargestIndex(numbers)
  const largestIndex =
    largestIndexRaw === numbers.length - 1
      ? findLargestIndex(numbers.slice(0, numbers.length - 1))
      : largestIndexRaw
  const remainingNumbers = numbers.slice(largestIndex + 1)
  const secLargestIndex = findLargestIndex(remainingNumbers)

  return +`${numbers[largestIndex]}${remainingNumbers[secLargestIndex]}`
}

export const calcTotalJoltage = (banks: string[]) => {
  let total = 0
  for (const bank of banks) {
    const number = checkBankJoltage(bank)
    total += number
  }
  return total
}

export const checkBankJoltageMuchMoreDigits = (
  bank: string,
  digits = 12
): number => {
  const numbers = bank.split('').map((char) => +char)
  const chosen = []

  const findLargestIndexWithinRange = (
    numbers: number[],
    digitPlace: number,
    startIndex = 0
  ) => {
    const range = numbers.slice(startIndex, numbers.length - digitPlace + 1)
    const rangeIndex = findLargestIndex(range)

    return rangeIndex + startIndex
  }

  let nextTimeStartIndex = 0
  for (let i = digits; i > 0; i--) {
    const result = findLargestIndexWithinRange(numbers, i, nextTimeStartIndex)
    nextTimeStartIndex = result + 1
    chosen.push(numbers[result])
  }

  return +chosen.join('')
}

export const calcTotalJoltageMoreDigits = (banks: string[]) => {
  let total = 0
  for (const bank of banks) {
    const number = checkBankJoltageMuchMoreDigits(bank, 12)
    total += number
  }
  return total
}
