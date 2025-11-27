export const generateMaze = (width, height) => {
  const maze = Array(height).fill(null).map(() => Array(width).fill(1));
  const stack = [];
  const start = { x: 0, y: 0 };
  
  maze[start.y][start.x] = 0;
  stack.push(start);
  
  const directions = [
    { dx: 0, dy: -2 }, // up
    { dx: 2, dy: 0 },  // right
    { dx: 0, dy: 2 },  // down
    { dx: -2, dy: 0 }  // left
  ];
  
  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    const neighbors = [];
    
    directions.forEach(dir => {
      const nx = current.x + dir.dx;
      const ny = current.y + dir.dy;
      
      if (nx >= 0 && nx < width && ny >= 0 && ny < height && maze[ny][nx] === 1) {
        neighbors.push({ x: nx, y: ny, dx: dir.dx, dy: dir.dy });
      }
    });
    
    if (neighbors.length > 0) {
      const next = neighbors[Math.floor(Math.random() * neighbors.length)];
      maze[next.y][next.x] = 0;
      maze[current.y + next.dy / 2][current.x + next.dx / 2] = 0;
      stack.push({ x: next.x, y: next.y });
    } else {
      stack.pop();
    }
  }
  
  // Add extra paths to create loops and alternative routes
  const extraPaths = Math.floor((width * height) * 0.05); // 5% extra openings
  for (let i = 0; i < extraPaths; i++) {
    // Pick a random wall
    const x = Math.floor(Math.random() * (width - 2)) + 1;
    const y = Math.floor(Math.random() * (height - 2)) + 1;
    
    if (maze[y][x] === 1) {
      // Check if this wall is between two path cells
      const horizontalPaths = (maze[y][x - 1] === 0 && maze[y][x + 1] === 0);
      const verticalPaths = (maze[y - 1]?.[x] === 0 && maze[y + 1]?.[x] === 0);
      
      if (horizontalPaths || verticalPaths) {
        maze[y][x] = 0;
      }
    }
  }
  
  return maze;
};