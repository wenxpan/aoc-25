const LEFT = 'L'
export type RotationAction = `L${number}` | `R${number}`

export const splitInput = async (input: string) => {
  const lines = input.trim().split('\n')
  const validLines = lines.filter(
    (line) =>
      (line.startsWith('L') || line.startsWith('R')) &&
      !Number.isNaN(+line.slice(1))
  ) as RotationAction[]
  return validLines
}

export const calcPositionAfterRotation = (
  startPos: number,
  action: RotationAction,
  range = 99
) => {
  // take into 0 index
  const totalPos = range + 1

  const rotation = action[0]
  const step = +action.slice(1)

  const posDiff = rotation === LEFT ? -step : step
  const rawPos = startPos + posDiff
  if (rawPos > range) {
    return rawPos % totalPos
  } else {
    const leftNeeded = rawPos % totalPos
    const afterLeft = leftNeeded + totalPos
    return afterLeft % totalPos
  }
}

export const calcNumberOfPosition = ({
  posToMatch,
  startPos,
  actions,
  range = 99,
}: {
  posToMatch: number
  startPos: number
  actions: RotationAction[]
  range?: number
}) => {
  let currentPosition = startPos
  let numberOfTimes = 0
  for (const action of actions) {
    currentPosition = calcPositionAfterRotation(currentPosition, action, range)
    if (currentPosition === posToMatch) {
      numberOfTimes += 1
    }
  }
  return numberOfTimes
}
