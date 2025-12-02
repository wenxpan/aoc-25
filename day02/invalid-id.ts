export const isInvalidId = (id: string) => {
  const length = id.length
  //check even length
  if (length % 2 !== 0) {
    return false
  }

  const halfLength = length / 2
  let equal = true
  for (let i = 0; i < halfLength; i++) {
    const isCharEqual = id[i] === id[halfLength + i]
    if (isCharEqual) {
      continue
    } else {
      equal = false
      break
    }
  }
  return equal
}

export const findInvalidIdsWithinRange = (
  startId: string,
  endId: string
): string[] => {
  // check even
  if (startId.length % 2 !== 0 && endId.length % 2 !== 0) {
    return []
  }

  let currentNumber = +startId
  let invalidIds = []

  while (currentNumber <= +endId) {
    if (isInvalidId(currentNumber.toString())) {
      invalidIds.push(currentNumber.toString())
    }
    currentNumber += 1
  }

  return invalidIds
}

export const calcInvalidIdsTotal = (input: string) => {
  const ranges = input.split(',')
  let invalidIds = []
  for (const range of ranges) {
    const startId = range.split('-')[0]
    const endId = range.split('-')[1]
    if (startId === undefined || endId === undefined) {
      break
    }
    const invalidIdsWithinRange = findInvalidIdsWithinRange(startId, endId)
    invalidIds.push(...invalidIdsWithinRange)
  }
  const total = invalidIds.reduce(
    (accumulator, currentValue) => +accumulator + +currentValue,
    0
  )
  return total
}
