// The main Dijkstra's algorithm function.
export function dijkstra(grid, startNode, endNode) {
  const visitedNodesInOrder = [];  // This array will store the order that nodes are visited.
  startNode.distance = 0;  // The distance from the start node to itself is 0.
  const unvisitedNodes = getAllNodes(grid);  // Get all nodes in the beginning, since they are all unvisited.
  while (unvisitedNodes.length) {  // While there are still nodes that have not been visited.
    sortNodesByDistance(unvisitedNodes);  // Sort unvisited nodes by their distance property.
    const closestNode = unvisitedNodes.shift();  // Take the node with the smallest distance.
    if (closestNode.isWall) continue;  // If the closest node is a wall, we skip it.
    if (closestNode.distance === Infinity) return visitedNodesInOrder;  // If the closest node's distance is still infinity, we cannot reach the end node from the start node, so we return the visited nodes.
    closestNode.isVisited = true;  // Mark the node as visited.
    visitedNodesInOrder.push(closestNode);  // Add the node to the visited nodes array.
    if (closestNode === endNode) return visitedNodesInOrder;  // If the closest node is the end node, we have found the shortest path, so we return the visited nodes.
    updateUnvisitedNeighbors(closestNode, grid);  // Update the distances of the unvisited neighbors of the current node.
  }
}

// This function sorts nodes by their distance from the start node.
function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

// This function updates the distance of unvisited neighbors of a node.
function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);  // Get the unvisited neighbors of the node.
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;  // The distance to the neighbors is the distance to the node + 1.
    neighbor.previousNode = node;  // Update the predecessor for the shortest path.
  }
}

// This function returns the unvisited neighbors of a node.
function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];  // Array to store the neighbors.
  const { col, row } = node;  // Destructure the column and row from the node.
  // Check the nodes around the current node and add them to the neighbors array if they exist.
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  // Return only the neighbors that have not been visited yet.
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

// This function returns all nodes in the grid.
function getAllNodes(grid) {
  const nodes = [];  // Array to store all nodes.
  // Loop through the grid and add all nodes to the array.
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

// This function returns the nodes in the shortest path by following the predecessors from the end node.
export function getNodesInShortestPathOrder(endNode) {
  const nodesInShortestPathOrder = [];  // Array to store the nodes in the shortest path.
  let currentNode = endNode;  // Start with the end node.
  while (currentNode !== null) {  // While we have not reached the start node.
    nodesInShortestPathOrder.unshift(currentNode);  // Add the current node to the beginning of the array.
    currentNode = currentNode.previousNode;  // Move to the predecessor of the current node.
  }
  return nodesInShortestPathOrder;
}
