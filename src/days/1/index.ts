export const solutionFn = ({ arg }: { arg: string }) => {
  const arrOfStrings = arg.split("\n");
  const distances: number[] = [];
  const left: number[] = [];
  const right: number[] = [];
  arrOfStrings.forEach((item) => {
    const numbers = item.split("   ");
    left.push(Number(numbers[0]));
    right.push(Number(numbers[1]));
  });

  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);

  for (let i = 0; i < left.length; i++) {
    distances.push(Math.abs(right[i] - left[i]));
  }

  return distances.reduce((a, b) => a + b); //2375403
};

export const solutionFn2 = ({ arg }: { arg: string }) => {
  const arrOfStrings = arg.split("\n");
  let similarityScore = 0;
  const left: number[] = [];
  const right: number[] = [];

  arrOfStrings.forEach((item) => {
    const numbers = item.split("   ");
    left.push(Number(numbers[0]));
    right.push(Number(numbers[1]));
  });

  for (let i = 0; i < left.length; i++) {
    similarityScore = getAllIndexes(right, left[i]) * left[i] + similarityScore;
  }

  return similarityScore;
};

const getAllIndexes = (array: number[], value: number) => {
  const indexes = [];
  let i = -1;
  while ((i = array.indexOf(value, i + 1)) !== -1) {
    indexes.push(i);
  }
  return indexes.length;
};
