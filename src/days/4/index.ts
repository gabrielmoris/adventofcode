export const solutionFn = ({ arg }: { arg: string }) => {
  const arrOfStrings = arg.split("\n").map((line) => line.split(""));
  let instancesFound = 0;

  for (let i = 0; i < arrOfStrings.length; i++) {
    for (let j = 0; j < arrOfStrings[i].length; j++) {
      // Check horizontal ( from j to j-3, which is the length of the string)
      if (j + 3 < arrOfStrings[i].length) {
        const horizontal = arrOfStrings[i].slice(j, j + 4).join("");
        if (checkXmas(horizontal)) instancesFound++;
      }

      // Check Vertical
      if (i + 3 < arrOfStrings.length) {
        const vertical = [
          arrOfStrings[i][j],
          arrOfStrings[i + 1][j],
          arrOfStrings[i + 2][j],
          arrOfStrings[i + 3][j],
        ].join("");
        if (checkXmas(vertical)) instancesFound++;
      }

      // Check Diagonals
      if (i + 3 < arrOfStrings.length && j + 3 < arrOfStrings[i].length) {
        const diagonalLeft = [
          arrOfStrings[i][j],
          arrOfStrings[i + 1][j + 1],
          arrOfStrings[i + 2][j + 2],
          arrOfStrings[i + 3][j + 3],
        ].join("");

        const diagonalRight = [
          arrOfStrings[i + 3][j],
          arrOfStrings[i + 2][j + 1],
          arrOfStrings[i + 1][j + 2],
          arrOfStrings[i][j + 3],
        ].join("");

        if (checkXmas(diagonalLeft)) instancesFound++;
        if (checkXmas(diagonalRight)) instancesFound++;
      }
    }
  }

  return instancesFound;
};

const checkXmas = (word: string): boolean => {
  return word === "XMAS" || word === "SAMX";
};

export const solutionFn2 = ({ arg }: { arg: string }) => {
  const arrOfStrings = arg.split("\n").map((line) => line.split(""));
  let instancesFound = 0;

  for (let i = 0; i < arrOfStrings.length; i++) {
    for (let j = 0; j < arrOfStrings[i].length; j++) {
        

    }
  }
};
