type RollKey = `${number},${number}`
type Grid = { [key in RollKey]: boolean }

const paperRollSymbol = '@'

export const formatInput = (input: string): Grid => {
  const lines = input.trim().split('\n')
  const paperRolls: Grid = {}
  for (const [yIndex, line] of lines.entries()) {
    const rolls = line.split('')
    for (const [xIndex, roll] of rolls.entries()) {
      paperRolls[`${xIndex},${yIndex}`] = roll === paperRollSymbol
    }
  }
  return paperRolls
}

const checkValidPaperRoll = (
  paperRolls: Grid,
  xIndex: number,
  yIndex: number
) => {
  const target = paperRolls[`${xIndex},${yIndex}`]
  if (!target) {
    return false
  }

  const adjacentPosition: [number, number][] = [
    [xIndex - 1, yIndex - 1],
    [xIndex, yIndex - 1],
    [xIndex + 1, yIndex - 1],

    [xIndex - 1, yIndex],
    [xIndex + 1, yIndex],

    [xIndex - 1, yIndex + 1],
    [xIndex, yIndex + 1],
    [xIndex + 1, yIndex + 1],
  ]

  let totalAdjacent = 0
  for (const [xToCheck, yToCheck] of adjacentPosition) {
    const isRoll = paperRolls[`${xToCheck},${yToCheck}`]
    totalAdjacent += isRoll ? 1 : 0
  }
  if (totalAdjacent < 4) {
    return true
  }
  return false
}

export const calcTotalRolls = (input: string) => {
  const rollsGrid = formatInput(input)
  const rollsToCheck = Object.keys(rollsGrid).filter(
    (indexKey) => !!rollsGrid[indexKey as RollKey]
  )
  let totalValid = 0
  for (const rollKey of rollsToCheck) {
    const [x, y] = rollKey.split(',')
    if (checkValidPaperRoll(rollsGrid, +x!, +y!)) {
      totalValid += 1
    }
  }
  return totalValid
}

// PART2
export const calcTotalRollsAndRemove = (rollsGrid: Grid) => {
  const rollsToCheck = Object.keys(rollsGrid).filter(
    (indexKey) => !!rollsGrid[indexKey as RollKey]
  ) as RollKey[]

  let totalValid = 0
  for (const rollKey of rollsToCheck) {
    const [x, y] = rollKey.split(',')
    if (checkValidPaperRoll(rollsGrid, +x!, +y!)) {
      totalValid += 1
      rollsGrid[rollKey] = false
    }
  }
  return totalValid
}

export const calcNewRolls = (input: string) => {
  const rollsGrid = formatInput(input)
  let total = 0
  let moreToCheck = true
  while (moreToCheck) {
    const result = calcTotalRollsAndRemove(rollsGrid)
    if (result === 0) {
      moreToCheck = false
      break
    }
    total += result
  }
  return total
}
