export const solutionFn = ({ arg }: { arg: string }) => {
  let fullyContainedSections = 0;

  const sectionPairs = arg.split("\n");

  sectionPairs.forEach((pair) => {
    const firstPair = pair
      .split(",")[0]
      .split("-")
      .map((str) => Number(str));
    const secondPair = pair
      .split(",")[1]
      .split("-")
      .map((str) => Number(str));

    if (firstPair[0] <= secondPair[0] && firstPair[1] >= secondPair[1]) {
      fullyContainedSections++;
    } else if (firstPair[0] >= secondPair[0] && firstPair[1] <= secondPair[1]) {
      fullyContainedSections++;
    }
  });

  return fullyContainedSections;
};

export const solutionFn2 = ({ arg }: { arg: string }) => {
  let overlapingPairs = 0;

  const sectionPairs = arg.split("\n");

  sectionPairs.forEach((pair) => {
    const firstPair = pair
      .split(",")[0]
      .split("-")
      .map((str) => Number(str));
    const secondPair = pair
      .split(",")[1]
      .split("-")
      .map((str) => Number(str));

    // 2-8,3-7 => If 8 >= 3 and 7 >= 2 // This is the only condition where any pair woud overlap.
    // 1-2, 3-4 => 2 !>= 3 even if 4 >= 1  // That wont be true.
    // 3-5 , 1-2 => 5 >= 1 but 2!>= 3 //That wont be true.

    if (firstPair[1] >= secondPair[0] && secondPair[1] >= firstPair[0]) {
      overlapingPairs++;
    }
  });

  return overlapingPairs;
};
