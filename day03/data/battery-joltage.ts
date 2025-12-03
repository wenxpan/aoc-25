export const checkBankJoltage = (bank: string): number => {
  const numbers = bank.split('').map((char) => +char)
  const findLargestIndex = (numbers: number[], isLast = false) => {
    return numbers.findIndex((number) => number === Math.max(...numbers))
  }

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
