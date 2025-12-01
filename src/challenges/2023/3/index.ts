export const solutionFn1 = ({ arg1 }: { arg1: string }) => {
  console.log(
    "\x1b[44m",
    "\x1b[33m",
    `--- Day 3: Gear Ratios ---
  You and the Elf eventually reach a gondola lift station; he says the gondola lift will take you up to the water source, but this is as far as he can bring you. You go inside.
  
  It doesn't take long to find the gondolas, but there seems to be a problem: they're not moving.
  
  "Aaah!"
  
  You turn around to see a slightly-greasy Elf with a wrench and a look of surprise. "Sorry, I wasn't expecting anyone! The gondola lift isn't working right now; it'll still be a while before I can fix it." You offer to help.
  
  The engineer explains that an engine part seems to be missing from the engine, but nobody can figure out which one. If you can add up all the part numbers in the engine schematic, it should be easy to work out which part is missing.
  
  The engine schematic (your puzzle input) consists of a visual representation of the engine. There are lots of numbers and symbols you don't really understand, but apparently any number adjacent to a symbol, even diagonally, is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)
  
  Here is an example engine schematic:
  
  467..114..
  ...*......
  ..35..633.
  ......#...
  617*......
  .....+.58.
  ..592.....
  ......755.
  ...$.*....
  .664.598..
  In this schematic, two numbers are not part numbers because they are not adjacent to a symbol: 114 (top right) and 58 (middle right). Every other number is adjacent to a symbol and so is a part number; their sum is 4361.
  
  Of course, the actual engine schematic is much larger. What is the sum of all of the part numbers in the engine schematic?`,
    "\x1b[0m"
  );
  let sum = 0;
  let symbols = ["*", "$", "/", "=", "%", "&", "@", "#", "+", "-"];
  let grid = arg1.split("\n").map((line) => line.split(""));

  for (let i = 0; i < grid.length; i++) {
    let line = grid[i].join("");
    let regex = /\d+/g;
    let match;
    while ((match = regex.exec(line)) !== null) {
      let number = Number(match[0]);
      let startOfNumber = match.index;
      let end = startOfNumber + match[0].length - 1;
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          let ni = i + dx,
            njStart = startOfNumber + dy,
            njEnd = end + dy;
          if (ni >= 0 && ni < grid.length && njStart >= 0 && njStart < grid[i].length && symbols.includes(grid[ni][njStart])) {
            sum += number;
            break;
          }
          if (ni >= 0 && ni < grid.length && njEnd >= 0 && njEnd < grid[i].length && symbols.includes(grid[ni][njEnd])) {
            sum += number;
            break;
          }
        }
      }
    }
  }
  return sum; //560670
};

export const solutionFn2 = ({ arg1 }: { arg1: string }) => {
  console.log(
    "\x1b[44m",
    "\x1b[33m",
    `--- Part Two ---
  The engineer finds the missing part and installs it in the engine! As the engine springs to life, you jump in the closest gondola, finally ready to ascend to the water source.
  
  You don't seem to be going very fast, though. Maybe something is still wrong? Fortunately, the gondola has a phone labeled "help", so you pick it up and the engineer answers.
  
  Before you can explain the situation, she suggests that you look out the window. There stands the engineer, holding a phone in one hand and waving with the other. You're going so slowly that you haven't even left the station. You exit the gondola.
  
  The missing part wasn't the only issue - one of the gears in the engine is wrong. A gear is any * symbol that is adjacent to exactly two part numbers. Its gear ratio is the result of multiplying those two numbers together.
  
  This time, you need to find the gear ratio of every gear and add them all up so that the engineer can figure out which gear needs to be replaced.
  
  Consider the same engine schematic again:
  
  467..114..
  ...*......
  ..35..633.
  ......#...
  617*......
  .....+.58.
  ..592.....
  ......755.
  ...$.*....
  .664.598..
  In this schematic, there are two gears. The first is in the top left; it has part numbers 467 and 35, so its gear ratio is 16345. The second gear is in the lower right; its gear ratio is 451490. (The * adjacent to 617 is not a gear because it is only adjacent to one part number.) Adding up all of the gear ratios produces 467835.
  
  What is the sum of all of the gear ratios in your engine schematic?`,
    "\x1b[0m"
  );
  const grid = arg1.split("\n").map((line) => line.split(""));
  const directions = [
    [-1, 0], // up
    [1, 0], // down
    [0, -1], // left
    [0, 1], // right
    [-1, -1], // up-left
    [-1, 1], // up-right
    [1, -1], // down-left
    [1, 1], // down-right
  ]; // All eight directions

  let sum = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "*") {
        let adjacentNumbers = [];
        for (const [dx, dy] of directions) {
          const ni = i + dx;
          const nj = j + dy;
          if (isValidPosition(ni, nj, grid) && !isNaN(Number(grid[ni][nj]))) {
            // const extractedNumber = extractNumber(ni, nj, dx, dy, grid);
            // adjacentNumbers.push(extractedNumber);
            console.log(grid[ni][nj]);
          }
        }
        // if (adjacentNumbers.length === 2) {
        //   sum += adjacentNumbers[0] * adjacentNumbers[1];
        // }
      }
    }
  }

  return sum;
};

function isValidPosition(row: number, col: number, grid: string[][]): boolean {
  return row >= 0 && row < grid.length && col >= 0 && col < grid[row].length;
}

function extractNumber(startRow: number, startCol: number, dx: number, dy: number, grid: string[][]): number {
  let number = "";
  let row = startRow;
  let col = startCol;

  // Backward traversal
  while (isValidPosition(row - dx, col - dy, grid) && !isNaN(Number(grid[row - dx][col - dy]))) {
    row -= dx;
    col -= dy;
  }

  // Forward traversal ( now collect the number)
  while (isValidPosition(row, col, grid) && !isNaN(Number(grid[row][col]))) {
    number += grid[row][col]; // Collect digit to form the complete number
    row += dx; // Move in the specified direction
    col += dy;
  }

  return parseInt(number, 10);
}

// 1468531 too low
// 4033757 too low
// 3936348 too low too

// 4033757 still same but too low
