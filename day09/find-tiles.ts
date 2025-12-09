const formatInput = (inputStr: string) => {
  const tiles = inputStr
    .split('\n')
    .map((line) => line.split(',').map((val) => +val))
  return tiles
}

export const findLargestArea = (inputStr: string) => {
  const tiles = formatInput(inputStr)

  let largestArea = 0

  for (const tileA of tiles) {
    for (const tileB of tiles) {
      const tileAX = tileA[0]!
      const tileAY = tileA[1]!
      const tileBX = tileB[0]!
      const tileBY = tileB[1]!

      const areas = [
        (tileAX - tileBX + 1) * (tileAY - tileBY + 1),
        (tileAX - tileBX + 1) * (tileBY - tileAY + 1),
        (tileBX - tileAX + 1) * (tileBY - tileAY + 1),
        (tileBX - tileAX + 1) * (tileAY - tileBY + 1),
      ]
      if (Math.max(...areas) > largestArea) {
        largestArea = Math.max(...areas)
      }
    }
  }

  return largestArea
}
