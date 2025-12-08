type Range = [number, number]

export const formatInput = (input: string): [Range[], number[]] => {
  const parts = input.trim().split('\n\n')
  const rangelines = parts[0]?.split('\n')
  const ranges = rangelines?.map((range) => {
    return range.split('-').map((num) => +num)
  }) as Range[]
  const ids = parts[1]?.split('\n').map((num) => +num) as number[]

  return [ranges, ids]
}

export const getFreshIngredientIds = (
  ranges: Range[],
  idsToCheck: number[]
) => {
  const freshIngredients = []
  for (const id of idsToCheck) {
    for (const range of ranges) {
      if (id >= range[0] && id <= range[1]) {
        freshIngredients.push(id)
        break
      }
    }
  }
  return freshIngredients.length
}

// part 2
const mergeTwoRanges = (
  range0: Range,
  range1: Range | undefined
): [Range | null, Range | null] => {
  if (!range1) {
    return [range0, null]
  }
  const noOverlap =
    (range0[0] < range1[0] && range0[1] < range1[0]) ||
    (range0[0] > range1[0] && range0[1] > range1[0])

  if (noOverlap) {
    return [range0, range1]
  }
  const mergedRange: Range = [
    Math.min(range0[0], range1[0]),
    Math.max(range0[1], range1[1]),
  ]

  return [null, mergedRange]
}

const mergeOneRound = (ranges: Range[]) => {
  const newRanges: (Range | null)[] = [...ranges]
  for (let i = 0; i < ranges.length; i++) {
    const mergedRanges = mergeTwoRanges(newRanges[i]!, newRanges[i + 1]!)

    newRanges.splice(i, 2, mergedRanges[0], mergedRanges[1])
  }

  return newRanges
}

export const getAllFreshIngredientIds = (ranges: Range[]) => {
  const sortedRanges = ranges.sort((a, b) => a[0] - b[0])

  let rangesMerged = [...sortedRanges]

  while (true) {
    const newRanges = mergeOneRound(rangesMerged).filter((range) => !!range)
    if (newRanges.length === rangesMerged.length) {
      break
    } else {
      rangesMerged = newRanges
    }
  }

  let numOfIngredients = 0

  for (const range of rangesMerged) {
    const countInRange = range[1] - range[0] + 1
    numOfIngredients += countInRange
  }

  return numOfIngredients
}
