export const solutionFn = ({ arg }: { arg: string }) => {
  let result = 0;
  const regex = /mul\(\d{1,3},\d{1,3}\)/g;
  Array.from(arg.matchAll(regex)).forEach((match) => {
    const onlyNums = match[0]
      .substring(4, match[0].length - 1)
      .split(",")
      .map((str) => Number(str));
    const multiplication = onlyNums[0] * onlyNums[1];
    result += multiplication;
  });
  return result;
};

export const solutionFn2 = ({ arg }: { arg: string }) => {
  let result = 0;
  let allowed = true;
  const combinedRegex = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g;
  Array.from(arg.matchAll(combinedRegex)).forEach((match) => {
    if (match[0] === "do()") {
      allowed = true;
    } else if (match[0] === "don't()") {
      allowed = false;
    } else {
      const onlyNums = match[0]
        .substring(4, match[0].length - 1)
        .split(",")
        .map((str) => Number(str));
      if (allowed) {
        const multiplication = onlyNums[0] * onlyNums[1];
        result += multiplication;
      }
    }
  });
  return result;
};
