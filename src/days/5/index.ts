export const solutionFn = ({ arg }: { arg: string }) => {
  const pageOrdering = arg
    .split("\n\n")[0]
    .split("\n")
    .map((strpage) => {
      return strpage.split("|").map((str) => Number(str));
    });

  const pages = arg
    .split("\n\n")[1]
    .split("\n")
    .map((line) => line.split(",").map((str) => Number(str)));

  return;
};

export const solutionFn2 = ({ arg }: { arg: string }) => {};
