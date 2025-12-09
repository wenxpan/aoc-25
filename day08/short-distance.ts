type Coordinate = [x: number, y: number, z: number]

type Distance = [distance: number, boxA: Coordinate, boxB: Coordinate]

const calc3dDistance = ([x1, y1, z1]: Coordinate, [x2, y2, z2]: Coordinate) => {
  return Math.hypot(x2 - x1, y2 - y1, z2 - z1)
}

const formatInput = (inputStr: string) => {
  const coordinates = inputStr
    .split('\n')
    .map((line) => line.split(',').map((val) => +val)) as Coordinate[]
  return coordinates
}

export const calcSizes = (inputStr: string, times = 10) => {
  const coordinates = formatInput(inputStr)

  const distances: Distance[] = []

  for (const [boxAIndex, boxA] of coordinates.entries()) {
    for (let i = boxAIndex + 1; i < coordinates.length; i++) {
      const boxB = coordinates[i]
      if (!boxB) {
        continue
      }
      const distance = calc3dDistance(boxA, boxB)
      let insertIndex = distances.findIndex((el) => el[0] > distance)
      if (insertIndex === -1) {
        insertIndex = distances.length
      }
      distances.splice(insertIndex, 0, [distance, boxA, boxB])

      if (distances.length > times) {
        distances.splice(times)
      }
    }
  }

  const circuits: Coordinate[][] = coordinates.map((coord) => [coord])

  for (const [_, boxA, boxB] of distances) {
    const boxACircuitIndex = circuits.findIndex((circuit) =>
      circuit.find(
        (coord) =>
          coord[0] === boxA[0] && coord[1] === boxA[1] && coord[2] === boxA[2]
      )
    )
    const boxBCircuitIndex = circuits.findIndex((circuit) =>
      circuit.find(
        (coord) =>
          coord[0] === boxB[0] && coord[1] === boxB[1] && coord[2] === boxB[2]
      )
    )

    if (
      boxACircuitIndex !== -1 &&
      boxBCircuitIndex !== -1 &&
      boxACircuitIndex !== boxBCircuitIndex
    ) {
      circuits[boxACircuitIndex]!.push(...circuits[boxBCircuitIndex]!)
      circuits.splice(boxBCircuitIndex, 1)
    } else if (boxACircuitIndex === boxBCircuitIndex) {
      continue
    }
  }
  const circuitSizes = circuits
    .map((circuit) => circuit.length)
    .sort((a, b) => b - a)
    .slice(0, 3)
  return circuitSizes.reduce((prev, curr) => {
    return prev * curr
  }, 1)
}

// part 2
export const calcSizesAdvanced = (inputStr: string, times = 10) => {
  const coordinates = formatInput(inputStr)

  const rawDistances: Distance[] = []

  for (const [boxAIndex, boxA] of coordinates.entries()) {
    for (let i = boxAIndex + 1; i < coordinates.length; i++) {
      const boxB = coordinates[i]
      if (!boxB) {
        continue
      }
      const distance = calc3dDistance(boxA, boxB)

      rawDistances.push([distance, boxA, boxB])
    }
  }

  const distances = rawDistances.sort((a, b) => a[0] - b[0])

  const circuits: Coordinate[][] = coordinates.map((coord) => [coord])
  let lastConnection: [Coordinate, Coordinate] = [
    [0, 0, 0],
    [0, 0, 0],
  ]

  for (const [_, boxA, boxB] of distances) {
    const boxACircuitIndex = circuits.findIndex((circuit) =>
      circuit.find(
        (coord) =>
          coord[0] === boxA[0] && coord[1] === boxA[1] && coord[2] === boxA[2]
      )
    )
    const boxBCircuitIndex = circuits.findIndex((circuit) =>
      circuit.find(
        (coord) =>
          coord[0] === boxB[0] && coord[1] === boxB[1] && coord[2] === boxB[2]
      )
    )

    if (
      boxACircuitIndex !== -1 &&
      boxBCircuitIndex !== -1 &&
      boxACircuitIndex !== boxBCircuitIndex
    ) {
      circuits[boxACircuitIndex]!.push(...circuits[boxBCircuitIndex]!)
      circuits.splice(boxBCircuitIndex, 1)
    } else if (boxACircuitIndex === boxBCircuitIndex) {
      continue
    }

    if (circuits.length === 1) {
      lastConnection = [boxA, boxB]
      break
    }
  }

  return lastConnection[0][0] * lastConnection[1][0]
}
