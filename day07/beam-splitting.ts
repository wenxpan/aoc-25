export const drawBeamSplitting = (input: string, filePath: string) => {
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
  const output = grid.map((row) => row.join('')).join('\n')
  Bun.write(filePath, output)

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
  const grid = drawBeamSplitting(input, outputFile)

  let result = 0
  for (const [y, row] of grid.entries()) {
    for (const [x] of row.entries()) {
      const isSplit = checkIsSplit(grid, x, y)
      result += isSplit ? 1 : 0
    }
  }
  return result
}
