export const drawBeamSplitting = (input: string) => {
  const grid = input
    .trim()
    .split('\n')
    .map((row) => row.split(''))

  for (const [y, row] of grid.entries()) {
    for (const [x] of row.entries()) {
      const shouldBeam = checkShouldEmit(grid, x, y)
      if (shouldBeam) {
        grid[y]!.splice(x, 1, '|')
      }
    }
  }

  return grid
}

const checkShouldEmit = (grid: string[][], x: number, y: number) => {
  // only check for .
  if (grid[y]![x] !== '.') {
    return false
  }

  // when S is above
  const isBelowStart = grid[y - 1]?.[x] === 'S'

  // when splitter is left/right, and beam above splitter
  const isLeftToSplitter =
    grid[y]![x - 1] === '^' && grid[y - 1]![x - 1] === '|'
  const isRightToSplitter =
    grid[y]![x + 1] === '^' && grid[y - 1]![x + 1] === '|'

  const isBelowBeam = grid[y - 1]?.[x] === '|'
  return isBelowStart || isLeftToSplitter || isRightToSplitter || isBelowBeam
}

const checkIsSplit = (grid: string[][], x: number, y: number) => {
  // only check beam
  if (grid[y]![x] !== '|') {
    return false
  }

  // when beam is above ^
  const isAboveSplitter = grid[y + 1] && grid[y + 1]![x] === '^'

  return isAboveSplitter
}

export const calcTimesOfBeamSplit = (input: string, fileName: string) => {
  const outputFile = 'day07/output/' + fileName
  const grid = drawBeamSplitting(input)

  const output = grid.map((row) => row.join('')).join('\n')
  Bun.write(outputFile, output)

  let result = 0
  for (const [y, row] of grid.entries()) {
    for (const [x] of row.entries()) {
      const isSplit = checkIsSplit(grid, x, y)
      result += isSplit ? 1 : 0
    }
  }
  return result
}

// PART 2
export const calcBeamTimeline = (input: string, fileName: string) => {
  const outputFile = 'day07/output/p2/' + fileName
  const grid = drawBeamSplitting(input)

  for (const [y, row] of grid.entries()) {
    for (const [x, current] of row.entries()) {
      if (current !== '|') {
        continue
      }

      const currentRow = grid[y]
      const rowAbove = grid[y - 1]
      if (!rowAbove || !currentRow) {
        continue
      }

      if (rowAbove[x] === 'S') {
        currentRow.splice(x, 1, '1')
        continue
      }

      const hasLeftSplitter = currentRow[x - 1] === '^'
      const hasRightSplitter = currentRow[x + 1] === '^'

      const leftSplitTimes =
        hasLeftSplitter && rowAbove[x - 1] !== '.' ? rowAbove[x - 1] : 0
      const rightSplitTimes =
        hasRightSplitter && rowAbove[x + 1] !== '.' ? rowAbove[x + 1] : 0
      const directEmitTimes = rowAbove[x] === '.' ? 0 : rowAbove[x]
      const totalTimes =
        +leftSplitTimes! + +rightSplitTimes! + +directEmitTimes!
      currentRow.splice(x, 1, totalTimes.toString())
    }
  }

  const output = grid.map((row) => row.join('')).join('\n')
  Bun.write(outputFile, output)

  const result = grid[grid.length - 1]
    ?.filter((val) => val !== '.')
    .map((val) => +val)
    .reduce((prev, curr) => prev + curr, 0)

  return result
}
