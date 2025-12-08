const calcProblem = (input: number[], operation: string) => {
  const answer = input.reduce(
    (acc, currentVal) => {
      switch (operation) {
        case '*':
          return acc * currentVal
        case '+':
          return acc + currentVal
        default:
          return 0
      }
    },
    operation === '*' ? 1 : 0
  )

  return answer
}

export const solveWorksheet = (rawInput: string) => {
  const lines = rawInput.trim().split('\n')
  const rows = lines.map((line) => {
    return line.split(' ').filter((val) => !!val)
  })
  const problemCount = rows[0]?.length!

  let answer = 0
  for (let i = 0; i < problemCount; i++) {
    const problem = rows.map((row) => row[i])
    const operation = problem[problem.length - 1]
    const input = problem.slice(0, problem.length - 1).map((val) => +val!)
    answer += calcProblem(input, operation!)
  }

  return answer
}

type Problem = {
  operation: string
  input: number[]
}

export const solveAdvancedWorksheet = (rawInput: string) => {
  const lines = rawInput.split('\n')
  const operationRow = lines[lines.length - 1]!

  const operations = operationRow?.split(' ').filter((res) => !!res)

  if (!operations) {
    return 0
  }

  let problems: Problem[] = []
  let lastIndex = 0
  for (const [index, operation] of operations!.entries()) {
    const startIndex =
      operationRow.slice(lastIndex).indexOf(operation) + lastIndex
    const endIndex = operations[index + 1]
      ? operationRow.slice(startIndex + 1).indexOf(operations[index + 1]!) -
        1 +
        startIndex
      : operationRow.length - 1

    let input = []

    for (let i = startIndex; i <= endIndex; i++) {
      const num = lines
        .slice(0, lines.length - 1)
        .map((row) => row[i])
        .join('')

      if (+num) {
        input.push(+num)
      }
    }

    lastIndex = endIndex + 1
    problems.push({ operation, input })
  }

  let result = 0
  for (const problem of problems) {
    result += calcProblem(problem.input, problem.operation)
  }
  return result
}
