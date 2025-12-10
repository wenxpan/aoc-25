import 'lodash.combinations'
import _ from 'lodash'

type Machine = {
  diagram: (0 | 1)[]
  buttons: number[][]
  joltage: number[]
}

const formatInput = (input: string): Machine[] => {
  const lines = input.split('\n')
  const machines = lines.map((line) => {
    const segments = line.split(' ')
    const diagramStr = segments[0]!
    const diagram = diagramStr
      .slice(1, diagramStr.length - 1)
      .split('')
      .map((val) => (val === '#' ? 1 : 0)) as Machine['diagram']
    const buttons = segments.slice(1, segments.length - 1).map((button) => {
      return button
        .slice(1, button.length - 1)
        .split(',')
        .map((val) => +val)
    })

    const joltageStr = segments[segments.length - 1]!
    const joltage = joltageStr
      .slice(1, joltageStr.length - 1)
      .split(',')
      .map((val) => +val)
    return {
      diagram,
      buttons,
      joltage,
    }
  })
  return machines
}

const toggledMatchesDiagram = (diagram: number[], buttons: number[][]) => {
  const lights: number[] = new Array(diagram.length).fill(0)
  buttons.reduce((prev, curr) => {
    curr.forEach((index) => prev.splice(index, 1, prev[index] === 0 ? 1 : 0))
    return lights
  }, lights)

  return lights.join('') === diagram.join('')
}

const checkMachine = (machine: Machine) => {
  const buttons = machine.buttons
  let result = buttons.length
  for (let i = 1; i < buttons.length; i++) {
    const allCombinations = _.combinations(buttons, i)
    for (const combination of allCombinations) {
      const match = toggledMatchesDiagram(machine.diagram, combination)
      if (match && combination.length < result) {
        result = combination.length
        break
      }
    }
  }

  return result
}

export const calcToggleButton = (input: string) => {
  const machines = formatInput(input)
  let result = 0
  for (const machine of machines) {
    const pressTimes = checkMachine(machine)
    result += pressTimes
  }
  return result
}
