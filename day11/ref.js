// https://hackernoon.com/a-beginners-guide-to-bfs-and-dfs-in-javascript
const graph = {
  A: ['B', 'D'],
  B: ['A', 'C', 'E'],
  C: ['B'],
  D: ['A', 'E'],
  E: ['B', 'D', 'F'],
  F: ['E'],
}

function dfs(graph, start) {
  const stack = [start]
  const visited = new Set()
  const result = []

  while (stack.length) {
    const vertex = stack.pop()

    if (!visited.has(vertex)) {
      visited.add(vertex)
      result.push(vertex)

      for (const neighbor of graph[vertex]) {
        stack.push(neighbor)
      }
    }
  }

  return result
}

dfs(graph, 'A') // ['A', 'D', 'E', 'F', 'B', 'C']

// https://www.geeksforgeeks.org/dsa/find-paths-given-source-destination/
function dfs(src, dest, graph, path, allPaths) {
  // Add the current vertex to the path
  path.push(src)

  // Store the path when destination is reached
  if (src === dest) {
    allPaths.push([...path])
  } else {
    for (let adjNode of graph[src]) {
      dfs(adjNode, dest, graph, path, allPaths)
    }
  }

  // remove the current vertex from the path
  path.pop()
}

function findPaths(v, edges, src, dest) {
  let graph = Array.from({ length: v }, () => [])

  // Build the graph from edges
  for (let edge of edges) {
    graph[edge[0]].push(edge[1])
  }

  let allPaths = []
  let path = []

  dfs(src, dest, graph, path, allPaths)

  return allPaths
}

// Driver Code
const edges = [
  [0, 3],
  [0, 1],
  [1, 3],
  [2, 0],
  [2, 1],
]
const src = 2
const dest = 3
const v = 4

const paths = findPaths(v, edges, src, dest)

for (const path of paths) {
  console.log(path.join(' '))
}
