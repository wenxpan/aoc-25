type Devices = { [device: string]: string[] }
type DeviceNumMap = { [device: string]: number }
type Edges = number[][]

const formatInput = (input: string) => {
  const devices: Devices = {}
  const deviceNumMap: DeviceNumMap = {}

  input.split('\n').forEach((line, index) => {
    const [start, endDevices] = line.split(': ')
    if (!start || !endDevices) {
      return
    }
    const end = endDevices?.split(' ')
    devices[start] = end
    deviceNumMap[start] = index
  })
  deviceNumMap['out'] = Object.keys(deviceNumMap).length

  const edges: Edges = []
  for (const [start, endDevices] of Object.entries(devices)) {
    for (const end of endDevices) {
      edges.push([deviceNumMap[start!]!, deviceNumMap[end!]!])
    }
  }
  return { edges, deviceNumMap }
}

function dfs(
  src: number,
  dest: number,
  graph: number[][],
  path: number[],
  allPaths: number[][]
) {
  // Add the current vertex to the path
  path.push(src)

  // Store the path when destination is reached
  if (src === dest) {
    allPaths.push([...path])
  } else {
    for (let adjNode of graph[src]!) {
      dfs(adjNode, dest, graph, path, allPaths)
    }
  }

  // remove the current vertex from the path
  path.pop()
}

function findPaths(v: number, edges: Edges, src: number, dest: number) {
  let graph: number[][] = Array.from({ length: v }, () => [])

  // Build the graph from edges
  for (let edge of edges) {
    const itemToPush = edge[1]!
    graph[edge[0]!]?.push(itemToPush)
  }

  let allPaths: number[][] = []
  let path: number[] = []

  dfs(src, dest, graph, path, allPaths)

  return allPaths
}

export const calcYouToOut = (input: string) => {
  const { edges, deviceNumMap } = formatInput(input)

  const paths = findPaths(
    Object.keys(deviceNumMap).length,
    edges,
    deviceNumMap['you']!,
    deviceNumMap['out']!
  )

  return paths.length
}

export const calcSvrToOut = (input: string) => {
  const { edges, deviceNumMap } = formatInput(input)

  const paths = findPaths(
    Object.keys(deviceNumMap).length,
    edges,
    deviceNumMap['svr']!,
    deviceNumMap['out']!
  )

  const validPaths = paths.filter((path) => {
    return (
      path.includes(deviceNumMap['dac']!) && path.includes(deviceNumMap['fft']!)
    )
  })

  return validPaths.length
}
