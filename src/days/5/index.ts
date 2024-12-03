const readCrates = (arg: string): string[][] => {
  let crates: string[][] = [];

  const inputArray = arg.split("\n");
  inputArray.forEach((input, index) => {
    if (index < 8) {
      if (!crates.length) {
        for (let i = 0; i < 9; i++) {
          crates.push([]);
        }
      }

      for (let i = 0; i < 9; i++) {
        const index = 1 + i * 4; // Calculate the index based on the pattern of line 8
        if (input[index].trim()) {
          crates[i].unshift(input[index]);
        }
      }
    }
  });

  return crates;
};

export const solutionFn = ({ arg }: { arg: string }) => {
  const crates = readCrates(arg);
  const arResult: string[] = [];
  const inputArray = arg.split("\n");

  inputArray.forEach((input, index) => {
    if (index > 9) {
      let instructions = input.split(" ");
      const numberOfBoxes = Number(instructions[1]);
      const origin = Number(instructions[3]) - 1; // -1 because of the index
      const destination = Number(instructions[5]) - 1;

      const movingBoxes = crates[origin].slice(
        crates[origin].length - numberOfBoxes,
        crates[origin].length
      );

      crates[destination] = [...crates[destination], ...movingBoxes.reverse()]; // I reverse because it can move only 1 at once
      for (let i = 0; i < movingBoxes.length; i++) {
        crates[origin].pop();
      }
    }
  });
  crates.forEach((crate) => {
    arResult.push(crate[crate.length - 1]);
  });
  return arResult.toString().replaceAll(",", "");
};

export const solutionFn2 = ({ arg }: { arg: string }) => {
  const crates = readCrates(arg);
  const arResult: string[] = [];
  const inputArray = arg.split("\n");

  inputArray.forEach((input, index) => {
    if (index > 9) {
      let instructions = input.split(" ");
      const numberOfBoxes = Number(instructions[1]);
      const origin = Number(instructions[3]) - 1;
      const destination = Number(instructions[5]) - 1;

      const movingBoxes = crates[origin].slice(
        crates[origin].length - numberOfBoxes,
        crates[origin].length
      );

      crates[destination] = [...crates[destination], ...movingBoxes];
      for (let i = 0; i < movingBoxes.length; i++) {
        crates[origin].pop();
      }
    }
  });
  crates.forEach((crate) => {
    arResult.push(crate[crate.length - 1]);
  });
  console.log(arResult.toString().replaceAll(",", ""));
  return arResult.toString().replaceAll(",", "");
};
